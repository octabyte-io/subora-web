import { Container } from "@/components/site/primitives";
import { Mark } from "@/components/site/logo";
import { RelatedFeatures } from "@/components/sections/related-features";
import { pages } from "@/config/pages";
import type { Post, Section } from "@/content/use-cases";
import { cn } from "@/lib/utils";
import { Blocks, Limits, PostHeader, RelatedPosts, SceneFigure, SectionHeadingH2 } from "./post-parts";

/**
 * A use-case post. The general advice is plain prose on the frost page; where
 * Subora comes in, the ground turns to paper and the mock sits beside the
 * words. The change of surface, and the rings beside the first of those
 * headings, mark where the advice ends and the product begins.
 */
export function PostLayout({ post }: { post: Post }) {
  let panes = 0;
  return (
    <article>
      <PostHeader post={post} />

      {post.sections.map((section, i) => {
        if (section.voice === "neutral") return <NeutralSection key={section.id} section={section} />;
        const first = post.sections[i - 1]?.voice !== "subora";
        const last = post.sections[i + 1]?.voice !== "subora";
        return (
          <SuboraSection key={section.id} section={section} first={first} last={last} flip={panes++ % 2 === 1} />
        );
      })}

      <Container className="py-16 sm:py-20">
        <Limits post={post} className="measure" />
      </Container>

      <RelatedFeatures
        only={post.features.map((key) => pages[key].path)}
        title="The features this uses."
        continuation="On every plan, Free included."
      />

      <Container className="pt-16 sm:pt-20">
        <RelatedPosts post={post} className="max-w-4xl" />
      </Container>
    </article>
  );
}

function NeutralSection({ section }: { section: Section }) {
  return (
    <section aria-labelledby={section.id} className="py-8 sm:py-10">
      <Container
        className={cn(
          "grid grid-cols-1 items-start gap-10 lg:gap-16",
          section.figure && "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]",
        )}
      >
        <div className="measure min-w-0">
          <SectionHeadingH2 section={section} />
          <Blocks blocks={section.blocks} surface="frost" className="mt-5" />
        </div>
        {section.figure ? <SceneFigure figure={section.figure} className="min-w-0" /> : null}
      </Container>
    </section>
  );
}

/**
 * One of Subora's sections. A run of them shares one paper ground, split by
 * hairlines, with the mocks swapping sides from one to the next.
 */
function SuboraSection({
  section,
  first,
  last,
  flip,
}: {
  section: Section;
  first: boolean;
  last: boolean;
  flip: boolean;
}) {
  const beside = section.figure !== undefined;
  return (
    <section
      aria-labelledby={section.id}
      className={cn("bg-paper", first ? "mt-8 pt-16 sm:mt-10 sm:pt-20" : "pt-0", last ? "pb-16 sm:pb-20" : "pb-0")}
    >
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-10 lg:gap-16",
            !first && "border-t border-line pt-14 sm:pt-16",
            !last && "pb-14 sm:pb-16",
            beside && "lg:grid-cols-2",
          )}
        >
          <div className={cn("measure min-w-0", flip && beside && "lg:order-2")}>
            <div className={cn(first && "flex items-start gap-3")}>
              {first ? <Mark className="mt-0.5 size-8 sm:mt-1 sm:size-9" /> : null}
              <SectionHeadingH2 section={section} />
            </div>
            <Blocks blocks={section.blocks} surface="paper" className="mt-5" />
          </div>
          {section.figure ? <SceneFigure figure={section.figure} className="min-w-0" /> : null}
        </div>
      </Container>
    </section>
  );
}
