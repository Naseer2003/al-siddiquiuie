"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useOrder } from "./OrderContext";
import { RESTAURANT_INFO } from "./MenuData";
import {
  Sparkles,
  Flame,
  Plus,
  Minus,
  Check,
  UtensilsCrossed,
  ChefHat,
  Star,
  ArrowRight,
  Phone,
  Clock,
} from "lucide-react";

// Curated strictly to 2 Royal Signature Specials as requested
const SIGNATURE_SPECIALS = [
  {
    id: "chicken-biriyani-special",
    name: "Al Sadique Royal Chicken Biriyani",
    badge: "Chef Special 01 • House Pride",
    category: "Royal Dum Heritage",
    basePrice: 130,
    portions: [
      { label: "Chicken Biriyani", price: 130 },
      { label: "Biriyani Rice (Kuska)", price: 90 },
      { label: "Ghee Rice", price: 90 },
    ],
    image: "/images/biryani.jpg",
    spiciness: 2,
    description:
      "Our legendary Bangalore-style slow dum biriyani. Fragrant rice steeped in secret whole spices, tender chicken, fresh mint, fried shallots, and served with tangy dahi chutney & salan.",
    notes: ["Cooked Fresh Every Batch", "100% Halal", "Seeraga Samba Grain"],
    timing: "Available for Lunch & Dinner",
  },
  {
    id: "chicken-kabab-alfaham-special",
    name: "Crispy Chicken Kabab & Charcoal Al Faham",
    badge: "Chef Special 02 • Charcoal Grill",
    category: "Charcoal & Crispy Starters",
    basePrice: 140,
    portions: [
      { label: "Kabab Quarter (Q)", price: 140 },
      { label: "Kabab Half (H)", price: 290 },
      { label: "Al Faham Half (H)", price: 210 },
      { label: "Al Faham Full (F)", price: 420 },
    ],
    image: "/images/kebabs.jpg",
    spiciness: 2,
    description:
      "Al Sadique's crowd-favorite crisp fried chicken kabab tossed in lemon and house masala, alongside Arabian char-grilled Al Faham chicken brushed with garlic-herb oil.",
    notes: ["Live Charcoal Roasted", "Ultra Crispy Outer", "Served with Mint Chutney"],
    timing: "Served Sizzling Hot",
  },
];

// Quick accompaniments (Butter Chicken & Rumali Roti)
const ACCOMPANIMENTS = [
  {
    name: "Butter Chicken Royale",
    type: "Chicken Gravy",
    price: "₹230",
    desc: "Rich buttery tomato makhani with tandoor chicken pieces.",
  },
  {
    name: "Rumali Roti / Kerala Parata",
    type: "Fresh Breads",
    price: "₹20 / ₹30",
    desc: "Hand-spun soft handkerchief rumali or layered flaky parata.",
  },
  {
    name: "Chicken Shawarma Roll",
    type: "Signature Wrap",
    price: "₹80 / ₹70",
    desc: "Shaved chicken stuffed in Rumali or Khubus with garlic toum.",
  },
];

