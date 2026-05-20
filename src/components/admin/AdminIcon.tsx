// Small icon shown in the collapsed/open nav sidebar header
export function AdminIcon() {
  return (
    <div
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '8px',
        paddingLeft:    '4px',
      }}
    >
      <img
        src="/images/ofl.png"
        alt="Algonquin Nurses"
        style={{
          height:  '32px',
          width:   'auto',
          display: 'block',
          filter:  'brightness(0) invert(1)',  // white version on dark sidebar
        }}
      />
    </div>
  );
}
