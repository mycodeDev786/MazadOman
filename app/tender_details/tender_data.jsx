"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/LoadingSpinner";
import { formatDate } from "../utils/formatDate";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!technicalOffer || !commercialOffer) {
      setError("Please upload both technical and commercial offers.");
      return;
    }

    if (!totalOffer || isNaN(totalOffer)) {
      setError("Please enter a valid total offer.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      // Assume you store userId after login

      if (!token || !user?.id) {
        setError("User authentication error. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("technical_offer", technicalOffer);
      formData.append("commercial_offer", commercialOffer);
      formData.append("quote_amount", totalOffer);
      formData.append("user_id", user?.id);
      formData.append("tender_id", id);

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

      toast.success("Offer submitted successfully!");
      router.push("/admin/dashboard"); // Or redirect wherever appropriate
    } catch (error) {
      console.error(error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
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
            <h1 className="text-3xl md:text-4xl text-center font-bold text-amber-900 mb-2">
              {tender.title}
            </h1>
            <div className="text-gray-600 space-y-1 mb-4">
              <p>
                <strong>Company:</strong> {tender?.companyuser?.company_name}
              </p>
              <p>
                <strong>Budget:</strong> {tender.budget}
              </p>
              <p>
                <strong>Created and Last Updated Date:</strong>{" "}
                {formatDate(tender.created_at)}
              </p>
            </div>
            <p className="text-gray-700 whitespace-pre-line mb-6">
              <strong>Description:</strong> {tender.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={"https://mazadoman.com/backend/" + tender?.boq}
                download
                className="px-5 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition"
              >
                Download BOQ
              </a>
              <a
                href={"https://mazadoman.com/backend/" + tender?.boq}
                target="_blank"
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                View BOQ
              </a>
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={"https://mazadoman.com/backend/" + tender?.scope}
                download
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Download Scope of Work
              </a>
              <a
                href={"https://mazadoman.com/backend/" + tender?.scope}
                target="_blank"
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                View Scope of Work
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
                      Additional Document {index + 1}
                    </p>
                    <div className="flex gap-3 mt-2 sm:mt-0">
                      <a
                        href={`https://mazadoman.com/backend/${file.file_path}`}
                        download
                        className="px-5 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition text-sm text-center"
                      >
                        Download
                      </a>
                      <a
                        href={`https://mazadoman.com/backend/${file.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-sm text-center"
                      >
                        View
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
              <p className="text-gray-600 mb-4">
                You need to be logged in to submit your offer.
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
              >
                Login to Submit
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Submit Your Offer
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-600">{error}</p>}
                <div>
                  <label
                    htmlFor="totalOffer"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Offer (OMR):
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
                <div>
                  <label
                    htmlFor="technicalOffer"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Technical Offer (PDF)
                  </label>
                  <input
                    type="file"
                    id="technicalOffer"
                    accept="application/pdf"
                    onChange={(e) => setTechnicalOffer(e.target.files[0])}
                    className="block w-full border border-gray-300 rounded p-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="commercialOffer"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Commercial Offer (PDF)
                  </label>
                  <input
                    type="file"
                    id="commercialOffer"
                    accept="application/pdf"
                    onChange={(e) => setCommercialOffer(e.target.files[0])}
                    className="block w-full border border-gray-300 rounded p-2 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 cursor-pointer bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition"
                >
                  Submit Offer
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
