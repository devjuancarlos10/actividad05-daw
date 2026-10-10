import React from 'react';
import MetricCard from './MetricCard';
import { Users, Stethoscope, Clock, HeartPulse, Sparkles, AlertCircle } from 'lucide-react';

/**
 * Componente interactivo para el Paso 3: Flujo de Datos, Props e Inmutabilidad y Children
 * Renderiza el panel de 4 MetricCards en vivo con props recibidas y visor de JSON.
 */
export default function StepPropsChildren({ metrics = [] }) {
  const iconComponents = {
    users: <Users size={20} color="#0284c7" />,
    surgery: <Stethoscope size={20} color="#0d9488" />,
    time: <Clock size={20} color="#f59e0b" />,
    recovery: <HeartPulse size={20} color="#10b981" />
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Vista previa en vivo del Panel de Metricas Clinicas */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Panel de Métricas Clínicas en Vivo
            </h4>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Datos puros pasados vía <code>props</code> desde el orquestador <code>App.jsx</code>
            </p>
          </div>
          <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 700, border: '1px solid #a7f3d0' }}>
            ✓ Props Inmutables
          </span>
        </div>

        {/* Grid de 4 tarjetas metricas en vivo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem'
        }}>
          {metrics.map((item) => (
            <MetricCard
              key={item.id}
              title={item.title}
              value={item.value}
              unit={item.unit}
              change={item.change}
              trend={item.trend}
              icon={iconComponents[item.iconKey] || <Users size={20} />}
            />
          ))}
        </div>
      </div>

      {/* Demostracion del patron Children */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Sparkles size={18} color="#0284c7" />
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Patrón de Composición con <code>props.children</code>
          </h4>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.5' }}>
          En lugar de pasar sólo datos primitivos, React permite incrustar componentes o elementos JSX dentro de las etiquetas de apertura y cierre del padre (<code>&lt;Dashboard&gt;...&lt;/Dashboard&gt;</code>):
        </p>

        {/* Tarjeta de ejemplo con children inyectado */}
        <MetricCard
          title="Monitoreo de Telemetría UCI"
          value="100%"
          unit="operatividad"
          change="+0.0%"
          trend="neutral"
          icon={<HeartPulse size={20} color="#0284c7" />}
        >
          {/* Contenido inyectado a traves del slot de children */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            padding: '0.65rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.76rem',
            color: '#1e40af'
          }}>
            <AlertCircle size={15} color="#2563eb" />
            <span>
              <strong>Inyección via children:</strong> 24 monitores multiparámetro sincronizados sin acoplar lógica interna a <code>MetricCard</code>.
            </span>
          </div>
        </MetricCard>
      </div>

      {/* Visualizador de Props enviadas */}
      <div style={{
        background: '#0f172a',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        border: '1px solid #1e293b'
      }}>
        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
          // Props enviadas desde App.jsx hacia Dashboard y MetricCards:
        </div>
        <pre style={{ margin: 0, padding: 0, background: 'transparent', fontSize: '0.75rem', color: '#7dd3fc', lineHeight: '1.6' }}>
{JSON.stringify({ metrics }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
