# 02 — Competitor Website Design Teardown

**Date:** 2026-10-19
**For:** Subora (Shopify subscriptions app) public marketing site
**Method:** I fetched each live home page and pricing page as text, pulled the raw HTML/CSS with curl to find font families and frequent hex values, and took browser screenshots of the hero and first scroll of every site (desktop, 1470px wide). Hex values are approximate. They come from the most frequent colors in the CSS plus visual checks.
**Caveat:** These sites change often. Headlines, prices and stats below are what was live on the date above. Re-check before quoting any of them in our own copy.

---

## 1. Summary comparison

| Site | Hero headline (verbatim) | Primary CTA | Palette (dominant / accent) | Type | Product shown as | Proof style | Pricing model shown |
|---|---|---|---|---|---|---|---|
| **Recharge** | "The world's leading subscription platform" | Talk to us / Book a demo | Warm off-white + black, electric blue `#3454F4`/`#0129F1`, lime `#DCEC5A` | P22 Mackinac (serif) + Inter + Space Mono | Lifestyle photo hero, tilted UGC/product photo carousel, a few mock UI cards | Market-share stat (71%), logo carousel, big-number metrics | $99 + 1.49%+19¢ / $499 + 1.34%+19¢ / Custom |
| **Skio** (a Recharge company) | "The fastest-growing CPG brands scale subscriptions with Skio." | Get a demo (only CTA) | Lavender `#F7F5FD`, deep purple `#462379`/`#5D38A0`, pink `#F670C7` | Recoleta (serif display) + Poppins | Floating product "bubbles" + cartoon astronaut cat. Almost no product UI on home | Testimonial cards with headshot + brand logo, outcome stats | $499/yr-billed ($599 monthly) + 1%+20¢ / Enterprise |
| **Loop** | "The last subscription platform you'll ever need." | Book your consultation call → | White + violet `#7726D9`/`#8B43FD`, deep indigo `#3B197F`, warm gradients | Fraunces / DM Serif Display (headings) + Inter | Full-bleed lifestyle video hero; phone + Slack-message mock | App Store pill (760+ reviews, 5.0), logo band, case-study cards, badges | $99 + 1.0% / $399 + 0.75% / Let's talk (Free ≤50 subs in FAQ) |
| **Appstle** | "Build incredible subscription experiences" | Get Started / Install the app | Cream bg, sky blue `#09A9EB`, navy `#110F3F` | Open Sans (Astra WP theme) | Product photo with a floating "Purchase Options" widget mock | Star row + "4,000+ reviews", Shopify/Shopify Plus logos, "As Seen On" press | Not shown in page text (image/App Store) |
| **Seal** | "Seal Subscriptions™ Subscription app for Shopify" | Find it on the Shopify App Store (badge) / Install the App | Pale periwinkle `#F4F5FA`, royal blue `#0A53C0`, yellow `#FBC539`, orange `#E34E0E` | Barlow | Isometric box illustration and confetti shapes. Little real UI | Star row + 2,700+ reviews, "40,000+ merchants", video testimonial | Free → $399, **0% transaction fee**, subscription caps per tier (7 tiers) |
| **Stay AI** | "The Shopify subscription platform built for growth" | Get Started / Book a Demo | Hot magenta `#CF088B`/`#F609A5` to violet `#A825FF` gradient, near-black `#212121` | TWK Lausanne | Gradient hero with no product; later image tiles for AI features | Logo row with "Case study" tags, gradient big-% stats, 8 quote cards | $499 + 1%+19¢ / Enterprise |
| **Smartrr** | "The last subscription platform you'll ever need" | Get a demo / Take a tour | Lilac `#EFEEFB`, plum `#2B1224`/`#3B1E33`, acid lime `#CEF31E` | Sharp Grotesk + Messina Sans (+ Messina Mono) | Fan of 5 phone mockups of real merchant PDPs | "Rated 5 stars" row, logo marquee, 5 testimonials | $99 / $299 / $499+ each **+1% GMV** |
| **Recurpay** (a Marmeto product) | "The best Shopify subscription app that takes you live in minutes" | Shopify App Store badge (huge) / Install Now / Get Live Demo | White + black, lime CTA, Shopify-ish green `#008060` | Source Sans 3 + Inter, Fraunces loaded | Stock photo of a woman pointing at a "Subscribe and Save" widget | Logo marquee (×2), "7,500+ brands", "10M+ orders", Product Hunt badge | $9 / $19 / $99, 0% transaction fee, revenue cap |
| **Joy Subscription** (Avada) | "Built-to-order Subscription App for Shopify Fast-Scaling Brands." | Start free on Shopify / See it in action | Coral-red `#E53935`, near-black `#1C0E12`, blush `#FAF7F8` | Serif display (high-contrast) + General Sans | Darkened video hero; animated "recovery events" feed | "5,000+ brands", 4.9★, 94% stat, 23 case studies | Free (≤50) / $49 + 0.75% / $199 + 0.5% / Enterprise, **interactive calculator** |
| **Bold Subscriptions** | "Sell more to every subscriber" (Bold home: "Built for the buy-again.") | Try free on Shopify → / Let's talk | Midnight indigo bg, hot pink CTA, lilac gradient text | Geometric grotesk (Bold brand) | Coded HTML dashboard, checkout and portal mocks; constellation animation | Big stats ($7.5B+ GMV, 41K+ brands), Shopify Plus Certified badge, 1 quote | $24.99 + 2% / $49.99 + 1% / $74.99 + 0.9% / $399.99, on the product page |
| *Judge.me* (reviews) | "The #1 reviews app for Shopify" | Collect reviews for free → | Teal-navy `#0E415F`, mint `#8AF3A8`, green `#3EB2A2` | Gelica (serif) + Inter | Real widget mock (media grid) beside hero | "Built for Shopify" + award chips; logos tabbed by revenue band | Free-first |
| *Okendo* (reviews/loyalty) | "Turn shoppers into Superfans" | Email field + Book a demo | Near-black + mint/aqua | IBM Plex Sans (+ Zilla Slab) | Dark UI cards (quiz, loyalty push) floating at angles | Per-product single metric, SOC 2/GDPR badges, partner logos | Demo-led |
| *Klaviyo* (email/SMS) | "Real relationships. Real growth. Built autonomously." | Email field + Sign up / Get a demo | Off-white `#F4F4F3`, charcoal `#2B2C2F`, orange arc, lime announcement bar | Custom sans + mono eyebrow ("THE AUTONOMOUS B2C CRM") | Tablet mock of real segment UI | Restrained, enterprise | Free-first, usage-based |

