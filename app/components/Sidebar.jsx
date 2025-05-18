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
} from "lucide-react"; // import icons
import { useDispatch } from "react-redux";
import { logout } from "../store/sessionSlice"; // Import logout action

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const links = [
    { name: "Profile", href: "/admin/profile", icon: <User size={20} /> },
    {
      name: "Tender Posted",
      href: "/admin/tender-posted",
      icon: <FilePlus size={20} />,
    },
    {
      name: "Tender Quoted",
      href: "/admin/tender-quoted",
      icon: <FileText size={20} />,
    },
    {
      name: "Posted Auctions",
      href: "/admin/auctions/posted-auctions",
      icon: <Upload size={20} />,
    }, // new
    {
      name: "Placed Bids (Auctions)",
      href: "/admin/auctions/placed-bids",
      icon: <HandCoins size={20} />,
    }, // new
    {
      name: "Online Bidding",
      href: "/admin/online-bidding",
      icon: <Gavel size={20} />, // new item with icon
    },
  ];

  const handleLogout = () => {
    // optional: clear cookies here if needed
    dispatch(logout()); // Dispatch logout action to clear user session
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // simple redirect
  };

  return (
    <div className="w-64 bg-orange-400 border-r p-4 flex flex-col min-h-screen">
      <div className="text-2xl text-white font-bold mb-8">Admin Panel</div>

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

      {/* auction Button */}
      <Link
        href="/admin/auctions/post-auction"
        className={`flex items-center gap-3 p-2 rounded-lg mt-6 text-purple-700 hover:bg-blue-100`}
      >
        <PlusCircle size={20} />
        <span>Create Auction</span>
      </Link>
      {/* New Post Tender Button */}
      <Link
        href="/admin/post-tender"
        className={`flex items-center gap-3 p-2 rounded-lg mt-6 text-purple-700 hover:bg-blue-100`}
      >
        <PlusCircle size={20} />
        <span>Create Tender</span>
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 cursor-pointer rounded-lg text-purple-700 hover:bg-red-100 mt-6"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}
