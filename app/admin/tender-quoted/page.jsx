"use client";
import Loading from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/translation";

export default function TenderQuoted() {
  const router = useRouter();
  const [quotedTenders, setQuotedTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.session.user);

  const userId = user?.id; // Example user ID
  const { language } = useLanguage();
  const t = translations[language];
  const alignment = language === "ar" ? "text-right" : "text-left";
  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

    // Fetch tenders by user ID
    fetch(`https://mazadoman.com/backend/api/quotes/all/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tenders.");
        }
        return response.json();
      })
      .then((data) => {
        setQuotedTenders(data.data); // Assuming the response has a 'tenders' array
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className={`p-4 ${alignment}`} dir={direction}>
      <Loading isLoading={loading} />
      <h1 className="text-2xl font-bold mb-4">{t.tendersYouHaveQuoted}</h1>
      {/* Tenders Quoted */}

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {quotedTenders.map((tender) => (
            <li
              key={tender.tender_id}
              onClick={() => {
                router.push(
                  `/admin/tender_quoted_details?id=${encodeURIComponent(
                    tender?.tender_id
                  )}`
                );
              }}
              className="p-4 bg-fuchsia-500 rounded-xl hover:bg-fuchsia-600 cursor-pointer flex flex-col justify-center items-start min-h-[120px] transition-colors duration-200"
            >
              <span
                className={`text-sm text-white ${
                  language === "ar" ? "ml-2" : "mr-2"
                }`}
              >
                {tender.tender_id}
              </span>
              <span className="font-medium text-white">
                {tender.tender_title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
