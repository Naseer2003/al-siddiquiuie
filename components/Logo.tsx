"use client";

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "dark" | "gold" | "white";
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className = "",
  variant = "dark",
  size = "md",
}: LogoProps) {
  const isGold = variant === "gold";
  const isWhite = variant === "white";

  const textColor = isGold
    ? "text-[#c5a059]"
    : isWhite
    ? "text-white"
    : "text-[#14171a]";
  const iconColor = isGold ? "#c5a059" : isWhite ? "#ffffff" : "#14171a";
  const subtextColor = isGold
    ? "text-[#a77b28]"
    : isWhite
    ? "text-stone-300"
    : "text-stone-800";

  const scale =
    size === "sm" ? "scale-90 origin-left" : size === "lg" ? "scale-110" : "";

  return (
    <div className={`flex items-center gap-3 select-none ${scale} ${className}`}>
      {/* Cutlery Motif (Spoon, Fork, Knife with curved joining stroke) */}
      <svg
        className="h-10 w-auto shrink-0 transition-transform duration-300 hover:scale-105"
        viewBox="0 0 130 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Spoon */}
        <ellipse cx="22" cy="24" rx="10" ry="14" fill={iconColor} />
        <rect x="20" y="36" width="4" height="34" rx="2" fill={iconColor} />

        {/* Fork */}
        <rect x="44" y="14" width="3" height="18" rx="1.5" fill={iconColor} />
        <rect x="50" y="14" width="3" height="18" rx="1.5" fill={iconColor} />
        <rect x="56" y="14" width="3" height="18" rx="1.5" fill={iconColor} />
        <path
          d="M43 28 C43 36, 57 36, 57 28 L57 35 C57 41, 52 43, 50 43 C48 43, 43 41, 43 35 Z"
          fill={iconColor}
        />
        <rect x="48.5" y="42" width="3.5" height="28" rx="1.75" fill={iconColor} />

        {/* Knife */}
        <path
          d="M74 12 C74 12, 79 16, 79 38 L76.5 38 L76.5 70 C76.5 71, 74 71, 74 70 L74 12 Z"
          fill={iconColor}
        />

        {/* Dynamic sweeping swoosh curve connecting the base of the cutlery */}
        <path
          d="M14 66 C 30 84, 85 86, 118 42"
          stroke={iconColor}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Typography: Al Sadiquie RESTAURANT */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif tracking-tight text-2xl font-bold transition-colors ${textColor}`}
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          Al Sadiquie
        </span>
        <span
          className={`text-[9.5px] uppercase tracking-[0.32em] font-semibold mt-1 ${subtextColor}`}
          style={{ fontFamily: "var(--font-sans), sans-serif" }}
        >
          R E S T A U R A N T
        </span>
      </div>
    </div>
  );
}
