"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const GALLERY = [
  {
    id: "entrance",
    label: "Our Entrance",
    image: "/images/restaurant-sign.jpg",
    title: "The Regal Crest",
    desc: "Champagne gold fluted paneling, hand-crafted acrylic crest, and lush botanical greenery — our signature entrance.",
  },
  {
    id: "dining",
    label: "Dining Hall",
    image: "/images/ambience.jpg",
    title: "Grand Marble Hall",
    desc: "Round marble dining tables, warm amber pendants, and expansive daylight across 180+ covers — designed for celebrations.",
  },
  {
    id: "biryani",
    label: "Signature Dish",
    image: "/images/biryani.jpg",
    title: "Royal Dum Biryani",
    desc: "Sealed in whole-wheat dough and slow-simmered on coal embers for six hours. No shortcuts, only patience.",
  },
];

const FACTS = [
  { value: "180+", label: "Dining Seats" },
  { value: "100%", label: "Halal Certified" },
  { value: "6 hrs", label: "Dum Cook Time" },
  { value: "4.9★", label: "Google Rating" },
];

export default function StoryAmbience() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".sa-header", {
        opacity: 0, y: 36, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".sa-header", start: "top 82%" },
      });
      gsap.from(".sa-tab", {
        opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: ".sa-tabs", start: "top 85%" },
      });
      gsap.from(".sa-main", {
        opacity: 0, y: 40, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".sa-main", start: "top 80%" },
      });
      gsap.from(".sa-fact", {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".sa-facts", start: "top 85%" },
      });
      gsap.from(".sa-story-card", {
        opacity: 0, y: 28, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".sa-story-grid", start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const item = GALLERY[active];

  return (
    <section id="ambience" ref={sectionRef} className="py-20 md:py-28 bg-white relative">
      <div className="absolute top-0 inset-x-0 h-px bg-stone-100" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Header ── */}
        <div className="sa-header mb-14 max-w-2xl">
          <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            Our Space & Story
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            Crafted in Gold,{" "}
            <span className="gold-gradient-text">Marble & Greenery</span>
          </h2>
          <p className="mt-4 text-stone-500 text-base leading-relaxed max-w-xl">
            From our iconic gold-fluted entrance to sunlit marble tables, every corner of Al Sadiquie is designed for family memories.
          </p>
        </div>

        {/* ── Gallery tabs ── */}
        <div className="sa-tabs flex gap-2 mb-8">
          {GALLERY.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActive(i)}
              className={`sa-tab px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                active === i
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* ── Main showcase ── */}
        <div className="sa-main grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">

          {/* Image — 3 cols */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 group" style={{ aspectRatio: "16/10" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </motion.div>
              </AnimatePresence>
              <button
                onClick={() => setLightbox(item.image)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Text — 2 cols */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-4"
                  style={{ fontFamily: "var(--font-serif, serif)" }}
                >
                  {item.title}
                </h3>
                <p className="text-stone-500 text-base leading-relaxed mb-8">{item.desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Facts */}
            <div className="sa-facts grid grid-cols-2 gap-4">
              {FACTS.map((f) => (
                <div key={f.label} className="sa-fact border border-stone-100 rounded-xl p-4">
                  <div className="font-mono font-bold text-xl text-stone-900">{f.value}</div>
                  <div className="text-stone-400 text-xs mt-0.5">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Story grid ── */}
        <div id="story" className="sa-story-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            {
              num: "01",
              title: "Awadhi Lineage",
              body: "Founded on age-old recipes from the royal kitchens of Lucknow and Hyderabad, preserved across generations.",
            },
            {
              num: "02",
              title: "Slow Fire Philosophy",
              body: "No pressure cookers. Our biryani is sealed in dough and slow-simmered over gentle coal embers for hours.",
            },
            {
              num: "03",
              title: "Uncompromising Halal",
              body: "Every cut of mutton and poultry is 100% Halal certified, fresh-sourced daily, and carefully prepared.",
            },
            {
              num: "04",
              title: "Mehmaan Nawaazi",
              body: "In the royal tradition, a guest is a gift. Warm, attentive service with genuine grace on every visit.",
            },
          ].map((card) => (
            <div
              key={card.num}
              className="sa-story-card group p-6 rounded-2xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300 cursor-default"
            >
              <span className="font-mono text-xs text-amber-600 font-bold block mb-3">{card.num}</span>
              <h4
                className="font-serif text-base font-bold text-stone-900 mb-2"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                {card.title}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-4xl w-full aspect-[16/10] rounded-xl overflow-hidden">
              <Image src={lightbox} alt="" fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
