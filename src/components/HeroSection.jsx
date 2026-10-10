import React from 'react';
import styles from '../styles/HeroSection.module.css';
import { 
  ShieldCheck, HeartPulse, Stethoscope, ArrowRight, 
  Calendar, Activity, Award, UserCheck 
} from 'lucide-react';

/**
 * Componente HeroSection para la portada institucional de la clínica.
 * Cumple con principios de semántica HTML5 y estilado encapsulado con CSS Modules.
 * 
 * @param {Object} props
 * @param {Function} props.onScheduleClick - Callback para ir al agendamiento.
 * @param {Function} props.onExploreClick - Callback para explorar el dashboard clínico.
 */
export default function HeroSection({ onScheduleClick, onExploreClick }) {
  return (
    <section className={styles.heroContainer} id="hero">
      <div className={styles.heroContent}>
        {/* Lado izquierdo: Textos y llamadas a la acción */}
        <div>
          <div className={styles.heroBadge}>
            <ShieldCheck size={16} />
            <span>Acreditación Internacional en Cirugía de Alta Precisión</span>
          </div>

          <h1 className={styles.title}>
            Medicina Avanzada, <br />
            <span className={styles.titleGradient}>Cuidado Humano Excepcional.</span>
          </h1>

          <p className={styles.description}>
            En <strong>MediCare San Lucas</strong> combinamos tecnología quirúrgica laparoscópica de última generación con los especialistas más reconocidos del país. Brindamos atención médica inmediata, diagnósticos precisos y cuidados intensivos continuos 24/7.
          </p>

          <div className={styles.ctaGroup}>
            <button onClick={onScheduleClick} className={styles.primaryCta}>
              <Calendar size={18} />
              <span>Reservar Cita Médica</span>
              <ArrowRight size={16} />
            </button>

            <button onClick={onExploreClick} className={styles.secondaryCta}>
              <Activity size={18} color="#0284c7" />
              <span>Ver Telemetría en Vivo</span>
            </button>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>+28,500</span>
              <span className={styles.trustLabel}>Pacientes Recuperados</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>99.4%</span>
              <span className={styles.trustLabel}>Cirugías Exitosas</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>45+</span>
              <span className={styles.trustLabel}>Médicos Especialistas</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>14 min</span>
              <span className={styles.trustLabel}>Espera en Urgencias</span>
            </div>
          </div>
        </div>

        {/* Lado derecho: Tarjeta visual de telemetría médica en vivo */}
        <div className={styles.visualCard}>
          <div className={styles.cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7'
              }}>
                <HeartPulse size={22} className="animate-heartbeat" />
              </div>
              <div>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Monitor Quirúrgico Central
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Quirófano 04 - Torre Laparoscópica 4K
                </span>
              </div>
            </div>

            <div className={styles.cardStatusPill}>
              <span className="animate-pulse-glow" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span>En Operación</span>
            </div>
          </div>

          <div className={styles.vitalSignsBox}>
            <div className={styles.vitalsRow}>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Frecuencia Cardíaca
                </div>
                <div className={styles.vitalsValue}>
                  72 <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>BPM</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Saturación SpO2
                </div>
                <div className={styles.vitalsValue} style={{ color: '#34d399' }}>
                  99%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Presión Arterial
                </div>
                <div className={styles.vitalsValue} style={{ color: '#f8fafc' }}>
                  120/80
                </div>
              </div>
            </div>

            <div className={styles.ecgLine}>
              <span className="animate-pulse">▲▼▲─── RITMO SINUSAL ESTABLE ───▲▼▲</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: '#475569',
            paddingTop: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <UserCheck size={16} color="#0284c7" />
              <span>Cirujano: <strong>Dr. Alejandro Morales</strong></span>
            </div>
            <span style={{ fontWeight: 700, color: '#10b981' }}>Tiempo: 01:24:10</span>
          </div>

          {/* Badge flotante inferior */}
          <div className={styles.floatingMiniCard}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669'
            }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
                Cero Infecciones Nosocomiales
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Certificación ISO 9001:2015 en Esterilización
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
