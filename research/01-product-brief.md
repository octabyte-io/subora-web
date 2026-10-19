# Subora website: product and positioning brief

Prepared 2026-10-19 for the designer and copywriter of the Subora marketing site.

**Sources.** All paths are relative to `/Users/nabeel/test/shopify-apps/`.

- `subora/Subora_Product_Specification.md` (the spec; § numbers below refer to it)
- `subora/CONTEXT.md` (the domain glossary)
- `subora/docs/release-1-build-plan.md` (the build plan)
- `subora/docs/brand/README.md`
- `subora/app/domain/fee/tier.ts` (the plan prices, which are the source of truth)
- the app's routes and extensions under `subora/app/routes/` and `subora/extensions/`
- the sister site `waitly-web/`

> **Rule for the whole site (borrowed from waitly-web's README):** market only what the app ships. Where the spec and the build plan disagree, the build plan and the code win. Each disagreement is listed below.

---

## 1. Summary

Subora is a Shopify subscriptions app. Merchants use it to sell products on a recurring basis, and their customers manage their own subscriptions from the store's customer account.

It covers the whole lifecycle:

- building subscription plans: Subscribe & Save, Prepaid, Trial and Fixed-length
- selling them on the storefront with a product-page Picker, collection badges and a cart offer
- billing renewals reliably
- recovering failed payments
- saving cancellations with reason-based retention offers
- reporting MRR, churn, recovery and retention

Its commercial idea is the differentiator: **every plan includes every feature and unlimited subscriptions, and plans differ only in how you pay.**

| Plan | Monthly fee | Transaction fee |
|---|---:|---:|
| Free | $0 | 2% |
| Growth | $49 | 0.5% |
| Pro | $99 | 0% |

Most competitors gate features, cap subscriptions or revenue, or charge $99 to $599 a month plus a fee on every transaction. Subora lets a new store start at $0 and gives a high-volume store a flat $99 with no fee at all.

The app is built and being tested, but **it is not listed on the Shopify App Store yet**. The build plan stops at "feature-complete. Nothing is published" (`release-1-build-plan.md`, "Where this plan stops").

---

## 2. Target audiences

These come from spec §3. The order reflects what Release 1 serves best.

1. **Small and new DTC brands starting subscriptions.** Lead with "$0 a month, every feature." These are consumable categories: coffee and tea, supplements and wellness, beauty and skincare, pet, food and beverage, and household refills.
2. **Growing brands that have outgrown a free or capped app.** Examples are Seal's 50 to 500 subscription caps, Appstle's revenue caps and Loop's or Joy's 50-subscription free plans. Lead with "unlimited subscriptions on every plan" and the $49 Growth plan.
3. **High-volume brands paying percentage fees** to Recharge, Skio, Stay AI, Smartrr or Loop. Lead with "Pro: $99 a month, 0% fee." Be careful: their main switching path is migration, which is **not** in Release 1 (see §4).
4. **Subscription-box and membership-style stores.** Prepaid and Fixed-length plans fit them. Build-a-Box and bundles do **not** ship yet, so don't target "build your own box" buyers.
5. **Agencies** (secondary). Use a light FAQ mention only. Multi-user permissions, the public API and webhooks are Release 3.

Subora is tested on a **non-Plus (Basic)** store as the default, so it works for ordinary Shopify plans, not just Plus (build plan, Slice 0).

---

## 3. Core value propositions and differentiators (ranked)

1. **All features, every plan.** No feature gating (spec §4.1, §37). The competitors gate as follows:
   - Appstle: Build-a-Box, retention and bulk actions on Business ($30 and up)
   - Loop: prepaid on Pro ($399)
   - Joy: dunning and cancellation flows on Starter ($49)
   - Recurpay: cancellation flows on Growth
   - Seal: cancellation flow on Rising Star
2. **Unlimited subscriptions, no revenue caps.** Seal caps Free at 50 subscriptions and paid plans at 100, 250 and 500. Loop and Joy cap their free plans at 50. Appstle caps revenue: $500, $5k, $15k and $100k a month.
3. **A zero-fee path.** Pro is a flat $99 a month with a 0% fee and no per-order cents. Recharge, Skio, Stay AI and Smartrr all charge a percentage on every plan, often with 19 to 20¢ per transaction on top.
4. **Subora tells you when another plan would cost less.** The Upgrade prompt compares your last 30 days of fees. It recommends a cheaper plan in either direction, down as well as up, and is always labelled an estimate (CONTEXT "Upgrade prompt"; `app/routes/app.upgrade-prompt`). This is a trust message: "We'll tell you when you're overpaying us."
5. **Retention-first.** Before a customer cancels, they pick a reason and see a matching offer:
   - a discount for the next orders
   - skip the next order
   - change frequency
   - pause for 30 or 60 days
   - swap to another product

   Merchants see Save rate and Revenue retained. This was observed working end to end (build plan Slice 8, done 2026-10-06).
6. **Failed-payment recovery that is honest about outcomes.** It has:
   - configurable Retry rules
   - an end result per store: pause, cancel, skip, or wait for a new card
   - customer emails at each step
   - Recovery numbers

   A sold-out product is treated as a "store problem," not as the customer's card failing (Slice 7, done 2026-10-14; CONTEXT "DunningRun", "Failure kind").
7. **Native to Shopify.** It has three parts:
   - a theme app block (the Picker) that needs no code and works on Online Store 2.0 themes
   - the Customer portal inside the store's own **customer account**, branded as the store and not as Subora
   - Shopify's own checkout, billed through Shopify

   The portal is built on Shopify's Customer Account UI extensions ahead of Shopify's **2026-12-01** deadline for buyer self-service (Slice 3).
8. **Reliability.** Duplicate webhooks can't double-charge, reconciliation runs against Shopify, and there is a full audit trail. The engineering is real (ADR-0003, -0010, -0015), but keep this to one supporting section. It is a proof point, not a headline.

The **migration-friendly** point in spec §37 is not a differentiator yet. It is deferred, so don't claim it.

---

## 4. Feature list, grouped for the website

The labels mean:

- **Ships (R1)**: in Release 1 and observed or built in the app.
- **Later**: in the spec but not in Release 1. Show it as "Coming soon" or leave it out.
- **Check**: ships, but needs confirmation or careful wording.

### A. Subscription plans (the offer)

| Feature | Status | Notes / wording |
|---|---|---|
| Subscribe & Save (Ongoing plan) | **Ships (R1)** | Percentage off, amount off, fixed price or no discount (`app/domain/plan/price-rule.ts`). |
| Prepaid plans | **Ships (R1)** | "Pay once for several deliveries," e.g. ship monthly and pay every 6 months. The plan renews or ends after the paid period. |
| Trial plans | **Ships (R1)** | **The trial is counted in orders, never days**: the first N orders are free or discounted, then one price. Don't write "14-day free trial" (CONTEXT "Trial"). |
| Fixed-length plans | **Ships (R1)** | Ends after N paid orders, and the customer gets a "completed" email. |
| A second price from a later order | **Ships (R1)** | E.g. "10% off the first 2 orders, then 15%." The form supports **one** later price (`price-rule.ts` `LaterPrice`). |
| Multi-step loyalty ladders (10% → 15% → 20%) | **Later** | Spec §8.2 and §39 (Release 2). |
| Delivery every N days, weeks, months or years | **Ships (R1)** | Several delivery frequencies on one plan (portal locale `frequency.*`). |
| Free shipping: every order, first order, or first N orders | **Ships (R1)** | Via a Shopify Function (`extensions/subora-free-shipping`, CONTEXT "SubscriptionPlan"). |
| Subscription-only products | **Ships (R1)** | The "Sell only as a subscription" box (`app/routes/app.plans.subscription-only`). |
| Minimum orders before a customer can cancel | **Ships (R1)** | Applies to Ongoing and Trial plans only. Pause and skip still work (CONTEXT "Minimum cycles"). |
| Build-a-Box | **Later** | Spec §12. "Expressed in the schema, not built" (build plan, "What Release 1 does not build"). |
| Fixed and mix-and-match bundles | **Later** | Spec §13. |
| Free gift after X renewals, customer-segment discounts | **Later** | Spec §8.2 and §39. |

### B. Storefront

| Feature | Status | Notes |
|---|---|---|
| Product-page **Picker** (one-time vs subscription, savings, frequency) | **Ships (R1)** | A theme app block and app embed (`extensions/subora-picker/blocks/picker*.liquid`). It says the charge recurs and links to the store's subscription policy. Translated into EN, DE, ES, FR, IT, JA, NL and PT-BR. |
| **Collection badge** ("Save 15%", "Free trial", "Subscription available") | **Ships (R1)** | `collection-badge*.liquid`, Slice 6. |
| **Cart offer** (turn a one-time cart line into a subscription) | **Ships (R1)** | `cart-offer-embed.liquid`, Slice 6. ⚠ Spec §39 lists "Cart subscription conversion" under Release 2, but the build plan and code put it in R1. **Market it.** |
| Quick view / dynamic product components | **Later** | Spec §9.4, explicitly out of R1 (Slice 6). |
| Advanced storefront customization / custom CSS | **Later** | Spec §39. R1 has theme-editor settings. Don't promise "custom CSS." |

### C. Customer portal (customer self-service)

The portal lives inside the store's customer account as a full page, plus a "Manage subscription" button on orders (`extensions/subora-portal`, `extensions/subora-order-action`).

| Customer action | Status |
|---|---|
| See subscriptions, upcoming deliveries, status | **Ships (R1)** |
| Skip a delivery, and unskip it | **Ships (R1)** |
| Pause and resume | **Ships (R1)** |
| Cancel (with the retention flow) | **Ships (R1)** |
| Reschedule: get a delivery **sooner** | **Ships (R1)**. In Subora, Reschedule only moves a delivery *earlier*. Pushing a delivery later is done by skipping it (CONTEXT "Reschedule"). Write "Get the next delivery sooner, or skip it," not "change the delivery date." |
| Change quantity, frequency, variant | **Ships (R1)** |
| Swap to another product (from the merchant's Swap list) | **Ships (R1)** |
| Update shipping address | **Ships (R1)** (CONTEXT "Customer action") |
| Update the payment method | **Ships via Shopify.** Shopify's own secure card-update flow handles it, and Subora reacts to it. Write "Customers update their card through Shopify." |
| Add or remove extra products, "Send now" | **Check / Later.** These are not in the R1 Customer action list. Don't claim them. |
| Merchant can turn off any action except Cancel | **Ships (R1)** (CONTEXT "Disallowed action") |
| Portal languages | **Check.** The portal locale is English only (`extensions/subora-portal/locales/en.default.json`). |

### D. Merchant subscription management

| Feature | Status |
|---|---|
| Subscription list with search and filters (status, plan, end reason, and so on), CSV export | **Ships (R1)** (`app.subscriptions._index`, `app.subscriptions_.export`) |
| Edit any subscription on the customer's behalf (the same actions as the portal) | **Ships (R1)** (Slice 4) |
| Bulk actions: Pause, Resume, Cancel, Skip, Reschedule | **Ships (R1)**. Bulk actions cover only these one-step changes, not product or quantity edits (CONTEXT "Bulk action"). |
| Activity log (who changed what: customer, merchant, Subora or Shopify) | **Ships (R1)** (`app.activity`) |
| "Needs attention" flags (e.g. a missed renewal) | **Ships (R1)** |
| Manually create a subscription | **Later / Check.** Spec §11.2, but it is not seen in R1. |
| Multi-user roles and permissions | **Later** (Release 3) |

### E. Payments and failed-payment recovery

| Feature | Status |
|---|---|
| Automatic renewals through Shopify billing | **Ships (R1)** |
| Retry rules: number of retries, gaps between them, maximum recovery period | **Ships (R1)** (`app.payment-retries`) |
| End result when retries run out: pause, cancel, skip, or wait for a new card | **Ships (R1)** |
| Customer emails: payment failed, last try, recovered, and payment ended | **Ships (R1)** |
| "Retry now" button for the merchant, plus an automatic retry when a new card is added | **Ships (R1)** |
| Recovery numbers: failed, recovered, rate, recovered revenue, unrecoverable revenue | **Ships (R1)** (`app.failed-payments`, `app.analytics.failed-payments`) |
| "Advanced dunning" | **Later** (spec §39). It is undefined, so don't reference it. |

### F. Retention and churn prevention

| Feature | Status |
|---|---|
| Cancellation reasons: 7 fixed reasons, any can be turned off except Other | **Ships (R1)** |
| A matching offer per reason: discount for the next N orders, skip, change frequency, pause 30 or 60 days, swap | **Ships (R1)**. Subora decides which offers go with which reason, and the merchant switches each one on or off. |
| Retention page: attempts, saved, Save rate, offers accepted, Revenue retained | **Ships (R1)** (`app.retention`, `app.analytics.retention`) |
| Fully custom cancellation flows | **Later** ("Advanced cancellation flows", spec §39) |

### G. Analytics

| Feature | Status |
|---|---|
| Dashboard: Active subscribers, MRR, subscription revenue, churn, failed and recovered payments, projected recurring revenue | **Ships (R1)** (Slice 9) |
| Subscribers, Revenue, Churn, Retention and Failed payments tabs, each with a CSV export | **Ships (R1)** (`app.analytics.*_.export`) |
| Lifetime value (basic, historical) | **Ships (R1)** |
| Cohort retention and subscribers by acquisition period | **Later** (Release 2) |
| Revenue forecasting, churn prediction, AI insights | **Later** (Release 3 and §41) |

### H. Emails to customers

| Feature | Status |
|---|---|
| Lifecycle emails: created, renewal upcoming, paused, resumed, cancelled, skipped, unskipped, rescheduled, payment failed, completed, discount added, quantity changed, product changed | **Ships (R1)** (CONTEXT "Notification kind") |
| Each email can be switched off per store, except "created," which App Store rules require | **Ships (R1)** |
| Email branding: logo and brand colour, sent in the store's name | **Ships (R1)** (CONTEXT "Email branding") |
| No duplicate renewal receipt (Shopify's order confirmation is the receipt) | **Ships (R1)**. Use it as an FAQ answer. |
| Merchant alerts (failed-payment spike, high cancellations) | **Later** |
| SMS | **Not planned in the spec.** Don't mention it. |

### I. Onboarding and billing

| Feature | Status |
|---|---|
| Setup guide: first plan, place the Picker in one Save, turn on the portal page, first purchase | **Ships (R1)** (Slice 11, passed 2026-10-14; `app.setup-guide`) |
| Billing page: the current plan, a statement per 30-day bill, CSV export | **Ships (R1)** (`app.billing`) |
| Upgrade prompt | **Ships (R1)** |

### J. Integrations, API and migration (all Later)

| Feature | Status |
|---|---|
| Migration from Recharge, Appstle, Seal, Bold, Loop, Skio | **Later** (deferred, with unsolved prerequisites, e.g. "a contract cannot be created without a vaulted payment method") |
| Klaviyo, Omnisend, Gorgias, Shopify Flow | **Later** (Release 2) |
| LoyaltyLion, Smile.io | **Later** |
| Public API, outbound webhooks, developer docs | **Later** (Release 3) |
| Inventory protection and forecasting | **Later** |
| AI insights, retention recommendations, analytics assistant | **Later** (spec §41) |

**Recommendation:** add one small "On the roadmap" strip, on the Features index or the Pricing FAQ, that names migration, Build-a-Box and bundles, and Klaviyo and Flow. Don't add Later items to the feature pages.

---

## 5. Pricing model and how to present it

### The facts

These come from `subora/app/domain/fee/tier.ts` and CONTEXT "Tier", "TransactionFee", "BillableSale".

- The plans are Free ($0 + 2%), Growth ($49 + 0.5%) and Pro ($99 + 0%). The monthly fee covers 30 days and is in USD, billed through the Shopify invoice. **The spec's "TBD" is settled.**
- **Every plan has every feature and no subscription limit. No plan has a free trial.** CONTEXT gives the reason: "Free already gives every feature at a 2% rate, so there is nothing a trial would let a Merchant try." This differs from waitly-web, which advertises 14-day trials, so don't copy that line.
- **What the fee applies to:** the subscription lines of each paid order, at checkout and on every renewal, after discounts and **excluding tax, shipping and tips**.
  - Refunds and chargebacks are credited back as a Reversal.
  - The fee is charged to the merchant, never to the customer.
  - The fee **has no cap or ceiling**. That is deliberate: the merchant is protected by the Upgrade prompt instead.
- **Break-even points** (build plan, Slice 10), measured as monthly subscription revenue:

  | Monthly subscription revenue | Cheapest plan |
  |---|---|
  | Below about $3,270 | **Free** |
  | About $3,270 to $10,000 | **Growth** |
  | Above $10,000 | **Pro** |

- **Changing plans** happens on Shopify's own plan page and takes effect immediately. A store with no plan approved counts as Free.
- **Currency.** The app's own wording is: "Prices are in USD. If Shopify bills you in another currency, it converts them at its own rate, so your bill may differ a little" (`USD_SENTENCE` in `tier.ts`). Reuse it on the pricing page.

### How to present it

This follows spec §36 and waitly-web's `/pricing` pattern, adapted.

- **Headline idea:** "Every feature. Unlimited subscriptions. Choose how you pay." Or use the spec tagline, "Everything your subscriptions need."
- **Three equal columns**, each showing the monthly fee and fee rate in large type with a one-line pitch from spec §36:
  - Free: "Start with zero monthly cost."
  - Growth: "Lower your transaction fees as your store grows."
  - Pro: "Predictable pricing for high-volume stores."
- **No feature-comparison table.** Put one shared statement under the columns: "Every plan includes every Subora feature and unlimited subscriptions." Then link to a single "What's included" list.
  - This is the biggest change from waitly-web. Its `src/content/plans.ts` and `PlanColumns` show limits and feature additions per plan, and Subora's should not.
  - `subora-web/src/content/plans.ts` should mirror `subora/app/domain/fee/tier.ts`, the way Waitly's mirrors `waitly/app/domain/billing/plan.ts`.
- **An interactive "Which plan is cheapest for me?" slider.** The visitor enters monthly subscription revenue and sees the cost on each plan, with the cheapest highlighted. Examples:

  | Monthly subscription revenue | Free | Growth | Pro |
  |---|---:|---:|---:|
  | $2,000 | **$40** | $59 | $99 |
  | $5,000 | $100 | **$74** | $99 |
  | $20,000 | $400 | $149 | **$99** |

  Call it an estimate, and say "Subora's app does this for you every month" (Upgrade prompt).
- **A fine-print block:**
  - what counts toward the fee (subscription lines after discounts, excluding tax, shipping and tips)
  - refunds are credited
  - fees are billed through Shopify every 30 days, in USD
  - you can change plans any time on Shopify's plan page
- **An optional comparison** against "a typical $99 + 1% + 19¢ app" (the Recharge, Stay AI and Skio pattern) at the same revenue levels. Keep it generic or carefully sourced, and avoid naming competitors in large type (see the open questions).
- Don't use the spec §35 worked example ("$132 in fees… upgrade to Pro"). **It recommends the wrong plan.** $132 of fees on Free is about $6,600 of revenue, where Growth would cost $82 (build plan, Slice 10).

---

## 6. Competitor pricing comparison

Checked **2026-10-19** on the Shopify App Store listings. Prices are in USD per 30 days, as each listing shows them. "Gated" means the cheaper plans lack features that the higher ones add.

| App | Plans (monthly + fee) | Free plan / limits | Feature gating | Rating (reviews) | Source |
|---|---|---|---|---|---|
| **Recharge** | $25 (no fee for the first 50 subscribers; fee after that not stated) · Starter $99 + 1.49% + 19¢ · Plus $499 + 1.34% + 19¢ | No free plan; 60-day trial shown | Yes: bundles, loyalty and SDK on Plus | 4.8 (3,139) | https://apps.shopify.com/subscription-payments |
| **Skio** | Scale $599/mo (or $5,988/yr) + 1% + 20¢ | None listed | Single plan | 5.0 (243) | https://apps.shopify.com/skio |
| **Loop** | Free (50 active subs) · Starter $99 + 1% · Pro $399 + 0.75% | Free, capped at 50 subscriptions | Yes: dunning, bundles and cancellation flows on Starter; prepaid and APIs on Pro | 5.0 (788) | https://apps.shopify.com/loop-subscriptions |
| **Appstle** | Free (≤$500/mo revenue) · $10 (≤$5k) · $30 (≤$15k) · $100 (≤$100k), all 0% fee | Free, revenue-capped | Yes: Build-a-Box, bundles, retention and bulk on $30 and up; swaps on $100 | 5.0 (9,053) | https://apps.shopify.com/subscriptions-by-appstle |
| **Seal** | Free (50 subs) · $5.95 (100) · $9.95 (250) · $24.95 (500), all 0% fee; larger plans unpriced | Free, capped at 50 subscriptions | Yes: cancellation flow and passwordless portal on paid plans | 4.9 (3,146) | https://apps.shopify.com/seal-subscriptions |
| **Stay AI** | $499 + 1% + 19¢ | None; 30-day trial | Single plan | 4.9 (148) | https://apps.shopify.com/stayai-subscriptions |
| **Smartrr** | Launch $99 · Grow $299 · Excel from $499, each + 1% of subscriber GMV | None; 14-day trial | Yes: prepaid and integrations on Grow; loyalty on Excel | 4.9 (71) | https://apps.shopify.com/smartrr |
| **Recurpay** | Free (dev stores) · Launch $9 · Growth $19, all 0% fee | Free for dev stores only | Yes: cancellation flows, Build-a-Box and integrations on Growth | 5.0 (577) | https://apps.shopify.com/recurpay-subscriptions |
| **Joy** | Free (50 active subs) · Starter $49 + 0.75% · Professional $199 + 0.5% | Free, capped at 50 subscriptions | Yes: dunning, bundles and cancellation flows on Starter | 4.9 (463) | https://apps.shopify.com/joy-subscription |
| **Bold** | Launch $24.99 + 2% · Grow $49.99 + 1% · Scale $74.99 + 0.9% | No free plan; 30-day trial; "unlimited subscribers" | None listed beyond the fee (the closest model to Subora's) | 4.0 (381) | https://apps.shopify.com/bold-subscriptions |
| *Shopify Subscriptions* (Shopify's own) | Free | Basic feature set | n/a | 3.7 (866) | https://apps.shopify.com/shopify-subscriptions |

### Takeaways for the copy

- **Bold is the closest pricing model** to Subora's: the same features on every plan, with a lower fee on higher plans. Subora beats it on every column:
  - $0 instead of $24.99 to start, at the same 2%
  - $49 + 0.5% instead of $49.99 + 1%
  - a real **0%** plan, which Bold never reaches (its floor is 0.9%)
- **Against the premium apps** (Recharge, Skio, Stay AI, Smartrr), a store doing $20k a month in subscription revenue pays roughly $300 to $800 or more a month with them, before per-order cents. On Subora Pro it pays $99.
- **Against the cheap 0%-fee apps** (Appstle, Seal, Recurpay), they win on price at small volume. Subora's argument there is **no caps and no gating**: they cap subscriptions or revenue, or gate retention, Build-a-Box and bundles. Be honest that they also ship Build-a-Box, bundles and migration today, which Subora does not yet.
- **Competitors market migration heavily**: Skio's "Zero-Downtime Migration," Appstle's "hands-on migration." Subora can't, yet. Expect "Can I switch from X?" as a top FAQ, and agree an answer (see the open questions).
- **Caveat.** Listings are summarised as of the check date and change often. The Recharge $25 plan's post-50-subscriber fee and Smartrr's per-subscriber fee were not visible. Re-verify before publishing any named comparison.

---

## 7. Domain vocabulary: use / avoid

The site should speak the app's language (`subora/CONTEXT.md`). Waitly's site did the same: its copy reuses in-app terms like "Notify me" and "Demand Score."

| Use | Avoid on the site | Why |
|---|---|---|
| **Subscription** | "contract", "recurring order" | SubscriptionContract is Shopify's object |
| **Subscription plan**, or the merchant's own "plan" for their offer | "selling plan", "subscription type" | |
| **Subora plan** / "your plan" for Free, Growth and Pro | "tier" (internal), "package" | CONTEXT "Tier": on screen the merchant reads "plan". ⚠ "Plan" means two things, so on the site **always qualify it**: "subscription plans you sell" vs "Subora plans you pay for." |
| **Subscribe & Save**, **Prepaid**, **Trial**, **Fixed-length** | "subscription model/type" | These are the four Plan kinds |
| **Trial: first orders free or discounted** | "free trial days", "14-day trial" | Trials count orders, not days |
| **Picker** (in guides); "subscription options on your product page" in marketing | "widget", "selector" | CONTEXT rejects "widget" |
| **Collection badge**, **Cart offer** | "cart upsell", "cart widget" | |
| **Customer portal** | "dashboard", "account page" | It sits *on* the store's account page |
| **Customer**; **Subscriber** for a customer with an active subscription | "member", "user", "buyer" | |
| **Merchant** (or "you") | "user", "admin", "owner" | |
| **Skip**, **Pause**, **Resume**, **Cancel**, **Swap**, **Reschedule** (= sooner) | "hold", "suspend", "unsubscribe", "postpone" | |
| **Swap** (to a different product) vs **variant change** (size M → L) | "exchange", "substitute" | |
| **Failed payments**, **Retry rules**, **Retry**, **recovered** | "dunning" in headlines (fine in SEO body copy), "re-attempt" | The app page is called "Failed payments" |
| **Retention offer**, **Cancellation reason**, **Save rate**, **Revenue retained** | "save offer", "deflection", "coupon", "churn survey" | |
| **Bulk action** | "mass edit", "batch" | |
| **Activity** (the log) | "history", "events" | |
| **Transaction fee** | "commission", "revenue share", "usage charge" | |
| "canceled" (US spelling, as the buyer-facing app now uses) | "cancelled" in buyer-facing copy | Commit `7a98e702`: "Buyer-facing English says canceled." The glossary itself uses British spelling, so pick US for the site. |
| **MRR**, **churn rate**, **lifetime value** | "CLV", "predicted LTV" | LTV is historical, not a forecast |

---

## 8. Brand assets available

All are in `subora/docs/brand/`. Copy them into `subora-web/public/brand/`, the way waitly-web keeps `public/brand/`.

| File | Use |
|---|---|
| `subora-mark.svg` | The rings (slate and amber) on light backgrounds |
| `subora-mark-white.svg` | The rings on dark backgrounds |
| `subora-mark-mono.svg` | The rings in `currentColor`, for inline use |
| `subora-mark-512.png` | The colour mark wherever SVG doesn't work |
| `subora-wordmark.svg` / `.png` (1600 px) | Header logo on light backgrounds; the name is outlined Manrope SemiBold |
| `subora-wordmark-white.svg` / `.png` | Header and footer logo on dark backgrounds |
| `subora-app-icon.svg`, `subora-app-icon-1200.png` | App Store icon; also usable in OG cards |
| `favicon.svg`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png` | `app/icon.svg` and favicons |
| `apple-touch-icon-180.png` | `app/apple-icon.png` |

**Colours.** Only these two are defined:

- **Slate `#2B3038`**: text, the left ring and the tile
- **Amber `#E8A33D`**: the only accent ("nothing else in the identity is amber")

Plus white. The brand designer owns the rest of the palette.

**Type.** The wordmark uses Manrope (SIL OFL). It's a natural display-font candidate, but that is the visual designer's call.

**Concept.** Two woven rings stand for the Shop and the Customer, "linked again every period." This is a usable storytelling hook.

**Rules:**

- Keep clear space of one stroke width around the mark.
- Don't draw the mark smaller than 16 px, and use the favicon tile below 24 px.
- Never mirror, rotate or recolour the rings. Amber stays on the right.

**Missing:** product screenshots, a walkthrough video and an App Store listing. Waitly's home page leans on a walkthrough video and `public/guide/` screenshots, so these must be produced (see the open questions).

---

## 9. Recommended sitemap and home-page section order

### What to reuse from waitly-web

waitly-web is a static Next.js App Router export (Tailwind v4, shadcn/ui) deployed to GitHub Pages.

| Pattern | File(s) | Reuse for Subora? |
|---|---|---|
| `siteConfig`: name, company (OctaByte), url, `installUrl` (an App Store search until the listing is live), support email, and legal fields where `null` renders a visible placeholder | `src/config/site.ts` | **Yes, as is.** Suggested values: url `subora.octabyte.io`, company OctaByte, install URL pending. |
| `pages` registry: one entry per page feeding the title and meta, JSON-LD, sitemap, llms.txt and OG cards | `src/config/pages.ts` | **Yes** |
| `featureNav` with blurbs, plus `mainNav` (Pricing, Use cases, Setup, Guide, FAQ) | `src/config/site.ts` | **Yes** |
| `/features/<slug>/` pages | `src/app/features/*` | **Yes**, with 5 or 6 pages (below) |
| `/pricing/` with `PlanColumns` from `src/content/plans.ts` | | **Yes, but without the feature-gating table.** Add the cost slider. |
| `/faq/` grouped (`FaqGroup`), with `home: true` items surfaced on the home page | `src/content/faq.ts` | **Yes** |
| `/guide/` and `/guide/[slug]/`: screenshot articles | `src/content/guide/articles/*.ts` | **Yes, but phase 2.** It needs screenshots of the real app. |
| `/setup/`: the short getting-started page | | **Yes**: install, create a plan, add the Picker, turn on the portal page, test a purchase. This mirrors the in-app Setup guide. |
| `/use-cases/` and `[slug]`: SEO problem and answer posts | `src/content/use-cases/posts/*.ts` | **Yes.** Topics: subscribe and save on Shopify, prepaid subscriptions, reducing subscription churn, failed payment recovery, a subscription app without transaction fees, coffee or supplement subscriptions. |
| `/privacy/`, `/dpa/` from Markdown | `src/content/legal/*.md` | **Yes, but there is no source.** `subora/docs/` has no legal folder (Waitly's came from `waitly/docs/legal/`). |
| `llms.txt`, `llms-full.txt`, `og/[image]` share cards, `sitemap.ts`, `robots.ts`, `manifest.ts`, `not-found.tsx` | `src/app/*` | **Yes, as is** |
| Mock components instead of screenshots: `ProductFrame`, `AdminFrame`, `EmailMock` | `src/components/mocks/*` | **Yes.** They're ideal for showing the Picker, portal, cancellation flow, Retention numbers and emails before screenshots exist. |
| `Band` tones, `SectionHeading`, `CtaLink`, `InstallLink`, `ClosingCta`, `HeroSteps` | `src/components/site/primitives.tsx`, `src/components/sections/*` | **Yes**, restyled by the visual designer |
| `PlanBadge` (Growth or Pro marks on gated features) | | **No.** Subora has no gated features, and the absence of badges *is* the message. |

### Proposed sitemap

```
/                              Home
/features/subscription-plans/  Subscribe & Save, Prepaid, Trial, Fixed-length, pricing, free shipping
/features/storefront/          Picker, Collection badges, Cart offer
/features/customer-portal/     Self-service in the customer account
/features/retention/           Cancellation reasons and Retention offers, Save rate
/features/failed-payments/     Retry rules, recovery emails, Recovery numbers
/features/analytics/           MRR, churn, subscribers, revenue, exports (+ Activity, bulk actions)
/pricing/                      3 columns, cost slider, fee fine print, FAQ subset
/setup/                        5-step getting started
/use-cases/  /use-cases/[slug]/
/guide/      /guide/[slug]/    (phase 2, needs screenshots)
/faq/
/privacy/   /dpa/
/llms.txt   /llms-full.txt   /og/*.png   /sitemap.xml   /robots.txt
```

Optional pages, once the team agrees: `/compare/` or `/switch/` (see the open questions), and `/roadmap/` as a short "coming soon" list.

### Home-page section order

This adapts waitly-web's `src/app/page.tsx`, whose order is hero → "four states" grid → "how it works" loop + video → 3 feature bands → Launch band → pricing → setup → FAQ → closing CTA.

1. **Hero.**
   - Headline: "Everything your subscriptions need," or "Every feature. Unlimited subscriptions. Choose how you pay."
   - Subline about selling subscriptions on Shopify and letting customers manage them.
   - The Install CTA and "See pricing."
   - Under it, a strip: "Free: $0 + 2% · Growth: $49 + 0.5% · Pro: $99 + 0%. Every plan has every feature."
2. **"No feature gates, no subscription caps" band.** Three short proof points, which are the pricing differentiators. This replaces Waitly's "four states" grid.
3. **Four ways to sell a subscription.** A grid of Subscribe & Save, Prepaid, Trial and Fixed-length. This echoes Waitly's four-column grid, with a "the customer sees…" line in each.
4. **The subscription lifecycle loop** ("How it works", on a dark band). Five steps:
   1. The shopper picks a plan in the Picker.
   2. Shopify checkout creates the Subscription.
   3. Subora bills each renewal.
   4. A failed payment gets retried, with emails.
   5. A cancellation becomes a Retention offer.

   Add a walkthrough-video slot if one gets made.
5. **Storefront band**: a `ProductFrame` mock of the Picker, plus the badge and cart offer.
6. **Customer portal band**: a mock of the customer account page with Skip, Pause, Swap and Get it sooner.
7. **Retention band**: a cancellation-flow mock, with a Retention numbers table (reason, attempts, saved, Save rate).
8. **Failed payments band**: a retry-ladder graphic with recovery figures.
9. **Analytics band**: an `AdminFrame` mock with MRR, Active subscribers, churn and recovered revenue.
10. **Pricing**: three columns, the "every plan includes everything" line and a link to the full pricing page with the slider.
11. **Setup**: "Live in five steps, no code," with theme app blocks and any Online Store 2.0 theme.
12. **"Coming next" strip (optional)**: Build-a-Box and bundles, migration from other apps, Klaviyo and Flow.
13. **FAQ**: the `home: true` subset.
14. **Closing CTA.**

### Seed FAQ topics

All of these are answerable from the sources:

- Do I need Shopify Plus? No; it's tested on Basic.
- Does it work with my theme? Yes, with Online Store 2.0 app blocks.
- Do customers need an account to manage subscriptions? The portal lives in the customer account (confirm the wording).
- What does the transaction fee apply to?
- Is there a cap on the fee? No; you'll be told when another plan is cheaper.
- Is there a free trial of the paid plans? No, because Free has every feature.
- Will customers get two receipts? No.
- Can customers cancel online? Always; App Store rules require it.
- What happens when a card fails?
- Can I switch from another app? (Answer pending.)
- What data do you store? There is no raw card data.

---

## 10. Open questions for the team

1. **Launch status and install URL.** The build plan says nothing is published to the App Store. When is the listing expected? Until then, should the CTA be "Install" (an App Store search, as Waitly did), "Join the waitlist" or "Request early access"?
2. **Domain.** Is it `subora.octabyte.io`, matching Waitly's `waitly.octabyte.io`? Which support email?
3. **Legal pages.** No privacy policy or DPA exists in `subora/docs/`. The build plan lists both as launch-path work. Who writes them, and can the site launch with placeholder legal pages, as waitly-web's draft notice allows?
4. **Migration messaging.** It's deferred, with unsolved prerequisites. Do we:
   - say "coming soon,"
   - offer assisted manual migration, or
   - say nothing?

   This is the top competitor talking point.
5. **Naming competitors.** Can the pricing page name Recharge, Bold and the others in a comparison table, or should it stay generic ("typical apps charge $99 + 1% + 19¢")? Competitor prices change often. Who keeps them current?
6. **The two meanings of "plan."** Do we approve "Subora plan" vs "subscription plan" as the site-wide rule?
7. **Discrepancies between the spec and the build** that the copy will follow unless told otherwise. Each needs a sign-off:
   - **Cart offer:** the spec says Release 2, but it ships in R1, so we market it.
   - **Trials:** the spec counts days, but the app counts orders.
   - **Rescheduling:** the spec says "change delivery date," but the app only allows earlier.
   - **Portal add/remove products and "Send now":** in the spec, not in R1.
   - **Manual subscription creation:** in spec §11.2, unconfirmed in R1.
   - **Loyalty ladder:** the app supports only one later price step.
8. **Status of Slices 1 to 6 and 9.** The build plan records done dates only for Slices 0, 2, 7, 8, 10 and 11. The routes and code for the rest exist (list, portal, bulk, plan builder, storefront and analytics). Can someone confirm everything in §4 marked "Ships" passed its done test before we publish?
9. **Portal and Picker languages.** The Picker ships in 8 languages, but the portal locale is English only. Can we claim "multilingual storefront"?
10. **Requirements to list in the FAQ.** Which payment gateways are supported (Shopify Payments and others that support subscriptions)? Is the new customer accounts experience required for the portal?
11. **Proof.** There are no reviews or customers yet. Is there any beta merchant quote, figure or logo we can use? If not, the proof sections should lean on product mocks and the pricing math.
12. **Screens and video.** Who captures app screenshots and a walkthrough for `/guide/` and the home page? Waitly used a 7.5-minute captioned video.
13. **Annual billing or discounts?** The listings of competitors like Seal and Appstle offer annual plans, while `tier.ts` has monthly only. Confirm there is no annual option.
