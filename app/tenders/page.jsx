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
  const { language } = useLanguage();
  const t = translations[language];

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("https://mazadoman.com/backend/api/tenders")
      .then((response) => {
        if (!response.ok) {
          throw new Error(t.errors.fetchFailed);
        }
        return response.json();
      })
      .then((data) => {
        setTenders(data.tenders);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredTenders = tenders.filter(
    (tender) =>
      tender?.title.toLowerCase().includes(query.toLowerCase()) ||
      tender?.tender_id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      {/* Hero Section */}
      <Loading isLoading={loading} />
      <section className="relative w-full h-[400px]">
        <Image
          src={assets.hero}
          alt={t.hero.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.hero.welcome}
          </h1>
          <p className="max-w-2xl mb-6 text-lg">{t.hero.description}</p>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.hero.searchPlaceholder}
            className="w-full max-w-xl px-4 py-2 rounded-md text-white placeholder-slate-500"
          />
        </div>
      </section>

      {/* Latest Tenders */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl text-center font-bold text-orange-800 mb-6">
          {t.allTenders}
        </h2>

        <div
          dir={language === "ar" ? "rtl" : "ltr"}
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
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
                    } bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow`}
                  >
                    {t.launchedOn} {formatDateWithLan(tender?.created_at)}
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
    </main>
  );
}
