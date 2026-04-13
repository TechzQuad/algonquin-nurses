/* eslint-disable no-console */
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

type ServiceSeed = {
  slug: string;
  title: string;
  shortDescription: string;
  features: { title: string; description?: string }[];
  order: number;
};

const services: ServiceSeed[] = [
  {
    slug: "private-duty-care",
    title: "Private Duty Home Care",
    shortDescription:
      "Personalized in-home caregiving — companionship, personal care, meal prep, housekeeping, and transportation — from a few hours a day to 24/7.",
    order: 1,
    features: [
      { title: "Companionship" },
      { title: "Dressing & Grooming" },
      { title: "Mobility Assistance" },
      { title: "Medication Setup & Reminders" },
      { title: "Meal Preparation & Light Housekeeping" },
      { title: "Alzheimer's & Hospice Care Support" },
    ],
  },
  {
    slug: "medicaid-in-home-care",
    title: "Medicaid In-Home Care",
    shortDescription:
      "Care delivered throughout the St. Louis Metro area through Missouri's MO HealthNet program for low-income and vulnerable residents.",
    order: 2,
    features: [
      { title: "Medicaid Title 19 Services" },
      { title: "Medicaid Waiver Programs" },
      { title: "Home & Community Based Services (HCBS)" },
      { title: "AIDS/HIV Waiver Services" },
      { title: "Personal Care, Meal Prep & Light Housekeeping" },
    ],
  },
  {
    slug: "consumer-directed-services",
    title: "Consumer Directed Services (CDS)",
    shortDescription:
      "Hire a friend or family member as your attendant. We help you enroll in CDS so you can direct your own care and choose who provides it.",
    order: 3,
    features: [
      { title: "Hire Family or Friends as Paid Caregivers" },
      { title: "Personal Care Assistance" },
      { title: "Meal Preparation & Medication Reminders" },
      { title: "Light Household Tasks & Laundry" },
      { title: "Transportation for Shopping & Errands" },
    ],
  },
  {
    slug: "veterans-care",
    title: "Private Duty Services for Veterans",
    shortDescription:
      "Home support for veterans and their families — partnered with John Cochran Hospital, Truman Hospital, and Veterans Home Care.",
    order: 4,
    features: [
      { title: "Nursing Care (RN, LPN, CNA)" },
      { title: "Personal Assistance & Companionship" },
      { title: "Medication Management" },
      { title: "Transportation & Errands" },
      { title: "Meal Preparation & Housekeeping" },
    ],
  },
  {
    slug: "youth-programs",
    title: "Healthy Youth & Children Program (HCY)",
    shortDescription:
      "Service coordination and authorized in-home services for MO HealthNet recipients with special healthcare needs from birth to age 21.",
    order: 5,
    features: [
      { title: "Private Duty Nursing" },
      { title: "Advanced Personal Care" },
      { title: "Skilled Nurse Visits" },
      { title: "Service Coordination & Care Planning" },
      { title: "Family Support Services" },
    ],
  },
];

type TestimonialSeed = {
  author: string;
  location?: string;
  quote: string;
  rating: number;
  featured: boolean;
};

const testimonials: TestimonialSeed[] = [
  {
    author: "Geraldine C.",
    quote:
      "If it were not for my Aide at Algonquin Nurses I would not be able to move into a newly remodeled apartment.",
    rating: 5,
    featured: true,
  },
  {
    author: "Dorothy B.",
    quote:
      "I love that I can trust my aide. She is not only my helper, but my companion. I love to sew and she helps me with that.",
    rating: 5,
    featured: true,
  },
  {
    author: "Linda C.",
    quote:
      "The office is courteous and timely response to calls. Everyone is so helpful! It is such a relief to me, as her mother, to know I can call on Algonquin Nurses.",
    rating: 5,
    featured: true,
  },
  {
    author: "Earlena S.",
    quote: "Our two aides are my angels. Thank you for all your help.",
    rating: 5,
    featured: true,
  },
];

type TeamSeed = {
  name: string;
  role: string;
  bio?: string;
  order: number;
};

const team: TeamSeed[] = [
  {
    name: "Steve Tamboli",
    role: "Founder & President",
    bio: "Steve founded Algonquin Nurses in 1987 with a commitment to deliver compassionate, personalized home care to families across the St. Louis region.",
    order: 1,
  },
  {
    name: "Mark Tamboli",
    role: "Director of Operations",
    bio: "Mark leads day-to-day operations, working closely with families and caregivers to ensure every client receives consistent, high-quality care.",
    order: 2,
  },
];

async function upsertBySlug<T extends { slug: string }>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "services",
  seeds: T[],
) {
  for (const s of seeds) {
    const existing = await payload.find({
      collection,
      where: { slug: { equals: s.slug } },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({
        collection,
        id: (existing.docs[0] as { id: string | number }).id,
        data: s as Parameters<typeof payload.update>[0]["data"],
      });
      console.log(`Updated ${collection}: ${s.slug}`);
    } else {
      await payload.create({
        collection,
        data: s as Parameters<typeof payload.create>[0]["data"],
      });
      console.log(`Created ${collection}: ${s.slug}`);
    }
  }
}

async function upsertByField<T extends Record<string, unknown>>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "testimonials" | "team",
  field: string,
  seeds: T[],
) {
  for (const s of seeds) {
    const value = s[field];
    const existing = await payload.find({
      collection,
      where: { [field]: { equals: value } },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({
        collection,
        id: (existing.docs[0] as { id: string | number }).id,
        data: s as Parameters<typeof payload.update>[0]["data"],
      });
      console.log(`Updated ${collection}: ${String(value)}`);
    } else {
      await payload.create({
        collection,
        data: s as Parameters<typeof payload.create>[0]["data"],
      });
      console.log(`Created ${collection}: ${String(value)}`);
    }
  }
}

async function main() {
  const payload = await getPayload({ config: await config });
  await upsertBySlug(payload, "services", services);
  await upsertByField(payload, "testimonials", "author", testimonials);
  await upsertByField(payload, "team", "name", team);
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
