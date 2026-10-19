# Subora website — design research

Research for the public marketing site of Subora (Shopify subscriptions app, code in `../subora`).
Done 2026-10-19 by four parallel research agents. Competitor prices, ratings and headlines change
often — re-check before quoting them in copy.

| File | What it covers |
|---|---|
| [01-product-brief.md](01-product-brief.md) | What ships in Release 1 vs later, pricing facts from `subora/app/domain/fee/tier.ts`, competitor pricing table, vocabulary, brand assets, sitemap, home-page order, 13 open questions |
| [02-competitor-teardown.md](02-competitor-teardown.md) | Recharge, Skio, Loop, Appstle, Seal, Stay AI, Smartrr, Recurpay, Joy, Bold (+ Judge.me, Okendo, Klaviyo): heroes, palettes, type, proof, pricing pages; clichés, table stakes, opportunities |
| [03-saas-inspiration.md](03-saas-inspiration.md) | Stripe Billing, Linear, Mercury, Polar, Attio, Resend, Plausible, PostHog, Orb, Lago, Paddle, Raycast, Cal.com, Chargebee; ranked borrowable patterns, type pairings, 3 art directions |
| [04-galleries-and-trends.md](04-galleries-and-trends.md) | 22 gallery references, fresh vs overused trends (Oct 2026), section pattern library, WCAG contrast maths, motion and static-export notes |

## The positioning in one line

**Every feature. Unlimited subscriptions. Choose how you pay.**
Free $0 + 2% · Growth $49 + 0.5% · Pro $99 + 0%. Every competitor either gates features by tier,
caps subscriptions, or charges $99–$599/mo plus ~1% + 19–20¢. Nobody else has this model — the
pricing *is* the headline differentiator (01 §5–6, 02 §3.3).

## What the category looks like (and how we stand apart)

- **Purple everywhere.** Skio, Loop, Stay, Smartrr, Bold are violet/magenta gradients. Slate + amber
  is already a clear break — never dilute it with purple.
