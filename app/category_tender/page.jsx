// app/tender_details/page.tsx
import React, { Suspense } from "react";

import TenderPage from "./tander_page";

export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <TenderPage />
    </Suspense>
  );
}
