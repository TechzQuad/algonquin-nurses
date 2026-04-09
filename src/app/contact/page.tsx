import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Algonquin Nurses Home Health Care. Three St. Louis locations: St. Louis, House Springs, and O'Fallon. Call (314) 822-8158 for a free consultation.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
