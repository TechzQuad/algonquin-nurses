const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.algonquinnurses.com';

const quickLinks = [
  {
    href:   '/admin/collections/contact-submissions',
    label:  'Contact Submissions',
    desc:   'View form inquiries',
    color:  '#0d9488',
    bg:     '#f0fdf9',
    border: '#99f6e4',
  },
  {
    href:   '/admin/collections/referrals',
    label:  'Client Referrals',
    desc:   'View incoming referrals',
    color:  '#3b5d95',
    bg:     '#eff6ff',
    border: '#bfdbfe',
  },
  {
    href:   '/admin/collections/applications',
    label:  'Job Applications',
    desc:   'Review applicants',
    color:  '#2d4a78',
    bg:     '#f0f4ff',
    border: '#c7d2fe',
  },
  {
    href:   '/admin/collections/feedback',
    label:  'Client Feedback',
    desc:   'Read client reviews',
    color:  '#b45309',
    bg:     '#fffbeb',
    border: '#fde68a',
  },
  {
    href:   '/admin/collections/chat-leads',
    label:  'Chat Leads',
    desc:   'View chat inquiries',
    color:  '#7c3aed',
    bg:     '#faf5ff',
    border: '#ddd6fe',
  },
  {
    href:   '/admin/collections/posts',
    label:  'Blog Posts',
    desc:   'Manage blog content',
    color:  '#065f46',
    bg:     '#ecfdf5',
    border: '#a7f3d0',
  },
  {
    href:   '/admin/collections/media',
    label:  'Media Library',
    desc:   'Upload & manage files',
    color:  '#6b7280',
    bg:     '#f9fafb',
    border: '#e5e7eb',
  },
  {
    href:   '/admin/collections/testimonials',
    label:  'Testimonials',
    desc:   'Manage testimonials',
    color:  '#0369a1',
    bg:     '#f0f9ff',
    border: '#bae6fd',
  },
];

const siteLinks = [
  { href: SITE_URL,                      label: 'Live Site'     },
  { href: `${SITE_URL}/contact`,         label: 'Contact'       },
  { href: `${SITE_URL}/careers`,         label: 'Careers'       },
  { href: `${SITE_URL}/client-referral`, label: 'Referral Form' },
  { href: `${SITE_URL}/feedback`,        label: 'Feedback Form' },
  { href: `${SITE_URL}/blog`,            label: 'Blog'          },
];

export function BeforeDashboard() {
  return (
    <div style={{ marginBottom: '32px', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* Welcome header */}
      <div
        style={{
          background:     'linear-gradient(135deg, #2d4a78 0%, #1e3354 55%, #0d9488 100%)',
          borderRadius:   '16px',
          padding:        '32px 36px',
          marginBottom:   '24px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            '24px',
          flexWrap:       'wrap',
        }}
      >
        <div>
          <img
            src="/images/ofl.png"
            alt="Algonquin Nurses"
            style={{ height: '38px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '12px', display: 'block' }}
          />
          <h1 style={{ margin: '0 0 6px', fontSize: '21px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
            Welcome to Algonquin Nurses CMS
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(200,220,255,0.75)', lineHeight: 1.6 }}>
            Manage content, view submissions, and keep your site up to date.
          </p>
        </div>

        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '8px',
            padding:        '11px 22px',
            background:     'rgba(255,255,255,0.15)',
            border:         '1px solid rgba(255,255,255,0.25)',
            borderRadius:   '10px',
            color:          '#fff',
            fontWeight:     600,
            fontSize:       '13px',
            textDecoration: 'none',
            whiteSpace:     'nowrap',
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          View Live Site
        </a>
      </div>

      {/* Quick access grid */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ margin: '0 0 14px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#9ca3af' }}>
          Quick Access
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
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
              }}
            >
              <span
                style={{
                  width:        '34px',
                  height:       '34px',
                  borderRadius: '8px',
                  background:   link.color,
                  flexShrink:   0,
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </span>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: 700, color: link.color, lineHeight: 1.3 }}>
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

      {/* Site pages quick links */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
        <p style={{ margin: '0 0 14px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#9ca3af' }}>
          Site Pages
        </p>
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
              <svg width="12" height="12" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', background: 'linear-gradient(90deg, #e5e7eb 0%, transparent 100%)', margin: '28px 0 4px' }} />
      <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
        All collections are listed below. Click any collection to view, add, or edit entries.
      </p>

    </div>
  );
}
