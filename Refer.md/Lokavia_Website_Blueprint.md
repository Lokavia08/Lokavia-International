# Lokavia International — Website Blueprint
*Website Blueprint for use with AI build tools*

**Naming note:** "Lokavia International" is the registered legal entity name. On the website and in all brand-facing display (logo, nav, headlines, general copy), use **"Lokavia"** only. The full legal name appears only where legally/formally required (e.g., footer copyright line, legal pages, formal certificates/documents) — not in headlines, nav, or casual brand mentions.
*Complete planning spec for implementation via AI build tools (Stitch, Google AI Studio, Antigravity, etc.)*

---

## 1. Strategy & Foundation

- **Audience:** International B2B export buyers only. No domestic/Amazon representation anywhere on the site.
- **Positioning (locked):** Agri-commodity specialist — not an all-commodity trading house — for the current site. Long-term category-agnostic trajectory is stated as future direction only (About/Vision section), never as current identity or an active claim.
- **Purpose (launch):** Credibility and trust validation for buyers arriving via cold outreach, CRM, and trade platforms.
- **Purpose (phase 2, post-registration):** Google Ads lead-generation engine, geo-targeted to priority markets (Indonesia, Brazil, Germany, expanding as CRM grows).
- **Primary conversion action:** RFQ form submission (dominant). Direct email/WhatsApp/phone contact is secondary/fallback.
- **Voice/tone:** Per Lokavia Tone of Voice Guide — institutional "we," confident, plain-spoken, specific verifiable claims, no superlatives, no overselling, subtle wit only in taglines/microcopy (never in forms or documents).
- **Visual register:** See `design.md` (v4, current) for the authoritative design system — this blueprint does not duplicate visual specs to avoid drift between files.
- **Tech stack:** React + TanStack Router (file-based routing) — confirmed switch from an earlier vanilla HTML/CSS/JS plan, made deliberately during implementation.
- **Launch timing:** ~1 month build; registrations (GST, IEC, APEDA, Spices Board RCMC) expected largely complete by launch. Ads activate a few months post-launch once certifications are further along.

---

## 2. Sitemap

1. **Homepage**
2. **Products** — overview page + 4 SKU pages (Onion Powder, Garlic Powder, Ginger Powder, Psyllium Husk)
3. **About / Company** — includes Certifications & Compliance block
4. **Quality & Sourcing**
5. **Get a Quote / Contact** (merged — RFQ form primary, direct contact secondary)
6. **Resources / Insights** — phase 2+, not launch-critical, stub only
7. **Legal** — Privacy Policy, Terms of Use (required before Ads/data collection go live)

