# 05 — Subora data-handling facts (for the Privacy Policy and DPA)

Researched 2026-10-19 against the Subora repo at
`/Users/nabeel/test/shopify-apps/subora` (read-only; HEAD `3902a79`-era working
tree, migrations up to `0102`). Every fact below is cited to a Subora file and
line or ADR. Waitly's published policy
(`waitly-web/src/content/legal/privacy.md`, `dpa.md`) and source docs
(`waitly/docs/legal/`) were used only as a checklist of questions. Nothing about
Subora is taken from them.

Path shorthand: `S/` = `/Users/nabeel/test/shopify-apps/subora/`.

**Read this first.** These are the facts most likely to change what the legal
text may say:

1. **Data is not encrypted at rest, and there are no database backups.** Both
   are deliberate decisions recorded in ADR-0006.
2. **Customer erasure nulls the name and email but keeps the rows**, including
   the Shopify customer id.
3. **A store erasure keeps the fee ledger**, which holds order ids and product
   titles, plus a tombstone `shop` row.
4. **There is no 7-day self-erasure fallback.** Nothing deletes a store's data
   if `shop/redact` never arrives.
5. **Customer emails are transactional and carry no unsubscribe link.**
6. **Resend keeps full email content for 30 days, plus 7 days in backups, in
   the US.**
7. **Sentry has no message scrubber.** The only setting is
   `sendDefaultPii: false`.

---

## 1. Shopify access scopes and protected customer data

### 1.1 Scopes declared

`S/shopify.app.toml:125`:

```
write_own_subscription_contracts, read_customers, write_products,
read_customer_payment_methods, customer_read_own_subscription_contracts,
customer_read_customers, customer_read_orders, write_discounts, read_orders,
read_shopify_payments_disputes, read_merchant_managed_fulfillment_orders
```

Why each scope is requested, as stated in the toml comments (`S/shopify.app.toml:58-124`):

| Scope | Stated reason (toml line) |
|---|---|
| `write_own_subscription_contracts` | Reads back the contract on every webhook, edits contracts, and is needed by all subscription topics (61-66) |
| `read_customers` | The Customer **name and email** on the contract, held only so the merchant can search subscriptions (§24) (67-70) |
| `write_products` | Creating and editing selling plan groups; App Bridge product picker (74-80) |
| `read_customer_payment_methods` | Shows the card on file (**brand and last digits**) on the Subscription page. "The card is read, shown, and not kept" (89-93) |
| `customer_read_own_subscription_contracts`, `customer_read_customers`, `customer_read_orders` | Customer Account API reads by the portal extension: subscriptions, lines, deliveries, past orders (94-99) |
| `write_discounts` | Free-shipping automatic app discount, backed by a Function (105-108) |
| `read_orders` | Reads the paid Order that a fee record (BillableSale) is written from. Last 60 days only; `read_all_orders` is **not** declared (113-115) |
| `read_shopify_payments_disputes` | Chargebacks, used to reverse fees (116-118) |
| `read_merchant_managed_fulfillment_orders` | A prepaid subscription's boxes. Only the merchant's own fulfillment orders (120-124) |

The toml also states: **no Customer write scope** (`customer_write_own_subscription_contracts`
is not declared). Every customer action goes through Subora's server
(`S/shopify.app.toml:101-103`; ADR-0029).

### 1.2 Protected customer data fields

- **Name, Email, Address** were declared in the Partner Dashboard draft for
  issue #8 (ADR-0006, line 5-6: "#8 saved a Draft declaring Email, Name and
  Address").
- **Phone** (delivery-address phone) was granted on **2026-10-14** (ADR-0032
  amendment, lines 274-282; `S/app/domain/subscription/amendment.ts:213`:
  "Protected customer data, granted to Subora on 2026-10-14 (#451)").

How each field is used:

| Field | Stored? | Use | Source |
|---|---|---|---|
| Customer **name** | **Yes**: `subscription.customer_name` | Merchant search, and the first name in emails | `S/app/db/schema/subscription.ts:201-202`; ADR-0001 l.42-51 |
| Customer **email** | **Yes**: `subscription.customer_email` | Merchant search; the recipient of customer emails | `subscription.ts:203-204`; ADR-0023 |
| Delivery **address** (name, company, address1/2, city, province, zip, country) | **No.** It is read live, shown, then resent to Shopify on an address change | Merchant Subscription page, portal address change, Preview | `S/app/infra/shopify-subscription-live-reader.server.ts:25-36` ("The address is read, drawn and never kept… nothing here is logged"); ADR-0001 l.42-46; ADR-0031 (an Amendment or Audit entry "never keeps an address": `S/app/db/schema/audit-entry.ts:117-121`, `amendment.ts:61-65`, `S/app/domain/subscription/amendment.ts:54-55`) |
| Delivery **phone** | **No.** It is read only so that an address change resends it unchanged | Address change | ADR-0032 l.274-282; `S/app/infra/shopify-amendable-contract.server.ts:29,144,230` |
| Card **brand and last digits** | **No.** Read per page view, not kept | Card shown on the portal or admin page | `S/shopify.app.toml:89-93`; `S/app/infra/shopify-portal-contract-reader.server.ts:81-85,118-123,166-170` |

ADR-0001 l.42 states: "**No shipping address, no payment method, no card
detail.**" Name and email are "the only protected customer data Subora holds
at rest" (ADR-0001 l.53; `S/app/infra/customer-erasure.server.ts:18-20`).

---

## 2. Database tables and columns that hold personal data

Subora keeps a **personal-data registry**. Every table must declare, next to
its schema, whether it holds personal data (`holds`) and whose rows it holds
(`rows`). A test fails the build if a table declares neither
(`S/app/db/schema/personal-data.ts:1-35`; ADR-0012; ADR-0026).

### 2.1 Tables that hold personal data (`holds: "personal"`)

