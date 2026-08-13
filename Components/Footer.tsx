"use client";

import { motion } from "framer-motion";

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

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0B0907]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-5 py-8 text-center sm:px-6 lg:px-8"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs text-neutral-500 sm:text-sm"
        >
          Built with{" "}
          <span className="text-[#F6DAA0]">♥</span>{" "}
          and a lot of curiosity by{" "}
          <span className="text-neutral-300">Jeet</span>.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-mono text-[10px] text-neutral-700 sm:text-xs"
        >
          PrepNest · Learn. Practice. Prepare.
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;