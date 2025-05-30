"use client";
import { useEffect, useState } from "react";
import Loading from "./LoadingSpinner";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translations/promoted_products_translation";
import { formatDateWithLan } from "../utils/formatDate";
import { layouts } from "chart.js";

export default function PromotionsList({ userId }) {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch(
          `https://mazadoman.com/backend/api/promotions/user/${userId}`
        );
        const data = await res.json();
        setPromotions(data.promotions);
      } catch (err) {
        console.error("Error fetching promotions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPromotions();
    }
  }, [userId]);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="p-6  min-h-screen">
      <Loading isLoading={loading} />
      <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-6">
        {t.promotedProducts}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo.promotion_id}
            className="rounded-2xl bg-lime-300 p-5 shadow-lg border border-orange-300 hover:shadow-2xl hover:bg-lime-500 flex flex-col "
          >
            <h3 className="text-center text-xl font-bold text-white mb-4">
              {promo.title || "Untitled"}
            </h3>
            <div className="text-sm text-gray-600 ">
              <p>
                <span className="font-medium text-indigo-500">{t.type}:</span>{" "}
                {promo.target_type}
              </p>
              <p>
                <span className="font-medium text-indigo-500">
                  {t.duration}:
                </span>{" "}
                {promo.duration_days} days
              </p>
              <p>
                <span className="font-medium text-indigo-500">{t.start}:</span>{" "}
                {formatDateWithLan(promo.start_date?.split("T")[0], language)}
              </p>
              <p>
                <span className="font-medium text-indigo-500">{t.end}:</span>{" "}
                {formatDateWithLan(promo.end_date?.split("T")[0], language)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
