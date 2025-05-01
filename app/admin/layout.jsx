"use client";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // If no token is found in localStorage, redirect to the login page
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
