**Version:** 1.0 · **Effective:** {{LAST_UPDATED}}

## 1. Parties and formation

### 1.1 Parties

This agreement is between {{OCTABYTE_LEGAL_NAME}} ([octabyte.io](https://octabyte.io),
"Processor") and the Shopify merchant who installs the Subora app ("Merchant",
"Controller").

### 1.2 How it is agreed

Installing Subora on a Shopify store accepts the {{TERMS_OF_SERVICE}}, and
those terms incorporate this agreement in full. No separate signature is
required and none is offered: Shopify's installation flow has no step at which
an app can present one.

A merchant who requires a signed counterpart may request one at
support@octabyte.io.

### 1.3 Precedence

Where this agreement conflicts with the Subora terms of service on the subject
of personal data, this agreement prevails.

## 2. Roles

For personal data relating to the Merchant's customers, the Merchant is the
**controller** and OctaByte is the **processor**.

OctaByte processes that data only on the Merchant's documented instructions.
The Merchant's use of the app, and the settings they configure in it, are those
instructions. They include the instruction to send the Merchant's customers
the emails described in section 3, in the Merchant's name. OctaByte will tell
the Merchant if an instruction appears to breach applicable data protection
law, and may decline to act on it.

For the Merchant's own account data and the records of fees charged to the
Merchant, OctaByte is a controller in its own right, and that processing is
described in the [Subora Privacy Policy](/privacy/).

## 3. Subject matter of the processing

| | |
| --- | --- |
| **Subject matter** | Operating the Subora subscriptions app for the Merchant's store |
| **Duration** | The life of the Merchant's installation, until the store erasure in section 10 |
| **Nature** | Collection from Shopify, storage, organisation, use, transmission by email, creating charges through Shopify, changing subscription contracts in Shopify, and erasure |
| **Purposes** | Running each subscription and charging its renewals; retrying failed payments; transactional email to the data subject about their own subscription; customer self-service in the store's customer account; analytics, reports and exports for the Merchant |
| **Data subjects** | The Merchant's customers who hold a subscription; the Merchant's staff who act in the app |
| **Personal data stored** | Customer name and email address; Shopify customer id; subscription contents, prices, schedule and status; charge attempts and their results, with Shopify's reference to the saved payment method; changes made and by whom; cancellation reasons and any words the customer typed (500 characters at most); whether each email was delivered; whether the customer reported an email as spam; Shopify staff ids |
| **Personal data read but not stored** | Delivery address and delivery phone number; payment card brand and last digits; the customer's past orders |
| **Special categories** | None. Subora neither requests nor stores special category data, and Merchants must not enter any into it |

OctaByte requests these protected customer data fields from Shopify: **name,
email, address and phone**. Only name and email are stored. Subora never
receives card numbers or other card details.

## 4. OctaByte's obligations

OctaByte will:

1. process personal data only on the Merchant's documented instructions, and
   only for the purposes in section 3, unless required otherwise by law, in
   which case OctaByte will inform the Merchant first, unless the law forbids
   it;
2. ensure that everyone authorised to process the data is bound by
   confidentiality;
3. implement the technical and organisational measures in section 5;
4. observe the sub-processor conditions in section 6;
5. assist the Merchant with data subject requests, as described in section 7;
6. assist the Merchant with security, breach notification and impact
   assessments, taking account of what OctaByte knows and can see;
7. delete the data as described in sections 8 and 10;
8. make available the information needed to demonstrate compliance with this
   section, and allow the audits described in section 11.

## 5. Security measures

OctaByte maintains, at minimum:

- **Data minimisation.** Of the protected customer data Shopify grants, only
  name and email are stored. Delivery addresses, phone numbers and card
  details are read when needed and not kept.
- **A single store for personal data.** Personal data is held in the
  application database. Background job payloads are reduced to reference
  numbers, and application logs record reference numbers rather than names or
  email addresses.
- **A personal-data register checked by tests.** Every database table declares
  whether it holds personal data, and an automated test fails if a table is
  missing from that register or from the erasure procedure.
- **Encryption of store access tokens** in the database, with AES-256-GCM and
  keys held apart from the data.
- **Encryption in transit** on every connection that crosses the internet.
- **Verified requests.** Webhooks from Shopify and Resend are verified by
  signature before they are acted on.
- **Isolation in the application.** Every query is bound to one store, and the
  customer account page is bound to the signed-in customer.
- **Least-privilege keys.** The email provider key can only send, and only
  from Subora's sending domain.
- **Error reports without user data.** Error reports are set to carry no
  request contents, cookies or user details.
- **No tracking.** Subora sets no cookies and uses no tracking on the
  Merchant's storefront, and emails carry no open or click tracking.

OctaByte may change these measures, but not in a way that materially reduces
their overall protection.

## 6. Sub-processors

The Merchant gives general authorisation for the sub-processors below.

| Sub-processor | Purpose | Location |
| --- | --- | --- |
| Shopify Inc. | Platform, subscription contracts, charges, and source of customer and order data | Canada / global |
| Hetzner Online GmbH | Application, database and queue hosting | {{HOSTING_LOCATION}} |
| Plus Five Five, Inc. (Resend) | Email delivery. Keeps each email, including its content and any attachment, for 30 days, plus up to 7 days in backups | United States |
| Functional Software, Inc. d/b/a Sentry | Application error reporting | {{SENTRY_LOCATION}} |

OctaByte will give the Merchant **30 days' notice** before adding or replacing
a sub-processor. A Merchant who objects on reasonable data protection grounds
within that period may stop using Subora without penalty, and OctaByte will
delete their data under section 10.

OctaByte imposes on each sub-processor obligations no less protective than
those in this agreement, and remains fully liable to the Merchant for their
performance.

## 7. Data subject requests

Shopify's mandatory compliance webhooks are the primary channel, and OctaByte
handles all three:

- **`customers/data_request`**: OctaByte compiles everything it holds about
  that customer into a file and emails it to the store owner's email address.
  OctaByte keeps no copy of the file. The email provider's copy expires after
  the period in section 6.
- **`customers/redact`**: OctaByte erases the customer as described in
  section 8.
- **`shop/redact`**: OctaByte erases the store as described in section 10.

A request that reaches OctaByte directly is forwarded to the Merchant and acted
on under their instruction. OctaByte responds within 30 days.

## 8. Customer erasure

On a customer erasure request, OctaByte, in one operation:

- removes the customer's name and email address from every subscription they
  hold with the Merchant;
- deletes the words they typed when canceling;
- deletes OctaByte's copy of the prices promised to them at checkout;
- deletes the record that they reported an email as spam.

OctaByte **keeps** the Shopify customer id and the records of each
subscription: its products, dates, charges, retries, changes and emails sent.
These records are the Merchant's revenue and billing history, and the fee
records in section 9 depend on them. Without the name and email they identify
no one, except through the Merchant's own Shopify data. Where the Merchant
requires these records deleted as well, it may ask in writing, and OctaByte
will tell it what can be deleted without breaking the Merchant's records.

If the same customer later starts a new subscription, it is a new record and
holds their name and email afresh.

## 9. Retention

Personal data is retained for the life of the Merchant's installation, so that
the Merchant keeps the full history of each subscription. It is removed by a
customer erasure request (section 8) or by store erasure (section 10).

OctaByte keeps, as its own records of fees charged to the Merchant, a record
of each paid subscription order on which it charged a fee: the Shopify order
id, products and titles, subscription reference and amounts. These records
contain no customer name or email address and are kept after store erasure.

## 10. Deletion on termination

On uninstall, OctaByte deletes the store's access tokens at once. Shopify
cancels the store's Subora subscription contracts 48 hours later and sends
`shop/redact`. On receipt, OctaByte deletes all the store's subscriptions,
customer data, emails sent, settings, reports and activity, and removes the
store's name, domain and contact addresses.

What remains holds no personal data about the Merchant's customers: the fee
records in section 9, and a record of the store's Subora plan, billing periods
and install dates without its name or domain.

A Merchant may request deletion sooner in writing.

## 11. Audit

OctaByte will provide the information reasonably needed to demonstrate
compliance with this agreement, on written request and no more than once a
year, unless a supervisory authority or a security incident requires otherwise.
Where an on-site audit is required by law, the parties will agree its scope,
timing and cost in advance, and the auditor must be bound by confidentiality.

## 12. International transfers

The application and database are in {{HOSTING_LOCATION}}. Email delivery is
in the United States, so a customer's email address and the content of each
email are transferred there when an email is sent, and kept there for the
period in section 6.

Where a transfer requires a safeguard, the parties rely on the European
Commission's Standard Contractual Clauses (Module 2, controller to processor),
which are incorporated into this agreement by reference, with the details in
section 3 completing their Annex I and the measures in section 5 completing
their Annex II. Where the UK Addendum or the Swiss adaptations apply, they
apply too.

## 13. Breach notification

OctaByte notifies the Merchant of a personal data breach affecting the
Merchant's data **without undue delay and within {{BREACH_NOTICE}}** of
becoming aware of it, so that the Merchant can meet a 72-hour regulatory
deadline. The notification describes what is known: the nature of the breach,
the categories and approximate number of data subjects and records, the likely
consequences, and the measures taken. OctaByte updates it as more is
established rather than delaying the first notice until everything is known.

## 14. Liability

Liability under this agreement is subject to the limitations in the Subora
terms of service, except where applicable data protection law does not permit
that.

## 15. Changes

OctaByte may update this agreement to reflect a change in law, in
sub-processors, or in the app. Material changes are notified to Merchants
through the app at least 30 days before they take effect. The version number
and effective date at the top record each change.

**Contact:** support@octabyte.io
