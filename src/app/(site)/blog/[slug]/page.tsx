import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight, Clock, Tag, ChevronRight } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayloadClient } from "@/lib/payload";
import { extractHeadings } from "@/lib/markdownToLexical";
import { CTASection } from "@/components/CTASection";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SocialShare } from "@/components/blog/SocialShare";

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
  ogTitle?: string | null;
  ogDescription?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
};

type CoverImage = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type Category = {
  id: string | number;
  name: string;
  slug: string;
  color?: string | null;
};

type PostDoc = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  status?: string | null;
  featured?: boolean | null;
  focusKeyphrase?: string | null;
  content?: unknown;
  coverImage?: CoverImage | string | number | null;
  categories?: (Category | string | number)[] | null;
  tags?: { tag: string }[] | null;
  seo?: SeoGroup | null;
};

// ── Data helpers ─────────────────────────────────────────────────────────────

async function getPost(slug: string): Promise<PostDoc | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { and: [{ slug: { equals: slug } }, { status: { equals: "published" } }] } as any,
    limit: 1,
    depth: 2,
  });
  return (docs[0] as unknown as PostDoc) ?? null;
}

async function getRelated(currentId: string | number, cats: string[]): Promise<PostDoc[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { and: [{ id: { not_equals: currentId } }, { status: { equals: "published" } }] } as any,
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
      where: { status: { equals: "published" } },
      limit: 200,
      depth: 0,
    });
    return docs.map((d) => ({ slug: (d as { slug: string }).slug }));
  } catch {
    return [];
  }
}

// ── Utilities ────────────────────────────────────────────────────────────────

function getCover(post: PostDoc): CoverImage | null {
  return typeof post.coverImage === "object" && post.coverImage !== null
    ? (post.coverImage as CoverImage)
    : null;
}

function getCategories(post: PostDoc): Category[] {
  if (!Array.isArray(post.categories)) return [];
  return post.categories.filter(
    (c): c is Category => typeof c === "object" && c !== null && "name" in c
  );
}

function plainText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: string; children?: unknown[] };
  if (typeof n.text === "string") return n.text;
  if (Array.isArray(n.children)) return n.children.map(plainText).join(" ");
  return "";
}

function wordCount(content: unknown): number {
  const root = (content as { root?: unknown })?.root;
  return plainText(root).trim().split(/\s+/).filter(Boolean).length;
}

function readingTime(content: unknown): number {
  return Math.max(1, Math.round(wordCount(content) / 220));
}

