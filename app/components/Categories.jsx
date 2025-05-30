"use client";
// components/Categories.jsx
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translations/translation";

const categories = [
  {
    id: "sub-22-4",
    key: "property", // Translation key
    iconSrc: assets.c1,
    bg: "bg-indigo-100",
  },
  { id: "sub-1-5", key: "land", iconSrc: assets.land, bg: "bg-purple-100" },
  { key: "smallGadget", iconSrc: assets.smart, bg: "bg-rose-100" },
  {
    id: "sub-101-1",
    key: "homeAppliance",
    iconSrc: assets.domest_app,
    bg: "bg-sky-100",
  },
  {
    id: "sub-101-2",
    key: "kitchenAppliance",
    iconSrc: assets.kitchen,
    bg: "bg-emerald-100",
  },
  {
    id: "sub-101-3",
    key: "phoneAndTablet",
    iconSrc: assets.mobile,
    bg: "bg-rose-100",
  },
  {
    id: "sub-101-4",
    key: "watches",
    iconSrc: assets.watches,
    bg: "bg-teal-100",
  },
  {
    id: "sub-102-1",
    key: "healthAndBeauty",
    iconSrc: assets.beauty,
    bg: "bg-violet-100",
  },
  {
    id: "sub-102-2",
    key: "personalCare",
    iconSrc: assets.skin,
    bg: "bg-amber-100",
  },
  {
    id: "sub-103-1",
    key: "facilityManagement",
    iconSrc: assets.facility,
    bg: "bg-rose-100",
  },
];

export default function Categories({ type }) {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const handleCategoryClick = (id, type) => {
    router.push(
      `/category_tender?id=${encodeURIComponent(id)}&type=${encodeURIComponent(
        type
      )}`
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="mb-6 text-2xl text-center text-orange-400 font-semibold">
        {t.categories}
      </h2>

      {/* responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map(({ id, key, iconSrc, bg }) => (
          <div
            key={id || key} // Use key as a fallback for id
            onClick={() => id && handleCategoryClick(id, type)}
            className={`${bg} rounded-lg flex flex-col items-center justify-center aspect-square cursor-pointer shadow-sm hover:shadow-md transition`}
          >
            <Image
              src={iconSrc}
              alt={t[key]}
              width={100}
              height={100}
              priority
            />
            <p className="text-center text-sm font-medium leading-tight px-2">
              {t[key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
