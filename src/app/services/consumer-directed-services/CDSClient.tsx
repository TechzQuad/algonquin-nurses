"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { ServicePageLayout } from "@/components/ServicePageLayout";

const steps = [
  {
    step: "1",
    title: "Assessment",
    desc: "The Division of Senior and Disability Services (DSDS) completes an assessment and develops a personalized care plan.",
  },
  {
    step: "2",
    title: "Plan Forwarded",
    desc: "Your care plan is forwarded to Algonquin Nurses for coordination and implementation.",
  },
  {
    step: "3",
    title: "Hire Your Aide",
    desc: "We assist you in hiring an appropriate aide — this can be a friend or family member of your choosing.",
  },
  {
    step: "4",
    title: "Services Begin",
    desc: "Your chosen attendant begins providing care according to your personalized plan.",
  },
];

export function CDSClient() {
  return (
    <ServicePageLayout
      heroTitle="Consumer Directed Services"
      heroSubtitle="Direct Your Own Care"
      heroDescription="Hire a friend or family member as your attendant. We help you enroll in CDS so you can direct your own individual services and choices."
      heroImage="/images/cds-bug.jpg"
      introTitle="Take Control of Your Care"
      introText={[
        "Consumer Directed Services (CDS) allows you to direct your own individual services and choices. This program targets individuals with disabilities and seniors seeking independent living arrangements.",
        "Through CDS, you can recruit, hire, and manage your own caregiver attendants — including friends and family members. Algonquin Nurses handles the administrative support so you can focus on your care.",
      ]}
      services={[
        "Meal Preparation",
        "Medication Reminders",
        "Personal Care Assistance",
        "Light Household Tasks",
        "Laundry",
        "Transportation for Shopping & Errands",
      ]}
      servicesTitle="CDS Covered Services"
      faqs={[
        {
          question: "What is Consumer Directed Services (CDS)?",
          answer:
            "CDS is a program that allows eligible individuals to hire, manage, and direct their own in-home care attendants. This means you can choose a friend or family member to be your paid caregiver, giving you more control over your care.",
        },
        {
          question: "Who is eligible for CDS?",
          answer:
            "To qualify, you must receive or be eligible for Medicaid benefits, be at least 18 years old, have a physical disability, be able to recruit, hire, and manage your own caregiver attendants, and be pursuing independent living.",
        },
        {
          question: "Can I hire a family member as my attendant?",
          answer:
            "Yes! That's one of the key benefits of CDS. You can hire a friend or family member as your paid caregiver, as long as they pass a clean background check through the MO State Family Care Safety Registry.",
        },
        {
          question: "What is Algonquin Nurses' role in CDS?",
          answer:
            "We serve as your fiscal intermediary, handling payroll, taxes, insurance, and administrative tasks so you can focus on directing your care. We also help with onboarding your chosen attendant.",
        },
        {
          question: "How do I get started with CDS?",
          answer:
            "Contact us at (636) 274-1870 or visit our contact page. We'll guide you through the eligibility process and help you enroll in the CDS program.",
        },
      ]}
      ctaTitle="Start Directing Your Own Care"
      ctaDescription="Contact us to learn how Consumer Directed Services can give you or your loved one more control and independence."
    >
      {/* How it works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="The Process"
            title="How CDS Works"
            description="Getting started with Consumer Directed Services is straightforward."
          />
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-surface rounded-2xl p-7 border border-neutral-100"
              >
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Requirements"
            title="CDS Eligibility"
            description="To qualify for Consumer Directed Services, applicants must meet the following criteria."
          />
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 space-y-4">
            {[
              "Receive or be eligible for Medicaid benefits",
              "Be at least 18 years old",
              "Have a physical disability",
              "Be able to recruit, hire, and manage your own caregiver attendants",
              "Pursue independent living arrangements",
              "Be willing and able to self-direct care services",
            ].map((req, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-neutral-700">{req}</p>
              </div>
            ))}
            <p className="text-sm text-neutral-500 mt-4 pt-4 border-t border-neutral-100">
              Note: Attendants require a clean background check through the MO State Family Care Safety Registry.
            </p>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
