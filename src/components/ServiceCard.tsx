"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  index?: number;
}

export function ServiceCard({ title, description, imageSrc, href, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={href} className="group block h-full">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-100 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed flex-1">
              {description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
