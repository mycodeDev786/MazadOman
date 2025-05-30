"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/LoadingSpinner";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useLanguage } from "../../../../components/LanguageContext";
import { translations } from "../../../../translations/placed_bid_translation";

export default function TenderPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const user = useSelector((state) => state.session.user);
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResubmitModal, setShowResubmitModal] = useState(false);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [technicalOffer, setTechnicalOffer] = useState(null);
  const [commercialOffer, setCommercialOffer] = useState(null);
  const [totalOffer, setTotalOffer] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // convert FileList to array
    setAdditionalFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  useEffect(() => {
    const fetchTenderInformation = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/auction/bid-by-user/${id}/${user?.id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender");
        }

        const data = await response.json();
        console.log(data.bid);
        setTender(data.bid);
        setTotalOffer(data.bid.bid_amount);

        // Pre-fill form data for editing
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderInformation();
  }, [id]);

  const isBiddingBooked =
    tender?.status && tender?.status.toLowerCase().includes("approve");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    if (totalOffer !== undefined) {
      formData.append("bid_amount", totalOffer);
    } else {
      console.error("Total Offer is undefined!");
    }

    if (technicalOffer) {
      formData.append("offer_file", technicalOffer);
    }

    // Laravel will interpret this as a PUT request
    formData.append("_method", "PUT");

    try {
      const response = await fetch(
        `https://mazadoman.com/backend/api/auction/bid/update/${tender.bid_id}`,
        {
          method: "POST", // <-- Use POST here
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Server Error:", result);
      } else {
        toast.success(t.updateSuccess);
        window.location.reload();
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }

    setShowEditModal(false);
    setShowResubmitModal(false);
    setLoading(false);
  };

  return (
    <div
      className={`p-6 max-w-6xl mx-auto ${isRTL ? "text-right" : "text-left"}`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Loading isLoading={loading} />
      <h1 className="text-2xl text-orange-400 font-bold text-center mb-4">
        {t.pageTitle}
      </h1>
      <div className="flex justify-between">
        {/* Tender Info */}
        <div className="space-y-4 flex-1 pl-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{t.auctionId}</span>
            <p className="text-amber-700 m-0">{tender?.auction_id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{t.auctionTitle}</span>
            <p className="text-amber-700 m-0">{tender?.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{t.placedBid}</span>
            <p className="text-amber-700 m-0">
              {tender?.bid_amount} {t.currency}
            </p>
          </div>

          <div>
            <span className="text-gray-500">{t.status}</span>{" "}
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${(() => {
                const status = tender?.status?.toLowerCase();
                if (!status) return "bg-gray-100 text-gray-700";
                if (status.includes("accepted") || status.includes("accepted"))
                  return "bg-green-100 text-green-800";
                if (status.includes("rejected"))
                  return "bg-red-100 text-red-800";
                if (status.includes("pending") || status.includes(""))
                  return "bg-yellow-100 text-yellow-800";
              })()}`}
            >
              {(() => {
                const status = tender?.status?.toLowerCase();
                if (!status) return null;
                if (status.includes("approve") || status.includes("award"))
                  return "✅";
                if (status.includes("reject")) return "❌";
                if (status.includes("submit") || status.includes("resubmit"))
                  return "📤";
                if (status.includes("postpond") || status.includes("postponed"))
                  return "🕓";
                if (status.includes("cancel")) return "🚫";
                return "ℹ️";
              })()}
              {tender?.status}
            </span>
          </div>

          <div>
            <span className="text-gray-500">{t.offerFile}</span>{" "}
            <a
              href={`https://mazadoman.com/backend/${tender?.offer_file}`}
              className="text-blue-600 hover:underline"
              download
            >
              {t.download}
            </a>
          </div>

          {isBiddingBooked && (
            <Link
              href="#"
              className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {t.enterOnlineBidding}
            </Link>
          )}
        </div>
        {/* Left Side Buttons */}
        <div className="flex flex-col space-y-2">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => setShowEditModal(true)}
          >
            ✏️ {t.edit}
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setShowResubmitModal(true)}
          >
            📤 {t.resubmit}
          </button>
        </div>
      </div>
      {/* Modal Template */}
      {(showEditModal || showResubmitModal) && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <Loading isLoading={loading} />
            <h2 className="text-xl font-semibold mb-4">
              {showEditModal ? t.editTitle : t.resubmitTitle}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(showEditModal ? "Edit" : "Resubmit");
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">
                  {t.bidAmount} ({t.currency}):
                </label>
                <input
                  type="number"
                  name="quote_amount"
                  value={totalOffer}
                  onChange={(e) => setTotalOffer(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  {t.offerFileLabel}
                </label>
                <input
                  type="file"
                  name="technical_offer"
                  accept=".pdf"
                  onChange={(e) => setTechnicalOffer(e.target.value)}
                  className="w-full border p-1.5 mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => {
                    setShowEditModal(false);
                    setShowResubmitModal(false);
                  }}
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
