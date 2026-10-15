import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maintenance | Mabz Loans",
  description: "Mabz Loans is carrying out scheduled website maintenance.",
};

export default function MaintenancePage() {
  return (
    <main className="pointer-events-none fixed inset-0 z-0 flex min-h-dvh items-center justify-center overflow-y-auto bg-[#003b70] px-6 py-24 text-white">
      <section
        aria-labelledby="maintenance-title"
        className="pointer-events-auto w-full max-w-2xl items-center justify-center text-center"
      >
        <div aria-hidden="true" className="mx-auto mb-6 h-1 w-20 bg-[#ff8500]" />
        <div
          aria-hidden="true"
          className="mx-auto mb-10 hidden flex size-15 items-center justify-center rounded-full border border-[#ff8500]/50 bg-[#ff8500]/10"
        >
          <svg viewBox="0 0 48 48" fill="none" className="size-8 text-white">
            <path
              d="M29.5 8.5a11 11 0 0 0-13.9 13.9L7 31a6 6 0 0 0 8.5 8.5l8.6-8.6A11 11 0 0 0 38 17l-7 7-7-7 7-7Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          id="maintenance-title"
          className="mon geist -mt-4 mx-auto mb-2 max-w-xs overflow-hidden text-center text-xl font-semibold tracking-tighter text-white"
        >
          We&apos;ll be back soon
        </h1>

        <p className="geist mx-auto max-w-xs overflow-hidden text-center text-[13px] font-semibold leading-4 tracking-tight text-white/75">
          We&apos;re making a few improvements to our website. Please check back
          shortly. For enquiries in the meantime, get in touch with us directly.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="mailto:mabzloans@gmail.com"
            className="geist max-h-8 w-fit rounded-3xl border border-[#ff8500] bg-[#ff8500] px-3 py-1.5 text-sm font-semibold leading-4 tracking-tight text-[#003b70] transition-colors hover:bg-[#ff9a2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [overflow-wrap:anywhere]"
          >
            Email us
          </Link>
          <Link
            href="tel:0782193521"
            className="geist max-h-8 w-fit rounded-3xl border border-[#ff8500] bg-[#ff8500] px-3 py-1.5 text-sm font-semibold leading-4 tracking-tight text-[#003b70] transition-colors hover:bg-[#ff9a2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [overflow-wrap:anywhere]"
          >
            Call us
          </Link>
        </div>
      </section>
    </main>
  );
}
