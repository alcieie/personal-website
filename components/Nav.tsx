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
        className="mx-auto flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-line bg-glass p-1.5 shadow-soft backdrop-blur-xl [scrollbar-width:none]"
      >
        {links.map(({ id, label, desktopOnly }) => (
          <a
            key={id}
            href={`#${id}`}
            onMouseEnter={() => setHovered(id)}
            className={`relative isolate whitespace-nowrap rounded-full px-2 py-1.5 text-[0.82rem] sm:px-3.5 sm:text-[0.92rem] transition-colors duration-300 ${
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

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ rotate: -20, scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      className="ml-1 grid size-8 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-plum/15 hover:text-ink"
    >
      {dark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </motion.button>
  );
}
