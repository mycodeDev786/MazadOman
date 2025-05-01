"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TenderOfferForm from "./TenderOfferForm"; // Import the form

export default function TenderOfferSection({ tender }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Get user and token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // Check if both user and token exist (indicating a valid session)
    if (user && token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="text-center mt-10">
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
    );
  }

  return <TenderOfferForm tender={tender} />;
}
