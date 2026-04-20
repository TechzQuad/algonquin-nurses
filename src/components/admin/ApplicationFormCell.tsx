import type { Payload } from 'payload'

type Props = {
  cellData?: number | { id: number; url?: string | null } | null
  rowData?: Record<string, unknown>
  payload?: Payload
}

export default async function ApplicationFormCell({ cellData, rowData, payload }: Props) {
  const formId =
    typeof cellData === 'number' ? cellData
    : cellData && typeof cellData === 'object' ? cellData.id
    : typeof rowData?.applicationForm === 'number' ? (rowData.applicationForm as number)
    : null

  if (!formId || !payload) return <span style={{ color: '#6b7280' }}>—</span>

  let url: string | null = null
  try {
    const form = await payload.findByID({
      collection: 'application-forms',
      id: formId,
      overrideAccess: true,
    })
    url = (form as { url?: string | null })?.url ?? null
  } catch {
    return <span style={{ color: '#6b7280' }}>—</span>
  }

  if (!url) return <span style={{ color: '#6b7280' }}>—</span>

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
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
