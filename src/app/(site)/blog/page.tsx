import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Home Health Care Blog & Resources",
  description:
    "Guidance, tips, and resources for families navigating home health care in St. Louis — from Medicaid and veterans benefits to aging-in-place strategies.",
  openGraph: {
    title: "Home Health Care Blog & Resources | Algonquin Nurses",
    description:
      "Practical guidance for families navigating home health care, Medicaid, veterans benefits, and aging in place.",
    type: "website",
  },
  alternates: { canonical: "/blog" },
};

type PostDoc = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  coverImage?: { url?: string | null; alt?: string | null } | string | number | null;
};

function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { publishedAt: { less_than_equal: new Date().toISOString() } },
    sort: "-publishedAt",
    limit: 50,
    depth: 1,
  });

  const posts = docs as unknown as PostDoc[];

  return (
    <>
      <Hero
        subtitle="Resources"
        title="Home Health Care Insights for St. Louis Families"
        description="Practical guidance on home care, Medicaid, veterans benefits, and aging in place from our team of experienced professionals."
        imageSrc="/images/about.png"
        imageAlt="Home health care blog"
        imagePosition="center 30%"
        compact
        showCTA={false}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Latest Articles"
            title="Guidance from the Algonquin Nurses Team"
            description="Stay informed about the services, benefits, and decisions that matter most for your family."
          />

          {posts.length === 0 ? (
            <p className="text-center text-neutral-500 py-10">
              New articles are on the way. Please check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const cover = typeof post.coverImage === "object" && post.coverImage !== null
                  ? post.coverImage
                  : null;
                return (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow flex flex-col"
                  >
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
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/30" />
                        )}
                      </div>
                    </Link>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={post.publishedAt ?? undefined}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      <h2 className="text-xl font-bold text-neutral-900 mb-3 leading-snug">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt && (
                        <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-auto inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2 transition-all"
                      >
                        Read more <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Have a Question About Care?"
        description="Our team is here to help you understand your options and find the right fit for your family."
      />
    </>
  );
}
