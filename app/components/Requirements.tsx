"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Requirement {
  title: string;
}

interface RequirementsProps {
  heading?: string;
  items?: Requirement[];
  banner?: string;
}

const DEFAULT_ITEMS: Requirement[] = [
  { title: "South African Original ID" },
  { title: "3-Month Bank Statement" },
  { title: "Latest Payslip" },
];

gsap.registerPlugin(ScrollTrigger);

// Same SSR-safe pattern as Hero: sets the hidden start state before first paint on the client
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Requirements = ({
  heading = "What you need",
  items = DEFAULT_ITEMS,
  banner = "We help both employed & SASSA beneficiaries!",
}: RequirementsProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia();

    // Reduced-motion users skip the tween entirely; CSS already shows the final state
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(q("[data-card]"), {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });
    });

    return () => mm.revert(); // kills the tween and its ScrollTrigger together
  }, []);

  return (
    <section
      ref={sectionRef}
      id="requirements"
      aria-labelledby="requirements-heading"
      className="w-full bg-white text-black"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 md:gap-16 md:px-8 md:py-32">
        <div className="flex flex-col  gap-y-4">
          <h2
            id="requirements-heading"
            className="col-span-12  text-[clamp(2rem,6vw,7rem)] font-semibold uppercase leading-[0.9] tracking-tighter md:col-span-8"
          >
            {heading}
          </h2>
          <p className="col-span-12 text-sm font-semibold uppercase tracking-tight max-w-md text-black/60 md:col-span-4">
            Bring these three documents to your appointment and we can get started.
          </p>
        </div>

        {/* ol because the order is the checklist; 1 col phone, 3 cols from md */}
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map(({ title }, i) => (
            <li
              key={title}
              data-card
              // group lets the number and title restyle together when the card is hovered or focused
              className="group flex min-h-[16rem] flex-col justify-between bg-black/5 p-5 transition-colors duration-300 hover:bg-[#0c0558] hover:text-white md:aspect-[4/5] md:min-h-0"
            >
              {/* padStart keeps numerals aligned as 01, 02, 03 */}
              <span className="text-sm font-semibold tracking-tight text-black/50 transition-colors group-hover:text-white/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold uppercase leading-[0.95] tracking-tighter">
                {title}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Full-bleed banner outside the max-width wrapper so the navy runs edge to edge */}
      <div className="w-full bg-[#0c0558] px-4 py-10 text-white md:px-8 md:py-14">
        <p className="mx-auto max-w-7xl text-[clamp(1.5rem,4.5vw,4rem)] font-semibold uppercase leading-[0.95] tracking-tighter">
          {banner}
        </p>
      </div>
    </section>
  );
};

export default Requirements;

/*
 * Design note
 * - Cards reuse the 4/5 ratio from the earlier placeholders on desktop only; on mobile a fixed
 *   min-height avoids three very tall stacked cards.
 * - Hover inverts to the hero navy so the section visually ties back to the hero and banner.
 * - `once: true` on the ScrollTrigger means the reveal never replays on scroll-back,
 *   which would feel jittery on a content page.
 * - The banner sits outside the max-w-7xl wrapper (full bleed) but its text re-enters the
 *   same max-width, so the left edge aligns with the heading and cards above.
 */
