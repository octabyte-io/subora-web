import Link from "next/link";
import { Band, SectionHeading } from "@/components/site/primitives";
import { postPath, postsForFeature, type FeatureKey } from "@/content/use-cases";
import { cn } from "@/lib/utils";

/**
 * The use-case posts about one or more features, for the foot of a feature
 * page: a ledger of titles and summaries, as `RelatedFeatures` is.
 */
export function UseCaseLinks({
  features,
  tone = "frost",
}: {
  features: FeatureKey[];
  tone?: "frost" | "paper";
}) {
  const posts = [...new Set(features.flatMap(postsForFeature))];
  if (posts.length === 0) return null;
  return (
    <Band tone={tone} aria-labelledby="use-cases-title">
      <SectionHeading
        id="use-cases-title"
        title="When you’d use it."
        continuation="What to do in each case, with Subora or without."
      />
      <ul className="mt-12 grid grid-cols-1 border-t border-line sm:grid-cols-2">
        {posts.map((post, i) => (
          <li key={post.slug} className={cn("border-b border-line", i % 2 === 1 && "sm:border-l sm:pl-6")}>
            <Link href={postPath(post.slug)} className="group block h-full py-6 pr-6">
              <span className="block text-[1.125rem] font-semibold group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                {post.title}
              </span>
              <span className="mt-1.5 block text-muted">{post.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}
