"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, UserCheck, Phone } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function PrivacyPageClient() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Your Privacy Matters</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Algonquin Nurses Home Health Care I, LLC is committed to protecting
              your personal and health information.
            </p>
            <p className="text-sm text-white/60 mt-4">
              Effective Date: January 1, 2024 &middot; Last Updated: April 9, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-12">
            {/* Introduction */}
            <motion.div {...fadeUp}>
              <p className="text-neutral-600 leading-relaxed">
                This Privacy Policy describes how Algonquin Nurses Home Health Care I, LLC
                (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
                discloses, and protects your information when you visit our website, use our
                services, or interact with us. We are dedicated to safeguarding your privacy
                in compliance with applicable federal and state laws, including the Health
                Insurance Portability and Accountability Act (HIPAA).
              </p>
            </motion.div>

            {/* Section 1 */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  1. Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-neutral-600 leading-relaxed pl-1">
                <p>We may collect the following types of information:</p>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Personal Information</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Full name, date of birth, and contact information (address, phone number, email)</li>
                    <li>Emergency contact details</li>
                    <li>Insurance and Medicaid/Medicare information</li>
                    <li>Employment application details (for career applicants)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Protected Health Information (PHI)</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Medical history, diagnoses, and treatment plans</li>
                    <li>Physician orders and care assessments</li>
                    <li>Medication records and health status updates</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Website Usage Information</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Browser type, IP address, and device information</li>
                    <li>Pages visited, time spent, and referring URLs</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  2. How We Use Your Information
                </h2>
              </div>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide, coordinate, and manage your home health care services</li>
                  <li>Process referrals, intake, and service authorizations</li>
                  <li>Communicate with you about your care, appointments, and inquiries</li>
                  <li>Process employment applications and conduct background checks</li>
                  <li>Bill insurance providers, Medicaid, or other payers</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Improve our website, services, and patient experience</li>
                  <li>Send service-related communications (not marketing without consent)</li>
                </ul>
              </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  3. How We Share Your Information
                </h2>
              </div>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p className="mb-3">
                  We do not sell your personal information. We may share information only in
                  the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>For Treatment, Payment, and Operations:</strong> With physicians,
                    hospitals, insurance providers, and other health care professionals
                    involved in your care, as permitted by HIPAA.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> When you provide written authorization
                    for us to disclose your information to a specified party.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law, court order,
                    or government regulation — including reporting to state health agencies.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> With trusted vendors who assist with
                    billing, IT, or administrative functions, bound by confidentiality agreements.
                  </li>
                  <li>
                    <strong>Emergency Situations:</strong> To prevent or lessen a serious and
                    imminent threat to health or safety.
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Section 4 */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  4. How We Protect Your Information
                </h2>
              </div>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p className="mb-3">
                  We implement administrative, physical, and technical safeguards to protect
                  your information, including:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Secure electronic health record systems with access controls</li>
                  <li>Encryption of data in transit and at rest</li>
                  <li>Employee training on HIPAA and privacy best practices</li>
                  <li>Locked storage for physical records</li>
                  <li>Regular security assessments and policy reviews</li>
                </ul>
              </div>
            </motion.div>

            {/* Section 5 */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  5. Your Rights
                </h2>
              </div>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p className="mb-3">Under HIPAA and applicable state laws, you have the right to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Access and obtain a copy of your health records</li>
                  <li>Request corrections to your health information</li>
                  <li>Request restrictions on certain uses and disclosures</li>
                  <li>Receive an accounting of disclosures of your health information</li>
                  <li>Request confidential communications (e.g., contact at a specific number)</li>
                  <li>File a complaint if you believe your privacy rights have been violated</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, please contact our Privacy Officer using
                  the information below.
                </p>
              </div>
            </motion.div>

            {/* Section 6 */}
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Cookies and Website Tracking
              </h2>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p>
                  Our website may use cookies and similar technologies to improve your browsing
                  experience and analyze site traffic. You can control cookie preferences through
                  your browser settings. We do not use cookies to collect protected health information.
                </p>
              </div>
            </motion.div>

            {/* Section 7 */}
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                7. Third-Party Links
              </h2>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p>
                  Our website may contain links to third-party websites. We are not responsible
                  for the privacy practices or content of those sites. We encourage you to review
                  the privacy policies of any external sites you visit.
                </p>
              </div>
            </motion.div>

            {/* Section 8 */}
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                8. Children&apos;s Privacy
              </h2>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p>
                  Our website is not directed at children under 13. We do not knowingly collect
                  personal information from children through our website. Our Youth &amp; Children
                  Program services are provided in accordance with all applicable laws, and
                  parental/guardian consent is obtained as required.
                </p>
              </div>
            </motion.div>

            {/* Section 9 */}
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                9. Changes to This Policy
              </h2>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted
                  on this page with a revised &ldquo;Last Updated&rdquo; date. We encourage
                  you to review this policy periodically.
                </p>
              </div>
            </motion.div>

            {/* Section 10 - Contact */}
            <motion.div {...fadeUp}>
              <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-xl p-2.5">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    10. Contact Us
                  </h2>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy, wish to exercise your
                  privacy rights, or want to file a complaint, please contact us:
                </p>
                <div className="space-y-2 text-neutral-700">
                  <p><strong>Algonquin Nurses Home Health Care I, LLC</strong></p>
                  <p>Privacy Officer</p>
                  <p>10135 Manchester Rd., St. Louis, MO 63122</p>
                  <p>
                    Phone:{" "}
                    <a href="tel:3148228158" className="text-primary hover:underline">
                      (314) 822-8158
                    </a>
                  </p>
                </div>
                <p className="text-neutral-500 text-sm mt-6">
                  You may also file a complaint with the U.S. Department of Health and Human
                  Services Office for Civil Rights if you believe your privacy rights have
                  been violated.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
