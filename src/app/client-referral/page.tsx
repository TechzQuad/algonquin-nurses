import type { Metadata } from "next";
import { ClientReferralPageClient } from "./ClientReferralPageClient";

export const metadata: Metadata = {
  title: "Client Referral",
  description:
    "Refer a client to Algonquin Nurses Home Health Care. Help someone you know get quality in-home care services in St. Louis.",
};

export default function ClientReferralPage() {
  return <ClientReferralPageClient />;
}
