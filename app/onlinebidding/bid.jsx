"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/translation";

export default function OnlineBidding() {
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";
  const textAlign = isArabic ? "text-right" : "text-left";
  const alignItems = isArabic ? "items-end" : "items-start";

  const searchParams = useSearchParams();
  const bidId = searchParams.get("bid_id");
  const expires = searchParams.get("expires");
  const userId = searchParams.get("user_id");
  const signature = searchParams.get("signature");

  const [userName, setUserName] = useState("");
  const [tenderName, setTenderName] = useState("");
  const [bidDetails, setBidDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userBidAmount, setUserBidAmount] = useState("");
  const [bidPlaced, setBidPlaced] = useState(false);

  useEffect(() => {
    if (bidId && expires && userId && signature) {
      fetch(
        `https://www.mazadoman.com/backend/api/verify-bid-link?bid_id=${bidId}&expires=${expires}&user_id=${userId}&signature=${signature}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setBidDetails(data.bidDetails);
            setUserName(data.companyName);
            setTenderName(data.tenderTitle);
          } else {
            setError(data.message || t.invalidOrExpired);
          }
        })
        .catch(() => {
          setError(t.errorFetchingDetails);
        })
        .finally(() => setLoading(false));
    } else {
      setError(t.missingParams);
      setLoading(false);
    }
  }, [bidId, expires, userId, signature, t]);

  const handleBidChange = (e) => {
    setUserBidAmount(e.target.value);
  };

  const handleBidSubmit = async () => {
    if (!userBidAmount || isNaN(userBidAmount) || userBidAmount <= 0) {
      setError(t.invalidBidAmount);
      return;
    }

    const bidData = {
      bid_id: bidId,
      user_id: userId,
      offered_price: userBidAmount,
    };

    try {
      const response = await fetch(
        "https://www.mazadoman.com/backend/api/bid-user",
        {
          method: "POST",
          body: JSON.stringify(bidData),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(t.successBid);
        setBidPlaced(true);
      } else {
        alert(`${t.errorBid}: ${data.message}`);
      }
    } catch {
      alert(t.errorBid);
    }
  };

  if (loading) {
    return <div className={`text-center py-4 ${textAlign}`}>{t.verifying}</div>;
  }

  if (error) {
    return (
      <div className={`p-4 text-red-600 text-center ${textAlign}`}>
        <h2 className="text-2xl font-semibold mb-2">{t.accessDenied}</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!bidDetails) {
    return (
      <div className={`text-center py-4 ${textAlign}`}>
        <p>{t.noDetails}</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 px-6 py-10 flex flex-col ${alignItems} text-gray-800 font-sans ${textAlign}`}
    >
      <h1 className="text-2xl text-orange-500 font-bold mb-6">
        {t.welcome} : {userName}
      </h1>

      <div className="w-full max-w-md bg-purple-300 rounded-lg shadow-md p-6 mb-10">
        <div className="space-y-4">
          <p>
            <span className="font-semibold">{t.tenderNumber}:</span>{" "}
            {bidDetails.tender_id}
          </p>
          <p>
            <span className="font-semibold">{t.tenderName}:</span> {tenderName}
          </p>
          <p>
            <span className="font-semibold">{t.biddersCount}:</span>{" "}
            {bidDetails.bidders.length}
          </p>
        </div>
      </div>

      <div className={`text-sm mb-10 space-y-1 ${alignItems}`}>
        <p>
          <span className="font-semibold text-green-500">{t.bidStart}: </span>
          {bidDetails.bid_start_time}
        </p>
        <p>
          <span className="font-semibold text-red-500">{t.bidEnd}: </span>
          {bidDetails.bid_end_time}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder={t.yourBid}
            value={userBidAmount}
            onChange={handleBidChange}
            className="text-base border border-amber-500 px-4 h-12 rounded-md text-center w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={bidPlaced}
          />
          <button
            onClick={handleBidSubmit}
            className="bg-blue-600 text-white px-6 h-12 rounded-md font-semibold hover:bg-blue-700 transition-all shadow text-base"
            disabled={bidPlaced}
          >
            {bidPlaced ? t.bidPlaced : t.placeBid}
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-green-600 mb-2">
          {t.currentBidders}
        </h2>
        <ul className="space-y-4">
          {bidDetails.bidders.map((bidder, index) => (
            <li key={index} className="bg-white p-4 shadow rounded border">
              <p className="font-semibold">{bidder.name}</p>
              <p>
                {t.bidAmount}: {bidder.bid_amount} OMR
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
