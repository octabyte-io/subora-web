import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { pages, type PageEntry } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { feeLabel, PLANS } from "@/content/plans";

/**
 * The share card for a page: the logo, the page's headline and, on the home
 * and pricing cards, the three Subora plans. Light and editorial: slate on
 * frost, with the woven rings large and pale behind the right edge.
 * Rendered once per page at build time by `app/og/[image]/route.tsx`.
 */
export const ogSize = { width: 1200, height: 630 };

/**
 * A page as the share card reads it. `eyebrow` and `ogName` are optional
 * extras a page entry may carry; without them the card uses the title and
 * the last path segment.
 */
export type OgPage = PageEntry & {
  /** The small line above the card's heading, in place of the title. */
  eyebrow?: string;
  /** The card's file name, for a page whose last path segment isn't unique on the site. */
  ogName?: string;
};

/** The file name of a page's share card: `home.png`, `customer-portal.png`, … */
export const ogImageName = (page: OgPage) =>
  `${page.ogName ?? (page.path === "/" ? "home" : page.path.split("/").filter(Boolean).at(-1))}.png`;

const SLATE = "#2b3038";
const MUTED = "#5b6270";
const FROST = "#f2f3f5";
const AMBER = "#e8a33d";
const LINE = "rgba(43, 48, 56, 0.13)";

const asset = (...path: string[]) => readFile(join(process.cwd(), ...path));

export async function ogImage(page: OgPage) {
  const [semibold, medium, mark] = await Promise.all([
    asset("src/assets/fonts/Manrope-SemiBold.ttf"),
    asset("src/assets/fonts/Manrope-Medium.ttf"),
    asset("public/brand/subora-mark.svg"),
  ]);
  const isHome = page.path === pages.home.path;
  const isPricing = page.path === pages.pricing.path;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: FROST,
          color: SLATE,
          fontFamily: "Manrope",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
        <img src={RINGS} width={RINGS_SIZE} height={RINGS_SIZE} alt="" style={{ position: "absolute", left: 650, top: -185 }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogSize.width,
            height: ogSize.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 72px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
            <img
              src={`data:image/svg+xml;base64,${mark.toString("base64")}`}
              width={68}
              height={68}
              alt=""
              style={{ marginLeft: -10 }}
            />
            <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>{siteConfig.name}</span>
          </div>

          {isPricing ? <PricingBody page={page} /> : <HeadlineBody page={page} isHome={isHome} />}

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingTop: 24,
              borderTop: `2px solid ${LINE}`,
              fontSize: 24,
              fontWeight: 500,
              color: MUTED,
            }}
          >
            {isHome ? <PlanStrip /> : <span>Subscriptions for Shopify</span>}
            <span>{new URL(siteConfig.url).host}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Manrope", data: semibold, weight: 600, style: "normal" },
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}

/** The eyebrow and the two-tone headline. */
function HeadlineBody({ page, isHome }: { page: OgPage; isHome: boolean }) {
  const headline = page.headline ?? page.title;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {isHome ? null : (
        <div style={{ fontSize: 28, fontWeight: 500, color: MUTED }}>{page.eyebrow ?? page.title}</div>
      )}
      <TwoTone text={headline} size={headline.length > 50 ? 60 : 70} />
    </div>
  );
}

/**
 * A headline of several sentences sets its last sentence in muted, the
 * site's two-tone style; one sentence stays all slate. Words are separate
 * items so the line breaks between them, never inside one.
 */
function TwoTone({ text, size }: { text: string; size: number }) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const lead = sentences.length > 1 ? sentences.slice(0, -1).join(" ") : text;
  const rest = sentences.length > 1 ? sentences.at(-1)! : "";
  const words = [
    ...lead.split(" ").map((word) => ({ word, color: SLATE })),
    ...(rest ? rest.split(" ").map((word) => ({ word, color: MUTED })) : []),
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: 820,
        fontSize: size,
        fontWeight: 600,
        lineHeight: 1.08,
        letterSpacing: "-0.035em",
      }}
    >
      {words.map(({ word, color }, i) => (
        <span key={i} style={{ color, marginRight: Math.round(size * 0.24) }}>
          {word}
        </span>
      ))}
    </div>
  );
}

const monthly = (usd: number) => `$${usd}`;

/** The three plans small, along the foot of the home card. */
function PlanStrip() {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      {PLANS.map((plan) => (
        <div key={plan.key} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span>{plan.name}</span>
          <span style={{ fontSize: 36, fontWeight: 600, color: SLATE, letterSpacing: "-0.02em" }}>
            {`${monthly(plan.monthlyUsd)} + ${feeLabel(plan)}`}
          </span>
        </div>
      ))}
    </div>
  );
}

/** The pricing card: the three plans are the headline. */
function PricingBody({ page }: { page: OgPage }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <div style={{ fontSize: 28, fontWeight: 500, color: MUTED }}>{page.eyebrow ?? page.title}</div>
      <div style={{ display: "flex", gap: 48 }}>
        {PLANS.map((plan) => (
          <div key={plan.key} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 44, height: 6, borderRadius: 3, background: AMBER, marginBottom: 18 }} />
            <span style={{ fontSize: 30, fontWeight: 500, color: MUTED }}>{plan.name}</span>
            <div style={{ display: "flex", alignItems: "flex-end", letterSpacing: "-0.035em" }}>
              <span style={{ fontSize: 84, fontWeight: 600, color: SLATE }}>{monthly(plan.monthlyUsd)}</span>
              <span style={{ fontSize: 44, fontWeight: 600, color: MUTED, marginLeft: 10, marginBottom: 12 }}>
                {`+ ${feeLabel(plan)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 30, fontWeight: 500, color: SLATE }}>
        Every feature and unlimited subscriptions on every plan.
      </div>
    </div>
  );
}

/**
 * The mark's woven rings, drawn large and faint behind the card. The brand
 * forbids recolouring the mark, so it keeps its own slate and amber, stroke
 * and mask arcs (`public/brand/subora-mark.svg`) and is only made translucent.
 */
const RINGS_SIZE = 1000;
const RINGS = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${RINGS_SIZE}" height="${RINGS_SIZE}">
    <defs>
      <mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="#fff"/><path d="M65.3 68.71A19 19 0 0 1 43.07 51.66" fill="none" stroke="#000" stroke-width="16"/></mask>
      <mask id="b" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="#fff"/><path d="M34.7 31.29A19 19 0 0 1 56.93 48.34" fill="none" stroke="#000" stroke-width="16"/></mask>
    </defs>
    <g opacity="0.07">
      <circle cx="38" cy="50" r="19" fill="none" stroke="${SLATE}" stroke-width="9" mask="url(#a)"/>
      <circle cx="62" cy="50" r="19" fill="none" stroke="${AMBER}" stroke-width="9" mask="url(#b)"/>
    </g>
  </svg>`,
).toString("base64")}`;
