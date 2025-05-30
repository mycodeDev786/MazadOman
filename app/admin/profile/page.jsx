"use client";

import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Loading from "@/app/components/LoadingSpinner";
import { useLanguage } from "../../components/LanguageContext";
import { translations } from "../../translations/translation";
import {
  formatDateWithLan,
  formatPhoneNumberByLanguage,
} from "@/app/utils/formatDate";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCrLoaded, setIsCrLoaded] = useState(false);
  const [formData, setFormData] = useState(user);
  const [logo, setLogo] = useState(null);
  const [cr, setCr] = useState(null);

  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  // format date

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

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

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("company_name", formData.company_name);
    data.append("person_name", formData.person_name);
    data.append("phone_number", formData.phone_number);
    data.append("email", formData.email);

    if (logo) {
      data.append("logo", logo);
    }
    if (cr) {
      data.append("cr_file", cr);
    }

    try {
      const response = await fetch(
        `https://mazadoman.com/backend/api/company-user/update/${user.id}`,
        {
          method: "POST",
          body: data,
          // Do NOT set Content-Type manually for FormData in fetch — browser sets it correctly
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        // Optionally display validation errors to user
        return;
      }

      const result = await response.json();
      console.log("Update success:", result);

      // Optionally refresh UI or notify user
      setIsEditing(false); // close modal
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      // Optionally display a generic error message
      setIsEditing(false);
    }
  };

  return (
    <div className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
      <Loading isLoading={loading} />
      <h1 className="text-3xl font-bold mb-6">{t.myProfile}</h1>

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
            <ProfileField label={t.name} value={user?.company_name} />
            <ProfileField label={t.email} value={user?.email} />
            <ProfileField
              label={t.phone}
              value={formatPhoneNumberByLanguage(user?.phone_number, language)}
            />
            <ProfileField
              label={t.joinedOn}
              value={formatDateWithLan(user?.created_at, language)}
            />
          </div>
          <button
            onClick={handleCrClick}
            className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            {t.viewCR}
          </button>
          <button
            onClick={handleEditClick}
            className="mt-6 bg-amber-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            <Pencil size={18} />
            {t.editProfile}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <button
              onClick={() => setIsEditing(false)}
              className={`absolute top-4 ${
                language === "ar" ? "left-4" : "right-4"
              } text-gray-500 hover:text-gray-700`}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6">{t.editProfileHeader}</h2>

            <div className="flex flex-col space-y-4">
              {/* Company Name */}
              <InputField
                label={t.companyName}
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({ ...formData, company_name: e.target.value })
                }
              />

              {/* Person Name */}
              <InputField
                label={t.personName}
                value={formData.person_name}
                onChange={(e) =>
                  setFormData({ ...formData, person_name: e.target.value })
                }
              />

              {/* Phone Number */}
              <InputField
                label={t.phoneNumber}
                value={formatPhoneNumberByLanguage(
                  formData.phone_number,
                  language
                )}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />

              {/* Email */}
              <InputField
                label={t.email}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              {/* Logo Upload */}
              <div className={`${isRTL ? "rtl" : ""}`}>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  {t.logo || "Logo"}
                </label>
                <div
                  className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  style={{ height: "3rem" }}
                >
                  <span
                    className={`absolute top-1/2 ${
                      isRTL ? "right-3" : "left-3"
                    } transform -translate-y-1/2 text-gray-500 text-sm`}
                    style={{ pointerEvents: "none" }}
                  >
                    {logo ? logo.name : t.noFileChosen || "No file chosen"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files[0])}
                    className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  />
                </div>
              </div>

              {/* CR File Upload */}
              <div className={`${isRTL ? "rtl" : ""}`}>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  {t.crFile || "CR File (PDF)"}
                </label>
                <div
                  className={`relative w-full mt-1 border border-gray-300 rounded-lg ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  style={{ height: "3rem" }}
                >
                  <span
                    className={`absolute top-1/2 ${
                      isRTL ? "right-3" : "left-3"
                    } transform -translate-y-1/2 text-gray-500 text-sm`}
                    style={{ pointerEvents: "none" }}
                  >
                    {cr ? cr.name : t.noFileChosen || "No file chosen"}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setCr(e.target.files[0])}
                    className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                {t.saveChanges}
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

            <h2 className="text-2xl font-bold mb-6">{t.crTitle}</h2>

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

function ProfileField({ label, value, isRTL }) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div
        className="text-lg font-semibold"
        style={{
          direction: isRTL ? "rtl" : "ltr",
          unicodeBidi: "isolate",
        }}
      >
        {value}
      </div>
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