| Table.column(s) | Subject | Notes | Citation |
|---|---|---|---|
| `subscription.customer_name`, `subscription.customer_email` | Customer | The only two identifying customer columns. Plaintext | `subscription.ts:199-204, 488-494`; ADR-0006 l.12-17 |
| `cancel_attempt.other_words` | Customer | Free text the customer types when choosing "Other" as the cancellation reason. **At most 500 characters** | `S/app/db/schema/cancel-attempt.ts:51-57, 77-78, 154-160, 168-174` |
| `customer_suppression.shopify_customer_id` (+ `complained_at`) | Customer | Records that a customer **reported a Subora email as spam**. The row itself is the fact | `S/app/db/schema/customer-suppression.ts:7-58, 66-110` |
| `shop.name`, `contact_email`, `store_owner_email`, `primary_domain_url`, `wordmark`, `logo_url` | Merchant | See §3 | `S/app/db/schema/shop.ts:220-303, 480-493` |
| `session.firstName`, `lastName`, `email` | Merchant | Filled only for *online* sessions. Subora uses offline sessions only, so these are normally empty | `S/app/infra/shop-erasure.server.ts:39-66`; `S/app/db/schema/session.ts:31-32, 45-47` |

### 2.2 Identifiers and records linked to a customer (`holds: "none"`, but `rows: about customer`)

These tables hold no name or email, but their rows are records about a
customer's purchases. They are all included in a Data export
(`personal-data.ts:52-87`; ADR-0026 l.53-90).

| Table | What it holds | Citation |
|---|---|---|
| `subscription` (other columns) | `shopify_customer_id` (**kept through a redaction**), `shopify_contract_id`, `origin_order_id`, status, end reason, dates, intervals, currency, `customer_email_dead_at` (when the address permanently bounced), `customer_redacted_at` | `subscription.ts:76-408`, esp. 191-199, 241, 262 |
| `subscription_item` | Product and variant ids, title, variant title, quantity, price | `subscription.ts:518-591` |
| `subscription_line_price_steps` | Each line's promised price schedule. **Deleted** by a customer redaction | `subscription-line-price-steps.ts:88-91`; `customer-erasure.server.ts:64-80` |
| `billing_cycle` | Payment dates and skip state | `billing-cycle.ts:163-166` |
| `billing_attempt` | Amounts, result, `error_code`, `shopify_order_id`, and **`payment_method_id` (an opaque Shopify pointer, not card data)** | `billing-attempt.ts:68-258, 341-344` |
| `billing_attempt_line` | Product, title and amount paid per line | `billing-attempt-line.ts:89-92` |
| `dunning_run` | Retry rules, outcome, `payment_method_id` (opaque pointer), `new_card_at` | `dunning-run.ts:61-117, 148-151` |
| `amendment` | A confirmed change (line id and two values; never an address), Shopify's refusal reason | `amendment.ts:61-65, 76-112, 143-146` |
| `audit_entry` | Actor kind and **actor id** (Shopify customer id for a customer; **staff user id** for a merchant), action, previous and new value (**never an address**), outcome | `audit-entry.ts:61-66, 96-125, 248-253` |
| `cancel_attempt` (other columns) | Reason (from a fixed list), offers shown, offer accepted, outcome, retention discount id, timestamps | `cancel-attempt.ts:68-122`; reasons `S/app/db/schema/values.ts:713-722`; offers `values.ts:746-753` |
| `notification` | Kind, cause key, outcome, `email_id` (Resend id), delivery outcome, bounce type, plan sentence, and `shopify_customer_id` (data-request rows only). **No address, subject or body** | `S/app/db/schema/notification.ts:46-69, 76-211, 331-340` |
| `divergence` | Reconciliation findings (column names and dates) | `divergence.ts:136-139` |
| `billable_sale`, `billable_sale_line`, `reversal`, `reversal_line` | The fee ledger: order id (`source_id`), amounts, fee rate, product and variant ids, **product titles**, contract id, and `subscription_id` as a recorded value | `billable-sale.ts:111-279, 353-357, 380-440, 465-611, 626-673` |

### 2.3 What is not stored

Evidence that each of the following is absent:

- **Raw card data, card brand or last digits**: not stored. The only
  payment-method data kept is Shopify's opaque `payment_method_id`
  (`billing-attempt.ts:341-343`; `dunning-run.ts:148-150`; ADR-0001 l.42).
  Card replacement happens in Shopify, and Subora "never sees it happen"
  (`values.ts:467-478`; CONTEXT.md "Customer action").
- **Shipping address and phone**: not stored (§1.2).
- **IP address and user agent**: no column in any schema. The user agent is
  read only for bot detection when rendering a page (`S/app/entry.server.tsx:44-45`),
  and a repo-wide search finds no `ip_address`, `req.ip` or `x-forwarded-for` capture.
  This is unlike Waitly.
- **Email subject or body**: not stored in Postgres (`notification.ts:46-55`).
  Resend does hold a copy (§4, §6).
- **Order contents beyond the fee ledger**: no order table. The portal reads
  past orders live from the Customer Account API, and "the address and the
  order history travel from Shopify to the Customer and never through Subora"
  (ADR-0035 l.13-26).
- **Customer tags, order count or total spent**: never read.
- **Portal browsing or page views**: not recorded. Only *actions* are
  recorded, as Audit entries, Amendments and Cancel attempts.

### 2.4 Copies outside Postgres

- **Redis (BullMQ job payloads)**: every webhook payload schema is narrowed to
  ids, so the customer email and phone that Shopify sends on
  `customers/redact` and `customers/data_request` are stripped before the job
  is stored (`S/app/jobs/webhooks/customers-redact.server.ts:51-81`;
  `customers-data-request.server.ts`, narrowing comment; ADR-0006 l.122-136).
  The Resend event schema drops the recipient, subject and reply-to
  (`S/app/jobs/resend-webhook-route.server.ts:55-64, 78-135`).
  - **Exception (merchant data):** `app/uninstalled` uses `.loose()`, so the
    whole Shop resource passes through into the job payload
    (`S/app/jobs/webhooks/app-uninstalled.server.ts:20-34`). It runs on the
    `webhooks` queue (`S/app/jobs/webhook-topics.server.ts:195`), and those
    jobs are kept 1 hour on success and 7 days on failure
    (`S/app/jobs/webhook-queue.server.ts:166-167, 236-237`).
  - Job retention: completed jobs are kept about 1 hour; failed jobs are kept
    7 days, or **30 days** on the `billing` and `compliance` queues
    (`billing-queue.server.ts:415-416`; `webhook-queue.server.ts:236-237`;
    other queues in `S/app/jobs/*-queue.server.ts`).
- **Application logs (stdout)**: ADR-0006 l.110 says "No log line takes a
  name, an address or an email". Log lines do include the myshopify domain,
  Shopify **customer id** (customers/redact, `customers-redact.server.ts:114-128`),
  Resend email ids and contract ids. HTTP access logging uses
  `morgan("tiny")` (`S/scripts/server.ts:184`): method, URL, status, size and
  time, with no IP. Outside production only, a refused test recipient's
  address is logged (`S/app/infra/resend-email-sender.server.ts:207-213`).
