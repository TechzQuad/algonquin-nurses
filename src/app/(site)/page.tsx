import { HomePageClient } from "./HomePageClient";
import { getPayloadClient } from "@/lib/payload";
import type { TestimonialItem } from "@/components/Testimonials";

export const revalidate = 300;

type BlogPostPreview = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  coverImage?: { url?: string | null; alt?: string | null } | null;
};

async function getLatestPosts(): Promise<BlogPostPreview[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { publishedAt: { less_than_equal: new Date().toISOString() } },
      sort: "-publishedAt",
      limit: 3,
      depth: 1,
    });
    return docs as unknown as BlogPostPreview[];
  } catch {
    return [];
  }
}

async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "testimonials",
      where: { featured: { equals: true } },
      sort: "-updatedAt",
      limit: 6,
      depth: 0,
    });
    return (docs as Array<{ author: string; quote: string; location?: string | null }>).map(
      (d) => ({ name: d.author, text: d.quote, location: d.location ?? undefined }),
    );
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [posts, testimonials] = await Promise.all([getLatestPosts(), getTestimonials()]);
  return <HomePageClient posts={posts} testimonials={testimonials} />;
}
