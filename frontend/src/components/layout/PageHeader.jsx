export default function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{
      padding: '1.5rem 2rem 0',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      marginBottom: '1.5rem',
    }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
