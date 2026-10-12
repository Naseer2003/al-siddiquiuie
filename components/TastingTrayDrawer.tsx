"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "./OrderContext";
import { RESTAURANT_INFO } from "./MenuData";
import {
  X,
  Trash2,
  Plus,
  Minus,
  UtensilsCrossed,
  CalendarCheck,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function TastingTrayDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    clearTray,
    totalAmount,
    totalItemsCount,
    setIsBookingOpen,
  } = useOrder();

  const [spiceNotes, setSpiceNotes] = useState("");

  if (!isDrawerOpen) return null;

  const gst = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + gst;

  const handleBookWithOrder = () => {
    setIsDrawerOpen(false);
    setIsBookingOpen(true);
  };

  const handleSendWhatsApp = () => {
    const dishList = items
      .map((i) => `• ${i.name} x ${i.quantity} = ₹${i.price * i.quantity}`)
      .join("\n");
    const notes = spiceNotes ? `\nSpecial Requests: ${spiceNotes}` : "";
    const message = `Salam! I would like to order / reserve dishes at ${RESTAURANT_INFO.name}:\n\n${dishList}\n\nEstimated Total: ₹${grandTotal}${notes}\n\nPickup/Dine-in at: ${RESTAURANT_INFO.address}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encoded}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsDrawerOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#faf8f5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    Your Table Tasting Tray
                  </h2>
                  <p className="text-xs text-stone-500">
                    {totalItemsCount} {totalItemsCount === 1 ? "delicacy" : "delicacies"} selected
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-stone-200/60 text-stone-500 transition-colors cursor-pointer"
                aria-label="Close tray"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-800">
                    Your tray is empty
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Browse our chicken kababs, biriyani, and tandoori grills to curate your feast.
                  </p>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-amber-700 transition-all cursor-pointer"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-stone-100 text-xs">
                    <span className="text-stone-500">Selected Items</span>
                    <button
                      onClick={clearTray}
                      className="text-stone-400 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear all
                    </button>
                  </div>

                  {items.map((orderItem) => (
                    <div
                      key={orderItem.id}
                      className="flex gap-3 bg-stone-50/70 p-3 rounded-2xl border border-stone-200/80 items-center"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-200">
                        <Image
                          src={orderItem.image}
                          alt={orderItem.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                          {orderItem.name}
                        </h4>
                        <div className="text-xs text-stone-500 mt-0.5">
                          ₹{orderItem.price} each
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-white rounded-full border border-stone-200 px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(orderItem.id, -1)}
                              className="text-stone-600 hover:text-black cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center font-mono">
                              {orderItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(orderItem.id, 1)}
                              className="text-stone-600 hover:text-black cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-stone-900 font-mono">
                            ₹{orderItem.price * orderItem.quantity}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(orderItem.id)}
                        className="text-stone-300 hover:text-red-500 transition-colors p-1"
                        title="Remove dish"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Special Prep Notes */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Cooking Notes / Special Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={spiceNotes}
                      onChange={(e) => setSpiceNotes(e.target.value)}
                      placeholder="e.g. Extra mint chutney & onions, mild spice for kids, well grilled..."
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Bill Summary & Actions */}
            {items.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-[#faf8f5] space-y-4">
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Menu Subtotal</span>
                    <span className="font-mono">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="font-mono">₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Estimated Total</span>
                    <span className="font-mono text-base text-amber-800">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={handleBookWithOrder}
                    className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4 text-amber-400" />
                    <span>Reserve Table With This Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full py-3 rounded-full border border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Send Order to WhatsApp ({RESTAURANT_INFO.phone})</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
