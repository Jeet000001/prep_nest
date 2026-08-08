import BackgroundGrid from "@/Components/gradient_background/BackgroundGrid";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CodeDemo } from "./Code_Card";

const Hero = () => {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0B0907]">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <BackgroundGrid />
      </div>

      {/* Hero Content */}
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 pb-16 lg:px-8 lg:pt-32">
        <div className="flex flex-col w-full items-center gap-16 lg:flex-row lg:justify-between lg:gap-12">
          
          {/* Left */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#F6DAA0]/20 bg-[#F6DAA0]/5 px-4 py-2 backdrop-blur-sm">
              <Sparkles
                size={15}
                className="text-[#F6DAA0]"
              />

              <span className="font-mono text-xs tracking-wide text-[#F6DAA0]">
                cleaner way to prepare
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-mono text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Stop scrolling.
              <br />
              <span className="text-[#F6DAA0]">
                Start preparing.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
              Everything a fresher needs to crack React interviews —
              HTML, CSS, JavaScript, React theory, and machine coding —
              in one clean place.
            </p>

            <p className="mt-2 font-mono text-sm text-neutral-500">
              No login. No payment. No waiting for a DM.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#F6DAA0] px-6 font-mono text-sm font-semibold text-[#0B0907] transition-all duration-300 hover:bg-[#F8E1AF] hover:shadow-[0_0_30px_rgba(246,218,160,0.15)]"
              >
                Start Exploring Free Resources

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Trust Text */}
            <div className="mt-7 flex items-center gap-2">
              <div className="h-px w-8 bg-[#F6DAA0]/30" />

              <p className="font-mono text-xs text-neutral-500">
                Built by someone who faced the same confusion.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-xl">
              <CodeDemo duration={10000} writing />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;