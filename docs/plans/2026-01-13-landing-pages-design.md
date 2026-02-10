# Grapple Jiu Jitsu Persona Landing Pages Design

## Goals
- Add five adult persona landing pages that match the current Grapple aesthetic and UX.
- Drive paid-ad traffic to persona-specific pages with a short trial lead form.
- Keep the kids landing page intact and reuse existing adult testimonials.

## Personas, Labels, and Slugs
- Grapple Competition Team: `/jiu-jitsu-programs/competition-team`
- Adult Jiu Jitsu: `/jiu-jitsu-programs/adult-jiu-jitsu`
- Women’s Jiu Jitsu: `/jiu-jitsu-programs/womens-jiu-jitsu`
- Jiu Jitsu for LEO/First Responders: `/jiu-jitsu-programs/first-responders`
- Jiu Jitsu for Hospital Workers: `/jiu-jitsu-programs/hospital-workers`

## Recommended Approach
Use a shared adult landing-page template with persona data for copy and content. This keeps UX consistent across pages and reduces duplication while allowing persona-specific messaging.

Alternative options:
- Clone the kids layout per page (fast but harder to maintain).
- Build a flexible section-builder (more upfront complexity than needed now).

## Page Structure (Shared Layout)
1. Hero: persona label, bold headline, short value prop, primary CTA (opens modal), secondary anchor to schedule/benefits, right-column video embed placeholder.
2. Trust band: local “trusted by” line and star rating (match kids page styling).
3. Benefits: three persona-specific cards with icons and short descriptions.
4. Program highlights: adult curriculum summary cards (Fundamentals, All Levels, Live Rounds/Comp).
5. Schedule: adult schedule grid filtered from `src/data/schedule.json`, link to `/schedule`.
6. Trial section: persona-branded “3-Day Trial” with bullets, CTA button, and a promise card.
7. Testimonials: reuse existing adult/general testimonials from `src/data/testimonials.json`.
8. FAQ: three short persona-specific Q/A items.
9. Final CTA: reuse `CallToAction` component with modal CTA.

## Persona Messaging Direction
- Competition Team: live rounds, comp prep, accountability, tournaments supported.
- Adult Jiu Jitsu: fitness, stress relief, technical growth, community.
- Women’s Jiu Jitsu: safe environment, confidence, beginner-friendly coaching.
- LEO/First Responders: control, de-escalation, pressure handling, resilience.
- Hospital Workers: safe control, body mechanics, composure, post-shift reset.

## Components and Data Flow
- Add a shared data file, e.g. `src/data/persona-landing.ts`, for per-persona content.
- Create a shared adult landing template at `src/app/jiu-jitsu-programs/[slug]/page.tsx`.
  - Use `generateStaticParams` for the five slugs.
  - Return `notFound()` for unknown slugs.
- Keep kids page at `src/app/jiu-jitsu-programs/kids` unchanged.

## Short Trial Modal (Adults)
- New component: `src/components/trial/adult-trial-modal.tsx`.
- Required fields: name, email, phone.
- Optional fields: experience level, goals.
- Validation: reuse email and phone regex from existing components.
- Success state: thank-you message with optional placeholder video.

## Lead Capture API
- Add `src/app/api/trial-leads/route.ts` to POST to Zapier.
- Env var: `ZAPIER_TRIAL_LEADS_WEBHOOK_URL`.
- Payload fields: persona slug + label, name, email, phone, experience level, goals, source.
- Error handling: 500 with friendly message if webhook missing or POST fails.

## Navigation Updates
- Add persona pages to `Programs` in header and mobile nav.
- Update home page audiences section to point to new slugs.

## QA Checklist
- Verify each new page renders and matches site styling.
- Confirm schedule grid filters out kids classes and lists adult classes.
- Confirm CTA opens modal and form validation works.
- Confirm API returns error without webhook, and success once configured.
- Check responsive layout on mobile.

## Open Items
- Provide Zapier webhook URL for `ZAPIER_TRIAL_LEADS_WEBHOOK_URL`.
- Provide final persona videos/images (placeholders until ready).
