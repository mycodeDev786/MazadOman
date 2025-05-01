// app/tender_details/page.tsx
import React, { Suspense } from "react";
import ProfilePage from "./company";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading tender details...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
