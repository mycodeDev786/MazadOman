"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/sessionSlice";
import Loading from "./LoadingSpinner";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translations/translation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const { language, changeLanguage } = useLanguage();

  const handleChange = (e) => {
    window.location.reload();
    changeLanguage(e.target.value);
  };

  const t = translations[language];
  const isArabic = language === "ar";

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const handleProfileClick = () => {
    window.location.href = "/admin/dashboard";
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white shadow-md backdrop-blur-md border-b border-gray-200"
          : "bg-orange-400 backdrop-blur-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={clsx(
            "flex justify-between items-center transition-all duration-300",
            scrolled ? "h-14" : "h-16",
            isArabic ? "flex-row-reverse justify-between" : "justify-between"
          )}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={assets.logo} alt="MazadOman" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav
            className={clsx(
              "hidden md:flex items-center font-medium text-sm transition-colors",
              scrolled ? "text-gray-700" : "text-white",
              isArabic
                ? "flex-row-reverse space-x-reverse space-x-8"
                : "space-x-8"
            )}
          >
            {/* <Link
              href="/tenders"
              className="hover:text-blue-600 hover:scale-105 transition"
            >
              {t.E_tenders}
            </Link> */}
            <Link
              href="/forward-auctions"
              className="hover:text-blue-600 hover:scale-105 transition"
            >
              {t.E_forward}
            </Link>
            <Link
              href="/reverse-auctions"
              className="hover:text-blue-600 hover:scale-105 transition"
            >
              {t.E_reverse}
            </Link>
            <Link
              href="/services"
              className="hover:text-blue-600 hover:scale-105 transition"
            >
              {t.services}
            </Link>

            <select
              value={language}
              onChange={handleChange}
              className="rounded px-3 py-2 border border-gray-300 text-sm bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-500 shadow-sm"
            >
              <option value="en" className="flex items-center">
                <span className="inline-block w-5 h-3 mr-2 align-middle">
                  <Image
                    src="https://flagcdn.com/w320/us.png" // Online URL to the USA flag image
                    alt="USA Flag"
                    width={20}
                    height={12}
                    className="object-contain"
                  />
                </span>
                English
              </option>
              <option value="ar" className="flex items-center">
                <span className="inline-block w-5 h-3 mr-2 align-middle">
                  <Image
                    src="/flags/om.svg" // Local path to the Oman flag image
                    alt="Oman Flag"
                    width={20}
                    height={12}
                    className="object-contain"
                  />
                </span>
                العربية
              </option>
            </select>

            {/* Auth Links */}
            {isClient ? (
              !user ? (
                <Link
                  href="/login"
                  className={clsx(
                    "ml-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 shadow-md",
                    isArabic ? "ml-0 mr-4" : "ml-4"
                  )}
                >
                  {t.login}
                </Link>
              ) : (
                <button
                  onClick={handleProfileClick}
                  className="relative cursor-pointer rounded-full"
                >
                  <Image
                    src={
                      user.logo
                        ? `https://mazadoman.com/backend/${user.logo}`
                        : assets.profile
                    }
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </button>
              )
            ) : (
              <Loading />
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <select
              value={language}
              onChange={handleChange}
              className="px-2 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="en">🇺🇸</option>
              <option value="ar">🇴🇲</option>
            </select>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={clsx(
                "transition-colors",
                scrolled ? "text-gray-700" : "text-white"
              )}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg rounded-b-xl shadow-lg px-4 pt-4 pb-6">
          <nav className="flex flex-col space-y-3 font-medium text-sm text-gray-700">
            <Link
              href="/tenders"
              className="hover:text-blue-600 hover:scale-105 transition"
            >
              {t.tenders}
            </Link>
            <Link
              href="/forward-auctions"
              className="hover:text-blue-600 hover:scale-105 transition"
            >
              {t.E_forward}
            </Link>
            <Link
              href="/reverse-auctions"
              className="hover:text-blue-600 hover:scale-105 transition"
            >
              {t.E_reverse}
            </Link>
            <Link
              href="/services"
              className="hover:text-blue-600 hover:scale-105 transition"
            >
              {t.services}
            </Link>

            {isClient ? (
              !user ? (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full text-center hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              ) : (
                <div>
                  <Link
                    href="/admin/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {t.dashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {t.logout}
                  </button>
                </div>
              )
            ) : (
              <Loading />
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
