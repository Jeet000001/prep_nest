"use client";

import { motion } from "framer-motion";

type CodingTopicHeaderProps = {
  title: string;
  description: string;
};

export default function CodingTopicHeader({
  title,
  description,
}: CodingTopicHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-b border-white/10 pb-4"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-400">
        Coding
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-white">{title}</h1>
      <p className="mt-1 text-sm text-neutral-400">{description}</p>
    </motion.header>
  );
}
