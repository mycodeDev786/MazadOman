"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";

const tenders = [
  {
    id: 1,
    name: "Muscat Downtown Redevelopment",
    location: "Muscat, Oman",
    launchDate: "12 Apr 2024",
    thumb: assets.t1,
  },
  {
    id: 2,
    name: "Duqm Green Energy Zone",
    location: "Duqm, Al Wusta",
    launchDate: "03 Apr 2024",
    thumb: assets.t2,
  },
  {
    id: 3,
    name: "Salalah Port Expansion",
    location: "Salalah, Dhofar",
    launchDate: "22 Mar 2024",
    thumb: assets.t1,
  },
  {
    id: 4,
    name: "Batinah Expressway Enhancement",
    location: "Al Batinah Region, Oman",
    launchDate: "15 Mar 2024",
    thumb: assets.t2,
  },
];

export default function TenderPage() {
  const [query, setQuery] = useState("");

  const filteredTenders = tenders.filter(
    (tender) =>
      tender.name.toLowerCase().includes(query.toLowerCase()) ||
      tender.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      {/* Hero Section */}
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
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Latest Tenders
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTenders.length > 0 ? (
            filteredTenders.map((tender) => (
              <article
                key={tender.id}
                className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-full h-48 shrink-0">
                  <Image
                    src={tender.thumb}
                    alt={tender.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 25vw"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold py-1 px-2 rounded-md shadow">
                    Launched on {tender.launchDate}
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-slate-800 text-lg sm:text-xl leading-tight">
                      {tender.name}
                    </h3>
                    <p className="text-sm text-slate-600">{tender.location}</p>
                  </div>
                  <div className="flex-1" />
                  <button
                    type="button"
                    className="w-full bg-amber-500 text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition"
                    onClick={() => alert(`Submitting offer for ${tender.name}`)}
                  >
                    Submit Offer
                  </button>
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
