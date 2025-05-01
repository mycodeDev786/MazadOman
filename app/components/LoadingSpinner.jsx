"use client";

import { motion } from "framer-motion";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      {/* Top Loading Bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-1 bg-blue-500"
      />

      {/* Spinner and Text */}
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        <p className="mt-3 text-white font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
