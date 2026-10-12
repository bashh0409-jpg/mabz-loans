"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function useScrollTextReveal<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = gsap.utils.toArray<HTMLElement>(
        "[data-text-reveal]",
        section,
      );

      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            y: 36,
            autoAlpha: 0,
            filter: "blur(8px)",
            clipPath: "inset(0 0 100% 0)",
          },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            delay: (index % 3) * 0.06,
            ease: "power4.out",
            clearProps: "filter,clipPath",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    });

    return () => media.revert();
  }, []);

  return sectionRef;
}
