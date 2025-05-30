"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatDate, formatDateWithLan } from "../utils/formatDate";
import { useRouter } from "next/navigation";
import Loading from "../components/LoadingSpinner";
import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/translation";

export default function TenderPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [forwardAuctions, setForwardAuctions] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

  useEffect(() => {
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
  }, []);

  const filteredTenders = forwardAuctions.filter(
    (tender) =>
      tender?.title.toLowerCase().includes(query.toLowerCase()) ||
      tender?.tender_id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className={isArabic ? "text-right" : "text-left"}
    >
      {/* Hero Section */}
      <Loading isLoading={loading} />
      <section className="relative w-full h-[400px]">
        <Image
          src={assets.hero} // Replace with your actual hero background path
          alt="E-Tendering Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="max-w-2xl mb-6 text-lg">{t.heroDescription}</p>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full max-w-xl px-4 py-2 rounded-md text-white placeholder-slate-500"
          />
        </div>
      </section>

      {/* Latest Tenders */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl text-center font-bold text-orange-800 mb-6">
          {t.allForwardAuctions}
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredTenders.length > 0 ? (
            filteredTenders.map((tender) => (
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
                  <div
                    className={`absolute top-3 ${
                      language === "ar" ? "right-3" : "left-3"
                    } bg-lime-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow`}
                  >
                    {t.launchedOn}{" "}
                    {formatDateWithLan(tender?.created_at, language)}
                  </div>
                </div>

                {/* body */}
                <div
                  className={`flex flex-col flex-1 p-5 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  <div className="space-y-1.5">
                    <h3
                      className={`  ${
                        isArabic ? "text-right" : "text-left"
                      } font-extrabold text-orange-600 leading-tight text-lg sm:text-xl`}
                    >
                      {isArabic
                        ? tender.title + ":" + tender.auction_id
                        : tender.auction_id + ":" + tender.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      <span className="text-orange-600">{t.bidPrice}: </span>
                      {tender.budget} {t.currency}
                    </p>
                    <p className="text-sm font-semibold text-red-600">
                      <span className="text-orange-600">{t.deadline}: </span>
                      {tender.bid_end_date}
                    </p>
                  </div>

                  <div className="flex-1" />

                  <div
                    onClick={() => {
                      router.push(
                        `/auction_details?id=${encodeURIComponent(
                          tender?.auction_id
                        )}`
                      );
                    }}
                  >
                    <p className="w-full text-center bg-lime-500 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-lime-600 transition">
                      {t.viewDetails}
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-orange-600 col-span-full text-center">
              {t.noAuctionsFound}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
