"use client";

import Link from "next/link";

export default function TenderDetails({ id }) {
  // Dummy Tender Data
  const tenderDetails = {
    1: {
      type: "Posted",
      subject: "Construction of Residential Buildings",
      description: " about residential building construction project.",
      status: "Pending", // Add a default status if it's a posted tender
    },
    2: {
      type: "Posted",
      subject: "Renovation of Office Spaces",
      description: "Details about the office spaces renovation tender.",
      status: "Pending", // Add a default status if it's a posted tender
    },
    101: {
      type: "Quoted",
      subject: "Road Expansion Project",
      description: "Quoted for expansion of national highways.",
      status: "Booked for Online Bidding", // ✅
      biddingDate: "2025-05-15 10:00 AM", // ✅
    },
    102: {
      type: "Quoted",
      subject: "School Infrastructure Development",
      description: "Proposal submitted for new school facilities construction.",
      status: "Under Review", // ✅
      biddingDate: "2025-05-20 2:00 PM", // ✅
    },
  };

  const tender = tenderDetails[id];

  if (!tender) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Tender Not Found</h1>
      </div>
    );
  }

  // 🔥 Determine if link should be active
  const isBiddingBooked =
    tender.status && tender.status.toLowerCase().includes("booked");

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}

      {/* Tender Details */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{tender.subject}</h1>
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div>
            <span className="text-gray-500">Company Name:</span>{" "}
            <span className="font-semibold">{tender.type}</span>
          </div>

          <div>
            <span className="text-gray-500">Title:</span>{" "}
            <span className="font-semibold">{tender.subject}</span>
          </div>

          <div>
            <span className="text-gray-500">Description:</span>{" "}
            <span className="mt-2 text-gray-700">{tender.description}</span>
          </div>

          {/* 🔥 Special Section for Quoted Tenders */}
          {tender.type === "Quoted" && (
            <div className="space-y-4">
              {/* Visit Profile & Download CR */}
              <div>
                <span className="text-gray-500">Visit Profile:</span>{" "}
                <Link
                  href={`/company/profile/${tender.companyId}`}
                  className="text-blue-600 hover:underline"
                >
                  View Company Profile
                </Link>
              </div>

              {/* Download CR */}
              <div>
                <span className="text-gray-500">Download CR:</span>{" "}
                <a
                  href="/path/to/cr.pdf"
                  className="text-blue-600 hover:underline"
                  download
                >
                  Download
                </a>
              </div>

              {/* Download Offers */}
              <div>
                <span className="text-gray-500">Download Technical Offer:</span>{" "}
                <a
                  href="/path/to/technical-offer.pdf"
                  className="text-blue-600 hover:underline"
                  download
                >
                  Download
                </a>
              </div>

              <div>
                <span className="text-gray-500">
                  Download Commercial Offer:
                </span>{" "}
                <a
                  href="/path/to/commercial-offer.pdf"
                  className="text-blue-600 hover:underline"
                  download
                >
                  Download
                </a>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>{" "}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full
  ${
    tender.status && tender.status.toLowerCase().includes("accept")
      ? "bg-green-100 text-green-800"
      : tender.status && tender.status.toLowerCase().includes("reject")
      ? "bg-red-100 text-red-800"
      : tender.status && tender.status.toLowerCase().includes("under review")
      ? "bg-yellow-100 text-yellow-800"
      : tender.status && tender.status.toLowerCase().includes("booked")
      ? "bg-blue-100 text-blue-800"
      : tender.status &&
        (tender.status.toLowerCase().includes("postpond") ||
          tender.status.toLowerCase().includes("postponed"))
      ? "bg-orange-100 text-orange-800"
      : tender.status && tender.status.toLowerCase().includes("cancel")
      ? "bg-gray-200 text-gray-700"
      : "bg-gray-100 text-gray-700"
  }
`}
                >
                  {/* Icon */}
                  {tender.status &&
                    tender.status.toLowerCase().includes("accept") &&
                    "✅"}
                  {tender.status &&
                    tender.status.toLowerCase().includes("reject") &&
                    "❌"}
                  {tender.status &&
                    tender.status.toLowerCase().includes("under review") &&
                    "🕑"}
                  {tender.status &&
                    tender.status.toLowerCase().includes("booked") &&
                    "📅"}
                  {tender.status &&
                    (tender.status.toLowerCase().includes("postpond") ||
                      tender.status.toLowerCase().includes("postponed")) &&
                    "🕓"}
                  {tender.status &&
                    tender.status.toLowerCase().includes("cancel") &&
                    "🚫"}

                  {/* Text */}
                  {tender.status}
                </span>
              </div>

              <div>
                <span className="text-gray-500">Date & Time for Bidding:</span>{" "}
                <span className="font-semibold">{tender.biddingDate}</span>
              </div>

              {/* Bidding Link */}
              {isBiddingBooked ? (
                <Link
                  href="#"
                  className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Enter to Online Bidding
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-block mt-2 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                >
                  Enter to Online Bidding
                </button>
              )}
            </div>
          )}

          {/* 🔥 Special Section for Tender Posted */}
          {tender.type === "Posted" && (
            <div className="space-y-4">
              {/* Status and Action Buttons */}
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-gray-500">Status:</span>{" "}
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full
                      ${
                        tender.status &&
                        tender.status.toLowerCase().includes("approved")
                          ? "bg-green-100 text-green-800"
                          : tender.status &&
                            tender.status.toLowerCase().includes("rejected")
                          ? "bg-red-100 text-red-800"
                          : tender.status &&
                            tender.status.toLowerCase().includes("postpond")
                          ? "bg-orange-100 text-orange-800"
                          : tender.status &&
                            tender.status.toLowerCase().includes("cancelled")
                          ? "bg-gray-200 text-gray-700"
                          : tender.status &&
                            tender.status.toLowerCase().includes("award")
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {/* Icon */}
                    {tender.status &&
                      tender.status.toLowerCase().includes("approved") &&
                      "✅"}
                    {tender.status &&
                      tender.status.toLowerCase().includes("rejected") &&
                      "❌"}
                    {tender.status &&
                      tender.status.toLowerCase().includes("postpond") &&
                      "🕓"}
                    {tender.status &&
                      tender.status.toLowerCase().includes("cancelled") &&
                      "🚫"}
                    {tender.status &&
                      tender.status.toLowerCase().includes("award") &&
                      "🏆"}

                    {/* Text */}
                    {tender.status}
                  </span>
                </div>
              </div>
              {/* Action Buttons for Approval/Actions */}
              <div className="my-2 space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-2">
                <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Approve
                </button>
                <button className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Reject
                </button>
                <button className="w-full sm:w-auto bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                  Submit Technical Offer
                </button>
                <button className="w-full sm:w-auto bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                  Resubmit Commercial Offer
                </button>
                <button className="w-full sm:w-auto bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                  Postpond
                </button>
                <button className="w-full sm:w-auto bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                  Cancel Tender
                </button>
                <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Award the Job
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
