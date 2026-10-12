"use client";

import React from "react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "Info", href: "#requirements" },
    { label: "Privacy", href: "/privacy" },
    { label: "Faq", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed z-[100] flex w-full items-center justify-between p-4 text-xl font-semibold tracking-tight text-white mix-blend-difference">
      <a href="#home" className="uppercase">
        Mabz Loans
      </a>

      <div className="hidden gap-3 md:flex">
        {links.map(({ label, href }) => (
          <a key={label} href={href} className="uppercase">
            {label}
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
              className="uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
