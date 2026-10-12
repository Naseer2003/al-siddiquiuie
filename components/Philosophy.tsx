"use client";

import React from "react";
import Image from "next/image";
import {
  Flame,
  Clock,
  Sparkles,
  Heart,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";

const CRAFT_PILLARS = [
  {
    step: "01",
    title: "Sealed Clay Dum",
    subtitle: "Purda-e-Handi",
    icon: Flame,
    image: "/images/biryani.jpg",
    highlight: "6-Hour Coal Embers",
    description:
      "Handis sealed airtight with whole-wheat dough. Gentle steam circulates saffron, star anise, and marrow deep into aged basmati with zero moisture loss.",
    metric: "6 Hours",
    metricLabel: "Slow Dum Simmer",
  },
  {
    step: "02",
    title: "Pampore Saffron & Spices",
    subtitle: "Zafran-o-Masala",
    icon: Sparkles,
    image: "/images/curry.jpg",
    highlight: "Stone-Ground Mortars",
    description:
      "Grade-A Kashmiri saffron steeped in milk. 24 whole spices hand-pounded in traditional stone sil-batta to protect delicate volatile aromatics from heat.",
    metric: "24 Spices",
    metricLabel: "Proprietary Blend",
  },
  {
    step: "03",
    title: "Live Babul Charcoal",
    subtitle: "Angaar-e-Sigri",
    icon: Clock,
    image: "/images/kebabs.jpg",
    highlight: "White-Ash Radiance",
    description:
      "Fierce dry radiant heat sears the yogurt marinade into a caramelized crust, keeping the center velvety. Seasoned babul hardwood delivers subtle woodsmoke.",
    metric: "800°F",
    metricLabel: "Tandoor Radiance",
  },
  {
    step: "04",
    title: "Mehmaan-Nawaazi",
    subtitle: "Royal Hospitality",
    icon: Heart,
    image: "/images/ambience.jpg",
    highlight: "Heritage Feasts",
    description:
      "Feeding guests is a sacred covenant. Spacious round marble tables overlooking Coles Park, generous feast platters, and authentic Awadhi table grace.",
    metric: "100%",
    metricLabel: "Halal Certified",
  },
];

const PURITY_BADGES = [
  { title: "100% Halal Certified", icon: ShieldCheck },
  { title: "Zero Synthetic Colors", icon: Award },
  { title: "Pure Desi Ghee", icon: Flame },
  { title: "No Commercial Pastes", icon: CheckCircle2 },
];

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="py-10 md:py-14 bg-[#12100e] text-stone-100 relative overflow-hidden"
    >
      {/* Background fluted gold accents */}
      <div className="absolute top-0 right-0 w-24 h-full fluted-gold-panel opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 left-0 w-24 h-full fluted-gold-panel opacity-[0.04] pointer-events-none" />

      {/* Subtle ambient warm glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-600/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Compact Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Culinary Manifesto</span>
          </div>

          <h2
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            The Sacred Craft of{" "}
            <span className="gold-gradient-text">Slow Perfection</span>
          </h2>

          <p className="mt-1.5 text-stone-400 text-xs sm:text-sm leading-relaxed">
            Honoring the patient, labor-intensive artistry of authentic Awadhi Dum cooking and live charcoal embers.
          </p>
        </div>

        {/* ── 4 Pillars Editorial Grid (Always 100% Visible, No Animation Blocking) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-5">
          {CRAFT_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.step}
                className="bg-[#181512] rounded-2xl p-4 border border-stone-800/90 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:bg-[#1c1814]"
              >
                <div>
                  {/* Photo preview with dark vignette */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-stone-800/80 bg-stone-900">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14120f] via-stone-950/20 to-transparent" />

                    {/* Step badge */}
                    <div className="absolute top-2 left-2 bg-stone-900/90 text-[10px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      {pillar.step}
                    </div>

                    {/* Highlight pill */}
                    <div className="absolute bottom-2 left-2 text-[10px] font-semibold text-amber-200/90 bg-stone-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      {pillar.highlight}
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <h3
                    className="font-serif text-base sm:text-lg font-bold text-white mb-1.5 leading-tight group-hover:text-amber-200 transition-colors"
                    style={{ fontFamily: "var(--font-serif, serif)" }}
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Metric pill */}
                <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-amber-400">{pillar.metric}</span>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">{pillar.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Compact Combined Footer: Purity Badges + Chef Quote ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center bg-[#171411] rounded-2xl border border-amber-500/25 p-3.5 sm:p-5 shadow-xl">
          {/* Purity badges (left) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2">
            {PURITY_BADGES.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-stone-900/60 border border-stone-800/80 text-xs font-semibold text-stone-200"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{b.title}</span>
                </div>
              );
            })}
          </div>

          {/* Divider on desktop */}
          <div className="hidden lg:block lg:col-span-1 text-center text-amber-500/30">
            <span className="text-sm">✦</span>
          </div>

          {/* Compact Chef Quote (right) */}
          <div className="lg:col-span-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-400/40 flex items-center justify-center font-serif text-amber-300 font-bold text-xs shrink-0">
              AS
            </div>
            <div>
              <blockquote
                className="font-serif text-xs sm:text-sm text-stone-200 italic leading-snug"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                &ldquo;We do not merely cook biryani; we invite our guests into a heritage where every fragrant spoonful tells a tale of courts and patience.&rdquo;
              </blockquote>
              <p className="text-[10px] text-amber-400/80 font-medium mt-0.5">
                Chef Sadiquie Al-Hussaini · Master Blender
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
