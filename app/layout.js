"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import store from "./store/store"; // Import your Redux store
import Footer from "./components/Footer";
import { LanguageProvider } from "./components/LanguageContext";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Provider store={store}>
            {/* Wrap with Redux Provider */}
            <Header />
            {children}
            <Footer />
          </Provider>
        </LanguageProvider>
      </body>
    </html>
  );
}
