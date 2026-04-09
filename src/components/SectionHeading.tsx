"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeading({ label, title, description, center = true, light = false }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 lg:mb-16 ${center ? "text-center" : ""}`}
    >
      {label && (
        <span className={`inline-block text-sm font-semibold uppercase tracking-wider mb-3 ${light ? "text-accent-light" : "text-accent"}`}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold leading-tight ${light ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg max-w-2xl leading-relaxed ${center ? "mx-auto" : ""} ${light ? "text-white/80" : "text-neutral-600"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
