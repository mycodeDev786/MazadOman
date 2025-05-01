// app/tenders/[id]/page.js (Server Component)
import Image from "next/image";
import Link from "next/link";
import { getTenderById, tenders } from "../../constants/tenders"; // Update path based on your folder structure
import TenderOfferForm from "../../components/TenderOfferForm"; // Import the client component
import TenderOfferSection from "@/app/components/TenderOfferSection";

// 1. Export generateStaticParams function for static paths generation
export function generateStaticParams() {
  return tenders.map((tender) => ({
    id: tender.id.toString(), // ensure id is a string
  }));
}

// 2. The page component will fetch data server-side
export default async function TenderDetailPage({ params }) {
  // Fetch tender data server-side
  const tender = getTenderById(params.id);

  if (!tender) {
    return <div className="p-10 text-red-600">Tender not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Image
        src={tender.thumb}
        alt={tender.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800">{tender.name}</h1>
      <p className="mt-2 text-gray-600">
        <strong>Company:</strong> {tender.company}
      </p>
      <p className="text-gray-600">
        <strong>Location:</strong> {tender.location}
      </p>
      <p className="text-gray-600">
        <strong>Launch Date:</strong> {tender.launchDate}
      </p>

      <p className="mt-6 text-gray-700 whitespace-pre-line">
        {tender.description}
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href={tender.boqUrl}
          download
          className="px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700 transition"
        >
          Download BOQ
        </a>
        <a
          href={tender.boqUrl}
          target="_blank"
          className="px-4 py-2 border border-blue-600 text-blue-600  hover:bg-blue-50 transition"
        >
          View BOQ
        </a>
      </div>

      {/* Client-side Form Component */}
      <div className="mt-10">
        <TenderOfferSection tender={tender} />
      </div>
    </div>
  );
}
