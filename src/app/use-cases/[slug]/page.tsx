import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PostLayout } from "@/components/use-cases/post-layout";
import { postJsonLd, postMetadata } from "@/components/use-cases/structured-data";
import { POSTS, entryFor, postBySlug } from "@/content/use-cases";
import { JsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  return postMetadata(entryFor(slug), post);
}

export default async function UseCasePostPage({ params }: Props) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={postJsonLd(entryFor(slug), post)} />
      <PostLayout post={post} />
      <ClosingCta />
    </>
  );
}
