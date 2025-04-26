// components/Categories.jsx
import { assets } from "@/assets/assets";
import Image from "next/image";

const categories = [
  { title: "Property", iconSrc: assets.c1, bg: "bg-indigo-100" },
  { title: "Land", iconSrc: assets.land, bg: "bg-amber-100" },
  { title: "Small Gadget", iconSrc: assets.smart, bg: "bg-rose-100" },
  {
    title: "Home Appliance",
    iconSrc: assets.domest_app,
    bg: "bg-sky-100",
  },
  {
    title: "Kitchen Appliance",
    iconSrc: assets.kitchen,
    bg: "bg-emerald-100",
  },
  {
    title: "Phone & Tablet",
    iconSrc: assets.mobile,
    bg: "bg-rose-100",
  },
  { title: "Watches", iconSrc: assets.watches, bg: "bg-teal-100" },
  {
    title: "Health & Beauty",
    iconSrc: assets.beauty,
    bg: "bg-violet-100",
  },
  {
    title: "Personal Care",
    iconSrc: assets.skin,
    bg: "bg-amber-100",
  },
  {
    title: "Facility Management ",
    iconSrc: assets.facility,
    bg: "bg-rose-100",
  },
];

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="mb-6 text-2xl font-semibold">Categories</h2>

      {/* responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map(({ title, iconSrc, bg }) => (
          <div
            key={title}
            className={`${bg} rounded-lg flex flex-col items-center justify-center aspect-square cursor-pointer shadow-sm hover:shadow-md transition`}
          >
            <Image src={iconSrc} alt={title} width={60} height={60} priority />
            <p className="text-center text-sm font-medium leading-tight px-2">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
