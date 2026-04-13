import type { Metadata } from "next";
import { VeteransCareClient } from "./VeteransCareClient";

export const metadata: Metadata = {
  title: "Private Duty Services for Veterans",
  description:
    "Home care services for veterans in St. Louis. Nursing care, personal assistance, companionship, and more for eligible veterans. Algonquin Nurses since 1987.",
};

export default function VeteransCare() {
  return <VeteransCareClient />;
}
