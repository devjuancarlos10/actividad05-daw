import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Dashboard from './components/Dashboard';
import ServicesSection from './components/ServicesSection';
import DoctorsSection from './components/DoctorsSection';
import AppointmentSection from './components/AppointmentSection';
import TechnicalArchitectureModal from './components/TechnicalArchitectureModal';
import Footer from './components/Footer';
import dashboardStyles from './styles/Dashboard.module.css';
import { Users, BedDouble, Heart, Stethoscope, Sparkles } from 'lucide-react';

/**
 * Componente Raíz Orquestador de la Clínica MediCare San Lucas.
 * 
 * Cumple con los 5 pasos arquitectónicos requeridos:
 * 1. Scaffold con Vite + React 19 moderno.
 * 2. Orquestador raíz puro (App.jsx) sin lógica de cálculo pesada, delegando en componentes hijos.
 * 3. Flujo unidireccional de datos con props inmutables y composición mediante {children}.
 * 4. Estilos encapsulados con CSS Modules (*.module.css) e inline styles reservados para valores dinámicos.
 * 5. Client-Side Rendering (CSR) con SEO y meta viewport configurados en index.html.
 */
export default function App() {
  // Estado para la modal de verificación técnica de los 5 pasos
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [preselectedSpecialty, setPreselectedSpecialty] = useState('');

  // 1. Datos de Métricas Hospitalarias pasados vía props a Dashboard (Paso 3)
  const clinicMetrics = [
    {
      id: 'met-1',
      title: 'Pacientes Atendidos',
      value: '3,420',
      unit: 'pacientes',
      change: '+14.2%',
      trend: 'up',
      iconKey: 'users'
    },
    {
      id: 'met-2',
      title: 'Cirugías Programadas',
      value: '128',
      unit: 'quirófanos',
      change: '+6.5%',
      trend: 'up',
      iconKey: 'surgery'
    },
    {
      id: 'met-3',
      title: 'Espera en Urgencias',
      value: '14 min',
      unit: '',
      change: '-22.4%',
      trend: 'down',
      iconKey: 'time',
      dynamicColor: '#059669' // Inline style dinámico (Paso 4)
    },
    {
      id: 'met-4',
      title: 'Tasa de Recuperación',
      value: '98.6%',
      unit: '',
      change: '+1.8%',
      trend: 'up',
      iconKey: 'satisfaction'
    }
  ];

  // 2. Datos de Pacientes en Triaje para composición mediante {children} (Paso 3)
  const triagePatients = [
    { id: 'PAC-1042', name: 'Carmen Salazar V.', age: 54, triage: 'Crítico', dept: 'UCI Quirúrgica', doc: 'Dr. Morales', wait: '2 min', vitals: 'SpO2 89% - TA 155/95' },
    { id: 'PAC-1043', name: 'Roberto Huamán G.', age: 41, triage: 'Urgente', dept: 'Traumatología', doc: 'Dr. Mendoza', wait: '11 min', vitals: 'SpO2 97% - TA 130/85' },
    { id: 'PAC-1044', name: 'Lucía Fernández M.', age: 29, triage: 'Urgente', dept: 'Cardiología', doc: 'Dra. Valenzuela', wait: '15 min', vitals: 'SpO2 98% - TA 120/80' },
    { id: 'PAC-1045', name: 'Eduardo Córdova P.', age: 67, triage: 'Estable', dept: 'Medicina Interna', doc: 'Dra. Paredes', wait: '26 min', vitals: 'SpO2 99% - TA 118/75' }
  ];

  // 3. Catálogo de Especialidades Quirúrgicas (Paso 3)
  const servicesCatalog = [
    {
      id: 'serv-1',
      name: 'Cirugía General y Laparoscópica',
      description: 'Procedimientos de mínima invasión con torres 4K para vesícula, hernias y patologías digestivas complejas.',
      iconKey: 'surgery',
      bgColor: '#f0fdf4',
      doctorsCount: 8,
      features: ['Torres Laparoscópicas Storz 4K', 'Alta Médica en 24 Horas', 'Menor Dolor Postoperatorio']
    },
    {
      id: 'serv-2',
      name: 'Cardiología & Hemodinámica',
      description: 'Diagnóstico y tratamiento avanzado de patologías cardiovasculares y cateterismos de emergencia.',
      iconKey: 'heart',
      bgColor: '#e0f2fe',
      doctorsCount: 6,
      features: ['Angiografía Digital 3D', 'Unidad de Dolor Torácico 24/7', 'Ecocardiograma Tridimensional']
    },
    {
      id: 'serv-3',
      name: 'Traumatología & Ortopedia',
      description: 'Cirugía reconstructiva osteoarticular, artroscopía de rodilla y hombro, y manejo de fracturas.',
      iconKey: 'bone',
      bgColor: '#fef3c7',
      doctorsCount: 7,
      features: ['Prótesis de Cadera y Rodilla', 'Artroscopía de Alta Precisión', 'Rehabilitación Integral']
    },
    {
      id: 'serv-4',
      name: 'Neurología & Neurocirugía',
      description: 'Microcirugía cerebral y espinal guiada por neuronavegación para patologías complejas del sistema nervioso.',
      iconKey: 'brain',
      bgColor: '#ede9fe',
      doctorsCount: 5,
      features: ['Neuronavegación Guiada por TAC', 'Monitoreo Neurofisiológico', 'Unidad de ACV / Ictus']
    },
    {
      id: 'serv-5',
      name: 'Pediatría & Cirugía Infantil',
      description: 'Atención cálida y especializada para neonatos, niños y adolescentes con quirófano pediátrico exclusivo.',
      iconKey: 'pediatrics',
      bgColor: '#fce7f3',
      doctorsCount: 6,
      features: ['UCI Neonatal y Pediátrica', 'Cirujanos Pediátricos de Turno', 'Entorno Lúdico Libre de Estrés']
    },
    {
      id: 'serv-6',
      name: 'Servicio de Emergencias 24/7',
      description: 'Tópicos de resucitación, shock trauma y ambulancias medicalizadas con respuesta inmediata.',
      iconKey: 'emergency',
      bgColor: '#fee2e2',
      doctorsCount: 12,
      features: ['Shock Trauma Equipado', 'Triage Manchester Digital', 'Tomógrafo Computarizado 128 Cortes']
    }
  ];

  // 4. Directorio de Médicos Especialistas (Paso 3 y 4 con inline styles)
  const doctorsDirectory = [
    {
      id: 'doc-1',
      name: 'Dr. Alejandro Morales Vega',
      specialty: 'Jefe de Cirugía Laparoscópica',
      cmp: '48920',
      rne: '23110',
      initials: 'AM',
      schedule: 'Lun - Vie (08:00 - 15:00)',
      available: true
    },
    {
      id: 'doc-2',
      name: 'Dra. Sofía Valenzuela Reyes',
      specialty: 'Cardiología Intervencionista',
      cmp: '51204',
      rne: '25881',
      initials: 'SV',
      schedule: 'Mar - Sáb (09:00 - 16:00)',
      available: true
    },
    {
      id: 'doc-3',
      name: 'Dr. Carlos Mendoza Alanya',
      specialty: 'Traumatología & Cirugía Articular',
      cmp: '43119',
      rne: '19442',
      initials: 'CM',
      schedule: 'Lun - Mié - Vie (10:00 - 18:00)',
      available: false
    },
    {
      id: 'doc-4',
      name: 'Dra. Elena Paredes Quispe',
      specialty: 'Medicina Intensiva & Cuidados Críticos',
      cmp: '54332',
      rne: '27903',
      initials: 'EP',
      schedule: 'Guardia Médica 24H Rotativa',
      available: true
    }
  ];

  // Desplazamiento suave hacia secciones
  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCatalog = (serviceName) => {
    setPreselectedSpecialty(serviceName);
    handleScrollToSection('appointments');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* 1. Barra de Navegación Institucional */}
      <Navbar
        onOpenTechnicalModal={() => setIsTechModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 2. Hero Section Principal */}
      <HeroSection
        onScheduleClick={() => handleScrollToSection('appointments')}
        onExploreClick={() => handleScrollToSection('dashboard')}
      />

      {/* 3. Panel de Operaciones y Telemetría Clínica (Dashboard con Props y Children) */}
      <main id="dashboard" style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', padding: '4.5rem 2rem 2rem' }}>
        <Dashboard metrics={clinicMetrics} department="Área Quirúrgica y Cuidados Críticos">
          {/* Secciones inyectadas mediante el patrón {children} */}
          
          {/* Hijo 1: Tabla de Triaje y Admisión de Urgencias */}
          <div className={dashboardStyles.cardPanel}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className={dashboardStyles.panelTitle} style={{ margin: 0 }}>
                <Users size={18} color="#0284c7" />
                Triaje y Admisión de Emergencias (En Tiempo Real)
              </h3>
              <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 700 }}>
                4 Pacientes Monitoreados
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className={dashboardStyles.patientsTable}>
                <thead>
                  <tr>
                    <th>Historia</th>
                    <th>Paciente</th>
                    <th>Triage</th>
                    <th>Signos Vitales</th>
                    <th>Especialista</th>
                    <th>Espera</th>
                  </tr>
                </thead>
                <tbody>
                  {triagePatients.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{p.id}</td>
                      <td><strong>{p.name}</strong> ({p.age} años)</td>
                      <td>
                        <span className={`
                          ${dashboardStyles.triagePill} 
                          ${p.triage === 'Crítico' ? dashboardStyles.triageCritical : p.triage === 'Urgente' ? dashboardStyles.triageUrgent : dashboardStyles.triageStable}
                        `}>
                          {p.triage}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.78rem', color: '#0284c7', fontFamily: 'var(--font-mono)' }}>{p.vitals}</td>
                      <td>{p.doc}</td>
                      <td><span style={{ fontWeight: 600 }}>{p.wait}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hijo 2: Ocupación Hospitalaria y Telemetría Cardíaca */}
          <div className={dashboardStyles.cardPanel}>
            <h3 className={dashboardStyles.panelTitle}>
              <BedDouble size={18} color="#6366f1" />
              Ocupación de Camas y Capacidad Operativa
            </h3>

            <div className={dashboardStyles.occupancyList}>
              <div className={dashboardStyles.occupancyItem}>
                <div className={dashboardStyles.occupancyLabel}>
                  <span>UCI Quirúrgica (Camas de Alta Complejidad)</span>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>88% Ocupado</span>
                </div>
                <div className={dashboardStyles.progressBarTrack}>
                  <div className={dashboardStyles.progressBarFill} style={{ width: '88%', background: '#ef4444' }} />
                </div>
              </div>

              <div className={dashboardStyles.occupancyItem}>
                <div className={dashboardStyles.occupancyLabel}>
                  <span>Pabellones Quirúrgicos en Operación</span>
                  <span style={{ color: '#f59e0b', fontWeight: 700 }}>75% Operativo</span>
                </div>
                <div className={dashboardStyles.progressBarTrack}>
                  <div className={dashboardStyles.progressBarFill} style={{ width: '75%', background: '#f59e0b' }} />
                </div>
              </div>

              <div className={dashboardStyles.occupancyItem}>
                <div className={dashboardStyles.occupancyLabel}>
                  <span>Salas de Recuperación Postoperatoria</span>
                  <span style={{ color: '#0284c7', fontWeight: 700 }}>64% Libre</span>
                </div>
                <div className={dashboardStyles.progressBarTrack}>
                  <div className={dashboardStyles.progressBarFill} style={{ width: '64%', background: '#0284c7' }} />
                </div>
              </div>

              <div className={dashboardStyles.occupancyItem}>
                <div className={dashboardStyles.occupancyLabel}>
                  <span>Camas de Observación de Urgencias</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>52% Normal</span>
                </div>
                <div className={dashboardStyles.progressBarTrack}>
                  <div className={dashboardStyles.progressBarFill} style={{ width: '52%', background: '#10b981' }} />
                </div>
              </div>
            </div>

            {/* Monitor de Ritmo Sinusal */}
            <div style={{
              marginTop: '1.25rem',
              padding: '0.85rem 1rem',
              background: '#0f172a',
              borderRadius: '12px',
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Heart size={18} className="animate-heartbeat" color="#ef4444" />
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  Telemetría UCI Central: <strong>74 BPM</strong>
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.2)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
                RITMO SINUSAL NORMAL
              </span>
            </div>
          </div>
        </Dashboard>
      </main>

      {/* 4. Catálogo de Especialidades Quirúrgicas y Médicas */}
      <ServicesSection
        services={servicesCatalog}
        onSelectService={handleSelectServiceFromCatalog}
      />

      {/* 5. Directorio de Especialistas Médicos */}
      <DoctorsSection
        doctors={doctorsDirectory}
        onBookDoctor={(name, spec) => {
          setPreselectedSpecialty(spec);
          handleScrollToSection('appointments');
        }}
      />

      {/* 6. Formulario de Citas y Triaje Digital */}
      <AppointmentSection
        selectedSpecialty={preselectedSpecialty}
      />

      {/* 7. Modal de Auditoría Técnica de los 5 Pasos Arquitectónicos */}
      <TechnicalArchitectureModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
      />

      {/* 8. Footer Institucional con la firma requerida */}
      <Footer />
    </div>
  );
}
