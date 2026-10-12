import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-[#0c0558]">
      <article className="w-full max-w-xl">
        <p className="text-base uppercase capitalize text-justify font-medium tracking-tight text-[#999]">
          Mabz CASH LOANS (PTY) LTD
        </p>
        <p className="text-sm text-justify font-medium tracking-tight text-[#999]">
          NCR Registered - CP21885
        </p>
        <h1 className="text-5xl mt-10 mb-4 tracking-tighter text- font-semibold">
          Cookie policy
        </h1>

        <p className="text-base mt- text-justify font-medium tracking-tight text-[#999]">
          Last Updated: 2026-10-12
        </p>

        <div className="mt-8 space-y-5 text-center text-base leading-7 text-black/70">
          <p className="text-base mt- text-justify font-medium tracking-tight text-[#999]">
            We use necessary storage to keep this website working and remember
            your analytics choice.
          </p>
          <p className="text-base mt- text-justify font-medium tracking-tight text-[#999]">
            If you accept analytics, we use privacy-friendly analytics to
            understand how the site is used and improve it. If you decline, that
            analytics will not run. You can still use the site either way.
          </p>
          <p className="text-base mt- mb-4 text-justify font-medium tracking-tight text-[#999]">
            Your choice is saved in your browser. You can clear your browser
            storage to be asked again.
          </p>
        </div>

        <Link
          href="/"
          className="w-fit mt-10  geist capitalize max-h-7 rounded-3xl border border-black/10 bg-black/[0.03] px-2 py-1 text-sm font-medium leading-4   tracking-tight text-[#333] "
        >
          home
        </Link>
      </article>
    </main>
  );
}
