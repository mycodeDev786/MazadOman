"use client";
import { useState } from "react";
import Script from "next/script";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (typeof window === "undefined" || !window.SmartBox?.Checkout) {
      console.error("SmartBox is not loaded yet");
      return;
    }

    setLoading(true);
    const trxDateTime = new Date().toISOString();
    try {
      // Fetch secure hash from your backend API
      const response = await fetch(
        "https://mazadoman.com/backend/api/generate-secure-hash",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MerchantId: process.env.NEXT_PUBLIC_MID, // string, e.g. "197556"
            TerminalId: process.env.NEXT_PUBLIC_TID, // string, e.g. "567396"
            Amount: "10", // string, NOT number
            MerchantReference: "1", // string
            RequestDateTime: trxDateTime, // ISO string is okay
            CurrencyId: "512", // string, NOT number
            SessionToken: "",
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok || !data.SecureHash) {
        throw new Error("Failed to get secure hash");
      }

      window.SmartBox.Checkout.configure = {
        MID: process.env.NEXT_PUBLIC_MID,
        TID: process.env.NEXT_PUBLIC_TID,
        CurrencyId: "512",
        AmountTrxn: "10",
        MerchantReference: "1",
        LanguageId: "en",
        PaymentViewType: 1,
        TrxDateTime: trxDateTime,
        SecureHash: data.SecureHash, // <-- Use exact case here
        completeCallback: (data) => console.log("Payment completed", data),
        errorCallback: (data) => console.log("Payment error", data),
        cancelCallback: () => console.log("Payment cancelled"),
      };

      window.SmartBox.Checkout.showSmartBox();
    } catch (error) {
      console.error("Error during payment initialization", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.amwalpg.com/js/SmartBox.js?v=1.1"
        strategy="afterInteractive"
        onLoad={() => console.log("SmartBox.js loaded")}
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Loading..." : "Pay Now"}
      </button>
    </>
  );
}
