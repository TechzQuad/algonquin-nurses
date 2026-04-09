import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Algonquin Nurses Home Health Care, serving St. Louis since 1987. Family-owned, trusted, and committed to quality in-home care services.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
