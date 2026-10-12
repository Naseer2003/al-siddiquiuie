"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, ArrowRight, ArrowLeft, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { RESTAURANT_INFO } from "./MenuData";

gsap.registerPlugin(ScrollTrigger);

/*
 *  AL SADIQUE RESTAURANT — 3D FLIP MENU BOOK
 *  ───────────────────────────────────────────
 *  Book Architecture:
 *  - Closed State:
 *    - Perfectly centered closed menu book (xPercent: -25 on stage puts the cover right at 50% screen center).
 *    - Left side has NOTHING (no static page, no background panel, no ghost).
 *  - Open State:
 *    - Opens seamlessly via synchronized GSAP timeline (cover rotates 0 -> -180 while stage slides -25 -> 0).
 *    - Cover carries Page 1 (Starters) on its inside face, revealing it on the left side as it lands!
 *    - Right side reveals Page 2 (Biryani).
 *  - Flip Spread (Page 2 -> Page 3):
 *    - Page Leaf flips in 3D (-180deg) over to the left on top of Cover Leaf, revealing Page 3 on the left.
 *    - Underneath on the right is Page 4 (Rolls & Breads).
 *  - Flip Back (Page 3 -> Page 2):
 *    - Page Leaf flips back in 3D (0deg) to reveal Page 1 on the left and Page 2 on the right.
 *  - Close State:
 *    - Cover lifts off the left side carrying Page 1 with it, closing over Page 2.
 *    - Left side has ZERO ghost, ZERO peeking, 100% glitch-free.
 */

/* ── Menu Data ────────────────────────────────────────── */
type DishItem = {
  id: string;
  name: string;
  badge: string;
  desc: string;
  price: string;
  image: string;
};

type PageData = {
  title: string;
  label: string;
  page: string;
  items: DishItem[];
};

const PAGE1: PageData = {
  title: "STARTERS & CHARCOAL",
  label: "Clay Tandoor & Charcoal",
  page: "Page 1",
  items: [
    {
      id: "1",
      name: "Chicken Kabab",
      badge: "Bestseller",
      desc: "Bangalore's iconic crispy golden fried chicken tossed in lemon and secret spices.",
      price: "₹140 (Q) / ₹290 (H) / ₹560 (F)",
      image: "/images/kebabs.jpg",
    },
    {
      id: "2",
      name: "Al Faham Charcoal Chicken",
      badge: "Charcoal Grill",
      desc: "Smoky charcoal grilled chicken basted in olive oil, crushed pepper & garlic herbs.",
      price: "₹210 (Half) / ₹420 (Full)",
      image: "/images/alfaham.jpg",
    },
  ],
};

const PAGE2: PageData = {
  title: "BIRIYANI & GHEE RICE",
  label: "Bangalore Dum Heritage",
  page: "Page 2",
  items: [
    {
      id: "3",
      name: "Al Sadique Chicken Biriyani",
      badge: "House Pride",
      desc: "Bangalore-style slow dum rice with tender chicken, garden mint & saffron aroma.",
      price: "₹130 (Full) / ₹90 (Kuska)",
      image: "/images/biryani.jpg",
    },
    {
      id: "4",
      name: "Desi Ghee & Jeera Rice",
      badge: "Fragrant Heritage",
      desc: "Aromatic basmati tossed in pure clarified desi ghee, fried cashews & roasted cumin.",
      price: "₹90",
      image: "/images/biryani.jpg",
    },
  ],
};

const PAGE3: PageData = {
  title: "ROYAL CHICKEN GRAVIES",
  label: "Slow Handi Gravies",
  page: "Page 3",
  items: [
    {
      id: "5",
      name: "Butter Chicken Royale",
      badge: "Makhani Gravy",
      desc: "Tandoori chicken in a satin-smooth rich tomato butter sauce with kasuri methi.",
      price: "₹230",
      image: "/images/butter-chicken.jpg",
    },
    {
      id: "6",
      name: "Hyderabadi & Kadai Chicken",
      badge: "Nawabi Handi",
      desc: "Slow-simmered chicken with roasted coconut & mint, or wok-tossed kadai curry.",
      price: "₹230",
      image: "/images/curry.jpg",
    },
  ],
};

