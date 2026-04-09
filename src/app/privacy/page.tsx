import type { Metadata } from "next";
import { PrivacyPageClient } from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Algonquin Nurses Home Health Care I, LLC. Learn how we collect, use, and protect your personal and health information.",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