**Patterns in one glance**
- 8 of 10 subscription sites put **purple, magenta or violet** at the center of the palette (Skio, Loop, Stay, Smartrr, Bold, plus purple tints at Recharge, Recurpay and Seal). Only Joy (coral-red) and Appstle/Seal (sky or royal blue) step outside it.
- **Two competitors share the exact same hero line:** Loop and Smartrr both say "The last subscription platform you'll ever need."
- **Serif-display plus grotesk** is now the norm (Recharge, Skio, Loop, Joy, Judge.me). A geometric sans alone (our Manrope) would read as different.
- **Demo-first CTAs dominate the premium tier** (Recharge, Skio, Loop, Stay, Smartrr). **Install-first CTAs dominate the value tier** (Seal, Appstle, Recurpay, Joy, Bold).
- **Nobody** offers "all features on every plan, choose a flat fee or a % fee." Every pricing page ladders features or caps subscriptions by tier.

---

## 2. Site-by-site teardown

### 2.1 Recharge — getrecharge.com (rechargepayments.com 301-redirects here)
- **Hero:** "The world's leading subscription platform" / "Powering 71% of subscriptions sold on Shopify stores."
- **CTAs:** Primary "Talk to us" (blue pill, mono uppercase), secondary "Founders' story" (outline with play icon). Header: "Book a demo", "Login".
- **Palette:** warm paper `#F7F3F0`, black sections, electric blue `#3454F4`/`#0129F1`, lime `#DCEC5A` stickers.
- **Type:** P22 Mackinac Pro (light editorial serif) for headlines, Inter Variable for body, Space Mono for buttons and eyebrows.
- **Section order:** promo bar (trend report, with sticker art "RETENTION RULES", "LOYAL AF") → photo hero → "We're relentless in pushing our product forward" (104 updates/yr, tilted photo carousel on black) → "Built on three unshakeable pillars" → "Guidance at every step" → "Easily start, scale, and manage…" (Subscriptions / Loyalty / Support) → "Make more money on Recharge" → "Engineered to give you control" → "Made for Shopify" → "Backed by an ecosystem" → "Powering the leading brands in every vertical" (logos grouped by vertical) → "Partner with the best" → footer.
- **Product shown:** mostly lifestyle and merchant product photography (a darkened kitchen photo in the hero). UI appears as small cropped mock cards (credits notification, bundle builder, monthly report). A floating picture-in-picture "The Story of Recharge" video player follows you down the page.
- **Proof:** a market-share number as the subhead. Stats include $1B+/month, $42B GMV, 100M subscribers, 20,000 brands, 95%+ CSAT. There is a 19-logo carousel, 2 CEO testimonials, and **no App Store rating**.
- **Pricing page:** "Scalable rates for every stage of growth". Three cards: Starter $99 + 1.49% + 19¢, Plus $499 + 1.34% + 19¢ ("Most popular"), Custom. The comparison table sits behind "Show comparison". The FAQ covers the 60-day trial and 12-month terms on Plus. No calculator.
- **Interactions:** tilted, fanned photo carousel, a sticky PiP video, a sticker-collage promo bar.
- **Works:** it feels the most confident and editorial (serif plus mono reads like a magazine), and the market-share subhead is a strong proof point.
- **Weak / cliché:** the hero has nothing to do with the product. It is a stock-feeling kitchen photo, and you can't tell what the software does above the fold. "World's leading" is generic incumbent language. The PiP video is intrusive.

