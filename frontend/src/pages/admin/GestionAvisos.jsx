import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Button     from '../../components/ui/Button';

const TABS = ['Conducta', 'Periodos', 'Reinscripción', 'Generales'];

const AVISOS_MOCK = {
  Conducta: [{
    titulo: 'Alerta de conducta crítica',
    texto: 'Estimado tutor, su hijo(a) ha bajado a 50 puntos o menos...',
    umbral: '≤50 puntos',
    canales: ['📱','📧','🖥️'],
    activo: true,
  }],
  Periodos: [{
    titulo: 'Aviso de periodo de evaluación',
    texto: 'Se acerca el periodo de evaluación. Prepara tus calificaciones...',
    umbral: '7 días antes',
    canales: ['📱','📧'],
    activo: true,
  }],
  Reinscripción: [],
  Generales: [],
};

export default function GestionAvisos() {
  const [tab, setTab] = useState('Conducta');
  const avisos = AVISOS_MOCK[tab] || [];

  const tabBtnStyle = (active) => ({
    padding: '8px 18px', borderRadius: 'var(--radius)', fontSize: 14,
    fontWeight: active ? 600 : 500, border: '1.5px solid',
    borderColor: active ? 'var(--green-700)' : 'var(--border)',
    background: active ? 'var(--green-700)' : '#fff',
    color: active ? '#fff' : 'var(--text-secondary)',
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all var(--transition)',
  });

  return (
    <div style={{ padding: '0 2rem 2rem' }}>
      <PageHeader title="Avisos" subtitle="Gestiona las alertas y notificaciones" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={tabBtnStyle(tab === t)}>{t}</button>
          ))}
        </div>
        <Button>+ Crear Aviso</Button>
      </div>

      {avisos.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No hay avisos de tipo {tab.toLowerCase()} configurados.
        </div>
      ) : avisos.map((a, i) => (
        <div key={i} style={{
          borderLeft: '4px solid var(--red-500)', borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
          padding: '1.25rem', background: '#fff', boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)', borderLeftColor: 'var(--red-500)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          marginBottom: '1rem',
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{a.titulo}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{a.texto}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <span style={{ background: 'var(--red-100)', color: 'var(--red-600)', fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20 }}>
                {a.umbral}
              </span>
              {a.canales.map((c, ci) => <span key={ci} style={{ fontSize: 18 }}>{c}</span>)}
              {a.activo && <span style={{ color: 'var(--green-700)', fontSize: 13, fontWeight: 600 }}>☑ Activo</span>}
            </div>
          </div>
          <Button variant="outline" icon="✏️">Editar</Button>
        </div>
      ))}
    </div>
  );
}
