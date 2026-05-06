"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Target, Shield, Users, Award, HandHeart, CheckCircle2, Home, GraduationCap, HeartHandshake } from "lucide-react";
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
        imageSrc="/images/nurse-patient.jpg"
        imageAlt="Algonquin Nurses team"
        imagePosition="center top"
        compact
      />

      {/* Company Background */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Founder image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl order-last lg:order-first"
            >
              <Image
                src="/images/serv.png"
                alt="Algonquin Nurses Home Health Care services"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionHeading
                label="Our Story"
                title="Company Background"
              />
              <div className="space-y-5 text-neutral-600 leading-relaxed">
                <p>
                  Steve and Mary Tamboli started Algonquin Nurses Home Health Care in 1987. The company was named after one of the most prestigious hotels in New York, known for its lofty standards.
                </p>
                <p>
                  Mary has since retired, and Steve runs the company while also remaining active in the community. He is highly active in his family&apos;s Brenden Friday Backpack program, which provides meals for school children.
                </p>
                <p>
                  First, Algonquin Nurses started staffing nursing homes and hospitals and then expanded into Home Care.
                </p>
                <p>
                  Our first goal here at Algonquin Nurses is to help elderly and disabled individuals stay in their home as long as they can. We pride ourselves on the quality of care our staff bring to your home.
                </p>
                <p>
                  We take pride in knowing that our staff help families with their loved ones&apos; safety and care in their homes.
                </p>
                <p>
                  Our team has a comprehensive skill set and is well equipped to manage all responsibilities effectively in one&apos;s home. The important level of training and professionalism demonstrated by the team is commendable.
                </p>
                <p>
                  Our team works in coordination with hospice providers to support patients and their families by offering specialized services.
                </p>
              </div>
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

      {/* Our Approach */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Approach"
            title="Quality Care, Right at Home"
            description="Helping elderly and disabled individuals stay in their homes with dignity, safety, and expert support."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[
              {
                icon: Home,
                title: "Independence at Home",
                desc: "Our first goal is to help elderly and disabled individuals stay in their own homes as long as they can — surrounded by the people and places they love.",
              },
              {
                icon: GraduationCap,
                title: "Skilled, Trained Team",
                desc: "Our team brings a comprehensive skill set and is well-equipped to manage every responsibility in your home. The level of training and professionalism is commendable.",
              },
              {
                icon: HeartHandshake,
                title: "Hospice Coordination",
                desc: "We work in close coordination with hospice providers to support patients and their families by offering specialized, compassionate services.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 lg:p-12 text-center shadow-lg"
          >
            <Heart className="w-10 h-10 text-accent-light mx-auto mb-5" />
            <p className="text-white text-lg lg:text-xl leading-relaxed">
              We pride ourselves on the quality of care our staff bring to your home. We take pride in knowing that our team helps families care for their loved ones safely and comfortably — right where they belong.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy section */}
      <section id="privacy" className="py-20 lg:py-28 bg-white">
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
