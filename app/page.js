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
import { assets } from "@/assets/assets";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Tenders");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const searchData = () => {
    if (activeTab === "Tenders") {
      const filtered_Tenders = tenders.filter(
        (tender) =>
          tender?.title.toLowerCase().includes(searchText.toLowerCase()) ||
          tender?.tender_id.toLowerCase().includes(searchText.toLowerCase())
      );
      setTenders(filtered_Tenders);
    } else {
      if (activeTab === "Forward Auction") {
        console.log("F" + searchText);
      } else {
        console.log("R" + searchText);
      }
    }
  };

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
      <div className="relative h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${assets.hero})`,
          }}
        ></div>
        <div className="absolute inset-0  bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find Your Perfect Opportunity
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl">
            Discover amazing tenders, forward auctions, and reverse auctions in
            one place.
          </p>

          {/* Search Tab Panel */}
          <div className="bg-white shadow-xl rounded-xl mt-10 p-6 max-w-4xl w-full">
            {/* Tabs */}
            <div className="flex justify-around border-b border-gray-200 pb-2 mb-4">
              {["Tenders", "Forward Auction", "Reverse Auction"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2 font-medium transition ${
                    activeTab === tab
                      ? "border-b-4 border-orange-500 text-orange-600"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                <input
                  type="text"
                  value={searchText}
                  placeholder="Search by ID or Title"
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-grow bg-transparent outline-none text-gray-700"
                />
              </div>

              <button
                onClick={searchData}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <VisualSlider /> */}
      <Categories type={activeTab} />
      {activeTab === "Tenders" && (
        <>
          <section className="max-w-7xl mx-auto px-4 py-12">
            {/* heading row */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-800">
                Latest Tenders
              </h2>
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
              {tenders.length > 0 ? (
                tenders.map((tender) => (
                  <article
                    key={tender?.tender_id}
                    className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    {/* banner */}
                    <div className="relative w-full h-48 shrink-0">
                      <Image
                        src={"https://mazadoman.com/backend/" + tender?.image}
                        alt={tender?.title || ""}
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
                        <p className="text-sm text-slate-600">
                          {tender.budget} OMR
                        </p>
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
                ))
              ) : (
                <p className="text-slate-600 col-span-full text-center">
                  No tenders found.
                </p>
              )}
            </div>
          </section>
        </>
      )}

      {activeTab === "Forward Auction" && (
        <>
          <section className="max-w-7xl mx-auto px-4 py-12">
            {/* heading row */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-800">
                Latest auctions
              </h2>
              <Link
                href="/"
                className="text-amber-500 font-semibold hover:underline flex items-center gap-1"
              >
                See all
                <span className="inline-block rotate-[-45deg] translate-y-[2px]">
                  ➜
                </span>
              </Link>
            </div>
          </section>
        </>
      )}

      {activeTab === "Reverse Auction" && (
        <>
          <section className="max-w-7xl mx-auto px-4 py-12">
            {/* heading row */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-800">
                Latest Reverse auctions
              </h2>
              <Link
                href="/"
                className="text-amber-500 font-semibold hover:underline flex items-center gap-1"
              >
                See all
                <span className="inline-block rotate-[-45deg] translate-y-[2px]">
                  ➜
                </span>
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
