"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { name: "Private Duty Care", href: "/services/private-duty-care" },
  { name: "Medicaid In-Home Care", href: "/services/medicaid-in-home-care" },
  { name: "Consumer Directed Services", href: "/services/consumer-directed-services" },
  { name: "Healthy Youth & Children Program", href: "/services/youth-programs" },
  { name: "Private Duty Services for Veterans", href: "/services/veterans-care" },
];

const aboutLinks = [
  { name: "About Us", href: "/about" },
  { name: "Home Care Privacy Practices", href: "/about#privacy" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-white text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:3148228158" className="flex items-center gap-1.5 hover:text-primary-light transition-colors">
              <Phone className="w-3.5 h-3.5" />
              St. Louis: (314) 822-8158
            </a>
            <a href="tel:6362741870" className="flex items-center gap-1.5 hover:text-primary-light transition-colors">
              <Phone className="w-3.5 h-3.5" />
              House Springs: (636) 274-1870
            </a>
            <a href="tel:6369781775" className="flex items-center gap-1.5 hover:text-primary-light transition-colors">
              <Phone className="w-3.5 h-3.5" />
              O&apos;Fallon: (636) 978-1775
            </a>
          </div>
          <span className="text-primary-light font-medium">Serving St. Louis Since 1987</span>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-white",
          scrolled ? "shadow-lg shadow-black/5" : "shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/algonquin-logo-top-300.png"
                alt="Algonquin Nurses Home Health"
                width={220}
                height={60}
                className="h-12 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* About dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors">
                  About
                  <ChevronDown className={cn("w-4 h-4 transition-transform", aboutOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl shadow-black/10 border border-neutral-100 overflow-hidden py-2"
                    >
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors">
                  Home Health Services
                  <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl shadow-black/10 border border-neutral-100 overflow-hidden py-2"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/blog" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors">
                Blog
              </Link>
              <Link href="/feedback" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors">
                Feedback
              </Link>
              <Link href="/client-referral" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors">
                Client Referral
              </Link>
              <Link href="/careers" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors">
                Become a Caregiver
              </Link>
              <Link href="/contact" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors">
                Contact
              </Link>

              <Link
                href="/contact"
                className="ml-3 px-5 py-2.5 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
              >
                Free Consultation
              </Link>
            </nav>

            {/* Mobile toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                href="tel:3148228158"
                className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-neutral-100 bg-white overflow-hidden max-h-[calc(100vh-72px)] overflow-y-auto"
            >
              <div className="px-4 py-4 space-y-1">
                {/* About section */}
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 pt-2 pb-1">About</div>
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Services section */}
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 pt-4 pb-1">Services</div>
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}

                <div className="border-t border-neutral-100 my-2" />

                <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  Blog
                </Link>
                <Link href="/feedback" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  Feedback
                </Link>
                <Link href="/client-referral" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  Client Referral
                </Link>
                <Link href="/careers" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  Become a Caregiver
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  Contact
                </Link>

                {/* Phone numbers */}
                <div className="border-t border-neutral-100 my-2" />
                <div className="px-3 py-2 space-y-2">
                  <a href="tel:3148228158" className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Phone className="w-4 h-4" /> St. Louis: (314) 822-8158
                  </a>
                  <a href="tel:6362741870" className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Phone className="w-4 h-4" /> House Springs: (636) 274-1870
                  </a>
                  <a href="tel:6369781775" className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Phone className="w-4 h-4" /> O&apos;Fallon: (636) 978-1775
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block mx-3 mt-4 mb-2 px-5 py-3 bg-accent text-white text-center font-semibold rounded-lg transition-colors"
                >
                  Get Free Consultation
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
