'use client'

type UploadDoc = {
  id: number
  url?: string | null
  filename?: string | null
}

type Props = {
  cellData?: number | UploadDoc | null
}

export default function ApplicationFormCell({ cellData }: Props) {
  if (!cellData || typeof cellData === 'number') {
    return <span style={{ color: '#6b7280' }}>—</span>
  }

  const doc = cellData as UploadDoc
  if (!doc.url) return <span style={{ color: '#6b7280' }}>—</span>

  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        color: '#3b82f6',
        fontSize: '0.8125rem',
        fontWeight: 500,
        textDecoration: 'none',
        padding: '2px 8px',
        border: '1px solid #3b82f6',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
      }}
    >
      📄 View PDF
    </a>
  )
}
