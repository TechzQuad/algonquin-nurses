"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

const leadership = [
  {
    name: "Steve Tamboli",
    role: "Co-Owner",
    desc: "Steve co-founded Algonquin Nurses and has been instrumental in growing the company's operations across the St. Louis metro area since 1987.",
  },
];

const departments = [
  {
    name: "Clinical Team",
    roles: ["Registered Nurses (RN)", "Licensed Practical Nurses (LPN)", "Certified Nursing Assistants (CNA)", "Home Health Aides"],
  },
  {
    name: "Care Coordination",
    roles: ["Service Coordinators", "Case Managers", "Patient Advocates", "Scheduling Specialists"],
  },
  {
    name: "Administration",
    roles: ["Office Managers", "Billing & Insurance Specialists", "HR & Compliance", "Quality Assurance"],
  },
];

export function TeamPageClient() {
  return (
    <>
      <Hero
        subtitle="Our People"
        title="Meet the Team Behind Your Care"
        description="Our dedicated team of healthcare professionals is committed to providing the highest quality care in your home."
        imageSrc="/images/ah.jpg"
        imageAlt="Algonquin Nurses team"
        imagePosition="center 30%"
        compact
        showCTA={false}
      />

      {/* Leadership */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Leadership"
            title="Our Founders"
            description="A family legacy of compassionate care spanning over three decades."
          />
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Founder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-surface rounded-2xl overflow-hidden border border-neutral-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-72 md:h-auto">
                  <Image
                    src="/images/founder.jpeg"
                    alt="Steve Tamboli"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">The Tamboli Family</h3>
                  {leadership.map((person) => (
                    <div key={person.name} className="mb-5 last:mb-0">
                      <h4 className="font-bold text-neutral-900">{person.name}</h4>
                      <p className="text-sm text-primary font-medium mb-1">{person.role}</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{person.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Staff members */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Renee Peters",
                  role: "Director of Pvt. Duty – Mo Health Net Div.",
                  image: "/images/Renee-Peters.jpeg",
                },
                {
                  name: "Cara Drollinger",
                  role: "Office Manager / Marketer – House Springs Office",
                  image: "/images/Cara-Drollinger.jpeg",
                },
                {
                  name: "Rhonda Blizing",
                  role: "Branch Manager",
                  image: "/images/Rhonda-Blizing.jpeg",
                },
              ].map((person, index) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-surface rounded-2xl overflow-hidden border border-neutral-100"
                >
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-neutral-900 mb-1">{person.name}</h4>
                    <p className="text-sm text-primary font-medium">{person.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Departments"
            title="A Complete Care Team"
            description="From clinical professionals to administrative support, every team member plays a vital role."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-neutral-100"
              >
                <h3 className="text-lg font-bold text-neutral-900 mb-4">{dept.name}</h3>
                <ul className="space-y-2.5">
                  {dept.roles.map((role) => (
                    <li key={role} className="flex items-center gap-2 text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      {role}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Join Our Growing Team"
        description="We're always looking for compassionate, dedicated healthcare professionals. Explore career opportunities with Algonquin Nurses."
      />
    </>
  );
}
