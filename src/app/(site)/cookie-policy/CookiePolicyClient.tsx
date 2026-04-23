"use client";

import { motion } from "framer-motion";
import { Cookie, BarChart2, Settings, Shield, Phone, ToggleLeft } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const cookieTypes = [
  {
    icon: Shield,
    name: "Essential Cookies",
    description:
      "Required for the website to function properly. These cannot be disabled as they are necessary for core features such as page navigation and security.",
    examples: ["Session management", "Security tokens", "Load balancing"],
    required: true,
  },
  {
    icon: BarChart2,
    name: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website by collecting and reporting anonymous usage data, so we can improve the experience.",
    examples: ["Pages visited", "Time on site", "Traffic sources"],
    required: false,
  },
  {
    icon: Settings,
    name: "Functional Cookies",
    description:
      "Remember your preferences and settings to provide a more personalized experience on return visits.",
    examples: ["Language preferences", "Cookie consent status", "UI preferences"],
    required: false,
  },
];

export function CookiePolicyClient() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
              <Cookie className="w-4 h-4" />
              <span className="text-sm font-medium">Transparency in Tracking</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We believe in being open about how we use cookies and similar technologies
              on our website.
            </p>
            <p className="text-sm text-white/60 mt-4">
              Effective Date: January 1, 2024 &middot; Last Updated: April 23, 2026
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
                This Cookie Policy explains what cookies are, how Algonquin Nurses Home Health
                Care I, LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses
                them on our website, and the choices you have regarding their use. By continuing
                to use our site, you consent to our use of cookies as described in this policy.
              </p>
            </motion.div>

            {/* Section 1 */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">1. What Are Cookies?</h2>
              </div>
              <div className="text-neutral-600 leading-relaxed pl-1 space-y-3">
                <p>
                  Cookies are small text files placed on your device (computer, tablet, or mobile)
                  when you visit a website. They are widely used to make websites work efficiently
                  and to provide information to site owners.
                </p>
                <p>
                  Cookies do not contain personal health information and cannot be used to run
                  programs or deliver viruses to your device. A cookie is uniquely assigned to
                  your device and can only be read by the web server that issued it.
                </p>
              </div>
            </motion.div>

            {/* Section 2 — Cookie types */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">2. Types of Cookies We Use</h2>
              </div>
              <div className="space-y-4">
                {cookieTypes.map((type) => (
                  <div
                    key={type.name}
                    className="rounded-xl border border-neutral-200 p-6 bg-neutral-50"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <type.icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="font-semibold text-neutral-900">{type.name}</h3>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                          type.required
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {type.required ? "Always Active" : "Optional"}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                      {type.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((ex) => (
                        <span
                          key={ex}
                          className="text-xs bg-white border border-neutral-200 text-neutral-500 px-2.5 py-1 rounded-md"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <BarChart2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">3. How We Use Cookies</h2>
              </div>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p className="mb-3">We use cookies to:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Keep our website secure and functioning correctly</li>
                  <li>Remember your cookie consent preferences</li>
                  <li>Analyze how visitors use our site so we can improve it</li>
                  <li>Measure the effectiveness of our content and pages</li>
                  <li>Understand which services our visitors are most interested in</li>
                </ul>
                <p className="mt-3">
                  We do not use cookies to collect Protected Health Information (PHI) or to
                  target you with advertising.
                </p>
              </div>
            </motion.div>

            {/* Section 4 */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-2.5">
                  <ToggleLeft className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">4. Managing Your Cookies</h2>
              </div>
              <div className="text-neutral-600 leading-relaxed pl-1 space-y-3">
                <p>
                  You can control and manage cookies in several ways. Please note that removing
                  or blocking cookies may impact your experience on our website.
                </p>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Browser Settings</h3>
                  <p>
                    Most browsers allow you to view, manage, delete, and block cookies for a
                    website. Refer to your browser&apos;s help documentation for instructions:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Google Chrome: Settings → Privacy and security → Cookies</li>
                    <li>Safari: Preferences → Privacy → Manage Website Data</li>
                    <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
                    <li>Microsoft Edge: Settings → Cookies and site permissions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Our Cookie Banner</h3>
                  <p>
                    When you first visit our site, you will see a cookie notice at the bottom
                    of your screen. You may accept or decline optional cookies at that time.
                    Declining optional cookies will not prevent you from using our website.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section 5 */}
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. Third-Party Cookies
              </h2>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p>
                  We may use third-party services such as website analytics providers that set
                  their own cookies to collect anonymous information about your visit. These
                  providers are contractually obligated to use this data only to provide services
                  to us and not for their own purposes. We do not allow third parties to place
                  advertising cookies on our site.
                </p>
              </div>
            </motion.div>

            {/* Section 6 */}
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Changes to This Policy
              </h2>
              <div className="text-neutral-600 leading-relaxed pl-1">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in
                  technology, regulation, or our practices. Any changes will be posted on this
                  page with a revised &ldquo;Last Updated&rdquo; date. We encourage you to
                  review this policy periodically.
                </p>
              </div>
            </motion.div>

            {/* Section 7 — Contact */}
            <motion.div {...fadeUp}>
              <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-xl p-2.5">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">7. Contact Us</h2>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  If you have questions or concerns about our use of cookies, please contact us:
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
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
