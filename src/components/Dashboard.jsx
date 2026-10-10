import React from 'react';
import MetricCard from './MetricCard';
import styles from '../styles/Dashboard.module.css';
import { Activity, Stethoscope, BedDouble, Users, HeartPulse } from 'lucide-react';

/**
 * Mapeo de íconos clínicos para asociar a los indicadores
 */
const ICON_MAP = {
  users: <Users size={20} color="#0284c7" />,
  surgery: <Stethoscope size={20} color="#0d9488" />,
  time: <Activity size={20} color="#f59e0b" />,
  satisfaction: <HeartPulse size={20} color="#10b981" />,
  beds: <BedDouble size={20} color="#6366f1" />
};

/**
 * Componente Contenedor del Dashboard Clínico.
 * Implementa el patrón de paso de props hacia componentes hijos y el patrón de composición {children}.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.metrics - Lista estructurada de métricas hospitalarias recibidas desde App.jsx.
 * @param {string} [props.department="Área Quirúrgica y Cuidados Críticos"] - Departamento médico activo.
 * @param {React.ReactNode} [props.children] - Componentes adicionales inyectados como hijos (composición).
 */
export default function Dashboard({ 
  metrics = [], 
  department = "Área Quirúrgica y Cuidados Críticos",
  children 
}) {
  return (
    <section className={styles.dashboardContainer}>
      {/* Encabezado del panel de telemetría médica */}
      <div className={styles.dashboardHeader}>
        <div className={styles.titleArea}>
          <h2 className={styles.heading}>
            <Activity size={22} color="#0284c7" />
            Panel de Operaciones Clínicas: {department}
          </h2>
          <p className={styles.subheading}>
            Datos consolidados en tiempo real mediante arquitectura React unidireccional
          </p>
        </div>

        <div className={styles.telemetryTag}>
          <span className="animate-pulse-glow" style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
          <span>Telemetría en Vivo (99.98% Uptime)</span>
        </div>
      </div>

      {/* Grid de MetricCards recibiendo datos por Props */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id || metric.title}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            change={metric.change}
            trend={metric.trend}
            icon={ICON_MAP[metric.iconKey] || <Activity size={20} />}
            dynamicColor={metric.dynamicColor}
          />
        ))}
      </div>
      {/* Renderizado de secciones compuestas pasadas mediante children */}
      {children && (
        <div className={styles.childrenSection}>
          {children}
        </div>
      )}
    </section>
  );
}
