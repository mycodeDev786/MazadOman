"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/translation";

export default function TenderPosted() {
  const { language } = useLanguage();
  const t = translations[language];

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.session.user);

  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setError(t.errorUserIdRequired);
      setLoading(false);
      return;
    }

    fetch(`https://mazadoman.com/backend/api/user-tenders/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(t.errorFetchingTenders);
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
  }, [userId, t.errorFetchingTenders, t.errorUserIdRequired]);

  const alignment = language === "ar" ? "text-right" : "text-left";
  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <div className={`p-4 ${alignment}`} dir={direction}>
      <h1 className="text-2xl font-bold mb-4">{t.tendersPostedTitle}</h1>
      <Loading isLoading={loading} />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {tenders.map((tender) => (
            <li
              key={tender.tender_id}
              onClick={() => {
                router.push(
                  `/admin/tender/view_tender?id=${encodeURIComponent(
                    tender?.tender_id
                  )}`
                );
              }}
              className="p-4 bg-lime-200 rounded-xl hover:bg-lime-400 cursor-pointer flex flex-col justify-center items-start min-h-[120px] transition-colors duration-200"
            >
              <span
                className={`text-sm text-gray-500 ${
                  language === "ar" ? "ml-2" : "mr-2"
                }`}
              >
                {t.tender_id} : {tender.tender_id}
              </span>
              <span className="font-medium text-gray-700">
                {t.tender_title}:{tender.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
