import type { Metadata } from "next";
import { FeedbackPageClient } from "./FeedbackPageClient";

export const metadata: Metadata = {
  title: "Client Feedback",
  description:
    "Read what clients say about Algonquin Nurses Home Health Care. Share your feedback about our home health care services in St. Louis.",
};

export default function FeedbackPage() {
  return <FeedbackPageClient />;
}
