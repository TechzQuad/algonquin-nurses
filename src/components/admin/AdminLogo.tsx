// Login page logo — rendered inside .login__brand
export function AdminLogo() {
  return (
    <div
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '12px',
      }}
    >
      {/* Logo image */}
      <img
        src="/images/ofl.png"
        alt="Algonquin Nurses Home Health Care"
        style={{
          height:    '56px',
          width:     'auto',
          display:   'block',
        }}
      />

      {/* Brand tagline */}
      <p
        style={{
          margin:        0,
          fontSize:      '11px',
          fontWeight:    600,
          color:         '#6b7280',
          textTransform: 'uppercase',
          letterSpacing: '0.09em',
          textAlign:     'center',
        }}
      >
        Content Management System
      </p>
    </div>
  );
}
