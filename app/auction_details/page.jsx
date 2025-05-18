// app/tender_details/page.tsx
import React, { Suspense } from "react";
import TenderDetails from "./auction_data";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading tender details...</div>}>
      <TenderDetails />
    </Suspense>
  );
}
