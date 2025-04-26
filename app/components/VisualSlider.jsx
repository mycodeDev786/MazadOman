import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function VisualSlider() {
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

  // Slider items
  const slides = [
    {
      href: "/",
      img: "https://www.bidnow.my/images/upload/setting/home_page/first_banner/bidnow-home-page-first-banner-landscape-AuctionProperty-1664865650.jpg",
      alt: "Auction Property Banner",
    },
    {
      href: "/",
      img: "https://www.bidnow.my/images/upload/setting/home_page/first_banner/bidnow-home-page-first-banner-landscape-GroupBidPromo-1653829384.jpg",
      alt: "Group Bid Promo Banner",
    },
    {
      href: "/",
      img: "https://www.bidnow.my/images/upload/setting/home_page/first_banner/bidnow-home-page-first-banner-landscape-GroupBid2-1664865703.jpg",
      alt: "Group Bid 2 Banner",
    },
    {
      href: "/",
      img: "https://www.bidnow.my/images/upload/setting/home_page/first_banner/bidnow-home-page-first-banner-landscape-NewFeature-Events-1672382961.jpg",
      alt: "Events Banner",
    },
  ];

  return (
    <section className="visual-area py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <a
              key={index}
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="slide">
                <div className="visual-slide-area">
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </a>
          ))}
        </Slider>
      </div>
    </section>
  );
}
