// app/tender_details/page.tsx
import React, { Suspense } from "react";
import WinnerList from "./winner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading tender details...</div>}>
      <WinnerList />
    </Suspense>
  );
}
