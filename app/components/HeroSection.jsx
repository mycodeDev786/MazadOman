import { assets } from "@/assets/assets";
import React, { useState } from "react";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("Tenders");

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.hero})`,
        }}
      ></div>
      <div className="absolute inset-0  bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Find Your Perfect Opportunity
        </h1>
        <p className="text-lg md:text-xl mt-4 max-w-2xl">
          Discover amazing tenders, forward auctions, and reverse auctions in
          one place.
        </p>

        {/* Search Tab Panel */}
        <div className="bg-white shadow-xl rounded-xl mt-10 p-6 max-w-4xl w-full">
          {/* Tabs */}
          <div className="flex justify-around border-b border-gray-200 pb-2 mb-4">
            {["Tenders", "Forward Auction", "Reverse Auction"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-2 font-medium transition ${
                  activeTab === tab
                    ? "border-b-4 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
              <input
                type="text"
                placeholder="Search by Keyword or Property Name"
                className="flex-grow bg-transparent outline-none text-gray-700"
              />
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
