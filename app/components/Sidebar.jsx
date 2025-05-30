"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  FilePlus,
  FileText,
  LogOut,
  PlusCircle,
  Gavel,
  Upload,
  HandCoins,
  Tag,
} from "lucide-react"; // import icons
import { useDispatch } from "react-redux";
import { logout } from "../store/sessionSlice"; // Import logout action
import { useLanguage } from "../components/LanguageContext";
import { translations } from "../translations/translation";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const t = translations[language];

  const isRTL = language === "ar";

  const links = [
    { name: t.profile, href: "/admin/profile", icon: <User size={20} /> },
    {
      name: t.tenderPosted,
      href: "/admin/tender-posted",
      icon: <FilePlus size={20} />,
    },
    {
      name: t.tenderQuoted,
      href: "/admin/tender-quoted",
      icon: <FileText size={20} />,
    },
    {
      name: t.postedAuctions,
      href: "/admin/auctions/posted-auctions",
      icon: <Upload size={20} />,
    },
    {
      name: t.placedBids,
      href: "/admin/auctions/placed-bids",
      icon: <HandCoins size={20} />,
    },
    {
      name: t.onlineBidding,
      href: "/admin/online-bidding",
      icon: <Gavel size={20} />,
    },
    {
      name: t.promotedProduct,
      href: "/admin/promoted-product",
      icon: <Tag size={20} />,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div
      className={`w-64 bg-orange-400 border-r p-4 flex flex-col min-h-screen ${
        isRTL ? " right-0" : " left-0"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{ textAlign: isRTL ? "right" : "left" }}
    >
      <div className="text-2xl text-white font-bold mb-8">{t.adminPanel}</div>

      <nav className="flex flex-col space-y-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              pathname === link.href
                ? "bg-blue-500 text-white"
                : "text-purple-700 hover:bg-blue-100"
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Create Auction Button */}
      <Link
        href="/admin/auctions/post-auction"
        className="flex items-center gap-3 p-2 rounded-lg mt-6 text-purple-700 hover:bg-blue-100"
      >
        <PlusCircle size={20} />
        <span>{t.createAuction}</span>
      </Link>

      {/* Create Tender Button */}
      <Link
        href="/admin/post-tender"
        className="flex items-center gap-3 p-2 rounded-lg mt-6 text-purple-700 hover:bg-blue-100"
      >
        <PlusCircle size={20} />
        <span>{t.createTender}</span>
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 cursor-pointer rounded-lg text-purple-700 hover:bg-red-100 mt-6"
      >
        <LogOut size={20} />
        <span>{t.logout}</span>
      </button>
    </div>
  );
}
