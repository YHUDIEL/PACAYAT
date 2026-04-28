/**
 * variant: 'success' | 'danger' | 'warning' | 'info' | 'neutral'
 *          | 'docente' | 'prefecto' | 'secretaria' | 'control' | 'directivo' | 'admin'
 */
const variants = {
  success:    { bg: '#dcfce7', color: '#14532d' },
  danger:     { bg: '#fee2e2', color: '#991b1b' },
  warning:    { bg: '#fef3c7', color: '#92400e' },
  info:       { bg: '#dbeafe', color: '#1e40af' },
  neutral:    { bg: '#e5e7eb', color: '#374151' },
  docente:    { bg: '#dbeafe', color: '#1d4ed8' },
  prefecto:   { bg: '#ffedd5', color: '#c2410c' },
  secretaria: { bg: '#f3e8ff', color: '#7e22ce' },
  control:    { bg: '#ccfbf1', color: '#0f766e' },
  directivo:  { bg: '#fef9c3', color: '#854d0e' },
  admin:      { bg: '#dcfce7', color: '#14532d' },
};

export default function Badge({ children, variant = 'neutral', dot = false }) {
  const { bg, color } = variants[variant] || variants.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: bg, color, fontSize: 12, fontWeight: 600,
      padding: '3px 10px', borderRadius: 20,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />}
      {children}
    </span>
  );
}
