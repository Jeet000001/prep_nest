"use client";

import { motion } from "framer-motion";

const BackgroundGrid = () => {
  return (
    <motion.div
      className="absolute inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0.15, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Desktop */}
      <svg
        className="absolute inset-0 hidden h-full w-full md:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dashed-grid-desktop"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="rgb(248, 225, 175)"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
          </pattern>

          <radialGradient id="gridFadeDesktop" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="45%" stopColor="white" stopOpacity=".20" />
            <stop offset="70%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="fade-mask-desktop">
            <rect
              width="100%"
              height="100%"
              fill="url(#gridFadeDesktop)"
            />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#dashed-grid-desktop)"
          mask="url(#fade-mask-desktop)"
        />
      </svg>

      {/* Mobile */}
      <svg
        className="absolute inset-0 h-full w-full md:hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Smaller squares */}
          <pattern
            id="dashed-grid-mobile"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0V28"
              fill="none"
              stroke="rgba(255,255,255,0.20)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </pattern>

          {/* More visible on mobile */}
          <radialGradient id="gridFadeMobile" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="45%" stopColor="white" stopOpacity=".22" />
            <stop offset="75%" stopColor="white" stopOpacity=".06" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="fade-mask-mobile">
            <rect
              width="100%"
              height="100%"
              fill="url(#gridFadeMobile)"
            />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#dashed-grid-mobile)"
          mask="url(#fade-mask-mobile)"
        />
      </svg>
    </motion.div>
  );
};

export default BackgroundGrid;