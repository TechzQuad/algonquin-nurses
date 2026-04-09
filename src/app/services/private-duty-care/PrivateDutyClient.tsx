"use client";

import { ServicePageLayout } from "@/components/ServicePageLayout";

export function PrivateDutyClient() {
  return (
    <ServicePageLayout
      heroTitle="Private Duty Home Care"
      heroSubtitle="Personalized In-Home Care"
      heroDescription="Our caregivers are professional, compassionate and reliable. Our goal is to provide only the best individualized in-home care."
      heroImage="/images/private-duty-bug1.jpg"
      introTitle="Compassionate Private Duty Care in St. Louis"
      introText={[
        "Algonquin Nurses provides individualized in-home care for clients who need support beyond standard nursing services. We offer flexibility from hourly assistance to 24/7 care, tailored to your specific needs.",
        "We provide a free consultation with clients and family members to assess needs, evaluate home safety, and create a customized care plan. Our caregivers are screened, qualified, insured and bonded, passing multiple certifications and registered with the State of Missouri.",
        "Our companion services are available in homes, hospitals, independent living, assisted living, and skilled facilities. We also specialize in Alzheimer's care and hospice care support.",
      ]}
      services={[
        "Companionship",
        "Dressing & Grooming",
        "Mobility Assistance",
        "Medication Setup & Reminders",
        "Oral Hygiene",
        "Feeding Assistance & Fluid Intake",
        "Grocery Shopping",
        "Doctor Appointment Transportation",
        "Hair Services & Social Outings",
        "Meal Preparation & Cleanup",
        "Light Housekeeping & Laundry",
        "Bed Changes & Plant Care",
        "Alzheimer's Care",
        "Hospice Care Support",
        "Respite Services",
        "Religious Service Transportation",
      ]}
      servicesTitle="Private Duty Care Services"
      faqs={[
        {
          question: "What is private duty home care?",
          answer:
            "Private duty home care provides personalized, non-medical assistance in the comfort of your own home. Our caregivers help with daily activities including personal care, companionship, meal preparation, light housekeeping, and transportation.",
        },
        {
          question: "How do I know if my loved one needs private duty care?",
          answer:
            "If your loved one is having difficulty with daily activities such as bathing, dressing, cooking, cleaning, or managing medications, private duty care can help. We offer a free in-person consultation to assess needs and recommend the appropriate level of care.",
        },
        {
          question: "Are your caregivers screened and certified?",
          answer:
            "Yes. All our caregivers are screened, qualified, insured, and bonded. They pass multiple certifications and are registered with the State of Missouri. We ensure only the most professional and compassionate individuals join our team.",
        },
        {
          question: "Can I choose the hours of care?",
          answer:
            "Absolutely. We offer flexible scheduling from a few hours per day to 24/7 care. We work with you and your family to create a schedule that meets your specific needs, including weekends and holidays.",
        },
        {
          question: "Do you offer specialized care for Alzheimer's patients?",
          answer:
            "Yes, we specialize in Alzheimer's care and hospice care support. Our caregivers are trained to provide compassionate, patient-centered care for individuals with memory-related conditions.",
        },
      ]}
      ctaTitle="Schedule Your Free Consultation"
      ctaDescription="Let us assess your care needs and create a personalized plan for you or your loved one. Contact us today for a free, no-obligation consultation."
    />
  );
}
