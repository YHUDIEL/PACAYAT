import { useState } from 'react';
import PageHeader          from '../../components/layout/PageHeader';
import Card                from '../../components/ui/Card';
import Badge               from '../../components/ui/Badge';
import Button              from '../../components/ui/Button';
import Table               from '../../components/ui/Table';
import ModalCrearReporte   from '../../components/reportes/ModalCrearReporte';
import { useFetch }        from '../../hooks/useFetch';
import { getAlumnos }      from '../../api/alumnos.api';

const GRUPOS = ['Todos los grupos','1°A','1°B','1°C','2°A','2°B','2°C','3°A','3°B','3°C'];

function PtsBadge({ pts }) {
  const variant = pts <= 45 ? 'danger' : pts <= 65 ? 'warning' : 'success';
  return <Badge variant={variant}>{pts} pts</Badge>;
}

export default function ListadoAlumnos() {
  const [query,   setQuery]   = useState('');
  const [grupo,   setGrupo]   = useState('');
  const [estado,  setEstado]  = useState('');
  const [modalOpen,  setModalOpen]  = useState(false);
  const [alumnoReporte, setAlumnoReporte] = useState(null);

  // TODO: conectar con parámetros reales de filtro
  const { data, loading, refetch } = useFetch(() => getAlumnos({ q: query, grupo, estado }), []);

  const alumnos = data?.alumnos || [];

  const abrirReporte = (alumno) => {
    setAlumnoReporte({
      id:               alumno.id,
      nombre:           alumno.nombreCompleto,
      matricula:        alumno.matricula,
      puntosConducta:   alumno.puntosConducta,
    });
    setModalOpen(true);
  };

  const columns = [
    { key: 'matricula',   label: 'Matrícula', width: 100,
      render: v => <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{v}</span> },
    { key: 'nombreCompleto', label: 'Nombre completo',
      render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
    { key: 'grupo', label: 'Grupo', width: 90,
      render: v => <Badge variant="success">{v}</Badge> },
    { key: 'puntosConducta', label: 'Puntos', width: 110,
      render: v => <PtsBadge pts={v} /> },
    { key: 'tutor',  label: 'Tutor',
      render: v => <span style={{ color: 'var(--text-secondary)' }}>{v}</span> },
    { key: 'estado', label: 'Estado', width: 90,
      render: v => <Badge variant={v === 'Activo' ? 'success' : 'neutral'}>{v}</Badge> },
    { key: 'id', label: 'Acciones', width: 130,
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <ActionBtn title="Ver expediente" color="var(--green-700)">👁</ActionBtn>
          <ActionBtn title="Editar" color="var(--blue-600)">✏️</ActionBtn>
          <ActionBtn title="Crear reporte" color="var(--green-600)" onClick={() => abrirReporte(row)}>📋</ActionBtn>
          <ActionBtn title="Eliminar" color="var(--red-500)">✕</ActionBtn>
        </div>
      ),
    },
  ];

  const filterStyle = {
    padding: '9px 12px', border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)', fontSize: 14, background: '#fff',
    appearance: 'none', outline: 'none', cursor: 'pointer',
  };

  return (
    <div style={{ padding: '0 2rem 2rem' }}>
      <PageHeader
        title="Alumnos"
        subtitle="Gestión del alumnado"
        action={
          <Button onClick={() => { setAlumnoReporte(null); setModalOpen(true); }} icon="📋">
            Crear Reporte
          </Button>
        }
      />

      <ModalCrearReporte
        open={modalOpen}
        onClose={() => { setModalOpen(false); setAlumnoReporte(null); }}
        alumnoPreset={alumnoReporte}
        onSuccess={refetch}
      />

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 14 }}>🔍</span>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por nombre o matrícula..."
            style={{ ...filterStyle, width: '100%', paddingLeft: 36 }}
          />
        </div>
        <select value={grupo} onChange={e => setGrupo(e.target.value)} style={filterStyle}>
          {GRUPOS.map(g => <option key={g} value={g === 'Todos los grupos' ? '' : g}>{g}</option>)}
        </select>
        <select value={estado} onChange={e => setEstado(e.target.value)} style={filterStyle}>
          <option value="">Todos</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <Button>+ Nuevo Alumno</Button>
        <Button variant="outline">+ Inscribir</Button>
      </div>

      {/* Tabla */}
      <Card style={{ padding: 0 }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Cargando alumnos...</div>
        ) : (
          <Table
            columns={columns}
            data={alumnos}
            emptyMessage="No se encontraron alumnos con los filtros aplicados"
            footer={`Mostrando ${alumnos.length} de ${data?.total || alumnos.length} alumnos`}
          />
        )}
      </Card>
    </div>
  );
}

function ActionBtn({ children, title, color, onClick }) {
  return (
    <button title={title} onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      padding: '4px 6px', borderRadius: 6,
      color, fontSize: 15, transition: 'background var(--transition)',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = ''}
    >
      {children}
    </button>
  );
}