### 2.2 Skio — skio.com
- **Hero:** "The fastest-growing CPG brands scale subscriptions with Skio." / "1,000+ subscription brands like IM8, Grüns, and Everyday Dose run their subscription program on Skio. Acquire more customers, increase LTV, and free your team to focus on growth."
- **CTAs:** only "Get a demo" (purple pill). No self-serve path. The logo lockup reads "skio — a recharge company".
- **Palette:** lavender hero panel `#F7F5FD`, deep purple `#462379`/`#5D38A0`, bubblegum pink `#F670C7`, slate body text `#535861`.
- **Type:** Recoleta SemiBold (soft retro serif) for display, Poppins for everything else. Built on Framer.
- **Section order:** hero → "The brands you subscribe to trust Skio" (case-study logos) → "The most flexible way to acquire, retain, and reward subscribers." / "Meet Skio" bento (Flexible, Built for Scale, Peace of Mind, Simple, Intuitive, Built Different) mixing feature tiles and quote tiles → No-Code Journey Builder → Modern User Experience → Advanced Segmentation & Reporting → results stats (5× fewer cancellations, 25% more upsells, 3× fewer tickets) → Gains In Bulk case study → Plug-and-play → Integrations (200+) → Team → "This is what a Shopify subscription platform should feel like." → final CTA.
- **Product shown:** the hero has floating translucent "bubbles" holding merchants' product packs plus a cartoon astronaut cat. Product UI comes later and is sparse.
- **Proof:** testimonial bento cards with headshot, title and brand wordmark. Quotes sit inside feature tiles.
- **Pricing:** "Choose the plan that's right for you". Scale is $499/mo billed annually or $599 monthly, plus 1% + 20¢. Enterprise is custom. The page title claims "Transparent Pricing, All Features Included". About 20 FAQ questions. Only CTA is "Get a demo", with no trial.
- **Interactions:** a hand-drawn pink ellipse around "fastest-growing" and "Skio", and floating bubbles.
- **Works:** it has personality. The bento mixing features and quotes is efficient. Naming customers in the subhead is strong.
- **Weak / cliché:** purple plus pink plus a mascot reads as playful-startup, not trustworthy-infrastructure. Demo-only gating. The hand-drawn circle highlight is everywhere in 2025–26 SaaS.

### 2.3 Loop Subscriptions — loopwork.co
- **Hero:** "The last subscription platform you'll ever need." Eyebrow pill above: "760+ 5.0 ★ reviews on Shopify app store". Text subhead: "Top-rated Shopify subscription app".
- **CTAs:** "Book your consultation call →" (violet). Header: "Book a demo", plus a "Comparing Loop with?" dropdown in the nav.
- **Palette:** violet `#7726D9`/`#8B43FD`, indigo `#3B197F`/`#281466`, off-whites `#F8F9FD`, warm peach-to-mauve gradient bands.
- **Type:** Fraunces and DM Serif Display for display, Inter for body. Bricolage Grotesque appears too, and about 14 Google families are loaded (sloppy).
- **Section order:** video hero → purple logo band "Trusted by 2400+ Shopify subscription brands" → "We know why you are here" (4 pain cards) → "Every one of those problems? Loop shows up." → "Shows up as your team" ("Real people. In your dedicated Slack channel." with a Slack-message mock over a phone PDP) → testimonial carousel → "Shows up as your platform" (feature cards: Portal, Failed payment recovery, Cancellation flows, Growth, Surprise & delight, Operations, Analytics) → "Shows up as your results" (1,100+ migrated) → "Shows up for the switch" (4-step migration timeline) → "Shows up at the right pricing" → footer.
- **Product shown:** full-bleed lifestyle video (mother and child), then a phone mock with a realistic Slack thread from a CSM. Feature cards use UI screenshots. There's a demo-store link.
- **Proof:** App Store pill in the hero, logo band, case-study numbers (Primal Queen $2M → $100M+, OSEA churn 10% → 5%), G2-style "Best Support / High Performer" badges, and a chat bubble that pops up uninvited.
- **Pricing:** "Scale your subscriptions. Not your **fees**" (serif with italic and bold mix). Starter $99 + 1.0%, Pro $399 + 0.75% ("Best value"), Enterprise "Let's talk", $0 per-order fee on all. A 70-feature comparison table. The FAQ has a worked cost example (10k orders × $50 AOV ≈ $4,149/mo on Pro).
- **Works:** the "Shows up as…" narrative spine is the best storytelling in the category. Showing the support relationship (Slack) is concrete and believable. Pain-first framing works.
- **Weak / cliché:** the headline is shared word-for-word with Smartrr. Lifestyle video says nothing about the product. Purple. The chat popup interrupts the hero.

