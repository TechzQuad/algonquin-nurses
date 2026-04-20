'use client'

type UploadDoc = {
  id: number
  url?: string | null
  filename?: string | null
}

type Props = {
  cellData?: number | UploadDoc | null
  rowData?: Record<string, unknown>
}

function resolveDoc(cellData: Props['cellData'], rowData: Props['rowData']): UploadDoc | null {
  const value = (cellData && typeof cellData === 'object') ? cellData
    : (rowData?.applicationForm && typeof rowData.applicationForm === 'object') ? rowData.applicationForm as UploadDoc
    : null

  if (!value || typeof value !== 'object') return null
  const doc = value as UploadDoc
  return doc.url ? doc : null
}

export default function ApplicationFormCell({ cellData, rowData }: Props) {
  const doc = resolveDoc(cellData, rowData)

  if (!doc) return <span style={{ color: '#6b7280' }}>—</span>

  return (
    <a
      href={doc.url!}
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
