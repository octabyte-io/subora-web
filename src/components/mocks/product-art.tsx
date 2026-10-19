import { cn } from "@/lib/utils";
import type { StoreKey } from "@/content/demo-stores";

/** Soft tile behind each store's product, a shade off its theme ground. */
const TILE: Record<StoreKey, string> = {
  coffee: "#EBDFD1",
  pet: "#DDE8D8",
  skincare: "#F1E1DC",
};

/**
 * Flat product pictures for the demo stores: a coffee bag, a pet food bag and
 * a serum bottle. `accent` recolours the label, so one store can show a range.
 */
export function ProductArt({
  store,
  accent,
  className,
}: {
  store: StoreKey;
  accent?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid aspect-square place-items-center rounded-xl", className)} style={{ backgroundColor: TILE[store] }}>
      <svg viewBox="0 0 120 120" aria-hidden="true" className="h-[72%] w-auto">
        {store === "coffee" ? (
          <g>
            <path d="M34 30 H86 L90 104 H30 Z" fill="#B88A62" />
            <rect x="31" y="20" width="58" height="12" rx="2" fill="#A3754F" />
            <path d="M40 26 H80" stroke="#8C6342" strokeWidth="2" strokeLinecap="round" />
            <rect x="42" y="50" width="36" height="36" rx="3" fill={accent ?? "#2A1F1A"} />
            <ellipse cx="60" cy="64" rx="7" ry="9.5" fill="#F7F1EA" />
            <path d="M60 55 C56 61 64 67 60 73" fill="none" stroke={accent ?? "#2A1F1A"} strokeWidth="2" />
            <rect x="48" y="78" width="24" height="3" rx="1.5" fill="#F7F1EA" opacity="0.7" />
          </g>
        ) : null}
        {store === "pet" ? (
          <g>
            <path d="M30 26 C30 22 33 20 37 20 H83 C87 20 90 22 90 26 L94 102 C94 106 91 108 87 108 H33 C29 108 26 106 26 102 Z" fill={accent ?? "#2F5D3A"} />
            <path d="M30 32 H90" stroke="#1F3326" strokeWidth="2" opacity="0.35" />
            <rect x="38" y="46" width="44" height="40" rx="6" fill="#E4EDDF" />
            <path d="M46 68 H74 C74 76 68 80 60 80 C52 80 46 76 46 68 Z" fill="#C9874F" />
            <circle cx="54" cy="64" r="3" fill="#A86B3A" />
            <circle cx="62" cy="62" r="3" fill="#A86B3A" />
            <circle cx="68" cy="65" r="2.5" fill="#A86B3A" />
            <rect x="46" y="94" width="28" height="4" rx="2" fill="#E4EDDF" opacity="0.6" />
          </g>
        ) : null}
        {store === "skincare" ? (
          <g>
            <rect x="54" y="14" width="12" height="14" rx="6" fill="#3A2A2E" />
            <rect x="50" y="26" width="20" height="14" rx="2" fill="#5A4247" />
            <path d="M44 44 C44 41 46 40 49 40 H71 C74 40 76 41 76 44 V102 C76 105 74 106 71 106 H49 C46 106 44 105 44 102 Z" fill="#D7AFA8" />
            <rect x="48" y="60" width="24" height="30" rx="2" fill="#FBF5F3" />
            <rect x="52" y="66" width="16" height="3" rx="1.5" fill={accent ?? "#7A4B55"} />
            <rect x="54" y="73" width="12" height="2" rx="1" fill={accent ?? "#7A4B55"} opacity="0.5" />
            <path d="M49 46 V96" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
