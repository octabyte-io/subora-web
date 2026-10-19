import type { ReactNode } from "react";
import { Container } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

/**
 * The top of every inner page: a two-tone h1, a lead, the actions, and a
 * coded mock beside it. Without an `aside` the text runs the full measure.
 */
export function PageHero({
  title,
  continuation,
  intro,
  children,
  aside,
  className,
}: {
  title: ReactNode;
  /** The muted second half of the heading: a whole clause, never one word. */
  continuation?: ReactNode;
  intro: ReactNode;
  /** The actions, usually `<InstallLink />` and one secondary `CtaLink`. */
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("pt-12 pb-20 sm:pt-20 sm:pb-24", className)}>
      <Container
        className={cn(
          "grid grid-cols-1 items-center gap-12 lg:gap-16",
          aside && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
        )}
      >
        <div className={cn(!aside && "max-w-4xl")}>
          <h1 className="text-d1 font-semibold tracking-[-0.04em]">
            {title}
            {continuation ? (
              <>
                {" "}
                <span className="text-muted">{continuation}</span>
              </>
            ) : null}
          </h1>
          <div className="mt-7 max-w-[36rem] text-lead text-muted">{intro}</div>
          {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </Container>
    </section>
  );
}
