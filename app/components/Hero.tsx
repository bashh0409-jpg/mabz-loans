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

// useLayoutEffect warns during SSR; falling back to useEffect on the server avoids that,
// while the client still sets the hidden start state before first paint (no flash of content)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Hero = ({
  eyebrow = "Loans, made simple",
  lines = ["Your bridge", "to better", "finance."],
  description = "Tell us what you need. Call or email and we'll walk you through the options.",
  phone = "08123456789",
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
      className="relative isolate flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#0c0558] px-4 pb-6 pt-24 text-white md:pt-28"
    >
      {/* Soft top-right glow for depth; purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_5%,rgba(110,90,255,0.35),transparent_55%)]"
      />

      {/* The "bridge": a single arc drawn behind the headline */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[65%] w-full"
      >
        {/* pathLength=1 normalizes the length so dash values 1 -> 0 draw the full path */}
        <path
          data-arc
          d="M0,400 C300,40 900,40 1200,400"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
        />
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
              className="bg-white px-5 py-3 text-[#0c0558] transition-colors hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Call us
            </a>
            <a
              href={`mailto:${email}`}
              className="border border-white/40 px-5 py-3 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

/*
 * Design note
 * - pt-24/md:pt-28 clears the fixed navbar; the navbar's mix-blend-difference inverts
 *   against the navy so it stays legible without a background.
 * - The headline uses a clamp() size so three lines always fit the viewport width;
 *   at 11vw the widest line ("Your bridge") stays under ~75% of the screen.
 * - Line reveal = outer overflow-hidden mask + inner span translated with yPercent,
 *   so the motion is independent of font size.
 * - The arc uses slice + xMidYMax so it stays anchored to the bottom and crops
 *   symmetrically on narrow screens instead of squashing.
 * - Reduced-motion users skip all tweens; every element is already in its final state in CSS.
 */
