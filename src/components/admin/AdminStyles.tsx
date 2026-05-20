export function AdminStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
/* ── Brand color override: map Payload "success" scale to site teal accent ── */
:root {
  --color-success-50:  #f0fdf9;
  --color-success-100: #ccfbef;
  --color-success-150: #99f6e4;
  --color-success-200: #5eead4;
  --color-success-250: #2dd4bf;
  --color-success-300: #14b8a6;
  --color-success-350: #0d9488;
  --color-success-400: #0f766e;
  --color-success-450: #0d6b64;
  --color-success-500: #0d9488;
  --color-success-550: #0b8078;
  --color-success-600: #0a6c64;
  --color-success-650: #085850;
  --color-success-700: #07453e;
  --color-success-750: #053330;
  --color-success-800: #042120;
  --color-success-850: #031414;
  --color-success-900: #020d0c;
  --color-success-950: #010706;
}

/* ── Dark navy sidebar (WordPress-style) ── */
.nav {
  background: linear-gradient(180deg, #2d4a78 0%, #1e3354 100%) !important;
  border-right: none !important;
  box-shadow: 2px 0 24px rgba(0, 0, 0, 0.18) !important;
}

.nav__header {
  background: #243d6a !important;
  border-bottom: 1px solid rgba(255,255,255,0.08) !important;
}

/* Nav group labels */
.nav-group__toggle {
  color: rgba(179, 207, 255, 0.65) !important;
  font-size: 10px !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
}
.nav-group__toggle:hover,
.nav-group__toggle:focus-visible {
  color: #ffffff !important;
}
.nav-group__toggle .stroke {
  stroke: rgba(179, 207, 255, 0.5) !important;
}
.nav-group__toggle:hover .stroke,
.nav-group__toggle:focus-visible .stroke {
  stroke: #ffffff !important;
}
.nav-group__indicator svg .stroke {
  stroke: rgba(179, 207, 255, 0.35) !important;
}

/* Nav links */
.nav a {
  color: rgba(200, 220, 255, 0.8) !important;
  border-radius: 7px !important;
  transition: background 0.15s, color 0.15s !important;
}
.nav a:hover {
  color: #ffffff !important;
  background: rgba(255,255,255,0.1) !important;
}
.nav a[aria-current="true"],
.nav a[aria-selected="true"],
.nav a.active {
  color: #ffffff !important;
  background: rgba(13,148,136,0.35) !important;
  border-left: 3px solid #0d9488 !important;
}

/* Nav icon/logout area */
.nav__controls {
  border-top: 1px solid rgba(255,255,255,0.08) !important;
}
.nav__controls button,
.nav__controls a {
  color: rgba(200, 220, 255, 0.7) !important;
}
.nav__controls button:hover,
.nav__controls a:hover {
  color: #ffffff !important;
}

/* Nav icons (SVG strokes) */
.nav svg .stroke {
  stroke: rgba(200, 220, 255, 0.6) !important;
}
.nav a:hover svg .stroke,
.nav a[aria-current="true"] svg .stroke {
  stroke: #ffffff !important;
}

/* ── Login page ── */
.template-minimal {
  background: linear-gradient(135deg, #1e3354 0%, #2d4a78 45%, #0f5c55 100%) !important;
  min-height: 100vh !important;
}

.template-minimal__wrap {
  background: #ffffff !important;
  border-radius: 20px !important;
  padding: 48px 40px !important;
  box-shadow: 0 24px 80px rgba(0,0,0,0.35) !important;
  border: 1px solid rgba(255,255,255,0.12) !important;
}

.login__brand {
  margin-bottom: 32px !important;
  padding-bottom: 24px !important;
  border-bottom: 1px solid #e5e7eb !important;
}

/* Login form inputs */
.template-minimal .field-type.email input,
.template-minimal .field-type.text input,
.template-minimal input[type="email"],
.template-minimal input[type="password"],
.template-minimal input[type="text"] {
  border: 1.5px solid #d1d5db !important;
  border-radius: 8px !important;
  transition: border-color 0.2s !important;
}
.template-minimal input:focus {
  border-color: #0d9488 !important;
  box-shadow: 0 0 0 3px rgba(13,148,136,0.12) !important;
  outline: none !important;
}

/* Login "forgot password" link */
.template-minimal a {
  color: #0d9488 !important;
}
.template-minimal a:hover {
  color: #0f766e !important;
}

/* ── Persistent sidebar on desktop ── */
@media (min-width: 769px) {
  /* Expand the grid column so the nav takes up space */
  .template-default--nav-hydrated {
    grid-template-columns: var(--nav-width) auto !important;
  }
  /* Make nav visible — Payload hides it with display:none on ≤1440px */
  .template-default .nav,
  .template-default--nav-hydrated .nav {
    display: flex !important;
    flex-direction: column !important;
    opacity: 1 !important;
  }
  /* Hide the hamburger toggler — nav is always open */
  .template-default__nav-toggler-wrapper {
    display: none !important;
  }
}

/* ── Hide Payload's auto-generated nav groups (we supply our own) ── */
.nav__wrap > .nav-group {
  display: none !important;
}

/* ── Dashboard header bar ── */
.app-header {
  border-bottom: 1px solid rgba(59,93,149,0.12) !important;
  background: #fff !important;
}

/* ── Primary buttons ── */
.btn--style-primary {
  border-radius: 8px !important;
}

/* ── Hide default collection card grid on dashboard ── */
.collections__wrap {
  display: none !important;
}
`,
      }}
    />
  );
}
