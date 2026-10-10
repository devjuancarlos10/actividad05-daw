import React, { useState } from 'react';
import { Terminal, CheckCircle2, FolderTree, Play, Copy, Check } from 'lucide-react';

export default function StepScaffold() {
  const [copied, setCopied] = useState(false);
  const [terminalOutputVisible, setTerminalOutputVisible] = useState(true);

  const command = `npm create vite@latest clinica-san-lucas -- --template react
cd clinica-san-lucas
npm install lucide-react
npm run dev`;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Terminal de Comandos Interactiva */}
      <div style={{
        background: '#090d16',
        borderRadius: '12px',
        border: '1px solid #1e293b',
        overflow: 'hidden',
        boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.6rem 1rem',
          background: '#0f172a',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
              PowerShell - Entorno de Desarrollo Clínico
            </span>
          </div>

          <button 
            onClick={handleCopy}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.72rem'
            }}
          >
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>

        <div style={{ padding: '1rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
          <div style={{ color: '#38bdf8', marginBottom: '0.35rem' }}>
            $ npm create vite@latest clinica-san-lucas -- --template react
          </div>
          <div style={{ color: '#94a3b8', paddingLeft: '1rem', borderLeft: '2px solid #334155', margin: '0.4rem 0' }}>
            <div>✔ Framework: <span style={{ color: '#a7f3d0' }}>React</span></div>
            <div>✔ Variant: <span style={{ color: '#a7f3d0' }}>JavaScript + Vite</span></div>
          </div>
          <div style={{ color: '#38bdf8', margin: '0.35rem 0' }}>
            $ cd clinica-san-lucas &amp;&amp; npm install lucide-react
          </div>
          <div style={{ color: '#38bdf8', margin: '0.35rem 0' }}>
            $ npm run dev
          </div>

          {terminalOutputVisible && (
            <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ color: '#34d399', fontWeight: 600 }}>
                VITE v6.1.1  ready in 186 ms
              </div>
              <div style={{ color: '#f8fafc', marginTop: '0.2rem' }}>
                ➜  Local:   <span style={{ color: '#38bdf8', textDecoration: 'underline' }}>http://localhost:5173/</span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.3rem' }}>
                [HMR] Servidor con recarga instantánea para telemetría hospitalaria activa.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estructura Inicial Generada */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <FolderTree size={18} color="#0284c7" />
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Estructura Base Generada por Vite
          </h4>
        </div>

        <pre style={{ margin: 0, padding: '0.85rem', fontSize: '0.78rem', background: '#0f172a', borderRadius: '8px' }}>
{`clinica-san-lucas/
├── node_modules/         // Dependencias instaladas (React, Vite, Lucide)
├── public/               // Archivos estáticos e íconos institucionales
├── src/
│   ├── assets/           // Recursos médicos y branding SVG
│   ├── App.css           // Estilos demo (a limpiar en Paso 2)
│   ├── App.jsx           // Componente raíz a convertir en orquestador
│   ├── index.css         // Design system global y tokens CSS
│   └── main.jsx          // Punto de entrada CSR (React.createRoot)
├── index.html            // HTML base con meta viewport & SEO tags
├── package.json          // Scripts (dev, build) y dependencias
└── vite.config.js        // Plugin de React y configuración de bundler`}
        </pre>
      </div>
    </div>
  );
}