### 2.4 Appstle Subscriptions — appstle.com/products/ecommerce-subscriptions/ (appstle.com/subscriptions returns 404)
- **Hero:** "Build incredible subscription experiences" / "With Appstle Subscriptions it's that simple. Appstle provides Shopify's most powerful and customizable subscription features."
- **CTAs:** "Get Started" (sky-blue rectangle, goes to the App Store). Header: "Become a Partner" (navy). Elsewhere "Install the app" and "Get in touch".
- **Palette:** cream with a faint wave pattern, sky blue `#09A9EB`, navy `#110F3F`.
- **Type:** Open Sans on the Astra WordPress theme. Generic.
- **Section order:** hero → merchant photo-card carousel → "A subscription platform built to grow your business" + Install → tabbed showcase (Bundling, Flexible Billing, Loyalty, Build a Box) → 4 benefit blocks → "40,000+ Shopify brands" → feature grid (APIs, Quick Checkout, Build a Box, Bundling, Portal, Automations) → integrations wall → reviews → company blurb → comparison and resource link lists (SEO) → contact form.
- **Product shown:** a styled product photo (amber cosmetic bottles) with a floating "Purchase Options: One Time / Subscribe and save / Delivery Frequency" widget. This is the clearest above-the-fold picture of *what a subscription app adds to a store* in the set.
- **Proof:** orange star row "4,000+ reviews", "40,000+ merchants", Shopify and Shopify Plus wordmarks as badges. The parent site has "As Seen On" press logos (Forbes, Bloomberg).
- **Pricing:** headline "Subscriptions Pricing". Plan details aren't in the HTML text (an image, or a link out to the App Store). "*No hidden charges".
- **Interactions:** the hero loads blank, then fades in late (slow).
- **Works:** the widget-on-product hero is clear and merchant-literal.
- **Weak:** it looks like a WordPress template. The nav is crowded (7 dropdowns, including "Competition Comparison"). Pricing is opaque. SEO link farms sit on the product page.

### 2.5 Seal Subscriptions — sealsubscriptions.com
- **Hero:** "Seal Subscriptions™ / Subscription app for Shopify" / "Unlock the potential of predictable recurring revenue and skyrocket your business growth with Seal Subscriptions - the ultimate subscription solution for discovering new opportunities." Star row "(2,700+ reviews)" and a "Built for Shopify" chip above and below.
- **CTAs:** a black "Find it on the Shopify App Store" badge, then "Install the App" (royal blue).
- **Palette:** pale periwinkle `#F4F5FA`, royal blue `#0A53C0`, indigo `#2835A4`, sunflower `#FBC539`, orange `#E34E0E`.
- **Type:** Barlow (semi-condensed grotesk), uppercase letter-spaced nav.
- **Section order:** hero → "Charge customers automatically, control cancellations, automate discounts and more!" → "Boost revenue, customer lifetime value…" → "Join 40,000+ happy merchants" → video testimonial → metrics (350% retention, $100B renewals, 8+ yrs) → "Our expert development team is there for you" → footer.
- **Product shown:** a giant isometric box illustration and floating geometric confetti. Almost no real UI on home.
- **Pricing:** "Try out our premium plans with a 30-day free trial". **0% transaction fee** on all plans, priced by subscription caps: Free (50), $5.95 (100), $9.95, $24.95, $89.95, $199, $399 (150k). Yearly saves 20%. About 60-row comparison table.
- **Works:** plain-spoken, fast, honest pricing story (no % of revenue).
- **Weak / cliché:** dated 2018-SaaS look (isometric box, confetti, exclamation marks). The headline is just the product name. "Skyrocket" and "ultimate solution" copy. Seven tiers is a lot of mental math.

