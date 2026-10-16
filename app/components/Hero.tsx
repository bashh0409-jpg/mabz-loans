"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  eyebrow?: string;
  lines?: [string, string, string];
  description?: string;
  phone?: string;
  email?: string;
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

// Flips x around the viewBox centre (x' = 1200 - x); reuses ARCS so both sets stay in sync
const MIRROR = "matrix(-1 0 0 1 1200 0)";

// Larger R = flatter curve. Radius 1500 over the 1440 chord gives ~184px of curvature.
const CIRCLE_RADIUS = 1500;

// Bottom set: baseline shifted down per line so they stack like the diagonal sets.
// Sweep-flag 0 bulges upward when travelling right → left; each path starts bottom-right
// so the draw-on runs that way too.
const buildBottomCircle = (baselineY: number): string =>
  `M1320 ${baselineY} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 0 -120 ${baselineY}`;

// Top set: travelling left → right with sweep-flag 0 puts the centre above the chord,
// so each line sags downward and mirrors the bottom set's upward bulge.
const buildTopCircle = (baselineY: number): string =>
  `M-120 ${baselineY} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 0 1320 ${baselineY}`;

// Side sets: vertical chords overshoot the viewBox (-120 → 840) so the ends never show.
// Radius 1200 over the 960 chord gives ~100px of inward bulge.
const SIDE_RADIUS = 1200;

// Left edge, top → bottom. Sweep-flag 1 (clockwise) travelling downward passes through the
// right side, so the line bows inward toward the headline.
const buildLeftCircle = (baselineX: number): string =>
  `M${baselineX} -120 A ${SIDE_RADIUS} ${SIDE_RADIUS} 0 0 1 ${baselineX} 840`;

// Right edge, top → bottom. Sweep-flag 0 (counter-clockwise) travelling downward passes through
// the left side, so it bows inward too, mirroring the left set.
const buildRightCircle = (baselineX: number): string =>
  `M${baselineX} -120 A ${SIDE_RADIUS} ${SIDE_RADIUS} 0 0 0 ${baselineX} 840`;

const BOTTOM_CIRCLE_ARCS: Arc[] = [
  { d: buildBottomCircle(610), opacity: 0.6, width: 1.5 },
  { d: buildBottomCircle(655), opacity: 0.5, width: 1.25 },
  { d: buildBottomCircle(700), opacity: 0.4, width: 1 },
  { d: buildBottomCircle(745), opacity: 0.28, width: 1 },
  { d: buildBottomCircle(790), opacity: 0.18, width: 1 },
];

// Same 45px spacing as the bottom set, fading downward so the strongest line hugs the top edge
const TOP_CIRCLE_ARCS: Arc[] = [
  { d: buildTopCircle(40), opacity: 0.5, width: 1.5 },
  { d: buildTopCircle(85), opacity: 0.4, width: 1.25 },
  { d: buildTopCircle(130), opacity: 0.3, width: 1 },
  { d: buildTopCircle(175), opacity: 0.2, width: 1 },
  { d: buildTopCircle(220), opacity: 0.12, width: 1 },
];

// 45px spacing moving inward from the edge, fading as they go so the centre stays clear for the headline
const LEFT_CIRCLE_ARCS: Arc[] = [
  { d: buildLeftCircle(0), opacity: 0.5, width: 1.5 },
  { d: buildLeftCircle(45), opacity: 0.4, width: 1.25 },
  { d: buildLeftCircle(90), opacity: 0.3, width: 1 },
  { d: buildLeftCircle(135), opacity: 0.2, width: 1 },
  { d: buildLeftCircle(180), opacity: 0.12, width: 1 },
];

const RIGHT_CIRCLE_ARCS: Arc[] = [
  { d: buildRightCircle(1200), opacity: 0.5, width: 1.5 },
  { d: buildRightCircle(1155), opacity: 0.4, width: 1.25 },
  { d: buildRightCircle(1110), opacity: 0.3, width: 1 },
  { d: buildRightCircle(1065), opacity: 0.2, width: 1 },
  { d: buildRightCircle(1020), opacity: 0.12, width: 1 },
];

