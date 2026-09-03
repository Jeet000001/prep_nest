"use client";

import {
  ArrowRight,
  Check,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

const preparationSteps = [
  {
    number: "01",
    title: "Foundations",
    description: "HTML · CSS · JavaScript · React theory",
    icon: Layers3,
    status: "Start here",
  },
  {
    number: "02",
    title: "Machine Coding",
    description: "UI · Logic · Edge cases",
    icon: Code2,
    status: "Practice",
  },
];

const HeroCard = () => {
  return (
    <div className="relative w-full max-w-[34rem]">
      {/* Floating Glow */}
      <div className="pointer-events-none absolute inset-x-8 top-1/2 h-[75%] -translate-y-1/2 rounded-full bg-[#F6DAA0]/10 blur-[70px] animate-hero-float" />

      {/* Floating Card */}
      <div className="relative animate-hero-float">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#11100D] shadow-2xl shadow-black/20">
          {/* Top Accent */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F6DAA0]/50 to-transparent" />

          <div className="p-5 sm:p-6 lg:p-7">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#F6DAA0]/20 bg-[#F6DAA0]/5">
                    <Sparkles size={15} className="text-[#eec675]" />
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#eec675]">
                    PrepNest Path
                  </span>
                </div>

                <h3 className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  From confused to ready.
                </h3>

                <p className="mt-2 text-mono max-w-sm text-xs leading-5 text-neutral-500 sm:text-sm">
                  A simple path to prepare for frontend interviews without
                  jumping between random resources.
                </p>
              </div>

              <div className="hidden rounded-full border border-white/20 px-3 py-1.5 sm:flex items-center gap-1.5">
                <span className="font-mono text-[9px] text-[#eec675]">
                  FREE
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="mt-6">
              {preparationSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === 0;

                return (
                  <div key={step.number} className="group relative flex gap-4">
                    {/* Timeline */}
                    {index !== preparationSteps.length - 1 && (
                      <div className="absolute left-[17px] top-10 h-[calc(100%-10px)] w-px bg-white/10" />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "border-[#F6DAA0]/40 bg-[#F6DAA0]/10 text-[#eec675]"
                          : "border-white/10 bg-[#0D0B09] text-neutral-600 group-hover:border-white/20 group-hover:text-neutral-400"
                      }`}
                    >
                      <Icon size={15} strokeWidth={1.7} />
                    </div>

                    {/* Content */}
                    <div className="flex min-w-0 flex-1 items-start justify-between pb-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-sm font-medium ${
                              isActive ? "text-white" : "text-neutral-300"
                            }`}
                          >
                            {step.title}
                          </span>

                          {isActive && (
                            <span className="rounded-full bg-[#F6DAA0]/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#eec675]">
                              Start
                            </span>
                          )}
                        </div>

                        <p className="mt-1 font-mono text-[10px] text-neutral-500 sm:text-xs">
                          {step.description}
                        </p>
                      </div>

                      <span className="hidden font-mono text-[9px] text-neutral-500 sm:block">
                        {step.number}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Card */}
            <div className="mt-1 rounded-2xl border border-white/10 bg-[#0D0B09] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6DAA0]/10">
                  <Check size={15} className="text-[#eec675]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs font-medium text-neutral-300">
                    No more random preparation.
                  </p>

                  <p className="mt-0.5 text-[10px] text-neutral-500">
                    Learn what matters. Practice what gets asked.
                  </p>
                </div>

                <ArrowRight size={16} className="shrink-0 text-neutral-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
