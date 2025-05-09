"use client";

import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Loading from "@/app/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCrLoaded, setIsCrLoaded] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // format date
  const formattedDate = new Date(user?.created_at).toLocaleDateString("en-US", {
    weekday: "long", // e.g., 'Monday'
    year: "numeric",
    month: "long", // e.g., 'April'
    day: "numeric", // e.g., '28'
  });

  useEffect(() => {
    const fetchCompanyInformation = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/company-user/${id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender count");
        }

        const data = await response.json();

        setUser(data?.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyInformation();
  }, [id]);

  const handleCrClick = () => {
    setIsCrLoaded(true);
  };

  return (
    <div className="p-6">
      <Loading isLoading={loading} />
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-8">
        {/* Profile Picture (dummy) */}
        <div className="flex-shrink-0">
          <Image
            src={
              user?.logo
                ? "https://mazadoman.com/backend/" + user.logo
                : assets.profile
            } // Fallback image if no profile image
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileField label="Name" value={user?.company_name} />
            <ProfileField label="Email" value={user?.email} />
            <ProfileField label="Phone" value={user?.phone_number} />

            <ProfileField label="Joined On" value={formattedDate} />
          </div>
          <button
            onClick={handleCrClick}
            className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            View CR
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isCrLoaded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto ">
            <button
              onClick={() => setIsCrLoaded(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6">CR</h2>

            {/* Display image or PDF */}
            {user?.cr_file === "image" ? (
              <img
                src={"https://mazadoman.com/backend/" + user?.cr_file}
                alt="CR Document"
                className="w-full h-auto rounded"
              />
            ) : (
              <iframe
                src={"https://mazadoman.com/backend/" + user?.cr_file}
                title="CR Document"
                className="w-full h-[500px] rounded"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
