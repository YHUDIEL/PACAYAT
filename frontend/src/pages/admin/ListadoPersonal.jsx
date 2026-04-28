import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card       from '../../components/ui/Card';
import Badge      from '../../components/ui/Badge';
import Button     from '../../components/ui/Button';
import Table      from '../../components/ui/Table';
import { useFetch }      from '../../hooks/useFetch';
import { getPersonal }   from '../../api/personal.api';

const ROL_VARIANT = {
  DOCENTE:        'docente',
  PREFECTO:       'prefecto',
  SECRETARIA:     'secretaria',
  CONTROL_ESCOLAR:'control',
  DIRECTIVO:      'directivo',
  ADMIN:          'admin',
};
const ROL_LABEL = {
  DOCENTE: 'Docente', PREFECTO: 'Prefecto', SECRETARIA: 'Secretaria',
  CONTROL_ESCOLAR: 'Control Escolar', DIRECTIVO: 'Directivo', ADMIN: 'Administrador',
};

export default function ListadoPersonal() {
  const [query, setQuery] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');

  const { data, loading, refetch } = useFetch(() => getPersonal({ q: query, rol: rolFiltro }), []);
  const personal = data?.personal || [];

  const filterStyle = {
    padding: '9px 12px', border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)', fontSize: 14, background: '#fff',
    appearance: 'none', outline: 'none', cursor: 'pointer',
  };

  const columns = [
    { key: 'nombre', label: 'Nombre',
      render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
    { key: 'rol', label: 'Rol', width: 140,
      render: v => <Badge variant={ROL_VARIANT[v] || 'neutral'}>{ROL_LABEL[v] || v}</Badge> },
    { key: 'telefono', label: 'Teléfono',
      render: v => <span style={{ color: 'var(--text-secondary)' }}>{v}</span> },
    { key: 'estado', label: 'Estado', width: 100,
      render: v => <Badge variant={v === 'Activo' ? 'success' : 'neutral'}>{v}</Badge> },
    { key: 'id', label: 'Acciones', width: 110,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <ActionBtn title="Ver" color="var(--green-700)">👁</ActionBtn>
          <ActionBtn title="Editar" color="var(--blue-600)">✏️</ActionBtn>
          <ActionBtn title="Eliminar" color="var(--red-500)">✕</ActionBtn>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '0 2rem 2rem' }}>
      <PageHeader title="Personal" subtitle="Gestión del personal escolar"
        action={<Button>+ Nuevo Personal</Button>} />

      <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 14 }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por nombre..."
            style={{ ...filterStyle, width: '100%', paddingLeft: 36 }} />
        </div>
        <select value={rolFiltro} onChange={e => setRolFiltro(e.target.value)} style={filterStyle}>
          <option value="">Todos los roles</option>
          {Object.entries(ROL_LABEL).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select style={filterStyle}><option>Todos</option><option>Activo</option></select>
      </div>

      <Card style={{ padding: 0 }}>
        {loading
          ? <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Cargando...</div>
          : <Table columns={columns} data={personal}
              emptyMessage="No hay personal registrado"
              footer={`Mostrando ${personal.length} de ${data?.total || personal.length} personal`} />
        }
      </Card>
    </div>
  );
}

function ActionBtn({ children, title, color, onClick }) {
  return (
    <button title={title} onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      padding: '4px 6px', borderRadius: 6, color, fontSize: 15,
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = ''}>
      {children}
    </button>
  );
}
