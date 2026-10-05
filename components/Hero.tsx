"use client";

import { motion } from "motion/react";
import { site } from "@/data/content";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
} as const;

export default function Hero() {
  return (
    <section id="top" className="grid min-h-[78vh] items-center gap-12 pt-10 pb-24 md:grid-cols-[1.3fr_.7fr]">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
        <motion.div variants={rise} className="mb-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-glass px-3.5 py-1.5 text-sm backdrop-blur">
            <span className="breathe size-2 rounded-full bg-coral" />
            {site.status}
          </span>
          <span className="rounded-full bg-plum/12 px-3.5 py-1.5 text-sm text-ink">{site.chip}</span>
        </motion.div>

        <motion.h1
          variants={rise}
          className="font-display text-[clamp(3rem,9vw,5.5rem)] leading-[0.95] font-semibold tracking-tight text-ink"
        >
          Hi, I&apos;m{" "}
          <span className="relative inline-block whitespace-nowrap">
            <span className="bg-gradient-to-r from-plum via-rose to-coral bg-clip-text text-transparent">
              {site.name}.
            </span>
            <svg className="absolute -bottom-3 left-0 h-4 w-full" viewBox="0 0 200 14" fill="none" aria-hidden>
              <motion.path
                d="M3 9c30-7 62 5 96-1 30-5 62 4 98-4"
                stroke="url(#underline)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="underline" x1="0" x2="1">
                  <stop stopColor="var(--rose)" />
                  <stop offset="1" stopColor="var(--peach)" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h1>

        <motion.div variants={rise} className="mt-10 flex flex-wrap gap-3">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-ink px-6 py-3 text-[0.95rem] font-medium text-paper shadow-soft"
          >
            See what I&apos;ve built
          </motion.a>
          <motion.a
            href={site.resume}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full border border-line bg-glass px-6 py-3 text-[0.95rem] font-medium text-ink backdrop-blur"
          >
            Résumé ↗
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
        className="relative mx-auto size-60 md:ml-auto md:mr-0 md:size-72"
      >
        {/* gradient ring behind the photo — its shape slowly morphs */}
        <div className="morph absolute -inset-3 bg-gradient-to-br from-plum via-rose to-peach opacity-80 blur-[2px]" />
        <motion.div
          whileHover={{ scale: 1.04, rotate: 3 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="morph relative grid size-full place-items-center overflow-hidden bg-paper-2 text-6xl"
        >
          {site.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.avatar} alt={site.name} className="size-full object-cover" />
          ) : (
            <span aria-hidden>📷</span>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
