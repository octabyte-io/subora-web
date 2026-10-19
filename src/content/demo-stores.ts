/**
 * Three invented stores, reused by every product mock so the site tells one
 * story: the same coffee shows up in the Picker, the Loop and the emails.
 * Prices are believable, not real data, and no figure here is a claim about
 * Subora's results.
 */
export type DemoStore = {
  name: string;
  /** Theme colours for the store's own pages, so mocks read as the shop, not Subora. */
  theme: { ground: string; ink: string; accent: string; accentInk: string };
  product: {
    title: string;
    variant: string;
    price: number;
    /** Subscribe & Save discount, as a whole percent. */
    save: number;
    frequencies: string[];
  };
  customer: string;
};

export const STORES = {
  coffee: {
    name: "Ember Hill Roasters",
    theme: { ground: "#F7F1EA", ink: "#2A1F1A", accent: "#2A1F1A", accentInk: "#F7F1EA" },
    product: {
      title: "House Espresso",
      variant: "340 g · Whole bean",
      price: 18,
      save: 15,
      frequencies: ["Every 2 weeks", "Every 4 weeks", "Every 6 weeks"],
    },
    customer: "Maya Torres",
  },
  pet: {
    name: "Fernlee",
    theme: { ground: "#F1F5EE", ink: "#1F3326", accent: "#2F5D3A", accentInk: "#FFFFFF" },
    product: {
      title: "Salmon & Oat Adult Dry Food",
      variant: "6 kg bag",
      price: 54,
      save: 10,
      frequencies: ["Every 4 weeks", "Every 6 weeks", "Every 8 weeks"],
    },
    customer: "Sam Okafor",
  },
  skincare: {
    name: "Mira Skin",
    theme: { ground: "#FBF5F3", ink: "#3A2A2E", accent: "#7A4B55", accentInk: "#FFFFFF" },
    product: {
      title: "Daily Barrier Serum",
      variant: "30 ml",
      price: 32,
      save: 10,
      frequencies: ["Every month", "Every 2 months"],
    },
    customer: "Lena Fischer",
  },
} satisfies Record<string, DemoStore>;

export type StoreKey = keyof typeof STORES;

/** "$15.30". Mocks show cents; marketing copy rounds. */
export function money(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function discounted(price: number, save: number) {
  return Math.round(price * (100 - save)) / 100;
}
