// app/tender_details/page.tsx
import React, { Suspense } from "react";
import TenderPage from "./quoted_details";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading tender details...</div>}>
      <TenderPage />
    </Suspense>
  );
}
