"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { hobbies, type Hobby } from "@/data/content";
import { art } from "./HobbyArt";
import Section from "./Section";

export default function Hobbies() {
  const [open, setOpen] = useState<string | null>(null);
  const [desktop, setDesktop] = useState(false);
  const area = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <Section id="hobbies" title="Off the clock" note="hover, tap, or drag them around">
      <div
        ref={area}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="relative grid grid-cols-2 place-items-center gap-x-4 gap-y-12 rounded-[40px] border border-line bg-gradient-to-br from-plum/10 via-rose/5 to-peach/15 px-4 py-12 md:block md:h-[620px] md:p-0"
      >
        {/* faint dot grid on the play area */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px] [background-image:radial-gradient(var(--line)_1.5px,transparent_1.5px)] [background-size:22px_22px]" />

        {hobbies.map((h, i) => (
          <Item
            key={h.id}
            hobby={h}
            index={i}
            area={area}
            desktop={desktop}
            open={open === h.id}
            setOpen={setOpen}
          />
        ))}
      </div>
    </Section>
  );
}

function Item({
  hobby: h,
  index,
  area,
  desktop,
  open,
  setOpen,
}: {
  hobby: Hobby;
  index: number;
  area: RefObject<HTMLDivElement | null>;
  desktop: boolean;
  open: boolean;
  setOpen: (fn: (cur: string | null) => string | null) => void;
}) {
  const Art = h.art ? art[h.art] : null;
  // cards open downward near the top of the area, upward near the bottom,
  // so they stay inside it (on phones the bottom row is the last two items)
  const below = desktop ? h.y < 30 : index < hobbies.length - 2;

  return (
    <motion.div
      drag={desktop}
      dragConstraints={area}
      dragElastic={0.18}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
      whileDrag={{ scale: 1.12 }}
      onDragStart={() => setOpen(() => null)}
      onHoverStart={() => desktop && setOpen(() => h.id)}
      onHoverEnd={() => desktop && setOpen((cur) => (cur === h.id ? null : cur))}
      onTap={() => {
        if (desktop) {
          if (h.link) window.open(h.link.href, "_blank", "noopener");
        } else {
          setOpen((cur) => (cur === h.id ? null : h.id));
        }
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 160, damping: 14, delay: index * 0.12 }}
      style={{ "--x": `${h.x}%`, "--y": `${h.y}%`, "--size": `${h.size}px`, zIndex: open ? 30 : 1 } as CSSProperties}
      className="draggable relative flex touch-pan-y flex-col items-center select-none md:absolute md:top-[var(--y)] md:left-[var(--x)]"
      role="button"
      aria-label={h.link ? `${h.label} — ${h.link.platform}` : h.label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((cur) => (cur === h.id ? null : h.id));
        } else if (e.key === "Escape") setOpen(() => null);
      }}
    >
      {/* gentle idle float, each one on its own rhythm */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [h.tilt, h.tilt + 3, h.tilt] }}
        transition={{ duration: 4 + index * 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={open ? { scale: 1.08, rotate: -4 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 12 }}
          className="w-[calc(var(--size)*0.72)] drop-shadow-[0_18px_18px_rgb(61_61_107/0.28)] md:w-[var(--size)]"
        >
          {h.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={h.image} alt="" draggable={false} className="w-full" />
          ) : Art ? (
            <div
              className={h.art === "vinyl" ? "animate-[spin_3.5s_linear_infinite]" : ""}
              style={{ animationPlayState: open ? "running" : "paused" }}
            >
              <Art />
            </div>
          ) : null}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && (h.photos?.length || h.link) && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: below ? -10 : 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: below ? -6 : 6, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            // centred on desktop; on phones, pinned to the outer edge of its column so it stays on screen
            style={{ x: desktop ? "-50%" : 0 }}
            // stop presses on the card from starting a drag
            onPointerDown={(e) => e.stopPropagation()}
            className={`absolute z-40 ${h.photos?.length ? "w-72" : "w-56"} ${below ? "top-full pt-3" : "bottom-full pb-3"} ${
              desktop ? "left-1/2" : index % 2 ? "right-0" : "left-0"
            }`}
          >
            {h.photos?.length ? <Collage hobby={h} /> : <Card hobby={h} />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// where each photo lands as the stack fans out: x/y offset in px, and tilt
const fan = [
  { x: -78, y: 8, r: -11 },
  { x: 0, y: -6, r: 2 },
  { x: 78, y: 10, r: 10 },
  { x: 36, y: 34, r: -4 },
];

function Collage({ hobby: h }: { hobby: Hobby }) {
  const photos = h.photos!.slice(0, 4);
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-48 w-full">
        {photos.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            draggable={false}
            // every photo starts stacked in the middle, then springs out to its spot
            initial={{ x: 0, y: 20, rotate: 0, scale: 0.6, opacity: 0 }}
            animate={{ x: fan[i].x, y: fan[i].y, rotate: fan[i].r, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.05 }}
            whileHover={{ scale: 1.12, rotate: 0, zIndex: 10 }}
            className="absolute top-2 left-1/2 -ml-14 h-36 w-28 rounded-2xl border-4 border-card bg-paper-2 object-cover shadow-lift"
          />
        ))}
      </div>
      {h.note && <p className="mt-1 rounded-full bg-card px-3 py-1 font-serif text-lg leading-none text-ink italic shadow-soft">{h.note}</p>}
    </div>
  );
}

function Card({ hobby: h }: { hobby: Hobby }) {
  const link = h.link!;
  return (
    <div className="rounded-3xl border border-line bg-card p-4 text-left shadow-lift">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-ink-soft uppercase">
          <span className="size-2 rounded-full ring-1 ring-ink-soft/30" style={{ background: link.color }} />
          {link.platform}
        </span>
        {h.art === "vinyl" && (
          <span className="eq flex h-4 items-end gap-0.5" aria-hidden>
            {[0, 0.2, 0.4, 0.1].map((d) => (
              <span key={d} className="h-full w-1 rounded-full" style={{ background: link.color, animationDelay: `${d}s` }} />
            ))}
          </span>
        )}
      </div>
      <p className="mt-2 font-display text-lg leading-tight font-semibold text-ink">{link.handle}</p>
      {h.note && <p className="mt-0.5 text-sm leading-snug">{h.note}</p>}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/15 transition-transform hover:scale-105"
        style={{ background: link.color }}
      >
        open {link.platform} <span aria-hidden>↗</span>
      </a>
    </div>
  );
}
