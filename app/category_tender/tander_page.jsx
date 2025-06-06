"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { tenders } from "../constants/tenders";
import categories from "../constants/categories";
import Link from "next/link";
import { formatDate } from "../utils/formatDate";
import Loading from "../components/LoadingSpinner";
import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/Categories_translation";

export default function TenderPage() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

  function getSubcategoryTitleById(subcategoryId) {
    for (const category of categories) {
      const subcat = category.subcategories.find(
        (sc) => sc.id === subcategoryId
      );
      if (subcat) return subcat.title[language];
    }
    return null;
  }

  const categoryId = searchParams.get("id");
  const Type = searchParams.get("type");
  const categoryTitle = getSubcategoryTitleById(categoryId) || t.allTenders;
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTenders = async () => {
      setLoading(true);
      try {
        const encodedCategory = encodeURIComponent(categoryId);
        const response = await fetch(
          `https://mazadoman.com/backend/api/tenders/category/${encodedCategory}`
        );
        const data = await response.json();
        setTenders(data.tenders || []);
      } catch (error) {
        console.error("Error fetching tenders:", error);
        setTenders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, [categoryTitle]);

  const filteredTenders = tenders.filter(
    (tender) =>
      tender?.title.toLowerCase().includes(query.toLowerCase()) ||
      tender?.tender_id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main dir={isArabic ? "rtl" : "ltr"}>
      <Loading isLoading={loading} />
      <section className="relative w-full h-[400px]">
        <Image
          src={assets.hero}
          alt="E-Tendering Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {categoryTitle}
          </h1>
          <p className="max-w-2xl mb-6 text-lg">{t.categoryDescription}</p>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full max-w-xl px-4 py-2 rounded-md text-white placeholder-slate-500"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl text-center font-bold text-slate-800 mb-6">
          {Type === "Tenders"
            ? t.allTenders
            : Type === "Forward Auction"
            ? t.allForwardAuctions
            : Type === "Reverse Auction"
            ? t.allReverseAuctions
            : t.allListings}
        </h2>

        {Type === "Tenders" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTenders.length > 0 ? (
              filteredTenders.map((tender) => (
                <article
                  key={tender?.tender_id}
                  className={`flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  <div className="relative w-full h-48 shrink-0">
                    <Image
                      src={`https://mazadoman.com/backend/${tender?.image}`}
                      alt={tender?.title || "image"}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 25vw"
                      priority
                    />
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow">
                      {t.launchedOn} {formatDate(tender?.created_at)}
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <div className="space-y-1.5">
                      <h3 className="font-extrabold text-purple-800 leading-tight text-lg sm:text-xl">
                        {tender.tender_id}: {tender.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {tender.budget} OMR
                      </p>
                    </div>

                    <div className="flex-1" />

                    <div
                      onClick={() =>
                        router.push(
                          `/tender_details?id=${encodeURIComponent(
                            tender?.tender_id
                          )}`
                        )
                      }
                    >
                      <p className="w-full text-center bg-amber-500 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition">
                        {t.submitOffer}
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
        )}
      </section>
    </main>
  );
}
