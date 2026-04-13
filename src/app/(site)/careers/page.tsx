import type { Metadata } from "next";
import { CareersPageClient } from "./CareersPageClient";

export const metadata: Metadata = {
  title: "Become a Caregiver",
  description:
    "Join Algonquin Nurses Home Health Care team. Now hiring caregivers, CNAs, and home health aides in St. Louis. Competitive pay and flexible schedules.",
};

export default function CareersPage() {
  return <CareersPageClient />;
}
