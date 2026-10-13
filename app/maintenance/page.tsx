import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maintenance | Mabz Loans",
  description: "Mabz Loans is carrying out scheduled website maintenance.",
};

export default function MaintenancePage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#0c0558] px-6 py-24 text-white">
      <section
        aria-labelledby="maintenance-title"
        className="w-full max-w-2xl items-center justify-center text-center"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-10 hidden flex size-15 items-center justify-center rounded-full border border-white/20 bg-white/5"
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

        <p className="mon geist -mt-4 mx-auto  max-w-xs text-center  overflow-hidden text-xl font-semibold tracking-tighter text-blac mb-2 ">
          We&apos;ll be back soon
        </p>

        <p className="geist  max-w-xs mx-auto text-center  overflow-hidden text-[13px] font-semibold leading-3 tracking-tight text-[#999]">
          We&apos;re making a few improvements to our website. Please check back
          shortly. For enquiries in the meantime, get in touch with us directly.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-1">
          <Link
            href="mailto:mabzloans@gmail.com"
            className="w-fit  geist capitalize max-h-7 rounded-3xl border border-white/10 bg-white px-2 py-1 text-sm font-medium leading-4 tracking-tight text-black [overflow-wrap:anywhere]"
          >
            Email us
          </Link>
          <Link
            href="tel:0782193521"
            
            className="w-fit  geist capitalize max-h-7 rounded-3xl border border-white/10 bg-white px-2 py-1 text-sm font-medium leading-4 tracking-tight text-black [overflow-wrap:anywhere]"
          >
            Call us
          </Link>
        </div>
      </section>
    </main>
  );
}
