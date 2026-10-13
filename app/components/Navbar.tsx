"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

const LINKS = [
  { label: "Info", href: "/#requirements" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Faq", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

const NAV_ITEM_CLASSES =
  "relative inline-block w-fit transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none";

const CLIP_CLOSED = "inset(0% 0% 100% 0%)";
const CLIP_OPEN = "inset(0% 0% 0% 0%)";

// Initial state lives in the markup so the panel never flashes before hydration.
const PANEL_INITIAL_STYLE: React.CSSProperties = {
  clipPath: CLIP_CLOSED,
  visibility: "hidden",
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animateNavText = (
  event: React.PointerEvent<HTMLAnchorElement>,
  hovered: boolean,
) => {
  if (prefersReducedMotion()) return;

  const track =
    event.currentTarget.querySelector<HTMLElement>("[data-nav-track]");
  const firstLabel = track?.firstElementChild;
  if (!track || !(firstLabel instanceof HTMLElement)) return;

  gsap.to(track, {
    y: hovered ? -firstLabel.offsetHeight : 0,
    duration: 0.35,
    ease: "power2.inOut",
    overwrite: "auto",
  });
};

const navTextHandlers = {
  onPointerEnter: (event: React.PointerEvent<HTMLAnchorElement>) =>
    animateNavText(event, true),
  onPointerLeave: (event: React.PointerEvent<HTMLAnchorElement>) =>
    animateNavText(event, false),
};

interface RollingLabelProps {
  label: string;
}

// Two stacked copies of the label; the track slides up on hover to swap them.
const RollingLabel = ({ label }: RollingLabelProps) => (
  <span className="inline-flex h-[1.2em] overflow-hidden align-middle">
    <span data-nav-track className="flex flex-col">
      <span className="flex h-[1.2em] items-center">{label}</span>
      <span aria-hidden="true" className="flex h-[1.2em] items-center">
        {label}
      </span>
    </span>
  </span>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const links = panel.querySelectorAll<HTMLElement>("[data-menu-link]");
    const reduced = prefersReducedMotion();

    if (menuOpen) {
      gsap.set(panel, { visibility: "visible" });
      gsap.fromTo(
        panel,
        { clipPath: CLIP_CLOSED },
        {
          clipPath: CLIP_OPEN,
          duration: reduced ? 0 : 0.8,
          ease: "power4.inOut",
          overwrite: "auto",
        },
      );
      if (!reduced) {
        // Links start fading in as the clip is ~40% open, so they never appear before their area is visible
        gsap.fromTo(
          links,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.3,
          },
        );
      }
    } else {
      gsap.to(panel, {
        clipPath: CLIP_CLOSED,
        duration: reduced ? 0 : 0.6,
        ease: "power4.inOut",
        overwrite: "auto",
        // Hide after the wipe so closed links leave the tab order
        onComplete: () => {
          gsap.set(panel, { visibility: "hidden" });
        },
      });
    }

    // kill() rather than revert(): revert would snap the panel back mid-transition
    return () => {
      gsap.killTweensOf([panel, ...Array.from(links)]);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !navRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // The panel is md:hidden, so close it on desktop widths or the nav would stay in its "open" colour
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Blend only while closed; when open the nav sits on a white panel,
          so it switches to navy text with no blending. */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-[100] flex w-full items-center justify-between bg-transparent p-4 text-xl font-semibold tracking-tight ${
          menuOpen
            ? "text-[#0c0558] mix-blend-normal"
            : "text-white mix-blend-difference"
        }`}
      >
        <Link
          href="/#home"
          className={`uppercase ${NAV_ITEM_CLASSES}`}
          aria-label="Mabz Loans"
          onClick={() => setMenuOpen(false)}
          {...navTextHandlers}
        >
          <RollingLabel label="Mabz Loans" />
        </Link>

        <div className="hidden gap-3 md:flex">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`uppercase ${NAV_ITEM_CLASSES}`}
              aria-label={label}
              {...navTextHandlers}
            >
              <RollingLabel label={label} />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="uppercase md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Sibling of <nav>, not a child: mix-blend-mode on a parent creates a
          stacking context that would force the panel to blend too. */}
      <div
        ref={panelRef}
        id="mobile-navigation"
        style={PANEL_INITIAL_STYLE}
        className="fixed top-0 left-0 z-[90] flex min-h-fit w-full flex-col border-b border-[#0c0558]/10 bg-white px-4 pt-24 pb-8 text-2xl font-semibold tracking-tight text-[#0c0558] md:hidden"
      >
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            
            className={`uppercase ${NAV_ITEM_CLASSES}`}
            aria-label={label}
            onClick={() => setMenuOpen(false)}
            {...navTextHandlers}
          >
            <RollingLabel label={label} />
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
