"use client";

import React, { useId, useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  items?: FaqItem[];
}

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: "What documents do I need?",
    answer:
      "Your original ID, your 3-month bank statement and your latest payslip.",
  },
  {
    question: "Do you help SASSA beneficiaries?",
    answer: "Yes. We help both employed clients and SASSA beneficiaries.",
  },
  {
    question: "Can I apply online?",
    answer:
      "Not at the moment. Call or email us and we'll guide you through the next steps.",
  },
  {
    question: "How much will the loan cost?",
    answer:
      "The cost depends on the amount you borrow and how long you take to repay it. Contact us for a quote.",
  },
];

const Faq = ({ heading = "Questions", items = DEFAULT_ITEMS }: FaqProps) => {
  // Single-open accordion: one index (or null) is simpler than a Set and keeps the page short
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // useId keeps aria ids unique and stable across SSR and hydration
  const baseId = useId();

  const toggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full bg-white text-black"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-y-10 px-4 py-20 md:px-8 md:py-32">
        <h2
          id="faq-heading"
          className="col-span-12 text-[clamp(2rem,4vw,7rem)] font-semibold uppercase leading-[0.9] tracking-tighter md:col-span-5"
        >
          {heading}
        </h2>

        <ul className="col-span-12 md:col-span-7">
          {items.map(({ question, answer }, i) => {
            const isOpen = openIndex === i;
            const buttonId = `${baseId}-button-${i}`;
            const panelId = `${baseId}-panel-${i}`;

            return (
              <li
                key={question}
                className="border-t border-black/15 last:border-b"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-[clamp(1.25rem,2.6vw,2rem)] font-semibold uppercas leading-none tracking-tighter focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0558]"
                  >
                    <span>{question}</span>
                    {/* Decorative: rotating the + 45deg turns it into an x without a second icon */}
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-3xl font-medium leading-none transition-transform duration-300 motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                {/* Animating grid-template-rows 0fr -> 1fr gives a smooth height transition
                    without measuring content in JS */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-base font-medium tracking-tight text-black/70">
                      {answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Faq;

