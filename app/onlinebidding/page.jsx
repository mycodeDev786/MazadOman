// app/tender_details/page.tsx
import React, { Suspense } from "react";
import OnlineBidding from "./bid";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading tender details...</div>}>
      <OnlineBidding />
    </Suspense>
  );
}
