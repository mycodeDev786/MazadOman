"use client";

import { assets } from "@/assets/assets";
import { motion } from "framer-motion";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const handleReset = () => {};

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${assets.hero})`, // Adjust the image path
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl bg-opacity-90 backdrop-blur-md"
      >
        <h2 className="text-2xl font-extrabold text-purple-800 mb-6 text-center">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleReset} className="space-y-6">
          {/* Email input */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
