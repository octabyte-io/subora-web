**Last updated:** {{LAST_UPDATED}}

## 1. Who we are

Subora is a Shopify app operated by {{OCTABYTE_LEGAL_NAME}}
([octabyte.io](https://octabyte.io), "we", "us").

Contact us about anything in this policy at **support@octabyte.io**.

## 2. What this policy covers, and the two roles we hold

Subora lets a Shopify merchant sell subscriptions: it charges each renewal,
retries a failed payment, emails the customer about their subscription, and
gives the customer a page in their store account where they can manage it.

We hold two different legal roles, and they carry different rights:

- **For a merchant's own account data** (the store's details, the settings
  the merchant configures, the fees we charge them) we are the
  **controller**.
- **For the personal data of a merchant's customers** we are a
  **processor**, acting on that merchant's instructions. The merchant is the
  controller. Our agreement with them is the
  [Subora Data Protection Agreement](/dpa/).

If you are a customer of a store that uses Subora, the fastest route for any
request about your data is that store. They can act on it through Shopify at
once. You may also write to us at support@octabyte.io and we will act on the
merchant's instruction.

## 3. What we collect

### 3.1 About a merchant's customers, through Shopify

Subora does not collect anything from a customer directly on the storefront.
A subscription is created by Shopify's own checkout, and Subora reads it from
Shopify.

We **store** these, and only these, identifying details about a customer:

- their **name** and **email address**, as they appear on the subscription,
  so the merchant can find the subscription and so we can send the customer
  emails about it;
- their **Shopify customer id**, which links the subscription to their
  account in the store.

We also keep records of the subscription itself, which are about the
customer's purchases rather than about the person:

- the products, quantities, prices and delivery schedule;
- each billing date, each charge attempt and its result, and any retries;
- the price changes promised at checkout, for example a trial price that
  ends after a set number of orders;
- the changes made to the subscription, and who made them: the customer, the
  merchant's staff (by Shopify staff id), or Subora;
- which emails we sent, and whether each was delivered. We do not store the
  subject or the text of an email.

### 3.2 Read from Shopify, shown, and not kept

Some details are read from Shopify each time they are needed, shown to the
merchant or the customer, and not stored by us:

- the **delivery address and delivery phone number**. When a customer
  changes their address, we pass the new address to Shopify and keep no copy;
- the **brand and last digits of the payment card**, so the customer and the
  merchant can see which card will be charged;
- the customer's **past orders**, which the customer account page reads from
  Shopify directly.

To charge a renewal we store Shopify's **reference to the saved payment
method**. This is a pointer that only Shopify can use. We never see, receive
or store card numbers or any other card details; the card itself is held by
Shopify and its payment providers.

### 3.3 Directly from a merchant's customers

When a customer manages their subscription on their store account page, we
record what they do: skip, pause, resume, change frequency, quantity,
product, date or address, use an offer, or cancel.

If a customer cancels, they are asked why, from a fixed list. If they pick
**Other**, they may type their own words, up to 500 characters. We store
those words so the merchant can read them.

If a customer **reports one of our emails as spam**, we record that fact, so
that the store never emails them through Subora again (section 9).

### 3.4 About merchants

- **Store details**: the `myshopify.com` domain, Shopify shop id, store name,
  public contact email, store owner's email, primary domain and timezone. The
  store name and contact email appear on the emails customers receive, and
  the store owner's email is where we send answers to data requests
  (section 8).
- **Settings**: email branding (colour, wordmark and a logo address, which we
  never download), the emails turned off, retry rules, cancellation offers and
  the subscription plans the merchant sells.
- **Billing**: the Subora plan, and a record of each paid subscription order
  we charge a fee on (section 6).
- **Staff actions**: the Shopify staff id of the person who made a change. Not
  their name or email.
- **Access tokens** that Shopify issues so Subora can act for the store.

### 3.5 What we never collect

- Card numbers or other payment card details.
- Passwords.
- Stored delivery addresses or phone numbers.
- IP addresses or browser details of customers.
- What a customer looks at in a store.

Subora sets **no cookies** and uses no tracking pixels or browser storage on a
merchant's storefront or customer account pages. Our emails contain no open
or click tracking.

## 4. Why we use it

We process personal data for these purposes and no others:

1. **Running the subscription**: charging each renewal on the schedule the
   customer agreed to at checkout, applying the prices and discounts
   promised, and carrying out the changes the customer or merchant makes.
2. **Recovering failed payments**: retrying a declined charge and telling the
   customer, so they can update their card.
3. **Emails about the customer's own subscription**: confirmation, a reminder
   before a renewal, payment problems, and confirmation of each change. These
   are about a purchase the customer made. They are not marketing (section 9).
4. **Customer self-service**: showing the customer their subscriptions and
   letting them change or cancel them.
5. **Reports to the merchant**: subscribers, revenue, churn, recovered
   payments and cancellation reasons, and a subscriber export (with name and
   email) that the merchant can download.
6. **Billing the merchant** for Subora (section 6).

We do not sell personal data. We do not share it with advertisers. We do not
use it to train machine learning models.

### 4.1 Decisions made automatically

Subora acts on a subscription without a person approving each step. Every
one of these follows from the terms the customer accepted at checkout or the
settings the merchant chose:

- **Renewals are charged** on the schedule of the subscription.
- **A failed charge is retried.** By default we retry 3 times, on days 1, 4
  and 9 after the failure. The merchant may change this. When a customer adds
  a new card, we retry at once.
- **When retries run out**, the subscription is paused, canceled or skipped,
  or waits for a new card, as the merchant has chosen. The unpaid order is
  never charged later.
- **A pause the customer chose for 30 or 60 days ends** on its date, and the
  subscription resumes.
- **A price promised at checkout takes effect** after the agreed number of
  orders, for example when a trial price ends.
- **A subscription with a fixed number of orders ends** when the last one is
  paid.
- **Canceling may be blocked until a minimum number of orders** if the
  merchant's plan requires it. The customer is told this before they buy.

A customer who disagrees with any of these can contact the store, which can
change or cancel the subscription.

## 5. Who else sees it

We use four sub-processors:

| Sub-processor | What it does | Where |
| --- | --- | --- |
| Shopify Inc. | The store platform: holds the subscriptions, customers, orders and saved payment methods, and runs the charges | Canada / global |
| Hetzner Online GmbH | Hosts the application server, its database and its job queue | {{HOSTING_LOCATION}} |
| Resend (Plus Five Five, Inc.) | Delivers the emails to customers and merchants | United States |
| Functional Software, Inc. d/b/a Sentry | Receives a report when something in the app fails, so we can fix it | {{SENTRY_LOCATION}} |

**Resend keeps a copy of each email it delivers**, including the address,
subject and text, and any attachment, for **30 days**, and for up to 7 more
days in its backups. This is part of how Resend works, and the copy is
deleted when that time ends.

**Error reports** are set to leave out request contents, cookies and user
details. They carry internal reference numbers, the store domain and the
failing code.

We also use **Open Exchange Rates** for daily currency rates, to work out
fees in US dollars. It receives no personal data.

The current list is kept in the [Subora Data Protection Agreement](/dpa/), and
merchants are told before a sub-processor is added or replaced.

Beyond these, we disclose personal data only where the law compels us to.

## 6. How merchants are billed

Subora charges merchants through Shopify. On the Free and Growth plans this
includes a fee on each paid subscription order. To calculate and account for
that fee we keep a record of each such order: the Shopify order id, the
products and their titles, the amounts, and the fee. These records hold **no
customer name or email address**.

## 7. Where it is processed

The application and its database run in {{HOSTING_LOCATION}}. Emails are
delivered through a provider in the **United States**, so a customer's email
address and the content of the email reach the United States when an email
is sent. Error reports are processed in {{SENTRY_LOCATION}}.

Where a transfer needs a legal basis, it rests on the European Commission's
Standard Contractual Clauses, which are part of our agreements with the
providers concerned and with merchants.

## 8. How long we keep it, and how it is erased

**We keep a customer's data for as long as the merchant uses Subora**, so the
merchant has the full history of each subscription. It is removed in two
ways.

**When Shopify sends us a customer erasure request** for a customer, we:

- remove their name and email address from every subscription they hold in
  that store;
- delete the words they typed when canceling;
- delete our copy of the prices promised to them;
- delete the record that they reported an email as spam.

We **keep** the Shopify customer id and the records of the subscription
itself (products, dates, charges and changes), because the merchant's
revenue and billing history depend on them. With the name and email gone,
those records no longer say who the customer is. Only the store's own
Shopify data can link them to a person.

**When a merchant uninstalls Subora**, we delete the store's access tokens at
once. 48 hours later, Shopify cancels the store's Subora subscriptions and
sends us a store erasure request. We then delete all the store's
subscriptions, customers, emails, settings and reports, and remove the
store's name, domain and contact addresses.

Two things outlive a store erasure, and neither holds a customer's name or
email:

- **the fee records** described in section 6, which are our record of what we
  charged the merchant;
- **a record that the store once used Subora**: its Subora plan, billing
  periods and install dates, with the store's name and domain removed.

**Data requests.** A customer who asks the store for their data, or asks to
be erased, reaches us through Shopify. When Shopify asks us for a customer's
data, we email the store owner a file
with everything we hold about that customer. We keep no copy of that file,
apart from the 30-day copy in Resend described in section 5.

## 9. The emails we send to customers

Subora sends emails about a customer's own subscription, in the store's name:
when it starts, 3 days before a renewal, when a payment fails or is
recovered, and when the subscription changes. Replies go to the store.

These are **transactional emails**, not marketing, and they carry **no
unsubscribe link**. The merchant can turn off any kind except the first
confirmation. A customer who wants no more emails can reply to the store or
cancel the subscription.

If a customer reports a Subora email as spam, **the store will never email
them through Subora again**, including about failed payments. We also stop
sending to an address that has permanently bounced, until the customer
changes it in Shopify.

## 10. Security

- Personal data is kept in one place, our database. It is kept out of the
  payloads of our background jobs, and our application logs record
  reference numbers rather than names or email addresses.
- Store access tokens are encrypted in our database (AES-256-GCM), with keys
  kept apart from the data.
- Every connection that crosses the internet is encrypted.
- Requests from Shopify and Resend are verified by signature before we act on
  them.
- Each store can reach only its own data, and each customer only their own
  subscriptions.

If a breach affects personal data we process for a merchant, we notify that
merchant without undue delay and no later than {{BREACH_NOTICE}} after we
become aware of it.

## 11. Your rights

Depending on where you live, you may have the right to access, correct,
delete, port or restrict the use of your personal data, and to object to its
processing.

For a customer's data, we act as processor. Send your request to the store you
bought from, or to us at support@octabyte.io and we will pass it to the store
and act on its instruction. Your name, email and address are corrected in your
store account, and Subora picks up the change. We answer within 30 days.

You may also complain to your local data protection authority.

## 12. Children

Subora is not directed at children and we do not knowingly hold data about
anyone under 16. If you believe we do, write to support@octabyte.io.

## 13. Changes

We update this policy when what we do changes. The date at the top records the
last change. Material changes are notified to merchants through the app before
they take effect.
