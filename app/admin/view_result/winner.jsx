"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/winner_page_translation";

export default function WinnerList() {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [bidId, setBidId] = useState(null);
  const searchParams = useSearchParams();
  const tenderId = searchParams.get("id");
  const { language } = useLanguage();
  const t = translations[language];

  const isRTL = language === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";
  const flexDir = isRTL ? "flex-row-reverse" : "flex-row";

  useEffect(() => {
    async function fetchBidId() {
      try {
        const res = await fetch(
          `https://mazadoman.com/backend/api/tenders/${tenderId}/bid`
        );
        const data = await res.json();

        setBidId(data.bid_id);
      } catch (error) {
        console.error("Failed to fetch Bid:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchWinners() {
      try {
        const res = await fetch(
          `https://mazadoman.com/backend/api/bid-user/winners/${bidId}`
        );
        const data = await res.json();
        setWinners(data.data || []);
      } catch (error) {
        console.error(t.fetchBidError, error);
      } finally {
        setLoading(false);
      }
    }
    fetchBidId();
    fetchWinners();
  }, [tenderId, bidId]);

  const sendEmailsToAll = async () => {
    setLoading(true);
    const token = process.env.NEXT_PUBLIC_FINALIZE_TOKEN;
    setSending(true);
    try {
      const res = await fetch(
        `https://mazadoman.com/backend/api/finalize-bid/${bidId}/${token}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await res.json();
      toast.success(t.successMessage);
    } catch (error) {
      console.error("Failed to send emails:", error);
      toast.error(t.sendEmailsError);
    } finally {
      setLoading(false);
      setSending(false);
    }
  };

  const labels = [t.label1, t.label2, t.label3];

  return (
    <div
      className={`max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl ${textAlign}`}
    >
      <Loading isLoading={loading} />
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold text-center mb-6">{t.topBidders}</h2>

      <ul className="space-y-4">
        {winners.map((winner, index) => (
          <li
            key={winner.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
          >
            <div className="font-medium">{labels[index]}</div>
            <div className="text-sm text-gray-600 truncate w-32 sm:w-auto">
              {winner?.user?.company_name}
            </div>
            <div className="font-semibold text-green-600">
              {Number(winner.offered_price).toFixed(2)} {t.currency}
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={sendEmailsToAll}
        disabled={sending}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {sending ? t.sendingEmails : t.sendEmails}
      </button>
    </div>
  );
}
