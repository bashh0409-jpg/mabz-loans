"use client";

import React from "react";
import { useState } from "react";
import gsap from "gsap";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const animateNavText = (
    event: React.PointerEvent<HTMLAnchorElement>,
    hovered: boolean,
  ) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = event.currentTarget.querySelector<HTMLElement>(
      "[data-nav-track]",
    );
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
  const links = [
    { label: "Info", href: "#requirements" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Faq", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];
  const navItemClasses =
    "relative inline-block w-fit transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none";

  return (
    <nav className="fixed z-[100] flex w-full items-center justify-between p-4 text-xl font-semibold tracking-tight text-white mix-blend-difference">
      <a
        href="#home"
        className={`uppercase ${navItemClasses}`}
        aria-label="Mabz Loans"
        {...navTextHandlers}
      >
        <span className="inline-flex h-[1.2em] overflow-hidden align-middle">
          <span data-nav-track className="flex flex-col">
            <span className="flex h-[1.2em] items-center">Mabz Loans</span>
            <span aria-hidden="true" className="flex h-[1.2em] items-center">
              Mabz Loans
            </span>
          </span>
        </span>
      </a>

      <div className="hidden gap-3 md:flex">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`uppercase ${navItemClasses}`}
            aria-label={label}
            {...navTextHandlers}
          >
            <span className="inline-flex h-[1.2em] overflow-hidden align-middle">
              <span data-nav-track className="flex flex-col">
                <span className="flex h-[1.2em] items-center">{label}</span>
                <span aria-hidden="true" className="flex h-[1.2em] items-center">
                  {label}
                </span>
              </span>
            </span>
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

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-full right-4 flex min-w-40 flex-col gap-3 bg-[#0c0558] p-4 text-base text-white mix-blend-normal md:hidden"
        >
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`uppercase ${navItemClasses}`}
              aria-label={label}
              {...navTextHandlers}
              onClick={() => setMenuOpen(false)}
            >
              <span className="inline-flex h-[1.2em] overflow-hidden align-middle">
                <span data-nav-track className="flex flex-col">
                  <span className="flex h-[1.2em] items-center">{label}</span>
                  <span aria-hidden="true" className="flex h-[1.2em] items-center">
                    {label}
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
