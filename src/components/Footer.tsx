import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, ArrowRight } from "lucide-react";

const services = [
  { name: "Private Duty Care", href: "/services/private-duty-care" },
  { name: "Medicaid In-Home Care", href: "/services/medicaid-in-home-care" },
  { name: "Consumer Directed Services", href: "/services/consumer-directed-services" },
  { name: "Youth & Children Program", href: "/services/youth-programs" },
  { name: "Veterans Care", href: "/services/veterans-care" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Client Referral", href: "/client-referral" },
  { name: "Feedback", href: "/feedback" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Image
              src="/images/algonquin-logo-bottom3.png"
              alt="Algonquin Nurses Home Health"
              width={200}
              height={55}
              className="h-12 w-auto mb-5 brightness-110"
            />
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Algonquin Nurses Home Health Care I, LLC has been serving the St. Louis area since 1987.
              Our team provides in-home services and assists families and friends to become home attendants.
            </p>
            {/* Affiliations */}
            <div className="flex flex-wrap gap-3 items-center">
              <Image src="/images/mo-council-in-home-svs.jpg" alt="Missouri Council In-Home Services" width={60} height={40} className="h-8 w-auto rounded bg-white p-0.5" />
              <Image src="/images/home-care-assc.jpg" alt="Home Care Alliance" width={60} height={40} className="h-8 w-auto rounded bg-white p-0.5" />
              <Image src="/images/mo-alliance-for-homecare.jpg" alt="Missouri Alliance for Home Care" width={60} height={40} className="h-8 w-auto rounded bg-white p-0.5" />
              <Image src="/images/f4.png" alt="Chamber of Commerce" width={60} height={40} className="h-8 w-auto rounded bg-white p-0.5" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-white/80 hover:text-white flex items-center gap-2 transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-accent-light group-hover:translate-x-0.5 transition-transform" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white flex items-center gap-2 transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-accent-light group-hover:translate-x-0.5 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
            <div className="space-y-5">
              <div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent-light flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">St. Louis Office</p>
                    <p className="text-sm text-white/70">10135 Manchester Rd., St. Louis, MO 63122</p>
                    <a href="tel:3148228158" className="text-sm text-accent-light hover:text-white transition-colors flex items-center gap-1 mt-1">
                      <Phone className="w-3.5 h-3.5" /> (314) 822-8158
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent-light flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">House Springs Office</p>
                    <p className="text-sm text-white/70">7200 Executive Pkwy, House Springs, MO 63051</p>
                    <a href="tel:6362741870" className="text-sm text-accent-light hover:text-white transition-colors flex items-center gap-1 mt-1">
                      <Phone className="w-3.5 h-3.5" /> (636) 274-1870
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-accent-light flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">O&apos;Fallon Office</p>
                    <a href="tel:6369781775" className="text-sm text-accent-light hover:text-white transition-colors flex items-center gap-1 mt-1">
                      <Phone className="w-3.5 h-3.5" /> (636) 978-1775
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-accent-light flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">24-Hour Services</p>
                  <p className="text-sm text-white/70">Including Weekends & Holidays</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Algonquin Nurses Home Health Care I, LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about#privacy" className="text-sm text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
