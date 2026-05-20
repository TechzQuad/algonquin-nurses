const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.algonquinnurses.com';

const quickLinks = [
  {
    href:  '/admin/collections/contact-submissions',
    label: 'Contact Submissions',
    icon:  '📬',
    desc:  'View form inquiries',
    color: '#0d9488',
    bg:    '#f0fdf9',
    border:'#99f6e4',
  },
  {
    href:  '/admin/collections/referrals',
    label: 'Client Referrals',
    icon:  '👤',
    desc:  'View incoming referrals',
    color: '#3b5d95',
    bg:    '#eff6ff',
    border:'#bfdbfe',
  },
  {
    href:  '/admin/collections/applications',
    label: 'Job Applications',
    icon:  '💼',
    desc:  'Review applicants',
    color: '#2d4a78',
    bg:    '#f0f4ff',
    border:'#c7d2fe',
  },
  {
    href:  '/admin/collections/feedback',
    label: 'Client Feedback',
    icon:  '⭐',
    desc:  'Read client reviews',
    color: '#b45309',
    bg:    '#fffbeb',
    border:'#fde68a',
  },
  {
    href:  '/admin/collections/chat-leads',
    label: 'Chat Leads',
    icon:  '💬',
    desc:  'View chat inquiries',
    color: '#7c3aed',
    bg:    '#faf5ff',
    border:'#ddd6fe',
  },
  {
    href:  '/admin/collections/posts',
    label: 'Blog Posts',
    icon:  '📝',
    desc:  'Manage blog content',
    color: '#065f46',
    bg:    '#ecfdf5',
    border:'#a7f3d0',
  },
  {
    href:  '/admin/collections/media',
    label: 'Media Library',
    icon:  '🖼️',
    desc:  'Upload & manage files',
    color: '#6b7280',
    bg:    '#f9fafb',
    border:'#e5e7eb',
  },
  {
    href:  '/admin/collections/testimonials',
    label: 'Testimonials',
    icon:  '💬',
    desc:  'Manage testimonials',
    color: '#0369a1',
    bg:    '#f0f9ff',
    border:'#bae6fd',
  },
];

const siteLinks = [
  { href: SITE_URL,                     label: 'View Live Site',      icon: '🌐' },
  { href: `${SITE_URL}/contact`,        label: 'Contact Page',        icon: '📞' },
  { href: `${SITE_URL}/careers`,        label: 'Careers Page',        icon: '💼' },
  { href: `${SITE_URL}/client-referral`,label: 'Referral Form',       icon: '👤' },
  { href: `${SITE_URL}/feedback`,       label: 'Feedback Form',       icon: '⭐' },
  { href: `${SITE_URL}/blog`,           label: 'Blog',                icon: '📰' },
];

export function BeforeDashboard() {
  return (
    <div style={{ marginBottom: '32px', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* ── Welcome header ── */}
      <div
        style={{
          background:   'linear-gradient(135deg, #2d4a78 0%, #1e3354 55%, #0d9488 100%)',
          borderRadius: '16px',
          padding:      '32px 36px',
          marginBottom: '24px',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'space-between',
          gap:          '24px',
          flexWrap:     'wrap',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <img
              src="/images/ofl.png"
              alt="Algonquin Nurses"
              style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
            Welcome to Algonquin Nurses CMS
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(200,220,255,0.8)', lineHeight: 1.6 }}>
            Manage your website content, view submissions, and keep your site up to date.
          </p>
        </div>

        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '8px',
            padding:         '11px 22px',
            background:      'rgba(255,255,255,0.15)',
            border:          '1px solid rgba(255,255,255,0.25)',
            borderRadius:    '10px',
            color:           '#fff',
            fontWeight:      600,
            fontSize:        '13px',
            textDecoration:  'none',
            backdropFilter:  'blur(8px)',
            whiteSpace:      'nowrap',
            transition:      'background 0.2s',
          }}
        >
          🌐 View Live Site
        </a>
      </div>

      {/* ── Quick access grid ── */}
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            margin:        '0 0 14px',
            fontSize:      '11px',
            fontWeight:    700,
            textTransform: 'uppercase',
            letterSpacing: '0.09em',
            color:         '#9ca3af',
          }}
        >
          Quick Access
        </h2>
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap:                 '12px',
          }}
        >
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display:        'flex',
                alignItems:     'flex-start',
                gap:            '12px',
                padding:        '16px',
                background:     link.bg,
                border:         `1px solid ${link.border}`,
                borderRadius:   '12px',
                textDecoration: 'none',
                transition:     'transform 0.15s, box-shadow 0.15s',
              }}
            >
              <span style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>{link.icon}</span>
              <div>
                <p
                  style={{
                    margin:     '0 0 2px',
                    fontSize:   '13px',
                    fontWeight: 700,
                    color:      link.color,
                    lineHeight: 1.3,
                  }}
                >
                  {link.label}
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: '#6b7280', lineHeight: 1.4 }}>
                  {link.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Site pages quick links ── */}
      <div
        style={{
          background:   '#f9fafb',
          border:       '1px solid #e5e7eb',
          borderRadius: '12px',
          padding:      '20px 24px',
        }}
      >
        <h2
          style={{
            margin:        '0 0 14px',
            fontSize:      '11px',
            fontWeight:    700,
            textTransform: 'uppercase',
            letterSpacing: '0.09em',
            color:         '#9ca3af',
          }}
        >
          Site Pages
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {siteLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '6px',
                padding:        '7px 14px',
                background:     '#fff',
                border:         '1px solid #e5e7eb',
                borderRadius:   '8px',
                fontSize:       '12px',
                fontWeight:     500,
                color:          '#374151',
                textDecoration: 'none',
              }}
            >
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Separator ── */}
      <div
        style={{
          height:       '1px',
          background:   'linear-gradient(90deg, #e5e7eb 0%, transparent 100%)',
          margin:       '28px 0 4px',
        }}
      />
      <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
        All collections are listed below. Click any collection to view, add, or edit entries.
      </p>

    </div>
  );
}
