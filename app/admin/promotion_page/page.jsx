// app/tender_details/page.tsx
import React, { Suspense } from "react";
import PromotionPage from "./promotionPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading tender details...</div>}>
      <PromotionPage />
    </Suspense>
  );
}
