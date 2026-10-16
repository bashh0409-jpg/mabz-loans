import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page could not be found.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-center bg-white px-6 text-center">
      <div className="flex min-h-screen items-center justify-center p-4 text-[#003b70]">
        <div className="text-center items-center flex  flex-col gap-2 max-w-md">
          <p className="mon geist max-w-xs overflow-hidden text-center text-xl font-semibold tracking-tighter text-[#ff8500]">
            404
          </p>
          <p className="mon geist -mt-4 mb-2 max-w-xs overflow-hidden text-center text-xl font-semibold tracking-tighter text-[#003b70]">
            Page not found
          </p>

          <p className="geist max-w-xs overflow-hidden text-center text-[13px] font-semibold leading-4 tracking-tight text-[#52687d]">
            Sorry, we couldn&apos;t find that page. The page you&apos;re looking
            for isn&apos;t here. Let&apos;s get you back to Mabz Cash Loans and
            get closer to your financial goals.
          </p>

          <Link
            href="/"
            className="geist max-h-8 w-fit rounded-3xl border border-[#ff8500] bg-[#ff8500] px-3 py-1.5 text-sm font-semibold leading-4 tracking-tight text-[#003b70] transition-colors hover:bg-[#ff9d2e] [overflow-wrap:anywhere]"
          >
            close
          </Link>
        </div>
      </div>
    </main>
  );
}
