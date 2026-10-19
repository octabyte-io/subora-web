"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Money } from "@/components/site/primitives";
import { STORES, discounted } from "@/content/demo-stores";

/**
 * The Loop: the woven-rings mark drawn as one subscription's cycle. The right
 * (amber) ring is the Customer, the left ring the Shop; they cross at the
 * weave, the renewal. A dot follows the visitor's scroll past each event.
 * Without JavaScript, and with reduced motion, it shows its final state.
 */

const coffee = STORES.coffee;
const price = discounted(coffee.product.price, coffee.product.save);

// Geometry: the mark's proportions (r 19, centres 24 apart), drawn larger.
const R = 146;
const CY = 220;
const CX = { shop: 228, customer: 412 };
const HALF = (CX.customer - CX.shop) / 2;
const WEAVE_Y = CY - Math.sqrt(R * R - HALF * HALF);
const deg = (rad: number) => (rad * 180) / Math.PI;
// Angles (degrees, clockwise from 3 o'clock) at which each ring meets the top weave.
const START = {
  customer: deg(Math.atan2(WEAVE_Y - CY, CX.shop + HALF - CX.customer)),
  shop: deg(Math.atan2(WEAVE_Y - CY, CX.shop + HALF - CX.shop)),
};

/**
 * Position along the cycle, 0–2: the first unit is one lap of the Customer
 * ring from the weave, the second one lap of the Shop ring.
 */
function pointAt(s: number) {
  const ring = s < 1 ? "customer" : "shop";
  const a = ((START[ring] + 360 * (s < 1 ? s : s - 1)) * Math.PI) / 180;
  return { x: CX[ring] + R * Math.cos(a), y: CY + R * Math.sin(a) };
}

/** Where an event sits, from its angle on its ring. */
function at(ring: "customer" | "shop", angle: number) {
  const lap = (((angle - START[ring]) % 360) + 360) % 360;
  return (ring === "customer" ? 0 : 1) + lap / 360;
}

type LoopEvent = {
  key: string;
  label: string;
  s: number;
  /** Label side, so labels sit outside the rings. */
  anchor: "start" | "end" | "middle";
  title: string;
  body: string;
  card: ReactNode;
  /** Money moving in the merchant's favour: the one amber node. */
  win?: boolean;
};

function Card({ children, win }: { children: ReactNode; win?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mt-5 max-w-sm rounded-xl px-4 py-3 text-small ring-1",
        win ? "bg-amber text-slate ring-amber" : "bg-white/[0.06] text-white/85 ring-white/12",
      )}
    >
      {children}
    </div>
  );
}