### 2.6 Stay AI — stay.ai
- **Hero:** "The Shopify subscription platform built for growth" / "Turn subscriptions into your top growth channel with AI-optimized cancel flows, automated winbacks, and deep cohort analytics."
- **CTAs:** "Get Started" (white pill on gradient). Header: "Book a Demo" (magenta pill).
- **Palette:** full-bleed magenta `#F609A5` → violet `#A825FF` gradient with diagonal hatching, pink tints `#FEF0FA`, near-black `#212121`.
- **Type:** TWK Lausanne (neo-grotesk).
- **Section order:** gradient hero → "Trusted by top Shopify brands" (logos tagged CASE STUDY) → "Merchants who switch to Stay see" (28% / 32% / 28% / 39% in gradient numerals) → quote cards (Brez, ARMRA, etc.) → "What's unique about Stay?" → 4 feature cards → "Scale your subscription program with AI-powered tools" → features → "Real results from real brands" → "Frustration-free migrations" → "We play well with others" → FAQ → newsletter.
- **Product shown:** no product above the fold. The AI-feature section uses image tiles.
- **Proof:** "CASE STUDY" micro-labels under logos (nice), big gradient % stats, 8 quote cards. **No App Store rating shown.**
- **Pricing:** "Simple pricing, no surprises!" Pro $499 + 1% + 19¢ with all features included, plus Enterprise. The Enterprise line reads "Built to incentivize, not punish (like those other guys)." No calculator.
- **Works:** stat row with linked case studies. Simple, all-inclusive pricing message.
- **Weak / cliché:** the gradient hero is pure 2021 Web3/AI aesthetic. "AI-optimized" in the subhead. Nothing shows the product. The four stats are suspiciously round and unsourced.

### 2.7 Smartrr — smartrr.com
- **Hero:** "The last subscription platform you'll ever need" / "Flexible enough for any use case, powerful enough to scale with you no matter how big you get, Smartrr has everything you need to do what matters most—drive more repeat purchases." Eyebrow: "★★★★★ RATED 5 STARS ON THE [Shopify] app store". The logo lockup shows "Relay" above "Smartrr".
- **CTAs:** "Get a demo" (acid lime) / "Take a tour" (grey).
- **Palette:** lilac `#EFEEFB`, plum `#2B1224`/`#3B1E33`, acid lime `#CEF31E`, lavender `#A56EFF`.
- **Type:** Sharp Grotesk (display), Messina Sans (body), Messina Sans Mono (labels). Pill-shaped grey nav buttons.
- **Section order:** podcast promo bar → hero → "These stores run on Smartrr" (5 phone mockups) → logo marquee → "THE SMARTRR TAKE: SUBSCRIBERS MATTER MOST" → building blocks → features → testimonials → "Acquiring subscribers is just the start." → "Why Smartrr is a no-brainer." → "A Customer Account Portal that converts." → "Serious results, for serious operators" → migration → "Definitely, 100% Shopify Native…" → case studies → "Ready to Get Smartrr?" form.
- **Product shown:** **the best hero product proof in the set.** A fanned row of real merchant PDPs on phones (Jolie filter $148 subscribe vs $165, cookie-dough build-a-pack, fragrance bundle), with a hand-drawn arrow reading "These stores run on Smartrr".
- **Pricing:** "The smartest way to invest in your repeat customers." Launch $99, Grow $299 ("Most Popular"), Excel $499+, **each + 1% of subscriber GMV**. Comparison table. 14-day trial.
- **Works:** showing real storefronts, not admin screens, is the most merchant-relevant way to show a subscription app. The lime on plum is distinctive.
- **Weak:** identical headline to Loop. The hero copy is a 40-word run-on sentence. The hand-drawn arrow is a trend.

### 2.8 Recurpay — recurpay.com ("A Marmeto Product")
- **Hero:** "The best Shopify subscription app that takes you live in minutes" / "Recurpay gives growing Shopify brands everything they need to launch, retain, and scale subscriptions, without the complexity or the cost". Checkmarks: "Setup in minutes / No developers needed", "Real 24/7 human support. Not bots", "Start Free, no monthly fee until you earn".
- **CTAs:** a very large black "Find it on the Shopify App Store" badge. Header: "Get Live Demo" (black) and "Install Now" (outline).
- **Palette:** white and black, lime CTA, Shopify-green accent `#008060`. Dark purple announcement bar.
- **Type:** Source Sans 3 (body and heads), Inter, with Fraunces loaded but barely used.
- **Section order:** announcement bar → waitlist popup → hero → "Trusted By Top Shopify Brands" marquee → "Crafted for modern eCommerce brands" (3 icon features) → "Start Subscription Today" merchant showcase → "10 Million+" orders → 9-item feature grid → "❤️ Our Loved Ones ❤️" testimonials → "Easy Integration and helpful onboarding" → Product Hunt badge, repeat logos → footer.
- **Product shown:** **stock photo of a smiling woman pointing** at a floating "Subscribe and Save" widget card. Otherwise icons.
- **Pricing:** "Simple, transparent pricing". Launch $9, Grow $19 ("Popular", dark card with lime button), Scale $99, all **0% transaction fee**, with revenue caps ("Up to $100K"). No calculator.
- **Works:** clear, value-led benefit checkmarks. Low, simple price.
- **Weak / cliché:** the pointing stock-photo woman is the category's worst cliché. Emoji headings. A popup on arrival. "The best…" superlative. A typo ("sustomer portal").