export default function MenuSection() {
  const { addItem, items: trayItems, updateQuantity, setIsDrawerOpen } =
    useOrder();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPortionIdx, setSelectedPortionIdx] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
  });
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeDishRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  const currentSpecial = SIGNATURE_SPECIALS[activeTab];
  const activePortionIndex = selectedPortionIdx[activeTab] || 0;
  const currentPortion = currentSpecial.portions[activePortionIndex];
  const currentPrice = currentPortion.price;
  const entryId = `${currentSpecial.id}-${currentPortion.label}`;
  const trayEntry = trayItems.find((i) => i.id === entryId);
  const qtyInTray = trayEntry ? trayEntry.quantity : 0;

  // GSAP animation when switching between specials
  useEffect(() => {
    if (!activeDishRef.current || !imageFrameRef.current) return;

    const ctx = gsap.context(() => {
      // Animate active special card details
      gsap.fromTo(
        ".gsap-reveal-text",
        { opacity: 0, y: 18, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        }
      );

      // Animate the plate / image container with scale and subtle tilt
      gsap.fromTo(
        imageFrameRef.current,
        { scale: 0.94, opacity: 0.4, rotate: -1.5 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );

      // Fluted shimmer accent sweep
      gsap.fromTo(
        ".gold-bar-shimmer",
        { x: "-100%" },
        { x: "100%", duration: 1.2, ease: "power1.inOut" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  const handleAdd = () => {
    addItem(
      {
        id: currentSpecial.id,
        name: currentSpecial.name,
        category: "rice",
        description: currentSpecial.description,
        basePrice: currentSpecial.basePrice,
        image: currentSpecial.image,
        spiciness: 2,
        tags: currentSpecial.notes,
      },
      currentPortion
    );
    setAddedItemEffect(entryId);
    setTimeout(() => setAddedItemEffect(null), 1200);
  };

  return (
    <section
      id="menu"
      ref={containerRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Subtle fluted gold side panels */}
      <div className="absolute top-0 right-0 w-20 md:w-36 h-full fluted-gold-panel opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 md:w-28 h-72 fluted-gold-panel opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Clean, Neat Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Al Sadique Master Specials</span>
          </div>

          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            The Chef&apos;s <span className="gold-gradient-text">Two Signatures</span>
          </h2>

          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            We focus our culinary passion on doing the essentials to utter perfection.
            Select between our legendary Chicken Biriyani or Charcoal Kababs &amp; Al Faham.
          </p>

          {/* GSAP Animated Special Selector Tabs */}
          <div className="mt-8 flex justify-center gap-3">
            {SIGNATURE_SPECIALS.map((special, idx) => (
              <button
                key={special.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === idx
                    ? "bg-stone-900 text-white shadow-xl shadow-stone-900/10 scale-102"
                    : "bg-[#faf8f5] text-stone-700 border border-stone-200 hover:border-amber-400 hover:bg-stone-100"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeTab === idx ? "bg-amber-400 animate-ping" : "bg-stone-300"
                  }`}
                />
                <span>Special 0{idx + 1}: {idx === 0 ? "Chicken Biriyani" : "Kabab & Al Faham"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Special Animated Stage */}
        <div
          ref={activeDishRef}
          className="bg-[#faf8f5] rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xl relative overflow-hidden"
        >
          {/* Top gold shimmer bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-amber-100 overflow-hidden">
            <div className="gold-bar-shimmer w-full h-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Interactive Animated Visual Plate */}
            <div className="lg:col-span-6 relative">
              <div
                ref={imageFrameRef}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 shadow-2xl border-2 border-white group"
              >
                <Image
                  src={currentSpecial.image}
                  alt={currentSpecial.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-stone-900 border border-amber-200 flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{currentSpecial.badge}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 inset-x-4 flex justify-between items-end text-white">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                      {currentSpecial.category}
                    </span>
                    <span className="text-xs text-stone-200 font-medium">
                      {currentSpecial.timing}
                    </span>
                  </div>

                  <div className="bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-right">
                    <span className="text-[10px] text-stone-300 block uppercase">Selected Price</span>
                    <span className="text-xl font-bold text-amber-400 font-mono">
                      ₹{currentPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Dish Specs, Portion Selector, and Order CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              
              <div>
                <span className="gsap-reveal-text inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest mb-2">
                  <ChefHat className="w-4 h-4 text-amber-600" />
                  Master Recipe • Al Sadique Coles Park
                </span>

                <h3
                  className="gsap-reveal-text font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight mb-3"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  {currentSpecial.name}
                </h3>

                <p className="gsap-reveal-text text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
                  {currentSpecial.description}
                </p>

                {/* Key Pillars */}
                <div className="gsap-reveal-text flex flex-wrap gap-2 mb-6">
                  {currentSpecial.notes.map((note) => (
                    <span
                      key={note}
                      className="text-xs bg-white border border-stone-200 text-stone-700 px-3 py-1 rounded-full font-medium shadow-xs"
                    >
                      ✓ {note}
                    </span>
                  ))}
                </div>

                {/* Portion / Variety Selector */}
                <div className="gsap-reveal-text mb-6">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                    Select Your Serving Size:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {currentSpecial.portions.map((portion, pIdx) => {
                      const isSelected = activePortionIndex === pIdx;
                      return (
                        <button
                          key={portion.label}
                          onClick={() =>
                            setSelectedPortionIdx((prev) => ({
                              ...prev,
                              [activeTab]: pIdx,
                            }))
                          }
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-stone-900 bg-stone-900 text-white font-bold shadow-md scale-102"
                              : "border-stone-200 bg-white text-stone-700 hover:border-amber-400 hover:bg-stone-50"
                          }`}
                        >
                          <div className="truncate">{portion.label}</div>
                          <div
                            className={`font-mono text-sm mt-0.5 ${
                              isSelected ? "text-amber-400" : "text-amber-800 font-bold"
                            }`}
                          >
                            ₹{portion.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Action Bar */}
              <div className="gsap-reveal-text pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-auto">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                    Portion: {currentPortion.label}
                  </span>
                  <span className="text-2xl font-bold text-stone-900 font-mono">
                    ₹{currentPrice}
                  </span>
                </div>

                <div className="flex-1 w-full flex items-center gap-2">
                  {qtyInTray > 0 ? (
                    <div className="w-full flex items-center justify-between bg-stone-900 text-white rounded-full p-1.5 px-4 shadow-md">
                      <span className="text-xs font-semibold">
                        In Tasting Tray ({qtyInTray})
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(entryId, -1)}
                          className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-bold text-sm text-amber-400 w-5 text-center">
                          {qtyInTray}
                        </span>
                        <button
                          onClick={() => updateQuantity(entryId, 1)}
                          className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAdd}
                      className={`w-full py-3.5 px-6 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                        addedItemEffect === entryId
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-900 hover:bg-amber-800 text-white"
                      }`}
                    >
                      {addedItemEffect === entryId ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Table Tray!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-amber-400" />
                          <span>Add Special to Table Order</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Clean Accompaniments Pill Bar (Butter Chicken, Rumali Roti, Shawarma) */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Popular Pairings &amp; Accompaniments
            </span>
            <span className="text-xs text-amber-800 font-semibold">
              Prepared fresh to order
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ACCOMPANIMENTS.map((acc) => (
              <div
                key={acc.name}
                className="bg-[#faf8f5] p-3.5 rounded-xl border border-stone-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-stone-900">
                      {acc.name}
                    </h4>
                    <span className="font-mono text-xs font-bold text-amber-800">
                      {acc.price}
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
                    {acc.type}
                  </span>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {acc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Quick Order Pill when items in tray */}
        {trayItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-md w-[92%] bg-stone-900 text-white rounded-full p-2.5 pl-5 pr-2.5 shadow-2xl flex items-center justify-between border border-amber-500/30"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-semibold text-stone-100">
                {trayItems.length} selected for table
              </span>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Tray</span>
              <UtensilsCrossed className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
