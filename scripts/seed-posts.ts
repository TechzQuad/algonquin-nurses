/* eslint-disable no-console */
import path from "node:path";
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

const rootBase = {
  type: "root",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr" as const,
};

function textNode(text: string, format = 0) {
  return {
    type: "text",
    detail: 0,
    format,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

function paragraph(text: string) {
  return {
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    textFormat: 0,
    textStyle: "",
    children: [textNode(text)],
  };
}

function heading(text: string, tag: "h2" | "h3" = "h2") {
  return {
    type: "heading",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    tag,
    children: [textNode(text)],
  };
}

function bulletList(items: string[]) {
  return {
    type: "list",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    listType: "bullet",
    start: 1,
    tag: "ul",
    children: items.map((text, i) => ({
      type: "listitem",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      value: i + 1,
      children: [textNode(text)],
    })),
  };
}

function toLexical(blocks: Block[]) {
  const children = blocks.map((b) => {
    if (b.type === "h2") return heading(b.text, "h2");
    if (b.type === "h3") return heading(b.text, "h3");
    if (b.type === "p") return paragraph(b.text);
    return bulletList(b.items);
  });
  return { root: { ...rootBase, children } };
}

type PostSeed = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAtDaysAgo: number;
  content: Block[];
  image: { file: string; alt: string };
};

const posts: PostSeed[] = [
  {
    slug: "aging-in-place-how-home-health-care-makes-it-possible",
    title: "Aging in Place: How Home Health Care Makes It Possible",
    excerpt:
      "Most older adults want to stay in their own homes as they age. Learn how professional home health care turns that wish into a realistic, safe plan.",
    publishedAtDaysAgo: 2,
    image: {
      file: "aging-in-place.jpg",
      alt: "Caregiver supporting an elderly couple at home",
    },
    content: [
      {
        type: "p",
        text: "Nearly nine out of ten older adults say they want to remain in their own homes as they grow older. It is where memories live, routines feel familiar, and independence feels natural. The good news is that with the right support, aging in place is not just a wish — it is a practical, affordable plan.",
      },
      { type: "h2", text: "What does aging in place actually mean?" },
      {
        type: "p",
        text: "Aging in place describes the ability to live safely, independently, and comfortably in your own home regardless of age, income, or ability level. For most families, it means building a circle of support around a loved one so they can keep doing what they love in the place they love.",
      },
      { type: "h2", text: "How home health care makes it possible" },
      {
        type: "p",
        text: "Professional home health care fills the gap between complete independence and moving into a facility. A trained caregiver can help with the small things that become difficult — bathing, meal preparation, medication reminders — long before those small things turn into serious risks.",
      },
      {
        type: "ul",
        items: [
          "Personal care: bathing, grooming, dressing, and toileting.",
          "Medication reminders and help organizing prescriptions.",
          "Meal preparation and nutrition support.",
          "Light housekeeping, laundry, and home safety checks.",
          "Transportation to appointments, errands, and social visits.",
          "Companionship that combats isolation and improves mood.",
        ],
      },
      { type: "h2", text: "Why aging at home is often the healthier choice" },
      {
        type: "p",
        text: "Study after study has shown that seniors who age in place tend to stay more active, experience fewer hospitalizations, and report higher satisfaction with life. Staying in a familiar environment reduces confusion for people living with dementia and makes it easier for family members to remain involved in day-to-day care decisions.",
      },
      { type: "h2", text: "Getting started" },
      {
        type: "p",
        text: "The first step is an honest conversation with your loved one about what is working and what is not. From there, a home care consultation helps map out which hours, services, and caregivers will make the biggest difference. Algonquin Nurses has been guiding St. Louis families through that process since 1987 — call us and we will walk you through it.",
      },
    ],
  },
  {
    slug: "understanding-medicaid-in-home-care-missouri",
    title: "Understanding Medicaid In-Home Care in Missouri",
    excerpt:
      "Missouri's MO HealthNet covers in-home services for eligible seniors and adults with disabilities. Here is how the program works and how to apply.",
    publishedAtDaysAgo: 9,
    image: {
      file: "medicaid-missouri.jpg",
      alt: "Hand filling out application paperwork on a desk",
    },
    content: [
      {
        type: "p",
        text: "Missouri's MO HealthNet program helps thousands of residents receive care in the comfort of their own homes instead of moving into a nursing facility. If you or a loved one is struggling with daily activities and the cost of private care is a concern, Medicaid In-Home Care may be the answer.",
      },
      { type: "h2", text: "Who qualifies?" },
      {
        type: "p",
        text: "Eligibility is based on both financial and functional need. In general, applicants must meet Missouri's Medicaid income and asset limits, and a state assessor must determine that the person needs help with daily activities such as bathing, dressing, or mobility.",
      },
      {
        type: "ul",
        items: [
          "Missouri residency and U.S. citizenship or qualifying immigration status.",
          "Income and assets within MO HealthNet limits (an elder-law specialist can help you plan).",
          "A care-points assessment showing the person needs help with activities of daily living.",
          "A physician's recommendation for in-home rather than facility-based care.",
        ],
      },
      { type: "h2", text: "What services are covered?" },
      {
        type: "p",
        text: "MO HealthNet In-Home Services cover personal care, homemaker chores, and assistance with activities of daily living. A calculated care plan determines how many hours of help each person receives per week.",
      },
      {
        type: "ul",
        items: [
          "Personal care: bathing, grooming, dressing, toileting.",
          "Meal preparation and grocery shopping.",
          "Light housekeeping and laundry.",
          "Medication reminders and accompanying to appointments.",
        ],
      },
      { type: "h2", text: "How to apply" },
      {
        type: "p",
        text: "You can apply for MO HealthNet online at mydss.mo.gov or through your local Family Support Division office. Once approved, you will be assigned a case manager who schedules the in-home assessment and issues the service authorization. From there, you choose an enrolled provider like Algonquin Nurses to deliver the care.",
      },
      { type: "h2", text: "Common questions" },
      {
        type: "h3",
        text: "How many hours of care will my loved one receive?",
      },
      {
        type: "p",
        text: "Hours vary based on the assessment. Some recipients receive a few hours per week; others receive daily visits. If you have questions about your specific allotment, the state line is (866) 835-3505, and our team at Algonquin Nurses is always glad to help interpret the results.",
      },
      {
        type: "h3",
        text: "What if my needs change over time?",
      },
      {
        type: "p",
        text: "Care plans are reassessed regularly. If a person's needs increase — for example, after a hospital stay — the case manager can request a reassessment and additional hours.",
      },
      { type: "h2", text: "Next steps" },
      {
        type: "p",
        text: "Navigating Medicaid can feel overwhelming. Our team has walked thousands of St. Louis families through the application and approval process. Reach out for a free consultation and we will help you understand what to expect.",
      },
    ],
  },
  {
    slug: "consumer-directed-services-cds-hire-family-caregiver",
    title: "Consumer Directed Services (CDS): How to Hire a Family Member as Caregiver",
    excerpt:
      "Missouri's CDS program lets eligible adults choose their own paid caregiver — even a spouse, adult child, neighbor, or friend. Here is how it works.",
    publishedAtDaysAgo: 17,
    image: {
      file: "consumer-directed-services.jpg",
      alt: "Family caregiver holding hands with an elderly loved one",
    },
    content: [
      {
        type: "p",
        text: "If you are a Missouri resident with a disability, Consumer Directed Services (CDS) gives you something no other program does: the right to choose, train, and supervise your own paid caregiver — including a family member or friend you already trust.",
      },
      { type: "h2", text: "What is CDS?" },
      {
        type: "p",
        text: "Consumer Directed Services is a Medicaid waiver program operated by the Missouri Department of Health and Senior Services. Rather than sending in a caregiver the agency selects, CDS lets you act as the employer. You pick the person, set the schedule, and direct the care.",
      },
      { type: "h2", text: "Who can be your CDS caregiver?" },
      {
        type: "p",
        text: "Most adults in your life are eligible — an adult child, a neighbor, a close friend, a retired nurse from your church, or almost anyone else. Missouri does restrict a few relationships (for example, a spouse typically cannot serve as a paid CDS attendant), but the program is intentionally flexible.",
      },
      {
        type: "ul",
        items: [
          "You must be a Missouri resident at least 18 years old.",
          "You must have a physical disability and qualify for MO HealthNet.",
          "You must be able to direct your own care (or have a designated representative).",
          "Your chosen caregiver must pass a background check and complete training.",
        ],
      },
      { type: "h2", text: "Why families love CDS" },
      {
        type: "p",
        text: "Being cared for by someone you already know and trust is a powerful thing. Routine, dignity, and emotional safety all improve when care comes from a familiar face. CDS also allows a working family member to be compensated fairly for the care they are already providing — turning an unpaid labor of love into a sustainable arrangement.",
      },
      { type: "h2", text: "How Algonquin Nurses supports CDS participants" },
      {
        type: "p",
        text: "We act as your CDS vendor, which means we handle the administrative work so you can focus on care. That includes payroll, taxes, compliance with Missouri regulations, training and certification for your attendant, and ongoing support whenever questions arise.",
      },
      { type: "h2", text: "Getting started" },
      {
        type: "p",
        text: "Start by confirming MO HealthNet eligibility, then contact our CDS team. We will walk you through the paperwork, help your chosen caregiver complete the required training, and schedule their first shift — often within a few weeks of your first call.",
      },
    ],
  },
  {
    slug: "signs-aging-parent-needs-home-health-care",
    title: "10 Signs Your Aging Parent May Need Home Health Care",
    excerpt:
      "The changes that signal a loved one needs support are often small and easy to miss. Here are the ten signs families should not ignore.",
    publishedAtDaysAgo: 24,
    image: {
      file: "signs-aging-parent.jpg",
      alt: "Adult daughter having a heartfelt conversation with her senior mother at home",
    },
    content: [
      {
        type: "p",
        text: "One of the hardest parts of caring for an aging parent is knowing when it is time to bring in help. The signs rarely arrive in dramatic fashion — more often they whisper. Here are ten of the most common quiet signals that a loved one could benefit from home health care.",
      },
      { type: "h2", text: "Look for these changes" },
      {
        type: "ul",
        items: [
          "1. Unexplained weight loss or an empty refrigerator.",
          "2. Missed or mismanaged medications on the counter or in pillboxes.",
          "3. A noticeable decline in personal hygiene or wearing the same clothes for days.",
          "4. Stacks of unopened mail or unpaid bills piling up.",
          "5. Unusual bruises, bumps, or scrapes that suggest falls.",
          "6. Forgetfulness that is new — missed appointments, repeating questions.",
          "7. Increased social withdrawal or mood changes.",
          "8. The home becoming cluttered, unclean, or unsafe when it never was.",
          "9. Difficulty with stairs, showers, or getting up from chairs.",
          "10. Caregiver burnout in the family member who has been holding everything together.",
        ],
      },
      { type: "h2", text: "Why these signs matter" },
      {
        type: "p",
        text: "Small declines are often the first warning that a larger health event is on the way. A fall that breaks a hip, a missed medication that triggers a cardiac event, a burn from a forgotten stovetop — each one begins as something small and easy to overlook.",
      },
      { type: "h2", text: "Having the conversation" },
      {
        type: "p",
        text: "Raising the subject of help is delicate. Lead with love, not logistics. Talk about what you have noticed without sounding accusatory, and frame home care as something that supports their independence, not something that replaces it.",
      },
      { type: "h2", text: "You do not have to figure this out alone" },
      {
        type: "p",
        text: "Our team has helped thousands of St. Louis families navigate this decision. A free consultation can give you clarity on what kind of care is needed, what it costs, and how Medicaid or VA benefits might help pay for it.",
      },
    ],
  },
  {
    slug: "home-care-for-veterans-benefits-and-how-to-access-them",
    title: "Home Care for Veterans: Benefits and How to Access Them",
    excerpt:
      "Veterans have earned access to home care benefits that most families do not know exist. Here is a plain-language guide to what is available and how to apply.",
    publishedAtDaysAgo: 31,
    image: {
      file: "veterans-home-care.jpg",
      alt: "American flags honoring veterans",
    },
    content: [
      {
        type: "p",
        text: "Our veterans have earned access to home care benefits that can dramatically improve quality of life — but many veterans and their families have never been told they exist. This guide walks through the main VA programs that pay for in-home care.",
      },
      { type: "h2", text: "VA Aid and Attendance" },
      {
        type: "p",
        text: "Aid and Attendance is an increased pension benefit for wartime veterans and surviving spouses who need help with daily activities. It is paid on top of a regular VA pension and can be used to pay for a caregiver at home.",
      },
      { type: "h2", text: "Veteran Directed Care (VDC)" },
      {
        type: "p",
        text: "Veteran Directed Care works like Missouri's CDS program: the veteran receives a flexible monthly budget and hires their own caregivers, including family members in many cases. It is administered in partnership with the VA medical center and your local Area Agency on Aging.",
      },
      { type: "h2", text: "Homemaker and Home Health Aide Services" },
      {
        type: "p",
        text: "For veterans who meet clinical eligibility, the VA covers professional home health aides who assist with personal care and housekeeping. Eligibility usually requires enrollment in VA health care and a referral from a primary care provider.",
      },
      { type: "h2", text: "How to start the process" },
      {
        type: "ul",
        items: [
          "Confirm the veteran is enrolled in VA health care at va.gov/health-care.",
          "Request an evaluation from the veteran's VA primary care provider.",
          "Contact the local VA social worker or caregiver support coordinator.",
          "Gather discharge papers (DD-214), marriage certificates if applicable, and medical records.",
        ],
      },
      { type: "h2", text: "Common pitfalls" },
      {
        type: "p",
        text: "The most common mistake we see is assuming the veteran does not qualify. Rules change often, and benefits like Aid and Attendance are available to a wider group than people realize. If you are unsure, apply — the worst the VA can say is no, and many families are surprised to find out they qualify.",
      },
      { type: "h2", text: "How Algonquin Nurses helps" },
      {
        type: "p",
        text: "We partner with veterans and their families throughout the St. Louis area to coordinate care and navigate VA paperwork. Call us for a free consultation, and we will help you understand which programs fit best and how to apply.",
      },
    ],
  },
  {
    slug: "hcy-program-in-home-care-children-special-health-needs",
    title: "The HCY Program: In-Home Care for Children with Special Health Needs",
    excerpt:
      "Missouri's Healthy Children and Youth (HCY) program provides in-home services for medically complex children from birth through age 20. Here is how it works.",
    publishedAtDaysAgo: 40,
    image: {
      file: "hcy-program-children.jpg",
      alt: "Pediatric nurse caring for an infant patient",
    },
    content: [
      {
        type: "p",
        text: "Raising a child with complex medical needs takes extraordinary love, endurance, and patience. Families often wish they had more hands, more hours, and more trained help. Missouri's Healthy Children and Youth (HCY) Program was designed to provide exactly that.",
      },
      { type: "h2", text: "What is HCY?" },
      {
        type: "p",
        text: "The HCY Program is part of Missouri's MO HealthNet (Medicaid) benefit. It provides service coordination and medically necessary in-home services for children from birth through age 20 who qualify for Medicaid and have health or developmental needs.",
      },
      { type: "h2", text: "What services does HCY cover?" },
      {
        type: "ul",
        items: [
          "Personal care assistance with bathing, dressing, and feeding.",
          "Respite care that gives primary caregivers a needed break.",
          "Skilled nursing for medically complex children.",
          "Service coordination to navigate therapies, equipment, and appointments.",
        ],
      },
      { type: "h2", text: "Who qualifies?" },
      {
        type: "p",
        text: "Eligibility requires MO HealthNet enrollment and a documented medical or developmental condition that makes in-home services medically necessary. A Registered Nurse from a certified provider like Algonquin Nurses completes the in-home assessment and builds the child's individualized plan of care.",
      },
      { type: "h2", text: "Why families choose HCY" },
      {
        type: "p",
        text: "HCY keeps children out of hospitals and institutions and in the place they thrive most — home. It also protects caregivers from burnout by sharing the daily load, which in turn keeps the whole family healthier.",
      },
      { type: "h2", text: "How to enroll" },
      {
        type: "p",
        text: "Start by confirming your child's MO HealthNet enrollment and asking your pediatrician or specialist for a referral to an HCY-certified provider. Our team handles the rest: the assessment, the service plan, the coordination with MO HealthNet, and the matching of your child with the right caregivers.",
      },
      { type: "h2", text: "We are here to help" },
      {
        type: "p",
        text: "Navigating pediatric home care is complicated, and no family should do it alone. Contact Algonquin Nurses for a free consultation and we will walk you through every step of the HCY enrollment process.",
      },
    ],
  },
];

async function ensureMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
): Promise<string | number> {
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.docs[0]) {
    return (existing.docs[0] as { id: string | number }).id;
  }
  const filePath = path.resolve(process.cwd(), "public/images/blog", filename);
  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath,
  });
  return (created as { id: string | number }).id;
}

async function main() {
  const payload = await getPayload({ config: await config });
  console.log(`Seeding ${posts.length} posts...`);

  for (const p of posts) {
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });

    const publishedAt = new Date(
      Date.now() - p.publishedAtDaysAgo * 24 * 60 * 60 * 1000,
    ).toISOString();

    const coverImage = await ensureMedia(payload, p.image.file, p.image.alt);

    const data = {
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      publishedAt,
      content: toLexical(p.content),
      coverImage,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "posts",
        id: (existing.docs[0] as { id: string | number }).id,
        data,
      });
      console.log(`Updated: ${p.slug}`);
    } else {
      await payload.create({ collection: "posts", data });
      console.log(`Created: ${p.slug}`);
    }
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
