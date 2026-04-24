"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Clock, MapPin, Shield, Users, Award, Send, Briefcase, Upload, FileText, Download } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

const benefits = [
  { icon: Clock, title: "Flexible Scheduling", desc: "Work hours that fit your lifestyle, including part-time and full-time options." },
  { icon: Heart, title: "Meaningful Work", desc: "Make a real difference in the lives of clients and their families every day." },
  { icon: Shield, title: "Insurance & Bonding", desc: "Full insurance coverage and bonding provided for all our caregivers." },
  { icon: Users, title: "Supportive Team", desc: "Join a family-owned company that values and supports every team member." },
  { icon: Award, title: "Professional Growth", desc: "Ongoing training and certification opportunities to advance your career." },
  { icon: MapPin, title: "Local Assignments", desc: "Work close to home with assignments throughout the St. Louis metro area." },
];

const openings = [
  {
    title: "Certified Nursing Assistant (CNA)",
    type: "Full-Time / Part-Time",
    location: "St. Louis Metro Area",
    desc: "Provide personal care and assistance to clients in their homes. Current CNA certification required.",
  },
  {
    title: "Home Health Aide",
    type: "Full-Time / Part-Time",
    location: "St. Louis Metro Area",
    desc: "Assist clients with daily activities including meal prep, light housekeeping, and companionship.",
  },
  {
    title: "Registered Nurse (RN)",
    type: "Per Diem",
    location: "St. Louis Metro Area",
    desc: "Provide skilled nursing visits and assessments for our home health clients. Active RN license required.",
  },
  {
    title: "Licensed Practical Nurse (LPN)",
    type: "Per Diem",
    location: "St. Louis Metro Area",
    desc: "Deliver nursing care under RN supervision. Active Missouri LPN license required.",
  },
];

export function CareersPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
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
        subtitle="Join Our Team"
        title="Become a Caregiver"
        description="Make a difference in someone's life every day. Join the Algonquin Nurses family and build a rewarding career in home health care."
        imageSrc="/images/careers-hero.jpg"
        imageAlt="Caregiver assisting elderly woman with walker at home"
        compact
      />

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Why Work With Us"
            title="Benefits of Joining Our Team"
            description="At Algonquin Nurses, we believe our caregivers are our greatest asset."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-surface rounded-2xl p-7 border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Open Positions"
            title="Current Job Openings"
            description="We're always looking for compassionate, dedicated individuals to join our team."
          />
          <div className="max-w-4xl mx-auto space-y-4">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                        <Briefcase className="w-3 h-3" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm mt-3 leading-relaxed">{job.desc}</p>
                  </div>
                  <a
                    href="#apply"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-lg transition-colors flex-shrink-0"
                  >
                    Apply Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Apply Today"
            title="Apply in Two Easy Steps"
            description="Joining our team is simple. Download the form, fill it out, then upload and send it below."
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
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Application Received!</h3>
              <p className="text-neutral-600">
                Thank you for your interest. We&apos;ll review your application and contact you soon.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">

              {/* Step 1 — Download */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-surface border border-neutral-100 rounded-2xl px-8 py-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Download the Application</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                  Download our official Employment Application Form, print it, and fill it out completely before uploading in Step 2.
                </p>
                <a
                  href="/pdf/Employment_Form.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Download Application
                </a>
              </motion.div>

              {/* Step 2 — Upload & Send */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-neutral-100 rounded-2xl px-8 py-7 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Upload and Send</h3>
                </div>
                <p className="text-sm text-neutral-600 mb-5">Upload your completed application into the box below with your details and send it!</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Upload box — first */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Completed Application Form <span className="text-neutral-400 font-normal">(PDF only)</span>
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-neutral-200 rounded-lg px-5 py-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      {resumeFile ? (
                        <>
                          <FileText className="w-8 h-8 text-primary" />
                          <p className="text-sm font-medium text-neutral-800">{resumeFile.name}</p>
                          <p className="text-xs text-neutral-400">{(resumeFile.size / 1024).toFixed(0)} KB — click to change</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-neutral-400" />
                          <p className="text-sm font-medium text-neutral-700">Click to upload your completed application</p>
                          <p className="text-xs text-neutral-400">PDF files only</p>
                        </>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="appResume"
                      name="resume"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {/* Personal details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="appFirstName" className="block text-sm font-medium text-neutral-700 mb-1.5">First Name *</label>
                      <input type="text" id="appFirstName" name="firstName" required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="appLastName" className="block text-sm font-medium text-neutral-700 mb-1.5">Last Name *</label>
                      <input type="text" id="appLastName" name="lastName" required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="appEmail" className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                      <input type="email" id="appEmail" name="email" required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="appPhone" className="block text-sm font-medium text-neutral-700 mb-1.5">Phone *</label>
                      <input type="tel" id="appPhone" name="phone" required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="appPosition" className="block text-sm font-medium text-neutral-700 mb-1.5">Position Interested In</label>
                    <select id="appPosition" name="position" className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white">
                      <option value="">Select a position...</option>
                      <option value="cna">Certified Nursing Assistant (CNA)</option>
                      <option value="hha">Home Health Aide</option>
                      <option value="rn">Registered Nurse (RN)</option>
                      <option value="lpn">Licensed Practical Nurse (LPN)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4" />
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </motion.div>

            </div>
          )}
        </div>
      </section>
    </>
  );
}