### 2.9 Joy Subscription (by Avada) — joysubscription.com
- **Hero:** "Built-to-order Subscription App for Shopify Fast-Scaling Brands." / "Free custom development for any subscription model, plus 30% lower transaction fees & merchant-first support."
- **CTAs:** "Start free on Shopify ↗" (coral pill) / "See it in action ↗" (text). Header: "Start Free", plus "Book a demo" with an arrow-in-circle icon.
- **Palette:** coral-red `#E53935`, deep wine-black `#1C0E12`, blush `#FAF7F8`. The only warm-red brand in the set.
- **Type:** high-contrast editorial serif for display (two-tone: "Built-to-order" in coral, rest in white), General Sans for UI.
- **Section order:** promo bar ("Free widget rebuild when you switch") → video hero → "Trusted by 5,000+ Shopify brands" → "A custom powerful retention engine…" (an **animated live feed** of events: payment recovered, dunning sent, win-back queued) → 3 value blurbs → feature grid → bundles → "Any subscription model, built exactly to order." → integrations → stats and testimonials → case studies (23) → FAQ "Switching to Joy, answered." → closing CTA.
- **Product shown:** a darkened talking-head video in the hero. Further down, the animated event feed shows the product working, which is effective.
- **Pricing:** "Fair pricing that doesn't punish ROI." Free (≤50 subs, 0%), Starter $49 + 0.75%, Pro $199 + 0.5% ("Best value"), Enterprise. **An interactive cost calculator** (sliders for orders and AOV, monthly/annual toggle) that recommends a plan. A compare-plans table includes "Coming soon" rows.
- **Works:** the calculator. The live event feed. A distinct warm color. Leading on price ("30% lower transaction fees").
- **Weak:** the busy hero video sits under text and hurts legibility. "Fast-Scaling Brands" Title Case is clunky. Features are still gated by tier.

### 2.10 Bold Subscriptions — boldcommerce.com/shopify/subscriptions (homepage: boldcommerce.com)
- **Hero (product page):** eyebrow "BOLD SUBSCRIPTIONS FOR SHOPIFY CHECKOUT" / "Sell more to every subscriber" / "The only Shopify subscriptions app built to upsell at every touchpoint from first click to renewal." Company home: "THE REPEAT COMMERCE COMPANY — Built for the buy-again."
- **CTAs:** "Try free on Shopify →" (hot-pink pill) / "Let's talk" (white pill).
- **Palette:** midnight indigo/navy background, hot pink, lilac-gradient headline words, green delta chips. A pink announcement bar.
- **Type:** wide geometric grotesk for display, small-caps tracked eyebrows.
- **Section order (product page):** hero with a "Bold Subscriptions — Dashboard" mock (MRR $84.2k, 2,841 active subs, 94.2% retention) and a Shopify Plus Certified badge → stats ($7.5B+ GMV, 63M+ recurrences, 41K+ brands) → "Most subscription apps just process recurring billing." (Conversion / LTV / AOV / Churn) → quote → "Offer subscriptions your way." (model chips and billing schedules) → "Native checkout. No hacks. No friction." (coded checkout summary and My Subscriptions portal mock) → portal → LTV → **cancellation flow mock with a reason → offer table** → **failed-payment recovery as a 5-step timeline and a "Dunning dashboard — this month" table** → rePete cross-sell → "Built for your category" (9 verticals) → migration → **pricing on the product page** ($24.99 + 2% / $49.99 + 1% / $74.99 + 0.9% / $399.99) → competitor comparisons → FAQ → final CTA.
- **Product shown:** **HTML/CSS-coded mock UI** (dashboard, checkout line items, portal list, cancel survey, dunning table) instead of screenshots. It is crisp, readable and on-brand. The company home uses a constellation/network-node animation linking photo cards ("Pricing", "Subscriptions", "AI Upsells").
- **Works:** this is the most *explanatory* page in the category. Each feature is shown as the actual artifact (the cancel survey text, the dunning numbers). Pricing is inline. The comparison links are honest about the competitive set.
- **Weak / cliché:** dark-purple "space" with glowing nodes is the default fintech/AI look. Mock numbers are obviously fabricated. The page is very long. The footer says © 2024.

