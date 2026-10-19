import type { ReactNode } from "react";
import { CartOfferMock, CollectionMock, PickerMock } from "@/components/mocks/storefront";
import { PortalMock } from "@/components/mocks/portal";
import { EmailMock } from "@/components/mocks/email";
import { RetentionTableMock, RetryLadderMock } from "@/components/mocks/admin";
import { PrepaidPickerMock, PrepaidPortalMock } from "@/components/mocks/use-cases-prepaid";
import { CancelOffersMock, MinimumOrdersMock } from "@/components/mocks/use-cases-retention";
import { RetryRulesMock, UpgradePromptMock } from "@/components/mocks/use-cases-billing";
import { PlanCalculator } from "@/components/sections/plan-calculator";

/**
 * The mocks a use-case post can show, by name. A post's data holds only the
 * name, so it stays plain data that the sitemap, llms.txt and share cards can
 * read. `alt` says what the mock shows, for screen readers.
 */
export type Scene = {
  alt: string;
  render: () => ReactNode;
  /** A working control rather than a picture: shown as itself, not as one image. */
  interactive?: boolean;
};

export const SCENES = {
  "picker-coffee": {
    alt: "Ember Hill Roasters’ product page for House Espresso with Subora’s Picker: one time at $18.00, or Subscribe and save 15% every 4 weeks at $15.30, with a note that the charge recurs and a link to the subscription policy.",
    render: () => <PickerMock store="coffee" />,
  },
  "collection-coffee": {
    alt: "Ember Hill Roasters’ coffee collection with Subora’s Collection badges: Save 15% on House Espresso and Ridge Blend and Free trial on Decaf Night.",
    render: () => <CollectionMock />,
  },
  "storefront-coffee": {
    alt: "Two storefront pages. A collection page with badges such as Save 15% and Free trial, and a cart where a one-time bag has a Subscribe and save 15% button with a frequency chooser, and another line is already a subscription, every 4 weeks.",
    render: () => (
      <div className="grid gap-5">
        <CollectionMock />
        <CartOfferMock className="sm:ml-auto sm:w-[88%]" />
      </div>
    ),
  },
  "renewal-email-coffee": {
    alt: "An email from Ember Hill Roasters: Your next order is coming. It names the plan, House Espresso at $15.30 every 4 weeks, the date of the next order and a Manage your subscription button.",
    render: () => <EmailMock store="coffee" kind="renewal-upcoming" />,
  },
  "portal-coffee": {
    alt: "Ember Hill Roasters’ customer account showing a House Espresso subscription: the next delivery, buttons to skip it, get it sooner, pause or swap, and the upcoming deliveries with one skipped.",
    render: () => <PortalMock store="coffee" />,
  },
  "prepaid-picker": {
    alt: "Mira Skin’s product page with three purchase options: one time at $32.00, Subscribe every month at $28.80, and Every month, 6 prepaid, chosen: $28.80 each, $172.80 today, “Pay once for 6 months of deliveries. Renews every 6 months.”",
    render: () => <PrepaidPickerMock />,
  },
  "prepaid-portal": {
    alt: "Mira Skin’s customer account for a prepaid subscription: “6 deliveries paid on October 2”, a note that deliveries of a prepaid subscription cannot be skipped or moved, the upcoming deliveries, and buttons to pause or cancel.",
    render: () => <PrepaidPortalMock />,
  },
  "cancel-too-expensive": {
    alt: "Mira Skin’s cancel steps. The customer picks Too expensive, and the store offers one thing instead: Get 15% off your next 2 orders, with a No thanks, cancel link under it.",
    render: () => <CancelOffersMock reason="Too expensive" />,
  },
  "cancel-too-much-product": {
    alt: "Mira Skin’s cancel steps. The customer picks Too much product, and the store offers three things instead: skip the next delivery, get it less often, or pause for 30 days.",
    render: () => <CancelOffersMock reason="Too much product" />,
  },
  "minimum-orders": {
    alt: "A Mira Skin subscription in the customer account with buttons to skip the next delivery or pause, and the line: You can cancel after 3 orders. You have had 1 so far.",
    render: () => <MinimumOrdersMock />,
  },
  "retention-table": {
    alt: "Subora’s Retention page for Mira Skin: 112 cancel attempts, 51 saved, a 46% Save rate and $2,246.40 Revenue retained, with attempts and Save rate for each reason.",
    render: () => <RetentionTableMock />,
  },
  "retry-ladder": {
    alt: "Subora’s Failed payments page for Fernlee: 42 failed payments, 29 recovered, a 69% recovery rate and $1,409.40 recovered, above one payment that failed on October 6 and was recovered on October 10 after the customer added a new card.",
    render: () => <RetryLadderMock />,
  },
  "retry-rules": {
    alt: "Subora’s Payment retries settings: 3 retries, after 1, 3 and 5 days, a maximum recovery period of 14 days, and Wait for a new card chosen for when the retries run out.",
    render: () => <RetryRulesMock />,
  },
  "payment-failed-email": {
    alt: "An email from Fernlee: Your payment did not go through, so your order is not placed yet. It gives the next try and the last day, says what happens after it, and has an Update your card button.",
    render: () => <EmailMock store="pet" kind="payment-failed" />,
  },
  "upgrade-prompt": {
    alt: "A notice on Subora’s Home page for Fernlee: Pro would cost you about $47 less each month. In the last 30 days the sales that count toward Subora’s fees came to about $19,440; on Growth that cost about $146, on Pro it would have cost about $99.",
    render: () => <UpgradePromptMock />,
  },
  "plan-calculator": {
    alt: "A slider of monthly subscription revenue with what each Subora plan would cost at it, the cheapest one marked.",
    render: () => <PlanCalculator initialRevenue={20_000} />,
    interactive: true,
  },
} satisfies Record<string, Scene>;

export type SceneId = keyof typeof SCENES;

export const sceneOf = (id: SceneId): Scene => SCENES[id];
