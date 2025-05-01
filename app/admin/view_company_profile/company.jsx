"use client";

import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Loading from "@/app/components/LoadingSpinner";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCrLoaded, setIsCrLoaded] = useState(false);
  const [formData, setFormData] = useState(user);

  // format date
  const formattedDate = new Date(user?.created_at).toLocaleDateString("en-US", {
    weekday: "long", // e.g., 'Monday'
    year: "numeric",
    month: "long", // e.g., 'April'
    day: "numeric", // e.g., '28'
  });

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = false;
    if (token) {
      // Fetch user data with the token
      fetch("https://mazadoman.com/backend/api/company-user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data?.user);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      console.error("No token found");
      setLoading(false);
    }
  }, []);

  const handleEditClick = () => {
    setFormData(user); // fill form with existing data
    setIsEditing(true);
  };
  const handleCrClick = () => {
    setIsCrLoaded(true);
  };

  const handleSave = () => {
    const data = new FormData();
    data.append("company_name", formData.company_name);
    data.append("person_name", formData.person_name);
    data.append("phone_number", formData.phone_number);
    data.append("email", formData.email);

    if (formData.logo) {
      data.append("logo", formData.logo);
    }
    if (formData.cr_file) {
      data.append("cr_file", formData.cr_file);
    }

    // Now you can send `data` to your API
    // Example:
    // axios.post('/api/update-profile', data)

    console.log([...data.entries()]); // for debugging

    setIsEditing(false); // close modal
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
          <button
            onClick={handleEditClick}
            className="mt-6 bg-amber-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <div className="flex flex-col space-y-4">
              {/* Company Name */}
              <InputField
                label="Company Name"
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({ ...formData, company_name: e.target.value })
                }
              />

              {/* Person Name */}
              <InputField
                label="Person Name"
                value={formData.person_name}
                onChange={(e) =>
                  setFormData({ ...formData, person_name: e.target.value })
                }
              />

              {/* Phone Number */}
              <InputField
                label="Phone Number"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />

              {/* Email */}
              <InputField
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              {/* Logo Upload */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Logo</label>
                <input
                  type="file"
                  className="border p-1.5"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.files[0] })
                  }
                />
              </div>

              {/* CR File Upload */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">CR File (PDF)</label>
                <input
                  type="file"
                  className="border p-1.5"
                  accept="application/pdf"
                  onChange={(e) =>
                    setFormData({ ...formData, cr_file: e.target.files[0] })
                  }
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

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
