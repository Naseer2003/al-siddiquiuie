"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, BookOpen, MapPin, Star, ChevronDown } from "lucide-react";
import { useOrder } from "./OrderContext";
import { RESTAURANT_INFO } from "./MenuData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { setIsBookingOpen } = useOrder();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".h-eyebrow", { opacity: 0, y: 16, duration: 0.7 })
        .from(".h-title span", { opacity: 0, y: 32, stagger: 0.12, duration: 0.9 }, "-=0.4")
        .from(".h-body", { opacity: 0, y: 16, duration: 0.65 }, "-=0.5")
        .from(".h-cta", { opacity: 0, y: 14, stagger: 0.1, duration: 0.55 }, "-=0.4")
        .from(".h-stat", { opacity: 0, y: 10, stagger: 0.08, duration: 0.45 }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ambience.jpg"
          alt="Al Sadique Restaurant Ambience"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay — heavier at bottom where text sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/92 via-stone-950/55 to-stone-900/30" />
        {/* Warm amber tint layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/20 to-transparent" />
      </div>

      {/* ── Thin gold top bar ── */}
      <div className="absolute top-0 inset-x-0 h-1 fluted-gold-panel z-10" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-20 md:pb-28 pt-40">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="h-eyebrow inline-flex items-center gap-2.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-stone-300 text-xs font-medium tracking-wide">
              Coles Park, Bangalore
            </span>
            <span className="text-stone-600">·</span>
            <span className="text-emerald-400 text-xs font-semibold">100% Halal Certified</span>
          </div>

          {/* Main headline */}
          <h1
            className="h-title font-serif font-bold leading-[1.07] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            <span className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Authentic Mughal
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl gold-gradient-text">
              Charcoal Grills
            </span>
            <span className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              & Royal Biryani
            </span>
          </h1>

          {/* Subtitle */}
          <p className="h-body text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            Welcome to{" "}
            <strong className="text-amber-300 font-semibold">
              {RESTAURANT_INFO.name}
            </strong>
            . Bangalore&apos;s beloved destination for slow dum biryani,
            live charcoal Al Faham, and time-honored Mughlai gravies — served with royal grace.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#animated-menu"
              className="h-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-900/30 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              View Menu Book
            </a>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="h-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 hover:border-white/50 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm tracking-wide transition-all backdrop-blur-sm cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              Reserve a Table
            </button>
          </div>

          {/* Stats strip */}
          <div className="flex items-center gap-8 pt-6 border-t border-white/10">
            <div className="h-stat flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-white font-bold text-lg font-mono">4.9</span>
              </div>
              <span className="text-stone-400 text-[11px]">Google Rating</span>
            </div>

            <div className="h-stat w-px h-8 bg-white/15" />

            <div className="h-stat flex flex-col gap-0.5">
              <span className="text-white font-bold text-lg font-mono">11:30</span>
              <span className="text-stone-400 text-[11px]">Open till 11:30 PM</span>
            </div>

            <div className="h-stat w-px h-8 bg-white/15" />

            <div className="h-stat flex flex-col gap-0.5">
              <span className="text-amber-400 font-bold text-lg font-mono">₹90+</span>
              <span className="text-stone-400 text-[11px]">Starting price</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <ChevronDown className="w-5 h-5 text-amber-400/70 animate-bounce" />
      </div>
    </section>
  );
}
