"use client";

import { useEffect, useRef, useState } from "react";

interface DotBackgroundProps {
  gap?: number;
  radius?: number;
  strength?: number;
  dotSize?: number;
}

const DotBackground = ({
  gap = 42,
  radius = 180,
  strength = 18,
  dotSize = 2,
}: DotBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
  });

  const animationRef = useRef<number | null>(null);

  const [grid, setGrid] = useState({
    columns: 0,
    rows: 0,
  });

  // Create dots according to component size
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateGrid = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      setGrid({
        columns: Math.ceil(width / gap) + 1,
        rows: Math.ceil(height / gap) + 1,
      });
    };

    updateGrid();

    const resizeObserver = new ResizeObserver(
      updateGrid
    );

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [gap]);

  // Mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current;

      if (!container) return;

      const rect =
        container.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const isInside =
        x >= 0 &&
        x <= rect.width &&
        y >= 0 &&
        y <= rect.height;

      if (isInside) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
      } else {
        mouseRef.current.x = -1000;
        mouseRef.current.y = -1000;
      }
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  // Wave + glow animation
  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;

      if (!container) return;

      const dots =
        container.querySelectorAll<HTMLElement>(
          "[data-dot]"
        );

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      let closestDot: HTMLElement | null = null;
      let closestDistance = Infinity;

      // Find closest dot
      dots.forEach((dot) => {
        const dotX = Number(dot.dataset.x);
        const dotY = Number(dot.dataset.y);

        const dx = dotX - mouseX;
        const dy = dotY - mouseY;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestDot = dot;
        }
      });

      dots.forEach((dot) => {
        const dotX = Number(dot.dataset.x);
        const dotY = Number(dot.dataset.y);

        const dx = dotX - mouseX;
        const dy = dotY - mouseY;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance < radius) {
          const force =
            1 - distance / radius;

          const smoothForce =
            force * force;

          // Push dot away from cursor
          const moveX =
            (dx / (distance || 1)) *
            smoothForce *
            strength;

          const moveY =
            (dy / (distance || 1)) *
            smoothForce *
            strength;

          dot.style.transform = `
            translate3d(
              ${moveX}px,
              ${moveY}px,
              0
            )
          `;

          dot.style.opacity = String(
            0.18 + smoothForce * 0.65
          );
        } else {
          dot.style.transform =
            "translate3d(0, 0, 0)";

          dot.style.opacity = "0.18";
        }

        // Reset glow
        dot.style.boxShadow = "none";
      });

      // Glow the closest dot
      if (
        closestDot &&
        closestDistance < 35
      ) {
        closestDot.style.opacity = "1";

        closestDot.style.boxShadow = `
          0 0 5px rgba(239, 181, 77, 0.9),
          0 0 12px rgba(239, 181, 77, 0.6),
          0 0 22px rgba(239, 181, 77, 0.35)
        `;
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [radius, strength]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
    >
      <div
        className="absolute inset-0"
        style={{
          display: "grid",

          gridTemplateColumns: `repeat(
            ${grid.columns},
            ${gap}px
          )`,

          gridTemplateRows: `repeat(
            ${grid.rows},
            ${gap}px
          )`,
        }}
      >
        {Array.from({
          length:
            grid.columns * grid.rows,
        }).map((_, index) => {
          const column =
            index % grid.columns;

          const row =
            Math.floor(
              index / grid.columns
            );

          const x =
            column * gap + gap / 2;

          const y =
            row * gap + gap / 2;

          return (
            <span
              key={index}
              data-dot
              data-x={x}
              data-y={y}
              className="rounded-full bg-[#d8c9ae]"
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,

                margin: "auto",

                opacity: 0.18,

                willChange:
                  "transform, opacity, box-shadow",

                transition:
                  "transform 100ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms ease, box-shadow 150ms ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DotBackground;