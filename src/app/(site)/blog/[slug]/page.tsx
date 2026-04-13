import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayloadClient } from "@/lib/payload";
import { CTASection } from "@/components/CTASection";

export const revalidate = 300;
export const dynamicParams = true;

type Params = { slug: string };

type PostDoc = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  content?: unknown;
  coverImage?: { url?: string | null; alt?: string | null; width?: number; height?: number } | string | number | null;
};

async function getPost(slug: string): Promise<PostDoc | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return (docs[0] as unknown as PostDoc) ?? null;
}

async function getRelated(currentId: string | number): Promise<PostDoc[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: {
      id: { not_equals: currentId },
      publishedAt: { less_than_equal: new Date().toISOString() },
    },
    sort: "-publishedAt",
    limit: 3,
    depth: 1,
  });
  return docs as unknown as PostDoc[];
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      limit: 100,
      depth: 0,
    });
    return docs.map((d) => ({ slug: (d as { slug: string }).slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const cover = typeof post.coverImage === "object" && post.coverImage !== null ? post.coverImage : null;
  const ogImage = cover?.url;

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      url: `/blog/${post.slug}`,
      images: ogImage ? [{ url: ogImage, alt: cover?.alt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelated(post.id);
  const cover = typeof post.coverImage === "object" && post.coverImage !== null ? post.coverImage : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    image: cover?.url ? [cover.url] : undefined,
    author: {
      "@type": "Organization",
      name: "Algonquin Nurses Home Health Care",
    },
    publisher: {
      "@type": "Organization",
      name: "Algonquin Nurses Home Health Care",
      logo: {
        "@type": "ImageObject",
        url: "https://algonquinnursesstl.com/images/algonquin-logo-top-300.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://algonquinnursesstl.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="bg-white">
        {/* Header */}
        <header className="pt-14 lg:pt-20 pb-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-6 hover:gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-5">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-neutral-600 leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </header>

        {cover?.url && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={cover.url}
                alt={cover.alt || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-a:text-primary prose-a:font-medium hover:prose-a:underline prose-strong:text-neutral-900 prose-blockquote:border-primary">
              {post.content ? (
                <RichText data={post.content as Parameters<typeof RichText>[0]["data"]} />
              ) : null}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 lg:py-20 bg-surface border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-8">Keep reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => {
                  const rCover = typeof r.coverImage === "object" && r.coverImage !== null ? r.coverImage : null;
                  return (
                    <Link
                      key={r.id}
                      href={`/blog/${r.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                        {rCover?.url ? (
                          <Image
                            src={rCover.url}
                            alt={rCover.alt || r.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/30" />
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-neutral-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                          {r.title}
                        </h3>
                        {r.excerpt && (
                          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                            {r.excerpt}
                          </p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1 text-primary font-medium text-sm">
                          Read article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection
        title="Questions About Home Care?"
        description="Our team is happy to walk you through your options and answer any questions about getting started."
      />
    </>
  );
}