**Explicitly excluded at launch:** blog/news, careers page, domestic/Amazon references, testimonials (none exist yet — don't fabricate).

---

## 3. User Journeys & Navigation

**Homepage journey:**
Homepage → primary CTA → Products → SKU page → Quality & Sourcing → RFQ
Homepage → persistent secondary CTA (always visible in nav) → RFQ/Contact

**Product page journey:**
Product page → primary featured CTA → Quality & Sourcing → (trust built) → RFQ/Contact
Product page → persistent secondary CTA → RFQ/Contact directly (for high-intent buyers who already know what they want)

**Rule across the entire site:** Primary/featured CTA always guides toward more context first (Products → Quality & Sourcing). RFQ stays one click away at all times via persistent navigation — never buried, never forced-sequential for high-intent traffic.

**Mobile navigation:**
- Standard hamburger menu
- Sticky "Get a Quote" button (bottom bar or sticky header) — must NOT be buried inside the hamburger menu
- Menu order: Home, Products, About, Quality & Sourcing, Get a Quote/Contact, (Resources — phase 2)

**Breadcrumbs:**
- Needed on: product sub-pages, future Resources articles
- Not needed on: Homepage, About, Quality & Sourcing, Get a Quote/Contact

**Footer:**
- Company info (Lokavia International, Surat address, email, phone once finalized)
- Quick links: Products (all 4 SKUs), About, Quality & Sourcing, Get a Quote/Contact
- Certifications badges — placeholder structure, populates as IEC/APEDA/Spices Board/GST are issued
- Legal: Privacy Policy, Terms of Use
- Social: LinkedIn — conditionally shown, only once company page is activated (post-registration)
- No newsletter signup. No domestic/Amazon reference.

---

## 4. UI/UX & Design System

**See `design.md` (v4) for the full, current, authoritative design system** — color palette, typography, grid/spacing, components, imagery direction, iconography, accessibility, and motion. That file is the single source of truth for visual decisions and has been revised multiple times since this blueprint was first drafted; this section intentionally does not duplicate it to avoid the two files drifting out of sync.

Quick summary of the current direction (v4): clean, minimal, white/black-led — navy and orange are accent-only colors (CTAs, one highlighted headline keyword, small icons), not dominant background/text colors. WCAG 2.1 AA accessibility maintained throughout.

---

## 5. Frontend — Page-by-Page Content Requirements

### Homepage
- Hero: headline (institutional positioning) + subheadline (specificity anchor) + primary CTA ("Explore Products") + persistent secondary CTA ("Get a Quote")
- Trust bar: 3-4 factual stats (markets targeted, SKU count, certification status)
- Products section: 4 SKU cards (image, name, one-line spec teaser, "View Details")
- Why Lokavia: 3-4 factual pillars (no adjective-only claims)
- Markets/reach section: list or map of target countries
- Closing CTA band → Get a Quote
- Footer

### Products — Overview Page
- 1-2 line intro (categories traded)
- 4 SKU cards: image, name, key spec highlights (grade, packaging, MOQ range), "View Details"
- No RFQ push here — navigation page, not conversion page

### Product Pages (×4 — Onion, Garlic, Ginger; Psyllium has special structure)
- Hero image + product name
- Spec summary table: grade, moisture %, mesh size, packaging options, MOQ
- Applications/uses: 2-4 factual use-cases
- Packaging & shipping info: bag sizes, container load capacity
- Primary CTA: "Quality & Sourcing"
- Persistent secondary CTA: "Get a Quote" — **auto-selects this SKU in the RFQ form** (URL param or equivalent mechanism, e.g. `/get-a-quote?sku=onion-powder`)

**Psyllium Husk page — special structure:**
- Two tabs at top: **Food-Grade** / **Nutraceutical**, visitor-switchable
- Each tab repeats full page structure (spec table, applications, packaging) with grade-specific data

### About / Company
- Company overview: 2-3 sentences, institutional "we," per Tone of Voice Guide
- Leadership: name/title (Founder & CEO), 1-2 sentence professional background — no personal-narrative-heavy content
- Vision: restrained, fact-based trajectory statement — avoid overreach/hype pre-registration (e.g., "expanding into additional agri-commodity categories" rather than declaring "next Tata/Olam")
- Certifications & Compliance block: list format (IEC, GST, APEDA, Spices Board RCMC, MSME/Udyam) — placeholder state defined for pre-issuance, populates as registrations complete

### Quality & Sourcing
- Sourcing approach: 2-3 sentences, factual (supplier vetting)
- Quality control process: testing/MRL compliance description
- Packaging & logistics standards: 2-3 sentences
- CTA: "Get a Quote"

### Get a Quote / Contact (merged page)
- RFQ form (primary, dominant visual weight):
  - SKU (dropdown, auto-selected if arriving from product page, editable)
  - Quantity (fixed ranges — exact brackets TBD against Unified Pricing Model / typical order/container sizes)
  - Destination country (dropdown)
  - Buyer company name
  - Contact email + phone
  - Message/specs field (optional, free text)
- Intro line: sets response-time expectation
- Direct contact block (secondary, smaller): email, WhatsApp/phone, Surat office address

### Resources / Insights
- Phase 2+, stub only, not built at launch

### Legal
- Privacy Policy, Terms of Use — required before Ads/data collection go live

---

## 6. Backend Architecture (tool-agnostic)

**Core data entities:**
- RFQ Submissions: SKU, quantity range, destination country, buyer company, contact info, message, timestamp, status
- Products/SKUs: static/CMS content (name, specs, images, packaging options)
- Certifications: name, issuing body, status, display flag

**RFQ submission flow:**
Form submit → validate → write to Google Sheets (structured to align with/feed Export_Business_Tracker's Export_Buyer_CRM tab) → email notification to Lokavia → confirmation message shown to buyer

**Authentication:** None needed for buyers (anonymous RFQ submission, no accounts/portal). No custom admin dashboard needed — direct CRM/sheet access is sufficient.

**Integrations:**
- Required: Google Sheets webhook (RFQ data), GA4, Google Ads conversion tracking (wire now, activate phase 2), spam protection (CAPTCHA/honeypot on RFQ form), auto-acknowledgment email on submission
- Optional/later: WhatsApp Business API for automated confirmations
- Not needed: payment gateway, user auth providers

**CMS:** Required — post-launch content editing (spec sheets, certifications, new markets) must be possible without full rebuilds. Specific CMS choice (headless CMS, Git-based, or tool-native) deferred to tool-selection stage; requirement is non-negotiable regardless of tool chosen.

**Hosting:** React build output on static/near-static-friendly hosting (Vercel/Netlify-tier, both support React builds natively). RFQ form remains the only dynamic component logically, even though the site is now a React app rather than plain static HTML.

**Placeholders:** Any placeholder content (certifications not yet held, unconfirmed figures, sample copy) must be clearly marked as such in code comments or a visible draft-state flag — not indistinguishable from final content — so nothing ships to production by accident before it's real.

**Security:** HTTPS, form spam protection, Privacy Policy before Ads/data collection.

**Scalability:** Current scope (4 SKUs, single RFQ flow) needs no special scaling architecture — low-traffic B2B site, don't over-invest here.

---

## 7. SEO Strategy

**Technical SEO (do regardless of Ads timing):**
- Clean URL structure (`/products/onion-powder`, not query-string IDs)
- Structured data: Product schema on SKU pages, Organization schema sitewide, BreadcrumbList on product pages
- Specific meta titles/descriptions per page
- XML sitemap + robots.txt, submitted to Google Search Console at launch
- Fast load times — don't undercut with unoptimized images
- Mobile-first indexing compliance, HTTPS

**Keyword targeting (light, aligned with future Ads keywords):**
- Primary: SKU + intent terms ("onion powder exporter India," "garlic powder bulk supplier," "psyllium husk manufacturer India," "ginger powder wholesale export")
- Avoid high-volume generic terms ("spices export India") — too competitive for a new domain
- Country-specific long-tail keywords deferred to phase 2, once Ads data shows which markets convert

**On-page content SEO:**
- Natural inclusion of SKU + export/supplier/manufacturer variants in H1, first paragraph, image alt text (not keyword-stuffed)
- Certifications page gains keyword value once APEDA/Spices Board RCMC are listed

**Explicitly deferred/skipped for now:**
- Blog/Resources content strategy (no committed publishing cadence yet)
- Backlink building (premature pre-registration)
- Local SEO/Google Business Profile (not applicable — no walk-in customers)

---

## 8. Remaining / Not Yet Covered (flagged for future session)

- Performance optimization detail
- Analytics/tracking implementation detail
- Testing, QA process
- Deployment/launch checklist
- Exact RFQ quantity bracket cutoffs (needs Unified Pricing Model / typical order size input — still open)
- CMS platform final selection within the React/TanStack stack
- Domain purchase + Google Workspace migration to lokaviainternational.com (operational, not planning)
- Review pass on any materials already sent externally under the old "Lokavia Trading" name/domain
- Final placeholder-to-real-content audit before launch (certifications, contact details, quantity brackets)

---

*Document prepared as an implementation-ready reference for use with AI website-building tools. All decisions above were explicitly confirmed in planning conversation with Claude (Lokavia website strategist/planning partner role).*