- **Resend**: see §4 and §6.
- **CSV exports**: a merchant can download a subscriber export that includes
  the customer's **Name and Email** (`S/app/domain/analytics/subscriber-export.ts:50-54, 83`).
  It is generated on demand and not stored by Subora.

---

## 3. Data from merchants

| Data | Where | Citation |
|---|---|---|
| Shopify shop id, **myshopify domain** | `shop.shopify_shop_id`, `shop.myshopify_domain` | `shop.ts:78-81` |
| Shop **timezone** | `shop.iana_timezone` (not personal data) | `shop.ts:181-202` |
| **Shop name** (From display name on emails) | `shop.name` | `shop.ts:220-225` |
| **Shop contact address**, the public address (used as Reply-To on customer emails) | `shop.contact_email` | `shop.ts:226-231`; ADR-0024 l.21-26 |
| **Store owner's address** (where Data-request answers go) | `shop.store_owner_email` | `shop.ts:232-238`; ADR-0026 l.19-43 |
| **Primary domain** URL | `shop.primary_domain_url` | `shop.ts:239-245` |
| Email branding: **brand colour**, **wordmark**, **logo URL** (a URL that is never fetched by Subora and never uploaded) | `shop.brand_colour`, `wordmark`, `logo_url` | `shop.ts:247-303` |
| Cancellation-flow switches, retention-discount terms (on, percent, orders, title) | `shop.*` | `shop.ts:305-372` |
| **Retry rules** (dunning) | `shop.retry_rules` | `shop.ts:374-399` |
| Tier/plan handle, AppSubscription id, period dates, install, uninstall and last-uninstall times, redacted_at, upgrade-prompt dismissal, setup-guide hidden | `shop.*` | `shop.ts:108-156, 410-425` |
| Muted email kinds, disallowed portal actions, swap list | `notification_mute`, `disallowed_action`, `swap_list_product` | registry `holds: none` (see §2 grep) |
| Subscription plans (the merchant's offers) | `subscription_plan`, `plan_projection*`, `subscription_plan_delivery_interval` | `subscription-plan.ts:192-195` |
| **Staff user id** of a merchant who acted (no name or email) | `audit_entry.actor_id`, `bulk_run.actor_id` | `audit-entry.ts:103-108`; `bulk-run.ts:142-145`; `S/app/infra/activity-store.server.ts:110-123` |
| Shopify **access token and refresh token** (offline) | `session.accessToken`, `session.refreshToken`, **encrypted with AES-256-GCM** | ADR-0006 l.41-53, 226-252 |
| Sending-stop records (bounce and complaint counts; `lifted_by` = Subora operator name) | `sending_stop` | `sending-stop.ts:52-68, 84-87` |
| MRR history (daily aggregates, product titles, plan names) | `mrr_history` | `mrr-history.ts:57-77, 99-103` |
| Billing/fee records | see §10 | — |

Subora has **no Merchant/user table**. Data is scoped to the Shop
(`personal-data.ts:43-48`; CONTEXT.md:26-29). Shop details are read at sign-in
and again on `shop/update` (`S/shopify.app.toml:184-193`;
`S/app/jobs/webhooks/shop-update.server.ts:21`, payload stripped to `{}`).

---

## 4. Emails sent

### 4.1 Customer email kinds

`S/app/db/schema/values.ts:299-319` (`NOTIFICATION_KINDS`):

`created` (post-purchase), `renewal-upcoming`, `paused`, `resumed`,
`cancelled`, `payment-failed`, `skipped`, `unskipped`, `rescheduled`,
`quantity-changed`, `address-changed`, `product-changed`, `frequency-changed`,
`completed`, `payment-ended`, `payment-last-try`, `payment-recovered`,
`discount-added`. There is also **`data-request`**, which goes to the **store
owner**, not to the customer (ADR-0026).

- **Renewal reminder**: sent **3 days before** a renewal
  (`S/app/domain/notification/reminder.ts:47`, `REMINDER_DAYS_AHEAD = 3`). It is
  not sent when the billing interval is no wider than 3 days. The rule is
  re-checked just before sending (CONTEXT.md "ReminderClock", l.1162-1177).
- **Payment last-try**: sent only for a card problem, from 24 hours before the
  last ladder retry (`S/app/domain/notification/payment-emails.ts:21-60`).
- **`created` can never be muted** (App Store rule 5.4.9). `data-request` has
  no switch. All other kinds can be muted per Shop by the merchant
  (`values.ts:322-363`; CONTEXT.md "Muted kind", l.1081-1094).
- **From / Reply-To**: `From: <Shop name> <subora@shopifyapps.octabyte.app>`,
  with Reply-To set to the Shop contact address (ADR-0024 l.8-26). The
  data-request answer is `From: Subora <subora@shopifyapps.octabyte.app>` with
  Reply-To set to the store owner's address (ADR-0026, amendment 2026-09-18).
- The email footer shows the Shop name and primary domain. If the merchant set
  a logo URL, the email loads that image **from the merchant's own URL** when
  opened. Subora never fetches it (`shop.ts:293-303`;
  `S/app/domain/notification/card-shell.ts:123-126`).

### 4.2 Transactional, not marketing; no unsubscribe link

- `S/app/domain/notification/card-shell.ts:129-136`: "**no 'Manage your
  emails' link** — #117 removed it… Subora sends no unsubscribe link: these
  are transactional emails about the buyer's own Subscription, a buyer who
  wants none can reply."
- CONTEXT.md l.1130: "unsubscribed (that implies a link Subora does not send)".
- Legal basis for emailing customers is **the merchant's consent in the
  Merchant Agreement**, with "the customer gave the address at checkout" kept
  as a secondary ground (ADR-0023 l.21-24, 62-76). **There is no consent
  checkbox. Installing the app is the consent** (ADR-0023 l.74-76). ADR-0023
  says the Notifications settings page carries "one plain line" linking to the
  Merchant Agreement (l.70-72). **I did not find that line in
  `app/routes/app.notifications/`** (see Unknowns).
- Shopify's terms conflict on this point, and ADR-0023 records a plan to ask
  Partner Support in writing before launch (issue #111) (l.35-51).

### 4.3 Automatic suppression (what replaces an unsubscribe)

Suppression reasons are listed at `values.ts:421-442`:

- `redacted`: the customer was erased.
- `shop-uninstalled`.
- `muted`: the merchant turned off that kind.
- `no-address`.
- `dead-address`: a **permanent** bounce only. It heals when the customer
  changes their address in Shopify (`subscription.ts:206-241`; ADR-0027).
- `silenced`: the customer **reported an email as spam**. This is permanent
  per Shop, stops **all** kinds including payment-failed, and nobody can lift
  it (`customer-suppression.ts:7-43`; `S/.out-of-scope/lifting-a-spam-suppression.md`).
- `sending-stopped`: the Shop's bounce or complaint rate went above Resend's
  4% / 0.08% limits. Only an operator lifts it (ADR-0053; CONTEXT.md l.1149-1160).
- `too-old`: older than 24 hours, so not sent.

### 4.4 Resend webhooks: what is tracked

- Five events are ingested: `email.bounced`, `email.complained`,
  `email.failed`, `email.suppressed`, `email.delivered`.
  `email.delivery_delayed` is dropped (ADR-0027 l.26-34).
- **Opens and clicks are not tracked.** `open_tracking` and `click_tracking`
  are both **false** on the sending domain (ADR-0024 l.170-173; ADR-0027
  l.32-34: "`opened` and `clicked` **cannot** fire").
- Matching is by Resend `email_id`, never by address. Stored outcomes are
  `delivery_outcome`, `delivery_at` and `bounce_type` (`notification.ts:185-208`).
- The webhook is signed. `RESEND_WEBHOOK_SECRET` is required
  (`S/app/lib/env.server.ts:161-185`).

---

## 5. Storefront and customer-account extensions

| Extension | Type | What it reads or writes | Citation |
|---|---|---|---|
| `subora-picker` (picker, collection badge, cart offer) | Theme app extension | Calls only the **store's own** Storefront API (`/api/<v>/graphql.json`) for selling plans and prices, and the store's own `/cart.js`. The cart offer calls `Shopify.actions.updateCart` to attach a selling plan. **No call to Subora's server.** | `S/extensions-src/subora-picker/shared/storefront-query.js:12`; `subora-cart-offer.js:462`; built assets `S/extensions/subora-picker/assets/*.js` |
| `subora-portal` | Customer-account UI extension (`customer-account.page.render`, `network_access = true`) | Reads subscriptions, lines, deliveries and past orders from the **Customer Account API**. Calls Subora's server (`/portal/subscriptions/...`) with a Shopify **session token** (Bearer) for the actions offered, previews, and every action (skip, pause, cancel, address and so on) | `S/extensions/subora-portal/shopify.extension.toml`; `src/PortalPage.jsx:109-111`; ADR-0035 l.9-26; ADR-0029 |
| `subora-order-action` | Customer-account UI extension (order action menu) | Reads the order through the Customer Account API and shows a "Manage subscription" link | `S/extensions/subora-order-action/src/ManageSubscription.jsx:1-40` |
| `subora-free-shipping` | Shopify Function (delivery discount) | Runs inside Shopify on cart input. No network access | `S/extensions/subora-free-shipping/shopify.extension.toml` |
| `subora-subscription-link`, `subora-subscription-management` | Admin link / editor collection | No data handling | toml files |

- A grep of all extension source and built assets for `cookie`,
  `localStorage`, `sessionStorage`, `indexedDB`, `sendBeacon`, `pixel`,
  `analytics` and `gtag` found **no matches**. Subora sets **no cookies and
  uses no web storage or tracking pixels**. A comment in
  `storefront-query.js:3` mentions the browser sending the store's own
  password cookie on a same-origin request. That cookie is Shopify's, not
  Subora's.
- **What the portal writes on Subora's side**, through server routes
  `S/app/routes/portal.subscriptions.*`:
  - Audit entries, with the customer id as actor (ADR-0031).
  - Amendments.
  - Cancel attempts: the reason, optional "Other" words, offers shown, and
    outcome.
  - Emails triggered by the action.
  - An address change is passed to Shopify and **not stored**.
- **Portal identity**: Customer scope is bound from the session token
  (ADR-0030; `S/app/infra/customer-scope.server.ts:44`). A customer sees only
  their own subscriptions in that Shop (CONTEXT.md "Customer portal").

---

## 6. Sub-processors and third parties

From `S/package.json:81-107` (runtime dependencies), `S/app/lib/env.server.ts`
and `S/.env.example` (variable names only).

| Party | Role | Personal data? | Location | Citation |
|---|---|---|---|---|
| **Shopify** | Platform, source of all contract, customer and order data; app billing | Yes | Not stated in repo | toml; ADR-0001 |
| **Hetzner** (VPS, under **Dokploy** / Docker Swarm, single node) | Hosts app, worker, **Postgres 17**, **Redis 7** | Yes | **Region not stated in Subora repo.** ADR-0006 l.154-162: "Subora shares the VPS with Waitly". The README gives the SSH host `178.104.21.3` (`S/README.md:151,197`) | `S/README.md:4`; ADR-0006 l.149-197; `S/docker-compose.dev.yml:10` |
| **Resend** | Sends all emails | **Yes**: "recipient address, delivery log, subject and body, and any attachment" (including the Data export file) | **United States**. Domain verified in `us-east-1`. Storage is US-only ("no setting today that moves stored data to the EU") | ADR-0024 l.46-57, 171, 189-223; `notification.ts:57-62` |
| **Sentry** (`octabyte-io` org; projects `subora-web`, `subora-worker`) | Error monitoring only. Logs, Tracing, Profiling, Metrics and Session Replay are **off** | Intended no. `sendDefaultPii: false`. No `beforeSend` scrubber exists. Extra context is ids and myshopify domain | **Region not stated** | `S/app/infra/sentry.server.ts:32-46, 246-259`; `S/docs/release-1-build-plan.md:528-533, 690-697` |
| **Open Exchange Rates** (openexchangerates.org) | Daily FX rates for fee conversion | **No.** Only a date and an app id are sent | Not stated | `S/app/infra/open-exchange-rates.server.ts:10-27,57`; `env.server.ts:243-251` |
| **Shopify Partner API** | Checks Subora's usage records against Shopify's | No customer data | — | `S/app/infra/partner-api-usage-reader.server.ts:36`; `env.server.ts:253-262` |
| **GitHub / GHCR** | CI and container image registry (`ghcr.io/octabyte-io/subora`) | Code and image only. No evidence it holds personal data | — | `S/.github/workflows/release.yml:44-98` |

There is **no analytics or product-analytics SDK, no logging SaaS and no APM**
beyond Sentry error capture. Runtime dependencies are listed at
`package.json:81-107`.

Resend is shared infrastructure: **one Resend team** shared with Waitly,
Cloudgate and XTK, and one sending domain, `shopifyapps.octabyte.app`
(ADR-0024 amendment l.124-162). Resend's DPA is "pre-signed on signup", and
"all 22 of its sub-processors are in the USA" (ADR-0024 l.113-115).

Other hosting facts:

- Postgres and Redis traffic is cleartext on the internal Docker network.
- Dokploy does **not** isolate projects. One flat `dokploy-network` carries
  Waitly, Subora and an unrelated `xtk` project, and the DB password is the
  only control between them (ADR-0006 l.138-171).

---

## 7. GDPR mandatory webhooks and uninstall

All three are subscribed as `compliance_topics` (`S/shopify.app.toml:352-378`).
They run on a dedicated `compliance` queue (`S/app/jobs/webhook-topics.server.ts:345-365`).

### 7.1 `customers/data_request`: answered by email to the store owner

- The handler writes a `data-request` Notification row. The send job builds a
  **JSON Data export** at send time and emails it as an attachment to the
  **store owner's address** (`shop.email`). The answer goes to the store owner,
  never to the customer (`S/app/jobs/webhooks/customers-data-request.server.ts`
  header; ADR-0026 l.9-43; CONTEXT.md l.93-118).
- The export contains:
  - the name and email;
  - SubscriptionItems, BillingCycles, BillingAttempts, DunningRuns,
    BillableSales, Reversals, Divergences and Notifications;
  - a statement naming Resend's 30-day US copy;
  - the note that corrections are made in Shopify (ADR-0026 l.83-108, 166-170).
- The export is **never stored** by Subora (CONTEXT.md l.117-118). Resend
  keeps the email and attachment for 30 days plus 7 (ADR-0024 l.205-213).
- If Subora holds nothing about the customer, the email still goes out and
  says so (ADR-0026 l.110-123).
- The data-request answer is exempt from the 24-hour age limit and from the
  uninstall suppression. It retries for 30 days (ADR-0026 l.155-163).

### 7.2 `customers/redact`: nulls, not deletes (with two deletes)

The work is done by `eraseCustomer` (`S/app/infra/customer-erasure.server.ts:143-202`),
in one transaction:

1. **Nulls** `subscription.customer_name` and `customer_email` on all of that
   customer's Subscriptions, and stamps `customer_redacted_at`. Ingestion then
   never refills those two columns (l.154-168; ADR-0012).
2. **Deletes** Subora's copy of those Subscriptions' Price steps (l.173-176).
3. **Blanks** `cancel_attempt.other_words` and stamps `words_removed_at`. The
   attempt row stays (l.178-182; `cancel-attempt.ts:51-57`).
4. **Deletes** the `customer_suppression` (spam-report) row (l.184-194).

What is **kept**, explicitly:

- `subscription.shopify_customer_id`. It is "a pointer into Shopify's store
  rather than a fact about the person" (l.93-98; `subscription.ts:192-199`).
- Every row under the Subscription (cycles, attempts, dunning runs, audit
  entries with the customer id as `actor_id`, notifications, amendments,
  cancel-attempt rows).
- The fee ledger.

Deleting the Subscription is impossible because the money tables use
`RESTRICT` (l.115-120). The payload is narrowed to `customer.id`. The
customer's email and phone from Shopify never reach Redis
(`customers-redact.server.ts:51-81`). `orders_to_redact` is not read
(l.72-77). CONTEXT.md l.82-91 describes this as "Subora nulls, it does not
substitute"; "anonymised" is listed as a word to avoid.

The redaction stamp is per Subscription. If the same customer subscribes again
later, the new Subscription stores the name and email afresh
(`customer-erasure.server.ts:100-107`).

### 7.3 `shop/redact`: ordered delete, tombstone, fee ledger kept

`eraseShop` (`S/app/infra/shop-erasure.server.ts:101-261`), in one transaction:

1. It first settles fees. Unsent sales are waived (`app_removed`) and unsent
   reversals are marked never-sent (l.225-232, 250).
2. It **deletes all rows for the Shop** from:
   - divergence, customer_suppression, notification_mute, disallowed_action,
     swap_list_product, sending_stop, mrr_history;
   - billing_attempt_line, billing_attempt, dunning_run, billing_cycle;
   - notification, amendment, cancel_attempt, audit_entry, bulk_run;
   - subscription_item, subscription_line_price_steps, subscription;
   - plan_projection_variant, plan_projection,
     subscription_plan_delivery_interval, subscription_plan (l.101-180).
3. It deletes Shopify **sessions** (l.256).
4. `redactShop` **nulls** the shop's identity columns: myshopify_domain,
   shopify_shop_id, name, contact_email, store_owner_email,
   primary_domain_url, brand_colour, wordmark and logo_url. It resets the
   cancellation-flow settings, upgrade-prompt dismissal and setup-guide flag,
   and stamps `redacted_at`. **The `shop` row survives as a tombstone and is
   never deleted** (`S/app/infra/shop-scope/shop-lifecycle.server.ts:111-138`;
   `shop.ts:60-71`).

What **survives** a store erasure:

- The `shop` tombstone, including tier, plan handle, AppSubscription ids and
  dates, install, uninstall and redaction timestamps, timezone, and retry
  rules. Per `redactShop`, `iana_timezone` and `retry_rules` are **not**
  nulled.
- `billable_sale`, `billable_sale_line` (order id, product and variant ids,
  **product titles**, contract id, `subscription_id` as a recorded value,
  amounts), `reversal` and `reversal_line`.
- `app_billing_cycle`.
- `exchange_rate`.

These are kept "because they record fees Subora has already invoiced a
merchant for" (l.83-88, 185-193; ADR-0012; ADR-0013; `billable-sale.ts:62-73`).
The code states this "rests on Subora's judgement rather than on Shopify's
blessing" (l.190-193).

### 7.4 Uninstall

`S/app/jobs/webhooks/app-uninstalled.server.ts:64-88` does four things:

- records the Shopify shop id;
- stamps `uninstalled_at` and `last_uninstalled_at`;
- **deletes Shopify sessions (access tokens) immediately**;
- starts one fee-reporter pass.

No other data is deleted at uninstall. Customer emails are then suppressed as
`shop-uninstalled` (`values.ts:424-425`).

Shopify itself cancels every unterminated subscription contract the app owns,
and deletes its selling plan groups, 48 hours after uninstall
(`S/shopify.app.toml:164-170`; CONTEXT.md l.55-80). A reinstall within 48
hours is the same Shop with its data intact.

**There is no automatic deletion timer.** A search for a fallback erasure if
`shop/redact` never arrives found none (no 7-day job, no
`uninstalled_at + interval` purge). Erasure happens only when `shop/redact`
arrives.

---

## 8. Retention

**No time-based retention period, purge job or sweep exists in the code.** The
build plan lists "the retention sweep" as unbuilt launch-path work
(`S/docs/release-1-build-plan.md:1852-1855`).

| Data | Retention as built | Citation |
|---|---|---|
| Subscription rows, name and email | Kept for the life of the installation. Name and email removed by `customers/redact`; everything removed by `shop/redact` | §7 |
| Notifications | "**Rows are never reaped**" (about 12 per subscriber per year). Deleted on `shop/redact` | `notification.ts:64-69` |
| Audit entries | "Kept for ever, removed with the Shop". "Nothing reaps it by age" | `audit-entry.ts:68-72`; `shop-erasure.server.ts:159-162` |
| Cancel attempts | Kept. Words blanked on customer redact; rows deleted on shop redact | `cancel-attempt.ts:51-62` |
| Spam-report suppression | Kept permanently until customer or shop redaction | `customer-suppression.ts:34-43` |
| Fee ledger (BillableSale, Reversal, app billing cycles) | **Kept indefinitely, including after shop/redact** | §7.3 |
| `shop` tombstone | **Never deleted** | `shop.ts:67-71` |
| MRR history (analytics aggregates) | Kept until shop/redact | `shop-erasure.server.ts:135-138` |
| Redis jobs | Completed jobs about 1 hour; failed jobs 7 days (30 days on billing and compliance queues) | §2.4 |
| Resend copy | 30 days, plus 7 days in backups, in the US. No delete API. "Expiry is the erasure path" | ADR-0024 l.189-223; ADR-0006 l.113-120 |
| Shopify sessions | Deleted at uninstall | §7.4 |
| Database backups | **None exist** | ADR-0006 l.111, 210-215 |
| Container stdout logs | Retention not set in repo | Unknown |
| Sentry events | Retention not set in repo | Unknown |

---

## 9. Automated decisions affecting customers

1. **Automatic recurring charges.** The **BillingClock** (Subora's own
   scheduler) finds each due BillingCycle and creates a billing attempt
   through Shopify. A cycle is due in its last 24 hours (CONTEXT.md
   l.978-987; ADR-0003; ADR-0019).
2. **The retry ladder (dunning) after a failed charge.** The rules are set per
   Shop by the merchant.
   - Default: **3 retries, at gaps of 1, 3 and 5 days (days 1, 4 and 9), a
     14-day recovery period, then "Wait for a new card"**
     (`S/app/domain/billing/retry-rules.ts:57-71`).
   - Limits: 1-6 retries, gaps of 1-14 days, a recovery period of 1-30 days
     (l.77-81).
   - A **new card** triggers one extra retry at once (CONTEXT.md "Retry").
   - No retry is charged on a card that has failed **20 times in 35 days**
     (CONTEXT.md "Retry", l.814-827).
   - A *Refusal* (Shopify declines because the contract is paused or skipped)
     opens no dunning run and sends no email (ADR-0049; CONTEXT.md l.876-883).
3. **The end result when retries run out.** The merchant chooses one of
   **Pause**, **Cancel**, **Skip the order** or **Wait for a new card**
   (`retry-rules.ts:37-55`).
   - Every unpaid end **skips the failed cycle**, so that box is never charged
     later.
   - "Cancel" ends the contract as Shopify `FAILED` with the end reason
     `payment_recovery_exhausted`.
   - The actor recorded is `subora` (ADR-0051 l.10-16, 53-60, 104-109).
4. **Pause end, an automatic resume.** It applies only when the customer
   accepted a 30- or 60-day pause offer. On that day the subscription resumes
   and is charged (CONTEXT.md "Pause end", l.495-508).
5. **Automatic price changes (Price steps).** Subora writes each later price
   promised at checkout onto the contract after the last charge at the old
   price (CONTEXT.md l.217-231; ADR-0054). Trial plans charge less for the
   first N paid orders (CONTEXT.md "Trial", l.371-377).
6. **Automatic completion.** A subscription with nothing left to pay (a
   finished maximum number of cycles) is ended as Completed by the
   BillingClock (ADR-0060; CONTEXT.md "BillingClock").
7. **Minimum cycles.** The portal blocks a customer's cancel until N paid
   orders, and says so beforehand (CONTEXT.md l.378-385).
8. **Cancellation flow and retention offers.**
   - The customer picks a reason from 7 fixed reasons plus "No reason given".
     "Other" takes free text.
   - **Subora fixes which offers go with which reason**; the merchant only
     turns offers on or off.
   - The offers are a discount for the next N orders, skip, frequency change,
     pause 30 or 60 days, and swap. An offer is withheld if the action is not
     possible.
   - The customer may decline and cancel.
   - An accepted retention discount is applied **without a preview** and ends
     by itself after N orders (CONTEXT.md l.670-711; ADR-0061).
9. **Email suppression decisions**: dead address, spam report (permanent) and
   per-Shop sending stop (§4.3).
10. **Uninstall consequence.** Shopify cancels all of the app's contracts 48
    hours after uninstall (§7.4).

---

## 10. Merchant billing (transaction fee)

- **Tiers** (`S/app/domain/fee/tier.ts:45-62`; ADR-0063 l.25-26, 37-43;
  CONTEXT.md l.1179-1200):
  - Free: $0 per 30 days and a **2%** fee.
  - Growth: $49 and a **0.5%** fee.
  - Pro: $99 and **no fee**, with no usage line.
- There is no tier trial and no fee ceiling.
- The fee is charged through **Shopify App Pricing usage billing**: a
  Percentage usage line. Subora sends the revenue in USD and Shopify
  multiplies it by the rate (ADR-0063 l.14-35). It is charged to the merchant,
  never to the customer (CONTEXT.md "TransactionFee").
- **Records kept:**
  - `billable_sale`: one per paid Order. It holds the order id, amount and
    currency, USD amount, exchange rate and date, total charged, fee rate,
    reported/late/held/waived/released stamps, and `sold_at`.
  - `billable_sale_line`: line item, product and variant ids, title, selling
    plan id, contract and subscription id, amounts.
  - `reversal` and `reversal_line`: refunds and chargebacks.
  - `app_billing_cycle`: one row per 30-day AppSubscription period.
  - `exchange_rate`: daily rates.
  - `shop` tier cache.
  (`billable-sale.ts:111-279, 380-408, 465-542, 626-635`;
  `app-billing-cycle.ts:63-135`; `shop.ts:108-134`.)
- These rows hold no customer name or email. They **survive both erasures**
  (§7). They are included in a customer's Data export (ADR-0026 l.95-103).
- A sale above **$5,000 USD**, above the order total, or with a mismatched
  rate is **held** for manual review (CONTEXT.md "BillableSale";
  `S/README.md:166-200`).

---

## 11. Security measures: what is and is not evidenced

### 11.1 Evidenced in Subora

- **Access tokens encrypted at the application level**: `session.accessToken`
  and `session.refreshToken` use **AES-256-GCM**, with a versioned key ring
  (`SESSION_TOKEN_KEYS` / `SESSION_TOKEN_KEY_ID`), the session id as additional
  authenticated data, and a dedicated key that is not derived from the API
  secret (ADR-0006 l.24-64, 226-252; `env.server.ts:110-139`).
- **In transit**: HTTPS on all external hops (Shopify, Resend, Sentry and the
  storefront). App-to-Postgres and app-to-Redis are **cleartext** on an
  internal Docker network with no external port, on a single-node swarm
  (ADR-0006 l.138-153; `env.server.ts:47-53`).
- **Personal data kept out of queue payloads**: webhook schemas are narrowed
  to ids (§2.4). The exception is the merchant Shop resource on
  `app/uninstalled`.
- **Personal data kept out of logs**: this is a stated rule (ADR-0006 l.110).
  Log lines carry ids and domains (§2.4).
- **Sentry**: `sendDefaultPii: false`. Error monitoring only; replay, tracing
  and logs are off (`sentry.server.ts:32-46, 246-259`).
- **Least-privilege email key**: the Resend key is `sending_access`, bound to
  one domain (`env.server.ts:141-159`; ADR-0024 l.158-162).
- **Signed webhooks**: Shopify HMAC, and Resend uses the Svix secret
  (`env.server.ts:5-11, 161-185`; ADR-0009).
- **Tenant isolation in code**: the Shop scope is bound at the store and
  enforced as a DB constraint (ADR-0007, ADR-0008). Customer scope applies in
  the portal (ADR-0030).
- **Outside-production email allow-list**: outside production, emails go only
  to `*@resend.dev` and two named internal addresses
  (`resend-email-sender.server.ts:72-117`; ADR-0024 l.95-98).
- **Environment separation (partial)**: local development uses a separate
  Shopify app ("Subora Local") and local Postgres and Redis
  (`S/shopify.app.toml:5-11`; `S/docker-compose.dev.yml`). Sentry has no DSN
  outside production (`env.server.ts:225-238`). **However**, dev and prod
  share **one Resend team and one sending domain** (ADR-0024 amendment
  l.124-155).
- **Tested erasure registry**: a build test fails any table without a
  personal-data declaration, or one missing from the erasure walk
  (`personal-data.ts:10-18`; `shop-erasure.server.ts:89-91`).

### 11.2 Not true, or documented against (do not claim)

- **Encryption at rest: NOT in place.** "Hetzner does not encrypt at rest…
  LUKS on the Postgres volume was available… and was not taken". Name and
  email are stored in plaintext by decision. The Shopify Level 1 attestation
  "will therefore be answered Yes before the control exists" (ADR-0006
  l.12-17, 179-208; build plan l.1688-1693).
- **Backups: none.** "Level 2's 'encrypt data backups' is No… there are no
  backups" until a planned move to a managed provider (Neon or Cloud SQL)
  (ADR-0006 l.111, 194-197, 210-215).
- **Network isolation: none between projects.** One flat Docker network
  shared with Waitly and an unrelated `xtk` project. The DB password is the
  only control (ADR-0006 l.154-171).
- **Sentry scrubbing**: ADR-0006's table (l.112) says "Scrubbing configured
  before any personal-data path is instrumented". The code configures **only
  `sendDefaultPii: false`**. There is no `beforeSend` and no address
  redaction. Waitly's policy claims address scrubbing; **Subora cannot claim
  it**.
- **MFA and access control for production, access logging, access reviews**:
  **not documented** in Subora. The README shows operator access as
  `ssh root@178.104.21.3` (`S/README.md:151,197`).
- **Incident response policy and breach-notification window (Waitly: 48
  hours)**: **no Subora document exists.** The build plan lists "the incident
  response policy" as unbuilt launch-path work (l.1852-1855).
- **Data loss prevention strategy**: none in the Subora repo.
- **Automatic retention limits**: none built (§8).
- **Self-erasure 7 days after uninstall** (Waitly has it): **not built**
  (§7.4).
- **"Production data never copied into dev/test"**: no statement found
  either way.
- **Encrypted DB connections**: not in place; TLS is not configured
  (`env.server.ts:47-53`).

---

## 12. Existing legal, privacy and compliance material in Subora

- **No privacy policy, DPA, incident response or DLP document exists in the
  repo.** All of them are listed as launch-path work: "the privacy policy,
  the merchant DPA, the incident response policy, the retention sweep,
  informing merchants…" (`S/docs/release-1-build-plan.md:1850-1855`).
- **ADRs that bind what the legal text must say:**
  - ADR-0006: stores, encryption, backups, Resend copy.
  - ADR-0012: redaction and the registry.
  - ADR-0013: fee ledger outlives erasure.
  - ADR-0023: consent basis for emailing customers. It says the Merchant
    Agreement must carry the consent.
  - ADR-0024: Resend in the US. "The privacy policy names Resend as a US
    processor" (l.113-115).
  - ADR-0026: data-request answer. The privacy policy must name the store
    owner's address being stored (issue #114).
  - ADR-0027: bounce and complaint handling.
- **Code comments that state policy expectations:**
  - `notification.ts:57-62`: Resend copy "is named… in the privacy policy".
  - `customer-erasure.server.ts`, `shop-erasure.server.ts`,
    `customers-redact.server.ts`, `customers-data-request.server.ts`.
- **Product spec**: `S/Subora_Product_Specification.md:1050-1071` lists
  *aspirations* ("Encryption of sensitive application data", "Data deletion
  handling"). These are not evidence of implementation.
- **Out-of-scope record**: `S/.out-of-scope/lifting-a-spam-suppression.md`.
  Spam suppressions can never be lifted.
- **Internal inconsistencies to be aware of** (the code is the truth):
  - `customers-redact.server.ts:20-26` still says "There is no Amendment
    table". One exists now, and it holds no personal data.
  - ADR-0051's "What else closes a run" table says customer redaction deletes
    the rows. In fact it only nulls name and email (§7.2).
  - ADR-0006 l.90-106 says an Amendment may hold an address while open. This
    was superseded by ADR-0031: addresses are never kept, per the current
    code.

---

## 13. Differences from Waitly that the legal text must reflect

| Topic | Waitly policy says | Subora reality |
|---|---|---|
| Protected customer data fields | Email only | **Name, Email, Address, Phone** requested. **Name and email stored**; address and phone read but not stored (§1.2) |
| What triggers data collection | Shopper signs up on a storefront widget | No storefront collection. Data comes from **Shopify subscription contracts** created at checkout, plus portal actions (§1, §5) |
| IP and user agent as consent evidence | Collected | **Not collected** (§2.3) |
| Customer free text | None | **Cancellation "Other" words** (500 characters at most) (§2.1) |
| Email type and unsubscribe | Marketing on the merchant's behalf, with an unsubscribe link and one-click | **Transactional only, no unsubscribe link.** Merchant can mute kinds (except `created`). Spam report means permanent silence (§4) |
| Legal basis for emails | Shopper consent | **Merchant's consent in the Merchant Agreement**, plus address given at checkout (ADR-0023) |
| Payment data | None | Shopify **payment-method id** (opaque pointer) stored. Card brand and last 4 shown live, not stored. **Subora initiates charges** (§2, §9) |
| Automated decisions | One (preorder auto-cancel) | **Several**: recurring charges, retry ladder, end-of-dunning cancel/pause/skip, pause-end auto-resume, price steps, auto-complete, minimum-cycles cancel block (§9) |
| Retention period | Merchant-set 30-365 days, automated | **None.** Kept for life of install. No sweep (§8) |
| Erasure after uninstall | `shop/redact`, or self-erase after 7 days | **`shop/redact` only.** No fallback timer. Sessions deleted at uninstall (§7.4) |
| Customer erasure | "Anonymise", removing customer id and more | **Nulls name and email; keeps Shopify customer id** and all transactional rows. Deletes price steps and spam record. Blanks cancel words (§7.2) |
| Store erasure | "Deletes everything, with no exception" | **Deletes most data, but keeps a tombstone shop row and the fee ledger** (order ids, product titles, amounts) indefinitely (§7.3) |
| Data request | Compiles data for the merchant | **Emails a JSON export to the store owner's address**. The export goes through Resend and is kept there for 30+7 days (§7.1) |
| Sub-processors | Shopify, Resend (us-east-1), Hetzner (Germany, nbg1), Sentry (US, Iowa) | Shopify, **Resend (US; us-east-1)**, **Hetzner (region not stated in Subora repo)**, **Sentry (region not stated)**, plus **Open Exchange Rates** (no personal data) (§6) |
| Resend content storage | Not detailed | **Full content stored 30 days plus 7-day backups in the US**, shared team with other apps (§6) |
| Sentry scrubbing | Addresses stripped; no request contents, cookies, headers or variables | Only `sendDefaultPii: false`. **No scrubbing** (§11.2) |
| Encryption at rest | Implied by measures list | **Not in place** (§11.2) |
| Backups | "Yes, and treated as production" (Waitly DLP) | **None** (§11.2) |
| MFA, access logging, incident policy, 48-hour breach notice | Claimed | **Not evidenced** for Subora (§11.2) |
| Merchant billing | Plan only | **Usage-based transaction fee (2% or 0.5%)**, with a per-sale ledger kept after erasure (§10) |
| Merchant personal data | Support email | Shop name, **contact email, store owner email**, primary domain, wordmark, logo URL, staff user ids in audit log (§3) |
| Cookies and tracking on storefront | None | None, verified for Subora too (§5) |

---

## 14. Unknowns: cannot be determined from the repo

Do not guess these. Confirm them with the owner.

1. **Hetzner data-centre region** for the production VPS. Subora's repo gives
   only the host IP `178.104.21.3` and the statement that it is the same VPS
   as Waitly (ADR-0006 l.154). Waitly's docs say `nbg1`, but nothing in
   Subora confirms it.
2. **Sentry data region** (US or EU) and **Sentry event retention**.
3. **Retention of container stdout and Dokploy logs**, and where they are
   stored.
4. **Whether Sentry exception messages could contain personal data.** For
   example, error text that echoes a Shopify GraphQL response. There is no
   scrubber.
5. **Whether the managed-provider migration (Neon or Cloud SQL) has happened
   or is scheduled.** If it has, the hosting, encryption and backup facts
   change. Its location is also unknown.
6. **Operator access controls**: MFA on Hetzner, Dokploy, GitHub, Resend and
   Sentry; who has production access; SSH key policy. None is documented.
7. **Incident response process and breach-notification commitment** for
   Subora.
8. **Legal entity name and address** for OctaByte, governing law, and the
   support contact address for Subora.
9. **The Partner Support answer on emailing customers** (ADR-0023, issue
   #111). Whether Shopify accepted the Merchant-Agreement consent basis is
   not recorded.
10. **Whether the Notifications page "consent line"** (ADR-0023 l.70-72)
    exists in the UI. It was not found in `S/app/routes/app.notifications/`.
11. **Whether the Merchant Agreement / Terms of Service exists yet.** ADR-0023
    makes it the consent ground for every customer email.
12. **The Shopify protected-customer-data attestation as actually submitted**
    (Level 1 and Level 2 answers), beyond ADR-0006's account.
13. **Resend production plan** (Free or Pro) at launch. It affects quotas,
    not retention: 30 days on Free, Pro and Scale (ADR-0024 l.191-193).
14. **Whether production personal data has ever been copied to dev or test.**
    There is no statement either way.
15. **How long Shopify itself keeps** the contract and customer data Subora
    reads from. This is outside the repo.
