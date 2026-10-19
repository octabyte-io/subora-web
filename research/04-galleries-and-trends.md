# 04 — Galleries & Design Trends Research

**Date:** 2026-10-19
**Scope:** Visual and structural inspiration for the Subora marketing site (Shopify subscriptions app for DTC brands).
**Brand inputs:** woven-rings logo · slate `#2B3038` · single amber accent `#E8A33D` · Manrope · static Next.js + Tailwind v4 + shadcn/ui.

**How this was gathered.** Many galleries block automated fetches: land-book, lapa.ninja, saaslandingpage and landingfolio returned 403 or allowed only partial reads. godly.website now 301-redirects to **recent.design**, which is a mixed-media feed rather than a site gallery. I read gallery listings as page text in a browser tab I opened for this, which I have closed. Screenshots were blocked by site permissions, so the palette notes below are not visually confirmed. The competitor and reference homepages were read directly. Each reference is tagged:
- **[V]**: I read the page or gallery listing during this session.
- **[K]**: from prior knowledge, with the URL known to be live as of early-mid 2026. Check the visuals before committing to one.

---

## 1. Reference sites (22)

| # | Site | Link | Why it's relevant | Subora section it could inspire |
|---|---|---|---|---|
| 1 | **Loop Subscriptions** (direct competitor) [V] | https://loopwork.co | Covers the full category playbook: App Store rating badge in the hero, "2400+ brands" logo strip, a pain-point block, a migrated-merchant testimonial loop ("from Recharge, Skio, Stay.ai"), a 3-stage cancellation-flow showcase, a **4-step migration timeline**, and metric-led case cards. Its copy uses an editorial voice with hard line breaks and recurring eyebrows ("Shows up as your…"). | Benchmark for every section. Its migration timeline and the "switchers" testimonial loop are worth beating. |
| 2 | **Skio** (competitor, now owned by Recharge) [V] | https://skio.com | Big stat callouts ("5X fewer cancellations"), a numbered self-service portal walkthrough, a "Plug-and-play" 3-step migration, a founder/team section, and conversational copy (the "even grandma" line about the portal). It shows **no pricing on the homepage**, so it is demo-gated. | Portal showcase, migration. Pricing is a chance to differentiate by being **transparent**. |
| 3 | **Recharge** (category incumbent) [K] | https://getrecharge.com | The incumbent's enterprise look. Useful for seeing what "default subscription app" looks like so Subora can avoid it. | Positioning reference; what to avoid. |
| 4 | **Polar** (billing for software) [V] (also on lapa.ninja's Finance list) | https://polar.sh | Shows the product with **live-looking UI mockups populated with fictional data** ("Acme Inc"): metering, invoices, margin-by-customer, tax and payout breakdowns. Uses numbered feature sections 01–05, and the pricing table lists **% + ¢ fees per tier**, which is how Subora's fee model would read. | Feature sections (numbered), analytics demo, pricing/fee table. |
| 5 | **Stripe Billing** [K] | https://stripe.com/billing | The gold standard for explaining recurring billing: lifecycle diagrams, invoice and portal mockups, and dense but calm typography. | How-it-works lifecycle diagram, portal demo, docs pages. |
| 6 | **Fernand** (support SaaS; on Land-book's current SaaS feed) [V] | https://getfernand.com | A "calm" brand: floral illustration accents, a **founder manifesto block signed by the founders**, a widget mockup with live toggles (accent color, theme, position), a "When… Then…" rules-builder mock, and pricing headlined "Start free. Email included." | Founder/manifesto trust block. The live-toggle customizer suits the **customer portal theming demo**. |
| 7 | **Column** (bank; on lapa.ninja Finance) [V] | https://column.com | Trust-led fintech. Puts regulatory proof in the hero, uses four big metrics, executive quotes from named customers (Brex, Mercury, Ramp), includes a network/infra diagram and audience tabs. | Trust and security strip, audience tabs (coffee / skincare / supplements / pet / boxes). |
| 8 | **Mercury** [K] | https://mercury.com | Restrained neutrals, editorial serif and sans pairing, and product UI set against soft photography. Often cited as the "trustworthy money software" look. | Hero composition, overall tone. |
| 9 | **Linear** [K] (cited as the "barely-there UI" example by Bubble) | https://linear.app | Thin, low-opacity borders, one dominant typeface, and precise micro-animations of product UI. | Feature-section craft, changelog and docs styling. Copy the craft, **not the dark-mode look**. |
| 10 | **Attio** [K] | https://attio.com | Light neutral canvas, crisp product UI crops, and a single accent used sparingly. Close to a slate-plus-one-accent system. | Feature grid, integrations section. |
| 11 | **Resend** [K] | https://resend.com | Excellent docs-adjacent marketing pages, code and UI side by side, and strong typographic hierarchy. | Docs/guide pages, API/webhooks section. |
| 12 | **Granola** [K] | https://granola.ai | Warm off-white canvas, friendly type, and the product shown as a single honest UI with no gradient noise. | Hero tone; "warm neutral" proof of concept. |
| 13 | **Paddle** pricing [K] | https://www.paddle.com/pricing | A merchant-of-record fee page that explains "% + fixed fee" and what is included. Close to the problem Subora's fee page has to solve. | Pricing / fee explainer. |
| 14 | **PostHog** pricing [K] (fetch was truncated) | https://posthog.com/pricing | The best-known **usage slider → live cost** calculator. It also has a playful, opinionated FAQ voice. | Fee calculator ("your monthly subscription GMV → Subora fee vs. current app"). |
| 15 | **Vercel** pricing [K] | https://vercel.com/pricing | A clean three-tier table with a feature-comparison matrix that expands. Cited in several 2026 pricing roundups. | Pricing tiers and comparison table. |
| 16 | **Clay** (on Land-book's current feed) [V-listing] | https://clay.com | Illustrated, crafted, characterful SaaS. Shows a technical product can feel warm. | Illustration and texture direction, footer. |
| 17 | **PayPath** (on Land-book's current feed) [V-listing] | Land-book: https://land-book.com (search "PayPath") | A recent fintech landing page in the gallery. Use it for payments-infra visual vocabulary. | Trust/security section, flow diagrams. |
| 18 | **Heist** decaf coffee (on Land-book's feed; "speakeasy-styled" per Coffee Review) [V-listing] | https://www.drinkheist.com | Represents a **target merchant**. Its rich brand world shows what Subora's merchants look like, which helps when building realistic demo storefronts and portal mockups. | Merchant-vertical imagery, demo-store mock data. |
| 19 | **Graza** (olive oil DTC) [K] (Bubble's "tactile realism" example) | https://www.graza.co | Grain, imperfect textures, and a bold single accent. A DTC brand in Subora's audience. | Texture/grain treatment, vertical tiles. |
| 20 | **Seed** (supplements, subscription DTC) [K] (Bubble's "nature-inspired" example) | https://seed.com | Earthy palette, editorial typography, and a subscription-first supplement brand in the ICP. | Vertical showcase; editorial typography reference. |
| 21 | **Shopify Editions** [K] | https://www.shopify.com/editions | Merchants recognize Shopify's own visual language. Its product-UI-led, chaptered layout fits a "Built for Shopify" story. | Shopify-native trust cues, chaptered "how it works". |
| 22 | **Mobbin**: customer-portal / subscription-management flows [K] | https://mobbin.com (search "manage subscription", "cancel flow") | Real UI flows for subscription management, skip/swap/pause and cancellation saves. Useful for designing a **credible portal demo**. | Customer portal showcase, cancellation-flow demo. |

**Galleries worth bookmarking (for the team):**
- Land-book SaaS: https://land-book.com/?category=saas
- Lapa Ninja Finance and Fintech: https://www.lapa.ninja/category/finance/
- SaaS Landing Page, Fintech tag: https://saaslandingpage.com/tag/fintech/ (lists Stripe, Ebury, Tempo, Duna, Current, Gradient Labs)
- Landingfolio sections library (pricing, FAQ, footer blocks): https://www.landingfolio.com/library/pricing
- One Page Love: https://onepagelove.com
- Awwwards SaaS: https://www.awwwards.com/websites/saas/
- Recent.design (godly.website now redirects here): https://recent.design. Better for micro-interactions, such as its "X Subscription Modal" and "Animated Footer Letterforms" entries, than for whole pages.

---

## 2. Trends: fresh vs. overused (as of October 2026)

Sources: Bubble's 2026 trends in/out list, StudioMeyer's mid-2026 "reality check", SaaSFrame/MockFlow/Veza roundups, and my own read of the galleries. Most are agency or vendor blogs, so treat them as signals rather than evidence.

### Fresh / still earning attention
| Trend | Notes | Verdict for Subora |
|---|---|---|
| **Product shown early, as real UI with realistic data** | MockFlow and SaaSFrame both lead with this. Polar does it best. | **Adopt; this is the core of the site.** Use HTML/SVG mock UIs with believable merchant data (e.g. "Northbound Coffee · 1,284 active subscribers"). |
| **"Barely-there" UI**: hairline borders, one typeface, restraint | Linear-style. | **Adopt.** Manrope at several weights handles it, with 1px slate borders at 8–12% opacity. |
| **Tactile realism**: grain, paper, imperfect texture | Graza-style. It signals human-made work. | **Use lightly.** A subtle noise layer on warm off-white sections and woven-ring line motifs tie back to the logo. |
| **Editorial typography**: big, tight display headlines and stacked line breaks | Oversized type has become the default hero. Loop already uses stacked editorial headings. | **Adopt.** Manrope 700–800, tight tracking (-0.02 to -0.035em), and `text-wrap: balance`. Optionally pair it with a serif *only* for numerals or pull quotes, but one family is more on-brand. |
| **Interactive micro-demos** (toggles, sliders, "try it") | Fernand's widget customizer, PostHog's sliders. | **Adopt for 2 moments**: the portal theming demo and the fee calculator. |
| **Founder/manifesto voice and named humans** | Fernand, Skio's team section. | **Adopt.** A new app needs a human trust signal more than a logo wall. |
| **Machine-readable structure** (clean headings, AI summaries) | Bubble's "MX design". Skio added a "Request an AI summary" link. | **Adopt by default**: semantic HTML, JSON-LD (SoftwareApplication, FAQPage), and `llms.txt`. Cheap to do on a static export. |
| **Scrollytelling, used sparingly** | Established. | **One section at most**, e.g. the subscription lifecycle. No scroll-jacking. |

### Overused / fading
| Pattern | Status | Verdict for Subora |
|---|---|---|
| **Purple/blue mesh gradients, "aurora" glows** | Reads as 2022–24 AI-SaaS default. | **Avoid.** Amber is the only accent, used as a signal rather than as atmosphere. |
| **Glassmorphism** | StudioMeyer: "polish over substance", nav/modals only, with readability and paint costs. | **Avoid**, apart from at most a subtle backdrop blur on the sticky nav. |
| **3D blobs, organic asymmetric containers, WebGL heroes** | Called recycled; 3D is justified only for product viewers. | **Avoid.** It hurts performance and has no product payoff. |
| **Dark mode everything** | Still popular in dev tools. Trust-led commerce audiences skew light. | **Light-first.** Use slate as a *section* color (pricing, footer, CTA band) for rhythm, and ship a dark theme for docs only if it's cheap. |
| **Bento grids** | Still everywhere, so the novelty is gone. They work only when the content has clear hierarchy. | **Use once, deliberately**, for the "everything in the box" feature overview with unequal, meaningful tiles. Never as the hero. |
| **Generic AI imagery / stock 3D illustrations** | Fading because it's recognizable. | **Avoid.** Use real UI, product photography of merchant goods (coffee bags, serum bottles) or line illustrations derived from the woven rings. |
| **Scroll-jacking, heavy kinetic type everywhere** | Fading and slow on everyday devices. | **Avoid.** Kinetic type at most in a single hero word. |
| **Infinite logo marquees with fake logos** | Low trust when the logos are unknown. | Pre-launch, use **vertical tiles** (Coffee · Skincare · Supplements · Pet · Food · Boxes) or "Built for Shopify"/App Store badges instead. |

**Overall direction for Subora:** *a warm, editorial, product-first look*. The canvas is warm off-white (`#FAF7F2`-ish), set in slate ink and Manrope, with one amber signal color. Real UI mockups do the persuading, plus a little grain and woven-ring line motifs for craft. It should feel closer to Mercury, Polar and Fernand than to Recharge or a typical AI startup.

---

## 3. Section pattern library (homepage)

### Hero
1. **Split hero: editorial headline left, live portal mock right.** The mock shows a subscriber's "Next order: Oct 24 · Skip / Swap / Pause" card, with a merchant-side MRR sparkline peeking behind it. Refs: Polar, Mercury, Loop.
2. **Centered statement and wide product "stage".** A large headline and two CTAs, then a full-width framed dashboard on a slate band underneath. Refs: Linear, Attio, Column.
3. **Vertical switcher hero.** The headline stays fixed while the tabs (Coffee / Skincare / Pet…) swap the mock storefront and portal data. This speaks directly to the ICP. Refs: Column's audience tabs, Fernand's toggles.

### Logos / social proof
1. **App Store rating and review count near the CTA**: "★ 5.0 on the Shopify App Store", "Built for Shopify". Ref: Loop.
2. **Case-study cards with a single big metric each** (e.g. "−31% churn in 60 days") instead of a logo wall. Refs: Skio, Loop.
3. **Pre-launch alternative:** vertical tiles plus a founder note. Ref: Fernand's manifesto block.

### How it works
1. **3–4 numbered steps with micro-UI per step**: Install → Create plans → Launch portal → Watch retention. Refs: Polar's 01–05 sections, Skio's numbered steps.
2. **Subscription lifecycle loop diagram**: Subscribe → Bill → Fulfil → Retain → Renew. The woven rings become the loop, which is an on-brand diagram. Ref: Stripe Billing.
3. **Light scrollytelling**, with a sticky mock updating as the steps scroll (only when reduced motion is off). Ref: Shopify Editions.

### Features
1. **One deliberate bento**: large tiles for the Portal and Dunning/failed-payment recovery, small tiles for Bundles, Gifting, Prepaid and Analytics. Ref: Lapa's "Bento Grid" tag (75 examples).
2. **Alternating feature rows with real UI crops and one proof line each**. Refs: Attio, Fernand.
3. **Feature tabs by job-to-be-done** (Acquire / Retain / Manage). Ref: Loop's mega-menu taxonomy.

### Customer portal showcase
1. **Interactive portal you can click**: skip, swap, change frequency, apply a cancellation save offer. Build it as a pure client component with no backend. Refs: Mobbin portal flows, Skio's self-service walkthrough.
2. **Theming customizer**: toggles for accent color, font, radius and layout that restyle the portal mock live. Ref: Fernand's widget customizer.
3. **Phone-frame triptych**: Manage, Swap, Cancel-save shown as three mobile screens. Ref: Loop's cancellation stages.

### Migration
1. **Numbered timeline with day markers** (Day 0 audit → Day 3 import → Day 7 parallel run → Go-live). Refs: Loop, Skio.
2. **"What moves with you" checklist**: payment tokens, subscribers, next-charge dates, selling plans, portal links. Each line gets an amber check.
3. **Switcher testimonial loop** ("Moved from Recharge in 9 days") next to a "Talk migration" CTA. Ref: Loop.

### Pricing / fee calculator
1. **Transparent tiers with % + fixed fee per tier**, stating "no fee on the first $X". Refs: Polar, Paddle.
2. **Fee calculator**: a monthly-subscription-revenue slider, a current-app dropdown, and output showing **annual $ saved** (dollar framing outperforms percentage framing in 2026 pricing guides). Ref: PostHog sliders. All maths runs client-side, so it is static-export friendly.
3. **Comparison matrix** versus "typical subscription apps" (keep it factual and dated). Ref: Vercel.

### Testimonials
1. **Large pull quote** (Manrope 600, about 32px) with a merchant photo and a product shot of their goods.
2. **Metric-led cards** (quote, metric, logo). Refs: Skio, Column's exec quotes.
3. **Short video testimonials** (poster image with click-to-load). Ref: Fernand's 2-minute demo pattern.

### FAQ
1. **Two-column layout**: a sticky intro with a "Still unsure? Book a call" CTA on the left, shadcn Accordion on the right. Ref: Landingfolio's FAQ library.
2. **Grouped FAQ** (Billing & fees / Migration / Shopify & checkout / Data & security).
3. Always emit **FAQPage JSON-LD**.

### CTA
1. **Slate band with one amber button**, a short headline and a reassurance line ("Free to install · Migrate in a week").
2. **Founder sign-off CTA** with a handwritten-style signature SVG. Ref: Fernand.
3. **Woven-rings graphic CTA**: the logo rings, drawn large and cropped, as the background motif.

### Footer
1. **Big-wordmark footer**: an oversized "Subora" letterform cropped at the bottom edge. Ref: Recent.design's "Animated Footer Letterforms".
2. **Dense, organized link groups** (Product, Verticals, Compare, Migrate from…, Docs, Company, Legal) on slate. Refs: Loop, Fernand. The "Migrate from…" and "Alternatives" links also help SEO.
3. Footer extras: App Store badge, status link, changelog, and an "AI summary"/`llms.txt` link. Ref: Skio.

### Docs / guide pages
- Resend- and Stripe-style docs: a left nav, a right on-page table of contents, code/UI side by side, and callouts using an amber left border with **slate text** (see contrast notes below).

---

## 4. Accessibility & performance notes

### Contrast (computed using the WCAG 2.x relative-luminance formula)
| Foreground | Background | Ratio | AA normal text (4.5) | AA large/UI (3.0) |
|---|---|---|---|---|
| Amber `#E8A33D` | White `#FFFFFF` | **2.16:1** | Fail | **Fail** |
| Amber `#E8A33D` | Warm off-white `#FAF7F2` | 2.02:1 | Fail | Fail |
| Amber `#E8A33D` | Slate `#2B3038` | **6.15:1** | Pass | Pass |
| Amber `#E8A33D` | Deep slate `#1F2329` | 7.32:1 | Pass (AAA for normal text: 7.0) | Pass |
| Slate `#2B3038` | Amber `#E8A33D` (button) | **6.15:1** | Pass | Pass |
| White `#FFFFFF` | Amber `#E8A33D` (button) | 2.16:1 | Fail | Fail |
| Slate `#2B3038` | White | 13.27:1 | AAA | AAA |
| Slate `#2B3038` | `#FAF7F2` | 12.42:1 | AAA | AAA |
| Slate `#2B3038` | Amber tint `#F6E7CC` | 10.88:1 | AAA | AAA |
| Muted slate `#5B6270` | White / `#FAF7F2` | 6.13 / 5.74:1 | Pass | Pass |
| Light slate `#9AA1AD` | Slate `#2B3038` | 5.10:1 | Pass | Pass |
| Amber-ink `#945C0F` | White / `#FAF7F2` | 5.53 / 5.18:1 | Pass | Pass |
| Amber-ink `#A06513` | White | 4.81:1 | Pass | Pass |

**Rules that follow from this:**
- **Never use amber for text, icons, or focus rings on light backgrounds**. It fails even the 3:1 non-text threshold.
- **Amber buttons must use slate text** (6.15:1). White text on amber fails.
- On slate sections, amber works for text, links, icons and focus rings.
- For amber-coloured links or eyebrows on light backgrounds, add a darker **`--amber-ink: #945C0F`** token, which reaches 5.2–5.5:1.
- **Focus ring:** on light backgrounds use a 2px slate ring with a 2px offset, optionally with an amber outer ring for brand. On dark backgrounds use amber.
- Decorative amber (fills, underlines, chart series alongside labels) is fine on light backgrounds as long as meaning never depends on it alone.
- **Charts:** don't rely on amber vs. slate alone. Add direct labels or patterns, and test for deuteranopia.

### Motion
- Wrap every reveal and parallax animation in `@media (prefers-reduced-motion: no-preference)`. With reduced motion on, show the final state.
- Interactive demos (portal, calculator) should be **user-initiated**, with no autoplay loops longer than 5s (WCAG 2.2.2). Marquees need a pause control or should stay static.
- Animate only `transform`/`opacity`, and reserve space for mocks to avoid CLS.
- Mocks must be keyboard-operable: use real `<button>`s and shadcn primitives (Radix), and announce live calculator results with `aria-live="polite"`.

### Static export (`output: 'export'`) constraints
- No `next/image` optimization at runtime. Use `images.unoptimized: true` with pre-sized AVIF/WebP, or a build-time image pipeline. Set explicit width and height.
- No server actions, API routes, ISR or middleware. Forms (demo request, newsletter) need a third-party endpoint or a separate serverless function. The fee calculator and portal demo are fully client-side.
- Self-host Manrope via `next/font/local` or `next/font/google` (both inline at build time) using **variable weight subsetting**, `display: swap`, and preloading only the weights used above the fold.
- Make mock UIs HTML/SVG rather than screenshots. They stay crisp, can be themed, and are tiny. Lazy-load heavy demos with `next/dynamic` and `ssr: false` only if they aren't in the hero.
- Avoid WebGL and Lottie in the hero. Target LCP < 2.0s and CLS < 0.05 on a mid-range phone.
- Emit metadata, OG images (generated at build time), JSON-LD, `sitemap.xml` and `llms.txt` statically.

---

## Sources
- SaaSFrame, "10 SaaS Landing Page Trends for 2026" (403 when fetched; search summary only): https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples
- MockFlow, SaaS website design trends: https://mockflow.com/blog/saas-website-design-trends
- Veza Digital, Best SaaS homepage examples 2026: https://vezadigital.com/post/best-saas-homepage-design-examples
- Bubble, Web Design Trends 2026, in/out: https://bubble.io/blog/web-design-trends/
- StudioMeyer, Webdesign trends 2026 reality check: https://studiomeyer.io/en/blog/webdesign-trends-2026-reality-check.md
- Line25, Web Design Trends 2026: https://line25.com/articles/web-design-trends-2026/
- 925 Studios, SaaS pricing pages 2026: https://925studios.co/blog/saas-pricing-page-examples-convert-2026
- Fungies, SaaS pricing page best practices 2026: https://fungies.io/saas-pricing-page-best-practices-2026
- Ringly, Recharge alternatives 2026 (Recharge acquiring Skio, fee context): https://www.ringly.io/blog/recharge-alternatives
- Coffee Review (Heist): https://www.coffeereview.com/review/blueprint-ethiopia-guji-decaf/
- Galleries: land-book.com, lapa.ninja, saaslandingpage.com, landingfolio.com, onepagelove.com, awwwards.com, recent.design (formerly godly.website)
