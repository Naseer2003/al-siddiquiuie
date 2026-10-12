"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, PortionOption } from "./MenuData";

export interface TrayOrderItem {
  id: string; // unique key combining item.id and portion
  dishId: string;
  name: string;
  portionLabel?: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderContextType {
  items: TrayOrderItem[];
  addItem: (item: MenuItem, portion?: PortionOption) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearTray: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  totalAmount: number;
  totalItemsCount: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TrayOrderItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("al_sadique_tray");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("al_sadique_tray", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (item: MenuItem, portion?: PortionOption) => {
    const chosenPrice = portion ? portion.price : item.basePrice;
    const entryId = portion ? `${item.id}-${portion.label}` : item.id;
    const displayName = portion ? `${item.name} (${portion.label})` : item.name;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === entryId);
      if (existing) {
        return prev.map((i) =>
          i.id === entryId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: entryId,
          dishId: item.id,
          name: displayName,
          portionLabel: portion?.label,
          price: chosenPrice,
          image: item.image,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQ = i.quantity + delta;
            return newQ > 0 ? { ...i, quantity: newQ } : null;
          }
          return i;
        })
        .filter(Boolean) as TrayOrderItem[]
    );
  };

  const clearTray = () => setItems([]);

  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearTray,
        isDrawerOpen,
        setIsDrawerOpen,
        isBookingOpen,
        setIsBookingOpen,
        totalAmount,
        totalItemsCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
