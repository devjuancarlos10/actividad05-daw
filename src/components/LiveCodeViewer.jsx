import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, FileText } from 'lucide-react';
import styles from '../styles/InteractiveGuide.module.css';

const CODE_REPOSITORY = {
  1: {
    title: "PASO 1: Scaffold con Vite",
    file: "vite.config.js & package.json",
    code: `// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
});

// package.json (Dependencias Clave)
{
  "name": "clinica-san-lucas",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "lucide-react": "^1.55.0"
  }
}`
  },
  2: {
    title: "PASO 2: Arquitectura de Componentes",
    file: "src/App.jsx (Orquestador)",
    code: `// src/App.jsx - Orquestador Raíz
// Principio: Sin lógica de negocio pesada, solo importa y orquesta hijos
import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

export default function App() {
  // Datos clínicos estructurados centralizados
  const metricsData = [
    { id: 1, title: 'Pacientes Atendidos', value: '3,420', change: '+14.2%', trend: 'up', iconKey: 'users' },
    { id: 2, title: 'Cirugías Programadas', value: '128', change: '+6.5%', trend: 'up', iconKey: 'surgery' },
    { id: 3, title: 'Espera en Urgencias', value: '14 min', change: '-22.4%', trend: 'down', iconKey: 'time' },
    { id: 4, title: 'Tasa Recuperación', value: '98.6%', change: '+1.8%', trend: 'up', iconKey: 'recovery' }
  ];

  return (
    <div className="clinic-app">
      {/* 1. Encabezado Institucional */}
      <Header 
        title="MediCare San Lucas" 
        subtitle="Centro Quirúrgico de Alta Especialidad" 
      />

      {/* 2. Dashboard orquestado */}
      <Dashboard metrics={metricsData} />
    </div>
  );
}`
  },
  3: {
    title: "PASO 3: Props y Composición Children",
    file: "src/components/Dashboard.jsx",
    code: `// src/components/Dashboard.jsx
import React from 'react';
import MetricCard from './MetricCard';
import styles from '../styles/Dashboard.module.css';

/**
 * Contenedor del Dashboard Clínico.
 * @param {Object} props
 * @param {Array<Object>} props.metrics - Array inmutable de métricas.
 * @param {React.ReactNode} props.children - Sección compuesta inyectada.
 */
export default function Dashboard({ metrics, children }) {
  return (
    <section className={styles.dashboardContainer}>
      {/* Flujo Unidireccional: Mapeo de MetricCard con key única */}
      <div className={styles.metricsGrid}>
        {metrics.map((item) => (
          <MetricCard
            key={item.id}
            title={item.title}
            value={item.value}
            change={item.change}
            trend={item.trend}
          />
        ))}
      </div>

      {/* Patrón de Composición con Children */}
      {children && (
        <div className={styles.childrenSection}>
          {children}
        </div>
      )}
    </section>
  );
}`
  },
  4: {
    title: "PASO 4: Estrategias de Estilado",
    file: "src/styles/MetricCard.module.css",
    code: `/* src/styles/MetricCard.module.css */
/* Scope aislado con hashing automático: evita colisiones */
.card {
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  padding: 1.35rem 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.05);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 24px -6px rgba(14, 165, 233, 0.12);
  border-color: #bae6fd;
}

.value {
  font-size: 2.1rem;
  font-weight: 800;
  color: #0f172a;
}

/* En MetricCard.jsx:
   import styles from './MetricCard.module.css';
   <article className={styles.card}>
*/`
  },
  5: {
    title: "PASO 5: Validación CSR & SEO",
    file: "index.html (CSR Skeleton)",
    code: `<!-- index.html - HTML inicial vacío antes de hidratación CSR -->
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Meta tags SEO requeridos en index.html antes de que ejecute JS -->
    <meta name="description" content="Plataforma de Operaciones Quirúrgicas MediCare" />
    <title>MediCare San Lucas | Centro Quirúrgico</title>
  </head>
  <body>
    <!-- Contenedor vacío donde React inyecta el Virtual DOM -->
    <div id="root"></div>
    
    <!-- Script que descarga el bundle y ejecuta createRoot() -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
  }
};

export default function LiveCodeViewer({ activeStep = 1, onSelectStep }) {
  const [selectedTab, setSelectedTab] = useState(activeStep);
  const [copied, setCopied] = useState(false);

  // Sincronizar pestaña si cambia el paso activo exterior
  useEffect(() => {
    if (activeStep) {
      setSelectedTab(activeStep);
    }
  }, [activeStep]);

  const currentSnippet = CODE_REPOSITORY[selectedTab] || CODE_REPOSITORY[1];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className={styles.codeColumn}>
      {/* Encabezado del visor */}
      <div className={styles.codePanelHeader}>
        <div className={styles.codePanelTitle}>
          <Code size={18} color="#38bdf8" />
          <span>Código JSX en Vivo</span>
        </div>

        <button onClick={handleCopy} className={styles.btnCopyCode}>
          {copied ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
          <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
        </button>
      </div>

      {/* Pestañas de selección de paso */}
      <div className={styles.codeTabs}>
        {[1, 2, 3, 4, 5].map((stepNum) => (
          <button
            key={stepNum}
            onClick={() => {
              setSelectedTab(stepNum);
              if (onSelectStep) onSelectStep(stepNum);
            }}
            className={`${styles.codeTab} ${selectedTab === stepNum ? styles.codeTabActive : ''}`}
          >
            <FileText size={12} />
            <span>Paso {stepNum}</span>
          </button>
        ))}
      </div>

      {/* Encabezado del archivo activo */}
      <div style={{
        padding: '0.5rem 1.25rem',
        background: '#090d16',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
          📄 {currentSnippet.file}
        </span>
        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
          {currentSnippet.title}
        </span>
      </div>

      {/* Cuerpo del visor de código */}
      <div className={styles.codeViewerBody}>
        <pre className={styles.codeSnippet}>
          {currentSnippet.code}
        </pre>
      </div>
    </aside>
  );
}
