"use client";

import { useNav } from "@payloadcms/ui";
import { useEffect } from "react";

export function NavOpener() {
  const { hydrated, setNavOpen } = useNav();

  // After Payload finishes hydrating (and potentially closing the nav),
  // force it open on desktop. This runs in the next tick after hydration.
  useEffect(() => {
    if (!hydrated) return;
    if (window.innerWidth > 768) {
      setNavOpen(true);
    }
  }, [hydrated, setNavOpen]);

  // Re-open if window resizes back to desktop after being mobile
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 768) {
        setNavOpen(true);
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [setNavOpen]);

  return null;
}
