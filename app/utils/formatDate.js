// utils/formatDate.js

export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    weekday: "long", // e.g., 'Monday'
    year: "numeric",
    month: "long", // e.g., 'April'
    day: "numeric", // e.g., '28'
  });
}

export function formatPhoneNumberByLanguage(phoneNumber, language) {
  if (!phoneNumber) return "";

  const easternArabicNumerals = [
    "٠",
    "١",
    "٢",
    "٣",
    "٤",
    "٥",
    "٦",
    "٧",
    "٨",
    "٩",
  ];

  // Convert digits only for Arabic
  if (language === "ar") {
    return phoneNumber.replace(/\d/g, (digit) => easternArabicNumerals[digit]);
  }

  // Return as-is for English or other languages
  return phoneNumber;
}

export function formatDateWithLan(dateString, language = "en") {
  if (!dateString) return "";

  const date = new Date(dateString);

  const locale = language === "ar" ? "ar-EG" : "en-US";

  return date.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
