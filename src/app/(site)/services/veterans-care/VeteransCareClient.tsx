"use client";

import { motion } from "framer-motion";
import { Medal, Shield, DollarSign } from "lucide-react";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { SectionHeading } from "@/components/SectionHeading";

const eligibility = [
  {
    icon: Medal,
    title: "Military",
    items: [
      "Veterans or surviving spouses with 90+ days active duty",
      "At least one day of service during wartime",
      "Honorable or general discharge",
      "Persian Gulf veterans require two years of service",
    ],
  },
  {
    icon: Shield,
    title: "Medical",
    items: [
      "Non-service-connected condition requiring assistance",
      "Need help with activities of daily living",
      "Medical documentation of care needs",
    ],
  },
  {
    icon: DollarSign,
    title: "Financial",
    items: [
      "Net worth at or below $130,773",
      "Primary residence and vehicle excluded",
      "Medical expenses may reduce countable income",
    ],
  },
];

export function VeteransCareClient() {
  return (
    <ServicePageLayout
      heroTitle="Private Duty Services for Veterans"
      heroSubtitle="Honoring Those Who Served"
      heroDescription="We are proud to serve veterans and their families by providing support services in the comfort of their own homes. Our mission is to help veterans with a successful recovery."
      heroImage="/images/disabled-veteran-wheelchair-home-are.jpg"
      introTitle="Supporting Our Veterans at Home"
      introText={[
        "Algonquin Nurses is proud to serve veterans and their families by providing support services in the comfort of their own homes. Our mission is to help veterans with a successful recovery, which includes avoiding unnecessary trips to the hospital.",
        "We partner with John Cochran Hospital, Truman Hospital, and Veterans Home Care to ensure our veteran clients receive the comprehensive support they deserve.",
      ]}
      services={[
        "Nursing Care (RN, LPN, CNA)",
        "Personal Assistance (Bathing, Dressing, Ambulation)",
        "Medication Management & Reminders",
        "Companionship Support",
        "Transportation Services",
        "Shopping & Errands",
        "Housekeeping",
        "Meal Preparation",
      ]}
      servicesTitle="Veterans Care Services"
      faqs={[
        {
          question: "What are the basic eligibility requirements?",
          answer:
            "Veterans must meet three criteria known as 'The 3-Ms': Military service (90+ days active duty with wartime service), Medical need (non-service-connected condition requiring daily living assistance), and Money (net worth at or below $130,773).",
        },
        {
          question: "Does this cover surviving spouses?",
          answer:
            "Yes. Surviving spouses of eligible veterans may also qualify for these home care benefits.",
        },
        {
          question: "What organizations do you partner with?",
          answer:
            "We work closely with John Cochran Hospital, Truman Hospital, and Veterans Home Care to provide comprehensive support services for our veteran clients.",
        },
        {
          question: "How do I get started?",
          answer:
            "Contact us at (636) 274-1870 or visit our contact page. We'll help determine your eligibility and guide you through the process of receiving home care services.",
        },
      ]}
      ctaTitle="We're Here for Our Veterans"
      ctaDescription="Contact us today to learn how we can help you or your loved one receive the care and support earned through service."
    >
      {/* Eligibility - The 3 Ms */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Eligibility"
            title='The 3-Ms of Eligibility'
            description="Veterans must meet three key criteria to qualify for home care services."
          />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {eligibility.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-surface rounded-2xl p-7 border border-neutral-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{item.title}</h3>
                <ul className="space-y-3">
                  {item.items.map((req, i) => (
                    <li key={i} className="flex gap-2 text-sm text-neutral-600">
                      <span className="text-accent mt-1">&#8226;</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
