"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  variant?: "primary" | "accent";
}

export function CTASection({
  title = "Ready to Get Started?",
  description = "Contact us today for a free, no-obligation consultation. Our team will work with you to create a personalized care plan for you or your loved one.",
  variant = "primary",
}: CTASectionProps) {
  return (
    <section className={`relative py-20 lg:py-24 ${variant === "primary" ? "bg-primary" : "bg-accent"}`}>
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all hover:-translate-y-0.5 shadow-lg ${
                variant === "primary"
                  ? "bg-accent hover:bg-accent-light text-white shadow-accent/25"
                  : "bg-white hover:bg-neutral-50 text-accent shadow-black/10"
              }`}
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:3148228158"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
