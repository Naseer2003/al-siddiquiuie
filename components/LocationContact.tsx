"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Car,
  Navigation,
  MessageCircle,
  CalendarCheck,
  CheckCircle,
} from "lucide-react";
import { useOrder } from "./OrderContext";

export default function LocationContact() {
  const { setIsBookingOpen } = useOrder();

  const schedule = [
    { day: "Monday – Thursday", lunch: "12:00 PM – 03:30 PM", dinner: "07:00 PM – 11:00 PM" },
    { day: "Friday", lunch: "01:30 PM – 04:00 PM", dinner: "07:00 PM – 11:30 PM" },
    { day: "Saturday – Sunday", lunch: "12:00 PM – 04:00 PM", dinner: "07:00 PM – 11:30 PM" },
  ];

  return (
    <section id="location" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Finding Al Sadiquie</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Visit Our <span className="gold-gradient-text">Sanctuary</span>
          </h2>
          <p className="mt-3 text-stone-600 text-base">
            Conveniently situated with dedicated valet parking and spacious private family suites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Operating Hours & Contact Details */}
          <div className="lg:col-span-6 bg-[#faf8f5] p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-sm space-y-8">
            
            {/* Opening Hours Table */}
            <div>
              <div className="flex items-center gap-2.5 mb-4 text-stone-900 font-serif text-xl font-bold">
                <Clock className="w-5 h-5 text-amber-700" />
                <span>Service &amp; Dining Hours</span>
              </div>

              <div className="space-y-3">
                {schedule.map((item) => (
                  <div
                    key={item.day}
                    className="bg-white p-3.5 rounded-2xl border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1"
                  >
                    <span className="font-semibold text-stone-800">
                      {item.day}
                    </span>
                    <div className="text-stone-500 font-mono">
                      <span>{item.lunch}</span>
                      <span className="mx-2 text-stone-300">|</span>
                      <span className="text-amber-800 font-medium">{item.dinner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:+919590411117"
                className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-amber-400 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 group-hover:bg-amber-600 group-hover:text-white text-amber-800 flex items-center justify-center transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                    Direct Order &amp; Table Line
                  </span>
                  <span className="text-xs font-bold text-stone-900 font-mono">
                    +91 9590 411117
                  </span>
                </div>
              </a>

              <a
                href="https://wa.me/919590411117"
                target="_blank"
                rel="noreferrer"
                className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-emerald-400 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white text-emerald-800 flex items-center justify-center transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                    WhatsApp Concierge
                  </span>
                  <span className="text-xs font-bold text-stone-900 font-mono">
                    Chat (+91 9590 411117)
                  </span>
                </div>
              </a>
            </div>

            {/* Valet Notice */}
            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-900">
              <Car className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                <strong>Opposite Coles Park:</strong> Easy parking and pick-up access at St. John&apos;s Church Road, Bangalore.
              </span>
            </div>

            {/* Book Table Button */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-4 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              <span>Reserve a Table Online</span>
            </button>
          </div>

          {/* Right: Address & Interactive Map Card */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2 text-stone-900 font-serif text-xl font-bold">
                <MapPin className="w-5 h-5 text-amber-700" />
                <span>Prime Bangalore Location</span>
              </div>
              <p className="text-sm text-stone-800 font-semibold leading-relaxed">
                60, Abu Plaza, St. John&apos;s Church Road, opp. Coles Park, Bangalore - 560001
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Centrally located near Frazer Town &amp; Cleveland Town, right opposite Coles Park.
              </p>
            </div>

            {/* Styled Map Representation */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center">
              {/* Map Graphic Mock */}
              <div className="absolute inset-0 bg-[#f4f1ea] opacity-80" />
              
              {/* Grid Roads simulation */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-30">
                <div className="h-4 bg-stone-300 w-full rounded" />
                <div className="h-6 bg-amber-200 w-full rounded" />
                <div className="h-4 bg-stone-300 w-full rounded" />
              </div>
              <div className="absolute inset-0 flex justify-between p-6 opacity-30">
                <div className="w-4 bg-stone-300 h-full rounded" />
                <div className="w-6 bg-amber-200 h-full rounded" />
                <div className="w-4 bg-stone-300 h-full rounded" />
              </div>

              {/* Pin Center */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-stone-900 text-amber-400 shadow-2xl flex items-center justify-center animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="mt-2 bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-amber-300 text-xs font-bold text-stone-900">
                  Al Sadiquie Restaurant
                </div>
                <span className="text-[10px] text-stone-500 bg-white/90 px-2 rounded-full mt-1">
                  Valet Available at Entry
                </span>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-stone-600" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-full border border-stone-200 hover:border-amber-400 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
