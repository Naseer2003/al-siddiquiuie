"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, MapPin, Users, Sparkles, X, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const AMBIENCE_GALLERY = [
  {
    id: "entrance",
    label: "Regal Entrance",
    image: "/images/restaurant-sign.jpg",
    title: "Champagne Gold Fluted Facade",
    subtitle: "The Signature Crest",
    desc: "Bespoke acoustic fluted gold paneling, warm backlight acrylic lettering, and lush hanging botanical greenery welcome you from Coles Park Road.",
    tag: "Iconic Exterior",
  },
  {
    id: "hall",
    label: "Grand Dining Hall",
    image: "/images/ambience.jpg",
    title: "Sunlit Marble Dining Chambers",
    subtitle: "180+ Luxury Covers",
    desc: "Spacious round Italian marble tables, amber hanging pendants, and natural daylight designed for large family feasts and celebratory banquets.",
    tag: "Main Dining",
  },
  {
    id: "craft",
    label: "Charcoal & Dum Feast",
    image: "/images/biryani.jpg",
    title: "Royal Awadhi Table Spread",
    subtitle: "Live Table Service",
    desc: "Steaming clay handis sealed in whole-wheat purda unsealed tableside, accompanied by smoky live charcoal kababs on silver platters.",
    tag: "Table Experience",
  },
  {
    id: "kebabs",
    label: "Live Grill & Tandoor",
    image: "/images/kebabs.jpg",
    title: "Open Charcoal Tandoor Kitchen",
    subtitle: "Babul Wood Embers",
    desc: "Watch our master ustads skewer tender marinated meats over glowing white-ash charcoal embers with fragrant whispers of sweet woodsmoke.",
    tag: "Culinary Theater",
  },
];

const VENUE_HIGHLIGHTS = [
  {
    icon: Users,
    title: "180+ Seating Capacity",
    desc: "Spacious round marble tables tailored for large family gatherings.",
  },
  {
    icon: Sparkles,
    title: "Fluted Gold Architecture",
    desc: "Signature champagne gold fluting with custom ambient amber illumination.",
  },
  {
    icon: MapPin,
    title: "Opposite Coles Park",
    desc: "Prime Fraser Town heritage location with lush tree-lined views.",
  },
];

export default function StoryAmbience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const current = AMBIENCE_GALLERY[activeIdx];

  return (
    <section id="ambience" className="py-14 md:py-20 bg-[#faf8f5] relative overflow-hidden">
      {/* Decorative architectural borders */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-stone-200/60" />

      {/* Subtle gold fluted side accents */}
      <div className="absolute top-0 left-0 w-16 h-full fluted-gold-panel opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-full fluted-gold-panel opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Compact Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Architectural Ambience</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-serif, serif)" }}
            >
              Crafted in Gold, <span className="gold-gradient-text">Marble & Greenery</span>
            </h2>
          </div>
          <p className="text-stone-500 text-sm max-w-md leading-relaxed">
            From our signature fluted entrance to grand marble dining chambers, every space is curated for regal warmth and cherished family moments.
          </p>
        </div>

        {/* ── Ambience Showcase Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">

          {/* Left: Main Large Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl border border-stone-200/90 p-3 sm:p-4 shadow-xl">
            {/* Large Image Frame */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 group shadow-inner">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80" />

              {/* Tag & Maximize button */}
              <div className="absolute top-3.5 left-3.5 bg-stone-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                {current.tag}
              </div>
              <button
                onClick={() => setLightboxImg(current.image)}
                className="absolute top-3.5 right-3.5 bg-stone-950/70 hover:bg-amber-600 text-white p-2 rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                title="View Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Overlay Caption on Image Bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                  {current.subtitle}
                </span>
                <h3
                  className="font-serif text-xl sm:text-2xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-serif, serif)" }}
                >
                  {current.title}
                </h3>
              </div>
            </div>

            {/* Bottom description */}
            <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                {current.desc}
              </p>
              <button
                onClick={() => setLightboxImg(current.image)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 shrink-0 cursor-pointer transition-colors"
              >
                <span>Expand View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Gallery Selector Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {AMBIENCE_GALLERY.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 group ${
                    isActive
                      ? "bg-white border-amber-500 shadow-lg scale-[1.01] ring-1 ring-amber-500/30"
                      : "bg-white/80 hover:bg-white border-stone-200 hover:border-amber-400/60 shadow-sm"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-500 rounded-xl" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 font-semibold">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4
                      className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate"
                      style={{ fontFamily: "var(--font-serif, serif)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Compact Venue Highlights Strip ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm">
          {VENUE_HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="flex items-center gap-3.5 px-3 py-1.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0 shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">{h.title}</h4>
                  <p className="text-[11px] text-stone-500 leading-snug mt-0.5">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Lightbox Overlay ── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-5xl w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image src={lightboxImg} alt="Ambience Fullview" fill className="object-contain" priority />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
