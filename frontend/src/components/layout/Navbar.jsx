import { useAuth } from '../../context/AuthContext';
import { initials } from '../../utils/formatters';

export default function Navbar({ breadcrumb }) {
  const { user } = useAuth();
  return (
    <div style={{
      background: '#fff', borderBottom: '1px solid var(--border)',
      padding: '12px 2rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
        PACAYAT / <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{breadcrumb}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{user?.nombre}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Admin del sistema</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: 'var(--green-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff',
        }}>
          {initials(user?.nombre || '')}
        </div>
      </div>
    </div>
  );
}
