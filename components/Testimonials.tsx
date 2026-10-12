"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Dr. Farooq Qureshi",
    role: "Culinary Historian & Frequent Diner",
    rating: 5,
    quote:
      "Al Sadiquie’s Zafrani Mutton Dum Biryani is arguably the most authentic rendition in the entire region. The basmati grains remain distinct, yet fully imbued with marrow and saffron. The fluted gold interior makes you feel like royalty.",
    dish: "Zafrani Mutton Dum Biryani",
    date: "Dining regular since 2017",
  },
  {
    id: 2,
    name: "Ayesha & Tariq Siddiqui",
    role: "Family Gathering Hosts",
    rating: 5,
    quote:
      "We hosted our parents’ 40th anniversary in the Private Majlis. The staff attended to every little detail with such grace. The Murgh Malai Tikka melted instantly, and the cheese Kunafa was warm, crisp, and heavenly.",
    dish: "Royal Murgh Malai Tikka & Kunafa",
    date: "Visited October 2026",
  },
  {
    id: 3,
    name: "Chef Vikramaditya Roy",
    role: "Gastronomy Reviewer",
    rating: 5,
    quote:
      "Finding Dal Bukhara slow-simmered for 18 continuous hours alongside charcoal-seared Seekh Kebabs done with such restraint is rare. A masterclass in Awadhi and Mughal culinary balance. The white marble ambience is clean, bright, and stunning.",
    dish: "Dal Bukhara Royale & Seekh Kebabs",
    date: "Food Columnist Review",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1));

  const review = REVIEWS[current];

  return (
    <section id="reviews" className="py-24 bg-[#faf8f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            <span>4.9 / 5.0 Star Acclaim</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Words from Our <span className="gold-gradient-text">Cherished Guests</span>
          </h2>
          <p className="mt-3 text-stone-600 text-base">
            Every dining experience at Al Sadiquie is crafted to create memories of warmth and flavor.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-xl relative">
          <div className="absolute top-8 right-8 text-amber-100">
            <Quote className="w-16 h-16 sm:w-24 sm:h-24 opacity-60" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="relative z-10"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-500 text-amber-500"
                  />
                ))}
                <span className="ml-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Diner
                </span>
              </div>

              {/* Quote */}
              <p
                className="font-serif text-lg sm:text-2xl text-stone-800 leading-relaxed italic mb-8"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Guest Info & Dish Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-stone-100">
                <div>
                  <h4 className="font-semibold text-base text-stone-900">
                    {review.name}
                  </h4>
                  <p className="text-xs text-stone-500">{review.role} • {review.date}</p>
                </div>

                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/70 px-3.5 py-1.5 rounded-full text-xs font-medium text-amber-900 self-start sm:self-auto">
                  <span>Favorite Dish:</span>
                  <strong>{review.dish}</strong>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-stone-100">
            <div className="flex gap-1.5">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    current === idx ? "w-8 bg-amber-600" : "w-2 bg-stone-200 hover:bg-stone-300"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="p-2.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
