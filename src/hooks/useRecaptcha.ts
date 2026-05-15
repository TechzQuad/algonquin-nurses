"use client";

import { useEffect } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready(cb: () => void): void;
        execute(siteKey: string, options: { action: string }): Promise<string>;
      };
    };
  }
}

export function useRecaptchaScript() {
  useEffect(() => {
    const id = "recaptcha-enterprise-script";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);
}

export function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha?.enterprise) {
      reject(new Error("reCAPTCHA not loaded"));
      return;
    }
    window.grecaptcha.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha.enterprise.execute(SITE_KEY, { action });
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
}
