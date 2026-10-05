"use client";

import { motion } from "motion/react";
import { experience } from "@/data/content";
import Section from "./Section";

const dots = ["bg-plum", "bg-rose", "bg-peach", "bg-sand"];

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative space-y-4 pl-7 md:pl-9">
        {/* the soft gradient thread linking every job */}
        <div className="absolute top-3 bottom-3 left-2 w-1 rounded-full bg-gradient-to-b from-plum via-rose to-sand opacity-40 md:left-3" />

        {experience.map((job, i) => (
          <motion.article
            key={job.role + job.where}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative rounded-[28px] border border-line bg-card/80 p-6 shadow-soft backdrop-blur transition-shadow hover:shadow-lift md:p-7"
          >
            <span
              className={`absolute top-8 -left-[27px] size-4 rounded-full ring-4 ring-paper md:-left-[31px] ${dots[i % dots.length]}`}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="font-display text-xl font-semibold text-ink">{job.role}</h3>
              <span className="rounded-full bg-plum/12 px-3 py-0.5 text-sm text-plum">{job.where}</span>
              <span className="text-sm text-ink-soft md:ml-auto">{job.when}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3 text-[0.95rem]">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft/40" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
