"use client";
import Script from "next/script";

export default function SmartBoxScript() {
  return (
    <Script
      src="https://checkout.amwalpg.com/js/SmartBox.js?v=1.1"
      strategy="beforeInteractive"
      onLoad={() => {
        console.log("✅ SmartBox.js loaded");
      }}
      onError={(e) => {
        console.error("❌ Failed to load SmartBox.js", e);
      }}
    />
  );
}
