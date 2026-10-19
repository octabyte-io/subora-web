import Link from "next/link";
import { Container } from "@/components/site/primitives";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { SceneThumb } from "@/components/use-cases/scene-cover";
import { indexJsonLd } from "@/components/use-cases/structured-data";
import { pages } from "@/config/pages";
import { GROUPS, POSTS, postPath } from "@/content/use-cases";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(pages.useCases);

/**
 * The use-case index: the posts as a ledger, grouped by where a subscription
 * is in its life. Each row is one link, with its cover drawn small beside it.
 */
export default function UseCasesPage() {
  return (
    <>
      <JsonLd data={indexJsonLd()} />
      <PageHero
        title="Practical answers for selling subscriptions on Shopify."
        continuation="With Subora, or without it."
        intro={
          <p>
            Each page answers the question for any Shopify store first, then shows how Subora handles it. Figures
            come from three example stores and are worked arithmetic, not results.
          </p>
        }
        className="pb-12 sm:pb-16"
      />

      <Container className="space-y-16 sm:space-y-20">
        {GROUPS.map((group) => {
          const posts = POSTS.filter((post) => post.group === group.key);
          if (posts.length === 0) return null;
          return (
            <section
              key={group.key}
              aria-labelledby={`group-${group.key}`}
              className="grid grid-cols-1 gap-x-12 gap-y-6 border-t-2 border-slate pt-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
            >
              <div>
                <h2 id={`group-${group.key}`} className="text-d3 font-semibold tracking-[-0.02em]">
                  {group.title}
                </h2>
                <p className="mt-2 text-muted">{group.intro}</p>
              </div>
              <ul className="divide-y divide-line lg:-mt-6">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={postPath(post.slug)}
                      className="group grid grid-cols-1 items-center gap-x-8 gap-y-4 py-6 sm:grid-cols-[minmax(0,1fr)_13rem] lg:py-7"
                    >
                      <span>
                        <span className="block text-[1.3125rem] leading-snug font-semibold tracking-[-0.015em] group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                          {post.title}
                        </span>
                        <span className="mt-2 block max-w-[62ch] text-muted">{post.summary}</span>
                      </span>
                      <SceneThumb scene={post.cover} zoom={0.3} className="hidden sm:block" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Container>

      <ClosingCta />
    </>
  );
}
