"use client";

import React from "react";
import { OrderProvider } from "@/components/OrderContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StoryAmbience from "@/components/StoryAmbience";
import GsapAnimatedMenuCard from "@/components/GsapAnimatedMenuCard";
import Philosophy from "@/components/Philosophy";
import Testimonials from "@/components/Testimonials";
import LocationContact from "@/components/LocationContact";
import Footer from "@/components/Footer";
import TastingTrayDrawer from "@/components/TastingTrayDrawer";
import ReservationModal from "@/components/ReservationModal";
import CustomEffects from "@/components/CustomEffects";

export default function Home() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-white text-stone-900 selection:bg-amber-600 selection:text-white flex flex-col font-sans">
        <CustomEffects />
        <Navbar />

        <main className="flex-1">
          <Hero />
          <StoryAmbience />
          <GsapAnimatedMenuCard />
          <Philosophy />
          <Testimonials />
          <LocationContact />
        </main>

        <Footer />

        {/* Global Overlays & Interactive Drawers */}
        <TastingTrayDrawer />
        <ReservationModal />
      </div>
    </OrderProvider>
  );
}
