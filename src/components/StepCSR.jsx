import React, { useState } from 'react';
import { CheckSquare, Globe, Cpu, FileCode2, Play, RefreshCw, AlertCircle } from 'lucide-react';

export default function StepCSR() {
  const [csrPhase, setCsrPhase] = useState('hydrated'); // 'empty' | 'downloading' | 'hydrated'

  const simulateCSR = () => {
    setCsrPhase('empty');
    setTimeout(() => {
      setCsrPhase('downloading');
      setTimeout(() => {
        setCsrPhase('hydrated');
      }, 1000);
    }, 800);
  };

  const checklistItems = [
    {
      title: "HTML Inicial Vacío",
      desc: "Al hacer 'View Page Source', el servidor entrega únicamente un esqueleto con <div id='root'></div>.",
      status: true
    },
    {
      title: "Hidratación Exitosa",
      desc: "React DevTools confirma el árbol de componentes montado en memoria y listeners enlazados al DOM.",
      status: true
    },
    {
      title: "JS Chunks Cargados",
      desc: "Network tab registra main.jsx (código de aplicación) y vendor.js (React 19 + React DOM).",
      status: true
    },
    {
      title: "Meta Tags en index.html",
      desc: "Viewport, descripción clínica y títulos residen en index.html para que los rastreadores y el motor de renderizado del navegador los interpreten de inmediato.",
      status: true
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Checklist de Validación de CSR */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Criterios de Verificación: Client-Side Rendering (CSR)
            </h4>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Validación del ciclo de vida del DOM frente al bundle de Vite
            </p>
          </div>

          <button
            onClick={simulateCSR}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.8rem',
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={13} className={csrPhase !== 'hydrated' ? 'animate-spin' : ''} />
            <span>Simular Ciclo CSR</span>
          </button>
        </div>

        {/* Lista de Items verificados */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                background: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '0.1rem'
              }}>
                <CheckSquare size={14} />
              </div>
              <div>
                <strong style={{ fontSize: '0.84rem', color: '#0f172a' }}>{item.title}</strong>
                <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.76rem', color: '#64748b', lineHeight: '1.4' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulador visual de Fases de Carga CSR */}
      <div style={{
        background: '#0f172a',
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid #1e293b',
        color: '#f8fafc'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            // Estado del DOM en el navegador según fase CSR:
          </span>
          <span style={{
            fontSize: '0.72rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: csrPhase === 'empty' ? '#ef4444' : csrPhase === 'downloading' ? '#f59e0b' : '#10b981',
            color: '#ffffff',
            fontWeight: 700
          }}>
            {csrPhase === 'empty' ? '1. HTML Inicial Vacío' : csrPhase === 'downloading' ? '2. Descargando JS Chunks...' : '3. Hidratación Completada'}
          </span>
        </div>

        <div style={{
          background: '#090d16',
          borderRadius: '8px',
          padding: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {csrPhase === 'empty' && (
            <div style={{ color: '#f87171' }}>
              &lt;div id="root"&gt;&lt;/div&gt;
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                // El documento está vacío. El usuario aún ve pantalla en blanco o splash preliminar.
              </div>
            </div>
          )}

          {csrPhase === 'downloading' && (
            <div style={{ color: '#fbbf24' }}>
              &lt;script type="module" src="/src/main.jsx"&gt;&lt;/script&gt;
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                // Descargando main.jsx y chunks de React 19... Parseando JavaScript en el cliente...
              </div>
            </div>
          )}

          {csrPhase === 'hydrated' && (
            <div style={{ color: '#34d399' }}>
              &lt;div id="root"&gt;<br />
              &nbsp;&nbsp;&lt;App&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;Header title="MediCare San Lucas" /&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;Dashboard metrics=&#123;metricsData&#125; /&gt;<br />
              &nbsp;&nbsp;&lt;/App&gt;<br />
              &lt;/div&gt;
              <div style={{ fontSize: '0.72rem', color: '#38bdf8', marginTop: '0.4rem' }}>
                ✓ DOM completamente inyectado y reactivo en el cliente.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nota técnica de SEO & Meta Viewport */}
      <div style={{
        background: '#eff6ff',
        borderRadius: '10px',
        padding: '1rem 1.25rem',
        border: '1px solid #bfdbfe',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem'
      }}>
        <AlertCircle size={20} color="#0284c7" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
        <div style={{ fontSize: '0.8rem', color: '#1e40af', lineHeight: '1.5' }}>
          <strong>¿Por qué meta viewport y SEO tags deben ir en index.html y no en JSX?</strong><br />
          En una SPA con CSR, los motores de búsqueda y dispositivos móviles analizan el <code>head</code> antes de que el motor V8 de JavaScript ejecute <code>main.jsx</code>. Colocar el <code>meta viewport</code> en <code>index.html</code> previene el flash de contenido desescalado y garantiza que los robots indexen títulos y descripciones institucionales de la clínica sin depender del renderizado de React.
        </div>
      </div>
    </div>
  );
}
