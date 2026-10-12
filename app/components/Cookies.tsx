"use client";

import React, { useEffect, useState } from "react";

type Consent = "accepted" | "declined";

const STORAGE_KEY = "cookie-consent";

const Cookies = () => {
  // Start hidden and decide after mount: localStorage doesn't exist during SSR,
  // so reading it in the initial state would cause a hydration mismatch
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage can throw (private mode, blocked cookies); showing the banner is the safe fallback
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Choice just won't persist across visits; still dismiss for this session
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-5 max-w-md w-full left-4 right-4 z-50 flex items-center justify-between gap-2 bg-black md:left-auto md:right-10 md:max-w-xs"
    >
      <span className="px-2 p-1 text-sm font-semibold tracking-tight text-white">
        We use{" "}
        <a
          href="/cookies"
          className="cursor-pointer underline underline-offset-2"
        >
          cookies
        </a>
        .
      </span>

      <div className="flex gap-2 text-sm font-semibold tracking-tight text-white">
        <button
          type="button"
          onClick={() => handleChoice("accepted")}
          className="cursor-pointer border-l border-white/30 px-2 p-0.5 underline underline-offset-2"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => handleChoice("declined")}
          className="cursor-pointer border-l border-white/30 px-2 p-0.5 underline underline-offset-2"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default Cookies;