// useLayoutEffect warns during SSR; falling back to useEffect on the server avoids that,
// while the client still sets the hidden start state before first paint (no flash of content)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Hero = ({
  eyebrow = "Your bridge to better finances",

  lines = ["Need cash", "fast? We've", "got you!"],
  description = "Tell us what you need. Call or email and we'll walk you through the options.",
  phone = "078 219 3521",
  email = "mabzloans@gmail.com",
}: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Selector scoped to this section; passing element arrays avoids global class collisions
    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia();

    // Only animate when the user hasn't asked for reduced motion; otherwise content simply shows
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(q("[data-line]"), { yPercent: 110, duration: 1.1, stagger: 0.12 })
        .fromTo(
          q("[data-arc]"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
          0.2,
        )
        // Mirrored paths are authored top-right → bottom-left; a negative start offset
        // reveals the dash from the path's end instead, so the draw-on begins bottom-left
        .fromTo(
          q("[data-arc-rev]"),
          { strokeDashoffset: -1 },
          { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
          0.2,
        )
        .from(
          q("[data-fade]"),
          { y: 16, opacity: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6",
        );
    });

    return () => mm.revert(); // kills tweens and restores inline styles (StrictMode-safe)
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#003b70] px-4 pb-6 pt-24 text-white md:pt-28"
    >
      {/* Soft top-right glow for depth; purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_5%,rgb(208, 121, 28),transparent_55%)]"
      />

      {/* Layered bridge-like contours add depth behind the headline */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMax slice"
        data-fade
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[85%] w-full"
      >
        <g fill="none" stroke="#ff8500" strokeLinecap="round">
          {/* Set 1: top-left → bottom-right */}
          {ARCS.map(({ d, opacity, width }) => (
            <path
              key={d}
              data-arc
              d={d}
              strokeOpacity={opacity}
              strokeWidth={width}
              // pathLength only normalises on the shape itself, not on a parent <g>,
              // so it must live here for the 0–1 dash draw-on to work
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
            />
          ))}

          {/* Set 2: mirrored, bottom-left → top-right */}
          <g transform={MIRROR}>
            {ARCS.map(({ d, opacity, width }) => (
              <path
                key={d}
                data-arc-rev
                d={d}
                strokeOpacity={opacity}
                strokeWidth={width}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={0}
              />
            ))}
          </g>

          {/* Set 3: circular contours, bottom-right → bottom-left */}
          {BOTTOM_CIRCLE_ARCS.map(({ d, opacity, width }) => (
            <path
              key={d}
              data-arc
              d={d}
              strokeOpacity={opacity}
              strokeWidth={width}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
            />
          ))}

          {/* Set 4: circular contours, top-left → top-right */}
          {TOP_CIRCLE_ARCS.map(({ d, opacity, width }) => (
            <path
              key={d}
              data-arc
              d={d}
              strokeOpacity={opacity}
              strokeWidth={width}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
            />
          ))}

          {/* Set 5: circular contours, top-left → bottom-left */}
          {LEFT_CIRCLE_ARCS.map(({ d, opacity, width }) => (
            <path
              key={d}
              data-arc
              d={d}
              strokeOpacity={opacity}
              strokeWidth={width}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
            />
          ))}

          {/* Set 6: circular contours, top-right → bottom-right */}
          {RIGHT_CIRCLE_ARCS.map(({ d, opacity, width }) => (
            <path
              key={d}
              data-arc
              d={d}
              strokeOpacity={opacity}
              strokeWidth={width}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
            />
          ))}
        </g>
      </svg>

      <p
        data-fade
        className="text-sm font-semibold uppercase tracking-tight text-white/70"
      >
        {eyebrow}
      </p>

      <h1 className="text-[clamp(3rem,11vw,10rem)] font-semibold uppercase leading-[0.9] tracking-tighter">
        {lines.map((line, i) => (
          // overflow-hidden is the mask the line slides up from; pb stops it clipping glyph bottoms
          <span key={line} className="block overflow-hidden -pb-[0.06em]">
            {/* Middle line indented two columns for an editorial stagger on desktop */}
            <span
              data-line
              className={`block ${i === 1 ? "md:pl-[16.67%]" : ""}`}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div className="grid grid-cols-12">
        <div className="col-span-12 flex flex-col gap-5 md:col-span-5">
          <p
            data-fade
            className="max-w-sm text-base font-medium tracking-tight text-white/80"
          >
            {description}
          </p>

          <div
            data-fade
            className="flex gap-3 text-sm font-semibold uppercase tracking-tight"
          >
            <a
              href={`tel:${phone}`}
              className="bg-[#ff8500] px-5 py-3 text-[#003b70] transition-colors hover:bg-[#ff9d2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Call us
            </a>
            <a
              href={`mailto:${email}`}
              className="border border-white/40 hover:border-[#ff9d2e] hover:text-[#003b70] px-5 py-3 transition-colors hover:bg-[#ff9d2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
