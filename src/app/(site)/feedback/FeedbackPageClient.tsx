"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Star } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

export function FeedbackPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(formData.entries()), rating };
    try {
      const res = await fetch("/api/feedback", {
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
        subtitle="Your Voice Matters"
        title="Client Feedback"
        description="We value your feedback. Help us continue to improve our services and care for the St. Louis community."
        imageSrc="/images/fed.jpg"
        imageAlt="Client feedback"
        compact
        showCTA={false}
      />

      {/* Existing testimonials */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            description="Read what families across St. Louis have to say about their experience with Algonquin Nurses."
          />
          <Testimonials />
        </div>
      </section>

      {/* Feedback form */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Share Your Experience"
            title="Submit Your Feedback"
            description="Your feedback helps us improve and lets other families know what to expect."
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
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Thank You!</h3>
              <p className="text-neutral-600">
                We appreciate your feedback. It helps us continue to provide the best care possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fbName" className="block text-sm font-medium text-neutral-700 mb-1.5">Your Name</label>
                  <input type="text" id="fbName" name="name" className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                </div>
                <div>
                  <label htmlFor="fbRelation" className="block text-sm font-medium text-neutral-700 mb-1.5">Relationship to Client</label>
                  <select id="fbRelation" name="relationship" className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white">
                    <option value="">Select...</option>
                    <option value="client">I am the client</option>
                    <option value="family">Family member</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Star rating */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="fbMessage" className="block text-sm font-medium text-neutral-700 mb-1.5">Your Feedback *</label>
                <textarea id="fbMessage" name="message" required rows={5} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" placeholder="Share your experience with Algonquin Nurses..." />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                <Send className="w-4 h-4" />
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
