"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/LoadingSpinner";
import { useSelector } from "react-redux";
import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/quoted_translation";

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
          `https://mazadoman.com/backend/api/quotes/show/${id}/${user?.id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender");
        }

        const data = await response.json();
        console.log(data.data);
        setTender(data.data);
        setTotalOffer(data.data.quote_amount);

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

  const handleSubmit = async (type) => {
    // Add API request here to either edit or resubmit
    setLoading(true);
    const formData = new FormData();

    // Append only if the field exists
    if (totalOffer !== undefined) {
      formData.append("quote_amount", totalOffer);
    }

    if (technicalOffer) {
      formData.append("technical_offer", technicalOffer);
    }

    if (commercialOffer) {
      formData.append("commercial_offer", commercialOffer);
    }
    console.log(id);
    try {
      const response = await fetch(
        `https://mazadoman.com/backend/api/quotes/update/${tender?.quote_id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Error:", result);
        setLoading(false);
      } else {
        console.log("Quote updated:", result);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    setShowEditModal(false);
    setShowResubmitModal(false);

    setLoading(false);
    router.push("/admin/tender-quoted");
  };

  return (
    <div className={`p-6 max-w-6xl mx-auto`} dir={isRTL ? "rtl" : "ltr"}>
      <Loading isLoading={loading} />
      <h1 className="text-2xl font-bold text-center mb-4">
        {t.quotedTenderInfo}
      </h1>
      <div className="flex justify-between">
        {/* Tender Info */}
        <div className="space-y-4 flex-1 pl-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{t.tenderId}:</span>
            <p className="text-amber-700 m-0">{tender?.tender_id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{t.tenderTitle}:</span>
            <p className="text-amber-700 m-0">{tender?.tender_title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{t.totalOffer}:</span>
            <p className="text-amber-700 m-0">
              {tender?.quote_amount} {t.currency}
            </p>
          </div>

          <div>
            <span className="text-gray-500">{t.status}:</span>{" "}
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
            <span className="text-gray-500">{t.technicalOffer}:</span>{" "}
            <a
              href={`https://mazadoman.com/backend/${tender?.technical_offer}`}
              className="text-blue-600 hover:underline"
              download
            >
              {t.download}
            </a>
          </div>

          <div>
            <span className="text-gray-500">{t.commercialOffer}:</span>{" "}
            <a
              href={`https://mazadoman.com/backend/${tender?.commercial_offer}`}
              className="text-blue-600 hover:underline"
              download
            >
              {t.download}
            </a>
          </div>
          <div>
            <span className="text-gray-500">{t.additionalFiles}:</span>
            <div className="ml-2 mt-1 space-y-1">
              {tender?.additional_files?.length > 0 ? (
                tender.additional_files.map((file, index) => (
                  <div key={index}>
                    <a
                      href={`https://mazadoman.com/backend/${file}`}
                      className="text-blue-600 hover:underline"
                      download
                    >
                      File {index + 1}
                    </a>
                  </div>
                ))
              ) : (
                <span className="text-gray-400">{t.noAdditionalFiles}</span>
              )}
            </div>
          </div>

          <div>
            <span className="text-gray-500">{t.biddingDate}:</span>{" "}
            <span className="font-semibold">{tender?.biddingDate}</span>
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
            📤{t.resubmitQuotation}
          </button>
        </div>
      </div>
      {/* Modal Template */}
      {(showEditModal || showResubmitModal) && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <Loading isLoading={loading} />
            <h2 className="text-xl font-semibold mb-4">
              {showEditModal ? t.editQuotation : t.resubmitQuotation}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(showEditModal ? "Edit" : "Resubmit");
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">
                  {t.quotedAmount} ({t.currency}):
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
                  {t.technicalOffer} ({t.pdf}):
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="technical_offer"
                    name="technical_offer"
                    accept=".pdf"
                    onChange={(e) => setTechnicalOffer(e.target.files[0])}
                    className="w-full border p-1.5 mt-1 opacity-0 absolute z-10"
                  />
                  <label
                    htmlFor="technical_offer"
                    className="block w-full border p-1.5 mt-1 cursor-pointer bg-white text-gray-700"
                  >
                    {technicalOffer ? technicalOffer.name : t.noFileChosen}
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  {t.commercialOffer} ({t.pdf}):
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="commercial_offer"
                    name="commercial_offer"
                    accept=".pdf"
                    onChange={(e) => setCommercialOffer(e.target.files[0])}
                    className="w-full border p-1.5 mt-1 opacity-0 absolute z-10"
                  />
                  <label
                    htmlFor="commercial_offer"
                    className="block w-full border p-1.5 mt-1 cursor-pointer bg-white text-gray-700"
                  >
                    {commercialOffer ? commercialOffer.name : t.noFileChosen}
                  </label>
                </div>
              </div>

              {/* Tender additional */}
              <div>
                <label
                  htmlFor="additional_documents"
                  className="block text-lg font-medium mb-2"
                >
                  {t.editAdditionalDocs}
                </label>

                <input
                  type="file"
                  id="additional_documents"
                  multiple
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />

                {additionalFiles.length > 0 && (
                  <ul className="mt-4 space-y-1 text-sm text-gray-700">
                    {additionalFiles.map((file, index) => (
                      <li key={index}>📄 {file.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div
                className={`flex ${
                  isRTL ? "justify-start" : "justify-end"
                } space-x-2 mt-4`}
              >
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
