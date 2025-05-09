"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import { useRouter } from "next/navigation";
import Loading from "../components/LoadingSpinner";

export default function TenderPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Replace with your real API URL
    fetch("https://mazadoman.com/backend/api/tenders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tenders.");
        }
        return response.json();
      })
      .then((data) => {
        setTenders(data.tenders); // depends on your API response
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredTenders = tenders.filter(
    (tender) =>
      tender?.title.toLowerCase().includes(query.toLowerCase()) ||
      tender?.tender_id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      {/* Hero Section */}
      <Loading isLoading={loading} />
      <section className="relative w-full h-[400px]">
        <Image
          src={assets.hero} // Replace with your actual hero background path
          alt="E-Tendering Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to E-Tendering Portal
          </h1>
          <p className="max-w-2xl mb-6 text-lg">
            Explore and submit offers for the latest government and private
            tenders across Oman.
          </p>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tenders by name or location..."
            className="w-full max-w-xl px-4 py-2 rounded-md text-white placeholder-slate-500"
          />
        </div>
      </section>

      {/* Latest Tenders */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl text-center font-bold text-orange-800 mb-6">
          All Tenders
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTenders.length > 0 ? (
            filteredTenders.map((tender) => (
              <article
                key={tender?.tender_id}
                className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* banner */}
                <div className="relative w-full h-48 shrink-0">
                  <Image
                    src={"https://mazadoman.com/backend/" + tender?.image}
                    alt={tender?.title || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 25vw"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow">
                    Launched on {formatDate(tender?.created_at)}
                  </div>
                </div>

                {/* body */}
                {/* Make card body flex‑column & grow so buttons align */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-purple-800 leading-tight text-lg sm:text-xl">
                      {tender.tender_id}: {tender.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {tender.budget} OMR
                    </p>
                  </div>

                  {/* spacer pushes button to bottom */}
                  <div className="flex-1" />

                  <div
                    onClick={() => {
                      router.push(
                        `/tender_details?id=${encodeURIComponent(
                          tender?.tender_id
                        )}`
                      );
                    }}
                  >
                    <p className="w-full text-center bg-amber-500 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition">
                      Submit Offer
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-slate-600 col-span-full text-center">
              No tenders found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
