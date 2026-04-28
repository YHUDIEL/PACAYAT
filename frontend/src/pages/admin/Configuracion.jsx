import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card       from '../../components/ui/Card';
import Button     from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';

export default function Configuracion() {
  const [form, setForm] = useState({
    nombre:    'Secundaria Técnica 177',
    direccion: 'Calle Principal #123, Col. Centro, CP 68000, Oaxaca, México',
    telefono:  '951-123-4567',
    correo:    'contacto@st177.edu.mx',
    director:  'Mtro. Carlos Méndez',
  });

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)', fontSize: 14, outline: 'none',
    transition: 'border-color var(--transition)',
  };
  const labelStyle = { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 };

  const handleSave = () => showToast('Configuración guardada correctamente');

  return (
    <div style={{ padding: '0 2rem 2rem' }}>
      <PageHeader title="Configuración" subtitle="Ajustes generales del sistema" />

      <Card>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: '1.25rem', paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
          Datos de la escuela
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Nombre</label>
          <input value={form.nombre} onChange={set('nombre')} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Dirección</label>
          <textarea value={form.direccion} onChange={set('direccion')} rows={2}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
            onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Teléfono</label>
            <input value={form.telefono} onChange={set('telefono')} style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div>
            <label style={labelStyle}>Correo institucional</label>
            <input value={form.correo} onChange={set('correo')} type="email" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Director(a)</label>
          <input value={form.director} onChange={set('director')} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--green-600)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </Card>
    </div>
  );
}
