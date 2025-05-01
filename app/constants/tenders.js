import { assets } from "@/assets/assets";

export const tenders = [
  {
    id: "T1223",
    name: "Muscat Downtown Redevelopment",
    company: "Muscat Municipality",
    location: "Muscat, Oman",
    launchDate: "12 Apr 2024",
    thumb: assets.t1,
    description:
      "Revitalization of Muscat Downtown area including parks, pedestrian zones, and shopping centers.",
    boqUrl: "/boqs/muscat-downtown.pdf",
  },
  {
    id: "2",
    name: "Duqm Green Energy Zone",
    company: "Duqm Special Economic Zone Authority",
    location: "Duqm, Al Wusta",
    launchDate: "03 Apr 2024",
    thumb: assets.t2,
    description:
      "Development of a renewable energy industrial zone focused on green hydrogen and solar energy.",
    boqUrl: "/boqs/duqm-green-energy.pdf",
  },
  {
    id: "3",
    name: "Salalah Port Expansion",
    company: "Salalah Port Services",
    location: "Salalah, Dhofar",
    launchDate: "22 Mar 2024",
    thumb: assets.t1,
    description:
      "Expansion of Salalah port facilities including new container terminals and cargo yards.",
    boqUrl: "/boqs/salalah-port-expansion.pdf",
  },
  {
    id: "4",
    name: "Batinah Expressway Enhancement",
    company: "Ministry of Transport",
    location: "Al Batinah Region, Oman",
    launchDate: "15 Mar 2024",
    thumb: assets.t2,
    description:
      "Enhancement of Batinah Expressway with new service roads and maintenance facilities.",
    boqUrl: "/boqs/batinah-expressway.pdf",
  },
];

export function getTenderById(id) {
  return tenders.find((tender) => tender.id === id);
}
