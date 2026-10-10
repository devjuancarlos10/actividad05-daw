import React, { useState } from 'react';
import { Layers, Folder, FileCode, CheckCircle, Network, ArrowRight } from 'lucide-react';

export default function StepArchitecture() {
  const [selectedNode, setSelectedNode] = useState('app');

  const nodeDetails = {
    app: {
      name: "App.jsx (Orquestador Raíz)",
      role: "Director Médico / Orquestador",
      desc: "No almacena lógica de cálculo pesada. Centraliza los datos clínicos maestros y los distribuye hacia abajo a través de props. Garantiza una única fuente de verdad (Single Source of Truth).",
      props: "metricsData, clinicInfo"
    },
    header: {
      name: "Header.jsx (Presentación Institucional)",
      role: "Identidad y Estado Global",
      desc: "Renderiza el encabezado del hospital, fecha actual, turno activo y sellos de seguridad. Cumple con SRP (Principio de Responsabilidad Única) al enfocarse solo en la barra superior.",
      props: "title, subtitle, shift"
    },
    dashboard: {
      name: "Dashboard.jsx (Contenedor Funcional)",
      role: "Jefe de Servicio Quirúrgico",
      desc: "Recibe el array de métricas como props, itera sobre ellas para renderizar MetricCards con claves únicas, y ofrece slots mediante {children} para la tabla de triaje y ocupación de camas.",
      props: "metrics (array), department, children"
    },
    metricCard: {
      name: "MetricCard.jsx (Componente Átomo Reutilizable)",
      role: "Especialista Clínico / Indicador",
      desc: "Componente altamente reutilizable gobernado por CSS Modules. Recibe props inmutables (title, value, change, trend, icon) y renderiza información visual con micro-animaciones.",
      props: "title, value, change, trend, unit, dynamicColor, children"
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Estructura Limpia de Carpetas */}
      <div style={{
        background: '#0f172a',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #1e293b',
        color: '#f8fafc'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <Folder size={18} color="#38bdf8" />
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>
            Nueva Estructura Limpia y Modular en <code>src/</code>
          </span>
        </div>

        <pre style={{ margin: 0, padding: '0.85rem', background: '#090d16', borderRadius: '8px', fontSize: '0.8rem', lineHeight: '1.7' }}>
{`src/
├── components/           // ✅ Componentes reutilizables con SRP
│   ├── Header.jsx        // Encabezado institucional y guardia
│   ├── Dashboard.jsx     // Contenedor principal de telemetría médica
│   ├── MetricCard.jsx    // Tarjeta atómica modular para indicadores
│   └── ...
├── styles/               // ✅ Estilos aislados con CSS Modules
│   ├── Dashboard.module.css
│   └── MetricCard.module.css
├── App.jsx               // ✅ Orquestador sin lógica de negocio
└── main.jsx              // Punto de montaje en el DOM (CSR)`}
        </pre>
      </div>

      {/* Árbol Interactivo de Componentes */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Network size={18} color="#0284c7" />
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Árbol de Componentes Clínicos (Haz clic en un nodo para inspeccionarlo)
            </h4>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#0284c7', background: '#e0f2fe', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
            Flujo Unidireccional
          </span>
        </div>

        {/* Diagrama en cascada interactivo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Nodo App */}
          <button
            onClick={() => setSelectedNode('app')}
            style={{
              textAlign: 'left',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: selectedNode === 'app' ? '2px solid #0284c7' : '1px solid #e2e8f0',
              background: selectedNode === 'app' ? '#f0f9ff' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0284c7' }} />
              <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>App.jsx (Orquestador Raíz)</strong>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Solo importa y orquesta hijos</span>
          </button>

          {/* Hijos de App */}
          <div style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '2px dashed #cbd5e1', marginLeft: '1.25rem' }}>
            {/* Header */}
            <button
              onClick={() => setSelectedNode('header')}
              style={{
                textAlign: 'left',
                padding: '0.65rem 0.9rem',
                borderRadius: '8px',
                border: selectedNode === 'header' ? '2px solid #0284c7' : '1px solid #e2e8f0',
                background: selectedNode === 'header' ? '#f0f9ff' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>Header.jsx</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                Props: title, subtitle, shift
              </span>
            </button>

            {/* Dashboard */}
            <button
              onClick={() => setSelectedNode('dashboard')}
              style={{
                textAlign: 'left',
                padding: '0.65rem 0.9rem',
                borderRadius: '8px',
                border: selectedNode === 'dashboard' ? '2px solid #0284c7' : '1px solid #e2e8f0',
                background: selectedNode === 'dashboard' ? '#f0f9ff' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0284c7' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>Dashboard.jsx</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                Props: metrics (array), children
              </span>
            </button>

            {/* Hijos de Dashboard */}
            <div style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderLeft: '2px dashed #cbd5e1', marginLeft: '1rem' }}>
              <button
                onClick={() => setSelectedNode('metricCard')}
                style={{
                  textAlign: 'left',
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  border: selectedNode === 'metricCard' ? '2px solid #0284c7' : '1px solid #e2e8f0',
                  background: selectedNode === 'metricCard' ? '#f0f9ff' : '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>MetricCard.jsx (×4 instancias)</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  Props: title, value, change, trend, icon
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Ficha explicativa del nodo seleccionado */}
        <div style={{
          marginTop: '1.25rem',
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          borderLeft: '4px solid #0284c7'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
              {nodeDetails[selectedNode].name}
            </span>
            <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
              {nodeDetails[selectedNode].role}
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0.35rem 0 0.5rem 0', lineHeight: '1.5' }}>
            {nodeDetails[selectedNode].desc}
          </p>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            <strong>Contrato de Props:</strong> <code style={{ color: '#0284c7' }}>{nodeDetails[selectedNode].props}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
