"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  showCTA?: boolean;
  showPhones?: boolean;
  overlay?: "dark" | "blue";
  compact?: boolean;
  imagePosition?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  showCTA = true,
  showPhones = false,
  overlay = "blue",
  compact = false,
  imagePosition,
}: HeroProps) {
  return (
    <section className={`relative ${compact ? "min-h-[340px]" : "min-h-[600px] lg:min-h-[700px]"} flex items-center overflow-hidden`}>
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          overlay === "blue"
            ? "bg-gradient-to-r from-primary/90 via-primary/80 to-primary-dark/70"
            : "bg-gradient-to-r from-neutral-900/85 via-neutral-900/70 to-neutral-900/50"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`max-w-2xl ${compact ? "py-16" : "py-20 lg:py-0"}`}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-accent-light font-semibold text-sm uppercase tracking-wider mb-4"
            >
              {subtitle}
            </motion.p>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-white leading-tight mb-6">
            {title}
          </h1>

          {description && (
            <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-xl">
              {description}
            </p>
          )}

          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                Get Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:6362741870"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Call (636) 274-1870
              </a>
            </motion.div>
          )}

          {showPhones && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
            >
              {[
                { label: "St. Louis", phone: "(314) 822-8158", tel: "3148228158" },
                { label: "House Springs", phone: "(636) 274-1870", tel: "6362741870" },
                { label: "O'Fallon", phone: "(636) 978-1775", tel: "6369781775" },
              ].map((office) => (
                <a
                  key={office.tel}
                  href={`tel:${office.tel}`}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent-light" />
                  <span className="text-sm">
                    <span className="font-medium">{office.label}:</span> {office.phone}
                  </span>
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
