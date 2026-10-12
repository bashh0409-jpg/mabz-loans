import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-[#0c0558]">
      <article className="w-full max-w-xl">
        <p className="text-base uppercase capitalize text-justify font-medium tracking-tight text-[#999]">
          Mabz Loans
        </p>
        <p className="text-sm text-justify font-medium tracking-tight text-[#999]">
          NCR Registered - CP21885
        </p>
        <h1 className="mt-10 mb-4 text-5xl tracking-tighter font-semibold">
          Privacy policy
        </h1>

        <p className="text-base mt- text-justify font-medium tracking-tight text-[#999]">
          Last Updated: 2026-10-12
        </p>

        <div className="mt-8 space-y-5 text-base leading-5 text-[#999]">
          <p className="text-justify font-medium tracking-tight">
            This policy explains how Mabz Loans handles information when you
            visit this website or contact us. The website does not provide an
            online loan application form.
          </p>
          <section>
            <h2 className="mon geist   overflow-hidden text-xl font-semibold tracking-tighter text-black mb-2 ">
              Information you provide
            </h2>

            <p className="text-justify leading-5 font-medium tracking-tight">
              If you choose to contact us by phone or email, we receive the
              information you choose to share so that we can respond to your
              enquiry. Please avoid sending sensitive personal or financial
              information unless it is needed for your enquiry.
            </p>
          </section>
          <section>
            <h2 className="mon geist   overflow-hidden text-xl font-semibold tracking-tighter text-black mb-2 ">
              Website analytics and storage
            </h2>
            <p className="text-justify leading-5 font-medium tracking-tight">
              Necessary browser storage remembers your analytics choice. If you
              accept analytics in the consent prompt, privacy-friendly analytics
              are used to understand site usage and improve the website.
              Analytics do not run if you decline. Your choice is stored in your
              browser and you can clear that storage to be asked again.
            </p>
          </section>
          <section>
            <h2 className="mon geist   overflow-hidden text-xl font-semibold tracking-tighter text-black mb-2 ">
              How information is used
            </h2>
            <p className="text-justify leading-5 font-medium tracking-tight">
              Information you provide is used to respond to your communication.
              When enabled, analytics help us understand and improve the
              website. We do not use information from this website to make
              automated lending decisions.
            </p>
          </section>
          <section>
            <h2 className="mon geist   overflow-hidden text-xl font-semibold tracking-tighter text-black mb-2 ">
              Your choices and questions
            </h2>
            <p className="text-justify  mb-4 leading-5 font-medium tracking-tight">
              You can decline analytics and still use the website. To ask about
              personal information you have shared with us, contact{" "}
              <a className="underline" href="mailto:mabzloans@gmail.com">
                mabzloans@gmail.com
              </a>
              .
            </p>
          </section>
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
