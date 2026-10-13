"use client";

import React from "react";
import Link from "next/link";
import useScrollTextReveal from "./useScrollTextReveal";

interface ContactProps {
  phones?: string[];
  email?: string;
}

const Contact = ({
  phones = ["078 2193 521", "082 891 4983"],
  email = "mabzloans@gmail.com",
}: ContactProps) => {
  const sectionRef = useScrollTextReveal<HTMLElement>();
  const linkStyles =
    "w-fit text-[clamp(1.5rem,4vw,3rem)] font-semibold tracking-tighter underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-[#0c0558] text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 md:gap-20 md:px-8 md:py-32">
        <p className="text-sm text-justify font-medium tracking-tight text-[#999]">
          NCR Registered - CP21885
        </p>
        <h2
          id="contact-heading"
          data-text-reveal
          className="text-[clamp(3rem,11vw,10rem)] font-semibold uppercase leading-[0.9] tracking-tighter"
        >
          Let&apos;s talk.
        </h2>
        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
            <p
              data-text-reveal
              className="text-sm font-semibold uppercase tracking-tight text-white/60"
            >
              Call
            </p>
            {phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className={linkStyles}
                data-text-reveal
              >
                {phone}
              </a>
            ))}
          </div>

          <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
            <p
              data-text-reveal
              className="text-sm font-semibold uppercase tracking-tight text-white/60"
            >
              Email
            </p>
            {/* break-all stops a long address from overflowing narrow phones */}
            <a
              href={`mailto:${email}`}
              className={`${linkStyles} break-all`}
              data-text-reveal
            >
              {email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-3 px-4 py-6 md:flex-row md:items-center md:px-8">
        <p className="text-base text-justify font-medium tracking-tight text-white">
          &copy;2026 Mabz Loans. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-base font-medium tracking-tight text-white">
          <Link
            href="/privacy"
            className="underline-offset-4 hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies"
            className="underline-offset-4 hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            Cookie Policy
          </Link>
          <Link
            href="/terms"
            className="underline-offset-4 hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            Terms &amp; Conditions
          </Link>
          <a
            href="mailto:bashh0409@gmail.com"
            className="underline-offset-4 tracking-tight hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            TheWiseStudio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
