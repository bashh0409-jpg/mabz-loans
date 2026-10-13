import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-[#0c0558]">
      <article className="w-full max-w-2xl">
        <p className="text-base uppercase capitalize text-justify font-medium tracking-tight text-[#999]">
          Mabz Loans
        </p>
        <p className="text-sm text-justify font-medium tracking-tight text-[#999]">
          NCR Registered - CP21885
        </p>
        <h1 className="mt-10 mb-4 text-5xl tracking-tighter font-semibold text-[#0c0558]">
          Cookie policy
        </h1>

        <p className="text-base text-justify font-medium tracking-tight text-[#999]">
          Last Updated: 2026-10-13
        </p>

        <div className="mt-8 space-y-6 text-base leading-6 text-[#999]">
          <p className="text-justify font-medium tracking-tight">
            We use necessary browser storage to keep this website working and to
            remember your analytics choice.
          </p>
          <p className="text-justify font-medium tracking-tight">
            If you accept analytics, we use privacy-friendly analytics to
            understand site usage and performance through Vercel Analytics and
            Vercel Speed Insights. If you decline, these services will not run.
            You can still use the site either way.
          </p>
          <p className="text-justify font-medium tracking-tight">
            Your preference is stored in your browser and can be cleared at any
            time. Clearing your browser storage may cause the consent prompt to
            appear again.
          </p>
          <p className="text-justify font-medium tracking-tight">
            This website does not use cookies to make automated lending decisions
            and does not provide an online loan application form.
          </p>
          <p className="text-justify font-medium tracking-tight">
            For additional details, please see our{" "}
            <Link className="underline" href="/privacy">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/terms">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="w-fit rounded-3xl border border-black/10 bg-black/[0.03] px-3 py-1.5 text-sm font-medium leading-4 tracking-tight text-[#333]"
          >
            Home
          </Link>
          <Link
            href="/privacy"
            className="w-fit rounded-3xl border border-black/10 bg-black/[0.03] px-3 py-1.5 text-sm font-medium leading-4 tracking-tight text-[#333]"
          >
            Privacy
          </Link>
        </div>
      </article>
    </main>
  );
}
