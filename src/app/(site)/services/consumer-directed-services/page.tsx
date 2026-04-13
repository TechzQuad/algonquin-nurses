import type { Metadata } from "next";
import { CDSClient } from "./CDSClient";

export const metadata: Metadata = {
  title: "Consumer Directed Services (CDS)",
  description:
    "Consumer Directed Services in St. Louis. Hire a friend or family member as your caregiver attendant through Missouri's CDS program. Algonquin Nurses since 1987.",
};

export default function ConsumerDirectedServices() {
  return <CDSClient />;
}
