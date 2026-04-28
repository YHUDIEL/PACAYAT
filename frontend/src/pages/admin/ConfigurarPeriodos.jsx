import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card       from '../../components/ui/Card';
import Button     from '../../components/ui/Button';
import Badge      from '../../components/ui/Badge';
import Table      from '../../components/ui/Table';
import { showToast } from '../../components/ui/Toast';

const ESTADO_VARIANT = { Cerrado: 'neutral', Activo: 'success', Próximo: 'info' };

export default function ConfigurarPeriodos() {
  const [periodos] = useState([
    { id: 1, nombre: 'Parcial 1', fechaInicio: '01/Sep/2025', fechaFin: '15/Nov/2025', estado: 'Cerrado' },
    { id: 2, nombre: 'Parcial 2', fechaInicio: '16/Nov/2025', fechaFin: '15/Mar/2026', estado: 'Activo'  },
    { id: 3, nombre: 'Parcial 3', fechaInicio: '16/Mar/2026', fechaFin: '15/Jul/2026', estado: 'Próximo' },
  ]);
  const [reinscInicio, setReinscInicio] = useState('01/05/2026');
  const [reinscFin,    setReinscFin]    = useState('15/05/2026');

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)', fontSize: 14, outline: 'none',
  };

  const columns = [
    { key: 'nombre',      label: 'Nombre', render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
    { key: 'fechaInicio', label: 'Fecha inicio', render: v => <span style={{ color: 'var(--text-secondary)' }}>{v}</span> },
    { key: 'fechaFin',    label: 'Fecha fin',    render: v => <span style={{ color: 'var(--text-secondary)' }}>{v}</span> },
    { key: 'estado', label: 'Estado', width: 110,
      render: v => <Badge variant={ESTADO_VARIANT[v] || 'neutral'} dot={v === 'Activo'}>{v}</Badge> },
    { key: 'id', label: 'Acciones', width: 80,
      render: () => (
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: 'var(--blue-600)', padding: '4px 6px', borderRadius: 6 }}>✏️</button>
      ),
    },
  ];

  return (
    <div style={{ padding: '0 2rem 2rem' }}>
      <PageHeader title="Configurar Periodos" subtitle="Administra los periodos escolares y de evaluación" />

      {/* Periodo Escolar Activo */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: '1rem' }}>Periodo Escolar Activo</h3>
        <div style={{
          borderLeft: '4px solid var(--green-600)', borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
          padding: '1.25rem', background: '#fff', boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)', borderLeftColor: 'var(--green-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>2025-2026</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>Agosto 2025 — Julio 2026</div>
            <div style={{ marginTop: 8 }}><Badge variant="success" dot>Activo</Badge></div>
          </div>
          <Button variant="outline" icon="✏️">Editar</Button>
        </div>
      </div>

      {/* Periodos de evaluación */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Periodos de Evaluación Parcial</h3>
          <Button>+ Nuevo periodo</Button>
        </div>
        <Card style={{ padding: 0 }}>
          <Table columns={columns} data={periodos} />
        </Card>
      </div>

      {/* Reinscripción */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: '1rem' }}>Periodo de Reinscripción</h3>
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>Fecha inicio</label>
              <input value={reinscInicio} onChange={e => setReinscInicio(e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>Fecha fin</label>
              <input value={reinscFin} onChange={e => setReinscFin(e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button onClick={() => showToast('Periodo de reinscripción guardado')}>Guardar</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
