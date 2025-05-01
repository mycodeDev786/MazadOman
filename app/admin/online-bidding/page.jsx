"use client";
// pages/tender.js
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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center text-gray-800 font-sans">
      {/* Header */}
      <h1 className="text-2xl text-orange-500 font-bold mb-6">
        Welcome : {dummyTender.companyName}
      </h1>

      {/* Bidding Time */}
      <div className="self-end   text-sm  mb-10 space-y-1 ">
        <p>
          <span className="font-semibold text-green-500">
            Online bidding start:{" "}
          </span>
          {dummyTender.startTime}
        </p>
        <p>
          <span className="font-semibold text-red-500">
            Online bidding end:{" "}
          </span>
          {dummyTender.endTime}
        </p>
      </div>

      {/* Tender Details */}
      <div className="w-full max-w-md bg-purple-300 rounded-lg shadow-md p-6 mb-10">
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Tender No.:</span>{" "}
            {dummyTender.tenderNo}
          </p>
          <p>
            <span className="font-semibold">Tender Name:</span>{" "}
            {dummyTender.tenderName}
          </p>
          <p>
            <span className="font-semibold">Number of Bidders:</span>{" "}
            {dummyTender.biddersCount}
          </p>
        </div>
      </div>

      {/* Timer, Current Bid, New Bid Input & Button */}
      <div className="flex flex-col items-center gap-6 mb-10">
        {/* Timer & Current Bid */}
        <div className="flex items-center gap-4">
          <div className="flex items-center text-xl font-semibold gap-2">
            <span>⏳</span>
            <span>{dummyTender.timeLeft}</span>
          </div>
          <div className="text-xl font-semibold border border-gray-300 px-5 py-2 rounded-md bg-white">
            {dummyTender.currentBid}
          </div>
          <span className="text-xl font-semibold">OMR</span>
        </div>

        {/* New Bid Input and Button */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="00.00"
            className="text-base border border-amber-500 px-4 h-12 rounded-md text-center w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-600 text-white px-6 h-12 rounded-md font-semibold hover:bg-blue-700 transition-all shadow text-base">
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
}
