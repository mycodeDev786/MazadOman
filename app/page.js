"use client";

import { useEffect, useState } from "react";
import VisualSlider from "./components/VisualSlider";
import clsx from "clsx";
import Categories from "./components/Categories";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./components/LanguageContext";
import { translations } from "./translations/translation";
import HeroSection from "./components/HeroSection";
import Loading from "./components/LoadingSpinner";
import { login } from "./store/sessionSlice";
import { useDispatch } from "react-redux";
import { formatDate, formatDateWithLan } from "./utils/formatDate";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tenders, setTenders] = useState([]);
  const [forwardAuctions, setForwardAuctions] = useState([]);
  const [reverseAuctions, setReverseAuctions] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Tenders");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

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
  }, [tenders]);
  const fetchForwardAuctions = () => {
    // Replace with your real API URL
    fetch("https://mazadoman.com/backend/api/auctions/forward")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tenders.");
        }
        return response.json();
      })
      .then((data) => {
        setForwardAuctions(data.auctions); // depends on your API response
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };
  const fetchReverseAuctions = () => {
    // Replace with your real API URL
    fetch("https://mazadoman.com/backend/api/auctions/reverse")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tenders.");
        }
        return response.json();
      })
      .then((data) => {
        setReverseAuctions(data.auctions); // depends on your API response
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };

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
        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full px-4 ${
            isRTL ? "text-right" : "text-center"
          } text-white`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            {t.findOpportunity}
          </h1>

          {/* Search Tab Panel */}
          <div className="bg-white shadow-xl rounded-xl mt-10 p-6 max-w-4xl w-full">
            {/* Tabs */}
            <div
              className={clsx(
                "flex justify-around border-b border-gray-200 pb-2 mb-4",
                isRTL ? "text-right" : "text-left"
              )}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {[t.tenders, t.forwardAuction, t.reverseAuction].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab === t.forwardAuction) {
                      fetchForwardAuctions();
                    } else if (tab === t.reverseAuction) {
                      fetchReverseAuctions();
                    }
                  }}
                  className={clsx(
                    "flex-1 py-2 font-medium transition",
                    "text-center", // Keep centered inside button
                    activeTab === tab
                      ? "border-b-4 border-orange-500 text-orange-600"
                      : "text-gray-600 hover:text-orange-500"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div
              className={`flex flex-col md:flex-row items-center ${
                isRTL ? "md:space-x-reverse gap-1" : ""
              } space-y-4 md:space-y-0 md:space-x-4`}
            >
              <div className="flex-grow flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                <input
                  type="text"
                  value={searchText}
                  placeholder={t.searchPlaceholder}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-grow bg-transparent outline-none text-gray-700"
                />
              </div>

              <button
                onClick={searchData}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                {t.search}
              </button>
            </div>
          </div>
        </div>
      </div>
      <VisualSlider />
      <Categories type={activeTab} />
      {activeTab === t.tenders && (
        <>
          <section className="max-w-7xl bg-fuchsia-50 my-2 mx-2  px-4 py-12">
            {/* heading row */}
            <div
              dir={language === "ar" ? "rtl" : "ltr"}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-3xl font-bold text-slate-800">
                {t.latestTenders}
              </h2>
              <Link
                href="/tenders"
                className="text-amber-500 font-semibold hover:underline flex items-center gap-1"
              >
                {t.seeAll}
                <span className="inline-block rotate-[-45deg] translate-y-[2px]">
                  ➜
                </span>
              </Link>
            </div>

            {/* cards */}
            <div
              dir={language === "ar" ? "rtl" : "ltr"}
              className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {tenders.length > 0 ? (
                tenders.map((tender) => (
                  <article
                    key={tender?.tender_id}
                    className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    {/* banner */}
                    <div className="relative w-full h-48 shrink-0">
                      <Image
                        src={`https://mazadoman.com/backend/${tender?.image}`}
                        alt={tender?.title || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 100vw, 25vw"
                        priority
                      />
                      <div
                        className={`absolute top-3 ${
                          language === "ar" ? "right-3" : "left-3"
                        } bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow`}
                      >
                        {t.launchedOn}{" "}
                        {formatDateWithLan(tender?.created_at, language)}
                      </div>
                    </div>

                    {/* body */}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-purple-800 leading-tight text-lg sm:text-xl">
                          {tender.tender_id}: {tender.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {tender.budget} {t.currency}
                        </p>
                      </div>

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
                          {t.viewDetails}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-slate-600 col-span-full text-center">
                  {t.noTendersFound}
                </p>
              )}
            </div>
          </section>
        </>
      )}

      {activeTab === t.forwardAuction && (
        <>
          <section className="max-w-7xl mx-auto px-4 py-12">
            {/* heading row */}
            <div
              dir={language === "ar" ? "rtl" : "ltr"}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-3xl font-bold text-slate-800">
                {t.latestAuctions}
              </h2>
              <Link
                href="/forward-auctions"
                className="text-amber-500 font-semibold hover:underline flex items-center gap-1"
              >
                {t.seeAll}
                <span className="inline-block rotate-[-45deg] translate-y-[2px]">
                  ➜
                </span>
              </Link>
            </div>

            {/* cards */}
            <div
              dir={language === "ar" ? "rtl" : "ltr"}
              className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {forwardAuctions.length > 0 ? (
                forwardAuctions.map((tender) => (
                  <article
                    key={tender?.auction_id}
                    className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    {/* banner */}
                    <div className="relative w-full h-48 shrink-0">
                      <Image
                        src={`https://mazadoman.com/backend/${tender?.image}`}
                        alt={tender?.title || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 100vw, 25vw"
                        priority
                      />
                      <div
                        className={`absolute top-3 ${
                          language === "ar" ? "right-3" : "left-3"
                        } bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow`}
                      >
                        {t.launchedOn}{" "}
                        {formatDateWithLan(tender?.created_at, language)}
                      </div>
                    </div>

                    {/* body */}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-purple-800 leading-tight text-lg sm:text-xl">
                          {tender.auction_id}: {tender.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {tender.budget} {t.currency}
                        </p>
                      </div>

                      <div className="flex-1" />

                      <div
                        onClick={() => {
                          router.push(
                            `/tender_details?id=${encodeURIComponent(
                              tender?.auction_id
                            )}`
                          );
                        }}
                      >
                        <p className="w-full text-center bg-amber-500 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition">
                          {t.viewDetails}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-slate-600 col-span-full text-center">
                  {t.noTendersFound}
                </p>
              )}
            </div>
          </section>
        </>
      )}

      {activeTab === t.reverseAuction && (
        <>
          <section className="max-w-7xl mx-auto px-4 py-12">
            {/* heading row */}
            <div
              dir={language === "ar" ? "rtl" : "ltr"}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-3xl font-bold text-slate-800">
                {t.latestReverseAuctions}
              </h2>
              <Link
                href="/reverse-auctions"
                className="text-amber-500 font-semibold hover:underline flex items-center gap-1"
              >
                {t.seeAll}
                <span className="inline-block rotate-[-45deg] translate-y-[2px]">
                  ➜
                </span>
              </Link>
            </div>
            {/* cards */}
            <div
              dir={language === "ar" ? "rtl" : "ltr"}
              className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {reverseAuctions.length > 0 ? (
                reverseAuctions.map((tender) => (
                  <article
                    key={tender?.auction_id}
                    className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    {/* banner */}
                    <div className="relative w-full h-48 shrink-0">
                      <Image
                        src={`https://mazadoman.com/backend/${tender?.image}`}
                        alt={tender?.title || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 100vw, 25vw"
                        priority
                      />
                      <div
                        className={`absolute top-3 ${
                          language === "ar" ? "right-3" : "left-3"
                        } bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow`}
                      >
                        {t.launchedOn}{" "}
                        {formatDateWithLan(tender?.created_at, language)}
                      </div>
                    </div>

                    {/* body */}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-purple-800 leading-tight text-lg sm:text-xl">
                          {tender.auction_id}: {tender.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {tender.budget} {t.currency}
                        </p>
                      </div>

                      <div className="flex-1" />

                      <div
                        onClick={() => {
                          router.push(
                            `/tender_details?id=${encodeURIComponent(
                              tender?.auction_id
                            )}`
                          );
                        }}
                      >
                        <p className="w-full text-center bg-amber-500 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition">
                          {t.viewDetails}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-slate-600 col-span-full text-center">
                  {t.noTendersFound}
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