const PAGE4: PageData = {
  title: "ROTI & SHAWARMA ROLLS",
  label: "Fresh Clay Breads & Rolls",
  page: "Page 4",
  items: [
    {
      id: "7",
      name: "Rumali Roti & Kerala Parata",
      badge: "Clay Breads",
      desc: "Paper-thin handkerchief bread hand-spun on wok, or multi-layered flaky paratha.",
      price: "Rumali ₹20 / Parata ₹30 / Khubus ₹20",
      image: "/images/breads.jpg",
    },
    {
      id: "8",
      name: "Chicken Shawarma & Tikka Roll",
      badge: "Signature Rolls",
      desc: "Juicy shaved rotisserie chicken stuffed with garlic toum wrapped in paratha.",
      price: "Tikka Roll ₹90 / Shawarma ₹80",
      image: "/images/shawarma.jpg",
    },
  ],
};

/* ── Dish Card ────────────────────────────────────────── */
const DishCard = ({ dish }: { dish: DishItem }) => (
  <div className="flex gap-3 items-start bg-[#faf7f2] rounded-xl p-3 border border-[#e8ddd0]">
    <div className="relative w-[66px] h-[66px] shrink-0 rounded-lg overflow-hidden bg-stone-100">
      <Image src={dish.image} alt={dish.name} fill sizes="66px" className="object-cover" />
      <div className="absolute top-0.5 left-0.5 bg-stone-900/85 text-[7px] font-bold text-amber-300 px-1 py-0.5 rounded leading-tight">
        {dish.badge}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h4
        className="font-serif text-[13px] font-bold text-stone-900 leading-tight"
        style={{ fontFamily: "var(--font-serif,serif)" }}
      >
        {dish.name}
      </h4>
      <p className="text-[11px] text-stone-500 leading-snug mt-0.5 line-clamp-2">{dish.desc}</p>
      <div className="mt-1.5 text-[11px] font-bold font-mono text-amber-800">{dish.price}</div>
    </div>
  </div>
);

/* ── Page Face Component ──────────────────────────────── */
const PageFace = ({ data, side }: { data: PageData; side: "left" | "right" }) => (
  <div
    className="w-full h-full bg-[#fefcf8] flex flex-col justify-between"
    style={{
      borderRight: side === "left" ? "1px solid #ddd0be" : "none",
      borderLeft: side === "right" ? "1px solid #ddd0be" : "none",
    }}
  >
    <div className="absolute top-0 inset-x-0 h-[3px] fluted-gold-panel" />
    <div className="p-5 pt-6 flex flex-col gap-3">
      <div className="flex items-start justify-between border-b border-[#e8ddd0] pb-2 mb-1">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 block">{data.label}</span>
          <h3
            className="font-serif text-sm font-bold text-stone-900"
            style={{ fontFamily: "var(--font-serif,serif)" }}
          >
            {data.title}
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-stone-400 shrink-0 ml-2">{data.page}</span>
      </div>
      {data.items.map((d) => (
        <DishCard key={d.id} dish={d} />
      ))}
    </div>
    <div className="px-5 pb-3 border-t border-[#e8ddd0] pt-2 flex items-center justify-between">
      <span className="text-[10px] font-semibold text-amber-800">Al Sadique · 100% Halal</span>
      <span className="text-[10px] font-mono text-stone-400">{RESTAURANT_INFO.phone}</span>
    </div>
  </div>
);

/* ── Shared Face Style Helper ─────────────────────────── */
const faceStyle = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  ...extra,
});

