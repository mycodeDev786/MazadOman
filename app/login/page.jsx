"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { assets } from "@/assets/assets";
import Loading from "../components/LoadingSpinner";
import { useDispatch } from "react-redux";
import { login } from "../store/sessionSlice";
import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/translation";

export default function LoginPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = { email, password };

    try {
      const response = await fetch("https://mazadoman.com/backend/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(t.loginSuccessful);
        dispatch(login({ user: result.user, token: result.token }));
        localStorage.setItem("authToken", result.token);
        window.location.href = "/admin/dashboard";
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(t["error_generic"]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${assets.hero})`,
      }}
    >
      <Loading isLoading={isLoading} />
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl bg-opacity-90 backdrop-blur-md"
      >
        <h2 className="text-2xl font-extrabold text-purple-800 mb-8 text-center">
          {t["login_title"]}
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              {t["email_label"]}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={t["email_placeholder"]}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              {t["password_label"]}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={t["password_placeholder"]}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${
                  language === "ar" ? "left-3" : "right-3"
                } flex items-center text-sm text-blue-600`}
              >
                {showPassword ? t["password_hide"] : t["password_show"]}
              </button>
            </div>
          </div>

          {/* Forgot password link */}
          <div className="text-right text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              {t["forgot_password"]}
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            {t["login_button"]}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {t["no_account"]}{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            {t["register_link"]}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
