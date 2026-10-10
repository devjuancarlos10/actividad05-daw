import React from 'react';
import styles from '../styles/MetricCard.module.css';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Componente MetricCard para indicadores clínicos críticos.
 * Implementa CSS Modules para scope aislado y soporta composición mediante children.
 * Las props son inmutables de acuerdo con el principio de flujo unidireccional de React.
 *
 * @param {Object} props
 * @param {string} props.title - Nombre del indicador clínico.
 * @param {string|number} props.value - Cifra numérica o estadística médica.
 * @param {string} props.change - Variación porcentual o comparativa vs período previo.
 * @param {'up' | 'down' | 'neutral'} props.trend - Dirección de la tendencia clínica.
 * @param {React.ReactNode} [props.icon] - Ícono de especialidad médica.
 * @param {string} [props.unit] - Unidad clínica complementaria (ej. min, %, pacientes).
 * @param {string} [props.dynamicColor] - Color para estilo inline dinámico (demostración Paso 4).
 * @param {React.ReactNode} [props.children] - Contenido anidado compuesto mediante el patrón children.
 */
export default function MetricCard({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  unit,
  dynamicColor,
  children
}) {
  // Selector dinámico de clase de tendencia
  let trendClass = styles.trendNeutral;
  let TrendIcon = Minus;

  if (trend === 'up') {
    trendClass = styles.trendUp;
    TrendIcon = TrendingUp;
  } else if (trend === 'down') {
    trendClass = styles.trendDown;
    TrendIcon = TrendingDown;
  }

  // Estilo inline dinámico reservado exclusivamente para valores en tiempo de ejecución
  const dynamicCardStyle = dynamicColor ? { borderTopColor: dynamicColor } : {};

  return (
    <article className={styles.card} style={dynamicCardStyle}>
      <div className={styles.accentBar} />

      <div className={styles.cardHeader}>
        <div className={styles.titleContainer}>
          {icon && <div className={styles.iconWrapper}>{icon}</div>}
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div 
          className={styles.statusIndicator} 
          style={{ backgroundColor: dynamicColor || (trend === 'up' ? '#10b981' : '#0284c7') }}
        />
      </div>

      <div className={styles.valueContainer}>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>

      <div className={styles.cardFooter}>
        <div className={`${styles.trendBadge} ${trendClass}`}>
          <TrendIcon size={14} />
          <span>{change}</span>
        </div>
        <span className={styles.subtext}>vs mes anterior</span>
      </div>

      {/* Renderizado condicional del patrón children para composición flexible */}
      {children && (
        <div className={styles.childrenSlot}>
          {children}
        </div>
      )}
    </article>
  );
}
