"use client";

import { useEffect, useState } from "react";
import VisualSlider from "./components/VisualSlider";
import Categories from "./components/Categories";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import Loading from "./components/LoadingSpinner";
import { login } from "./store/sessionSlice";
import { useDispatch } from "react-redux";
import { formatDate } from "./utils/formatDate";
import { useRouter } from "next/navigation";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Fetch user data with the token
      fetch("https://mazadoman.com/backend/api/company-user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //  setUser(data?.user);
          dispatch(login({ user: data?.user }));

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      console.error("No token found");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Replace with your real API URL
    fetch("https://mazadoman.com/backend/api/tenders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tenders.");
        }
        return response.json();
      })
      .then((data) => {
        setTenders(data.tenders); // depends on your API response
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Loading isLoading={loading} />
      <HeroSection />
      <VisualSlider />
      <Categories />
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* heading row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Latest Tenders</h2>
          <Link
            href="/tenders"
            className="text-amber-500 font-semibold hover:underline flex items-center gap-1"
          >
            See all
            <span className="inline-block rotate-[-45deg] translate-y-[2px]">
              ➜
            </span>
          </Link>
        </div>

        {/* cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tenders.map((tender) => (
            <article
              key={tender?.tender_id}
              className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* banner */}
              <div className="relative w-full h-48 shrink-0">
                <Image
                  src={"https://mazadoman.com/backend/" + tender?.image}
                  alt={tender?.title || "image"}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 25vw"
                  priority
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow">
                  Launched on {formatDate(tender?.created_at)}
                </div>
              </div>

              {/* body */}
              {/* Make card body flex‑column & grow so buttons align */}
              <div className="flex flex-col flex-1 p-5">
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-purple-800 leading-tight text-lg sm:text-xl">
                    {tender.tender_id}: {tender.title}
                  </h3>
                  <p className="text-sm text-slate-600">{tender.budget} OMR</p>
                </div>

                {/* spacer pushes button to bottom */}
                <div className="flex-1" />

                <div
                  onClick={() => {
                    router.push(
                      `/tender_details?id=${encodeURIComponent(
                        tender?.tender_id
                      )}`
                    );
                  }}
                >
                  <p className="w-full text-center bg-amber-500 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition">
                    View Details
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
