import type { Metadata } from "next";
import { FeedbackPageClient } from "./FeedbackPageClient";
import { getPayloadClient } from "@/lib/payload";
import type { TestimonialItem } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Client Feedback",
  description:
    "Read what clients say about Algonquin Nurses Home Health Care. Share your feedback about our home health care services in St. Louis.",
};

export const revalidate = 300;

async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "testimonials",
      sort: "-updatedAt",
      limit: 20,
      depth: 0,
    });
    return (docs as Array<{ author: string; quote: string; location?: string | null }>).map(
      (d) => ({ name: d.author, text: d.quote, location: d.location ?? undefined }),
    );
  } catch {
    return [];
  }
}

export default async function FeedbackPage() {
  const testimonials = await getTestimonials();
  return <FeedbackPageClient testimonials={testimonials} />;
}
