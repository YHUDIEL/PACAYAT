export default function Select({ label, name, value, onChange, options = [], required, error, style }) {
  const wrapperStyle = { display: 'flex', flexDirection: 'column', gap: 5, ...style };
  const relStyle     = { position: 'relative' };
  const selectStyle  = {
    width: '100%', padding: '10px 36px 10px 14px', appearance: 'none',
    border: `1.5px solid ${error ? 'var(--red-500)' : 'var(--border)'}`,
    borderRadius: 'var(--radius)', fontSize: 14, background: '#fff',
    color: 'var(--text-primary)', outline: 'none', cursor: 'pointer',
    transition: 'border-color var(--transition)',
  };
  return (
    <div style={wrapperStyle}>
      {label && (
        <label htmlFor={name} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {label} {required && <span style={{ color: 'var(--red-500)' }}>*</span>}
        </label>
      )}
      <div style={relStyle}>
        <select id={name} name={name} value={value} onChange={onChange} style={selectStyle}
          onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
          onBlur={e => e.target.style.borderColor = error ? 'var(--red-500)' : 'var(--border)'}>
          {options.map(opt => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', color: 'var(--text-muted)', fontSize: 12 }}>▾</span>
      </div>
      {error && <span style={{ fontSize: 12, color: 'var(--red-500)' }}>{error}</span>}
    </div>
  );
}
