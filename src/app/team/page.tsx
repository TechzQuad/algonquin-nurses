import type { Metadata } from "next";
import { TeamPageClient } from "./TeamPageClient";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership team at Algonquin Nurses Home Health Care. Family-owned and operated in St. Louis since 1987.",
};

export default function TeamPage() {
  return <TeamPageClient />;
}