- **Interchangeable superlatives.** Loop and Smartrr share the same hero line ("The last subscription
  platform you'll ever need"). We say a specific, checkable promise instead.
- **Heroes without product.** Lifestyle photos/video and stock people pointing at widgets. The ones
  that work (Bold, Smartrr, Joy) show real or coded UI.
- **Pricing hidden behind "Book a demo"** on the premium apps. We put pricing and a calculator up front.

## Recommended design direction: "Golden Hour Ledger" + the Loop

Light, editorial, product-first, finance-grade calm. (03 direction A as base, B for dark bands, C's
woven thread only for the Loop.)

**Colour**
| Token | Value | Use |
|---|---|---|
| paper | `#F7F4EE` (warm off-white) | Page background |
| ink / slate | `#2B3038` | Text, primary buttons, dark bands (analytics, recovery, footer) |
| deep slate | `#1F2329` | Darkest band / footer |
| muted | `#5B6270` | Second half of two-tone headlines, body secondary (5.7:1 on paper) |
| hairline | `#E4DED3` | Borders, dividers |
| amber | `#E8A33D` | **Rationed.** One job: money moving in the merchant's favour — recovered payment, saved subscriber, "best plan for you", the CTA chip, the active Loop node |
| amber-ink | `#945C0F` | Amber-coloured *text* on light backgrounds (5.2:1) |
| amber tint | `#F6E7CC` | Highlight fills behind slate text |

**Hard accessibility rules** (04 §4): amber `#E8A33D` is 2.0–2.2:1 on light grounds — it fails even
for icons and focus rings. Amber buttons take slate text (6.15:1), never white. On slate bands amber
is fine for text, links and focus rings.

**Type**
- Manrope (brand font, self-hosted) for UI, body and headings — 500–600 weight, −0.02 to −0.035em
  tracking on display sizes, tabular figures for money.
- A mono (Geist Mono or JetBrains Mono) for small uppercase eyebrows and figure captions
  ("FIG 01 — THE LOOP").
- **Open decision:** add a serif display face (Fraunces or Instrument Serif) for H1s and big numerals?
  03 recommends it (Resend/Orb/Paddle look); 02 notes most competitors already pair serif + grotesk,
  so Manrope-only is the more differentiated choice. Default: Manrope-only, try a serif on the hero
  in the design pass.

**Signature elements**
1. **The Loop** — the woven-rings logo turned into the "how it works" diagram: a dot travels the
   rings past event nodes (order placed → renewal reminder → customer skips/swaps → charge → failed →
   retry → recovered → shipped), each node lighting amber with a small UI card. Scroll-driven SVG,
   static final state under `prefers-reduced-motion`. No competitor visualises the cycle itself.
2. **"Which plan is cheapest for me?" slider** — monthly subscription revenue in, cost on each plan
   out, cheapest ringed in amber; break-even at ~$3,270 (Free→Growth) and $10,000 (Growth→Pro).
   Teaser on home, full version on /pricing. (Polar, Plausible, PostHog, Joy.)
3. **Coded product mocks, not screenshots or photos** — 2–3 invented demo stores (coffee roaster,
   pet food, skincare) reused across the Picker on a product page, the customer portal, the
   cancellation/retention flow, the renewal email and the analytics view. Calm event ticker beside
   the hero ("Payment recovered · $42.00"). Mercury-style superscript cents on money.
4. **Two-tone headlines** — slate lead sentence, muted continuation, at most one amber word per section.
5. **Slate button with an amber ring chip** (Paddle-style) — amber becomes a signature, not a fill.

**Avoid:** purple/mesh gradients, glassmorphism, 3D blobs/WebGL heroes, dark-mode-everything,
scroll-jacking, AI imagery, mascots, hand-drawn squiggles, unsourced round-number stats, chat bubbles
or popups on arrival, feature-gating ladders ("Everything in Starter, plus…").

## Site structure (from 01 §9, reusing waitly-web's stack and patterns)

Static Next.js App Router export, Tailwind v4, shadcn/ui, GitHub Pages — same as `../waitly-web`.
Reuse its `siteConfig`, `pages` registry, feature pages, FAQ, setup, use cases, legal-from-Markdown,
llms.txt, OG cards and mock components. **Drop** `PlanBadge` and the feature-comparison table.

```
/                              Home
/features/subscription-plans/  Subscribe & Save, Prepaid, Trial, Fixed-length
/features/storefront/          Picker, collection badges, cart offer
/features/customer-portal/     Self-service in the customer account
/features/retention/           Cancellation reasons, retention offers, save rate
/features/failed-payments/     Retries, recovery emails
/features/analytics/           MRR, churn, subscribers, exports
/pricing/   /setup/   /faq/   /use-cases/[slug]/   /privacy/   /dpa/
/guide/[slug]/                 phase 2 — needs real app screenshots
```

**Home-page order:** hero (headline, Install + See pricing, plan strip) → "no feature gates, no
subscription caps" band → four ways to sell a subscription → the Loop (dark band) → storefront →
customer portal → retention → failed payments → analytics (dark) → pricing teaser + slider → setup in
five steps → FAQ → closing CTA.

**Table stakes we can't meet yet** (02 §3.2): App Store rating, logo wall, case studies, migration
story, integrations wall. Until they exist, lean on transparency — public pricing maths, coded demos,
a changelog, a named team — and never fake proof.

## Decisions (agreed 2026-10-19)

1. **Primary CTA: "Install".** Points at an App Store search until the listing is live, as Waitly did.
2. **Migration: offer manual help.** Present switching from another app as hands-on help from the
   team, not an automated importer. Don't promise automatic transfer of contracts or payment tokens.
3. **No named competitors.** No "vs" pages, no named comparison table. Comparisons stay generic
   ("typical subscription apps charge $99 + 1% + 19¢").
4. **No customer proof yet.** No logos, quotes or stats. Proof sections use the pricing maths, the
   coded product mocks and transparency (changelog, named team) instead, and nothing fake.
5. **Type: Manrope only**, plus a mono for eyebrows. Try a serif (Fraunces / Instrument Serif) on the
   hero headline during the design pass and keep it only if it clearly earns its place.

6. **Domain `subora.octabyte.io`, support email `support@octabyte.io`.**
7. **Privacy policy and DPA** are written on the site (`src/content/legal/`) from the facts in
   [05-data-handling-facts.md](05-data-handling-facts.md). Unknowns show as highlighted placeholders
   set in `src/config/site.ts` (`legal`).

The full list of 13 open questions, including spec-vs-build discrepancies the copy must follow, is in
01 §10.
