"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";

interface BannerTickerProps {
  banner?: string;
  /** Seconds for one full loop; higher is slower. */
  duration?: number;
  className?: string;
}

const DEFAULT_BANNER = "We help both employed & SASSA beneficiaries!";
const COPIES_PER_GROUP = 4;

export const BannerTicker = forwardRef<HTMLDivElement, BannerTickerProps>(
  function BannerTicker(
    { banner = DEFAULT_BANNER, duration = 30, className = "" },
    ref,
  ) {
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      // matchMedia skips the loop for reduced-motion users and cleans itself up on revert()
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Track holds two identical groups, so moving -50% lands exactly on the start: seamless loop
        const tween = gsap.to(track, {
          xPercent: -50,
          duration,
          ease: "none",
          repeat: -1,
        });

        const slow = () =>
          gsap.to(tween, { timeScale: 0, duration: 0.4, overwrite: true });
        const resume = () =>
          gsap.to(tween, { timeScale: 1, duration: 0.4, overwrite: true });

        // Easing timeScale instead of pause() avoids a jarring hard stop on hover
        track.addEventListener("mouseenter", slow);
        track.addEventListener("mouseleave", resume);

        return () => {
          track.removeEventListener("mouseenter", slow);
          track.removeEventListener("mouseleave", resume);
          tween.kill();
        };
      });

      return () => mm.revert();
    }, [duration]);

    const group = (hidden: boolean) => (
      <div
        className="flex shrink-0 items-center"
        aria-hidden={hidden || undefined}
      >
        {Array.from({ length: COPIES_PER_GROUP }, (_, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap text-lg px-6 md:px-10">{banner}</span>
            <span className="text-sm opacity-60" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    );

    return (
      <div
        ref={ref}
        className={`w-full overflow-hidden bg-[#ff8500] py-10 text-[#003b70] md:py-14 ${className}`}
      >
        <div
          ref={trackRef}
          className="flex w-max text-lg font-semibold uppercase leading-[0.95] tracking-tight will-change-transform"
        >
          {group(false)}
          {/* Second group is a visual duplicate only; hidden from screen readers to avoid repeated announcements */}
          {group(true)}
        </div>
      </div>
    );
  },
);

/*
 * Design note
 * - The banner copy lives in DEFAULT_BANNER so the component renders your text
 *   with zero props, but can still be overridden per page.
 * - Each group repeats the banner 4x so one group is wider than the viewport even
 *   for short strings; raise COPIES_PER_GROUP if you shorten the copy.
 * - Horizontal padding sits on the items, not the wrapper, so text enters and
 *   exits at the screen edges.
 * - No `data-text-reveal` or `max-w-7xl`: a reveal tween would fight the translate,
 *   and a max-width would clip the ticker.
 */
