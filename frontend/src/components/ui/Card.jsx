export default function Card({ children, style, padding = '1.25rem' }) {
  return (
    <div style={{
      background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
      padding, ...style,
    }}>
      {children}
    </div>
  );
}
