"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { assets } from "@/assets/assets"; // your own images
import Loading from "../components/LoadingSpinner";
import categories from "../constants/categories";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/translation";

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [personName, setPersonName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [crFile, setCrFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";
  const dirClass = isRTL ? "text-right" : "text-left";

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.title[language],
  }));

  // Flatten all subcategories from all categories
  const subcategoryOptions = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      value: sub.id,
      label: `${cat.title[language]} - ${sub.title[language]}`, // shows parent category for context
    }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error(t.passwordsMismatch);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("person_name", personName);
    formData.append("phone_number", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("logo", logoFile);
    formData.append("cr_file", crFile);
    formData.append(
      "categories",
      JSON.stringify(selectedCategories.map((c) => c.value))
    );
    formData.append(
      "subcategories",
      JSON.stringify(selectedSubcategories.map((s) => s.value))
    );

    try {
      const response = await fetch(
        "https://mazadoman.com/backend/api/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(t.registrationSuccess);
        window.location.href = "/login";
        // Redirect or clear form here
      } else {
        if (data && typeof data === "object") {
          const firstError = Object.values(data)[0][0];
          toast.error(firstError || t.registrationFailed);
        } else {
          toast.error(t.registrationFailed);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${assets.hero})` }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Loading isLoading={isLoading} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md my-2.5 bg-white p-8 rounded-2xl shadow-2xl bg-opacity-90 backdrop-blur-md"
      >
        <h2 className="text-2xl font-extrabold text-purple-800 mb-8 text-center">
          {t.createAccount}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Logo Upload */}
          <div className={`mb-5 ${isRTL ? "rtl" : ""}`}>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {t.companyLogo} <span className="text-orange-400">*</span>
            </label>

            <div
              className={`relative w-full border border-gray-300 rounded-lg ${
                isRTL ? "text-right" : "text-left"
              }`}
              style={{ height: "3rem" }}
            >
              <span
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-sm ${
                  isRTL ? "right-3" : "left-3"
                }`}
                style={{ pointerEvents: "none" }}
              >
                {logoFile ? logoFile.name : t.noFileChosen}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className={`${isRTL ? "rtl" : ""}`}>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {t.companyName} <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isRTL ? "text-right" : "text-left"
              }`}
              placeholder={t.companyNamePlaceholder}
              style={{ height: "3rem" }}
            />
          </div>

          {/* Person Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              {t.personName} <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder=""
            />
          </div>
          {/* Phone Number */}
          <div className={`${isRTL ? "rtl" : ""}`}>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {t.phoneNumber} <span className="text-orange-400">*</span>
            </label>
            <PhoneInput
              country={"om"}
              searchPlaceholder={t.searchPlaceholder || "search"}
              value={phone}
              enableSearch={true}
              onChange={(value) => setPhone(value)}
              containerStyle={{ width: "100%" }}
              inputStyle={{
                width: "100%",
                paddingLeft: isRTL ? "12px" : "58px", // padding switches sides
                paddingRight: isRTL ? "58px" : "12px",
                paddingTop: "12px",
                paddingBottom: "12px",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                outline: "none",
                textAlign: isRTL ? "right" : "left",
              }}
              buttonStyle={{
                borderTopLeftRadius: isRTL ? "0" : "0.5rem",
                borderBottomLeftRadius: isRTL ? "0" : "0.5rem",
                borderTopRightRadius: isRTL ? "0.5rem" : "0",
                borderBottomRightRadius: isRTL ? "0.5rem" : "0",
                borderLeft: isRTL ? "1px solid #d1d5db" : "none",
                borderRight: isRTL ? "none" : "1px solid #d1d5db",
              }}
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              {t.emailAddress} <span className="text-orange-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {t.selectCategories} <span className="text-orange-400">*</span>
            </label>
            <Select
              isMulti
              options={categoryOptions}
              value={selectedCategories}
              onChange={(selected) => setSelectedCategories(selected || [])}
              placeholder={language === "en" ? "Select categories" : "اختر فئة"}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {selectedCategories.length > 0 && (
            <div className="text-sm text-gray-700 mb-2">
              <strong>{t.selectedCategories}:</strong>{" "}
              {selectedCategories.map((cat) => cat.label).join(", ")}
            </div>
          )}

          {/* Subcategory Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              {t.selectSubcategories} <span className="text-orange-400">*</span>
            </label>
            <Select
              isMulti
              options={subcategoryOptions}
              value={selectedSubcategories}
              onChange={(selected) => setSelectedSubcategories(selected || [])}
              placeholder={
                language === "en" ? "Select subcategories" : "اختر فئة فرعية"
              }
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {selectedSubcategories.length > 0 && (
            <div className="text-sm text-gray-700 mb-4">
              <strong>{t.selectedSubcategories}:</strong>{" "}
              {selectedSubcategories.map((sub) => sub.label).join(", ")}
            </div>
          )}

          {/* Upload CR */}
          <div className={`${isRTL ? "rtl" : ""}`}>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {t.uploadCR || "Upload CR"}{" "}
              <span className="text-orange-400">*</span>
            </label>
            <div
              className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                isRTL ? "text-right" : "text-left"
              }`}
              style={{ height: "3rem" }} // adjust height as needed
            >
              <span
                className={`absolute top-1/2 ${
                  isRTL ? "right-3" : "left-3"
                } transform -translate-y-1/2 text-gray-500 text-sm`}
                style={{ pointerEvents: "none" }}
              >
                {crFile ? crFile.name : t.noFileChosen || "No file chosen"}
              </span>
              <input
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={(e) => setCrFile(e.target.files[0])}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              />
            </div>
          </div>

          {/* Password */}
          <div className={`${isRTL ? "rtl" : ""}`}>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {t.password || "Password"}{" "}
              <span className="text-orange-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isRTL ? "text-right" : "text-left"
                }`}
                placeholder={t.createPasswordPlaceholder || "Create a password"}
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${
                  isRTL ? "left-3" : "right-3"
                } flex items-center text-sm text-blue-600`}
              >
                {showPassword
                  ? t.password_hide || "Hide"
                  : t.password_show || "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className={`${isRTL ? "rtl" : ""} mt-4`}>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {t.confirmPassword || "Confirm Password"}{" "}
              <span className="text-orange-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isRTL ? "text-right" : "text-left"
                }`}
                placeholder={
                  t.confirmPasswordPlaceholder || "Confirm your password"
                }
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute inset-y-0 ${
                  isRTL ? "left-3" : "right-3"
                } flex items-center text-sm text-blue-600`}
              >
                {showConfirmPassword
                  ? t.password_hide || "Hide"
                  : t.password_show || "Show"}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              {t.termsAndConditionsText}{" "}
              {/* e.g. "I agree to the Terms and Conditions" */}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!termsAccepted}
            className={`w-full py-3 rounded-lg text-white transition-all duration-300
    ${
      termsAccepted
        ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 cursor-pointer"
        : "bg-gray-400 cursor-not-allowed"
    }
  `}
          >
            {t.registerButtonText} {/* e.g. "Register" */}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {t.alreadyHaveAccount}{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            {t.login}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
