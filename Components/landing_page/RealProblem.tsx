"use client";

// import { ArrowUpRight } from "lucide-react";

const problems = [
  {
    number: "01",
    title:
      "Watching dozens of tutorials and still not knowing what interviews actually ask.",
  },
  {
    number: "02",
    title:
      "Jumping between random YouTube playlists, half-finished notes, and scattered Drive links.",
  },
  {
    number: "03",
    title:
      "Spending weeks in tutorial hell without solving one proper machine coding problem.",
  },
  {
    number: "04",
    title:
      "Freezing when someone asks you to explain a concept clearly or build under pressure.",
  },
  {
    number: "05",
    title:
      "Feeling lost because there is no path — only noise and endless roadmap posts.",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B0907] py-24 sm:py-28 lg:py-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-[-15%] top-1/3 h-72 w-72 rounded-full bg-[#F6DAA0]/5 blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 xl:gap-28">
          {/* Left */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-[#eec675]" />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[#eec675] sm:text-xs">
                The real problem
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-xl font-mono text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.4rem] xl:text-[4rem]">
              Prep shouldn&apos;t
              <br />
              feel like
              <br />
              <span className="text-amber-400">detective work.</span>
            </h2>

            {/* Description */}
            <p className="mt-7 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">
              You don&apos;t need another 40-hour course. You need to know what
              matters, then actually practice it.
            </p>

            {/* Small indicator */}
            <div className="mt-10 hidden items-center gap-3 lg:flex">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Know the problem
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {problems.map((problem) => (
                <div
                  key={problem.number}
                  className="group relative flex gap-5 py-7 transition-all duration-300 sm:gap-7 sm:py-8 lg:py-9 lg: px-5"
                >
                  {/* Hover Line */}
                  <div className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[#eec675] transition-transform duration-500 group-hover:scale-y-100" />

                  {/* Number */}
                  <div className="w-8 shrink-0 pt-1 sm:w-10">
                    <span className="font-mono text-[10px] font-medium text-[#eec675] sm:text-xs">
                      {problem.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="max-w-2xl text-base leading-7 text-neutral-300 transition-colors duration-300 group-hover:text-white sm:text-lg sm:leading-8 lg:text-xl">
                      {problem.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Label */}
            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                Before PrepNest
              </span>

              <span className="font-mono text-[10px] text-neutral-500">
                05 problems
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
