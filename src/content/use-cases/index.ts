/**
 * The use-case posts: one thing a merchant wants to do, and how to do it on
 * Shopify, with Subora or without.
 *
 * To add a post, write `posts/<slug>.ts` and list it in `POSTS`. A slug is
 * permanent once published. The checks at the foot of this file stop the
 * build when a post points at something that doesn't exist.
 */
import { pages, type PageEntry } from "@/config/pages";
import { linksIn, plainInline } from "./inline";
import { post as subscribeAndSave } from "./posts/subscribe-and-save-shopify";
import { post as prepaid } from "./posts/prepaid-subscriptions-shopify";
import { post as coffee } from "./posts/coffee-subscription-shopify";
import { post as churn } from "./posts/reduce-subscription-churn";
import { post as failedPayments } from "./posts/failed-payment-recovery-shopify";
import { post as noFees } from "./posts/subscription-app-without-transaction-fees";
import type { FeatureKey, PostGroup, UseCasePost } from "./types";

export type { Block, FeatureKey, Figure, Inline, PostGroup, Section, SumRow, UseCasePost } from "./types";
export { plainInline } from "./inline";

/** A post, with the day it last changed: its `updated` date, or the day it was written. */
export type Post = UseCasePost & { lastModified: string };

/** Every post, in the order the index lists them within their group. */
export const POSTS: Post[] = [subscribeAndSave, prepaid, coffee, churn, failedPayments, noFees].map((post) => ({
  ...post,
  lastModified: post.updated ?? post.published,
}));

export const postPath = (slug: string) => `/use-cases/${slug}/`;

/** The index's groups, in the order a subscription meets them. */
export const GROUPS: { key: PostGroup; title: string; intro: string }[] = [
  {
    key: "selling",
    title: "Selling subscriptions",
    intro: "Offers customers sign up for, and how to show them.",
  },
  {
    key: "keeping",
    title: "Keeping subscribers",
    intro: "Cancellations and failed payments, and what to do about each.",
  },
  {
    key: "paying",
    title: "Paying for the app",
    intro: "What a subscription app costs at your size.",
  },
];

/** Each post as a site page, for metadata, share cards and the sitemap. */
export const useCaseEntries: PageEntry[] = POSTS.map((p) => ({
  path: postPath(p.slug),
  title: p.metaTitle ?? p.title,
  description: p.description,
  headline: p.cardHeadline ?? p.title,
  lastModified: p.lastModified,
}));

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

export const entryFor = (slug: string) => useCaseEntries.find((e) => e.path === postPath(slug))!;

/** The posts about one feature, for a "when you'd use it" list on its feature page. */
export const postsForFeature = (feature: FeatureKey) => POSTS.filter((p) => p.features.includes(feature));

/** Every piece of inline text in a post, for link checks and plain-text output. */
export function inlineTextOf(post: UseCasePost): string[] {
  const blocks = post.sections.flatMap((section) => [
    ...section.blocks.flatMap((block) => {
      if (typeof block === "string") return [block];
      if (block.type === "list") return block.items;
      if (block.type === "table") return block.rows.flat();
      if (block.type === "aside") return [block.text];
      if (block.type === "sum") return [block.caption, ...block.rows.map((r) => r.label)];
      return [];
    }),
    ...(section.figure ? [section.figure.caption] : []),
  ]);
  return [...post.answer, ...blocks, ...post.limits];
}

/** The short answer as plain text, for llms.txt and the like. */
export const plainAnswer = (post: UseCasePost) => post.answer.map(plainInline).join(" ");

/** Section ids the post layout uses itself, so no post section may take them. */
export const LAYOUT_IDS = ["limits", "features", "related"];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function check(posts: UseCasePost[]) {
  const problems: string[] = [];
  const known = new Set([...Object.values(pages).map((p) => p.path), ...posts.map((p) => postPath(p.slug))]);
  const slugs = new Set<string>();

  for (const post of posts) {
    const say = (problem: string) => problems.push(`${post.slug}: ${problem}`);

    if (slugs.has(post.slug)) say("slug is used twice");
    slugs.add(post.slug);

    if (post.description.length > 160) say(`description is ${post.description.length} characters, over 160`);
    if (!ISO_DATE.test(post.published)) say(`published "${post.published}" is not YYYY-MM-DD`);
    if (post.updated && !ISO_DATE.test(post.updated)) say(`updated "${post.updated}" is not YYYY-MM-DD`);
    if (post.updated && post.updated < post.published) say("updated is before published");
    if (post.limits.length === 0) say("has no limits: every post says what Subora doesn't do");

    const ids = new Set<string>(LAYOUT_IDS);
    for (const section of post.sections) {
      if (ids.has(section.id)) say(`section id "${section.id}" is used twice or by the layout`);
      ids.add(section.id);
      if (section.figure?.scene === post.cover) say(`section "${section.id}" repeats the cover`);
      for (const block of section.blocks) {
        if (typeof block !== "string" && block.type === "sum" && !plainInline(block.caption).startsWith("Example")) {
          say(`a worked example in "${section.id}" doesn't start with "Example"`);
        }
      }
    }

    for (const slug of post.related ?? []) {
      if (!posts.some((p) => p.slug === slug)) say(`related names post "${slug}", which doesn't exist`);
    }
    for (const href of inlineTextOf(post).flatMap(linksIn)) {
      if (href.startsWith("https://")) continue;
      if (!known.has(href.split("#")[0])) say(`link "${href}" is not a page on this site`);
    }
  }

  if (problems.length) throw new Error(`Use-case posts:\n- ${problems.join("\n- ")}`);
}

check(POSTS);