### 2.11 Category-norm references (outside subscriptions)
- **Judge.me** (judge.me): "The #1 reviews app for Shopify" / "Sell more, with consumer confidence – at every stage of growth." CTA "Collect reviews for free →" (mint) plus "Explore Judge.me in 1 min →". Teal-navy `#0E415F` and mint `#8AF3A8`, Gelica serif with Inter. A real widget mock ("Media grid") in the hero. "Built for Shopify" and "Innovation Awards 2025" chips. **A standout pattern:** "From day-one founders to Shopify Plus giants" with **logo walls tabbed by revenue band (Under $2M / $2M–$20M / $20M–$125M / $125M+)** and "Case study →" chips. It looks calm and trustworthy, not purple.
- **Okendo** (okendo.io): "Turn shoppers into Superfans" (second line in mint) with an email field and "Book a demo" in the hero. Near-black background with aqua/mint, IBM Plex Sans. Dark angled UI cards (quiz, loyalty push). Each product tab carries **one** headline metric. A security block (SOC 2 / GDPR / CCPA) and a Trust Center link: enterprise trust done quietly.
- **Klaviyo** (klaviyo.com): mono eyebrow "THE AUTONOMOUS B2C CRM", a three-line declarative headline "Real relationships. Real growth. Built autonomously.", email-capture plus "Sign up". Off-white `#F4F4F3`, charcoal, a single orange arc as the only illustration, and a tablet showing a real segment list. The most restrained of all. Lots of whitespace and one accent color.

**Takeaway from the references:** the most respected Shopify-ecosystem brands look *calmer* than subscription apps. They use one accent color, a real UI mock in the hero, a free or self-serve CTA, and trust badges handled quietly.

---

## 3. Synthesis

