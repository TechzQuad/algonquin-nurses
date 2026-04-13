"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
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

  if (submitted) {
    return (
      <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-7 h-7 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">Thank You!</h3>
        <p className="text-neutral-600">
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1.5">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            placeholder="(314) 000-0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
        >
          <option value="">Select a service...</option>
          <option value="private-duty">Private Duty Care</option>
          <option value="medicaid">Medicaid In-Home Care</option>
          <option value="cds">Consumer Directed Services</option>
          <option value="hcy">Healthy Youth & Children Program</option>
          <option value="veterans">Veterans Care</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
          placeholder="Tell us about your care needs..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        <Send className="w-4 h-4" />
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
