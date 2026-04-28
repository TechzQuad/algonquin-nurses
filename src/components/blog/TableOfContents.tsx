"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/markdownToLexical";

export function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Observe headings and highlight the active one in the ToC
    const observers: IntersectionObserver[] = [];

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
        In this article
      </p>
      <ul className="space-y-1">
        {headings.map(({ tag, text, id }) => {
          const isH3 = tag === "h3";
          const isActive = active === id;
          return (
            <li key={id} className={isH3 ? "pl-3" : ""}>
              <a
                href={`#${id}`}
                className={`block py-1 pr-2 leading-snug transition-colors text-xs ${
                  isActive
                    ? "text-primary font-semibold border-l-2 border-primary pl-2"
                    : "text-neutral-500 hover:text-neutral-900 border-l-2 border-transparent pl-2"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
