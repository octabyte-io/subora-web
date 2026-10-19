"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { featureNav, mainNav, siteConfig } from "@/config/site";
import { Mark, Logo } from "./logo";

/** The current page's nav item carries an amber underline: a decoration, never amber text. */
const CURRENT = "aria-[current=page]:underline aria-[current=page]:decoration-amber aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[7px]";

export function SiteHeader() {
  const pathname = usePathname();
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresButton = useRef<HTMLButtonElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const mobileId = useId();

  // Close both menus when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setFeaturesOpen(false);
    setMobileOpen(false);
  }

  // The Features menu closes on a tap outside it, on Escape (focus goes back
  // to its button), and when keyboard focus moves on past its last link.
  useEffect(() => {
    if (!featuresOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!featuresRef.current?.contains(event.target as Node)) setFeaturesOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setFeaturesOpen(false);
      featuresButton.current?.focus();
    };
    const onFocus = (event: FocusEvent) => {
      if (!featuresRef.current?.contains(event.target as Node)) setFeaturesOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [featuresOpen]);

  // The mobile menu closes on Escape (focus goes back to its button) and
  // when the viewport grows to the desktop nav. While it is open the page
  // behind it does not scroll.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      mobileButton.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [mobileOpen]);

  const inFeatures = pathname.startsWith("/features/");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-frost/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[74rem] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0 rounded-md" aria-label="Subora home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 whitespace-nowrap lg:flex">
          <div ref={featuresRef} className="relative">
            <button
              ref={featuresButton}
              type="button"
              aria-expanded={featuresOpen}
              aria-controls={panelId}
              onClick={() => setFeaturesOpen((open) => !open)}
              className={cn(
                "inline-flex h-10 items-center gap-1 rounded-full px-3.5 font-medium hover:bg-slate/[0.06]",
                inFeatures && "underline decoration-amber decoration-2 underline-offset-[7px]",
              )}
            >
              Features
              <ChevronDown
                aria-hidden="true"
                className={cn("size-4 transition-transform", featuresOpen && "rotate-180")}
              />
            </button>
            {/* Stays mounted while closed, so aria-controls always points at it. */}
            <div
              id={panelId}
              hidden={!featuresOpen}
              className="absolute top-[3.25rem] left-0 w-[40rem] rounded-[1.25rem] bg-paper p-2 ring-1 ring-line shadow-[0_28px_56px_-28px_rgb(28_32_38/0.45)]"
            >
              <ul className="grid grid-cols-2 gap-0.5">
                {featureNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="block h-full rounded-xl px-4 py-3 whitespace-normal hover:bg-frost aria-[current=page]:bg-frost"
                    >
                      <span className="block font-semibold">{item.label}</span>
                      <span className="mt-0.5 block text-small text-muted">{item.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className={cn("inline-flex h-10 items-center rounded-full px-3.5 font-medium hover:bg-slate/[0.06]", CURRENT)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={siteConfig.installUrl}
            className="hidden h-10 items-center gap-2 rounded-full bg-slate pr-5 pl-1.5 text-small font-semibold text-paper hover:bg-slate-deep sm:inline-flex"
          >
            <span className="grid size-7 place-items-center rounded-full bg-paper">
              <Mark className="size-6" />
            </span>
            Install on Shopify
          </a>
          <button
            ref={mobileButton}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-slate/[0.06] lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <nav
        id={mobileId}
        aria-label="Mobile"
        hidden={!mobileOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-paper lg:hidden"
      >
        <div className="mx-auto max-w-[74rem] px-4 pt-4 pb-6 sm:px-6">
          <h2 className="px-3 text-small font-semibold text-muted">Features</h2>
          <ul className="mt-1">
            {featureNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block rounded-xl px-3 py-2.5 hover:bg-frost aria-[current=page]:bg-frost"
                >
                  <span className="block text-[1.0625rem] font-semibold">{item.label}</span>
                  <span className="block text-small text-muted">{item.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-3 border-t border-line pt-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="block rounded-xl px-3 py-2.5 text-[1.0625rem] font-semibold hover:bg-frost aria-[current=page]:bg-frost"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.installUrl}
            className="mt-5 flex h-12 items-center justify-center gap-2.5 rounded-full bg-slate pr-6 pl-2 font-semibold text-paper"
          >
            <span className="grid size-8 place-items-center rounded-full bg-paper">
              <Mark className="size-7" />
            </span>
            Install on Shopify
          </a>
        </div>
      </nav>
    </header>
  );
}
