"use client"; // Mark this file as a client-side component

import { useState } from "react";

export default function TenderOfferForm({ tender }) {
  const [technicalOffer, setTechnicalOffer] = useState(null);
  const [commercialOffer, setCommercialOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!technicalOffer || !commercialOffer) {
      setError("Please upload both technical and commercial offers.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("technicalOffer", technicalOffer);
      formData.append("commercialOffer", commercialOffer);

      // Example of API call to submit the form
      // await fetch("/api/submit-tender-offer", { method: "POST", body: formData });

      setLoading(false);
      alert("Request submitted successfully!");
    } catch (error) {
      setLoading(false);
      setError("An error occurred while submitting your request.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label
          htmlFor="technicalOffer"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Technical Offer (PDF)
        </label>
        <input
          type="file"
          id="technicalOffer"
          accept="application/pdf"
          onChange={(e) => setTechnicalOffer(e.target.files[0])}
          className="mt-1 p-2 block w-full text-sm border border-gray-300 "
        />
      </div>
      <div>
        <label
          htmlFor="commercialOffer"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Commercial Offer (PDF)
        </label>
        <input
          type="file"
          id="commercialOffer"
          accept="application/pdf"
          onChange={(e) => setCommercialOffer(e.target.files[0])}
          className="mt-1 block w-full text-sm border border-gray-300 p-2"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
