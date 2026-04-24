"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 320);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 group flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
