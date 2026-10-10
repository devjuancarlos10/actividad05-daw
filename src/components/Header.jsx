import React from 'react';
import { Activity, ShieldCheck, HeartPulse, Clock } from 'lucide-react';

/**
 * Componente Header de la Clínica Quirúrgica.
 * Cumple con el Principio de Responsabilidad Única (SRP) y documentación JSDoc solicitada en la guía.
 * 
 * @param {Object} props
 * @param {string} props.title - Título principal de la clínica o panel médico.
 * @param {string} props.subtitle - Subtítulo descriptivo del estado operacional.
 * @param {string} [props.shift="Guardia Diurna Central"] - Turno activo en el centro médico.
 */
export default function Header({ 
  title = "MediCare San Lucas", 
  subtitle = "Centro Quirúrgico de Alta Complejidad",
  shift = "Guardia Diurna Activa"
}) {
  const currentDate = new Date().toLocaleDateString('es-PE', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.25rem 1.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      boxShadow: '0 2px 8px -1px rgba(15, 23, 42, 0.04)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 10px rgba(2, 132, 199, 0.25)'
        }}>
          <HeartPulse size={26} className="animate-heartbeat" />
        </div>
        <div>
          <h1 style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: 0,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {title}
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              background: '#ecfdf5',
              color: '#059669',
              border: '1px solid #a7f3d0'
            }}>
              NIVEL IV
            </span>
          </h1>
          <p style={{
            fontSize: '0.84rem',
            color: '#64748b',
            margin: '0.2rem 0 0 0',
            fontWeight: 500
          }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.78rem',
          color: '#475569',
          background: '#f8fafc',
          padding: '0.4rem 0.75rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <Clock size={15} color="#0284c7" />
          <span style={{ textTransform: 'capitalize' }}>{currentDate}</span>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <span style={{ fontWeight: 600, color: '#0284c7' }}>{shift}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.78rem',
          color: '#15803d',
          background: '#f0fdf4',
          padding: '0.4rem 0.75rem',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          fontWeight: 700
        }}>
          <ShieldCheck size={16} />
          <span>SISTEMA CLÍNICO SEGURO</span>
        </div>
      </div>
    </header>
  );
}
