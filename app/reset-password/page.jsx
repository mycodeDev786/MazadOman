// app/tender_details/page.tsx
import React, { Suspense } from "react";
import ResetPasswordPage from "./rest";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading tender details...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
