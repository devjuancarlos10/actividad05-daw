import React, { useState } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import MetricCard from './MetricCard';
import styles from '../styles/Dashboard.module.css';
import { 
  X, Activity, Heart, Stethoscope, Users, BedDouble, 
  Clock, ShieldAlert, CheckCircle2, AlertTriangle, ArrowLeft 
} from 'lucide-react';

export default function FullClinicDashboardModal({ isOpen, onClose, metrics = [] }) {
  const [selectedDept, setSelectedDept] = useState('Urgencias & Cuidados Críticos');

  if (!isOpen) return null;

  // Lista de pacientes en triaje de urgencias
  const patientsQueue = [
    { id: 'PAC-1042', name: 'Carmen Salazar V.', age: 54, triage: 'Crítico', dept: 'UCI Quirúrgica', doc: 'Dr. Mendoza', wait: '2 min', vitals: 'SpO2 88% - TA 150/95' },
    { id: 'PAC-1043', name: 'Roberto Huamán G.', age: 41, triage: 'Urgente', dept: 'Traumatología', doc: 'Dra. Paredes', wait: '11 min', vitals: 'SpO2 97% - TA 130/85' },
    { id: 'PAC-1044', name: 'Lucía Fernández M.', age: 29, triage: 'Urgente', dept: 'Cardiología', doc: 'Dr. Quispe', wait: '14 min', vitals: 'SpO2 98% - TA 120/80' },
    { id: 'PAC-1045', name: 'Eduardo Córdova P.', age: 67, triage: 'Estable', dept: 'Medicina General', doc: 'Dra. Rojas', wait: '28 min', vitals: 'SpO2 99% - TA 118/75' }
  ];

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
      animation: 'fadeIn 0.25s ease'
    }}>
      <div style={{
        background: '#f8fafc',
        width: '100%',
        maxWidth: '1240px',
        maxHeight: '92vh',
        borderRadius: '20px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Barra superior de navegacion de la modal */}
        <div style={{
          padding: '1rem 1.75rem',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>Volver a la Guía Arquitectónica</span>
            </button>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
              Vista Completa Integrada: Sistema Clínico Quirúrgico
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '8px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Contenido scrolleable del Dashboard */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header Institucional */}
          <Header
            title="MediCare San Lucas"
            subtitle="Plataforma de Operaciones Quirúrgicas y Hospitalarias Integrada"
          />

          {/* Selector de Departamento */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            background: '#ffffff',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
              Filtrar Servicio Médico:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Urgencias & Cuidados Críticos', 'Quirófano Central', 'Unidad de Quemados', 'Hospitalización'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    border: selectedDept === dept ? '1px solid #0284c7' : '1px solid #e2e8f0',
                    background: selectedDept === dept ? '#e0f2fe' : '#ffffff',
                    color: selectedDept === dept ? '#0284c7' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard con Metrics y Children */}
          <Dashboard metrics={metrics} department={selectedDept}>
            {/* 1. Tabla de Triaje de Pacientes (Children Slot 1) */}
            <div className={styles.cardPanel}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className={styles.panelTitle} style={{ margin: 0 }}>
                  <Users size={18} color="#0284c7" />
                  Triaje y Admisión de Emergencias
                </h3>
                <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                  4 Pacientes en Espera
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className={styles.patientsTable}>
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Paciente</th>
                      <th>Triage</th>
                      <th>Signos Vitales</th>
                      <th>Especialista</th>
                      <th>Espera</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientsQueue.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{p.id}</td>
                        <td><strong>{p.name}</strong> ({p.age} años)</td>
                        <td>
                          <span className={`
                            ${styles.triagePill} 
                            ${p.triage === 'Crítico' ? styles.triageCritical : p.triage === 'Urgente' ? styles.triageUrgent : styles.triageStable}
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

            {/* 2. Monitor de Camas UCI & Telemetría (Children Slot 2) */}
            <div className={styles.cardPanel}>
              <h3 className={styles.panelTitle}>
                <BedDouble size={18} color="#6366f1" />
                Ocupación Hospitalaria en Tiempo Real
              </h3>

              <div className={styles.occupancyList}>
                <div>
                  <div className={styles.occupancyLabel}>
                    <span>UCI Quirúrgica (Camas Críticas)</span>
                    <span style={{ color: '#ef4444', fontWeight: 700 }}>88% Ocupado</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div className={styles.progressBarFill} style={{ width: '88%', background: '#ef4444' }} />
                  </div>
                </div>

                <div>
                  <div className={styles.occupancyLabel}>
                    <span>Quirófanos Activos (Cirugías)</span>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>75% Operativo</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div className={styles.progressBarFill} style={{ width: '75%', background: '#f59e0b' }} />
                  </div>
                </div>

                <div>
                  <div className={styles.occupancyLabel}>
                    <span>Sala de Observación Urgencias</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>52% Normal</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div className={styles.progressBarFill} style={{ width: '52%', background: '#10b981' }} />
                  </div>
                </div>

                <div>
                  <div className={styles.occupancyLabel}>
                    <span>Pabellón de Recuperación Post-Op</span>
                    <span style={{ color: '#0284c7', fontWeight: 700 }}>64% Disponible</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div className={styles.progressBarFill} style={{ width: '64%', background: '#0284c7' }} />
                  </div>
                </div>
              </div>

              {/* Monitor ECG en vivo */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.85rem',
                background: '#0f172a',
                borderRadius: '10px',
                color: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart size={18} className="animate-heartbeat" color="#ef4444" />
                  <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                    Frecuencia Cardíaca Promedio: <strong>74 BPM</strong>
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                  RITMO SINUSAL
                </span>
              </div>
            </div>
          </Dashboard>
        </div>
      </div>
    </div>
  );
}
