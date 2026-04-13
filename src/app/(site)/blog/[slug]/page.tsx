import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayloadClient } from "@/lib/payload";
import { CTASection } from "@/components/CTASection";

export const revalidate = 300;
export const dynamicParams = true;

const SITE_URL = "https://algonquinnursesstl.com";
const ORG_NAME = "Algonquin Nurses Home Health Care";
const ORG_LOGO = `${SITE_URL}/images/algonquin-logo-top-300.png`;

type Params = { slug: string };

type SeoGroup = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  noIndex?: boolean | null;
};

type CoverImage = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type PostDoc = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  content?: unknown;
  coverImage?: CoverImage | string | number | null;
  seo?: SeoGroup | null;
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

function getCover(post: PostDoc): CoverImage | null {
  return typeof post.coverImage === "object" && post.coverImage !== null
    ? (post.coverImage as CoverImage)
    : null;
}

function plainText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: string; children?: unknown[] };
  if (typeof n.text === "string") return n.text;
  if (Array.isArray(n.children)) return n.children.map(plainText).join(" ");
  return "";
}

function readingTimeMinutes(content: unknown): number {
  const root = (content as { root?: unknown })?.root;
  const text = plainText(root);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found", robots: { index: false, follow: false } };

  const cover = getCover(post);
  const seo = post.seo ?? {};
  const title = seo.metaTitle?.trim() || post.title;
  const description = seo.metaDescription?.trim() || post.excerpt?.trim() || undefined;
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = cover?.url
    ? {
        url: cover.url,
        width: cover.width ?? 1600,
        height: cover.height ?? 900,
        alt: cover.alt || post.title,
      }
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: seo.keywords?.split(",").map((k) => k.trim()).filter(Boolean),
    alternates: { canonical: `/blog/${post.slug}` },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    authors: [{ name: ORG_NAME, url: SITE_URL }],
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: ORG_NAME,
      locale: "en_US",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? post.publishedAt ?? undefined,
      authors: [ORG_NAME],
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage.url] : undefined,
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
  const cover = getCover(post);
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const description = post.seo?.metaDescription?.trim() || post.excerpt?.trim() || undefined;
  const minutes = readingTimeMinutes(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    image: cover?.url ? [cover.url] : undefined,
    keywords: post.seo?.keywords ?? undefined,
    wordCount: plainText((post.content as { root?: unknown })?.root).trim().split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${minutes}M`,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: ORG_LOGO },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="bg-white">
        <header className="pt-14 lg:pt-20 pb-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-neutral-500">
                <li>
                  <Link href="/" className="hover:text-primary">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog" className="hover:text-primary">Blog</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-neutral-700 truncate max-w-[16rem]" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-6 hover:gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 mb-4">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {minutes} min read
              </span>
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
            <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={cover.url}
                alt={cover.alt || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              {cover.alt && (
                <figcaption className="sr-only">{cover.alt}</figcaption>
              )}
            </figure>
          </div>
        )}

        <div className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-a:text-primary prose-a:font-medium hover:prose-a:underline prose-strong:text-neutral-900 prose-blockquote:border-primary">
              {post.content ? (
                <RichText data={post.content as Parameters<typeof RichText>[0]["data"]} />
              ) : null}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="py-16 lg:py-20 bg-surface border-t border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-8">Keep reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => {
                  const rCover = getCover(r);
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
