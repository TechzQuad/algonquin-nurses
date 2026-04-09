"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageLayoutProps {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  introTitle: string;
  introText: string[];
  services?: string[];
  servicesTitle?: string;
  children?: ReactNode;
  faqs: FAQItem[];
  ctaTitle?: string;
  ctaDescription?: string;
}

export function ServicePageLayout({
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage,
  introTitle,
  introText,
  services,
  servicesTitle = "Services Include",
  children,
  faqs,
  ctaTitle,
  ctaDescription,
}: ServicePageLayoutProps) {
  return (
    <>
      <Hero
        subtitle={heroSubtitle}
        title={heroTitle}
        description={heroDescription}
        imageSrc={heroImage}
        imageAlt={heroTitle}
        compact
      />

      {/* Intro */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">{introTitle}</h2>
              {introText.map((text, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed mb-4 last:mb-0">
                  {text}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services list */}
      {services && services.length > 0 && (
        <section className="py-20 lg:py-28 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="What We Offer"
              title={servicesTitle}
            />
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl p-5 flex items-center gap-3 shadow-sm border border-neutral-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-neutral-800">{service}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom content */}
      {children}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Common Questions"
              title="Frequently Asked Questions"
            />
            <FAQ items={faqs} />
          </div>
        </section>
      )}

      <CTASection title={ctaTitle} description={ctaDescription} />
    </>
  );
}