/* ── Main Component ───────────────────────────────────── */
export default function GsapAnimatedMenuCard() {
  const [spreadIndex, setSpreadIndex] = useState(0); // 0 = Spread A, 1 = Spread B
  const [coverOpen, setCoverOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const coverLeafRef = useRef<HTMLDivElement>(null);
  const pageLeafRef = useRef<HTMLDivElement>(null);

  /* ── Scroll Entrance ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".mb-heading", {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.from(".mb-book-container", {
        opacity: 0,
        y: 35,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Init Initial Transforms ── */
  useEffect(() => {
    if (stageRef.current) {
      gsap.set(stageRef.current, { xPercent: -25 }); // Center the closed book cover
    }
    if (coverLeafRef.current) {
      gsap.set(coverLeafRef.current, { rotateY: 0 });
      coverLeafRef.current.style.zIndex = "40";
    }
    if (pageLeafRef.current) {
      gsap.set(pageLeafRef.current, { rotateY: 0 });
      pageLeafRef.current.style.zIndex = "30";
    }
  }, []);

  /* ── Open Menu Book ── */
  const openCover = useCallback(() => {
    if (coverOpen || isAnimating || !coverLeafRef.current || !stageRef.current) return;
    setIsAnimating(true);
    setCoverOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        // Lower cover leaf zIndex so turned page leaf sits on top of it on the left
        if (coverLeafRef.current) coverLeafRef.current.style.zIndex = "15";
        setIsAnimating(false);
      },
    });

    // Synchronize stage center shift and cover opening
    tl.to(stageRef.current, { xPercent: 0, duration: 1.05, ease: "power2.inOut" }, 0);
    tl.to(coverLeafRef.current, { rotateY: -180, duration: 1.05, ease: "power2.inOut" }, 0);
  }, [coverOpen, isAnimating]);

  /* ── Close Menu Book ── */
  const closeCover = useCallback(() => {
    if (!coverOpen || isAnimating || !coverLeafRef.current || !stageRef.current) return;
    setIsAnimating(true);

    // If on Spread B, immediately reset Page Leaf back to Spread A
    if (spreadIndex === 1 && pageLeafRef.current) {
      gsap.set(pageLeafRef.current, { rotateY: 0 });
      setSpreadIndex(0);
    }

    // Bring cover leaf on top before animating closed
    if (coverLeafRef.current) coverLeafRef.current.style.zIndex = "40";
    setCoverOpen(false);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    // Synchronize stage centering shift and cover closing
    tl.to(stageRef.current, { xPercent: -25, duration: 1.05, ease: "power2.inOut" }, 0);
    tl.to(coverLeafRef.current, { rotateY: 0, duration: 1.05, ease: "power2.inOut" }, 0);
  }, [coverOpen, isAnimating, spreadIndex]);

  /* ── Flip Forward (Spread A → Spread B) ── */
  const flipForward = useCallback(() => {
    if (spreadIndex === 1 || isAnimating || !pageLeafRef.current) return;
    setIsAnimating(true);

    gsap.to(pageLeafRef.current, {
      rotateY: -180,
      duration: 0.85,
      ease: "power2.inOut",
      onComplete: () => {
        setSpreadIndex(1);
        setIsAnimating(false);
      },
    });
  }, [spreadIndex, isAnimating]);

  /* ── Flip Backward (Spread B → Spread A) ── */
  const flipBackward = useCallback(() => {
    if (spreadIndex === 0 || isAnimating || !pageLeafRef.current) return;
    setIsAnimating(true);

    gsap.to(pageLeafRef.current, {
      rotateY: 0,
      duration: 0.85,
      ease: "power2.inOut",
      onComplete: () => {
        setSpreadIndex(0);
        setIsAnimating(false);
      },
    });
  }, [spreadIndex, isAnimating]);

  /* ─────────────────────────────────────────────────── */
  return (
    <section
      id="animated-menu"
      ref={sectionRef}
      className="py-14 md:py-20 bg-[#f9f7f4] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-16 h-full fluted-gold-panel opacity-[0.06] pointer-events-none" />
      <div className="absolute top-0 left-0 w-16 h-full fluted-gold-panel opacity-[0.06] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="mb-heading inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <BookOpen className="w-3.5 h-3.5" />
            <span>3D Menu Book</span>
          </div>
          <h2
            className="mb-heading font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight"
            style={{ fontFamily: "var(--font-serif,serif)" }}
          >
            The Restaurant <span className="gold-gradient-text">Menu Book</span>
          </h2>
          <p className="mb-heading mt-3 text-stone-500 text-sm sm:text-base">
            {coverOpen
              ? "Turn pages to explore all 8 signature royal dishes."
              : "Click the menu book cover or use the button below to open and browse."}
          </p>

          {/* Interactive Controls */}
          <div className="mb-heading mt-6 flex flex-wrap justify-center gap-3">
            {!coverOpen ? (
              <button
                onClick={openCover}
                disabled={isAnimating}
                className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 disabled:opacity-60 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                Open Menu Book
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
            ) : (
              <>
                <button
                  onClick={closeCover}
                  disabled={isAnimating}
                  className="px-5 py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 disabled:opacity-50 text-stone-800 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Close Book
                </button>
                <button
                  onClick={flipBackward}
                  disabled={isAnimating || spreadIndex === 0}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    spreadIndex === 0
                      ? "bg-stone-900 text-white border-transparent"
                      : "bg-white text-stone-700 hover:bg-stone-100 border-stone-200 disabled:opacity-40"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 text-amber-500" />
                  Starters & Biryani (p. 1-2)
                </button>
                <button
                  onClick={flipForward}
                  disabled={isAnimating || spreadIndex === 1}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    spreadIndex === 1
                      ? "bg-stone-900 text-white border-transparent"
                      : "bg-white text-stone-700 hover:bg-stone-100 border-stone-200 disabled:opacity-40"
                  }`}
                >
                  Gravies & Rolls (p. 3-4)
                  <ChevronRight className="w-4 h-4 text-amber-500" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* ═══════════════════════ BOOK CONTAINER ═══════════════════════ */}
        <div
          className="mb-book-container"
          style={{ perspective: "2400px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            ref={stageRef}
            className="relative mx-auto max-w-5xl"
            style={{
              height: 580,
              transformStyle: "preserve-3d",
            }}
          >
            {/*
              CHASSIS LEFT HALF:
              Visible ONLY when book is open.
              During closed or opening/closing, it is opacity-0 so the left side is 100% empty!
            */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full rounded-l-[20px] bg-[#1c1a17] border-[3px] border-r-0 border-[#2c2722] shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-opacity duration-300 ${
                coverOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{ zIndex: 5 }}
            />

            {/*
              CHASSIS RIGHT HALF:
              Always visible under the right side.
            */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full rounded-r-[20px] bg-[#1c1a17] border-[3px] border-[#2c2722] shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
              style={{ zIndex: 5 }}
            />

            {/*
              STATIC RIGHT BASE: Page 4 (Rolls & Breads)
              Always sits under the right side at z:10. Revealed when Page Leaf turns to the left.
            */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full rounded-r-[17px] overflow-hidden"
              style={{ zIndex: 10 }}
            >
              <div
                className="relative w-full h-full"
                onClick={() => {
                  if (coverOpen && spreadIndex === 0 && !isAnimating) flipForward();
                }}
              >
                <PageFace data={PAGE4} side="right" />
              </div>
            </div>

            {/* Spine Crease (only visible when book is open) */}
            <div
              className={`absolute top-0 bottom-0 pointer-events-none transition-opacity duration-300 ${
                coverOpen ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: "calc(50% - 20px)",
                width: 40,
                zIndex: 25,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
              }}
            />

            {/*
              ═════════════════════════════════════════════════════
              PAGE LEAF (Pages 2 & 3) — pivots from spine (left center)
              Front (0°)    = Page 2 (Biryani & Ghee Rice)
              Back  (-180°) = Page 3 (Royal Chicken Gravies)
              zIndex = 30
              ═════════════════════════════════════════════════════
            */}
            <div
              ref={pageLeafRef}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "50%",
                height: "100%",
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
                zIndex: 30,
              }}
            >
              {/* Front: Page 2 (Biryani) — click to flip forward */}
              <div
                style={faceStyle({ borderRadius: "0 17px 17px 0" })}
                className="cursor-pointer"
                onClick={() => {
                  if (coverOpen && !isAnimating && spreadIndex === 0) flipForward();
                }}
              >
                <div className="relative w-full h-full">
                  <PageFace data={PAGE2} side="right" />
                </div>
                {/* Flip Next Badge */}
                {coverOpen && spreadIndex === 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isAnimating) flipForward();
                    }}
                    className="absolute bottom-12 right-4 z-20 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  >
                    <span>Turn to Gravies & Rolls</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Back: Page 3 (Gravies) — click to flip backward */}
              <div
                style={faceStyle({
                  transform: "rotateY(180deg)",
                  borderRadius: "17px 0 0 17px",
                  backgroundColor: "#fefcf8",
                })}
                className="cursor-pointer"
                onClick={() => {
                  if (!isAnimating && spreadIndex === 1) flipBackward();
                }}
              >
                <div className="relative w-full h-full">
                  <PageFace data={PAGE3} side="left" />
                </div>
                {/* Flip Back Badge */}
                {spreadIndex === 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isAnimating) flipBackward();
                    }}
                    className="absolute bottom-12 left-4 z-20 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Turn to Starters & Biryani</span>
                  </button>
                )}
              </div>
            </div>

            {/*
              ═════════════════════════════════════════════════════
              COVER LEAF — pivots from spine (left center)
              Front (0°)    = Dark Hardbound Restaurant Cover
              Back  (-180°) = Page 1 (STARTERS & CHARCOAL)
              zIndex = 40 when closed, 15 when open
              ───────────────────────────────────────────────────
              KEY DESIGN FEATURE:
              There is NO static base on the left side!
              Page 1 is attached directly to the inside face of this Cover Leaf.
              As the cover opens, it carries Page 1 over to the left side!
              As the cover closes, it carries Page 1 away with it!
              This completely eliminates any ghost page or left-side glitch!
              ═════════════════════════════════════════════════════
            */}
            <div
              ref={coverLeafRef}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "50%",
                height: "100%",
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
                zIndex: 40,
              }}
            >
              {/* Front: Hardbound Menu Cover */}
              <div
                style={faceStyle({
                  borderRadius: "0 17px 17px 0",
                  background: "linear-gradient(155deg, #181512 0%, #0d0c0a 100%)",
                  borderLeft: "3px solid rgba(197,155,80,0.3)",
                })}
                className="cursor-pointer flex flex-col items-center justify-between p-7"
                onClick={openCover}
              >
                {/* Corner filigrees */}
                <div className="absolute top-3 right-3 text-amber-500/50">
                  <svg width="26" height="26" viewBox="0 0 60 60" fill="currentColor">
                    <path d="M5 5 C20 5 40 20 40 40 C30 25 20 12 5 5Z" />
                    <path d="M5 5 L5 35 C12 25 22 15 38 8Z" />
                    <circle cx="9" cy="9" r="3" />
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3 text-amber-500/50 rotate-180">
                  <svg width="26" height="26" viewBox="0 0 60 60" fill="currentColor">
                    <path d="M5 5 C20 5 40 20 40 40 C30 25 20 12 5 5Z" />
                    <path d="M5 5 L5 35 C12 25 22 15 38 8Z" />
                    <circle cx="9" cy="9" r="3" />
                  </svg>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-5 fluted-gold-panel opacity-15 rounded-r-[17px]" />

                <div className="text-center relative z-10 mt-1">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-amber-500/70 font-semibold mb-1">
                    Est. Bangalore · Halal
                  </p>
                  <h3
                    className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-white"
                    style={{ fontFamily: "var(--font-serif,serif)" }}
                  >
                    AL SADIQUE
                  </h3>
                  <div className="text-[9px] uppercase tracking-[0.35em] text-amber-400 font-semibold mt-1">
                    RESTAURANT
                  </div>
                </div>

                <div className="relative z-10 text-center">
                  <div className="border-y border-amber-500/30 py-3 px-8 mb-3 bg-stone-900/40">
                    <span
                      className="font-serif text-3xl tracking-widest text-stone-100 font-bold block"
                      style={{ fontFamily: "var(--font-serif,serif)" }}
                    >
                      MENU
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-amber-400/80 block mt-0.5">
                      Royal Awadhi Specialties
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 animate-bounce" />
                    Click to Open
                  </div>
                </div>

                <div className="relative z-10 text-center text-[10px] text-stone-500">
                  <p className="font-mono text-amber-500/70 font-bold">{RESTAURANT_INFO.phone}</p>
                  <p className="mt-0.5">Opp. Coles Park, Bangalore</p>
                </div>
              </div>

              {/*
                Back of Cover: PAGE 1 (STARTERS & CHARCOAL)
                Attached to the inside face of the cover.
                As cover opens, it carries Page 1 into position on the left.
                As cover closes, it carries Page 1 away with it!
              */}
              <div
                style={faceStyle({
                  transform: "rotateY(180deg)",
                  borderRadius: "17px 0 0 17px",
                  backgroundColor: "#fefcf8",
                })}
              >
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => {
                    if (spreadIndex === 1 && !isAnimating) flipBackward();
                  }}
                >
                  <PageFace data={PAGE1} side="left" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-8 text-center text-xs text-stone-400">
          Click any page or use the buttons above to flip between spreads.
        </div>

      </div>
    </section>
  );
}
