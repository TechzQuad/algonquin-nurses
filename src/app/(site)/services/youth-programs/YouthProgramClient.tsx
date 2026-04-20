"use client";

import { ServicePageLayout } from "@/components/ServicePageLayout";

export function YouthProgramClient() {
  return (
    <ServicePageLayout
      heroTitle="Healthy Youth & Children Program"
      heroSubtitle="HCY Program"
      heroDescription="Providing service coordination and authorization for medically necessary in-home services for MO HealthNet recipients with special healthcare needs from birth to age 21."
      heroImage="/images/childrens-programs-stl.jpg"
      introTitle="Specialized Care for Children with Special Needs"
      introText={[
        "The HCY Program provides service coordination and authorization for medically necessary in-home services for MO HealthNet recipients with special healthcare needs from birth to age 21.",
        "Algonquin Nurses Home Health Care is licensed by Missouri's Department of Health and Senior Services to manage and provide these authorized services, ensuring your child receives the highest quality care in the comfort of your home.",
      ]}
      services={[
        "Private Duty Nursing",
        "Advanced Personal Care",
        "Personal Care Aide Services",
        "Authorized Registered Nurse Visits",
        "Administrative Case Management",
        "Service Coordination",
        "Evaluation & Needs Assessment",
        "Care Plan Development",
        "Transition Planning",
        "Resource Identification & Referral",
        "Family Support Services",
        "Medical Home Establishment",
      ]}
      servicesTitle="HCY Program Services"
      faqs={[
        {
          question: "Who is eligible for the HCY Program?",
          answer:
            "Participants must be Missouri residents, from birth to 21 years of age, require medically necessary services, and be enrolled in MO HealthNet coverage.",
        },
        {
          question: "What types of nursing care are available?",
          answer:
            "Just call 636-274-1870 to get started. We provide private duty nursing, skilled nurse visits, authorized RN visits, advanced personal care, and personal care aide services — all tailored to your child's specific medical needs.",
        },
        {
          question: "How does service coordination work?",
          answer:
            "Our service coordinators evaluate your child's needs, identify appropriate service providers, develop and implement care plans, plan transitions, identify resources, and provide family support services.",
        },
        {
          question: "How do I apply for the HCY Program?",
          answer:
            "Contact us at (636) 274-1870 or visit our contact page. We'll help determine your child's eligibility and guide you through the enrollment process with MO HealthNet.",
        },
      ]}
      ctaTitle="Get Help for Your Child"
      ctaDescription="Contact us today to learn how the HCY Program can provide the specialized in-home care your child needs."
    />
  );
}
