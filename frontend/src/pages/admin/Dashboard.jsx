import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import Card       from '../../components/ui/Card';
import { getAlumnos }  from '../../api/alumnos.api';
import { getReportes } from '../../api/reportes.api';

// ── Stat Card ─────────────────────────────────────────────
function StatCard({ icon, iconBg, value, label }) {
  return (
    <Card style={{ padding: '1.25rem' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: '0.75rem' }}>
        {icon}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{label}</div>
    </Card>
  );
}

// ── Puntos badge ──────────────────────────────────────────
function PtsBadge({ pts }) {
  const color = pts <= 45 ? { bg: '#fee2e2', fg: '#991b1b' }
              : pts <= 65 ? { bg: '#fef3c7', fg: '#92400e' }
              : { bg: '#dcfce7', fg: '#166534' };
  return (
    <span style={{ fontSize: 13, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: color.bg, color: color.fg }}>
      {pts} pts
    </span>
  );
}

export default function AdminDashboard() {
  // En producción estos datos vienen del backend.
  // Por ahora usamos datos estáticos para el prototipo.
  const stats = [
    { icon: '👥', iconBg: '#dcfce7', value: 486, label: 'Alumnos Activos' },
    { icon: '👤', iconBg: '#dbeafe', value: 24,  label: 'Personal Activo' },
    { icon: '⚠️', iconBg: '#fef3c7', value: 127, label: 'Reportes del Mes' },
    { icon: '📈', iconBg: '#ccfbf1', value: '78.5', label: 'Promedio Conducta' },
  ];
  const menorPuntaje = [
    { nombre: 'María López Ruiz',   grupo: '2°B', pts: 35 },
    { nombre: 'Carlos Ramírez Soto',grupo: '1°A', pts: 42 },
    { nombre: 'Ana Martínez García',grupo: '3°C', pts: 48 },
  ];
  const ultimosReportes = [
    { alumno: 'María López Ruiz',   grupo: '2°B', tipo: 'neg', desc: 'Falta injustificada a 3 clases consecutivas',          fecha: '25 Abr 2026 · 10:30 AM', delta: -10 },
    { alumno: 'Ana García Soto',    grupo: '3°A', tipo: 'pos', desc: 'Participación destacada en concurso de ciencias',       fecha: '25 Abr 2026 · 2:15 PM',  delta: +6  },
    { alumno: 'Carlos Ramírez Soto',grupo: '1°A', tipo: 'neg', desc: 'Conducta inapropiada durante el recreo',                fecha: '24 Abr 2026 · 11:00 AM', delta: -5  },
  ];

  return (
    <div style={{ padding: '0 2rem 2rem' }}>
      <PageHeader title="Resumen General" subtitle="Panel de Administración · Gestión escolar PACAYAT" />

      {/* Banner reinscripción */}
      <div style={{
        background: '#fffbeb', borderLeft: '4px solid var(--yellow-500)',
        borderRadius: 'var(--radius)', padding: '12px 16px',
        display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: '1.5rem',
      }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#92400e' }}>Periodo de Reinscripción Activo</div>
          <div style={{ fontSize: 13, color: '#78350f', marginTop: 1 }}>Del 1 al 15 de Mayo, 2026. Recordatorio enviado a tutores.</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

        {/* Alumnos menor puntaje */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Alumnos con Menor Puntaje</h3>
            <Link to="/admin/alumnos" style={{ fontSize: 12, color: 'var(--green-700)', fontWeight: 500 }}>Ver todos →</Link>
          </div>
          {menorPuntaje.map(a => (
            <div key={a.nombre} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: '1px solid var(--border)',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{a.nombre}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.grupo}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PtsBadge pts={a.pts} />
                <span style={{ color: 'var(--red-500)', fontSize: 14 }}>↘</span>
              </div>
            </div>
          ))}
        </Card>

        {/* Últimos reportes */}
        <Card>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: '1rem' }}>Últimos Reportes</h3>
          {ultimosReportes.map((r, i) => (
            <div key={i} style={{
              borderLeft: `4px solid ${r.tipo === 'neg' ? 'var(--red-500)' : 'var(--green-500)'}`,
              borderRadius: '0 var(--radius) var(--radius) 0',
              background: r.tipo === 'neg' ? 'var(--red-50)' : 'var(--green-50)',
              padding: '10px 12px', marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{r.alumno}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                  background: r.tipo === 'neg' ? 'var(--red-500)' : 'var(--green-500)', color: '#fff',
                }}>
                  {r.tipo === 'neg' ? 'Negativo' : 'Positivo'}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.grupo}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{r.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.fecha}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: r.delta < 0 ? 'var(--red-600)' : 'var(--green-700)' }}>
                  {r.delta > 0 ? '+' : ''}{r.delta} pts
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
