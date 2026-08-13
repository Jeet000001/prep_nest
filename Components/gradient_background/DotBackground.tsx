"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const DOT_GAP = 40;
const DOT_SIZE = 2;

const WAVE_RADIUS = 180;
const WAVE_STRENGTH = 18;

// Same entrance timing/curve used in the Hero section
const containerVariants = {
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

const DotBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({
    x: -1000,
    y: -1000,
  });

  const animationFrame = useRef<number | null>(null);

  const [grid, setGrid] = useState({
    columns: 0,
    rows: 0,
  });

  // --------------------------------
  // Calculate dots according to component
  // --------------------------------

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateGrid = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      setGrid({
        columns: Math.ceil(width / DOT_GAP) + 1,
        rows: Math.ceil(height / DOT_GAP) + 1,
      });
    };

    updateGrid();

    const observer = new ResizeObserver(updateGrid);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // --------------------------------
  // Mouse + Wave animation
  // --------------------------------

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current;

      if (!container) return;

      const rect = container.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      // Mouse component ke andar hai ya nahi
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      } else {
        mouse.current.x = -1000;
        mouse.current.y = -1000;
      }
    };

    const animate = () => {
      const container = containerRef.current;

      if (!container) return;

      const dots = container.querySelectorAll<HTMLDivElement>("[data-dot]");

      const mouseX = mouse.current.x;
      const mouseY = mouse.current.y;

      dots.forEach((dot) => {
        const dotX = Number(dot.dataset.x);

        const dotY = Number(dot.dataset.y);

        const dx = dotX - mouseX;

        const dy = dotY - mouseY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < WAVE_RADIUS) {
          // 0 -> far
          // 1 -> mouse ke bilkul paas
          const strength = 1 - distance / WAVE_RADIUS;

          // Smooth wave falloff
          const smoothStrength = strength * strength;

          const moveX = (dx / (distance || 1)) * smoothStrength * WAVE_STRENGTH;

          const moveY = (dy / (distance || 1)) * smoothStrength * WAVE_STRENGTH;

          dot.style.transform = `
            translate3d(
              ${moveX}px,
              ${moveY}px,
              0
            )
          `;

          dot.style.opacity = String(0.25 + smoothStrength * 0.75);

          // Slightly increase size near mouse
          const scale = 1 + smoothStrength * 1.5;

          dot.style.scale = String(scale);
        } else {
          dot.style.transform = "translate3d(0, 0, 0)";

          dot.style.opacity = "0.25";

          dot.style.scale = "1";
        }
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className="absolute inset-0"
        style={{
          display: "grid",

          gridTemplateColumns: `repeat(
            ${grid.columns},
            ${DOT_GAP}px
          )`,

          gridTemplateRows: `repeat(
            ${grid.rows},
            ${DOT_GAP}px
          )`,
        }}
      >
        {Array.from({
          length: grid.columns * grid.rows,
        }).map((_, index) => {
          const column = index % grid.columns;

          const row = Math.floor(index / grid.columns);

          const x = column * DOT_GAP + DOT_GAP / 2;

          const y = row * DOT_GAP + DOT_GAP / 2;

          return (
            <div
              key={index}
              data-dot
              data-x={x}
              data-y={y}
              className="
                rounded-full
                bg-[#d8c9ae]
              "
              style={{
                width: `${DOT_SIZE}px`,
                height: `${DOT_SIZE}px`,

                margin: "auto",

                opacity: 0.25,

                transform: "translate3d(0, 0, 0)",

                transition:
                  "transform 100ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms ease, scale 150ms ease",

                willChange: "transform, opacity, scale",
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default DotBackground;