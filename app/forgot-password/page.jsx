"use client";

import { assets } from "@/assets/assets";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/LoadingSpinner";

import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/translation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error(t.enterEmailError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://mazadoman.com/backend/api/company-user/send-reset-link",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(t.resetLinkSent);
      } else {
        toast.error(data.message || t.errorOccurred);
      }
    } catch (error) {
      toast.error(t.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-cover bg-center px-4 ${
        isRTL ? "direction-rtl" : ""
      }`}
      style={{
        backgroundImage: `url(${assets.hero})`,
      }}
    >
      <Loading isLoading={loading} />
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl bg-opacity-90 backdrop-blur-md ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <h2 className="text-2xl font-extrabold text-purple-800 mb-6 text-center">
          {t.forgotPasswordTitle}
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {t.forgotPasswordDescription}
        </p>

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              {t.emailLabel}
            </label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={t.emailPlaceholder}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            {t.sendResetLink}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {t.rememberPassword}{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            {t.login}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
