"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { useOrder } from "./OrderContext";
import {
  UtensilsCrossed,
  CalendarCheck,
  Menu as MenuIcon,
  X,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { totalItemsCount, setIsDrawerOpen, setIsBookingOpen } = useOrder();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "Ambience", href: "#ambience" },
    { label: "Animated Menu", href: "#animated-menu" },
    { label: "Craft & Philosophy", href: "#philosophy" },
    { label: "Guest Praise", href: "#reviews" },
    { label: "Visit & Hours", href: "#location" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-b border-amber-900/10 py-3"
            : "bg-white/80 backdrop-blur-sm border-b border-stone-200/60 py-4"
        }`}
      >
        {/* Top announcement bar in delicate gold / white */}
        <div className="hidden lg:block border-b border-amber-100 bg-[#fdfaf3] py-1 text-xs text-stone-600 mb-2">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-emerald-800 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Dining Open Now • Closes 11:30 PM
              </span>
              <span className="text-stone-300">|</span>
              <span className="flex items-center gap-1 text-amber-900/80">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Special: Awadhi Zafrani Biryani slow-dum active
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="tel:+919590411117"
                className="hover:text-amber-800 transition-colors flex items-center gap-1 font-medium"
              >
                <Phone className="w-3 h-3 text-amber-600" />
                Table &amp; Orders: +91 9590 411117
              </a>
              <span className="text-stone-300">|</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                Lunch: 12:00 PM – 4:00 PM | Dinner: 7:00 PM – 11:30 PM
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-stone-700 hover:text-amber-700 text-sm font-medium tracking-wide transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Tasting Tray Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50/50 hover:border-amber-300 transition-all text-stone-700 flex items-center justify-center group"
              aria-label="View tasting tray"
            >
              <UtensilsCrossed className="w-4 h-4 group-hover:text-amber-700 transition-colors" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </motion.button>

            {/* Book Table Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-stone-900 text-white hover:bg-amber-800 transition-all shadow-md shadow-stone-900/10 group cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
              <span>Reserve Table</span>
            </motion.button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] z-30 bg-white border-b border-stone-200 shadow-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-stone-800 hover:text-amber-700 text-lg font-medium border-b border-stone-100 pb-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-stone-900 text-white font-semibold flex items-center justify-center gap-2 shadow-md"
                >
                  <CalendarCheck className="w-4 h-4 text-amber-400" />
                  Reserve a Table
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsDrawerOpen(true);
                  }}
                  className="w-full py-3 rounded-full border border-amber-600 text-amber-800 font-semibold flex items-center justify-center gap-2 bg-amber-50"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  View Tasting Tray ({totalItemsCount})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
