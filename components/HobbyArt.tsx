/* Hand-drawn stand-ins for the hobby objects: wobbly ink lines over a flat
   colour fill that's printed slightly off, like a riso print.
   Swap any of them for a real cut-out photo via `image` in data/content.ts. */

import type { ReactNode } from "react";

const ink = { fill: "none", stroke: "var(--ink)", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// the colour layer sits a few px off the lines, and the lines get a slight hand wobble
function Drawing({ id, viewBox, fill, lines }: { id: string; viewBox: string; fill: ReactNode; lines: ReactNode }) {
  return (
    <svg viewBox={viewBox} className="w-full overflow-visible" aria-hidden>
      <defs>
        <filter id={`rough-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed={id.length} />
          <feDisplacementMap in="SourceGraphic" scale="3.5" />
        </filter>
      </defs>
      <g transform="translate(5 5)">{fill}</g>
      <g filter={`url(#rough-${id})`}>{lines}</g>
    </svg>
  );
}

export function Camera() {
  return (
    <Drawing
      id="camera"
      viewBox="0 0 160 120"
      fill={
        <>
          <path d="M52 30 60 14h38l8 16z" fill="var(--coral)" />
          <rect x="10" y="28" width="140" height="80" rx="16" fill="var(--peach)" />
          <circle cx="80" cy="69" r="32" fill="var(--sand)" />
        </>
      }
      lines={
        <>
          <path d="M26 29h28l7-14h36l7 14h30q15 0 15 15v49q0 14-15 14H26q-15 0-15-14V44q0-15 15-15z" {...ink} />
          <path d="M116 29v-6q0-2 2-2h12q2 0 2 2v6" {...ink} />
          <path d="M11 52h38M111 52h38M11 88h38M111 88h38" {...ink} strokeWidth="2" />
          <circle cx="80" cy="69" r="31" {...ink} />
          <circle cx="80" cy="69" r="19" {...ink} />
          <path d="M69 61a13 13 0 0 1 12-6" {...ink} strokeWidth="2.5" />
          <rect x="22" y="36" width="18" height="10" rx="2" {...ink} strokeWidth="2.5" />
          <circle cx="133" cy="41" r="3" fill="var(--ink)" />
        </>
      }
    />
  );
}

export function Vinyl() {
  return (
    <Drawing
      id="vinyl"
      viewBox="0 0 160 160"
      fill={
        <>
          <circle cx="75" cy="75" r="72" fill="#2B2440" />
          {[62, 54, 46, 38].map((r) => (
            <circle key={r} cx="75" cy="75" r={r} fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="1.5" />
          ))}
          <path d="M30 42a58 58 0 0 1 30-22" stroke="#fff" strokeOpacity=".25" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="75" cy="75" r="24" fill="var(--coral)" />
        </>
      }
      lines={
        <>
          <circle cx="80" cy="80" r="72" {...ink} />
          <circle cx="80" cy="80" r="24" {...ink} />
          <path d="M66 74a15 15 0 0 1 10-8" {...ink} strokeWidth="2" />
          <circle cx="80" cy="80" r="3.5" fill="var(--ink)" />
        </>
      }
    />
  );
}

export function Disco() {
  return (
    <Drawing
      id="disco"
      viewBox="0 0 160 160"
      fill={<circle cx="80" cy="92" r="48" fill="var(--sand)" />}
      lines={
        <>
          <path d="M80 2v34" {...ink} strokeWidth="2.5" />
          <rect x="72" y="36" width="16" height="9" rx="3" {...ink} />
          <circle cx="80" cy="92" r="48" {...ink} />
          <ellipse cx="80" cy="92" rx="48" ry="17" {...ink} strokeWidth="2" />
          <ellipse cx="80" cy="92" rx="18" ry="48" {...ink} strokeWidth="2" />
          <path d="M37 70h86M37 114h86" {...ink} strokeWidth="2" />
          <path d="M138 34v18M129 43h18M22 118v12M16 124h12" {...ink} stroke="var(--coral)" strokeWidth="3" />
        </>
      }
    />
  );
}

export function Cupcake() {
  const liner = "M26 90h88l-12 60H38z";
  const frosting = "M18 94c-8-16 6-30 18-26-2-18 16-28 28-20 6-16 30-16 36 0 14-6 28 6 22 22 12 4 16 16 8 24z";
  return (
    <Drawing
      id="cupcake"
      viewBox="0 0 140 160"
      fill={
        <>
          <path d={liner} fill="var(--peach)" />
          <path d={frosting} fill="var(--rose)" />
          <circle cx="74" cy="30" r="11" fill="var(--coral)" />
        </>
      }
      lines={
        <>
          <path d={liner} {...ink} />
          <path d="M40 96l8 52M56 96l4 52M72 96v52M88 96l-4 52M104 96l-8 52" {...ink} strokeWidth="2" />
          <path d={frosting} {...ink} />
          <path d="M36 70c10 6 24 6 34-2M62 48c8 6 20 6 30-2" {...ink} strokeWidth="2.5" />
          <path d="M44 80l5-3M76 72l6 1M98 82l4 4M60 58l-2 5M90 58l5-2" {...ink} strokeWidth="3.5" />
          <circle cx="74" cy="30" r="11" {...ink} />
          <path d="M77 19c2-8 8-13 16-15" {...ink} strokeWidth="2.5" />
        </>
      }
    />
  );
}

export function Clapper() {
  const stripes = [0, 1, 2, 3, 4];
  return (
    <Drawing
      id="clapper"
      viewBox="0 0 160 140"
      fill={
        <>
          <rect x="10" y="56" width="138" height="76" rx="8" fill="var(--sand)" />
          <rect x="10" y="32" width="138" height="20" rx="4" fill="var(--peach)" transform="rotate(-12 12 52)" />
        </>
      }
      lines={
        <>
          {/* the hinged arm, tipped open */}
          <g transform="rotate(-12 12 52)">
            <rect x="10" y="32" width="138" height="20" rx="4" {...ink} />
            {stripes.map((i) => (
              <path key={i} d={`M${30 + i * 26} 32h12l-9 20h-12z`} fill="var(--ink)" />
            ))}
          </g>
          <rect x="10" y="56" width="138" height="76" rx="8" {...ink} />
          <path d="M10 74h138" {...ink} />
          {stripes.map((i) => (
            <path key={i} d={`M${30 + i * 26} 56h12l-9 18h-12z`} fill="var(--ink)" />
          ))}
          <circle cx="15" cy="54" r="4" fill="var(--ink)" />
          <path d="M24 98h110M24 116h110M79 74v58" {...ink} strokeWidth="2" opacity=".5" />
          <path d="M28 88q5-4 10 0t10 0t10 0M92 88q5-4 10 0t10 0" {...ink} strokeWidth="2" />
        </>
      }
    />
  );
}

/* placeholder book — swap for a real cover via `image` in data/content.ts */
export function Book() {
  return (
    <Drawing
      id="book"
      viewBox="0 0 130 160"
      fill={
        <>
          <rect x="12" y="8" width="96" height="140" rx="8" fill="var(--rose)" />
          <path d="M84 146v12l6-5 6 5v-12z" fill="var(--coral)" />
        </>
      }
      lines={
        <>
          <path d="M108 16h6q4 0 4 4v124q0 4-4 4h-6M113 18v128" {...ink} strokeWidth="2.5" />
          <rect x="12" y="8" width="96" height="140" rx="8" {...ink} />
          <path d="M26 10v136" {...ink} />
          <rect x="40" y="34" width="52" height="30" rx="4" {...ink} strokeWidth="2.5" />
          <path d="M48 45h36M48 54h22M44 124h44" {...ink} strokeWidth="2.5" />
          <path d="M84 148v10l6-5 6 5v-10" {...ink} strokeWidth="2.5" />
        </>
      }
    />
  );
}

export const art = { camera: Camera, vinyl: Vinyl, disco: Disco, cupcake: Cupcake, film: Clapper, book: Book };
