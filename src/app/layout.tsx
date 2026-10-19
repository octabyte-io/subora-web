import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { pages } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Self-hosted at build time by next/font; no request reaches Google from a visitor.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pages.home.title,
    template: "%s | Subora",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.company }],
  creator: siteConfig.company,
  publisher: siteConfig.company,
  category: "Shopify app",
};

export const viewport: Viewport = {
  themeColor: "#F2F3F5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-slate px-5 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      </body>
    </html>
  );
}
