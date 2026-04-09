"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Target, Shield, Users, Award, HandHeart, CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    desc: "We serve people without regard to race, religion, sex, or age — providing care with dignity and respect.",
  },
  {
    icon: Target,
    title: "Quality Delivery",
    desc: "We are committed to providing quality, cost-effective care delivery to every client we serve.",
  },
  {
    icon: Shield,
    title: "Ethical Standards",
    desc: "We address medical-ethical issues through a Code of Conduct that guides all of our interactions.",
  },
  {
    icon: Users,
    title: "Whole-Person Approach",
    desc: "We support whole persons — patients, employees, physicians, volunteers, and our communities.",
  },
  {
    icon: HandHeart,
    title: "Spiritual Freedom",
    desc: "We recognize spiritual freedom and do not impose beliefs, respecting each individual's journey.",
  },
  {
    icon: Award,
    title: "Professional Excellence",
    desc: "Our caregivers are screened, qualified, insured, bonded, and registered with the State of Missouri.",
  },
];

const timeline = [
  {
    year: "1987",
    title: "Founded",
    desc: "Algonquin Nurses was founded, beginning by staffing nurses and CNAs for hospitals and nursing homes.",
  },
  {
    year: "1990",
    title: "Medicaid & Private Duty Division",
    desc: "Mark Tamboli joined his brother Steve and their mother Mary to establish the Medicaid and Private Duty Division.",
  },
  {
    year: "1992",
    title: "Medicare Expansion",
    desc: "Sister Anne joined the team to manage the Medicare Skilled Nursing Department, expanding services significantly.",
  },
  {
    year: "Today",
    title: "Three Divisions Strong",
    desc: "The company now operates three main divisions with offices across the St. Louis metro, serving thousands of families.",
  },
];

export function AboutPageClient() {
  return (
    <>
      <Hero
        subtitle="Our Story"
        title="Caring for St. Louis Families Since 1987"
        description="A family-owned home health care company built on trust, compassion, and a commitment to helping you maintain independence in your own home."
        imageSrc="/images/aglonquin-team.jpg"
        imageAlt="Algonquin Nurses team"
        compact
      />

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/steve-mark.jpg"
                  alt="Steve and Mark Tamboli, co-owners of Algonquin Nurses"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-neutral-500">Steve & Mark Tamboli — Co-Owners</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionHeading
                label="Our Mission"
                title="Delivering Excellence in Home Health Care"
                center={false}
              />
              <blockquote className="border-l-4 border-primary pl-5 mb-8">
                <p className="text-lg text-neutral-700 italic leading-relaxed">
                  &ldquo;To provide for the effective and efficient delivery of health care and health-related services in areas of identifiable need, for the benefit of individuals, family, and society.&rdquo;
                </p>
              </blockquote>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Algonquin Nurses was founded in 1987 and began by staffing nurses and CNAs for hospitals and nursing homes. Mark Tamboli joined his brother Steve and their mother Mary in 1990 to establish the Medicaid and Private Duty Division.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Sister Anne joined in 1992 to manage the Medicare Skilled Nursing Department. Today, the company operates three main divisions, continuing the family tradition of providing compassionate, quality care throughout the St. Louis metro area.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our History"
            title="Over Three Decades of Service"
            description="A family legacy of caring for the St. Louis community."
          />

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-primary/20" />
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                    <span className="text-white text-xs font-bold">{item.year}</span>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 flex-1">
                    <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Values"
            title="What Guides Our Care"
            description="Our philosophy centers on serving the whole person with compassion, dignity, and professional excellence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-surface rounded-2xl p-7 hover:shadow-md transition-shadow border border-neutral-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy section */}
      <section id="privacy" className="py-20 lg:py-28 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Privacy Practices"
            title="Home Care Privacy Practices"
            description="We are committed to protecting your personal health information."
          />
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-neutral-100">
            <div className="space-y-4">
              {[
                "Your health information is kept confidential and protected per HIPAA regulations.",
                "We only share information with authorized personnel involved in your care.",
                "You have the right to request copies of your health records.",
                "We maintain physical, electronic, and procedural safeguards.",
                "Our staff is trained on privacy policies and procedures.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Join Our Family of Care"
        description="Whether you need care for yourself, a loved one, or you're looking to make a difference as a caregiver — we'd love to hear from you."
      />
    </>
  );
}
