"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../../components/LanguageContext";
import { translations } from "../../../translations/translation";

export default function PostedAuctionsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setError(t.errorUserIdRequired);
      setLoading(false);
      return;
    }

    fetch(`https://mazadoman.com/backend/api/auctions/user/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error(t.errorFetchAuctions);
        return response.json();
      })
      .then((data) => {
        setAuctions(data.auctions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId, t.errorFetchAuctions, t.errorUserIdRequired]);

  const filteredAuctions = auctions.filter(
    (auction) => filter === "all" || auction.auction_type === filter
  );

  const isRTL = language === "ar";

  return (
    <div
      className={`p-6 max-w-6xl mx-auto ${isRTL ? "text-right" : "text-left"}`}
    >
      <h1 className="text-2xl font-bold mb-4">{t.pageTitle}</h1>

      {/* Filter Buttons */}
      <div className={`mb-6 flex gap-4 `}>
        {["all", "Forward", "Reverse"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-md border ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {t.filters[type]} {t.auctionsLabel}
          </button>
        ))}
      </div>

      {/* Auction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuctions.map((auction) => (
          <div
            key={auction.auction_id}
            onClick={() =>
              router.push(
                `/admin/auctions/posted-auctions/view_auction?id=${encodeURIComponent(
                  auction?.auction_id
                )}`
              )
            }
            className="border rounded-lg p-4 cursor-pointer bg-orange-400 shadow-sm hover:shadow-md transition"
          >
            <div className="text-sm text-white">
              {t.idLabel}: {auction.auction_id}
            </div>
            <h2 className="text-lg font-semibold mt-2">{auction.title}</h2>
            <div className="font-semibold text-green-800">
              {t.latestBidPriceLabel}: {auction.latest_bid_price}
            </div>
            <div
              className={`mt-2 inline-block px-3 py-1 text-sm rounded-md ${
                auction.auction_type === "Forward"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {t.filters[auction.auction_type]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
