// ContourLines.tsx
import React from "react";

interface ContourLinesProps {
  className?: string;
}

interface Arc {
  d: string;
  opacity: number;
  width: number;
}

const ARCS: Arc[] = [
  {
    d: "M-120 120 C180 220 420 280 660 420 S1040 620 1320 700",
    opacity: 0.78,
    width: 1.5,
  },
  {
    d: "M-120 170 C200 265 450 330 700 470 S1045 640 1320 720",
    opacity: 0.58,
    width: 1.25,
  },
  {
    d: "M-120 220 C220 300 470 380 730 520 S1085 660 1320 740",
    opacity: 0.42,
    width: 1,
  },
  {
    d: "M-120 270 C240 340 500 430 760 570 S1110 680 1320 760",
    opacity: 0.28,
    width: 1,
  },
  {
    d: "M-120 320 C260 390 530 480 790 620 S1135 700 1320 780",
    opacity: 0.18,
    width: 1,
  },
];

// Flips x around the viewBox centre (x' = 1200 - x), turning the top-left → bottom-right
// curves into bottom-left → top-right ones without maintaining a second set of paths
const MIRROR = "matrix(-1 0 0 1 1200 0)";

// Stroke is currentColor so the parent's text colour decides the line colour; this keeps
// the component reusable on any background without a colour prop
const ContourLines = ({ className }: ContourLinesProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1200 720"
    preserveAspectRatio="xMidYMid slice"
    className={className}
  >
    <g
      transform={MIRROR}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      {ARCS.map(({ d, opacity, width }) => (
        <path key={d} d={d} strokeOpacity={opacity} strokeWidth={width} />
      ))}
    </g>
  </svg>
);

export default ContourLines;
