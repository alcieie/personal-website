/* Hand-drawn stand-ins for the hobby objects.
   Swap any of them for a real cut-out photo via `image` in data/content.ts. */

export function Camera() {
  return (
    <svg viewBox="0 0 160 120" className="w-full" aria-hidden>
      <rect x="18" y="12" width="34" height="14" rx="5" fill="#5A4A6E" />
      <rect x="112" y="16" width="22" height="10" rx="4" fill="#F98F7A" />
      <rect x="6" y="22" width="148" height="88" rx="22" fill="#6E5A86" />
      <rect x="6" y="46" width="148" height="40" fill="#5A4A6E" />
      <rect x="20" y="32" width="24" height="10" rx="5" fill="#FAD98B" />
      <circle cx="80" cy="66" r="36" fill="#F2E6DE" />
      <circle cx="80" cy="66" r="29" fill="#2B2440" />
      <circle cx="80" cy="66" r="20" fill="#3D3D6B" />
      <circle cx="80" cy="66" r="12" fill="#191B2E" />
      <circle cx="73" cy="58" r="5" fill="#fff" opacity=".7" />
      <circle cx="87" cy="72" r="2.5" fill="#fff" opacity=".35" />
      <circle cx="136" cy="40" r="6" fill="#D4788F" />
    </svg>
  );
}

export function Vinyl() {
  return (
    <svg viewBox="0 0 160 160" className="w-full" aria-hidden>
      <circle cx="80" cy="80" r="76" fill="#1E1B2E" stroke="#6E6B93" strokeOpacity=".55" strokeWidth="3" />
      {[68, 60, 52, 44].map((r) => (
        <circle key={r} cx="80" cy="80" r={r} fill="none" stroke="#fff" strokeOpacity=".08" strokeWidth="1.5" />
      ))}
      <path d="M30 40a66 66 0 0 1 40-26" stroke="#fff" strokeOpacity=".22" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="80" cy="80" r="28" fill="#F98F7A" />
      <circle cx="80" cy="80" r="28" fill="url(#label)" />
      <circle cx="80" cy="80" r="4" fill="#1E1B2E" />
      <defs>
        <radialGradient id="label">
          <stop offset=".3" stopColor="#F9B27E" />
          <stop offset="1" stopColor="#D4788F" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Disco() {
  const tiles = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const shade = ["#E8E4F2", "#C9C2DE", "#F5D6E0", "#B7AED3", "#FFF1DA"][(row * 3 + col * 2) % 5];
      tiles.push(<rect key={`${row}-${col}`} x={30 + col * 12.5} y={40 + row * 12.5} width="11" height="11" rx="2" fill={shade} />);
    }
  }
  return (
    <svg viewBox="0 0 160 160" className="w-full" aria-hidden>
      <line x1="80" y1="0" x2="80" y2="36" stroke="#8C5F8E" strokeWidth="2.5" />
      <rect x="72" y="30" width="16" height="10" rx="3" fill="#8C5F8E" />
      <clipPath id="ball"><circle cx="80" cy="90" r="50" /></clipPath>
      <circle cx="80" cy="90" r="50" fill="#9A90BF" />
      <g clipPath="url(#ball)">{tiles}</g>
      <circle cx="80" cy="90" r="50" fill="url(#shine)" />
      <path d="M134 44l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#FAD98B" />
      <path d="M22 118l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#F98F7A" />
      <defs>
        <radialGradient id="shine" cx=".35" cy=".3">
          <stop stopColor="#fff" stopOpacity=".7" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#3D3D6B" stopOpacity=".35" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Cupcake() {
  return (
    <svg viewBox="0 0 140 160" className="w-full" aria-hidden>
      <path d="M26 88h88l-12 64H38z" fill="#F9B27E" />
      {[40, 56, 72, 88, 104].map((x) => (
        <path key={x} d={`M${x - 4} 88l${(x - 70) * 0.12 + 2} 64`} stroke="#E8955F" strokeWidth="4" strokeLinecap="round" />
      ))}
      <path d="M18 92c-6-14 4-26 16-26-4-16 12-28 26-22 6-16 32-16 38 0 14-4 26 8 22 22 12 2 18 16 10 26z" fill="#F5C1CE" />
      <path d="M34 66c10 6 26 6 36-2M60 44c8 6 22 6 32-2" stroke="#D4788F" strokeWidth="4" strokeLinecap="round" fill="none" />
      {[[44, 78, "#8C5F8E"], [74, 70, "#FAD98B"], [98, 80, "#8C5F8E"], [60, 56, "#F98F7A"], [88, 54, "#fff"]].map(([x, y, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="8" height="3.5" rx="1.75" fill={c as string} transform={`rotate(${i * 37} ${x} ${y})`} />
      ))}
      <path d="M76 28c2-10 8-16 16-20" stroke="#5E8C4A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="74" cy="30" r="11" fill="#E0445E" />
      <circle cx="70" cy="26" r="3.5" fill="#fff" opacity=".6" />
    </svg>
  );
}

export function Clapper() {
  const stripes = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 160 140" className="w-full" aria-hidden>
      {/* the hinged top arm, tipped open */}
      <g transform="rotate(-14 14 46)">
        <rect x="12" y="26" width="138" height="22" rx="6" fill="#2B2440" />
        {stripes.map((i) => (
          <path key={i} d={`M${22 + i * 27} 26h13l-12 22H${10 + i * 27}z`} fill="#F2E6DE" />
        ))}
      </g>
      <circle cx="16" cy="48" r="5" fill="#8C5F8E" />
      {/* the board */}
      <rect x="10" y="50" width="140" height="84" rx="12" fill="#3D3D6B" />
      <rect x="10" y="50" width="140" height="18" rx="6" fill="#2B2440" />
      {stripes.map((i) => (
        <path key={i} d={`M${20 + i * 27} 50h13l-10 18H${10 + i * 27}z`} fill="#F2E6DE" />
      ))}
      <path d="M24 88h112M24 108h112" stroke="#F2E6DE" strokeOpacity=".25" strokeWidth="2" />
      <path d="M80 72v58" stroke="#F2E6DE" strokeOpacity=".25" strokeWidth="2" />
      <circle cx="120" cy="98" r="7" fill="#F9B27E" />
      <path d="M30 98h32" stroke="#FAD98B" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* placeholder book — swap for a real cover via `image` in data/content.ts */
export function Book() {
  return (
    <svg viewBox="0 0 130 160" className="w-full" aria-hidden>
      {/* pages peeking out */}
      <rect x="22" y="14" width="96" height="136" rx="8" fill="#FBF6F2" />
      <path d="M30 22v122M36 20v126" stroke="#E6D8CC" strokeWidth="2" />
      {/* cover */}
      <rect x="12" y="8" width="96" height="140" rx="10" fill="#8C5F8E" />
      <rect x="12" y="8" width="16" height="140" rx="6" fill="#6E4A70" />
      <rect x="40" y="32" width="52" height="34" rx="6" fill="#F2E6DE" opacity=".9" />
      <path d="M48 44h36M48 54h24" stroke="#8C5F8E" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 120h52" stroke="#FAD98B" strokeWidth="3" strokeLinecap="round" />
      {/* ribbon bookmark */}
      <path d="M86 148v10l6-5 6 5v-10" fill="#D4788F" />
    </svg>
  );
}

export const art = { camera: Camera, vinyl: Vinyl, disco: Disco, cupcake: Cupcake, film: Clapper, book: Book };
