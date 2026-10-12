"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Mail,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  Check,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#faf8f5] text-stone-800 border-t border-stone-200 relative overflow-hidden">
      {/* Top gold fluted thin border */}
      <div className="absolute top-0 inset-x-0 h-1 fluted-gold-panel opacity-60" />

      {/* Newsletter Degustation Bar */}
      <div className="border-b border-stone-200/80 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <span className="text-xs font-bold text-amber-800 tracking-wider uppercase flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                The Al Sadiquie Degustation Circle
              </span>
              <h3
                className="font-serif text-2xl font-bold text-stone-900"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                Receive Invitations to Seasonal Royal Feasts
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Curated seasonal biryani batches, chef tasting nights, and private banquet perks.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md items-center gap-2"
            >
              {subscribed ? (
                <div className="w-full py-3 px-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Welcome to the Royal Circle!</span>
                </div>
              ) : (
                <>
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full text-xs pl-11 pr-4 py-3 rounded-full border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              Al Sadiquie Restaurant is dedicated to the timeless heritage of
              royal Awadhi, Mughlai, and Arabian culinary mastery. Every handi is slow-cooked with pure saffron, dough-sealed earthenware, and four generations of reverence.
            </p>

            {/* Halal and Quality Badges */}
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Certified Halal
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Pure Kashmiri Saffron
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <a href="#story" className="hover:text-amber-800 transition-colors">
                  Our Awadhi Heritage
                </a>
              </li>
              <li>
                <a href="#ambience" className="hover:text-amber-800 transition-colors">
                  Fluted Gold &amp; Marble Hall
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-800 transition-colors">
                  Zafrani Dum Biryani
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-800 transition-colors">
                  Charcoal Kebab Platters
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-amber-800 transition-colors">
                  The Four Pillars of Dum
                </a>
              </li>
            </ul>
          </div>

          {/* Private Dining & Banquets */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Hospitality
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>Private Family Majlis</li>
              <li>Wedding Dawat &amp; Banquets</li>
              <li>Corporate Executive Dining</li>
              <li>Takeaway &amp; Cloud Catering</li>
              <li>Complimentary Valet Parking</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Concierge
            </h4>
            <div className="space-y-2.5 text-xs text-stone-600">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>60, Abu Plaza, St. John&apos;s Church Road, opp. Coles Park, Bangalore - 560001</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <a href="tel:+919590411117" className="hover:text-amber-800 font-mono font-medium">
                  +91 9590 411117
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Open 7 Days • 12 PM to 11:30 PM</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-stone-200/80 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © 2026 Al Sadiquie Restaurant. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1 text-stone-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-amber-700 fill-amber-700" /> for genuine royal food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
