"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/translation";

export default function OnlineBidding() {
  const [fullBidTender, setFullBidTender] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [currentBids, setCurrentBids] = useState([]);
  const [upcomingBids, setUpcomingBids] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [userBidAmount, setUserBidAmount] = useState("");

  const user = useSelector((state) => state.session.user);
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

  useEffect(() => {
    if (!fullBidTender) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(
        `${fullBidTender.bid_start_date}T${fullBidTender.bid_end_time}`
      ).getTime();

      const distance = end - now;

      if (distance <= 0) {
        setRemainingTime("00:00:00");
        clearInterval(interval);
      } else {
        const hours = String(Math.floor(distance / (1000 * 60 * 60))).padStart(
          2,
          "0"
        );
        const minutes = String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
        const seconds = String(
          Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0");

        setRemainingTime(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [fullBidTender]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/bids/user/${user?.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch bids");

        const data = await response.json();
        setBids(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [user?.id]);

  useEffect(() => {
    const now = new Date();

    const tendersWithDates = bids.map((bid) => {
      return {
        ...bid,
        startDate: new Date(`${bid.bid_start_date}T${bid.bid_start_time}`),
        endDate: new Date(`${bid.bid_start_date}T${bid.bid_end_time}`),
      };
    });

    const fullBid = tendersWithDates.find((tender) => {
      const timeUntilStart = tender.startDate.getTime() - now.getTime();
      return timeUntilStart <= 30 * 60 * 1000 && tender.endDate > now;
    });

    if (fullBid) {
      setFullBidTender(fullBid);
    } else {
      const current = tendersWithDates.filter((t) => {
        const timeLeft = t.endDate.getTime() - now.getTime();
        return (
          t.startDate <= now &&
          t.endDate > now &&
          timeLeft <= 24 * 60 * 60 * 1000
        );
      });

      const upcoming = tendersWithDates.filter((t) => t.startDate > now);
      setCurrentBids(current);
      setUpcomingBids(upcoming);
    }
  }, [bids]);

  const handleBidChange = (e) => {
    setUserBidAmount(e.target.value);
  };

  const handleBidSubmit = async () => {
    if (!userBidAmount || isNaN(userBidAmount) || userBidAmount <= 0) {
      setError(t.invalidBid);
      return;
    }

    const bidData = {
      bid_id: fullBidTender.id,
      user_id: user.id,
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
        alert(t.bidSuccess);
        setBidPlaced(true);
      } else {
        alert(t.bidError + data.message);
      }
    } catch (err) {
      console.error(err);
      alert(t.bidError);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center text-gray-800 font-sans ${
        isArabic ? "text-right rtl" : "text-left ltr"
      }`}
    >
      {fullBidTender ? (
        <>
          <h1 className="text-2xl text-orange-500 font-bold mb-6">
            {t.welcome} : {user?.company_name}
          </h1>

          <div
            className={`self-${
              isArabic ? "start" : "end"
            } text-sm mb-10 space-y-1`}
          >
            <p>
              <span className="font-semibold text-green-500">
                {t.biddingStart}:{" "}
              </span>
              {fullBidTender.bid_start_time}
            </p>
            <p>
              <span className="font-semibold text-red-500">
                {t.biddingEnd}:{" "}
              </span>
              {fullBidTender.bid_end_time}
            </p>
          </div>

          <div className="w-full max-w-md bg-purple-300 rounded-lg shadow-md p-6 mb-10">
            <div className="space-y-4">
              <p>
                <span className="font-semibold">{t.tenderNo}:</span>{" "}
                {fullBidTender.tender_id}
              </p>
              <p>
                <span className="font-semibold">{t.tenderName}:</span>{" "}
                {fullBidTender.tender.title}
              </p>
              <p>
                <span className="font-semibold">{t.numberOfBidders}:</span>{" "}
                {fullBidTender.bidders.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-xl font-semibold gap-2">
                <span>⏳</span>
                <span>{remainingTime}</span>
              </div>
              <div className="text-xl font-semibold border border-gray-300 px-5 py-2 rounded-md bg-white">
                {fullBidTender.bidding_price}
              </div>
              <span className="text-xl font-semibold">OMR</span>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="00.00"
                value={userBidAmount}
                onChange={handleBidChange}
                className="text-base border border-amber-500 px-4 h-12 rounded-md text-center w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                disabled={bidPlaced}
                onClick={handleBidSubmit}
                className="bg-blue-600 text-white px-6 h-12 rounded-md font-semibold hover:bg-blue-700 transition-all shadow text-base"
              >
                {t.bidNow}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl text-orange-400 font-bold mb-4">
            {t.welcome} : {user?.company_name}
          </h1>

          {currentBids.length > 0 && (
            <div className="w-full max-w-2xl mb-8">
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                {t.currentBiddings}
              </h2>
              <ul className="space-y-4">
                {currentBids.map((bid) => (
                  <li
                    key={bid.id}
                    className="bg-white p-4 shadow rounded border"
                  >
                    <p className="font-semibold">{bid.tenderName}</p>
                    <p>
                      {t.tenderNo}: {bid.tender_id}
                    </p>
                    <p>
                      {t.endTime}: {bid.endTime}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {upcomingBids.length > 0 && (
            <div className="w-full max-w-2xl">
              <h2 className="text-lg font-semibold text-blue-600 mb-2">
                {t.upcomingBiddings}
              </h2>
              <ul className="space-y-4">
                {upcomingBids.map((bid) => (
                  <li
                    key={bid.id}
                    className="bg-white p-4 shadow rounded border"
                  >
                    <p className="font-bold">{bid.tender.title}</p>
                    <p className="font-bold">
                      {t.tenderNo}:{" "}
                      <span className="text-orange-500">{bid.tender_id}</span>
                    </p>
                    <p className="font-bold">
                      {t.startDate}:{" "}
                      <span className="text-orange-500">
                        {bid.bid_start_date}
                      </span>
                    </p>
                    <p className="font-bold">
                      {t.startTime}:{" "}
                      <span className="text-orange-500">
                        {bid.bid_start_time}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentBids.length === 0 && upcomingBids.length === 0 && (
            <p>{t.noBidsFound}</p>
          )}
        </>
      )}
    </div>
  );
}
