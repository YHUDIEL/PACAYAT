/**
 * Componente Input reutilizable con soporte para iconos
 */
export default function Input({
  label, name, type = 'text', value, onChange,
  placeholder, required, readOnly, disabled,
  iconLeft, iconRight, onIconRightClick, error,
  style,
}) {
  const wrapperStyle = {
    display: 'flex', flexDirection: 'column', gap: 5, ...style,
  };
  const labelStyle = {
    fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
  };
  const relStyle = { position: 'relative' };
  const inputStyle = {
    width: '100%', padding: iconLeft ? '10px 14px 10px 36px' : '10px 14px',
    paddingRight: iconRight ? 36 : 14,
    border: `1.5px solid ${error ? 'var(--red-500)' : 'var(--border)'}`,
    borderRadius: 'var(--radius)', fontSize: 14,
    background: readOnly || disabled ? 'var(--bg-hover)' : '#fff',
    color: readOnly ? 'var(--text-secondary)' : 'var(--text-primary)',
    outline: 'none', transition: 'border-color var(--transition)',
  };
  const iconBaseStyle = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    fontSize: 15, color: 'var(--text-muted)',
  };

  return (
    <div style={wrapperStyle}>
      {label && (
        <label htmlFor={name} style={labelStyle}>
          {label} {required && <span style={{ color: 'var(--red-500)' }}>*</span>}
        </label>
      )}
      <div style={relStyle}>
        {iconLeft && <span style={{ ...iconBaseStyle, left: 12 }}>{iconLeft}</span>}
        <input
          id={name} name={name} type={type} value={value}
          onChange={onChange} placeholder={placeholder}
          required={required} readOnly={readOnly} disabled={disabled}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
          onBlur={e => e.target.style.borderColor = error ? 'var(--red-500)' : 'var(--border)'}
        />
        {iconRight && (
          <button type="button" onClick={onIconRightClick}
            style={{ ...iconBaseStyle, right: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
            {iconRight}
          </button>
        )}
      </div>
      {error && <span style={{ fontSize: 12, color: 'var(--red-500)' }}>{error}</span>}
    </div>
  );
}
