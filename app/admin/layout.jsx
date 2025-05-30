"use client";

import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/translation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // If no token is found in localStorage, redirect to the login page
    if (!token) {
      router.push("/login");
    }
  }, []);

  const isRTL = language === "ar"; // Check if Arabic for right-to-left layout

  return (
    <div className="flex min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <Sidebar />
      <main
        className={`flex-1 bg-gray-100 p-6 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
