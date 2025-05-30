import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function VisualSlider() {
  const [slides, setSlides] = useState([]);

  // Fetch data from the API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mazadoman.com/backend/api/promotions/getAll"
        );
        const data = await response.json();
        console.log("API Data:", data); // Log to check for duplicates
        const formattedSlides = data.map((item) => ({
          title: item.title || "Untitled Promotion",
          image: item.image,
          alt: item.title || "Untitled Promotion",
          href:
            item.target_type === "auction"
              ? `/auction_details?id=${encodeURIComponent(item?.target_id)}`
              : item.target_type === "tender"
              ? `/tender_details?id=${encodeURIComponent(item?.target_id)}`
              : "/",
        }));

        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchData();
  }, []); // Empty array ensures this runs only once.

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <section className="visual-area py-8 mx-7 my-4 rounded-md bg-orange-400">
      <h1 className="text-center text-fuchsia-600 font-extrabold">
        Promoted Products
      </h1>
      <div className="container mx-auto px-4">
        {slides.length > 0 ? (
          <section className="py-8">
            <div className="container mx-auto px-6">
              <Slider {...settings}>
                {slides.map((slide, index) => (
                  <a
                    key={index}
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className="w-full px-5 rounded-lg overflow-hidden"
                      style={{ maxHeight: 400 }}
                    >
                      <Image
                        src={"https://mazadoman.com/backend/" + slide.image}
                        alt={slide.title}
                        width={1920} // intrinsic width of your image
                        height={1080} // intrinsic height of your image
                        style={{
                          width: "100%", // fill container width fully
                          height: "auto", // keep aspect ratio, height auto adjusts
                          maxHeight: "400px", // limit max height to 300px
                        }}
                        unoptimized
                        loading="lazy"
                      />
                    </div>
                    <h1 className="text-center font-semibold p-2">
                      {slide.title}
                    </h1>
                  </a>
                ))}
              </Slider>
            </div>
          </section>
        ) : (
          <div className="text-center py-8">
            <p>Loading slides...</p>
          </div>
        )}
      </div>
    </section>
  );
}
