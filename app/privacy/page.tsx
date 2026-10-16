import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-[#003b70]">
      <article className="w-full mt-15 max-w-2xl">
        <p className="text-base uppercase capitalize text-justify font-semibold tracking-tight text-[#ff8500]">
          Mabz cash Loans
        </p>
        <p className="text-sm text-justify font-medium tracking-tight text-[#52687d]">
          NCR Registered - CP21885
        </p>
        <h1 className="mt-10 mb-4 text-5xl tracking-tighter font-semibold text-[#003b70]">
          Privacy policy
        </h1>

        <p className="text-base text-justify font-medium tracking-tight text-[#999]">
          Last Updated: 2026-10-13
        </p>

        <div className="mt-8 space-y-6 text-base leading-6 text-[#999]">
          <p className="text-justify font-medium tracking-tight">
            This Privacy Policy explains how Mabz Cash Loans handles information
            when you visit this website, contact us, or otherwise interact with
            our online presence. This website is informational only and does not
            provide an online loan application form or a binding credit offer.
          </p>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-[#003b70]">
              Information we may receive
            </h2>
            <p className="text-justify font-medium tracking-tight">
              If you contact us by phone, email, or another communication
              method, we may receive the personal information you choose to
              share, such as your name, contact details, and any relevant
              enquiry information. We only collect what is reasonably necessary
              to respond to your question or request.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-[#003b70]">
              How we use information
            </h2>
            <p className="text-justify font-medium tracking-tight">
              We use information to respond to enquiries, manage contact with
              you, understand user needs, and improve the website experience. We
              do not use the information on this website to make automated
              lending decisions or to determine approval of a loan.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-[#003b70]">
              Website analytics and storage
            </h2>
            <p className="text-justify font-medium tracking-tight">
              Necessary browser storage helps this website work and remembers
              your analytics choice. If you accept analytics, we may use Vercel
              Analytics and Vercel Speed Insights to understand website usage
              and performance. These tools process information on our behalf. If
              you decline, these services are not loaded. Your choice is stored
              in your browser and can be cleared to be asked again. For
              information about Vercel&apos;s handling of data, please see the{" "}
              <a
                className="underline"
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
              >
                Vercel Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-[#003b70]">
              Data retention and sharing
            </h2>
            <p className="text-justify font-medium tracking-tight">
              We retain personal information only for as long as needed to
              handle your enquiry, comply with legal or regulatory obligations,
              or support legitimate business operations. We do not sell personal
              information. We may share information with service providers that
              support our website or communication processes, where necessary
              and appropriate.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-[#003b70]">
              Your rights and questions
            </h2>
            <p className="text-justify font-medium tracking-tight">
              You can decline analytics and still use the website. If you would
              like to ask about personal information you have shared with us or
              request a correction or deletion, please contact{" "}
              <a className="underline" href="mailto:mabzloans@gmail.com">
                mabzloans@gmail.com
              </a>
              . We will respond in line with applicable laws and reasonable
              business practice.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tighter text-[#003b70]">
              Related policies
            </h2>
            <p className="text-justify font-medium tracking-tight">
              Please also read our{" "}
              <Link className="underline" href="/cookies">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/terms">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="mon geist overflow-hidden text-lg font-semibold tracking-tighter text-[#003b70] hover:text-[#ff8500]"
          >
            Home
          </Link>
          <Link
            href="/terms"
            className="mon geist overflow-hidden text-lg font-semibold tracking-tighter text-[#003b70] hover:text-[#ff8500]"
          >
            Terms
          </Link>
          <Link
            href="/cookies"
            className="mon geist overflow-hidden text-lg font-semibold tracking-tighter text-[#003b70] hover:text-[#ff8500]"
          >
            Cookies
          </Link>
        </div>
      </article>
    </main>
  );
}
