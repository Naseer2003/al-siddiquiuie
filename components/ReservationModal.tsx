"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "./OrderContext";
import {
  X,
  CalendarCheck,
  Users,
  Clock,
  Sparkles,
  CheckCircle,
  MapPin,
  UtensilsCrossed,
  Phone,
  User,
  PartyPopper,
} from "lucide-react";

const TIME_SLOTS = [
  "12:30 PM",
  "01:30 PM",
  "02:30 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
];

const SEATING_AREAS = [
  { id: "gold-lounge", label: "Fluted Gold Lounge", note: "Signature venue ambience" },
  { id: "marble-hall", label: "Grand Marble Hall", note: "Central airy dining" },
  { id: "family-majlis", label: "Private Family Majlis", note: "Secluded & intimate" },
  { id: "vip-table", label: "Chef's Table VIP", note: "View of tandoor theater" },
];

export default function ReservationModal() {
  const { isBookingOpen, setIsBookingOpen, items, totalAmount, clearTray } =
    useOrder();

  const [date, setDate] = useState("2026-10-15");
  const [time, setTime] = useState("08:00 PM");

  React.useEffect(() => {
    try {
      const today = new Date();
      setDate(today.toISOString().split("T")[0]);
    } catch {
      // ignore
    }
  }, []);
  const [guests, setGuests] = useState(4);
  const [seating, setSeating] = useState("gold-lounge");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("Casual Fine Dining");
  const [notes, setNotes] = useState("");

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  if (!isBookingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    const code = "ALSAD-" + Math.floor(1000 + Math.random() * 9000);
    setReservationCode(code);
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setIsConfirmed(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 overflow-hidden"
        >
          {/* Top Decorative Gold Fluting Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 fluted-gold-panel" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isConfirmed ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <span className="text-amber-800 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Regal Hospitality
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Reserve Your Royal Table
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Experience Al Sadiquie&apos;s authentic flavours and serene ambience.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guest Count & Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Dining Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
                    >
                      <option>Casual Fine Dining</option>
                      <option>Family Celebration</option>
                      <option>Birthday Milestone</option>
                      <option>Wedding Anniversary</option>
                      <option>Corporate Business Dinner</option>
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Select Ambience Enclave
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SEATING_AREAS.map((area) => (
                      <button
                        type="button"
                        key={area.id}
                        onClick={() => setSeating(area.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                          seating === area.id
                            ? "border-amber-600 bg-amber-50/60 font-semibold text-stone-900"
                            : "border-stone-200 hover:border-stone-300 text-stone-600 bg-white"
                        }`}
                      >
                        <div className="font-medium text-stone-900">
                          {area.label}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          {area.note}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attached Pre-Order Info if any */}
                {items.length > 0 && (
                  <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-stone-800">
                      <UtensilsCrossed className="w-4 h-4 text-amber-700" />
                      <span>
                        <strong>{items.length} dishes</strong> pre-selected from your tasting tray
                      </span>
                    </div>
                    <span className="font-mono font-bold text-amber-900">
                      ₹{totalAmount}
                    </span>
                  </div>
                )}

                {/* Guest Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Syed Al-Rahman"
                        className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Wishes / Dietary Requirements
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. High chair for toddler, corner table requested..."
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-stone-900/10 transition-all cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4 text-amber-400" />
                    <span>Confirm Royal Reservation</span>
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2">
                    Instant confirmation • No cancellation charges • Valet parking included
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation View */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                <CheckCircle className="w-9 h-9" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                <PartyPopper className="w-3.5 h-3.5" />
                Table Reserved Successfully!
              </span>

              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Ahlan Wa Sahlan, {name}
              </h3>

              <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto">
                Your royal table at Al Sadiquie Restaurant has been reserved.
                A confirmation SMS with direction link has been sent to{" "}
                <strong className="text-stone-900">{phone}</strong>.
              </p>

              {/* Booking Pass Card */}
              <div className="mt-6 bg-[#faf8f5] border border-amber-200/80 rounded-2xl p-4 text-left max-w-sm mx-auto shadow-sm">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 mb-3">
                  <span className="text-xs text-stone-500">Booking Pass</span>
                  <span className="font-mono text-xs font-bold text-amber-800">
                    {reservationCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Date & Time</span>
                    <strong>{date} at {time}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Guests</span>
                    <strong>{guests} Persons</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Enclave</span>
                    <strong>{SEATING_AREAS.find((a) => a.id === seating)?.label}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Occasion</span>
                    <strong>{occasion}</strong>
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] text-stone-600">
                    <strong>Pre-ordered:</strong> {items.length} items (₹{totalAmount})
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
