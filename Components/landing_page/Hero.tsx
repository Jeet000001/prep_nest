"use client";

import BackgroundGrid from "@/Components/gradient_background/BackgroundGrid";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroCard from "./HeroCard";

// Parent container - orchestrates the stagger timing between children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Each child: blurred + slightly below + invisible -> sharp + in place + visible
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <BackgroundGrid />
      </div>

      {/* Hero Content */}
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-36 lg:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-16"
        >
          {/* Left */}
          <div className="w-full max-w-2xl text-center lg:text-left">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F6DAA0]/20 bg-[#F6DAA0]/5 px-3.5 py-2 backdrop-blur-sm sm:mb-7 sm:px-4"
            >
              <Sparkles
                size={14}
                className="shrink-0 text-[#eec675] sm:h-[15px] sm:w-[15px]"
              />

              <span className="font-mono text-[11px] tracking-wide text-[#eec675] sm:text-xs">
                cleaner way to prepare
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-[2.5rem] text-5xl font-bold leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-8xl"
            >
              Stop scrolling.
              <br />
              <span className="text-amber-400">Start preparing.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-neutral-300 sm:mt-7 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg"
            >
              Everything a fresher needs to crack React interviews — HTML, CSS,
              JavaScript, React theory, and machine coding — in one clean place.
              <br />
              No login. No payment. No waiting for a DM.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-center gap-4 sm:mt-9 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Link
                href="/coding"
                className="group inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 font-heading text-xs font-semibold text-[#0B0907] transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(246,218,160,0.15)] sm:h-12 sm:w-auto sm:max-w-none sm:px-6 sm:text-sm"
              >
                Start Preparing for Machine Coding
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 sm:h-[18px] sm:w-[18px]"
                />
              </Link>
            </motion.div>

            {/* Trust Text */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center justify-center gap-2 sm:mt-7 lg:justify-start"
            >
              <div className="h-px w-6 shrink-0 bg-[#F6DAA0]/30 sm:w-8" />

              <p className="font-mono text-[10px] text-neutral-500 sm:text-xs">
                Built by someone who faced the same confusion.
              </p>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            variants={itemVariants}
            className="relative flex w-full items-center justify-center lg:w-auto lg:justify-end"
          >
            <div className="w-full flex justify-center max-w-[34rem] lg:max-w-[31rem] xl:max-w-[34rem]">
              <HeroCard />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
