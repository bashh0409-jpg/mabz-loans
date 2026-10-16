"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

interface NewHeroProps {
  eyebrow?: string;
  statement?: string;
  callHref?: string;
  emailHref?: string;
  wordmark?: string;
  scrollHint?: string;
  phonr?: string;
}

interface HeroAction {
  label: string;
  href: string;
}

// Inline SVG noise (feTurbulence) as a data URI: no asset request, resolution-independent.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Brand palette (taken from the Mabz Cash Loans site). Nothing outside these three is used in this component.
const ORANGE = "#ff8500";
const WHITE = "#ffffff";

// Orange base with a white bloom from the top-right. Blending white over orange yields the peach falloff for
// free, so the gradient stays inside the palette. Navy is deliberately not used as a gradient layer: alpha-
// blending navy over orange turns muddy brown, so navy is reserved for type and buttons where it stays crisp.
const GRADIENT = [
  `radial-gradient(75% 85% at 100% 0%, ${WHITE} 0%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0) 62%)`,
  `radial-gradient(90% 100% at 80% 55%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)`,
  ORANGE,
].join(", ");

const NewHero = forwardRef<HTMLElement, NewHeroProps>(function NewHero(
  {
    eyebrow = "Need cash fast? We got you.",
    statement = "Tell us what you need. Call or email and we'll walk you through the options.",
    callHref = "tel:0782193521",
    emailHref = "mailto:mabzloans@gmail.com",
    wordmark = "MabsLoans",
    scrollHint = "(Scroll for more)",
  },
  ref,
) {
  const rootRef = useRef<HTMLElement>(null);

  // Expose the section element to parents while keeping a private ref for GSAP scoping.
  useImperativeHandle(ref, () => rootRef.current as HTMLElement);

  // Data-driven so both buttons share one set of classes instead of drifting apart.
  const actions: HeroAction[] = [
    { label: "Call Now", href: callHref },
    { label: "Email Now", href: emailHref },
  ];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // gsap.context scopes selectors to this component and lets revert() undo everything on unmount.
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // One orchestrated moment: wordmark rises through its mask, then the copy settles in.
        tl.fromTo(
          "[data-letter]",
          { yPercent: 110, autoAlpha: 1 },
          { yPercent: 0, duration: 1.3, stagger: 0.06 },
        ).fromTo(
          "[data-fade]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.9",
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-letter]", { yPercent: 0, autoAlpha: 1 });
        gsap.set("[data-fade]", { autoAlpha: 1, y: 0 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      // Mobile: the copy block is centered in the space above the wordmark (see wrapper below).
      // md+: copy pinned toward the top, wordmark at the bottom, as in the reference.
      // Navy type on orange: white on #ff8500 is only ~2.5:1, navy is ~4.5:1.
      className="relative isolate flex min-h-dvh w-full flex-col justify-between overflow-hidden px-5 pt-16 text-[#003b70] sm:px-8 md:px-10 md:pt-[18vh]"
      style={{ background: GRADIENT }}
    >
      {/* Grain sits above the gradient but below content; overlay blend adds texture without shifting hue. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "220px 220px" }}
      />

      {/* flex-1 + justify-center centers the copy between the top edge and the wordmark on phones. */}
      <div className="flex flex-1 flex-col justify-center py-8 md:block md:flex-none md:py-0">
        <div className="max-w-[min(34rem,100%)]">
          <p
            data-fade
            className="invisible font-mono text-[0.72rem] font-semibold uppercase tracking-tight md:text-[0.78rem]"
          >
            {eyebrow}
          </p>

          <p
            data-fade
            className="invisible mt-3 uppercase text-[clamp(1.3rem,5.6vw,1.75rem)] font-semibold leading-[1.12] tracking-tighter md:mt-6 md:text-[clamp(1.6rem,3.4vw,2.6rem)] md:leading-[1.08]"
          >
            {statement}
          </p>

          {/* Side by side on phones (flex-1) so both actions sit in thumb reach on one row. */}
          <div className="mt-6 flex gap-2.5 md:mt-10 md:gap-1">
            {actions.map(({ label, href }) => (
              <a
                key={label}
                data-fade
                href={href}
                // Navy buttons invert the old orange ones: they're the strongest contrast on the page.
                className="group invisible tracking-tight uppercase inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#003b70] px-4 py-2 text-[0.85rem] font-semibold text-[#ffffff] outline-none transition-colors hover:bg-[#ffffff] hover:text-[#003b70] focus-visible:ring-2 focus-visible:ring-[#003b70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ff8500] md:flex-none md:gap-3 md:px-4 md:py-2 md:text-[0.95rem]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="md:mt-16">
        <p
          data-fade
          className="invisible mb-2 text-right font-mono text-xs font-medium uppercase tracking-tight md:mb-4 md:text-xs"
        >
          {scrollHint}
        </p>

        {/* aria-label on the h1 + aria-hidden letters so screen readers read one word, not nine fragments. */}
        <h1
          aria-label={wordmark}
          className="-mx-[0.02em] mb-[-0.05em] flex select-none text-[18vw] font-bold leading-[0.82] tracking-tighter"
        >
          {wordmark.split("").map((char, i) => (
            <span
              key={`${char}-${i}`}
              aria-hidden
              // Per-letter mask: overflow-hidden clips the inner span while it translates up.
              className="inline-block overflow-hidde pb-[0.08em] pt-[0.02em]"
            >
              <span
                data-letter
                // `invisible` hides the letters pre-hydration; an inline transform would conflict with
                // GSAP's yPercent (it parses the matrix into px `y`, leaving the letters stuck offscreen).
                className="invisible inline-block w-full"
              >
                {char}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
});

export default NewHero;
