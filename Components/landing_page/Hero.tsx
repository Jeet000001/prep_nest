import BackgroundGrid from "@/Components/gradient_background/BackgroundGrid";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CodeDemo } from "./Code_Card";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <BackgroundGrid />
      </div>

      {/* Hero Content */}
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-36 lg:pb-20">
        <div className="flex w-full flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-16">
          {/* Left */}
          <div className="w-full max-w-2xl text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F6DAA0]/20 bg-[#F6DAA0]/5 px-3.5 py-2 backdrop-blur-sm sm:mb-7 sm:px-4">
              <Sparkles
                size={14}
                className="shrink-0 text-[#F6DAA0] sm:h-[15px] sm:w-[15px]"
              />

              <span className="font-mono text-[11px] tracking-wide text-[#F6DAA0] sm:text-xs">
                cleaner way to prepare
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-mono text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              Stop scrolling.
              <br />
              <span className="text-[#F6DAA0]">
                Start preparing.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-neutral-400 sm:mt-7 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg">
              Everything a fresher needs to crack React interviews —
              HTML, CSS, JavaScript, React theory, and machine coding —
              in one clean place.
            </p>

            <p className="mt-2 font-mono text-xs text-neutral-500 sm:text-sm">
              No login. No payment. No waiting for a DM.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:mt-9 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/"
                className="group inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-[#F6DAA0] px-5 font-mono text-xs font-semibold text-[#0B0907] transition-all duration-300 hover:bg-[#F8E1AF] hover:shadow-[0_0_30px_rgba(246,218,160,0.15)] sm:h-12 sm:w-auto sm:max-w-none sm:px-6 sm:text-sm"
              >
                Start Exploring Free Resources

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 sm:h-[18px] sm:w-[18px]"
                />
              </Link>
            </div>

            {/* Trust Text */}
            <div className="mt-6 flex items-center justify-center gap-2 sm:mt-7 lg:justify-start">
              <div className="h-px w-6 shrink-0 bg-[#F6DAA0]/30 sm:w-8" />

              <p className="font-mono text-[10px] text-neutral-500 sm:text-xs">
                Built by someone who faced the same confusion.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex w-full items-center justify-center lg:w-auto lg:justify-end">
            <div className="w-full max-w-[34rem] lg:max-w-[31rem] xl:max-w-[34rem]">
              <CodeDemo
                duration={10000}
                writing
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;