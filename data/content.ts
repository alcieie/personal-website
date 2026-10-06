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
  avatar: "/guilin.jpg" as string | null,
  // ✏️ the résumé button is hidden while this is null — drop your résumé
  // in /public/resume.pdf and set this to "/resume.pdf" to bring it back
  resume: null as string | null,
  email: "alcieylu@gmail.com",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/alcieie", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alcieylu/", icon: "linkedin" },
  { label: "Email", href: "mailto:alcieylu@gmail.com", icon: "mail" },
] as const;

/* ------------------------------------------------------------
   EXPERIENCE — copy a block to add another.
   ------------------------------------------------------------ */
export const experience = [
  {
    role: "Research Intern Associate",
    where: "AristAI",
    when: "Jan – Apr 2026",
    points: [
      "Wrote 4 Python QA scripts that cut manual accessibility testing by 40%.",
      "Evaluated model outputs for completeness and safety, making data labelling 15% more accurate.",
      "Turned WCAG research into evaluation rubrics for the engineering teams.",
    ],
  },
  {
    role: "Piano Teacher",
    where: "Rhythmus Studios",
    when: "Oct 2022 – Sep 2023",
    points: [
      "Taught 10 students a week, each with their own practice plan.",
      "Adapted my teaching to each student's needs and pace, so they could perform recital-ready pieces they enjoy, even on short notice.",
    ],
  },
];

/* ------------------------------------------------------------
   PROJECTS — `tone` picks the accent colour: plum | rose | peach | sand
   ------------------------------------------------------------ */
export const projects = [
  {
    title: "Colour Card",
    blurb:
      "Turns a photo into a palette with k-means in CIELAB space — each band sized by how much of the photo it covers.",
    emoji: "🎨",
    tags: ["HTML", "k-means", "open source"],
    tone: "plum",
    href: "https://github.com/alcieie/ColourCard",
  },
  {
    title: "Listening Analytics",
    blurb:
      "My Spotify history as a mood-ring trend chart, a listening heatmap, and skip rates by genre and artist.",
    emoji: "🎧",
    tags: ["Next.js", "Spotify API", "Postgres"],
    tone: "rose",
    href: "https://github.com/alcieie/listening-analytics",
  },
  {
    title: "Smart home climate control",
    blurb:
      "An FPGA thermostat that heats or cools on its own, with manual overrides and a vacation mode.",
    emoji: "🌡️",
    tags: ["Verilog", "FPGA", "combinational logic"],
    tone: "peach",
    href: null, // ✏️ no link = no arrow; add a URL here to make the card clickable
  },
  {
    title: "FPGA polarity controller",
    blurb:
      "Digital logic on an Altera MAX10, with a switch that flips whether the LEDs light up on high or low.",
    emoji: "💡",
    tags: ["Verilog", "FPGA", "digital logic"],
    tone: "sand",
    href: null,
  },
  {
    title: "Hospital communication board",
    blurb:
      "An ESP32 board for calling a nurse, with lights that follow the time of day to help prevent hospital delirium.",
    emoji: "🏥",
    tags: ["C++", "ESP32", "PWM"],
    tone: "plum",
    href: null,
  },
  {
    title: "Conway's Game of Life",
    blurb:
      "The zero-player game in Python. Cells live, die and multiply by a few simple rules.",
    emoji: "🧬",
    tags: ["Python", "simulation"],
    tone: "rose",
    href: "#", // ✏️ link to the Game of Life repo
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
  note?: string;
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
    note: "Daniel Caesar",
    art: "vinyl",
    x: 39, y: 3, size: 160, tilt: 0,
    link: {
      platform: "Spotify",
      handle: "Disillusioned",
      href: "https://open.spotify.com/track/4YsnwsPURRSvprBHBY1BCd",
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
    x: 24, y: 54, size: 110, tilt: -6,
    link: {
      platform: "Goodreads",
      handle: "A Tale of Two Cities",
      href: "https://www.goodreads.com/book/show/1953.A_Tale_of_Two_Cities",
      color: "#8A6A3E",
    },
  },
  {
    id: "bake",
    label: "cooking & baking",
    note: "not very good, very enthusiastic",
    art: "cupcake",
    x: 60, y: 58, size: 115, tilt: 10,
    photos: ["/hobbies/cooking/apple.jpg", "/hobbies/cooking/bowl.jpg", "/hobbies/cooking/cookies.jpg"],
  },
];
