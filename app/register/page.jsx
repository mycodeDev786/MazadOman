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
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.title,
  }));

  // Flatten all subcategories from all categories
  const subcategoryOptions = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      value: sub.id,
      label: `${cat.title} - ${sub.title}`, // shows parent category for context
    }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
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
        toast.success("Registration successful!");
        window.location.href = "/login";
        // Redirect or clear form here
      } else {
        if (data && typeof data === "object") {
          const firstError = Object.values(data)[0][0];
          toast.error(firstError || "Registration failed!");
        } else {
          toast.error("Registration failed!");
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
          Create an account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Logo Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Company Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Company Name"
            />
          </div>
          {/* Person Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Person Name
            </label>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <PhoneInput
              country={"us"}
              searchPlaceholder="search"
              value={phone}
              enableSearch={true}
              onChange={(value) => setPhone(value)}
              containerStyle={{ width: "100%" }}
              inputStyle={{
                width: "100%",
                paddingLeft: "58px", // 👈 Add enough padding to clear the flag
                paddingTop: "12px",
                paddingBottom: "12px",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db", // gray-300
                outline: "none",
              }}
              buttonStyle={{
                borderTopLeftRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
                borderRight: "1px solid #d1d5db",
              }}
              required
            />
          </div>
          {/* Email Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
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
            <label className="block text-lg font-medium mb-2">
              Select Categories:
            </label>
            <Select
              isMulti
              options={categoryOptions}
              value={selectedCategories}
              onChange={(selected) => setSelectedCategories(selected || [])}
              placeholder="Select categories"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {selectedCategories.length > 0 && (
            <div className="text-sm text-gray-700 mb-2">
              <strong>Selected Categories:</strong>{" "}
              {selectedCategories.map((cat) => cat.label).join(", ")}
            </div>
          )}

          {/* Subcategory Selection */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Select Subcategories:
            </label>
            <Select
              isMulti
              options={subcategoryOptions}
              value={selectedSubcategories}
              onChange={(selected) => setSelectedSubcategories(selected || [])}
              placeholder="Select subcategories"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {selectedSubcategories.length > 0 && (
            <div className="text-sm text-gray-700 mb-4">
              <strong>Selected Subcategories:</strong>{" "}
              {selectedSubcategories.map((sub) => sub.label).join(", ")}
            </div>
          )}

          {/* Upload CR */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Upload CR
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={(e) => setCrFile(e.target.files[0])}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the Terms and Conditions
            </label>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