function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const BADGE_COLORS: Record<string, string> = {
  "home-care-tips": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "medicaid-benefits": "bg-blue-100 text-blue-700 border-blue-200",
  "veterans-care": "bg-red-100 text-red-700 border-red-200",
  "aging-in-place": "bg-amber-100 text-amber-700 border-amber-200",
  "caregiver-resources": "bg-purple-100 text-purple-700 border-purple-200",
  "company-news": "bg-neutral-100 text-neutral-600 border-neutral-200",
};
function catClass(slug: string) {
  return BADGE_COLORS[slug] ?? "bg-primary/10 text-primary border-primary/20";
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found", robots: { index: false, follow: false } };

  const cover = getCover(post);
  const seo = post.seo ?? {};
  const title = seo.metaTitle?.trim() || post.title;
  const description =
    seo.metaDescription?.trim() || post.excerpt?.trim() || undefined;
  const canonical = seo.canonicalUrl?.trim() || `${SITE_URL}/blog/${post.slug}`;
  const ogTitle = seo.ogTitle?.trim() || title;
  const ogDescription = seo.ogDescription?.trim() || description;
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
    alternates: { canonical },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    authors: [{ name: ORG_NAME, url: SITE_URL }],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "article",
      url: canonical,
      siteName: ORG_NAME,
      locale: "en_US",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? post.publishedAt ?? undefined,
      authors: [ORG_NAME],
      images: ogImage ? [ogImage] : undefined,
      tags: post.tags?.map((t) => t.tag) ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage.url] : undefined,
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cats = getCategories(post);
  const related = await getRelated(post.id, cats.map((c) => String(c.id)));
  const cover = getCover(post);
  const canonical = post.seo?.canonicalUrl?.trim() || `${SITE_URL}/blog/${post.slug}`;
  const description =
    post.seo?.metaDescription?.trim() || post.excerpt?.trim() || undefined;
  const minutes = readingTime(post.content);
  const wc = wordCount(post.content);
  const headings = extractHeadings(post.content);
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;

  // JSON-LD schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    image: cover?.url ? [cover.url] : undefined,
    keywords: post.seo?.keywords ?? post.tags?.map((t) => t.tag).join(", ") ?? undefined,
    wordCount: wc,
    timeRequired: `PT${minutes}M`,
    inLanguage: "en-US",
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: ORG_LOGO },
    },
    ...(cats.length > 0 && {
      articleSection: cats.map((c) => c.name).join(", "),
    }),
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

  // FAQ schema — extract from content if headings mention "faq" or "question"
  const hasFaqSection = headings.some((h) =>
    /faq|question|ask/i.test(h.text)
  );

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

      <article className="bg-white min-h-screen">
        {/* ── Post header ───────────────────────────────────────────────── */}
        <header className="pt-12 lg:pt-20 pb-10 bg-gradient-to-b from-neutral-50 to-white border-b border-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-xs text-neutral-400">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="w-3 h-3" />
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="w-3 h-3" />
                </li>
                <li
                  className="text-neutral-600 font-medium truncate max-w-[240px]"
                  aria-current="page"
                >
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-6 hover:gap-2.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>

            {/* Category badges */}
            {cats.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {cats.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.slug}`}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${catClass(cat.slug)} hover:opacity-80 transition-opacity`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-5">
              {post.title}
            </h1>

            {/* Excerpt / lead */}
            {post.excerpt && (
              <p className="text-xl text-neutral-600 leading-relaxed mb-6 max-w-2xl">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500">
              {post.publishedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {minutes} min read
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-neutral-400">{wc.toLocaleString()} words</span>
            </div>
          </div>
        </header>

        {/* ── Cover image ────────────────────────────────────────────────── */}
        {cover?.url && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
            <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={cover.url}
                alt={cover.alt || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              {cover.alt && <figcaption className="sr-only">{cover.alt}</figcaption>}
            </figure>
          </div>
        )}

        {/* ── Body: content + ToC sidebar ────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:gap-16">
            {/* Content */}
            <div>
              {/* Focus keyphrase (hidden, for internal reference) */}
              {post.focusKeyphrase && (
                <meta name="keywords" content={post.focusKeyphrase} />
              )}

              <div
                id="article-content"
                className="prose prose-lg prose-neutral max-w-none
                  prose-headings:font-bold prose-headings:text-neutral-900 prose-headings:scroll-mt-24
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-neutral-700 prose-p:leading-relaxed
                  prose-a:text-primary prose-a:font-medium hover:prose-a:underline
                  prose-strong:text-neutral-900
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                  prose-code:bg-neutral-100 prose-code:text-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-li:text-neutral-700
                  prose-img:rounded-xl prose-img:shadow-sm"
              >
                {post.content ? (
                  <RichText
                    data={post.content as Parameters<typeof RichText>[0]["data"]}
                  />
                ) : null}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(({ tag }) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 px-3 py-1 rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social sharing */}
              <div className="mt-10 pt-8 border-t border-neutral-100">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
                  Share this article
                </p>
                <SocialShare url={pageUrl} title={post.title} />
              </div>

              {/* Author box */}
              <div className="mt-10 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-lg">A</span>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">
                      Algonquin Nurses Editorial Team
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Expert home health care guidance for St. Louis families
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Sticky sidebar: Table of Contents ─────────────────────── */}
            {headings.length > 2 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* ── Related posts ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section
            className="py-16 lg:py-20 bg-neutral-50 border-t border-neutral-100"
            aria-label="Related articles"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-neutral-900">Keep reading</h2>
                <div className="flex-1 h-px bg-neutral-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => {
                  const rCover =
                    typeof r.coverImage === "object" && r.coverImage !== null
                      ? (r.coverImage as CoverImage)
                      : null;
                  return (
                    <Link
                      key={r.id}
                      href={`/blog/${r.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
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
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary-dark/25" />
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-xs text-neutral-400 mb-2">
                          {formatDate(r.publishedAt)}
                        </p>
                        <h3 className="font-bold text-neutral-900 mb-2 leading-snug group-hover:text-primary transition-colors text-sm">
                          {r.title}
                        </h3>
                        {r.excerpt && (
                          <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-4">
                            {r.excerpt}
                          </p>
                        )}
                        <span className="mt-auto inline-flex items-center gap-1 text-primary font-semibold text-xs">
                          Read article <ArrowRight className="w-3 h-3" />
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
        title="Questions About Home Care in St. Louis?"
        description="Our team is happy to walk you through your options and answer any questions about getting started."
      />
    </>
  );
}
