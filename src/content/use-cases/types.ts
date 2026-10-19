/**
 * The shape of a use-case post.
 *
 * One post is one thing a merchant wants to do, such as selling prepaid
 * subscriptions. It answers the question for any Shopify store first
 * (`voice: "neutral"`), then shows how Subora does it (`voice: "subora"`).
 *
 * A post's `slug` and each section's `id` are permanent once published: the
 * site has no redirects, so a changed address is a broken link.
 */
import type { SceneId } from "@/components/use-cases/scenes";

/** Text with `**bold**` and `[label](/path/)` links. See `inline.ts`. */
export type Inline = string;

/** The feature pages a post can point at, by their key in `pages`. */
export type FeatureKey =
  | "subscriptionPlans"
  | "storefront"
  | "customerPortal"
  | "retention"
  | "failedPayments"
  | "analytics";

/** Where a post sits on the index: getting subscribers, keeping them, or paying for the app. */
export type PostGroup = "selling" | "keeping" | "paying";

export type Figure = {
  /** A mock from the scene registry in `src/components/use-cases/scenes.tsx`. */
  scene: SceneId;
  /** Say "Example" when the mock shows figures. They are not results. */
  caption: Inline;
};

/** One line of a worked example: what it is, and its value already formatted. */
export type SumRow = { label: Inline; value: string };

export type Block =
  /** A paragraph. */
  | Inline
  | { type: "h3"; text: string }
  | { type: "list"; ordered?: boolean; items: Inline[] }
  | {
      type: "table";
      caption: string;
      head: string[];
      rows: Inline[][];
      /**
       * Cells to fill amber, as [row, column]: the cheapest option in a row,
       * which screen readers hear as "cheapest". Money staying with the merchant.
       */
      highlight?: [number, number][];
    }
  /**
   * A worked example, set as a ledger. The caption starts with "Example" and
   * names the demo store, so nobody reads it as a result. `good` fills the
   * total amber, for money that stays with the merchant.
   */
  | { type: "sum"; caption: Inline; rows: SumRow[]; total?: SumRow & { good?: boolean } }
  | { type: "aside"; kind: "tip" | "note" | "careful"; text: Inline };

export type Section = {
  id: string;
  /** The H2, in the words a merchant would search for. */
  heading: string;
  /** `neutral` is advice that holds without Subora. `subora` is what the app does. */
  voice: "neutral" | "subora";
  blocks: Block[];
  /** One mock per section. Split the section to show two. */
  figure?: Figure;
};

export type UseCasePost = {
  slug: string;
  /** The H1. */
  title: string;
  /** The title tag, when the H1 is too long to sit before " | Subora". */
  metaTitle?: string;
  /** The meta description, 160 characters at most. */
  description: string;
  /** The heading on the share card, about 60 characters at most. */
  cardHeadline?: string;
  /** One or two sentences for the index and llms.txt. */
  summary: string;
  group: PostGroup;
  /** The mock at the top of the post and on its index row. No section shows it again. */
  cover: SceneId;
  /** ISO dates, e.g. "2026-10-19": the day the post was written, and the day it last changed. */
  published: string;
  updated?: string;
  /** The short answer under the H1, for a reader who stops there. */
  answer: Inline[];
  sections: Section[];
  features: FeatureKey[];
  /** What Subora doesn't do in this situation. Every post has some. */
  limits: Inline[];
  /** Slugs of other use-case posts. */
  related?: string[];
};
