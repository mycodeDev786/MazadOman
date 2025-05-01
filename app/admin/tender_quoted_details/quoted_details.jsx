"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/LoadingSpinner";

export default function TenderPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showResubmitModal, setShowResubmitModal] = useState(false);

  const [formData, setFormData] = useState({
    quote_amount: "",
    technical_offer: "",
    commercial_offer: "",
  });

  useEffect(() => {
    const fetchTenderInformation = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/quotes/tender/${id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender");
        }

        const data = await response.json();
        setTender(data.data[0]);

        // Pre-fill form data for editing
        setFormData({
          quote_amount: data.data[0]?.quote_amount || "",
          technical_offer: "",
          commercial_offer: "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTenderInformation();
  }, [id]);

  const isBiddingBooked =
    tender?.status && tender?.status.toLowerCase().includes("booked");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (type) => {
    // Add API request here to either edit or resubmit
    alert(`${type} submitted: ` + JSON.stringify(formData));
    setShowEditModal(false);
    setShowResubmitModal(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Loading isLoading={loading} />
      <h1 className="text-2xl font-bold text-center mb-4">
        Quoted Tender Information
      </h1>
      <div className="flex justify-between">
        {/* Tender Info */}
        <div className="space-y-4 flex-1 pl-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Tender Id:</span>
            <p className="text-amber-700 m-0">{tender?.tender_id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Tender title:</span>
            <p className="text-amber-700 m-0">{tender?.tender_title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Total offer:</span>
            <p className="text-amber-700 m-0">{tender?.quote_amount} OMR</p>
          </div>

          <div>
            <span className="text-gray-500">Status:</span>{" "}
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${(() => {
                const status = tender?.status?.toLowerCase();
                if (!status) return "bg-gray-100 text-gray-700";
                if (status.includes("approve") || status.includes("award"))
                  return "bg-green-100 text-green-800";
                if (status.includes("reject")) return "bg-red-100 text-red-800";
                if (status.includes("submit") || status.includes("resubmit"))
                  return "bg-yellow-100 text-yellow-800";
                if (status.includes("postpond") || status.includes("postponed"))
                  return "bg-orange-100 text-orange-800";
                if (status.includes("cancel"))
                  return "bg-gray-200 text-gray-700";
                return "bg-gray-100 text-gray-700";
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
            <span className="text-gray-500">Technical Offer:</span>{" "}
            <a
              href={`https://mazadoman.com/backend/${tender?.technical_offer}`}
              className="text-blue-600 hover:underline"
              download
            >
              Download
            </a>
          </div>

          <div>
            <span className="text-gray-500">Commercial Offer:</span>{" "}
            <a
              href={`https://mazadoman.com/backend/${tender?.commercial_offer}`}
              className="text-blue-600 hover:underline"
              download
            >
              Download
            </a>
          </div>

          <div>
            <span className="text-gray-500">Date & Time for Bidding:</span>{" "}
            <span className="font-semibold">{tender?.biddingDate}</span>
          </div>

          {isBiddingBooked && (
            <Link
              href="#"
              className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Enter to Online Bidding
            </Link>
          )}
        </div>
        {/* Left Side Buttons */}
        <div className="flex flex-col space-y-2">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => setShowEditModal(true)}
          >
            ✏️ Edit
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setShowResubmitModal(true)}
          >
            📤 Resubmit the Quotation
          </button>
        </div>
      </div>
      {/* Modal Template */}
      {(showEditModal || showResubmitModal) && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {showEditModal ? "Edit Quotation" : "Resubmit Quotation"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(showEditModal ? "Edit" : "Resubmit");
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">
                  Quoted Amount (OMR):
                </label>
                <input
                  type="number"
                  name="quote_amount"
                  value={formData.quote_amount}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  Technical Offer (PDF):
                </label>
                <input
                  type="file"
                  name="technical_offer"
                  accept=".pdf"
                  onChange={handleInputChange}
                  className="w-full mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  Commercial Offer (PDF):
                </label>
                <input
                  type="file"
                  name="commercial_offer"
                  accept=".pdf"
                  onChange={handleInputChange}
                  className="w-full mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => {
                    setShowEditModal(false);
                    setShowResubmitModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
