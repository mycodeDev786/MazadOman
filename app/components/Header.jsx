"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import clsx from "clsx";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            scrolled ? "h-14" : "h-16" // shrink header a bit on scroll
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
              "hidden md:flex items-center space-x-8 font-medium text-sm transition-colors",
              scrolled ? "text-gray-700" : "text-white"
            )}
          >
            <Link
              href="/tenders"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              E-Tenders
            </Link>
            <Link
              href="/events"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Forward Auctions
            </Link>
            <Link
              href="/events"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Reverse Auctions
            </Link>
            <Link
              href="/services"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Our Services
            </Link>
            <Link
              href="/login"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="ml-4 px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Register
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
              href="/sales"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              E-Tenders
            </Link>
            <Link
              href="/events"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Events
            </Link>
            <Link
              href="/services"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Our Services
            </Link>
            <Link
              href="/investor-relations"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Auctions
            </Link>
            <Link
              href="/login"
              className="hover:text-blue-600 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-center hover:bg-blue-700 transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
