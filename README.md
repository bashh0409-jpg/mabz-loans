# Mabz Loans website

Informational website for Mabz Loans. Visitors can learn about the service and
contact the business by phone or email. There is no online loan application,
lead form, or backend in this project.

## Run locally

Requirements: Node.js compatible with the installed Next.js version and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create and type-check a production build |
| `npm run start` | Serve the production build locally (run `npm run build` first) |

Before handover or deployment, run:

```bash
npm run lint
npm run build
```

## Site map and source files

| Route / area | Source | Notes |
| --- | --- | --- |
| Home page | `app/page.tsx` | Composes the hero, requirements, FAQ, and contact sections |
| Navigation | `app/components/Navbar.tsx` | Responsive navigation and animated mobile panel |
| Hero | `app/components/Hero.tsx` | Main headline and call/email actions |
| Requirements | `app/components/Requirements.tsx` | Document checklist and service banner |
| FAQ | `app/components/Faq.tsx` | Editable question-and-answer accordion |
| Contact/footer | `app/components/Contacts.tsx` | Phone, email, registration text, and legal links |
| Privacy | `app/privacy/page.tsx` | Privacy notice |
| Cookies | `app/cookies/page.tsx` | Cookie and analytics notice |
| Terms | `app/terms/page.tsx` | Website terms and conditions |
| Maintenance | `app/maintenance/page.tsx` | Standalone maintenance notice |
| Maintenance redirect | `proxy.ts` | Sends visitors to the maintenance page when enabled |
| Consent and analytics | `app/components/Cookies.tsx` | Consent prompt; analytics load only after acceptance |
| Smooth scrolling | `app/components/SmoothScroll.tsx` | Lenis scrolling integrated with GSAP ScrollTrigger |
| Global styles | `app/globals.css` | Tailwind import, global styles, and menu animation |
| Static assets | `public/` | Images and other files served as-is |

## Updating site content

- Update section copy and calls to action in the corresponding component under
  `app/components/`.
- Contact numbers and email are component defaults in both `Hero.tsx` and
  `Contacts.tsx`. Keep them consistent when changing business contact details.
- The footer copyright year is currently written directly in `Contacts.tsx`;
  update it when appropriate.
- Legal content is maintained in the three route files under `app/privacy/`,
  `app/cookies/`, and `app/terms/`. Keep policy descriptions aligned with actual
  data collection, storage, analytics, and business practices. Have South
  African legal/compliance counsel review legal wording before relying on it.
- Analytics consent is stored in the visitor's browser using local storage.
  Visitors can change their choice by clearing this site's browser storage;
  there is no separate preference-management screen.
- `SmoothScroll.tsx` sets the Lenis `lerp` value. Lower values make the
  interpolation more gradual; respect the reduced-motion preference where
  adding or changing animations.
- To temporarily send visitors to the maintenance page, set
  `MAINTENANCE_MODE=true` in the deployment environment and redeploy. Set it to
  `false` or remove it and redeploy to restore the site. The maintenance page
  and required static assets remain available while the switch is on. To test
  locally, run `MAINTENANCE_MODE=true npm run dev`.

## Deployment and ownership checklist

This repository contains the application source; confirm the production hosting
provider, domain, and deployment settings with the current owner before making
infrastructure changes. The project uses Next.js and includes Vercel Analytics
and Speed Insights packages; ensure the actual deployment and consent behavior
are verified in production.

Before launch or handover, confirm:

- The displayed phone numbers, email address, NCR registration text, and
  business identity are correct and authorized for publication.
- Set `NEXT_PUBLIC_SITE_URL` to the canonical public site URL in deployment
  settings so social sharing metadata uses absolute production URLs. Vercel
  deployment URLs are used automatically when this variable is not set.
- Hero and contact-section phone numbers match.
- Legal notices have been checked against actual practices and reviewed by an
  appropriate South African professional.
- The production domain, hosting account, analytics access, and repository
  access are transferred to the intended owner.
- Contact links work on desktop and mobile, and the consent prompt's accept and
  decline choices behave as intended.

Do not commit credentials or private customer information. `MAINTENANCE_MODE`
and `NEXT_PUBLIC_SITE_URL` are optional deployment environment variables.