const EVENTS: LoopEvent[] = [
  {
    key: "order",
    label: "Order placed",
    s: at("customer", 262),
    anchor: "middle",
    title: "Maya subscribes on the product page",
    body: `She picks Subscribe in the Picker and pays in Shopify’s own checkout. Shopify creates the subscription, and Subora looks after it from here.`,
    card: (
      <div className="flex items-baseline justify-between gap-4">
        <span>
          <span className="font-semibold text-white">{coffee.product.title}</span>, every 4 weeks
        </span>
        <Money amount={price} className="font-semibold text-white" />
      </div>
    ),
  },
  {
    key: "reminder",
    label: "Renewal reminder",
    s: at("customer", 322),
    anchor: "start",
    title: "A reminder before each order",
    body: "The email comes from Ember Hill Roasters, with its logo and color, not from Subora. It says what is coming, when, and what it costs.",
    card: (
      <p>
        <span className="font-semibold text-white">{coffee.name}:</span> your next order is coming
      </p>
    ),
  },
  {
    key: "skip",
    label: "Skip or swap",
    s: at("customer", 32),
    anchor: "start",
    title: "She skips one, from her own account",
    body: "Half a bag left, so she skips the next delivery in the Customer portal. She could swap to another coffee or get it sooner the same way, without writing to you.",
    card: (
      <p>
        <span className="font-semibold text-white">Delivery skipped.</span> You will not get the delivery on November
        5, and you will not be charged for it.
      </p>
    ),
  },
  {
    key: "charge",
    label: "Charge",
    s: at("shop", 78),
    anchor: "middle",
    title: "The next renewal is charged",
    body: "On the date, Subora asks Shopify to charge her saved card. Shopify turns it into an ordinary order. Shopify’s order confirmation is her receipt, so she never gets two.",
    card: (
      <div className="flex items-baseline justify-between gap-4">
        <span>Renewal, December 3</span>
        <Money amount={price} className="font-semibold text-white" />
      </div>
    ),
  },
  {
    key: "failed",
    label: "Card declined",
    s: at("shop", 126),
    anchor: "end",
    title: "Her card is declined",
    body: "Maya gets an email telling her the order is not placed yet and when it will be tried again. Her portal shows the same, with a button to update her card through Shopify.",
    card: (
      <p>
        <span className="font-semibold text-white">Your order is not placed yet.</span> We will try the payment again on
        December 4.
      </p>
    ),
  },
  {
    key: "retry",
    label: "Retry",
    s: at("shop", 176),
    anchor: "end",
    title: "Retried on your Retry rules",
    body: "By default, three retries after 1, 3 and 5 days. When she adds a new card, Subora retries straight away instead of waiting for the next one.",
    card: (
      <p>
        <span className="font-semibold text-white">New card added.</span> Retrying the payment now.
      </p>
    ),
  },
  {
    key: "recovered",
    label: "Recovered",
    s: at("shop", 226),
    anchor: "end",
    win: true,
    title: "The payment goes through",
    body: "The order is placed, she gets a “your payment went through” email, and the sale is counted in your Recovery numbers.",
    card: (
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold">Payment recovered</span>
        <Money amount={price} className="font-bold" />
      </div>
    ),
  },
  {
    key: "shipped",
    label: "Shipped",
    s: at("shop", 282),
    anchor: "middle",
    title: "You ship it like any other order",
    body: "It is a normal Shopify order, so your fulfillment does not change. Four weeks later the rings meet again, and the next cycle starts.",
    card: (
      <p>
        <span className="font-semibold text-white">Order #1048</span> is ready to fulfill.
      </p>
    ),
  },
];

function labelPosition(e: LoopEvent) {
  const ring = e.s < 1 ? "customer" : "shop";
  const p = pointAt(e.s);
  const dx = p.x - CX[ring];
  const dy = p.y - CY;
  const k = (R + 22) / R;
  return { x: CX[ring] + dx * k, y: CY + dy * k + (dy > 0 ? 14 : e.anchor === "middle" ? -4 : 5) };
}

/** A short arc of a ring, for re-drawing the over-strand at a crossing. */
function arc(ring: "customer" | "shop", from: number, to: number) {
  const p = (a: number) => {
    const r = (a * Math.PI) / 180;
    return `${(CX[ring] + R * Math.cos(r)).toFixed(2)} ${(CY + R * Math.sin(r)).toFixed(2)}`;
  };
  return `M ${p(from)} A ${R} ${R} 0 0 1 ${p(to)}`;
}

