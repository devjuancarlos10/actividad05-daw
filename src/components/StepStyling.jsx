import React, { useState } from 'react';
import { Palette, Zap, Sparkles, Sliders } from 'lucide-react';

export default function StepStyling() {
  const [triageStatus, setTriageStatus] = useState('critical');

  // Valores dinámicos calculados en tiempo de ejecución para Inline Styles
  const triageColors = {
    critical: { color: '#ef4444', bg: '#fee2e2', label: 'Triage I - Resucitación Inmediata' },
    urgent: { color: '#f59e0b', bg: '#fef3c7', label: 'Triage II - Emergencia Crítica' },
    stable: { color: '#10b981', bg: '#ecfdf5', label: 'Triage III - Atención Prioritaria' }
  };

  const activeTriage = triageColors[triageStatus];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Comparación de 3 Estrategias */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem'
      }}>
        {/* 1. CSS Modules */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '1.15rem',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Palette size={16} color="#0284c7" />
              <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                1. CSS Modules (Recomendado)
              </h4>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>
              Scope aislado por archivo. Vite añade automáticamente un hash criptográfico al nombre de la clase (ej. <code>_card_1a8f9_12</code>) evitando colisiones entre módulos hospitalarios.
            </p>
          </div>

          <pre style={{ margin: 0, padding: '0.75rem', background: '#0f172a', borderRadius: '8px', fontSize: '0.72rem', color: '#7dd3fc', lineHeight: '1.6' }}>
{`// MetricCard.module.css
.card {
  padding: 1.25rem;
  border-radius: 16px;
}

// MetricCard.jsx
import styles from './MetricCard.module.css';
<div className={styles.card}>`}
          </pre>
        </div>

        {/* 2. Utility CSS / Tailwind */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '1.15rem',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Zap size={16} color="#059669" />
              <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                2. Utility CSS (Clases Ágiles)
              </h4>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>
              Estilado declarativo directo en JSX. Clases atómicas predefinidas que aceleran el prototipado y garantizan coherencia en espaciados y tipografías.
            </p>
          </div>

          <pre style={{ margin: 0, padding: '0.75rem', background: '#0f172a', borderRadius: '8px', fontSize: '0.72rem', color: '#a7f3d0', lineHeight: '1.6' }}>
{`// MetricCard.jsx
<div className="
  p-5 rounded-2xl bg-white
  shadow-md hover:scale-105
  transition-transform duration-200
">`}
          </pre>
        </div>

        {/* 3. Inline Styles */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '1.15rem',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Sparkles size={16} color="#f59e0b" />
              <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                3. Inline Styles (Dinámicos)
              </h4>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>
              <strong>Uso restringido:</strong> Exclusivamente para valores computados dinámicamente en tiempo de ejecución (variables JS como colores de urgencia o anchos de barra porcentual).
            </p>
          </div>

          <pre style={{ margin: 0, padding: '0.75rem', background: '#0f172a', borderRadius: '8px', fontSize: '0.72rem', color: '#fde68a', lineHeight: '1.6' }}>
{`// Cálculo dinámico de urgencia
const color = triage === 'critical' 
  ? '#ef4444' : '#10b981';

<div style={{ 
  borderLeftColor: color 
}}>`}
          </pre>
        </div>
      </div>

      {/* Demostrador interactivo de estilos dinamicos */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} color="#0284c7" />
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Simulador Clínico: Aplicación de Estilo Inline Dinámico
            </h4>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => setTriageStatus('critical')}
              style={{
                fontSize: '0.72rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                border: 'none',
                background: triageStatus === 'critical' ? '#ef4444' : '#fee2e2',
                color: triageStatus === 'critical' ? '#ffffff' : '#b91c1c',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Crítico (Rojo)
            </button>
            <button
              onClick={() => setTriageStatus('urgent')}
              style={{
                fontSize: '0.72rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                border: 'none',
                background: triageStatus === 'urgent' ? '#f59e0b' : '#fef3c7',
                color: triageStatus === 'urgent' ? '#ffffff' : '#b45309',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Urgente (Ámbar)
            </button>
            <button
              onClick={() => setTriageStatus('stable')}
              style={{
                fontSize: '0.72rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                border: 'none',
                background: triageStatus === 'stable' ? '#10b981' : '#ecfdf5',
                color: triageStatus === 'stable' ? '#ffffff' : '#047857',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Estable (Verde)
            </button>
          </div>
        </div>

        {/* Tarjeta de resultado en vivo */}
        <div style={{
          padding: '1rem',
          borderRadius: '10px',
          borderLeft: `6px solid ${activeTriage.color}`,
          background: activeTriage.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: activeTriage.color }}>
              {activeTriage.label}
            </span>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
              Estilo inline aplicado dinámicamente: <code style={{ fontWeight: 600 }}>borderLeftColor: "{activeTriage.color}"</code>
            </p>
          </div>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.65rem',
            background: activeTriage.color,
            color: '#ffffff',
            borderRadius: '9999px'
          }}>
            Activo
          </span>
        </div>
      </div>
    </div>
  );
}
