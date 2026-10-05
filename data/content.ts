/* ============================================================
   ✏️ EVERYTHING YOU'LL WANT TO EDIT LIVES IN THIS FILE.
   The components read from here, so you never have to touch them
   just to change words, links or hobbies.
   ============================================================ */

export const site = {
  name: "Alice",
  title: "Alice Lu — electrical engineering",
  description: "Alice Lu — electrical engineering student @ University of Waterloo",
  // the little pills above your name — keep them short
  status: "2A · Looking for Summer 2027 Co-op",
  chip: "Electrical Eng · UWaterloo",
  // ✏️ drop your photo in /public (e.g. /public/me.jpg) and set this to "/me.jpg"
  avatar: null as string | null,
  // ✏️ drop your résumé in /public/resume.pdf
  resume: "/resume.pdf",
  email: "alcieylu@gmail.com",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/alcieie", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: "linkedin" }, // ✏️
  { label: "Email", href: "mailto:alcieylu@gmail.com", icon: "mail" },
] as const;

/* ------------------------------------------------------------
   EXPERIENCE — newest first. Copy a block to add another.
   ------------------------------------------------------------ */
export const experience = [
  {
    role: "Hardware Engineering Intern",
    where: "Meridian Power Systems",
    when: "Summer 2026",
    points: [
      "Built and tested a power converter prototype, taking it from 88% to 93% efficient.",
      "Wrote the step-by-step guide the team now uses when a new board arrives.",
    ],
  },
  {
    role: "Intern Research Associate",
    where: "AristAI",
    when: "Jan – Apr 2026",
    points: [
      "Set up a test rig for measuring how much energy fast-switching parts waste as heat.",
      "Automated the measurements in Python — a two-hour job now takes fifteen minutes.",
    ],
  },
  {
    role: "Teaching Assistant, Circuits I",
    where: "Electrical Engineering Dept.",
    when: "2025 – 2026",
    points: [
      "Ran weekly labs for around 30 second-year students.",
      "Rewrote two lab handouts after watching everyone get stuck in the same place.",
    ],
  },
  {
    role: "Electronics Lead",
    where: "University Robotics Team",
    when: "2024 – 2025",
    points: [
      "Designed the board that gets power everywhere it needs to go on our competition rover.",
      "Taught six new members to solder and read a schematic.",
    ],
  },
];

/* ------------------------------------------------------------
   PROJECTS — `tone` picks the accent colour: plum | rose | peach | sand
   ------------------------------------------------------------ */
export const projects = [
  {
    title: "A bench power supply, from scratch",
    blurb:
      "Adjustable up to 30V with a little screen on the front. Four attempts — the third taught me what a bad ground sounds like.",
    emoji: "⚡",
    tags: ["circuit design", "KiCad", "firmware"],
    tone: "plum",
    href: "#", // ✏️ link to the repo or writeup
  },
  {
    title: "Soil sensors for a community garden",
    blurb:
      "Battery-powered boxes that text you when the beds are dry. About eight months per charge, mostly by sleeping.",
    emoji: "🌱",
    tags: ["embedded C", "wireless", "battery life"],
    tone: "rose",
    href: "#",
  },
  {
    title: "Guitar pedal that does the maths itself",
    blurb:
      "Reverb and delay on an FPGA. It sounds good, and you can't hear any lag, which genuinely surprised me.",
    emoji: "🎸",
    tags: ["Verilog", "audio", "FPGA"],
    tone: "peach",
    href: "#",
  },
  {
    title: "Colour Card",
    blurb:
      "Turns a photo into a palette with k-means in CIELAB space — each band sized by how much of the photo it covers.",
    emoji: "🎨",
    tags: ["HTML", "k-means", "open source"],
    tone: "sand",
    href: "#",
  },
] as const;

/* ------------------------------------------------------------
   HOBBIES — the draggable things at the bottom.

   art:    one of the built-in drawings —
           "camera" | "vinyl" | "disco" | "cupcake" | "film" | "book"
   image:  OR your own cut-out picture instead (a transparent PNG
           works best) — put it in /public/hobbies/ and write
           e.g. image: "/hobbies/book.png". It overrides `art`.
   x, y:   where it sits on desktop, as a % of the area
   size:   width in px on desktop
   link:   what pops up — can be a whole profile or one song/film/book.
           Delete `link` for a hobby with no pop-up.
           In the pop-up, `handle` is the big line and `note` sits under it.
   photos: OR a list of pictures that fan out into a collage on hover
           (1–4 look best). Put them in /public/hobbies/ and list
           their paths. `note` becomes the caption underneath.
   ------------------------------------------------------------ */
export type Hobby = {
  id: string;
  label: string;
  note: string;
  art?: "camera" | "vinyl" | "disco" | "cupcake" | "film" | "book";
  image?: string;
  x: number;
  y: number;
  size: number;
  tilt: number;
  link?: { platform: string; handle: string; href: string; color: string };
  photos?: string[];
};

export const hobbies: Hobby[] = [
  {
    id: "photo",
    label: "landscape photography",
    note: "mostly skies, sometimes water",
    art: "camera",
    x: 5, y: 7, size: 140, tilt: -8,
    link: {
      platform: "VSCO",
      handle: "@aliceylu",
      href: "https://vsco.co/aliceylu",
      color: "#111111",
    },
  },
  {
    id: "music",
    label: "on repeat",
    note: "ADÉLA",
    art: "vinyl",
    x: 39, y: 3, size: 160, tilt: 0,
    link: {
      platform: "Spotify",
      handle: "Ain't In LA",
      href: "https://open.spotify.com/track/02HyFYmpzt02VJ8k0CqxKj",
      color: "#1DB954",
    },
  },
  {
    id: "film",
    label: "favourite film",
    note: "Christopher Nolan · 2014",
    art: "film",
    x: 74, y: 6, size: 140, tilt: 7,
    link: {
      platform: "Letterboxd",
      handle: "Interstellar",
      href: "https://letterboxd.com/film/interstellar/",
      color: "#FF8000",
    },
  },
  {
    id: "book",
    label: "reading",
    note: "Charles Dickens",
    art: "book", // ✏️ swap for image: "/hobbies/book.png" when you have a nicer one
    x: 10, y: 54, size: 110, tilt: -6,
    link: {
      platform: "Goodreads",
      handle: "A Tale of Two Cities",
      href: "https://www.goodreads.com/book/show/1953.A_Tale_of_Two_Cities",
      color: "#8A6A3E",
    },
  },
  {
    id: "dance",
    label: "dance",
    note: "still learning the choreo",
    art: "disco",
    x: 44, y: 50, size: 130, tilt: 6,
  },
  {
    id: "bake",
    label: "cooking & baking",
    note: "not very good, very enthusiastic",
    art: "cupcake",
    x: 77, y: 58, size: 115, tilt: 10,
    // ✏️ replace these placeholders with your own food photos (.jpg is fine)
    photos: ["/hobbies/cooking/1.svg", "/hobbies/cooking/2.svg", "/hobbies/cooking/3.svg"],
  },
];
