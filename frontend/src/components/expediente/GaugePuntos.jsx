/**
 * Medidor visual semicircular de puntos de conducta.
 * 0-45: rojo | 46-65: amarillo | 66-100: verde
 */
export default function GaugePuntos({ puntos = 100, size = 140 }) {
  const r = size * 0.38;
  const cx = size / 2;
  const cy = size * 0.55;
  const circumference = Math.PI * r;
  const progress = Math.min(100, Math.max(0, puntos)) / 100;
  const strokeDash = progress * circumference;
  const color = puntos <= 45 ? '#ef4444' : puntos <= 65 ? '#f59e0b' : '#22c55e';
  const bgColor = puntos <= 45 ? '#fee2e2' : puntos <= 65 ? '#fef3c7' : '#dcfce7';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width={size} height={size * 0.65} style={{ overflow: 'visible' }}>
        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#e5e7eb" strokeWidth={size * 0.09}
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke={color} strokeWidth={size * 0.09}
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.6s ease, stroke 0.3s' }}
        />
        {/* Valor central */}
        <text x={cx} y={cy - 2} textAnchor="middle"
          style={{ fontSize: size * 0.22, fontWeight: 700, fill: color, fontFamily: 'DM Sans, sans-serif' }}>
          {puntos}
        </text>
        <text x={cx} y={cy + size * 0.12} textAnchor="middle"
          style={{ fontSize: size * 0.1, fill: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>
          / 100
        </text>
      </svg>
      <span style={{
        fontSize: 12, fontWeight: 600, padding: '3px 12px',
        borderRadius: 20, background: bgColor, color,
      }}>
        {puntos <= 45 ? 'Crítico' : puntos <= 65 ? 'En riesgo' : 'Bueno'}
      </span>
    </div>
  );
}
