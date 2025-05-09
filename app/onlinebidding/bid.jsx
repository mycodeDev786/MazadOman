"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OnlineBidding() {
  const searchParams = useSearchParams();
  const bidId = searchParams.get("bid_id");
  const expires = searchParams.get("expires");
  const userId = searchParams.get("user_id");
  const signature = searchParams.get("signature");
  const [userName, setUserName] = useState("");
  const [tenderName, setTenderName] = useState("");

  const [bidDetails, setBidDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userBidAmount, setUserBidAmount] = useState(""); // For the current bid input
  const [bidPlaced, setBidPlaced] = useState(false); // Track if the user has already placed a bid

  useEffect(() => {
    if (bidId && expires && userId && signature) {
      // Call the API to verify the link and fetch bid details
      fetch(
        `https://www.mazadoman.com/backend/api/verify-bid-link?bid_id=${bidId}&expires=${expires}&user_id=${userId}&signature=${signature}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setBidDetails(data.bidDetails);
            setUserName(data.companyName);
            setTenderName(data.tenderTitle); // Assuming response contains the bid details
          } else {
            setError(data.message || "The link is invalid or expired.");
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching bid details.");
        })
        .finally(() => setLoading(false));
    } else {
      setError("Missing or invalid URL parameters.");
      setLoading(false);
    }
  }, [bidId, expires, userId, signature]);

  const handleBidChange = (e) => {
    setUserBidAmount(e.target.value); // Update the bid amount as the user types
  };

  const handleBidSubmit = async () => {
    // Check if the bid is a valid number
    if (!userBidAmount || isNaN(userBidAmount) || userBidAmount <= 0) {
      setError("Please enter a valid bid amount.");
      return;
    }

    // Prepare the bid data for submission
    const bidData = {
      bid_id: bidId, // Assuming bidId is coming from your state
      user_id: userId, // Assuming userId is coming from your state
      offered_price: userBidAmount, // Renamed from bid_amount to offered_price
    };

    try {
      // Submit the bid using fetch with async/await
      const response = await fetch(
        "https://www.mazadoman.com/backend/api/bid-user",
        {
          // Updated endpoint
          method: "POST",
          body: JSON.stringify(bidData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert("Your bid has been placed successfully!");
        setBidPlaced(true); // After a successful bid, mark the bid as placed
      } else {
        alert("Error placing bid: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error placing bid.");
    }
  };

  if (loading) {
    return <div className="text-center py-4">Verifying your session...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-center">
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!bidDetails) {
    return (
      <div className="text-center py-4">
        <p>No bidding details found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center text-gray-800 font-sans">
      <h1 className="text-2xl text-orange-500 font-bold mb-6">
        Welcome: {userName}
      </h1>

      <div className="w-full max-w-md bg-purple-300 rounded-lg shadow-md p-6 mb-10">
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Tender No.:</span>{" "}
            {bidDetails.tender_id}
          </p>
          <p>
            <span className="font-semibold">Tender Name:</span> {tenderName}
          </p>
          <p>
            <span className="font-semibold">Bidders Count:</span>{" "}
            {bidDetails.bidders.length}
          </p>
        </div>
      </div>

      <div className="self-end text-sm mb-10 space-y-1">
        <p>
          <span className="font-semibold text-green-500">Bidding Start: </span>
          {bidDetails.bid_start_time}
        </p>
        <p>
          <span className="font-semibold text-red-500">Bidding End: </span>
          {bidDetails.bid_end_time}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Your Bid "
            value={userBidAmount}
            onChange={handleBidChange}
            className="text-base border border-amber-500 px-4 h-12 rounded-md text-center w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={bidPlaced} // Disable input if the user has already placed a bid
          />
          <button
            onClick={handleBidSubmit}
            className="bg-blue-600 text-white px-6 h-12 rounded-md font-semibold hover:bg-blue-700 transition-all shadow text-base"
            disabled={bidPlaced} // Disable button if the user has already placed a bid
          >
            {bidPlaced ? "Bid Already Placed" : "Place Bid"}
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-green-600 mb-2">
          Current Bidders
        </h2>
        <ul className="space-y-4">
          {bidDetails.bidders.map((bidder, index) => (
            <li key={index} className="bg-white p-4 shadow rounded border">
              <p className="font-semibold">{bidder.name}</p>
              <p>Bid Amount: {bidder.bid_amount} OMR</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
