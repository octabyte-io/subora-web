import type { ReactNode } from "react";
import { Container, CtaLink, InstallLink } from "@/components/site/primitives";
import { siteConfig } from "@/config/site";

/** The last section of every page: one claim, the install action, and a way to ask first. */
export function ClosingCta({
  title = "Start on Free.",
  continuation = "Every feature is already on.",
  intro,
  secondary = { href: "/pricing/", label: "See pricing" },
}: {
  title?: ReactNode;
  continuation?: ReactNode;
  /** Defaults to who makes Subora and where to write before installing. */
  intro?: ReactNode;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="pt-24 sm:pt-32">
      <Container>
        <div className="grid grid-cols-1 items-end gap-10 border-t border-line pt-14 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h2 className="max-w-3xl text-d1 font-semibold tracking-[-0.04em]">
              {title}
              {continuation ? (
                <>
                  {" "}
                  <span className="text-muted">{continuation}</span>
                </>
              ) : null}
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-muted">
              {intro ?? (
                <>
                  Subora is made by {siteConfig.company}. Questions before you install go to{" "}
                  <a href={`mailto:${siteConfig.supportEmail}`} className="link text-slate">
                    {siteConfig.supportEmail}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <InstallLink />
            <CtaLink href={secondary.href} variant="secondary">
              {secondary.label}
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
