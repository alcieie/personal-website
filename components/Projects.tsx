"use client";

import { motion } from "motion/react";
import { projects } from "@/data/content";
import Section from "./Section";

const tones = {
  plum: { tile: "from-plum/25 to-plum/5", tag: "bg-plum/12", arrow: "text-plum" },
  rose: { tile: "from-rose/25 to-rose/5", tag: "bg-rose/15", arrow: "text-rose" },
  peach: { tile: "from-peach/35 to-peach/5", tag: "bg-peach/20", arrow: "text-coral" },
  sand: { tile: "from-sand/50 to-sand/10", tag: "bg-sand/35", arrow: "text-peach" },
};

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => {
          const t = tones[p.tone];
          // cards without a link render as a plain box with no arrow
          const Card = p.href ? motion.a : motion.div;
          return (
            <Card
              key={p.title}
              href={p.href ?? undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: (i % 2) * 0.1 }}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              // an odd one out at the end stretches across both columns
              className={`${projects.length % 2 && i === projects.length - 1 ? "md:col-span-2" : ""} group flex flex-col rounded-[32px] border border-line bg-card/80 p-6 shadow-soft backdrop-blur transition-shadow hover:shadow-lift`}
            >
              <motion.div
                variants={{ hover: { y: -6 } }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex h-full flex-col"
              >
                <div className="flex items-start justify-between">
                  <motion.div
                    variants={{ hover: { rotate: -10, scale: 1.12 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                    className={`grid size-16 place-items-center rounded-2xl bg-gradient-to-br text-3xl ${t.tile}`}
                  >
                    {p.emoji}
                  </motion.div>
                  {p.href && (
                    <motion.span
                      variants={{ hover: { x: 4, y: -4, opacity: 1 } }}
                      initial={{ opacity: 0.35 }}
                      className={`text-2xl ${t.arrow}`}
                      aria-hidden
                    >
                      ↗
                    </motion.span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 mb-5 text-[0.95rem]">{p.blurb}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className={`rounded-full px-3 py-1 text-xs text-ink ${t.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
