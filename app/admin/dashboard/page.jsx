"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useSelector } from "react-redux";
import Loading from "@/app/components/LoadingSpinner";
import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/translation";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function AdminDashboard() {
  const user = useSelector((state) => state.session.user);
  const { language } = useLanguage();
  const t = translations[language];

  const [tenderPosted, setTenderPosted] = useState(0);
  const [tenderQuoted, setTenderQuoted] = useState(0);
  const [forwardAuctionPosted, setForwardAuctionPosted] = useState(0);
  const [forwardAuctionPlacedBids, setForwardAuctionPlacedBids] = useState(0);
  const [reverseAuctionPosted, setReverseAuctionPosted] = useState(0);
  const [reverseAuctionPlacedBids, setReverseAuctionPlacedBids] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenderResponse = await fetch(
          `https://mazadoman.com/backend/api/tenders/count/${user?.id}`
        );
        const quoteResponse = await fetch(
          `https://mazadoman.com/backend/api/quotes/count/user/${user?.id}`
        );
        const forwardAuctionResponse = await fetch(
          `https://mazadoman.com/backend/api/auctions/user/${user?.id}/count/forward`
        );
        const reverseAuctionResponse = await fetch(
          `https://mazadoman.com/backend/api/auctions/user/${user?.id}/count/reverse`
        );
        const forwardBidsResponse = await fetch(
          `https://mazadoman.com/backend/api/user/bids/forward/${user?.id}`
        );
        const reverseBidsResponse = await fetch(
          `https://mazadoman.com/backend/api/user/bids/reverse/${user?.id}`
        );

        if (
          !tenderResponse.ok ||
          !quoteResponse.ok ||
          !forwardAuctionResponse.ok ||
          !reverseAuctionResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const tenderData = await tenderResponse.json();
        const quoteData = await quoteResponse.json();
        const forwardAuctionData = await forwardAuctionResponse.json();
        const reverseAuctionData = await reverseAuctionResponse.json();
        const forwardBidsData = await forwardBidsResponse.json();
        const reverseBidsData = await reverseBidsResponse.json();

        setTenderPosted(tenderData.tender_count);
        setTenderQuoted(quoteData.quote_count);
        setForwardAuctionPosted(forwardAuctionData.forward_auction_count);
        setReverseAuctionPosted(reverseAuctionData.reverse_auction_count);
        setForwardAuctionPlacedBids(forwardBidsData.forward_bids_count);
        setReverseAuctionPlacedBids(reverseBidsData.reverse_bids_count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const data = {
    labels: [
      t.tendersPosted,
      t.tendersQuoted,
      t.forwardAuctionsPosted,
      t.forwardBidsPlaced,
      t.reverseAuctionsPosted,
      t.reverseBidsPlaced,
    ],
    datasets: [
      {
        label: t.overview,
        data: [
          tenderPosted,
          tenderQuoted,
          forwardAuctionPosted,
          forwardAuctionPlacedBids,
          reverseAuctionPosted,
          reverseAuctionPlacedBids,
        ],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#22c55e",
          "#6b7280",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: { stacked: false },
      y: { stacked: false },
    },
  };

  const rtlClass = language === "ar" ? "text-right" : "text-left";
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} className={`p-4 ${rtlClass}`}>
      <Loading isLoading={loading} />
      <h1 className="text-3xl font-bold mb-6">
        {t.welcome},{" "}
        <span className="text-orange-500">{user?.company_name}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-500 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{t.tendersPosted}</h2>
          <p className="text-3xl">{tenderPosted}</p>
        </div>
        <div className="bg-purple-400 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{t.tendersQuoted}</h2>
          <p className="text-3xl">{tenderQuoted}</p>
        </div>
        <div className="bg-amber-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            {t.forwardAuctionsPosted}
          </h2>
          <p className="text-3xl">{forwardAuctionPosted}</p>
        </div>
        <div className="bg-orange-500 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{t.forwardBidsPlaced}</h2>
          <p className="text-3xl">{forwardAuctionPlacedBids}</p>
        </div>
        <div className="bg-green-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            {t.reverseAuctionsPosted}
          </h2>
          <p className="text-3xl">{reverseAuctionPosted}</p>
        </div>
        <div className="bg-red-400 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{t.reverseBidsPlaced}</h2>
          <p className="text-3xl">{reverseAuctionPlacedBids}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{t.analyticsOverview}</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
