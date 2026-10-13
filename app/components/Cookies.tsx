"use client";

import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useSyncExternalStore } from "react";

const consentStorageKey = "weeverything-cookie-consent";

type ConsentChoice = "accepted" | "rejected";

const getStoredChoice = (): ConsentChoice | null => {
  const storedChoice = window.localStorage.getItem(consentStorageKey);

  return storedChoice === "accepted" || storedChoice === "rejected"
    ? storedChoice
    : null;
};

const subscribeToChoice = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(consentStorageKey, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(consentStorageKey, onChange);
  };
};

const CookieConsent = () => {
  const choice = useSyncExternalStore(
    subscribeToChoice,
    getStoredChoice,
    () => null,
  );

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(consentStorageKey, nextChoice);
    window.dispatchEvent(new Event(consentStorageKey));
  };

  return (
    <>
      {choice === "accepted" ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}

      {choice === null ? (
        <aside
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 rounded-2xl z-[60] border border-black/15 bg-white p-2 shadow-[0_18px_60px_rgb(0_0_0/18%)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm"
        >
          <p className="text-sm mon leading-4 geist tracking-tight font-medium uppercas text-[#999]">
            We use necessary <a href="/cookies" className="underline  hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white">cookies</a> to keep the site working. With your
            permission, Vercel Analytics and Speed Insights help us understand
            site usage and performance.
          </p>
          <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
            <span className="gap-1 flex">
              <button
                type="button"
                onClick={() => saveChoice("accepted")}
                className="w-fit  geist cursor-pointer capitalize max-h-7 rounded-3xl border border-black/10 bg-black/[0.03] px-2 py-1 text-sm font-medium leading-4 tracking-tight text-[#333] [overflow-wrap:anywhere]"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => saveChoice("rejected")}
                className="w-fit  geist cursor-pointer capitalize max-h-7 rounded-3xl border border-black/10 bg-black/[0.03] px-2 py-1 text-sm font-medium leading-4 tracking-tight text-[#333] [overflow-wrap:anywhere]"
              >
                Decline
              </button>
            </span>
            <Link
              href="/cookies"
              className="w-fit  geist cursor-pointer capitalize max-h-7 rounded-3xl border border-black/10 bg-black/[0.03] px-2 py-1 text-sm font-medium leading-4 tracking-tight text-[#333] [overflow-wrap:anywhere]"
            >
              Learn more
            </Link>
          </div>
        </aside>
      ) : null}
    </>
  );
};

export default CookieConsent;
