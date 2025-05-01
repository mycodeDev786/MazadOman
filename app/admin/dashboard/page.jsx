"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useSelector } from "react-redux";
import Loading from "@/app/components/LoadingSpinner";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function AdminDashboard() {
  const user = useSelector((state) => state.session.user);
  const [tenderPosted, setTenderPosted] = useState(0);
  const [tenderQuoted, setTenderQuoted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenderCount = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/tenders/count/${user?.id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender count");
        }

        const data = await response.json();
        setTenderPosted(data.tender_count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchQuoteCount = async () => {
      try {
        const response = await fetch(
          `https://mazadoman.com/backend/api/quotes/count/user/${user?.id}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tender count");
        }

        const data = await response.json();
        setTenderQuoted(data.quote_count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuoteCount();
    fetchTenderCount();
  }, [user?.id]);

  const data = {
    labels: ["Tenders Posted", "Tenders Quoted"],
    datasets: [
      {
        label: "Tenders Overview",
        data: [tenderPosted, tenderQuoted],
        backgroundColor: ["#3b82f6", "#10b981"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Loading isLoading={loading} />
      <h1 className="text-3xl font-bold mb-6">
        Welcome, <span className="text-orange-500">{user?.company_name}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tenders Posted</h2>
          <p className="text-3xl">{tenderPosted}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tenders Quoted</h2>
          <p className="text-3xl">{tenderQuoted}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Analytics Graph</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
