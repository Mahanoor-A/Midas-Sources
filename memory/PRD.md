# PRD — Midas Sources International Website

## Original problem statement
Build the digital credibility + B2B lead-generation website for Midas Sources International (est. June 10, 2007, Rawalpindi, Pakistan) — a multidisciplinary B2B procurement, supply, contracting and technical-services company serving diplomatic, oil & gas/energy, multinational, corporate, healthcare, education and private-sector organizations. Includes SECTION 6 (Selected Clients & Institutional Experience) with monochrome typographic client tiles colorizing on hover, a conversion strip ("Looking for a dependable local supplier or project partner in Pakistan?") with SUBMIT AN RFQ / DISCUSS YOUR REQUIREMENT CTAs, and an RFQ workflow saving inquiries to MongoDB. Credibility over promotion; no "official partner" claims; no invented stats/certifications.

## Architecture
- Backend: FastAPI + motor. `routers/rfq.py` (POST/GET `/api/rfq`), Pydantic v2 models, uuid ids, `rfqs` collection indexed in `lib/db.py`.
- Frontend: Vite + React 19 + TS strict, Tailwind v4 dark theme (deep navy #0B0F17, steel #1E293B, safety amber #FF6B00), Space Grotesk / DM Sans / IBM Plex Mono, motion/react reveals + parallax hero, Lenis smooth scroll, shadcn/base-ui Dialog+Select RFQ modal, sonner toasts.
- Pages: single-page marketing site (`src/pages/Home.tsx`) composed of 13 section components in `src/components/`.

## User personas
- Procurement managers/officers at embassies, energy companies, multinationals (primary)
- Facility/operations/HSE/security managers, project/engineering managers
- International organizations seeking a local Pakistani partner

## Core requirements (static)
1. Instant positioning: est. 2007, procurement + contracting + technical services
2. 8 capability groups, organized not dumped
3. 8 industries served
4. 6-step how-it-works process
5. Selected clients wall (U.S. Embassy, MOL Pakistan, Mari Energies, PGNiG, HBL, Al Razi Hospital, private schools/private sector) — experience language only
6. RFQ capture (name, org, email, phone, type, location, message) → MongoDB
7. Contact details (address, phones, email)
8. Quality/HSE philosophy without false certification claims

## Implemented
- 2026-09-26: Full one-page site: kinetic masked-reveal hero with parallax refinery backdrop, editorial marquee, credibility strip, bento capability matrix, industries grid, process timeline, Section 6 client wall with hover color reveal + disclaimer, conversion strip, project showcase, Quality/HSE, contact, footer with live PKT clock, RFQ modal → `/api/rfq` (POST/GET) with toast confirmation. Original SVG "M" mark as logo + favicon. Verified end-to-end via public URL (browser pass + curl, 422 negative case).
- 2026-09-26: Admin Inquiries Dashboard at /admin (JWT httpOnly-cookie auth, brute-force lockout, seeded admin from env, RFQ list with attachment downloads). Email alerts on every new RFQ via Emergent managed Resend (pipeline verified; gmail recipient blocked by platform deliverability guard in preview). BOQ file upload in RFQ modal via object storage (10MB, type-whitelisted, admin-only download). Case Snapshots section (4 sector cards, representative scopes, placeholder imagery).

## Backlog (prioritized)
- P0: Real project photography replacing placeholders; verify owner email deliverability on production domain (or switch OWNER_EMAIL to a deliverable inbox)
- P1: Company profile PDF download; case studies managed from admin (CMS); RFQ status workflow (new/contacted/quoted/closed)
- P2: SEO landing pages per capability/industry; vendor registration / certifications page; careers/news; Urdu language toggle

## Next tasks
1. Supply real project photos + confirm case-study scopes, then wire admin-managed case studies
2. Add RFQ status tracking in the dashboard
3. Company profile PDF generator/download
