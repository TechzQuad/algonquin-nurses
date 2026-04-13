"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { SectionHeading } from "@/components/SectionHeading";

const coverageAreas = [
  "St. Louis County and City",
  "St. Charles County",
  "Lincoln County",
  "Warren County",
  "Jefferson County",
  "Franklin County",
];

export function MedicaidClient() {
  return (
    <ServicePageLayout
      heroTitle="Medicaid In-Home Care"
      heroSubtitle="MO-Health Net Services"
      heroDescription="We deliver Medicaid services throughout the St. Louis Metro area through Missouri's MO-Health Net program for low-income and vulnerable state residents."
      heroImage="/images/medicaid-in-home-bug.jpg"
      introTitle="Medicaid Home Care Services in St. Louis"
      introText={[
        "Algonquin Nurses delivers care through Missouri's MO-Health Net Medicaid program for low-income and vulnerable state residents. Our services are authorized by the Department of Health and Senior Services and the Division of Senior and Disability Services.",
        "We serve Medicaid Title 19 clients and participants in Medicaid Waiver and Specialty Programs, providing comprehensive in-home care that helps our clients maintain their independence and quality of life.",
      ]}
      services={[
        "Medicaid Title 19 Services",
        "Medicaid Waiver Programs",
        "Home & Community Based Services (HCBS)",
        "Consumer Directed Services (CDS)",
        "AIDS/HIV Waiver Services",
        "Healthy Child and Youth (HCY)",
        "VA Attendant & Home-Chore Program",
        "Personal Care Assistance",
        "Meal Preparation",
        "Light Housekeeping",
        "Medication Reminders",
        "Errands & Grocery Shopping",
      ]}
      servicesTitle="Medicaid Programs & Services"
      faqs={[
        {
          question: "Can my aide run errands for me?",
          answer:
            "Yes. Our nurses aides can run errands such as grocery shopping, picking up prescriptions from the pharmacy, and going to food establishments to pick up meals — provided these tasks are approved on your Medicaid care plan.",
        },
        {
          question: "Can my aide transport me to appointments?",
          answer:
            "Missouri regulations prohibit nurse aides from transporting clients. In-Home Services tasks must be performed in the home. However, private-pay transportation options may be available separately.",
        },
        {
          question: "Can an aide stay overnight at my home?",
          answer:
            "Missouri regulations prohibit aides from residing with clients. However, private-pay options for overnight care do exist. Contact us to discuss your specific needs.",
        },
        {
          question: "How many hours of service will I receive?",
          answer:
            "Service hours vary by individual based on calculated care points and your assessment results. For questions about your specific hours, contact the state at (866) 835-3505 or Algonquin Nurses at (636) 274-1870.",
        },
        {
          question: "What areas do you serve?",
          answer:
            "We serve St. Louis County and City, St. Charles County, Lincoln County, Warren County, Jefferson County, and Franklin County throughout the St. Louis metropolitan area.",
        },
      ]}
      ctaTitle="Learn About Medicaid Eligibility"
      ctaDescription="Contact us to find out if you or your loved one qualifies for Medicaid in-home care services. We'll guide you through the process."
    >
      {/* Coverage areas */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Coverage"
            title="Areas We Serve"
            description="Our Medicaid services cover the greater St. Louis metropolitan area."
          />
          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
            {coverageAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-surface rounded-xl p-4 flex items-center gap-3 border border-neutral-100"
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-800">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
