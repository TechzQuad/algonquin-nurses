import type { Metadata } from "next";
import { PrivateDutyClient } from "./PrivateDutyClient";

export const metadata: Metadata = {
  title: "Private Duty Home Care",
  description:
    "Professional private duty home care in St. Louis. Personalized in-home caregivers for companionship, personal care, meal prep, transportation, and more. Since 1987.",
};

export default function PrivateDutyCare() {
  return <PrivateDutyClient />;
}
