"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const points = ["Open access", "No noise", "Real practice"];

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
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const WhyThisExists = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B0907] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          {/* Label */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-7 bg-[#eec675]" />

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[#eec675] sm:text-xs">
              Why this exists
            </span>

            <span className="h-px w-7 bg-[#eec675]" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem]"
          >
            Early interview prep is lonely enough.
            <br className="hidden md:block" />
            <span className="text-amber-400">
              It doesn&apos;t need to be messy too.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-3xl text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8 lg:text-lg"
          >
            Most &quot;help&quot; still asks you to follow, comment, join
            something, and wait for a roadmap that may or may not arrive. This
            site exists to remove that friction. Open it, study, practice, and
            leave when you&apos;re ready.
          </motion.p>

          {/* Points */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-4 lg:mt-10 lg:gap-x-10"
          >
            {points.map((point) => (
              <div key={point} className="group flex items-center gap-3">
                {/* Check */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#eec675]/20 bg-[#eec675]/5 transition-all duration-300 group-hover:border-[#eec675]/50 group-hover:bg-[#eec675]/10">
                  <Check size={14} strokeWidth={2} className="text-[#eec675]" />
                </div>

                {/* Text */}
                <span className="font-mono text-xs text-neutral-400 transition-colors duration-300 group-hover:text-white sm:text-sm">
                  {point}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyThisExists;