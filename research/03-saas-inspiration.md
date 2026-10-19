# 03 — SaaS marketing-site inspiration for Subora

**Date:** 2026-10-19
**Method:** Live visits with Chrome screenshots, plus computed-style extraction (fonts, sizes, weights, colors read from `h1`/`h2`/`p`/`body`) and WebFetch for structure and copy.
**Sites studied (13):** Stripe Billing, Linear, Mercury, Polar, Attio, Resend, Plausible, PostHog (pricing), Orb, Lago, Paddle, Raycast, Cal.com, Chargebee. Lemon Squeezy and Polar pricing were read as text.
**Subora brand constraints:** slate `#2B3038`, a single amber accent `#E8A33D`, Manrope, and a logo of two woven rings. The stack is static Next.js + Tailwind v4 + shadcn/ui.

---

## Headline finding

**No billing company visualizes the subscription lifecycle itself.** Stripe's Billing and Subscriptions pages cover trials, proration and Smart Retries only in prose. The only visuals are a recovery bar chart and a "subscription created" modal. Chargebee, Lago, Orb and Polar show invoices, usage meters and revenue charts, not the *cycle*. Orb gets closest with a circular "orbit" diagram of pricing inputs.

Subora's woven-rings logo can fill this gap: show the period-by-period loop (order, renewal, skip, swap, failed payment, retry, recovered) as a ring or loop motif that the logo already implies. This is the strongest distinctive move available to us.

---

## Per-site notes

### 1. Stripe Billing — https://stripe.com/billing
- **Distinctive:** The headline pattern is a dark lead sentence followed by a grey continuation in one block ("Monetize faster with Stripe Billing. *Manage pricing, reduce churn…*"). Thin vertical gutter lines frame the page grid and run the full height. A sticky sub-nav for the product family (Overview / Usage-based / Subscriptions / Invoicing / Pricing / Docs).
- **Palette & type:** White and `#F6F9FC`-ish pale panels, ink `rgb(6,27,49)` (deep navy rather than black), and an indigo accent `#635BFF` for CTAs. The type is Söhne at **weight 300–400** with negative tracking (h2 32px / −0.64px). Light weights make it feel premium. The hero has a huge iridescent gradient wave, which is exactly the "purple-gradient SaaS" look we want to avoid.
- **Product UI:** **Abstracted, fake-brand mockups**: a "Roastery" coffee invoice, a "Queried" plan selector, a Jane Diaz subscription modal. These are small floating cards layered over a pale panel, not full screenshots. Each card carries believable numbers ($40.00, due April 19).
- **Motion:** Tabbed feature panels (Launch faster / Recover revenue / Fewer resources / New markets), each swapping a mockup.
- **Pricing:** Not on the product page. A closing "Always know what you pay" block links to pricing.
- **Borrow:** (1) The two-tone headline. (2) Mockups of a fictional merchant with believable figures, for example a Subora demo store "Hearth Coffee Co." (3) A "recovered revenue" stat band ($ recovered, recovery rate %). (4) Visible grid gutter lines as quiet structure.

### 2. Linear — https://linear.app
- **Distinctive:** Near-black `rgb(8,9,10)` canvas. Inter Variable at weight **510** with tight tracking (64px / −1.4px). The two-tone headline is reused here (white lead, grey `rgb(138,143,152)` continuation). Isometric **line-art figures with "FIG 0.1 / 0.2 / 0.3" mono captions**, which give it a technical-manual, editorial feel.
- **Product UI:** Real, dense product UI (tickets, IDs, roadmap timeline MAR→SEP with milestones), plus a changelog teaser with dates.
- **Motion:** Live status microcopy ("Working…", "Worked for 8 sec"), staggered reveals, and a scroll-driven hero.
- **Cycles:** In the product, cycles appear as a scope-vs-completed graph, a capacity *dial* for upcoming cycles, and labeled gaps ("cooldown"). This is a good reference for how to represent repeating periods on a timeline.
- **Borrow:** FIG-numbered line-art diagrams (we could draw ring/loop diagrams in amber hairlines). A changelog teaser for trust. Mono captions as an accent typeface. A timeline with labeled period boundaries for the billing cycle.

### 3. Mercury — https://mercury.com
- **Distinctive:** A cinematic **photographic hero**: an AI-rendered landscape with a desk on a misty hillside, in a dusky slate-violet palette. It reads "calm, considered, trustworthy" rather than "techy". A real dashboard then rises into view on scroll.
- **Palette & type:** Dark slate-navy with off-white `rgb(237,237,243)` text and a single periwinkle CTA. The type is **Arcadia / Arcadia Display** at weight 480 (a custom humanist grotesk, a little warmer than Inter).
- **Product UI:** A high-fidelity dark dashboard. **Superscript cents** ($5,216,471<sup>18</sup>) is a delightful money-typography detail. Cards show Invoicing (Overdue / Paid), a Credit Card with Autopay "Jun 1", and Bill Pay.
- **Trust:** Stats band (300K+, $20B+/mo, 4.9 rating), press logos, heavy footnoting, and founder-portrait testimonials tagged by vertical (SaaS / Ecommerce).
- **Borrow:** Superscript cents in every price and MRR figure. An atmospheric, non-tech hero image as an option (a warm golden-hour still life of subscription products: coffee bag, razor, pet food). Testimonials tagged by merchant vertical. A dashboard reveal on scroll.

### 4. Polar — https://polar.sh (and /resources/pricing)
- **Distinctive:** Strict monochrome (black / white / greys) with PP Neue Montreal at weight 400, very restrained. **Product cards float on grayscale textured photography** (sand ripples, fabric folds), which gives a tactile, crafted feel without colour. Numbered feature sections ("01 Meter anything") with the two-tone heading pattern.
- **Product UI:** A clean abstracted billing card (customer, revenue $18,436.49, "Charges Nov 1"), and a typing-prompt animation.
- **Pricing (highly relevant; same model as Subora):** "Pricing you can read off a page." Plans trade a monthly fee for a lower % fee: Starter free at 5% + 50¢, Pro $20 at 3.8% + 40¢, Growth $100 at 3.6% + 35¢, Scale $400 at 3.4% + 30¢. They publish a **breakeven table** (Pro pays off above ~$1,379/mo in sales, Growth above ~$5,634, Scale above ~$19,048) and a **worked example** (a $30 product in Sweden costs $2.94 / $2.39 / $2.26 / $2.14 per plan). There is no calculator; the table does the job.
- **Borrow:** The breakeven framing is exactly Subora's story ("every feature on every plan; you only choose how you pay"). Turn Polar's static table into an interactive slider. Also borrow product UI on textured photographic backdrops, which we could do with warm-toned amber-graded texture (linen, kraft paper, woven fabric that echoes the woven rings).

### 5. Attio — https://attio.com
- **Distinctive:** White page with a **visible bordered grid** (hairline section frames), Inter Display at 600 / 64px. A sticky left **scroll-spy list** (Build pipeline / Convert leads / Run sales motions / Forecast revenue) drives the right-hand panel. Two-tone headlines again, and a small tinted "Platform" eyebrow pill.
- **Product UI:** A real app in a macOS window chrome with an AI prompt typing animation.
- **Copy:** "Picks up leads at 2am. Catches renewals before they slip." Concrete, time-based benefit lines.
- **Borrow:** A scroll-spy feature walkthrough for Subora's 6 features (Subscribe & save, Prepaid, Portal, Recovery, Analytics, Migration). Concrete time-based copy ("Retries the card at 9am the day after payday."). A hairline grid frame.

### 6. Resend — https://resend.com
- **Distinctive:** Black canvas with a **serif display (Domaine) at 96px** for the H1 "Email for developers", ABC Favorit for H2s (tracking −2.8px), and Inter for body. A 3D-rendered dark glass cube hero with soft light. A single accent word coloured in the headline ("Integrate *tonight*" in violet).
- **Product UI:** A tabbed code block across 15+ SDKs, icon tiles, and a glossy 3D envelope icon.
- **Other:** Its markdown/agent-readable site (llms.txt-style) is a smart touch for a developer audience.
- **Borrow:** A serif display for the H1 only, paired with a sans for everything else; this would pair well with Manrope. A single accent word in amber per headline. One crafted 3D object: two woven amber/slate rings rendered in glass or brushed metal as the hero object.

### 7. Plausible — https://plausible.io
- **Distinctive:** Plain system-ui at weight 800 with an indigo accent. Unfussy and honest. A **"View live demo"** CTA that opens the real dashboard.
- **Pricing:** A **volume slider above the plan cards** ("Up to 10k monthly pageviews"); moving it updates every card's price. Monthly/Yearly toggle with a "2 months free" sticker. A dark "Enterprise" card is used as contrast.
- **Borrow:** A slider above the cards that updates them live, which is the cleanest pattern for Subora's "monthly revenue through subscriptions" input. A live demo store/portal link as a secondary CTA ("Try the customer portal").

### 8. PostHog — https://posthog.com/pricing
- **Distinctive:** A full desktop-OS metaphor (windows, desktop icons, a 3D hedgehog world), a custom font ("RoundHog"), and a highlighter-marker emphasis on a phrase ("for free."). Candid, funny copy ("One day we'd like your money, but not today."). A yellow-orange CTA (`Get started – free`) on a sage background.
- **Pricing:** A full **pricing calculator**: left column "Your estimate" lists products with running $ totals; right side has per-meter sliders (log-scale ticks 1M / 10M / 50M), editable number fields and add-on toggles. A receipt-like running total.
- **Borrow:** The receipt-style running total next to sliders, with log-scale ticks for revenue ranges. Highlighter emphasis in amber (an amber `background` underline on key phrases). Candid pricing copy. Don't borrow the OS metaphor; it's too much for Subora.

### 9. Orb — https://www.withorb.com
- **Distinctive (closest to "crafted and trustworthy" for billing):** A **warm cream background** with *warm* near-black ink `rgb(19,15,11)`. **Serif display (ABC Marist) at weight 350**, H1 "Billing, but better". **Semi-mono uppercase tracked labels** (ABC Diatype Semi-Mono, 12–16px, +1.2–1.6px tracking) used as eyebrows: "GO USAGE-BASED", "EVOLVE PRICING". Dithered/pixel-art animated tiles in saturated colours. A **circular orbit diagram** (concentric arcs, a "STATIC PRICING" circle, nodes for "VALUE", "SEATS", "SPREADSHEETS & CONTRACTS").
- **Borrow:** The serif + grotesk + semi-mono label trio. Warm ink rather than pure black (for Subora, slate `#2B3038` already plays this role). Concentric-orbit diagrams, which can directly echo the woven rings: two interlocking circles with nodes for each renewal event. The overall "editorial fintech" tone.

### 10. Lago — https://www.getlago.com
- **Distinctive:** A warm off-white `lab(96…)` background, GT America at 500 (−2px tracking), a bright blue accent. Abstracted UI cards (token usage bar chart, prepaid-credits wallet card) layered on a soft lavender panel.
- **Borrow:** The "prepaid credits" card is a direct analogue for Subora's prepaid subscriptions card ("6 of 12 deliveries remaining"). Otherwise conventional.

### 11. Paddle — https://www.paddle.com (+ /pricing)
- **Distinctive:** Warm greige/stone backgrounds (`#E9E6DF`-ish), warm ink `rgb(28,26,21)`, a **condensed serif display ("Serrif Condensed")** at 64px for H1/H2, and Inter body at 20px. **The single warm accent is a small yellow square** used only as the arrow chip inside the "Book a demo" button. This shows how a warm accent can work as a tiny, consistent signature rather than a flood colour.
- **Product UI:** **Stacked sticky cards**: each product (Billing, ProfitWell Metrics…) is a large rounded stone-coloured card that stacks over the previous one on scroll, with real dashboard and checkout UI bleeding off the right edge.
- **Pricing:** "Our pricing": two big cards (Pay-as-you-go vs Custom), "No added costs, no hidden fees", with icon bullets of everything included.
- **Borrow:** **The amber "chip" as a signature**, for example a small amber ring or arrow tile inside primary CTAs, used sparingly. Stacked sticky feature cards. The condensed-serif + Inter pairing as a reference for a serif accent.

### 12. Raycast — https://www.raycast.com
- **Distinctive:** The best reference for **one saturated warm accent on a near-black base**: near-black `rgb(7,8,10)` and a hero of grainy, diagonal red light-slats (noise/dither texture, blurred edges). Inter at 600. The accent is almost the only colour on the page.
- **Borrow:** The grainy light-ray treatment in amber on slate would feel warm, like golden-hour light through blinds, rather than techy. Noise texture overlays (CSS `feTurbulence` SVG filter) to avoid flat-gradient genericness.

### 13. Cal.com — https://cal.com
- **Distinctive:** Light grey `rgb(244,244,244)` page with a big white rounded "sheet" containing the hero. **Cal Sans** (a custom geometric display at weight 600) over a light UI variant at 300. The hero is a **real, interactive booking widget** (event card + month calendar).
- **Pricing/trust:** Review-site star badges (Trustpilot, Product Hunt, G2) under the CTA.
- **Borrow:** An interactive hero widget: a *working* mini customer portal ("Skip next delivery / Swap flavour / Change frequency") that the visitor can click. Also borrow the star-rating row under the CTA; for us, the Shopify App Store rating and "Built for Shopify" badge.

### 14. Chargebee — https://www.chargebee.com/recurring-billing-invoicing/
- **Distinctive:** A teal gradient wash with an orange CTA. The hero is a **full itemised invoice** (line items, discounts, tax, total $98,196.84), which signals precision and reliability.
- **Borrow:** The invoice/receipt as a hero motif is a good trust device. For Subora this would be a "renewal receipt" showing an order, the 10% subscribe-and-save discount, and the next charge date.

### Also referenced: Lemon Squeezy pricing — https://www.lemonsqueezy.com/pricing
- One price (5% + 50¢, $0/mo) plus a **"How much moola will you save"** comparison table: Lemon Squeezy "Included" vs "sticky-tape solution" adding +0.5–1%, +$20–500/mo, and so on. Playful copy.
- **Borrow:** An "everything included" vs "typical subscription-app add-ons" table. Many Shopify subscription apps gate the portal, analytics, dunning and migrations behind higher tiers, so this table makes Subora's "all features on every plan" concrete.

---

## Cross-cutting observations

| Theme | What best-in-class sites do |
|---|---|
| Headline style | **Two-tone headline** (strong lead sentence followed by a muted continuation) on Stripe, Linear, Attio and Polar. It has become a 2025–26 standard; easy and effective. |
| Type | Light-to-medium weights (300–510) with negative tracking signal craft. **Serif display + grotesk body** (Resend, Orb, Paddle) is the clearest way to escape the template look. Mono or semi-mono uppercase eyebrows add an editorial, technical feel. |
| Accent | Warm accents are used **sparingly**: Paddle's yellow chip, Raycast's single red, Orb's warm ink. Cool brands flood their accent (Stripe indigo); warm ones ration it. |
| Ink | Premium sites avoid pure `#000` on light pages: Stripe uses navy ink, Orb and Paddle warm-brown ink. Our slate `#2B3038` is already a good "ink". |
| Product UI | The trend is **abstracted, fake-brand UI cards** with believable data, layered and floating (Stripe, Lago, Polar), not full raw screenshots. Real full UI appears once, lower on the page (Mercury, Linear). |
| Texture | Grain/noise (Raycast), grayscale photography (Polar), dithered pixels (Orb) and 3D objects (Resend) all replace flat gradients. |
| Pricing (fee vs flat) | Polar's **breakeven table + worked example**; Plausible's **slider above the cards**; PostHog's **slider + receipt total**; Lemon Squeezy's **"included vs add-ons" table**. |
| Lifecycle visuals | **Unclaimed.** Nobody draws the renewal loop, which is our opening. |

---

## Borrowable patterns, ranked by fit for Subora

1. **"The Loop" renewal-cycle visual (original, logo-derived).** Two interlocking rings, Shop (slate) and Customer (amber). As the user scrolls, a dot travels the loop and passes event nodes: *Order placed → Renewal in 3 days (email) → Customer skips/swaps in portal → Charge → Failed → Smart retry → Recovered → Shipped*. Each node lights amber and shows a small fake-brand UI card. Technique: SVG paths + `stroke-dashoffset` driven by scroll (Framer Motion `useScroll` or CSS scroll-driven animations). Inspired by Orb's orbit diagram, Linear's cycle timeline and Stripe's floating cards. **Highest fit:** nobody else owns this, and it is the logo's story.
2. **Interactive pricing breakeven slider (Polar + Plausible + PostHog).** One slider, "Monthly subscription revenue: $2k … $500k" on a log scale. Plan cards update live with total monthly cost. The cheapest plan gets an amber ring outline and a "Best for you" chip. Beneath it, a small **breakeven line chart** (cost vs revenue, one line per plan, crossover points marked with amber dots) and a receipt-style total with superscript cents. Headline: "Every feature. Every plan. You just pick how you pay." **Highest fit for the pricing page.**
3. **"Everything included" vs "typical add-ons" table (Lemon Squeezy).** Rows: customer portal, dunning, analytics, migrations, prepaid, unlimited subscriptions. The Subora column shows ✓ Included; the "Typical subscription app" column shows "+$… / higher tier". Keep it generic (no competitor names) unless legal approves.
4. **Fake-brand merchant mockups with believable numbers (Stripe).** Invent 2–3 demo Shopify stores (for example a coffee roaster, a pet-food brand, a skincare brand) and reuse them across all UI cards: portal, renewal email, analytics, recovery stats. Use Mercury-style **superscript cents** on all money.
5. **Two-tone headlines plus a single amber accent word (Linear/Stripe + Resend).** "Subscriptions that come back around. *Every period, on time.*" Use slate-900 for the lead, slate-500 for the continuation and at most one amber word per page section.
6. **Paddle-style amber chip signature.** Primary buttons are slate with a small amber square containing a ring or arrow glyph. The amber accent becomes an identifiable, rationed signature rather than a fill colour.
7. **Interactive mini customer portal in the hero (Cal.com).** A working widget: "Next delivery: Nov 4 · Skip · Swap · Change every 4 → 6 weeks". Clicking updates the date and the Loop. It shows merchants what their customers get, and doubles as the demo.
8. **Scroll-spy feature walkthrough (Attio)** for the 6 features, with a sticky left list and a swapping right-hand panel. Alternative: **stacked sticky cards (Paddle)**.
9. **Recovery stat band (Stripe/Mercury).** Big numerals: "$X recovered", "Y% of failed payments won back", "Z min to migrate". Use only real numbers once we have them; until then, frame them as product capabilities rather than stats.
10. **Editorial details (Linear/Orb).** FIG-numbered hairline diagrams with semi-mono uppercase eyebrows ("FIG 02 — SMART RETRY"). A changelog teaser for "we ship" trust, and a "Built for Shopify" badge plus App Store star row under the CTA (Cal.com).
11. **Grain/texture instead of gradients (Raycast/Polar).** A subtle noise overlay on slate sections, and amber light-slat or glow shapes. Never purple, never a multicolour mesh.
12. **Live demo link (Plausible).** "Open the demo portal" as a secondary CTA.

Skip: PostHog's OS metaphor, Stripe's iridescent waves, and Mercury's full-bleed AI landscape. All are off-brand or too costly.

---

## Typography recommendations (with Manrope)

Manrope is a geometric-grotesk hybrid that is friendly and slightly technical. It works best at weights 400–600 with slight negative tracking on display sizes (−0.02em to −0.035em). Bold 800 looks generic.

- **Option A: Manrope only (safest).** H1 at 600 / −0.035em, body at 400. Add **JetBrains Mono** or **Geist Mono** (both free) for eyebrows, figures and FIG captions, uppercase with +0.08em tracking, as in Orb. Use tabular figures (`font-variant-numeric: tabular-nums`) in pricing.
- **Option B: serif display accent + Manrope (most distinctive).** The serif is used for H1s and big numbers only. Free candidates on Google Fonts:
  - **Fraunces** (soft, warm, "wonky" optical axis). Pairs beautifully with amber and feels crafted; use opsz 72–144 at weight 300–400. *Top pick.*
  - **Instrument Serif**: an elegant condensed display, close to Paddle's "Serrif Condensed" feel, and very current.
  - **Newsreader** or **Source Serif 4**: more sober, editorial and trustworthy.
- **Option C: different grotesk display + Manrope body.** **Bricolage Grotesque** gives a characterful display with a crafted feel; **Instrument Sans** is a crisper, more Swiss alternative. This is lower impact than a serif.

Recommendation: **Instrument Serif or Fraunces for H1s and hero numerals, Manrope for everything else, and Geist Mono for labels.** It mirrors the Resend/Orb/Paddle trio that best separates "crafted" sites from templates.

---

## Moodboard: 3 art directions

### A. "Golden Hour Ledger": warm editorial light (recommended)
- **Palette:** Warm paper background (`#F7F4EE`) and slate `#2B3038` as ink and for dark sections. Amber `#E8A33D` is **rationed**: one accent word per headline, the CTA chip, the active node on the Loop, the "Best for you" pricing ring. Supporting neutrals: slate-500 `#6B7280`-ish for the muted half of two-tone headlines, hairline `#E4DED3`.
- **Type:** Fraunces or Instrument Serif display (H1, big numerals with superscript cents); Manrope UI/body; Geist Mono uppercase eyebrows ("FIG 01 — THE LOOP").
- **Imagery:** Fake-brand Shopify store UI cards (portal, renewal email, recovery chart) floating over warm-toned photographic texture (linen, kraft paper, woven cane), with an occasional golden-hour still life of subscription products. Hairline FIG diagrams of the woven rings.
- **Motion:** A scroll-driven Loop: the ring stroke draws on and an amber dot travels between event nodes. Cards settle with a soft spring. The pricing slider animates numbers with a ticker. Respect `prefers-reduced-motion`.
- **Refs:** Orb, Paddle, Polar, Stripe mockups, Mercury cents.

### B. "Slate Night": dark precision with an amber signal
- **Palette:** Slate-based dark theme (`#1E2228` page, `#2B3038` surfaces, `#3A404A` borders), off-white text `#EDEBE6` and amber as the single signal colour (like Raycast's red), for live states, retries recovered and CTAs. A grain overlay on all dark surfaces.
- **Type:** Manrope at 500–600 with tight tracking for everything (Linear-style), and Geist Mono for data and labels. No serif.
- **Imagery:** Dense, real-feeling dark product UI (analytics, recovery queue). A hero of amber light-slats through blinds, grainy and diagonal, forming two overlapping rings of light. A 3D glass/brushed-metal woven-rings object (Resend-style) as an alternative hero.
- **Motion:** Status microcopy ("Retrying… recovered $42<sup>00</sup>"), counters, slats that shimmer on cursor move, and staggered UI reveals.
- **Refs:** Raycast, Linear, Resend, Mercury dashboard.
- **Risk:** Dark SaaS is common; it relies on execution quality to feel distinctive.

### C. "Woven": tactile and craft-forward
- **Palette:** Cream and stone backgrounds, slate ink, and amber used more generously as a *material colour* (thread, ribbon, kraft tape), alongside a muted secondary derived from slate (dusty blue-grey `#8A94A3`) for illustration only.
- **Type:** Instrument Serif (or Fraunces italic) for display with a handmade, editorial voice; Manrope body.
- **Imagery:** Illustrated or photographed *woven* objects: two cords looping through each other for each section divider, renewal dates as knots along a thread (a timeline drawn as one continuous woven line), and product UI embedded in "paper" cards with subtle deckled shadows.
- **Motion:** A thread that draws itself down the page, connecting sections (scroll-linked SVG path), knotting at each feature. Slight paper parallax.
- **Refs:** Orb's warmth, Paddle's stone cards, plus craft and stationery brands. This is the most ownable and memorable direction, but needs illustration investment and risks feeling less "fintech-reliable" if overdone.

**Suggested path:** Build **A** as the base system (light, editorial, trustworthy), borrow **B**'s dark slate sections for the analytics and recovery band and the footer (alternating light and dark rhythm), and use **C**'s woven-thread motif only as the Loop visual and section dividers.
