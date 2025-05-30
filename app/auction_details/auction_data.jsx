"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/LoadingSpinner";
import { formatDate, formatDateWithLan } from "../utils/formatDate";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/translation";

export default function TenderDetails() {
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tender, setTender] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [technicalOffer, setTechnicalOffer] = useState(null);
  const [totalOffer, setTotalOffer] = useState(0);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!id) return;

    const fetchTenderDetails = async () => {
      setTender(null);
      setLoading(true);
      try {
        const res = await fetch(
          `https://mazadoman.com/backend/api/auction/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch tender details");
        const data = await res.json();

        setTender(data);
      } catch (err) {
        setError("Unable to fetch tender details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderDetails();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Helper to format duration
  const formatRemainingTime = (ms) => {
    const toArabicDigits = (num) =>
      String(num).replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[digit]);

    if (ms <= 0) return t.biddingClosed;

    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (language === "ar") {
      return `${toArabicDigits(days)}ي ${toArabicDigits(
        hours
      )}س ${toArabicDigits(minutes)}د ${toArabicDigits(seconds)}ث`;
    }

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const nowInOman = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Muscat" })
      );

      const deadline = new Date(`${tender?.bid_end_date}T23:59:00+04:00`);
      const timeDiff = deadline - nowInOman;

      setRemainingTime(formatRemainingTime(timeDiff));
    }, 1000);

    return () => clearInterval(interval);
  }, [tender?.bid_end_date]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!totalOffer || isNaN(totalOffer)) {
      setError(t.invalidOffer);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");

      if (!token || !user?.id) {
        setError(t.authError);
        return;
      }

      const formData = new FormData();
      formData.append("offer_file", technicalOffer);
      formData.append("bid_amount", totalOffer);
      formData.append("user_id", user?.id);
      formData.append("auction_id", id);

      const response = await fetch(
        "https://mazadoman.com/backend/api/auctions/place-bid",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json().catch(() => {
        throw new Error("Invalid JSON response from server.");
      });

      if (!response.ok) {
        // Backend returned a validation or logical error
        const errorMessage =
          result?.error && typeof result.error === "string"
            ? result.error
            : typeof result === "string"
            ? result
            : "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }

      toast.success(t.bidSuccess);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Submission Error:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-4xl bg-fuchsia-100 rounded-2xl shadow-lg p-6 md:p-10">
        <Loading isLoading={loading} />
        <Toaster position="top-center" reverseOrder={false} />
        {tender && (
          <>
            <Image
              src={`${tender.image}`}
              alt={tender.title || ""}
              width={800}
              height={300}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h1 className="text-3xl md:text-4xl text-center font-bold text-lime-400 mb-2">
              {tender.title}
            </h1>
            <div className="text-gray-600 space-y-1 mb-4">
              <p>
                <strong>{t.company}:</strong> {tender?.company_name}
              </p>
              <p className="text-gray-700 whitespace-pre-line ">
                <strong>{t.description}:</strong> {tender.description}
              </p>
              <p>
                <strong>{t.bidPrice}:</strong> {tender.budget} {t.currency}
              </p>

              <p className="text-red-600">
                <strong className=" text-bold ">{t.deadline}:</strong>{" "}
                {formatDateWithLan(tender.bid_end_date, language)}
              </p>
              <p>
                <strong>{t.createdUpdatedDate}:</strong>{" "}
                {formatDateWithLan(tender.created_at, language)}
              </p>
            </div>

            {tender?.additional_files?.length > 0 && (
              <div className="flex flex-col gap-4 mb-10">
                {tender.additional_files.map((file, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:gap-4 border rounded p-4 shadow-sm"
                  >
                    <p className="flex-1 font-medium text-gray-700">
                      {t.additionalDoc} {index + 1}
                    </p>
                    <div className="flex gap-3 mt-2 sm:mt-0">
                      <a
                        href={`${file.file_path}`}
                        download
                        className="px-5 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition text-sm text-center"
                      >
                        {t.download}
                      </a>
                      <a
                        href={`${file.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-sm text-center"
                      >
                        {t.view}
                      </a>
                    </div>
                  </div>
                ))}
                {/* Remaining Time */}
              </div>
            )}
            <div className=" text-lime-600 font-semibold text-center text-lg mb-4">
              <span className=" font-semibold text-indigo-700">
                {t.latestBid}:
              </span>{" "}
              {""}
              {tender.latest_bid_price} {t.currency}
            </div>

            {/* Remaining Time */}
            <div className="text-lime-500 font-semibold text-center text-lg mb-4">
              <span className=" font-semibold text-orange-400">
                {t.remainingTime}:
              </span>{" "}
              {remainingTime}
            </div>
          </>
        )}

        <div className="border-t pt-6">
          {!isLoggedIn ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">{t.loginRequired}</p>
              <Link
                href="/login"
                className="inline-block px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
              >
                {t.loginCheck}
              </Link>
            </div>
          ) : (
            <div>
              {remainingTime === t.biddingClosed ? (
                <div className="text-center text-red-600 font-semibold text-lg">
                  {t.biddingClosed}
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {t.submitBid}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-600">{error}</p>}
                    <div>
                      <label
                        htmlFor="totalOffer"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t.totalBid}:
                      </label>
                      <input
                        type="text"
                        id="totalOffer"
                        value={totalOffer}
                        onChange={(e) => setTotalOffer(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className={`${isRTL ? "rtl" : ""}`}>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        {t.uploadTechOffer || "Upload Technical Offer (PDF)"}
                      </label>
                      <div
                        className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                        style={{ height: "3rem" }}
                      >
                        <span
                          className={`absolute top-1/2 ${
                            isRTL ? "right-3" : "left-3"
                          } transform -translate-y-1/2 text-gray-500 text-sm`}
                          style={{ pointerEvents: "none" }}
                        >
                          {technicalOffer
                            ? technicalOffer.name
                            : t.noFileChosen || "No file chosen"}
                        </span>
                        <input
                          type="file"
                          id="technicalOffer"
                          accept="application/pdf"
                          onChange={(e) => setTechnicalOffer(e.target.files[0])}
                          className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                          style={{ direction: isRTL ? "rtl" : "ltr" }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 cursor-pointer bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition"
                    >
                      {t.submitBtn}
                    </button>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
