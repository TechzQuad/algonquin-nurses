"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Printer } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";

const offices = [
  {
    name: "St. Louis Office",
    address: "10135 Manchester Rd., St. Louis, MO 63122",
    phone: "(314) 822-8158",
    tel: "3148228158",
    fax: "(314) 822-0952",
    area: "St. Louis City & County",
  },
  {
    name: "House Springs Office",
    address: "7200 Executive Parkway, House Springs, MO 63051",
    phone: "(636) 274-1870",
    tel: "6362741870",
    fax: "(636) 375-3336",
    area: "Franklin, Washington, Jefferson, St. Francois, St. Genevieve & Crawford Counties",
  },
  {
    name: "O'Fallon Office",
    address: "Private Support Care — Remote Services",
    phone: "(636) 978-1775",
    tel: "6369781775",
    fax: "(314) 822-0952",
    area: "St. Charles, Warren & Lincoln Counties",
  },
];

export function ContactPageClient() {
  return (
    <>
      <Hero
        subtitle="Get In Touch"
        title="Contact Algonquin Nurses"
        description="We're here to help. Reach out to schedule a free consultation or learn more about our home health care services."
        imageSrc="/images/nc.jpg"
        imageAlt="Contact Algonquin Nurses"
        compact
        showCTA={false}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Send Us a Message</h2>
                <p className="text-neutral-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </motion.div>
            </div>

            {/* Office info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Our Offices</h2>

                {offices.map((office) => (
                  <div
                    key={office.tel}
                    className="bg-surface rounded-xl p-6 border border-neutral-100"
                  >
                    <h3 className="font-bold text-neutral-900 mb-3">{office.name}</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-600">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                        <a href={`tel:${office.tel}`} className="text-primary font-medium hover:text-primary-dark transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Printer className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        <span className="text-neutral-500">Fax: {office.fax}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        <span className="text-neutral-500 text-xs">Serving: {office.area}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Hours */}
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-neutral-900">24-Hour Services</h3>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    Available 24 hours a day, 7 days a week — including weekends and holidays.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Find Us"
            title="Our Locations"
          />
          <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 h-[400px] lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.1!2d-90.37!3d38.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8cdb2c463dfed%3A0x6a1ac5d48b4b5c6c!2s10135+Manchester+Rd%2C+St.+Louis%2C+MO+63122!5e0!3m2!1sen!2sus!4v1700000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Algonquin Nurses St. Louis Office Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
