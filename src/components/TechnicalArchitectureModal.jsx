import React, { useState } from 'react';
import { X, CheckCircle2, Code, Layers, Sparkles, Palette, Globe, ChevronRight } from 'lucide-react';

/**
 * Modal de Auditoría Técnica: Verificación de los 5 Pasos Arquitectónicos de React.
 * Permite constatar el cumplimiento riguroso de cada directiva técnica de la guía de práctica
 * integrada de manera armónica dentro del portal clínico.
 */
export default function TechnicalArchitectureModal({ isOpen, onClose }) {
  const [selectedStep, setSelectedStep] = useState(1);

  if (!isOpen) return null;

  const stepsData = {
    1: {
      number: 1,
      title: "Scaffold del Proyecto con Vite",
      concept: "Gestión de dependencias, bundler (Vite), HMR, estructura de carpetas.",
      restriction: "No usar create-react-app (obsoleto). Verificar que package.json tenga @vitejs/plugin-react y scripts dev/build.",
      evidence: [
        "Proyecto creado con Vite 6 + React 19.",
        "package.json contiene scripts: 'dev', 'build', 'preview'.",
        "Servidor de desarrollo local con recarga en caliente (HMR) < 200ms.",
        "Dependencias instaladas limpiamente con npm y lucide-react."
      ],
      code: `// package.json
{
  "name": "clinica-san-lucas",
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "lucide-react": "^1.55.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.1.1",
    "vite": "^8.3.0"
  }
}`
    },
    2: {
      number: 2,
      title: "Arquitectura de Componentes",
      concept: "Arquitectura basada en componentes, árbol de render, JSX → React.createElement.",
      restriction: "Mantener un solo componente raíz <App> que importa hijos. Evitar lógica de negocio en App.",
      evidence: [
        "App.jsx actúa estrictamente como orquestador central (Single Source of Truth).",
        "Carpetas estructuradas: src/components/ para componentes y src/styles/ para estilos.",
        "Componentes modulares con Principio de Responsabilidad Única (SRP): Navbar, HeroSection, Dashboard, MetricCard, ServicesSection, DoctorsSection, AppointmentSection, Footer.",
        "Ninguna lógica de cálculo pesada o llamadas impuras dentro del orquestador."
      ],
      code: `// src/App.jsx (Orquestador Raíz)
export default function App() {
  // Datos centralizados pasados vía props
  return (
    <div className="clinic-app">
      <Navbar onScrollToSection={...} />
      <HeroSection onScheduleClick={...} />
      <Dashboard metrics={clinicMetrics}>
        <PatientTriageTable />
        <BedOccupancyMonitor />
      </Dashboard>
      <ServicesSection services={servicesData} />
      <DoctorsSection doctors={doctorsData} />
      <AppointmentSection />
      <Footer />
    </div>
  );
}`
    },
    3: {
      number: 3,
      title: "Props y Children: Flujo de Datos",
      concept: "Flujo unidireccional, inmutabilidad de props, composición vs herencia, PropTypes/JSDoc.",
      restriction: "Documentar tipos con JSDoc /** @param {Object} props */. No usar state para props inmutables del dashboard base.",
      evidence: [
        "Flujo estrictamente unidireccional: datos médicos descienden desde App.jsx hacia Dashboard y MetricCard.",
        "Props documentadas minuciosamente con bloques JSDoc en cada componente.",
        "Inmutabilidad garantizada: los componentes hijos sólo leen y renderizan los datos.",
        "Patrón children implementado en Dashboard.jsx para inyectar la tabla de triaje y monitor de camas UCI de forma composable."
      ],
      code: `/**
 * @param {Object} props
 * @param {Array<Object>} props.metrics - Array inmutable de métricas.
 * @param {React.ReactNode} props.children - Contenido compuesto.
 */
export default function Dashboard({ metrics, children }) {
  return (
    <section>
      <div className={styles.metricsGrid}>
        {metrics.map(m => <MetricCard key={m.id} {...m} />)}
      </div>
      {children && <div className={styles.childrenSection}>{children}</div>}
    </section>
  );
}`
    },
    4: {
      number: 4,
      title: "Estrategias de Estilado",
      concept: "Scope de estilos, className vs class, CSS Modules hashing, prioridad de cascada en CSR.",
      restriction: "Prohibido usar <style> global en componentes. Usar *.module.css explícito.",
      evidence: [
        "Estilado modular mediante CSS Modules (*.module.css) con hash local único automático generado por Vite.",
        "Cero etiquetas <style> globales en componentes de React.",
        "Inline styles reservados exclusivamente para propiedades dinámicas computadas en tiempo de ejecución (colores de disponibilidad de médicos y badges de urgencia).",
        "Tokens de diseño clínicos armoniosos en src/index.css."
      ],
      code: `// MetricCard.module.css
.card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

// MetricCard.jsx
import styles from '../styles/MetricCard.module.css';
<article className={styles.card} style={{ borderTopColor: dynamicColor }}>`
    },
    5: {
      number: 5,
      title: "Validación de CSR y Ciclo de Render",
      concept: "CSR vs SSR, hidratación, bundle analysis, index.html vacío vs DOM inyectado.",
      restriction: "Explicar por qué meta viewport y SEO tags deben ir en index.html, no en JSX.",
      evidence: [
        "El archivo index.html inicial contiene únicamente <div id='root'></div> previo a la ejecución de JS.",
        "Los meta viewport y SEO tags residen en index.html para que el navegador configure el viewport y los rastreadores indexen metadatos antes de descargar el bundle de React.",
        "React 19 inicializa el Virtual DOM mediante createRoot() en src/main.jsx e hidrata la interfaz en el cliente de manera ultrafluida.",
        "Generación de chunks optimizados al ejecutar npm run build (dist/assets/index.js)."
      ],
      code: `<!-- index.html - HTML inicial en CSR -->
<!doctype html>
<html lang="es">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="MediCare San Lucas - Plataforma Clínica" />
    <title>MediCare San Lucas | Centro Quirúrgico</title>
  </head>
  <body>
    <!-- Contenedor raíz donde React monta la SPA -->
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
    }
  };

  const active = stepsData[selectedStep];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: '1080px',
        maxHeight: '90vh',
        borderRadius: '24px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Cabecera de la modal */}
        <div style={{
          padding: '1.25rem 2rem',
          background: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                background: '#0284c7',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                FICHA TÉCNICA
              </span>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
                Auditoría de los 5 Pasos de Arquitectura React (Guía Semana 5)
              </h3>
            </div>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
              Verificación de estándares: Vite, SRP, Props &amp; Children, CSS Modules y Client-Side Rendering
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra selectora de Pasos */}
        <div style={{
          display: 'flex',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.5rem 1.5rem',
          gap: '0.5rem',
          overflowX: 'auto'
        }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedStep(num)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: selectedStep === num ? '1px solid #0284c7' : '1px solid transparent',
                background: selectedStep === num ? '#ffffff' : 'transparent',
                color: selectedStep === num ? '#0284c7' : '#64748b',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: selectedStep === num ? '0 2px 6px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <span style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: selectedStep === num ? '#0284c7' : '#cbd5e1',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.72rem'
              }}>
                {num}
              </span>
              <span>Paso {num}</span>
            </button>
          ))}
        </div>

        {/* Contenido del paso seleccionado */}
        <div style={{ padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7' }}>PASO {active.number}</span>
              <h4 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 850, color: '#0f172a' }}>
                {active.title}
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
              <strong>Concepto Clave:</strong> {active.concept}
            </p>
          </div>

          <div style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '10px',
            padding: '0.85rem 1.15rem',
            fontSize: '0.82rem',
            color: '#92400e'
          }}>
            <strong>Restricción / Nota Técnica de la Guía:</strong> {active.restriction}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            {/* Lista de Evidencias */}
            <div>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Evidencias de Implementación en la Clínica:
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {active.evidence.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.82rem', color: '#334155' }}>
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Código de Demostración */}
            <div>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                Snippet de Código Fuente Aplicado:
              </h5>
              <pre style={{
                margin: 0,
                padding: '1rem',
                background: '#0f172a',
                color: '#7dd3fc',
                borderRadius: '12px',
                fontSize: '0.76rem',
                lineHeight: '1.6',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
                maxHeight: '260px'
              }}>
                {active.code}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer de la modal */}
        <div style={{
          padding: '1rem 2rem',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            Plataforma Clínica MediCare San Lucas • Todos los requisitos validados
          </span>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Cerrar Ficha Técnica
          </button>
        </div>
      </div>
    </div>
  );
}
