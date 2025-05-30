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
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tender, setTender] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [technicalOffer, setTechnicalOffer] = useState(null);
  const [commercialOffer, setCommercialOffer] = useState(null);
  const [totalOffer, setTotalOffer] = useState(0);
  const user = useSelector((state) => state.session.user);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // convert FileList to array
    setAdditionalFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  useEffect(() => {
    if (!id) return;

    const fetchTenderDetails = async () => {
      setTender(null);
      setLoading(true);
      try {
        const res = await fetch(
          `https://mazadoman.com/backend/api/tenders/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch tender details");
        const data = await res.json();
        setTender(data.tender);
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
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!technicalOffer || !commercialOffer) {
      setError(t.uploadBothOffers);
      return;
    }

    if (!totalOffer || isNaN(totalOffer)) {
      setError(t.invalidTotalOffer);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      // Assume you store userId after login

      if (!token || !user?.id) {
        setError(t.authError);
        return;
      }

      const formData = new FormData();
      formData.append("technical_offer", technicalOffer);
      formData.append("commercial_offer", commercialOffer);
      formData.append("quote_amount", totalOffer);
      formData.append("user_id", user?.id);
      formData.append("tender_id", id);
      if (additionalFiles && additionalFiles.length > 0) {
        additionalFiles.forEach((file) => {
          formData.append("additional_files[]", file);
        });
      }
      const response = await fetch(
        "https://mazadoman.com/backend/api/quotes/post",
        {
          method: "POST",

          body: formData,
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to submit offer.");
      }

      toast.success(t.offerSubmitted);
      router.push("/admin/dashboard"); // Or redirect wherever appropriate
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 ${
        isRTL ? "rtl" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-4xl bg-lime-100 rounded-2xl shadow-lg p-6 md:p-10">
        <Loading isLoading={loading} />
        <Toaster position="top-center" reverseOrder={false} />
        {tender && (
          <>
            <Image
              src={`https://mazadoman.com/backend/${tender.image}`}
              alt={tender.title || ""}
              width={800}
              height={300}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h1 className="text-3xl md:text-4xl text-center font-bold text-fuchsia-700 mb-2">
              {tender.title}
            </h1>
            <div className="text-gray-600 space-y-1 mb-4">
              <p>
                <strong>{t.company}:</strong>{" "}
                {tender?.companyuser?.company_name}
              </p>
              <p className="text-gray-700 whitespace-pre-line ">
                <strong>{t.description}:</strong> {tender.description}
              </p>
              <p>
                <strong>{t.budget}:</strong> {tender.budget} {t.currency}
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

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={"https://mazadoman.com/backend/" + tender?.boq}
                download
                className="px-5 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition"
              >
                {t.downloadBoq}
              </a>
              <a
                href={"https://mazadoman.com/backend/" + tender?.boq}
                target="_blank"
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                {t.viewBoq}
              </a>
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={"https://mazadoman.com/backend/" + tender?.scope}
                download
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {t.downloadScope}
              </a>
              <a
                href={"https://mazadoman.com/backend/" + tender?.scope}
                target="_blank"
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                {t.viewScope}
              </a>
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
                        href={`https://mazadoman.com/backend/${file.file_path}`}
                        download
                        className="px-5 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition text-sm text-center"
                      >
                        {t.download}
                      </a>
                      <a
                        href={`https://mazadoman.com/backend/${file.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-sm text-center"
                      >
                        {t.view}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div className="border-t pt-6">
          {!isLoggedIn ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">{t.loginToSubmit}</p>
              <Link
                href="/login"
                className="inline-block px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
              >
                {t.loginCheck}
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t.submitOffer}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-600">{error}</p>}
                <div>
                  <label
                    htmlFor="totalOffer"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.totalOffer} ({t.currency}):
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

                <div className={`${isRTL ? "rtl" : ""}`}>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    {t.uploadCommOffer || "Upload Commercial Offer (PDF)"}
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
                      {commercialOffer
                        ? commercialOffer.name
                        : t.noFileChosen || "No file chosen"}
                    </span>
                    <input
                      type="file"
                      id="commercialOffer"
                      accept="application/pdf"
                      onChange={(e) => setCommercialOffer(e.target.files[0])}
                      className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                      style={{ direction: isRTL ? "rtl" : "ltr" }}
                    />
                  </div>
                </div>

                {/*  additional */}
                <div className={`${isRTL ? "rtl" : ""}`}>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    {t.uploadAdditional || "Upload Additional Documents"}
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
                      } transform -translate-y-1/2 text-gray-500 text-sm truncate max-w-[85%]`}
                      style={{ pointerEvents: "none" }}
                    >
                      {additionalFiles.length > 0
                        ? `${additionalFiles.length} ${
                            t.filesSelected || "files selected"
                          }`
                        : t.noFileChosen || "No file chosen"}
                    </span>
                    <input
                      type="file"
                      id="additional_documents"
                      multiple
                      onChange={handleFileChange}
                      className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                      style={{ direction: isRTL ? "rtl" : "ltr" }}
                    />
                  </div>

                  {additionalFiles.length > 0 && (
                    <ul className="mt-4 space-y-1 text-sm text-gray-700">
                      {additionalFiles.map((file, index) => (
                        <li key={index}>📄 {file.name}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 cursor-pointer bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition"
                >
                  {t.submit}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