### 3.1 Visual clichés Subora should avoid
1. **Purple/violet/magenta as the brand color, or purple-to-pink gradients.** Skio, Loop, Stay, Smartrr, Bold and parts of Recurpay all use it. Slate + amber is already a clear break, so we should not dilute it with purple tints.
2. **Full-bleed lifestyle photo or video heroes with no product in them** (Recharge kitchen, Loop mother and child, Joy talking head). They look premium but explain nothing, and they all look alike.
3. **Stock people pointing at floating widgets** (Recurpay), plus **isometric boxes and confetti** (Seal).
4. **"Last platform you'll ever need" / "world's leading" / "the best" / "built for growth" headlines.** These superlatives are interchangeable. Two competitors literally share one.
5. **Neon or gradient hero backgrounds with hatching or "space" constellations** (Stay, Bold home). This is AI/Web3 shorthand.
6. **Hand-drawn circles, squiggle underlines and doodle arrows** to highlight words (Skio, Smartrr). It's a fading trend.
7. **Unsourced round-number stat rows** ("28% / 32% / 28% / 39%") and fake-looking dashboard numbers.
8. **Mascots and cartoon animals** (Skio's astronaut cat). Fun, but at odds with "we hold your recurring revenue".
9. **Interruptions on arrival:** chat bubbles over the hero (Loop), waitlist popups (Recurpay), sticky PiP video (Recharge).
10. **Feature-gating ladders** ("Everything in Starter, plus…"). Subora's model makes these unnecessary, so don't copy the layout out of habit.

### 3.2 Table stakes (merchants expect these; omitting them costs trust)
- **The Shopify App Store rating and review count above the fold**, ideally as an eyebrow pill (Loop, Smartrr, Seal, Appstle). Also a **"Built for Shopify"** badge if earned.
- **A logo wall right below the hero**, plus at least 2–3 named case studies with a concrete number.
- **A self-serve "Install on Shopify" / "Start free" CTA**, plus a secondary "Book a demo" or "See it live". Mid-market merchants want both doors.
- **A migration story** with a step timeline, "free", "zero downtime" and named source apps. Every competitor has it, and Loop and Bold make it a full section.
- **A failed-payment recovery (dunning) explanation** and **cancellation/save flows.** These are now core, not bonus features.
- **A customer-portal visual** (skip, swap, pause, change frequency).
- **Transparent pricing on a public page**, with both monthly fee and transaction fee spelled out, a trial length, and an FAQ that covers "do Shopify/processor fees stack?".
- **Competitor comparison pages** ("vs Recharge", "vs Loop"…). Loop, Smartrr, Joy, Appstle and Bold all have them in the nav.
- **An integrations wall** (Klaviyo, Gorgias, Shopify Flow, etc.).
- **Security and trust** signals (SOC 2/GDPR if applicable, uptime/status page).

### 3.3 Opportunities for Subora to look and feel different while staying trustworthy

1. **Own "warm slate", not "neon purple".** Use a calm slate `#2B3038` ink on a warm off-white, with amber `#E8A33D` reserved for *one job only*: money moving in the merchant's favor (recovered payments, saved subscribers, CTAs). In a purple category, a disciplined slate-and-amber system will read as "finance-grade infrastructure" the way Klaviyo's restraint does, and every amber pixel will mean something.

2. **Make pricing the hero feature, with a "choose your billing shape" toggle.** No competitor offers "every feature and unlimited subscriptions on every plan; you only choose flat monthly fee vs transaction fee". Show it as **one plan card with a two-position switch** (Flat fee ⇄ % of revenue) plus a Joy-style calculator that draws the **break-even point** between the two at the merchant's own volume. Put a teaser of it on the home page. This is both our differentiator and our main trust signal: no feature table full of grey dashes.

3. **Show the product as coded, live-feeling UI, not photos.** Take Bold's coded mocks and Joy's event feed and make them better and calmer. The hero could be a real storefront PDP with a Subora "Subscribe & save" selector, next to a slim slate ledger of events ticking by ("Payment recovered · $42.00", "Skip → kept · Ava R.", "Prepaid 3-month renewed") with amber highlights. That explains the product in five seconds with no stock people. Build it in HTML/SVG so it's crisp, themeable and light.

4. **Use the woven rings as a system, not just a logo.** Two interlocking rings = merchant + subscriber, or order + renewal. Use the ring geometry as the motif for section dividers, the loading state, a "cycle" diagram of the subscription lifecycle (subscribe → renew → recover → retain), and the active state on the pricing toggle. No competitor has a brand device beyond a wordmark. This gives Subora a recognizable visual without mascots or gradients.

5. **Name the job instead of using a superlative headline.** Everyone else claims "leading/last/best". Lead with a plain, specific promise in Manrope at large, tight-tracked weights, for example a line about every feature and unlimited subscriptions on every plan, plus your choice of how you pay. Pair it with Klaviyo-style mono or small-caps eyebrows for structure. Manrope's geometric clarity *is* a differentiator against the serif-plus-grotesk trend. Don't add a serif just to fit in.

6. **Proof that is specific and verifiable.** Use the App Store rating as a live-looking pill and keep it current. Steal Judge.me's **logo wall segmented by store size** so a $500k store and a Plus brand both see peers. Cite every stat ("median across N stores, Jan–Sep 2026") instead of round, unsourced numbers. If we're new and lack big logos, lean on transparency instead: a public changelog, a status page and a named founder or support team (Loop's Slack proof shows people buy the humans).

7. **Migration as a calm, concrete checklist.** Show a "switching from Recharge / Skio / Loop / Appstle…" picker that changes a 4-step timeline and what transfers (contracts, payment tokens, schedules, discounts, portal links). Put the "no feature downgrade" angle up front: since every Subora plan has every feature, nobody migrates *into* a lower tier.

8. **Motion with purpose, not decoration.** Limit animation to (a) the event-feed ticker, (b) the pricing-toggle break-even line redrawing, and (c) a ring "close" micro-interaction on CTA hover. No floating bubbles, constellations, autoplay hero video or popups, and respect `prefers-reduced-motion`. A fast, quiet page is itself a trust signal against heavy Framer/Webflow sites (Loop loads about 14 font families).

---

### Appendix: raw observations
- Ownership signals seen in the logo lockups: Skio "a recharge company", Recurpay "A Marmeto Product", Smartrr "Relay" above the wordmark, Joy listed among Avada's apps.
- Free-tier caps: Loop and Joy both offer free up to 50 active subscriptions. Seal's free plan is also capped at 50. Recurpay caps by revenue.
- Transaction fees observed: Recharge 1.34–1.49% + 19¢; Skio 1% + 20¢; Stay 1% + 19¢; Loop 0.75–1.0%; Smartrr +1% GMV; Joy 0.5–0.75%; Bold 0.9–2%; Seal and Recurpay 0% (but capped tiers).
- Monthly fees observed: Recurpay $9–$99; Seal $0–$399; Bold $24.99–$399.99; Joy $0–$199; Loop and Smartrr from $99; Recharge $99/$499; Skio and Stay $499.
- Sources: getrecharge.com (+/pricing), skio.com (+/pricing), loopwork.co (+/pricing), appstle.com/products/ecommerce-subscriptions/ (+/products/appstle-subscriptions-pricing/), sealsubscriptions.com (+/pricing), stay.ai (+/pricing), smartrr.com (+/pricing), recurpay.com (+/pricing), joysubscription.com (+/pricing), boldcommerce.com and boldcommerce.com/shopify/subscriptions, judge.me, okendo.io, klaviyo.com. All visited 2026-10-19.
