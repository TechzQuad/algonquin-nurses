"use client";

import { useNav } from "@payloadcms/ui";
import { useEffect } from "react";

function removeNavInert() {
  const nav = document.querySelector(".nav");
  if (nav) (nav as HTMLElement).removeAttribute("inert");
}

export function NavOpener() {
  const { hydrated, setNavOpen } = useNav();

  useEffect(() => {
    if (!hydrated) return;
    if (window.innerWidth > 768) {
      setNavOpen(true);
      // Direct DOM fallback in case React state alone isn't enough
      removeNavInert();
      // Also retry after a short delay for slow hydration
      setTimeout(removeNavInert, 100);
      setTimeout(removeNavInert, 400);
    }
  }, [hydrated, setNavOpen]);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 768) {
        setNavOpen(true);
        removeNavInert();
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [setNavOpen]);

  return null;
}
