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
