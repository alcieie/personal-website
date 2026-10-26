"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/content";
import Section from "./Section";

const tones = {
  plum: {
    tile: "from-plum/25 to-plum/5",
    tag: "bg-plum/12",
    arrow: "text-plum",
  },
  rose: {
    tile: "from-rose/25 to-rose/5",
    tag: "bg-rose/15",
    arrow: "text-rose",
  },
  peach: {
    tile: "from-peach/35 to-peach/5",
    tag: "bg-peach/20",
    arrow: "text-coral",
  },
  sand: {
    tile: "from-sand/50 to-sand/10",
    tag: "bg-sand/35",
    arrow: "text-peach",
  },
};

export default function Projects() {
  const [playing, setPlaying] = useState<{ title: string; src: string } | null>(null);
  return (
    <>
      <Section id="projects" title="Projects">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => {
            const t = tones[p.tone];
            const video = "video" in p ? p.video : null;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 16,
                  delay: (i % 2) * 0.1,
                }}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                // an odd one out at the end stretches across both columns
                className={`${projects.length % 2 && i === projects.length - 1 ? "md:col-span-2" : ""} group flex flex-col rounded-[32px] border border-line bg-card/80 p-6 shadow-soft backdrop-blur transition-shadow hover:shadow-lift relative`}
              >
                <motion.div
                  variants={{ hover: { y: -6 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-start justify-between">
                    <motion.div
                      variants={{ hover: { rotate: -10, scale: 1.12 } }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 12,
                      }}
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
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {/* the link stretches over the whole card; cards without one have no arrow */}
                    {p.href ? (
                      <a href={p.href} className="after:absolute after:inset-0 after:rounded-[32px]">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="mt-2 mb-5 text-[0.95rem]">{p.blurb}</p>
                  {video && (
                    <button
                      type="button"
                      onClick={() => setPlaying({ title: p.title, src: video })}
                      className={`relative z-10 -mt-1 mb-5 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-ink ring-1 ring-line transition-transform hover:scale-105 ${t.tag}`}
                    >
                      <span aria-hidden>▶</span> watch demo
                    </button>
                  )}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className={`rounded-full px-3 py-1 text-xs text-ink ${t.tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Section>
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </>
  );
}

// rendered into <body> so the sections' transforms don't trap the fixed overlay
function VideoModal({ video, onClose }: { video: { title: string; src: string } | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [video, onClose]);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {video && (
        <motion.div
          key="video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${video.title} demo`}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-[32px] border border-line bg-card p-3 shadow-lift"
          >
            <div className="flex items-center justify-between px-3 pt-1 pb-3">
              <p className="font-display text-lg font-semibold text-ink">{video.title}</p>
              <button
                type="button"
                onClick={onClose}
                autoFocus
                aria-label="close"
                className="grid size-9 cursor-pointer place-items-center rounded-full text-xl text-ink-soft transition-colors hover:bg-paper-2 hover:text-ink"
              >
                ×
              </button>
            </div>
            <video src={video.src} controls autoPlay playsInline className="max-h-[calc(100dvh-8rem)] w-full rounded-3xl bg-black" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
