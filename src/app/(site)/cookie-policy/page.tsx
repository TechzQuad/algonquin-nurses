import type { Metadata } from "next";
import { CookiePolicyClient } from "./CookiePolicyClient";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Algonquin Nurses Home Health Care I, LLC. Learn how we use cookies and how to manage your preferences.",
};

export default function CookiePolicyPage() {
  return <CookiePolicyClient />;
}
