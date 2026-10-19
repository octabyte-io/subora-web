import Link from "next/link";
import { Container } from "@/components/site/primitives";
import { postBySlug, postPath, type Block, type Figure, type Post, type Section } from "@/content/use-cases";
import { cn } from "@/lib/utils";
import { Inline } from "./inline";
import { SceneCover } from "./scene-cover";
import { SCENES, type Scene } from "./scenes";

/** The pieces every use-case post is built from. `PostLayout` arranges them. */

/** The ground a block sits on: advice is on frost, Subora's part on paper. */
export type Surface = "frost" | "paper";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));

export const H2 = "scroll-mt-28 text-[clamp(1.5rem,1.2rem+1.1vw,2rem)] leading-[1.15] font-semibold tracking-[-0.025em]";

export function PostHeader({ post }: { post: Post }) {
  const changed = post.updated !== undefined;
  return (
    <header className="pt-10 pb-14 sm:pt-16 sm:pb-20">
      <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="text-small text-muted">
              <li>
                <Link href="/use-cases/" className="underline-offset-4 hover:text-slate hover:underline">
                  Use cases
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 text-[clamp(2.125rem,1.4rem+3vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {post.title}
          </h1>
          <div className="mt-8 max-w-[38rem] space-y-4 border-l-2 border-slate pl-5 text-lead">
            {post.answer.map((p) => (
              <p key={p}>
                <Inline text={p} />
              </p>
            ))}
          </div>
          <p className="mt-8 max-w-[38rem] text-small text-muted">
            {changed ? "Updated" : "Written"} <time dateTime={post.lastModified}>{formatDate(post.lastModified)}</time>.
            Everything Subora does here is on every plan, Free included.
          </p>
        </div>
        <SceneCover scene={post.cover} className="min-w-0" />
      </Container>
    </header>
  );
}

const ASIDE_LABELS = { tip: "Tip", note: "Note", careful: "Careful" } as const;

function Table({ block }: { block: Extract<Block, { type: "table" }> }) {
  const lit = (r: number, c: number) => block.highlight?.some(([hr, hc]) => hr === r && hc === c) ?? false;
  return (
    // Wide tables scroll inside themselves on phones; the region lets keyboard users scroll it too.
    <div role="region" aria-label={block.caption} tabIndex={0} className="relative overflow-x-auto rounded-sm">
      <table className="w-full min-w-[28rem] text-left text-small">
        <caption className="sr-only">{block.caption}</caption>
        <thead>
          <tr className="border-b-2 border-slate">
            {block.head.map((cell, c) => (
              <th key={c} scope="col" className="py-2.5 pr-4 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, r) => (
            <tr key={r} className="border-b border-line align-top">
              {row.map((cell, c) => {
                const Cell = c === 0 ? "th" : "td";
                return (
                  <Cell
                    key={c}
                    scope={c === 0 ? "row" : undefined}
                    className={cn("py-3 pr-4 tnum", c === 0 ? "font-semibold" : "font-normal text-slate/85")}
                  >
                    {lit(r, c) ? (
                      <span className="-mx-2 inline-block rounded-md bg-amber-tint px-2 font-semibold text-slate">
                        <Inline text={cell} />
                        <span className="sr-only"> (cheapest)</span>
                      </span>
                    ) : (
                      <Inline text={cell} />
                    )}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * A worked example as a ledger: labelled lines, then a total under a rule.
 * A total that stays with the merchant gets the amber tint; nothing else does.
 */
function Sum({ block, surface }: { block: Extract<Block, { type: "sum" }>; surface: Surface }) {
  return (
    <figure
      className={cn(
        "max-w-[34rem] rounded-2xl px-5 pt-4 pb-5 ring-1 ring-line sm:px-6",
        surface === "frost" ? "bg-paper" : "bg-frost",
      )}
    >
      <figcaption className="text-small text-muted">
        <Inline text={block.caption} />
      </figcaption>
      <dl className="mt-2 text-small tnum">
        {block.rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-line py-2.5">
            <dt className="text-slate/85">
              <Inline text={row.label} />
            </dt>
            <dd className="font-semibold whitespace-nowrap">{row.value}</dd>
          </div>
        ))}
        {block.total ? (
          <div
            className={cn(
              "mt-3 flex items-baseline justify-between gap-6 text-body font-semibold",
              block.total.good ? "-mx-3 rounded-xl bg-amber-tint px-3 py-3 text-slate" : "border-t-2 border-slate pt-3",
              block.rows.length > 0 && !block.total.good && "-mt-px",
            )}
          >
            <dt>
              <Inline text={block.total.label} />
            </dt>
            <dd className="whitespace-nowrap">{block.total.value}</dd>
          </div>
        ) : null}
      </dl>
    </figure>
  );
}

function BlockView({ block, surface }: { block: Block; surface: Surface }) {
  if (typeof block === "string") {
    return (
      <p>
        <Inline text={block} />
      </p>
    );
  }
  switch (block.type) {
    case "h3":
      return <h3 className="pt-3 text-[1.1875rem] font-semibold tracking-[-0.01em]">{block.text}</h3>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={cn("space-y-2 pl-5 marker:text-muted", block.ordered ? "list-decimal" : "list-disc")}>
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return <Table block={block} />;
    case "sum":
      return <Sum block={block} surface={surface} />;
    case "aside":
      return (
        <p className="border-l-2 border-slate/40 pl-4 text-small text-slate/85">
          <span className="font-semibold text-slate">{ASIDE_LABELS[block.kind]}: </span>
          <Inline text={block.text} />
        </p>
      );
  }
}

export function Blocks({ blocks, surface, className }: { blocks: Block[]; surface: Surface; className?: string }) {
  return (
    <div className={cn("space-y-5", className)}>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} surface={surface} />
      ))}
    </div>
  );
}

/**
 * A mock with its caption. A picture is one image to screen readers, named
 * by its `alt`; a working control, such as the plan calculator, is itself.
 */
export function SceneFigure({ figure, className }: { figure: Figure; className?: string }) {
  const scene: Scene = SCENES[figure.scene];
  return (
    <figure className={className}>
      {scene.interactive ? (
        scene.render()
      ) : (
        <div role="img" aria-label={scene.alt}>
          {scene.render()}
        </div>
      )}
      <figcaption className="mt-3 px-1 text-small text-muted">
        <Inline text={figure.caption} />
      </figcaption>
    </figure>
  );
}

export function SectionHeadingH2({ section, className }: { section: Pick<Section, "id" | "heading">; className?: string }) {
  return (
    <h2 id={section.id} className={cn(H2, className)}>
      {section.heading}
    </h2>
  );
}

export function Limits({ post, className }: { post: Post; className?: string }) {
  return (
    <section aria-labelledby="limits" className={className}>
      <h2 id="limits" className={H2}>
        What Subora doesn’t do here
      </h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {post.limits.map((limit) => (
          <li key={limit} className="py-3.5">
            <Inline text={limit} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedPosts({ post, className }: { post: Post; className?: string }) {
  const related = (post.related ?? []).map(postBySlug).filter((p) => p !== undefined);
  if (related.length === 0) return null;
  return (
    <section aria-labelledby="related" className={className}>
      <h2 id="related" className={H2}>
        More use cases
      </h2>
      <ul className="mt-6 grid grid-cols-1 border-t border-line sm:grid-cols-2">
        {related.map((r, i) => (
          <li key={r.slug} className={cn("border-b border-line", i % 2 === 1 && "sm:border-l sm:pl-6")}>
            <Link href={postPath(r.slug)} className="group block h-full py-5 pr-6">
              <span className="block text-[1.125rem] font-semibold group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                {r.title}
              </span>
              <span className="mt-1.5 block text-muted">{r.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
