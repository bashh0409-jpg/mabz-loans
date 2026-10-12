import React from "react";

interface ContactProps {
  phones?: string[];
  email?: string;
}

const Contact = ({
  phones = ["078 2193 521", "082 891 4983"],
  email = "mabzloans@gmail.com",
}: ContactProps) => {
  const linkStyles =
    "w-fit text-[clamp(1.5rem,4vw,3rem)] font-semibold tracking-tighter underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-[#0c0558] text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 md:gap-20 md:px-8 md:py-32">
        <h2
          id="contact-heading"
          className="text-[clamp(3rem,11vw,10rem)] font-semibold uppercase leading-[0.9] tracking-tighter"
        >
          Let&apos;s talk.
        </h2>

        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
            <p className="text-sm font-semibold uppercase tracking-tight text-white/60">
              Call
            </p>
            {phones.map((phone) => (
              <a key={phone} href={`tel:${phone}`} className={linkStyles}>
                {phone}
              </a>
            ))}
          </div>

          <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
            <p className="text-sm font-semibold uppercase tracking-tight text-white/60">
              Email
            </p>
            {/* break-all stops a long address from overflowing narrow phones */}
            <a href={`mailto:${email}`} className={`${linkStyles} break-all`}>
              {email}
            </a>
          </div>
        </div>
      </div>

      <div className=" px-4 flex w-full justify-between  py-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-tight text-white/60">
          NCR Registered - CP21885
        </p>
        <p className="text-sm font-semibold uppercase tracking-tight text-white/60">
          &copy; 2026 Mabz Loans
        </p>
        <p className="text-sm font-semibold uppercase tracking-tight text-white/60">
          Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default Contact;

/*
 * Design note
 * - No contact form on purpose: there's no backend to receive it, and a form that silently
 *   fails is worse than direct tap-to-call and mailto links.
 * - Server component (no hooks), so the year in the footer is rendered on the server.
 * - Navy matches the hero, so the page opens and closes in the same colour with white
 *   sections between.
 */
