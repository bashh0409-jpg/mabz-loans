import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-[#0c0558]">
      <article className="w-full mt-15 max-w-2xl">
        <p className="text-base uppercase capitalize text-justify font-medium tracking-tight text-[#999]">
          Mabz Loans
        </p>
        <p className="text-sm text-justify font-medium tracking-tight text-[#999]">
          NCR Registered - CP21885
        </p>
        <h1 className="mt-10 mb-4 text-5xl tracking-tighter font-semibold text-[#0c0558]">
          Terms &amp; conditions
        </h1>

        <p className="text-base text-justify font-medium tracking-tight text-[#999]">
          Last Updated: 2026-10-13
        </p>

        <div className="mt-8 space-y-6 text-base leading-6 text-[#999]">
          <p className="text-justify font-medium tracking-tight">
            These Terms &amp; Conditions govern your use of the Mabz Loans website.
            By accessing or using this website, you agree to these terms. If you
            do not agree, please do not use the site.
          </p>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-black">
              Informational website only
            </h2>
            <p className="text-justify font-medium tracking-tight">
              This website is for general information and enquiry purposes only. It
              does not constitute an offer, application, approval, or agreement for
              lending. We do not provide a digital loan application form or an
              online credit contract through this website.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-black">
              Contact and enquiries
            </h2>
            <p className="text-justify font-medium tracking-tight">
              If you contact us by phone or email, we may ask for details needed to
              respond to your enquiry. Please do not send sensitive personal or
              financial information unless it is needed for the purpose of your
              enquiry. Mabz Loans may request additional information by a suitable,
              secure, and lawful method if required.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-black">
              Website content
            </h2>
            <p className="text-justify font-medium tracking-tight">
              We aim to keep the content on this website accurate and up to date, but
              information may change without notice. We do not guarantee that the
              website will always be available, error-free, or suitable for every
              purpose. Information provided online should not be relied upon as
              financial, legal, or professional advice.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-black">
              Intellectual property
            </h2>
            <p className="text-justify font-medium tracking-tight">
              All content on this website, including text, design, branding, and
              graphics, is owned by Mabz Loans or used with permission. You may not
              copy, reproduce, republish, or distribute content from this site
              without prior written permission, except for personal, non-commercial
              reference.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-black">
              Third-party services
            </h2>
            <p className="text-justify font-medium tracking-tight">
              We may use third-party services such as Vercel Analytics and Vercel
              Speed Insights for website analytics and performance monitoring. These
              providers may process limited technical and usage data on our behalf.
              Please review our <a href="/privacy" className="underline">Privacy Policy</a> and <a href="/cookies" className="underline">Cookie Policy</a> for more
              information.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-black">
              Limitation of liability
            </h2>
            <p className="text-justify font-medium tracking-tight">
              To the maximum extent permitted by applicable law, Mabz Loans shall not
              be liable for any loss, damage, or inconvenience arising from the use or
              inability to use this website, including loss of data, interruptions,
              or reliance on information provided here. This includes any indirect,
              incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-black">
              Governing law
            </h2>
            <p className="text-justify font-medium tracking-tight">
              These terms are governed by the laws of the Republic of South Africa,
              without regard to conflict-of-laws principles. Any dispute arising in
              connection with this website shall be subject to the jurisdiction of the
              South African courts.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-black">
              Questions
            </h2>
            <p className="text-justify font-medium tracking-tight">
              If you have questions about these terms, please contact{" "}
              <a className="underline" href="mailto:mabzloans@gmail.com">
                mabzloans@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-1">
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
          <Link
            href="/cookies"
            className="w-fit rounded-3xl border border-black/10 bg-black/[0.03] px-3 py-1.5 text-sm font-medium leading-4 tracking-tight text-[#333]"
          >
            Cookies 
          </Link>
        </div>
      </article>
    </main>
  );
}
