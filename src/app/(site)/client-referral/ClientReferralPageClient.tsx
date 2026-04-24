"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Users, Heart, CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

export function ClientReferralPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Hero
        subtitle="Refer Someone You Care About"
        title="Client Referral"
        description="Know someone who could benefit from our home health care services? Help them get the care they deserve."
        imageSrc="/images/ref.jpg"
        imageAlt="Client referral"
        compact
        showCTA={false}
      />

      {/* Why refer */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Why Refer"
            title="Help Someone Get the Care They Need"
            description="When you refer a client to Algonquin Nurses, you're connecting them with over 37 years of trusted home health care."
          />
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Trusted Care",
                desc: "Family-owned since 1987, with a reputation built on compassion and integrity.",
              },
              {
                icon: CheckCircle2,
                title: "Free Consultation",
                desc: "Every referral receives a free, no-obligation consultation to assess care needs.",
              },
              {
                icon: Users,
                title: "Comprehensive Services",
                desc: "From private duty to Medicaid, CDS, youth programs, and veterans care.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-surface rounded-2xl p-7 border border-neutral-100 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral form */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Make a Referral"
            title="Referral Form"
            description="Fill out the form below to refer someone for our home health care services."
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-accent/5 border border-accent/20 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Referral Submitted!</h3>
              <p className="text-neutral-600">
                Thank you for your referral. Our team will reach out to the client within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-neutral-100">
                <h3 className="font-bold text-neutral-900 mb-4">Your Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="refYourName" className="block text-sm font-medium text-neutral-700 mb-1.5">Your Name *</label>
                    <input type="text" id="refYourName" name="referrerName" required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="refYourPhone" className="block text-sm font-medium text-neutral-700 mb-1.5">Your Phone *</label>
                    <input type="tel" id="refYourPhone" name="referrerPhone" required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="refYourEmail" className="block text-sm font-medium text-neutral-700 mb-1.5">Your Email <span className="text-neutral-400 font-normal">(for confirmation)</span></label>
                  <input type="email" id="refYourEmail" name="referrerEmail" className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="you@example.com" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-neutral-100">
                <h3 className="font-bold text-neutral-900 mb-4">Client Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="refClientName" className="block text-sm font-medium text-neutral-700 mb-1.5">Client Name *</label>
                      <input type="text" id="refClientName" name="clientName" required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="refClientPhone" className="block text-sm font-medium text-neutral-700 mb-1.5">Client Phone</label>
                      <input type="tel" id="refClientPhone" name="clientPhone" className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="refService" className="block text-sm font-medium text-neutral-700 mb-1.5">Service Needed</label>
                    <select id="refService" name="service" className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white">
                      <option value="">Select a service...</option>
                      <option value="private-duty">Private Duty Care</option>
                      <option value="medicaid">Medicaid In-Home Care</option>
                      <option value="cds">Consumer Directed Services</option>
                      <option value="hcy">Youth & Children Program</option>
                      <option value="veterans">Veterans Care</option>
                      <option value="other">Not Sure / Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="refNotes" className="block text-sm font-medium text-neutral-700 mb-1.5">Additional Notes</label>
                    <textarea id="refNotes" name="notes" rows={4} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" placeholder="Any additional information about the client's needs..." />
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                <Send className="w-4 h-4" />
                {submitting ? "Submitting..." : "Submit Referral"}
              </button>
            </form>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
