"use client";

import Link from "next/link";
import { ArrowRight, Code2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

import DotBackground from "../gradient_background/DotBackground";

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

const Cta = () => {
  return (
    <section className="w-full bg-[#0c0907] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-[1088px]">
        <div className="relative overflow-hidden rounded-[28px] border border-[#302b24] bg-[#12100d]">
          {/* Dotted interactive background */}
          <DotBackground />

          {/* Subtle inner gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,190,70,0.035),transparent_35%)]" />

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className=" relative z-10 px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-16 lg:py-16"
          >
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#e8aa3d] sm:text-[11px]"
            >
              NO MORE WAITING
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="max-w-[700px] text-[38px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#f4efe7] sm:text-[48px] md:text-[56px] lg:text-[60px]"
            >
              Ready when you are.
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[620px] text-[15px] leading-7 text-[#a79e92] sm:text-[16px]"
            >
              No signup. No payment. No waiting for a DM.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              {/* Primary */}
              <Link
                href="/concepts"
                className=" group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#efb54d] px-6 text-[13px] font-semibold text-[#17120a] transition-all duration-200 hover:bg-[#f5c363] active:scale-[0.98]"
              >
                <span>Browse All Topics</span>

                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className=" transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary */}
              <Link
                href="/coding"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#332e27] bg-transparent px-6 text-[13px] font-semibold text-[#eee9e1] transition-all duration-200 hover:border-[#51493d] hover:bg-[#1a1713] active:scale-[0.98]"
              >
                <Code2 size={15} />

                <span>Jump to Machine Coding</span>
              </Link>

              {/* Third */}
              <Link
                href="/mock-tests"
                className=" inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#332e27] bg-transparent px-6 text-[13px] font-semibold text-[#eee9e1] transition-all duration-200 hover:border-[#51493d] hover:bg-[#1a1713] active:scale-[0.98]"
              >
                <BookOpen size={15} />

                <span>Start Mock Tests</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cta;