// components/LatestTenders.jsx
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const tenders = [
  {
    id: "T1223",
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

export default function LatestTenders() {
  const handleTenderClick = () => {};

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* heading row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Latest Tenders</h2>
        <Link
          href="/tenders"
          className="text-amber-500 font-semibold hover:underline flex items-center gap-1"
        >
          See all
          <span className="inline-block rotate-[-45deg] translate-y-[2px]">
            ➜
          </span>
        </Link>
      </div>

      {/* cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tenders.map((tender) => (
          <article
            key={tender.id}
            className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* banner */}
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

            {/* body */}
            {/* Make card body flex‑column & grow so buttons align */}
            <div className="flex flex-col flex-1 p-5">
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-purple-800 leading-tight text-lg sm:text-xl">
                  {tender.id}: {tender.name}
                </h3>
                <p className="text-sm text-slate-600">{tender.location}</p>
              </div>

              {/* spacer pushes button to bottom */}
              <div className="flex-1" />

              <Link href="/">
                <p className="w-full text-center bg-amber-500 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition">
                  {" "}
                  Submit Offer
                </p>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
