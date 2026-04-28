/**
 * Tabla genérica reutilizable
 * columns: [{ key, label, render?, width?, align? }]
 * data: array de objetos
 */
export default function Table({ columns, data, emptyMessage = 'Sin registros', footer }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{
                textAlign: col.align || 'left', padding: '10px 14px',
                fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                borderBottom: '1.5px solid var(--border)',
                width: col.width,
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : data.map((row, i) => (
            <tr key={row.id ?? i} style={{ transition: 'background var(--transition)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = ''}>
              {columns.map(col => (
                <td key={col.key} style={{
                  padding: '12px 14px', borderBottom: '1px solid var(--border)',
                  textAlign: col.align || 'left',
                }}>
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footer && (
        <div style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text-secondary)', borderTop: '1px solid var(--border)' }}>
          {footer}
        </div>
      )}
    </div>
  );
}
