"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone,
  MapPin,
  Medal,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const services = [
  {
    title: "Private Duty Care",
    description:
      "Personalized in-home care from professional, compassionate caregivers. From hourly assistance to 24/7 care, we create individualized plans for your needs.",
    imageSrc: "/images/private-duty-bug1.jpg",
    href: "/services/private-duty-care",
  },
  {
    title: "Medicaid In-Home Care",
    description:
      "We deliver Medicaid services throughout the St. Louis Metro area through Missouri's MO-Health Net program for eligible residents.",
    imageSrc: "/images/medicaid-in-home-bug.jpg",
    href: "/services/medicaid-in-home-care",
  },
  {
    title: "Consumer Directed Services",
    description:
      "Hire a friend or family member as your attendant. We help you enroll in CDS to direct your own services and maintain independence.",
    imageSrc: "/images/cds-bug.jpg",
    href: "/services/consumer-directed-services",
  },
  {
    title: "Youth & Children Program",
    description:
      "The HCY Program provides service coordination for medically necessary in-home services for MO HealthNet recipients from birth to age 21.",
    imageSrc: "/images/childrens-programs-stl.jpg",
    href: "/services/youth-programs",
  },
];

const careServices = [
  "Companionship",
  "Laundry & Ironing",
  "Respite Services",
  "Dressing & Grooming",
  "Shopping",
  "Transportation",
  "Medication Management",
  "Grocery Shopping",
  "Meal Preparation",
  "Housekeeping",
  "Feeding Assistance",
  "Light Housekeeping",
];

const coverageAreas = [
  "St. Louis City & County",
  "St. Charles County",
  "Jefferson County",
  "Franklin County",
  "Lincoln County",
  "Warren County",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        subtitle="Trusted Home Health Care Since 1987"
        title="Professional Home Health Care Services in St. Louis"
        description="If you or a loved one needs an extra hand but you value the independence of remaining in your own home, Algonquin Nurses is at your service. Our programs are designed to provide any level of assistance you need."
        imageSrc="/images/hero-home.png"
        imageAlt="Professional home health care services"
        showCTA
        showPhones
      />

      {/* Trust bar */}
      <section className="bg-primary py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <AnimatedCounter end={37} suffix="+" label="Years of Experience" />
            <AnimatedCounter end={3} label="Office Locations" />
            <AnimatedCounter end={6} suffix="+" label="Counties Served" />
            <AnimatedCounter end={24} suffix="/7" label="Care Available" />
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Services"
            title="Comprehensive Home Health Care"
            description="We provide a full range of in-home health care services designed to help you or your loved one maintain independence and quality of life."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.href} {...service} index={index} />
            ))}
          </div>

          {/* Veterans CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10"
          >
            <Link href="/services/veterans-care" className="group block">
              <div className="bg-primary rounded-2xl overflow-hidden shadow-lg">
                <div className="flex flex-col lg:flex-row items-center">
                  <div className="relative w-full lg:w-1/3 h-56 lg:h-auto lg:min-h-[200px]">
                    <Image
                      src="/images/disabled-veteran-wheelchair-home-are.jpg"
                      alt="Veterans home care services"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 p-8 lg:p-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Medal className="w-5 h-5 text-accent-light" />
                      <span className="text-accent-light font-semibold text-sm uppercase tracking-wider">Veterans Services</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Private Duty Services for Veterans</h3>
                    <p className="text-white/80 leading-relaxed mb-4">
                      We are proud to serve veterans and their families by providing support services in the comfort of their own homes. Our mission is to help veterans with a successful recovery.
                    </p>
                    <span className="inline-flex items-center gap-2 text-accent-light font-semibold group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/serv.png"
                  alt="Customized care for every life stage"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-white rounded-2xl shadow-xl p-5 border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Screened & Certified</p>
                    <p className="text-sm text-neutral-500">All caregivers verified</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionHeading
                label="Why Choose Us"
                title="Customized Care for Every Life Stage"
                description="We work with clients to create individualized care plans. We offer free in-person consultations with family members to assess needs and discuss appropriate services."
                center={false}
              />

              <div className="space-y-5">
                {[
                  {
                    icon: Shield,
                    title: "Screened & Qualified Caregivers",
                    desc: "Our caregivers pass multiple certifications and are registered with the State of Missouri. All are insured and bonded.",
                  },
                  {
                    icon: Heart,
                    title: "Compassionate, Personalized Care",
                    desc: "From hourly visits to 24/7 care, we match the right caregiver with each client's unique needs and preferences.",
                  },
                  {
                    icon: Clock,
                    title: "24-Hour Service Availability",
                    desc: "We provide round-the-clock care including weekends and holidays, ensuring support whenever you need it.",
                  },
                  {
                    icon: Users,
                    title: "Family-Owned Since 1987",
                    desc: "Over 37 years of trusted service in the St. Louis area. Our reputation is built on integrity and genuine care.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Care services grid */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="24-Hour Services"
            title="Care Services We Provide"
            description="Including weekends and holidays, our comprehensive care services cover every aspect of daily living."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {careServices.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 flex items-center gap-3 shadow-sm border border-neutral-100 hover:shadow-md hover:border-primary/20 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-800">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Client Testimonials"
            title="What Our Clients Say"
            description="Hear from the families we serve about their experience with Algonquin Nurses Home Health."
          />
          <Testimonials />
        </div>
      </section>

      {/* Coverage areas */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                label="Service Area"
                title="Serving the Greater St. Louis Region"
                description="With three office locations, we provide comprehensive home health care coverage across the St. Louis metropolitan area."
                center={false}
              />
              <div className="grid grid-cols-2 gap-3">
                {coverageAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2.5 bg-white rounded-lg p-3.5 shadow-sm border border-neutral-100">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-neutral-800">{area}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {[
                {
                  title: "St. Louis Office",
                  address: "10135 Manchester Rd., St. Louis, MO 63122",
                  phone: "(314) 822-8158",
                  tel: "3148228158",
                  area: "St. Louis City & County",
                },
                {
                  title: "House Springs Office",
                  address: "7200 Executive Pkwy, House Springs, MO 63051",
                  phone: "(636) 274-1870",
                  tel: "6362741870",
                  area: "Franklin, Jefferson, Washington Counties & more",
                },
                {
                  title: "O'Fallon Office",
                  address: "Private Support Care",
                  phone: "(636) 978-1775",
                  tel: "6369781775",
                  area: "St. Charles, Warren & Lincoln Counties",
                },
              ].map((office) => (
                <div
                  key={office.tel}
                  className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-neutral-900 mb-2">{office.title}</h3>
                  <p className="text-sm text-neutral-600 mb-1">{office.address}</p>
                  <p className="text-xs text-neutral-500 mb-3">Serving: {office.area}</p>
                  <a
                    href={`tel:${office.tel}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {office.phone}
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
