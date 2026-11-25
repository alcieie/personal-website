/* Little drawings of what each project actually makes or does.
   They draw in currentColor, so the card's tone sets the colour. */

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// a palette card, each band as wide as its share of the photo
function Palette() {
  const bands = [
    ["var(--plum)", 9],
    ["var(--rose)", 6],
    ["var(--coral)", 4],
    ["var(--peach)", 3],
    ["var(--sand)", 2],
  ] as const;
  let x = 4;
  return (
    <>
      <clipPath id="palette-card"><rect x="4" y="7" width="24" height="18" rx="3" /></clipPath>
      <g clipPath="url(#palette-card)">
        {bands.map(([c, w]) => {
          const band = <rect key={c} x={x} y="7" width={w} height="18" fill={c} />;
          x += w;
          return band;
        })}
      </g>
      <rect x="4" y="7" width="24" height="18" rx="3" {...stroke} strokeWidth="1.25" />
    </>
  );
}

// a week of listening as a heatmap
function Heatmap() {
  const heat = [
    [0.2, 0.5, 0.9, 0.4, 0.15],
    [0.35, 1, 0.6, 0.25, 0.5],
    [0.15, 0.4, 0.8, 1, 0.3],
    [0.5, 0.2, 0.35, 0.7, 0.9],
  ];
  return (
    <>
      {heat.map((row, r) =>
        row.map((o, c) => (
          <rect key={`${r}-${c}`} x={3 + c * 5.5} y={5.75 + r * 5.5} width="4" height="4" rx="1" fill="currentColor" opacity={o} />
        )),
      )}
    </>
  );
}

// a thermostat dial
function Dial() {
  const at = (deg: number, r: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [16 + r * Math.cos(a), 16 + r * Math.sin(a)];
  };
  const ticks = [-120, -80, -40, 0, 40, 80, 120];
  const [px, py] = at(40, 6);
  return (
    <>
      <circle cx="16" cy="16" r="12" {...stroke} />
      {ticks.map((d) => {
        const [x1, y1] = at(d, 8.5);
        const [x2, y2] = at(d, 10);
        return <line key={d} x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} strokeWidth="1.25" opacity={d <= 40 ? 1 : 0.35} />;
      })}
      <line x1="16" y1="16" x2={px} y2={py} {...stroke} />
      <circle cx="16" cy="16" r="1.75" fill="currentColor" />
    </>
  );
}

// a chip with an LED in the middle
function Chip() {
  const pins = [12.5, 16, 19.5];
  return (
    <>
      <rect x="9" y="9" width="14" height="14" rx="2.5" {...stroke} />
      {pins.map((p) => (
        <g key={p} {...stroke} strokeWidth="1.5">
          <line x1={p} y1="5" x2={p} y2="9" />
          <line x1={p} y1="23" x2={p} y2="27" />
          <line x1="5" y1={p} x2="9" y2={p} />
          <line x1="23" y1={p} x2="27" y2={p} />
        </g>
      ))}
      <circle cx="16" cy="16" r="2.75" fill="currentColor" />
      <circle cx="16" cy="16" r="5" fill="currentColor" opacity=".18" />
    </>
  );
}

// a call button beside lights that dim through the day
function CallBoard() {
  return (
    <>
      <rect x="4" y="7" width="24" height="18" rx="4" {...stroke} />
      <circle cx="12" cy="16" r="4.5" {...stroke} />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      {[1, 0.55, 0.2].map((o, i) => (
        <circle key={i} cx="21.5" cy={11.5 + i * 4.5} r="1.6" fill="currentColor" opacity={o} />
      ))}
    </>
  );
}

// a glider, with a ghost of where it was a step ago
function Glider() {
  const shape = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
  const cell = (ox: number, oy: number, ghost: boolean) =>
    shape.map(([c, r]) => (
      <rect
        key={`${ghost}-${c}-${r}`}
        x={ox + c * 7.5}
        y={oy + r * 7.5}
        width="6"
        height="6"
        rx="1.5"
        {...(ghost ? { ...stroke, strokeWidth: 1.25, opacity: 0.4 } : { fill: "currentColor" })}
      />
    ));
  return (
    <>
      {cell(2, 2, true)}
      {cell(9.5, 9.5, false)}
    </>
  );
}

const drawings = { palette: Palette, heatmap: Heatmap, dial: Dial, chip: Chip, callboard: CallBoard, glider: Glider };

export type ProjectIcon = keyof typeof drawings;

export default function ProjectIcon({ name }: { name: ProjectIcon }) {
  const Drawing = drawings[name];
  return (
    <svg viewBox="0 0 32 32" className="size-10" aria-hidden>
      <Drawing />
    </svg>
  );
}
