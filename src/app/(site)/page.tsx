import { HomePageClient } from "./HomePageClient";
import { getPayloadClient } from "@/lib/payload";

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

export default async function HomePage() {
  const posts = await getLatestPosts();
  return <HomePageClient posts={posts} />;
}
