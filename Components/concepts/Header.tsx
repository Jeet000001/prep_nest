"use client";

import { motion } from "framer-motion";

const AnimatedHeader = ({
  category,
  topic,
}: {
  category: string;
  topic: string;
}) => {
  return (
    <motion.header
      key={`${category}-${topic}`}
      initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-b border-white/10 pb-4"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-400">
        {category}
      </p>
      <h1 className="mt-2 text-2xl font-semibold capitalize text-white">
        {topic.replaceAll("-", " ")}
      </h1>
    </motion.header>
  );
};

export default AnimatedHeader;
