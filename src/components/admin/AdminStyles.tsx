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

/* ── App header + nav__header — exact same colour as sidebar top ── */
.app-header {
  background-color: #2d4a78 !important;
  border-bottom: 1px solid rgba(255,255,255,0.08) !important;
}
/* Kill the animated bg overlay so it never flashes a different colour */
.app-header__bg {
  background-color: #2d4a78 !important;
  opacity: 1 !important;
}
/* Make the logo strip inside the sidebar the same shade */
.nav__header {
  background-color: #2d4a78 !important;
}
/* All header text / icons → white */
.app-header,
.app-header a,
.app-header button,
.app-header span {
  color: rgba(210,228,255,0.92) !important;
}
.app-header a:hover,
.app-header button:hover {
  color: #ffffff !important;
}
.app-header svg .stroke {
  stroke: rgba(210,228,255,0.8) !important;
}
/* Breadcrumb / step-nav + all header text → white */
.step-nav,
.step-nav *,
.app-header__step-nav-wrapper,
.app-header__step-nav-wrapper *,
.app-header__content,
.app-header__content *,
.app-header h1,
.app-header h2,
.app-header h3,
.app-header p,
.app-header li,
.app-header label {
  color: #ffffff !important;
  opacity: 1 !important;
}
.step-nav svg .stroke,
.app-header__content svg .stroke {
  stroke: rgba(255,255,255,0.7) !important;
}

/* ── Breathing room between header and page body ── */
.gutter--left,
.gutter--right {
  padding-top: 28px !important;
}
/* Dashboard-specific: add top padding to the before-dashboard + collection area */
.dashboard__wrap {
  padding-top: 20px !important;
}

/* ── Persistent sidebar on desktop ── */
@media (min-width: 769px) {
  .template-default--nav-hydrated {
    grid-template-columns: var(--nav-width) auto !important;
  }
  .template-default .nav,
  .template-default--nav-hydrated .nav {
    display: flex !important;
    flex-direction: column !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    position: sticky !important;
  }
  .template-default .nav *,
  .template-default--nav-hydrated .nav * {
    pointer-events: auto !important;
  }
  .template-default__nav-toggler-wrapper {
    display: none !important;
  }
}

/* ── Mobile: let Payload handle sidebar toggle ── */
@media (max-width: 768px) {
  .template-default__nav-toggler-wrapper {
    display: flex !important;
  }
  .app-header__mobile-nav-toggler {
    display: flex !important;
  }
}

/* ── Hide Payload's auto-generated nav groups (we supply our own) ── */
.nav__wrap > .nav-group {
  display: none !important;
}

/* ── Dropdowns / popups inside the app header (e.g. "Reset Layout") ── */
.app-header .popup__button,
.app-header .popup-button-list__button,
.app-header [class*="dropdown"] button,
.app-header [class*="popup"] button {
  background: rgba(255,255,255,0.15) !important;
  border: 1px solid rgba(255,255,255,0.35) !important;
  color: #ffffff !important;
  border-radius: 8px !important;
}
.app-header .popup__button:hover,
.app-header .popup-button-list__button:hover,
.app-header [class*="dropdown"] button:hover,
.app-header [class*="popup"] button:hover {
  background: rgba(255,255,255,0.25) !important;
  border-color: rgba(255,255,255,0.55) !important;
}
/* Popup / dropdown menu panel that opens (light bg, dark text for readability) */
.popup__content,
.popup-button-list,
.step-nav__popup,
.step-nav__popup .popup__content {
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18) !important;
}
/* Force all text inside ANY popup panel to dark */
.popup__content *,
.popup-button-list *,
.step-nav__popup *,
.step-nav__popup .popup__content * {
  color: #1f2937 !important;
  opacity: 1 !important;
}
.popup__content button,
.popup-button-list button,
.popup-button-list__button,
.step-nav__popup button {
  background: transparent !important;
  border: none !important;
  font-weight: 500 !important;
}
.popup__content button:hover,
.popup-button-list button:hover,
.popup-button-list__button:hover,
.step-nav__popup button:hover {
  background: #f3f4f6 !important;
  color: #111827 !important;
}

/* ── All buttons inside the app header — uniform translucent style ── */
.app-header .btn,
.app-header .btn--style-primary,
.app-header .btn--style-secondary,
.app-header .btn--style-pill,
.app-header [class*="btn"] {
  background: rgba(255,255,255,0.15) !important;
  border: 1px solid rgba(255,255,255,0.35) !important;
  color: #ffffff !important;
  border-radius: 8px !important;
}
.app-header .btn:hover,
.app-header .btn--style-primary:hover,
.app-header .btn--style-secondary:hover,
.app-header .btn--style-pill:hover,
.app-header [class*="btn"]:hover {
  background: rgba(255,255,255,0.25) !important;
  border-color: rgba(255,255,255,0.55) !important;
}

/* ── Primary buttons (outside header) ── */
.btn--style-primary {
  border-radius: 8px !important;
}

/* ── Hide default collection card grid on dashboard ── */
.collections__wrap {
  display: none !important;
}

/* ── Responsive: tighten admin content padding on small screens ── */
@media (max-width: 768px) {
  .template-default__wrap {
    padding-inline: 16px !important;
  }
}
`,
      }}
    />
  );
}
