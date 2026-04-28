import styles from './Button.module.css';

/**
 * variant: 'primary' | 'outline' | 'ghost' | 'danger'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children, variant = 'primary', size = 'md',
  onClick, disabled = false, type = 'button',
  fullWidth = false, icon, style,
}) {
  const btnStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 6, border: 'none', borderRadius: 'var(--radius)',
    fontFamily: 'inherit', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1, transition: 'all var(--transition)',
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyles[size], ...variantStyles[variant],
    ...style,
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={btnStyle}>
      {icon && <span style={{ fontSize: 15 }}>{icon}</span>}
      {children}
    </button>
  );
}

const sizeStyles = {
  sm: { padding: '6px 12px', fontSize: 13 },
  md: { padding: '9px 18px', fontSize: 14 },
  lg: { padding: '12px 24px', fontSize: 15 },
};

const variantStyles = {
  primary: {
    background: 'var(--green-700)', color: '#fff',
  },
  outline: {
    background: '#fff', color: 'var(--text-primary)',
    border: '1.5px solid var(--border)',
  },
  ghost: {
    background: 'transparent', color: 'var(--text-secondary)',
  },
  danger: {
    background: 'var(--red-500)', color: '#fff',
  },
};
