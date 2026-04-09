import type { Metadata } from "next";
import { MedicaidClient } from "./MedicaidClient";

export const metadata: Metadata = {
  title: "Medicaid In-Home Care",
  description:
    "Medicaid in-home care services throughout St. Louis Metro. MO-Health Net, Title 19, HCBS, CDS, HIV/AIDS Waiver, and VA programs. Algonquin Nurses since 1987.",
};

export default function MedicaidInHomeCare() {
  return <MedicaidClient />;
}
