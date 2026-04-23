"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(640px, calc(100vw - 32px))",
        animation: "slideUp 0.4s ease",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(24px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <div className="rounded-2xl bg-white shadow-2xl border border-gray-100 p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">🍪</span>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">
              We use cookies &amp; respect your privacy
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              We use cookies to improve your browsing experience and analyze site
              traffic. By continuing to use this site you agree to our{" "}
              <a
                href="/privacy-policy"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/cookie-policy"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Cookie Policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={accept}
            className="text-xs px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
