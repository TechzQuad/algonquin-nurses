"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export type TestimonialItem = {
  name: string;
  text: string;
  location?: string;
};

const fallback: TestimonialItem[] = [
  {
    name: "Geraldine C.",
    text: "If it were not for my Aide at Algonquin Nurses I would not be able to move into a newly remodeled apartment.",
  },
  {
    name: "Dorothy B.",
    text: "I love that I can trust my aide. She is not only my helper, but my companion. I love to sew and she helps me with that.",
  },
  {
    name: "Linda C.",
    text: "The office is courteous and timely response to calls. Everyone is so helpful! It is such a relief to me, as her mother, to know I can call on Algonquin Nurses.",
  },
  {
    name: "Earlena S.",
    text: "Our two aides are my angels. Thank you for all your help.",
  },
];

export function Testimonials({ items }: { items?: TestimonialItem[] }) {
  const list = items && items.length > 0 ? items : fallback;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {list.map((testimonial, index) => (
        <motion.div
          key={`${testimonial.name}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 relative"
        >
          <Quote className="w-8 h-8 text-primary/15 absolute top-6 right-6" />
          <p className="text-neutral-700 leading-relaxed mb-6 relative z-10">
            &ldquo;{testimonial.text}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">
                {testimonial.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">{testimonial.name}</p>
              <p className="text-sm text-neutral-500">
                {testimonial.location || "Client"}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
