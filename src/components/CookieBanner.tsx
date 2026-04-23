"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .cookie-banner {
          animation: cookieSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div
        className="cookie-banner"
        style={{
          position: "fixed",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          width: "min(780px, calc(100vw - 32px))",
        }}
      >
        <div
          style={{ backgroundColor: "#2d4a78" }}
          className="rounded-xl shadow-2xl overflow-hidden"
        >
          {/* accent top bar */}
          <div style={{ height: "3px", backgroundColor: "#0d9488" }} />

          <div className="px-7 py-6 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1 min-w-0">
              <p className="text-white text-base font-semibold mb-1.5 tracking-wide">
                Privacy &amp; Cookie Notice
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                We use cookies to enhance your experience and analyze site usage.
                By continuing, you agree to our{" "}
                <Link
                  href="/privacy"
                  className="text-[#14b8a6] hover:text-white underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/cookie-policy"
                  className="text-[#14b8a6] hover:text-white underline underline-offset-2 transition-colors"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDecline}
                className="px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                style={{ backgroundColor: "#0d9488" }}
                className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
