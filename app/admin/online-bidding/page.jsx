"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OnlineBidding() {
  const dummyTender = {
    companyName: "ABC Corp",
    tenderNo: "T-12345",
    tenderName: "Supply of Equipment",
    biddersCount: 5,
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    timeLeft: "06:30",
    currentBid: "150.000",
    currency: "OMR",
  };

  const handleBidSubmit = async () => {
    // Check if the bid is a valid number
    if (!userBidAmount || isNaN(userBidAmount) || userBidAmount <= 0) {
      setError("Please enter a valid bid amount.");
      return;
    }

    // Prepare the bid data for submission
    const bidData = {
      bid_id: fullBidTender.id, // Assuming bidId is coming from your state
      user_id: user.id, // Assuming userId is coming from your state
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
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center text-gray-800 font-sans">
      {fullBidTender ? (
        <>
          {/* Full Bidding UI */}
          <h1 className="text-2xl text-orange-500 font-bold mb-6">
            Welcome: {user?.company_name}
          </h1>

          <div className="self-end text-sm mb-10 space-y-1">
            <p>
              <span className="font-semibold text-green-500">
                Online bidding start:{" "}
              </span>
              {fullBidTender.bid_start_time}
            </p>
            <p>
              <span className="font-semibold text-red-500">
                Online bidding end:{" "}
              </span>
              {fullBidTender.bid_end_time}
            </p>
          </div>

          <div className="w-full max-w-md bg-purple-300 rounded-lg shadow-md p-6 mb-10">
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Tender No.:</span>{" "}
                {fullBidTender.tender_id}
              </p>
              <p>
                <span className="font-semibold">Tender Name:</span>{" "}
                {fullBidTender.tender.title}
              </p>
              <p>
                <span className="font-semibold">Number of Bidders:</span>{" "}
                {fullBidTender.bidders.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-xl font-semibold gap-2">
                <span>⏳</span>
                <span>{remainingTime}</span>
                {/* Timer logic can be added later */}
              </div>
              <div className="text-xl font-semibold border border-gray-300 px-5 py-2 rounded-md bg-white">
                {fullBidTender.bidding_price}
              </div>
              <span className="text-xl font-semibold">OMR</span>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="00.00"
                value={userBidAmount}
                onChange={handleBidChange}
                className="text-base border border-amber-500 px-4 h-12 rounded-md text-center w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                disabled={bidPlaced}
                onClick={handleBidSubmit}
                className="bg-blue-600 text-white px-6 h-12 rounded-md font-semibold hover:bg-blue-700 transition-all shadow text-base"
              >
                Bid Now
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl text-orange-400 font-bold mb-4">
            {" "}
            Welcome {user?.company_name}
          </h1>

          {currentBids.length > 0 && (
            <div className="w-full max-w-2xl mb-8">
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                Current Biddings
              </h2>
              <ul className="space-y-4">
                {currentBids.map((bid) => (
                  <li
                    key={bid.id}
                    className="bg-white p-4 shadow rounded border"
                  >
                    <p className="font-semibold">{bid.tenderName}</p>
                    <p>Tender No: {bid.tender_id}</p>
                    <p>End Time: {bid.endTime}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {upcomingBids.length > 0 && (
            <div className="w-full max-w-2xl">
              <h2 className="text-lg font-semibold text-blue-600 mb-2">
                Upcoming Biddings
              </h2>
              <ul className="space-y-4">
                {upcomingBids.map((bid) => (
                  <li
                    key={bid.id}
                    className="bg-white p-4 shadow rounded border"
                  >
                    <p className="font-bold">{bid.tender.title}</p>
                    <p className="font-bold">
                      Tender No:{" "}
                      <span className="text-orange-500  ">{bid.tender_id}</span>
                    </p>
                    <p className="font-bold">
                      Start Date :{" "}
                      <span className="text-orange-500  ">
                        {bid.bid_start_date}
                      </span>
                    </p>
                    <p className="font-bold">
                      Start Time:{" "}
                      <span className="text-orange-500  ">
                        {bid.bid_start_time}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentBids.length === 0 && upcomingBids.length === 0 && (
            <p>No current or upcoming bids found.</p>
          )}
        </>
      )}
    </div>
  );
}
