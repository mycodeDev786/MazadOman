"use client";
import Loading from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export default function TenderQuoted() {
  const router = useRouter();
  const [quotedTenders, setQuotedTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.session.user);

  const userId = user?.id; // Example user ID

  useEffect(() => {
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

    // Fetch tenders by user ID
    fetch(`https://mazadoman.com/backend/api/quotes/all/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tenders.");
        }
        return response.json();
      })
      .then((data) => {
        setQuotedTenders(data.data); // Assuming the response has a 'tenders' array
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const handleTenderClick = (id) => {
    router.push(`/admin/tender_quoted_details`);
  };
  return (
    <div>
      <Loading isLoading={loading} />
      <h1 className="text-2xl font-bold mb-4">Tenders You Have Quoted</h1>
      {/* Tenders Quoted */}

      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 space-y-4">
        <ul className="space-y-3">
          {quotedTenders.map((tender) => (
            <li
              key={tender.tender_id}
              onClick={() => {
                router.push(
                  `/admin/tender_quoted_details?id=${encodeURIComponent(
                    tender?.tender_id
                  )}`
                );
              }}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer flex gap-1 items-center transition-colors duration-200"
            >
              <span className="text-sm mr-2 text-gray-500">
                {tender.tender_id}
              </span>
              <span className="font-medium text-gray-700">
                {tender.tender_title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
