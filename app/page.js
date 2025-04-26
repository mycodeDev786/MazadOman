"use client";

import { useState } from "react";
import VisualSlider from "./components/VisualSlider";
import Categories from "./components/Categories";
import LatestTenders from "./components/LatestTenders";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
export default function Home() {
  return (
    <>
      <HeroSection />
      <VisualSlider />
      <Categories />
      <LatestTenders />
      <Footer />
    </>
  );
}
