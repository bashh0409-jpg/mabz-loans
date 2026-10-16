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
        <g
          fill="none"
          stroke="#ff8500"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
        >
          <path
            data-arc
            d="M-120 120 C180 220 420 280 660 420 S1040 620 1320 700"
            strokeOpacity="0.78"
            strokeWidth="1.5"
          />
          <path
            data-arc
            d="M-120 170 C200 265 450 330 700 470 S1045 640 1320 720"
            strokeOpacity="0.58"
            strokeWidth="1.25"
          />
          <path
            data-arc
            d="M-120 220 C220 300 470 380 730 520 S1085 660 1320 740"
            strokeOpacity="0.42"
            strokeWidth="1"
          />
          <path
            data-arc
            d="M-120 270 C240 340 500 430 760 570 S1110 680 1320 760"
            strokeOpacity="0.28"
            strokeWidth="1"
          />
          <path
            data-arc
            d="M-120 320 C260 390 530 480 790 620 S1135 700 1320 780"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
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
