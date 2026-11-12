"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { id: "top", label: "hello", desktopOnly: true },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "hobbies", label: "off the clock" },
  { id: "contact", label: "say hi" },
];

export default function Nav() {
  const [active, setActive] = useState("top");
  const [hovered, setHovered] = useState<string | null>(null);

  // highlight whichever section is in the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // near the very top, always "hello" — the hero can be shorter than half the screen
    const onScroll = () => scrollY < 120 && setActive("top");
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, []);

  const pill = hovered ?? active;

  return (
    <div className="sticky top-0 z-50 px-2 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        onMouseLeave={() => setHovered(null)}
        className="mx-auto flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-line bg-card p-1.5 shadow-soft [scrollbar-width:none]"
      >
        {links.map(({ id, label, desktopOnly }) => (
          <a
            key={id}
            href={`#${id}`}
            onMouseEnter={() => setHovered(id)}
            className={`relative isolate whitespace-nowrap rounded-full px-1.5 py-1.5 text-[0.82rem] sm:px-3.5 sm:text-[0.92rem] transition-colors duration-300 ${
              desktopOnly ? "hidden sm:inline-block" : ""} ${
              pill === id ? "text-on-accent" : "text-ink-soft hover:text-ink"
            }`}
          >
            {pill === id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {label}
          </a>
        ))}
        <ThemeToggle />
      </motion.nav>
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setDark(!dark);
  };

  // a little slide switch wired to an LED: lights on = day mode
  const on = !dark;

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      role="switch"
      aria-checked={on}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      className="group ml-1 flex h-8 shrink-0 items-center gap-1 rounded-full px-0.5"
    >
      <motion.span
        aria-hidden
        className="size-1.5 rounded-full"
        animate={
          on
            ? { opacity: [0.3, 1, 0.5, 1], backgroundColor: "var(--coral)", boxShadow: "0 0 6px 2px var(--coral)" }
            : { opacity: 0.35, backgroundColor: "var(--ink-soft)", boxShadow: "0 0 0px 0px var(--coral)" }
        }
        transition={{ duration: 0.35 }}
      />
      <span
        aria-hidden
        className="flex h-3.5 w-[26px] items-center rounded-full border border-line bg-paper-2 p-px transition-colors group-hover:border-ink-soft/40"
      >
        <motion.span
          className="size-2.5 rounded-full bg-ink shadow-soft"
          animate={{ x: on ? 12 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </span>
    </motion.button>
  );
}
