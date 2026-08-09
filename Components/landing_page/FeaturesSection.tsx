"use client";

import {
  ArrowUpRight,
  BookOpen,
  Braces,
  Layers3,
  TerminalSquare,
} from "lucide-react";

const features = [
  {
    number: "01",
    category: "FOUNDATIONS",
    title: "HTML, CSS & JavaScript",
    description:
      "The browser fundamentals that still decide whether your React answers make sense.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: Layers3,
  },
  {
    number: "02",
    category: "CONCEPTS",
    title: "React theory notes",
    description:
      "Clear explanations for the concepts interviewers expect you to reason about, not recite.",
    tags: ["React", "Hooks", "Patterns"],
    icon: BookOpen,
  },
  {
    number: "03",
    category: "PRACTICE",
    title: "Machine coding",
    description:
      "Build real features with constraints, edge cases, and the clock quietly judging you.",
    tags: ["UI", "Logic", "Constraints"],
    icon: TerminalSquare,
  },
  {
    number: "04",
    category: "CONFIDENCE",
    title: "Interview-ready thinking",
    description:
      "Practice turning what you know into structured answers and working code.",
    tags: ["Explain", "Build", "Reflect"],
    icon: Braces,
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B0907] py-24 sm:py-28 lg:py-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#F6DAA0]/5 blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-[#F6DAA0]" />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[#eec675] sm:text-xs">
                What this site is
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-3xl font-mono text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              The useful stuff.
              <br className="hidden sm:block" /> In one place.
            </h2>
          </div>

          {/* Header Description */}
          <p className="max-w-sm text-sm leading-6 text-neutral-500 lg:pb-1 lg:text-right">
            No accounts. No gated content.
            <br className="hidden lg:block" />
            No community joining required.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#12100D] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#F6DAA0]/25 hover:bg-[#15120F] sm:min-h-[340px] sm:p-7 lg:p-8"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F6DAA0]/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top Row */}
                <div className="relative flex items-start justify-between">
                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0D0B09] text-[#eec675] transition-all duration-300 group-hover:border-[#F6DAA0]/30">
                    <Icon size={19} strokeWidth={1.6} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative mt-8">
                  {/* Number / Category */}
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#eec675]">
                    {feature.number}
                    <span className="mx-2 ">/</span>
                    {feature.category}
                  </p>

                  {/* Title */}
                  <h3 className="mt-4 font-mono text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500 sm:text-[15px] sm:leading-7">
                    {feature.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="relative mt-auto flex flex-wrap gap-2 pt-8">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-neutral-400 transition-colors duration-300 group-hover:border-[#F6DAA0]/20 group-hover:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
