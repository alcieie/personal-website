"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/* A section that floats up the first time it scrolls into view. */
export default function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ type: "spring", stiffness: 70, damping: 18 }}
      className="pb-28"
    >
      <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">{title}</h2>
        {note && <p className="font-serif text-2xl text-plum italic">{note}</p>}
      </div>
      {children}
    </motion.section>
  );
}
