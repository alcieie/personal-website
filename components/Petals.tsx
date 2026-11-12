"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// click any empty spot and a few cherry blossom petals drift down
// colours live in globals.css so they follow the day/night theme
const COLOURS = ["var(--petal-1)", "var(--petal-2)", "var(--petal-3)", "var(--petal-4)"];
const MAX = 40;
// clicks on these belong to something else (links, buttons, dragging hobbies, the video)
const IGNORE = "a, button, input, textarea, video, [role=dialog], .draggable";

type Petal = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  fall: number;
  spin: number;
  duration: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function Petals() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || reduce.matches) return;
      if ((e.target as Element).closest?.(IGNORE)) return;

      const burst = Array.from({ length: 5 + Math.floor(Math.random() * 3) }, () => ({
        id: nextId.current++,
        x: e.clientX,
        y: e.clientY,
        size: rand(8, 14),
        color: COLOURS[Math.floor(Math.random() * COLOURS.length)],
        dx: rand(-60, 60),
        fall: rand(150, 250),
        spin: rand(-220, 220),
        duration: rand(1.4, 2),
      }));
      setPetals((cur) => [...cur, ...burst].slice(-MAX));
    };

    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const remove = (id: number) => setPetals((cur) => cur.filter((p) => p.id !== id));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {petals.map((p) => (
        <motion.svg
          key={p.id}
          width={p.size}
          height={p.size}
          viewBox="0 0 10 10"
          className="absolute"
          style={{ left: p.x - p.size / 2, top: p.y - p.size / 2 }}
          initial={{ x: 0, y: 0, rotate: rand(0, 360), opacity: 1, scale: 0.6 }}
          animate={{
            // pop outward a little, then sway side to side on the way down
            x: [0, p.dx * 0.6, p.dx * 0.6 + 14, p.dx * 0.6 - 10, p.dx],
            y: [0, -18, p.fall * 0.35, p.fall * 0.7, p.fall],
            rotate: p.spin,
            opacity: [1, 1, 1, 0.8, 0],
            scale: 1,
          }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          onAnimationComplete={() => remove(p.id)}
        >
          <path d="M5 0.5C7.8 2 8.6 6 5 9.5 1.4 6 2.2 2 5 0.5Z" style={{ fill: p.color }} />
          <path d="M5 2.5v5" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.6" strokeLinecap="round" />
        </motion.svg>
      ))}
    </div>
  );
}
