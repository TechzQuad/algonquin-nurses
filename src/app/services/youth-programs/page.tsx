import type { Metadata } from "next";
import { YouthProgramClient } from "./YouthProgramClient";

export const metadata: Metadata = {
  title: "Healthy Youth & Children Program (HCY)",
  description:
    "HCY Program providing medically necessary in-home services for MO HealthNet recipients from birth to age 21 in St. Louis. Algonquin Nurses since 1987.",
};

export default function YouthPrograms() {
  return <YouthProgramClient />;
}