function LoopDiagram({ progress, active, still }: { progress: number; active: number; still: boolean }) {
  const dot = pointAt(progress);
  return (
    <svg viewBox="-50 0 740 440" className="h-auto w-full" aria-hidden="true">
      {/* The rings, as in the mark on slate: Shop white, Customer amber. */}
      <circle cx={CX.shop} cy={CY} r={R} fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="10" />
      <circle cx={CX.customer} cy={CY} r={R} fill="none" stroke="rgb(232 163 61 / 0.55)" strokeWidth="10" />
      {/* The weave: the Shop ring passes over at the top, the Customer ring at the bottom. */}
      <path d={arc("shop", START.shop - 14, START.shop + 14)} stroke="var(--slate)" strokeWidth="18" fill="none" />
      <path d={arc("shop", START.shop - 16, START.shop + 16)} stroke="rgb(255 255 255 / 0.22)" strokeWidth="10" fill="none" />
      <path d={arc("customer", -START.customer - 14, -START.customer + 14)} stroke="var(--slate)" strokeWidth="18" fill="none" />
      <path
        d={arc("customer", -START.customer - 16, -START.customer + 16)}
        stroke="rgb(232 163 61 / 0.55)"
        strokeWidth="10"
        fill="none"
      />

      {/* Each ring's name, in the part of it the other ring doesn't cover. */}
      <text x={CX.customer + 70} y={CY + 6} className="fill-white/50 text-[16px] max-sm:text-[26px]" textAnchor="middle">
        Customer
      </text>
      <text x={CX.shop - 70} y={CY + 6} className="fill-white/50 text-[16px] max-sm:text-[26px]" textAnchor="middle">
        Shop
      </text>

      {EVENTS.map((e, i) => {
        const p = pointAt(e.s);
        const l = labelPosition(e);
        const passed = still || i <= active;
        const current = !still && i === active;
        return (
          <g key={e.key}>
            <circle
              cx={p.x}
              cy={p.y}
              r={current ? 9 : 6.5}
              className="transition-[r] duration-300"
              fill={passed ? (e.win ? "var(--amber)" : "#fff") : "var(--slate)"}
              stroke={e.win ? "var(--amber)" : "#fff"}
              strokeOpacity={passed ? 1 : 0.5}
              strokeWidth="2.5"
            />
            <text
              x={l.x}
              y={l.y}
              textAnchor={e.anchor}
              className={cn(
                // Too small to read on a phone; the numbered steps below carry it there.
                "text-[16px] font-semibold transition-colors duration-300 max-sm:hidden",
                e.win && passed ? "fill-amber" : passed ? "fill-white" : "fill-white/45",
              )}
            >
              {e.label}
            </text>
          </g>
        );
      })}

      {still ? null : (
        <g>
          <circle cx={dot.x} cy={dot.y} r="16" fill="rgb(255 255 255 / 0.12)" />
          <circle cx={dot.x} cy={dot.y} r="7" fill="#fff" />
        </g>
      )}
    </svg>
  );
}

export function TheLoop() {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [state, setState] = useState({ progress: EVENTS[EVENTS.length - 1].s, active: EVENTS.length - 1, still: true });

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    // A fractional step index: 2.5 means halfway between the 3rd and 4th
    // steps' centres crossing the middle of the viewport.
    const measure = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      const centres = stepRefs.current.map((el) => {
        const r = el?.getBoundingClientRect();
        return r ? r.top + r.height / 2 : 0;
      });
      let f = 0;
      if (mid >= centres[centres.length - 1]) f = centres.length - 1;
      else if (mid > centres[0]) {
        const i = centres.findIndex((c) => c > mid) - 1;
        f = i + (mid - centres[i]) / (centres[i + 1] - centres[i]);
      }
      const i = Math.floor(f);
      const from = EVENTS[i].s;
      const to = EVENTS[Math.min(i + 1, EVENTS.length - 1)].s;
      setState({ progress: from + (to - from) * (f - i), active: Math.round(f), still: false });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const setup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (desktop.matches && !reduce.matches) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        measure();
      } else {
        setState({ progress: EVENTS[EVENTS.length - 1].s, active: EVENTS.length - 1, still: true });
      }
    };
    setup();
    desktop.addEventListener("change", setup);
    reduce.addEventListener("change", setup);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", setup);
      reduce.removeEventListener("change", setup);
    };
  }, []);

  return (
    <div className="mt-14 grid grid-cols-1 gap-x-16 lg:mt-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div className="lg:sticky lg:top-16 lg:-mt-10 lg:flex lg:h-[calc(100dvh-4rem)] lg:items-center">
        <div className="mx-auto w-full max-w-[44rem]">
          <LoopDiagram {...state} />
        </div>
      </div>
      <ol className="mt-10 lg:mt-0 lg:pt-[14vh] lg:pb-[18vh]">
        {EVENTS.map((e, i) => (
          <li
            key={e.key}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={cn(
              "relative border-t border-white/12 py-8 pl-12 transition-opacity duration-300 lg:min-h-[52vh] lg:border-t-0 lg:py-10",
              !state.still && i !== state.active && "lg:opacity-40",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-8 left-0 grid size-8 place-items-center rounded-full text-small font-bold tnum lg:top-10",
                e.win ? "bg-amber text-slate" : "bg-white/10 text-white ring-1 ring-white/25 ring-inset",
              )}
            >
              {i + 1}
            </span>
            <h3 className="text-d3 font-semibold tracking-[-0.02em]">{e.title}</h3>
            <p className="mt-3 text-white/75 measure">{e.body}</p>
            <Card win={e.win}>{e.card}</Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
