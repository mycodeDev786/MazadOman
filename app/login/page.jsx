"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { assets } from "@/assets/assets";
import Loading from "../components/LoadingSpinner";
import { useDispatch } from "react-redux";
import { login } from "../store/sessionSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setIsLoading(true); // Show loading

    // Prepare the data for the request
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
        // Login successful, save the token in localStorage

        toast.success(result.message);
        dispatch(login({ user: result.user, token: result.token }));

        // Optionally, store the token in localStorage/sessionStorage for persistence
        localStorage.setItem("authToken", result.token);
        // Redirect to dashboard or another protected page
        window.location.href = "/admin/dashboard"; // Or use `router.push("/dashboard")` with Next.js routing
      } else {
        // Login failed, show error
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false); // Hide loading
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${assets.hero})`, // Adjust the image path
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
          Login to your account
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
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
                placeholder="••••••••"
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

          {/* Forgot password link */}
          <div className="text-right text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
