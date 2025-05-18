"use client";
import Loading from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function PostedAuctionsPage() {
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.session.user);

  const userId = user?.id; // Example user ID

  useEffect(() => {
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

    // Fetch tenders by user ID
    fetch(`https://mazadoman.com/backend/api/user/bids/details/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tenders.");
        }
        return response.json();
      })
      .then((data) => {
        setAuctions(data.bids); // Assuming the response has a 'tenders' array
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const filteredAuctions = auctions.filter(
    (auction) => filter === "all" || auction.auction_type === filter
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Loading isLoading={loading} />
      <h1 className="text-2xl text-center text-orange-400 font-bold mb-4">
        List of Placed Bids
      </h1>

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-4">
        {["all", "Forward", "Reverse"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 cursor-pointer rounded-md border ${
              filter === type
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-purple-500 hover:text-white transition`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Auctions
          </button>
        ))}
      </div>

      {/* Auction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuctions.map((auction) => (
          <div
            key={auction.id}
            onClick={() => {
              router.push(
                `/admin/auctions/placed-bids/view_auction?id=${encodeURIComponent(
                  auction?.auction_id
                )}`
              );
            }}
            className="border rounded-lg p-4 cursor-pointer bg-orange-400 shadow-sm hover:shadow-md transition"
          >
            <div className="text-sm text-white">ID: {auction.auction_id}</div>
            <h2 className="text-lg font-semibold mt-2">{auction.title}</h2>
            <div
              className={`mt-2 inline-block px-3 py-1 text-sm rounded-md ${
                auction.type === "forward"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {auction.auction_type.charAt(0).toUpperCase() +
                auction.auction_type.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
