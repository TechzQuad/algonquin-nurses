import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";

export const revalidate = 300;

const SITE_URL = "https://algonquinnursesstl.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Home Health Care Blog & Resources | Algonquin Nurses",
  description:
    "Expert guidance for St. Louis families on home health care, Medicaid benefits, veterans programs, and aging-in-place strategies — from the Algonquin Nurses team.",
  keywords: [
    "home health care blog St. Louis",
    "Medicaid home care Missouri",
    "aging in place tips",
    "caregiver resources",
    "veterans home care",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Home Health Care Blog & Resources | Algonquin Nurses",
    description:
      "Expert guidance for families navigating home care, Medicaid, veterans benefits, and aging in place in St. Louis.",
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "Algonquin Nurses Home Health Care",
  },
  twitter: { card: "summary_large_image" },
};

// ── Types ────────────────────────────────────────────────────────────────────

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
  categories?: (Category | string | number)[] | null;
  tags?: { tag: string }[] | null;
  coverImage?: { url?: string | null; alt?: string | null } | string | number | null;
  content?: unknown;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(content: unknown): number {
  function getText(node: unknown): string {
    if (!node || typeof node !== "object") return "";
    const n = node as { text?: string; children?: unknown[] };
    if (typeof n.text === "string") return n.text;
    if (Array.isArray(n.children)) return n.children.map(getText).join(" ");
    return "";
  }
  const root = (content as { root?: unknown })?.root;
  const words = getText(root).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function getCover(post: PostDoc) {
  return typeof post.coverImage === "object" && post.coverImage !== null
    ? (post.coverImage as { url?: string | null; alt?: string | null })
    : null;
}

function getCategories(post: PostDoc): Category[] {
  if (!Array.isArray(post.categories)) return [];
  return post.categories.filter(
    (c): c is Category => typeof c === "object" && c !== null && "name" in c
  );
}

const BADGE_COLORS: Record<string, string> = {
  "home-care-tips": "bg-emerald-100 text-emerald-700",
  "medicaid-benefits": "bg-blue-100 text-blue-700",
  "veterans-care": "bg-red-100 text-red-700",
  "aging-in-place": "bg-amber-100 text-amber-700",
  "caregiver-resources": "bg-purple-100 text-purple-700",
  "company-news": "bg-neutral-100 text-neutral-600",
};

function categoryBadgeClass(slug: string) {
  return BADGE_COLORS[slug] ?? "bg-primary/10 text-primary";
}

// ── Page ─────────────────────────────────────────────────────────────────────

type SearchParams = Promise<{ category?: string }>;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = await searchParams;
  const payload = await getPayloadClient();

  // Fetch all categories for the filter tabs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { docs: allCategories } = await (payload as any).find({
    collection: "categories",
    limit: 20,
    depth: 0,
  });

  // Build query — always filter to published only
  let activeCategoryDoc: Category | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { status: { equals: "published" } };

  if (category) {
    const found = allCategories.find(
      (c: unknown) => (c as Category).slug === category
    ) as Category | undefined;
    if (found) {
      activeCategoryDoc = found;
      where["categories"] = { in: [found.id] };
    }
  }

  const { docs } = await payload.find({
    collection: "posts",
    where,
    sort: "-publishedAt",
    limit: 60,
    depth: 1,
  });

  const posts = docs as unknown as PostDoc[];

  // Separate featured post (first featured, or first post)
  const featuredPost = posts.find((p) => p.featured) ?? posts[0] ?? null;
  const gridPosts = featuredPost
    ? posts.filter((p) => p.id !== featuredPost.id)
    : posts;

  const categories = allCategories as unknown as Category[];

  // JSON-LD for the blog listing
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Algonquin Nurses — Home Health Care Blog",
    url: `${SITE_URL}/blog`,
    description: metadata.description,
    publisher: {
      "@type": "Organization",
      name: "Algonquin Nurses Home Health Care",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/algonquin-logo-top-300.png` },
    },
    blogPost: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt ?? undefined,
      description: p.excerpt ?? undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <Hero
        subtitle="Resources"
        title="Home Health Care Insights for St. Louis Families"
        description="Expert guidance on home care, Medicaid, veterans benefits, and aging in place — from the Algonquin Nurses team."
        imageSrc="/images/about.png"
        imageAlt="Home health care blog"
        imagePosition="center 30%"
        compact
        showCTA={false}
      />

      <div className="bg-white">
        {/* ── Category Filter ──────────────────────────────────────────── */}
        {categories.length > 0 && (
          <div className="border-b border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <nav
                aria-label="Filter by category"
                className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none"
              >
                <Link
                  href="/blog"
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    !category
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.slug}`}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      category === cat.slug
                        ? "bg-primary text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          {/* ── Active category heading ────────────────────────────────── */}
          {activeCategoryDoc && (
            <div className="mb-10">
              <p className="text-sm text-neutral-500 mb-1">Browsing category</p>
              <h1 className="text-3xl font-bold text-neutral-900">{activeCategoryDoc.name}</h1>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg mb-4">No articles yet in this category.</p>
              <Link
                href="/blog"
                className="text-primary font-semibold hover:underline text-sm"
              >
                View all articles
              </Link>
            </div>
          ) : (
            <>
              {/* ── Featured post ──────────────────────────────────────── */}
              {featuredPost && !category && (
                <article className="group mb-14" aria-label="Featured article">
                  <Link href={`/blog/${featuredPost.slug}`} className="block">
                    <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-xl transition-shadow">
                      {/* Image */}
                      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] bg-neutral-100 overflow-hidden">
                        {getCover(featuredPost)?.url ? (
                          <Image
                            src={getCover(featuredPost)!.url!}
                            alt={getCover(featuredPost)!.alt || featuredPost.title}
                            fill
                            priority
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary-dark/50" />
                        )}
                        <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                          Featured
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-10 flex flex-col justify-center bg-white">
                        {getCategories(featuredPost).length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {getCategories(featuredPost).map((cat) => (
                              <span
                                key={cat.id}
                                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryBadgeClass(cat.slug)}`}
                              >
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 leading-snug mb-4 group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                        {featuredPost.excerpt && (
                          <p className="text-neutral-600 leading-relaxed mb-6 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-400 mb-6">
                          {featuredPost.publishedAt && (
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <time dateTime={featuredPost.publishedAt}>
                                {formatDate(featuredPost.publishedAt)}
                              </time>
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime(featuredPost.content)} min read
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                          Read article <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              {/* ── Section label ──────────────────────────────────────── */}
              {gridPosts.length > 0 && (
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-lg font-bold text-neutral-900">
                    {category ? "Articles" : "Latest Articles"}
                  </h2>
                  <div className="flex-1 h-px bg-neutral-100" />
                  <span className="text-sm text-neutral-400">
                    {gridPosts.length} article{gridPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}

              {/* ── Post grid ──────────────────────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {gridPosts.map((post) => {
                  const cover = getCover(post);
                  const cats = getCategories(post);
                  const mins = readingTime(post.content);

                  return (
                    <article
                      key={post.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
                    >
                      {/* Card image */}
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                          {cover?.url ? (
                            <Image
                              src={cover.url}
                              alt={cover.alt || post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary-dark/25" />
                          )}
                          {cats.length > 0 && (
                            <span
                              className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryBadgeClass(cats[0].slug)}`}
                            >
                              {cats[0].name}
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Card body */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                          {post.publishedAt && (
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                              </time>
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {mins} min
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>

                        {post.excerpt && (
                          <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {post.tags.slice(0, 3).map(({ tag }) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 text-xs text-neutral-400 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-full"
                              >
                                <Tag className="w-2.5 h-2.5" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-auto inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
                          aria-label={`Read article: ${post.title}`}
                        >
                          Read article <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <CTASection
        title="Have a Question About Home Care?"
        description="Our team is here to help you understand your options and find the right fit for your family."
      />
    </>
  );
}
