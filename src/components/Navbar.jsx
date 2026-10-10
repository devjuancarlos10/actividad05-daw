import React from 'react';
import styles from '../styles/Navbar.module.css';
import { HeartPulse, PhoneCall, Calendar, Code2, Clock, MapPin } from 'lucide-react';

/**
 * Componente Navbar de la Clínica Quirúrgica MediCare.
 * Implementa SRP y CSS Modules para encapsulamiento total.
 * 
 * @param {Object} props
 * @param {Function} props.onOpenTechnicalModal - Callback para abrir la auditoría de los 5 pasos arquitectónicos.
 * @param {Function} props.onScrollToSection - Función para desplazarse a las secciones clínicas.
 */
export default function Navbar({ onOpenTechnicalModal, onScrollToSection }) {
  return (
    <header className={styles.navWrapper}>
      {/* Barra superior con datos de urgencias y ubicación */}
      <div className={styles.topBar}>
        <div className={styles.topBarInfo}>
          <div className={styles.topBarItem}>
            <Clock size={13} color="#38bdf8" />
            <span>Servicio de Urgencias: <strong>24 Horas / 365 Días</strong></span>
          </div>
          <div className={styles.topBarItem}>
            <MapPin size={13} color="#38bdf8" />
            <span>Av. Huancavelica 1420, Huancayo - Perú</span>
          </div>
        </div>

        <div className={styles.topBarInfo}>
          <div className={styles.topBarItem}>
            <PhoneCall size={13} color="#22c55e" />
            <span>Central Telefónica: <strong>(064) 482-900</strong></span>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div className={styles.navContainer}>
        <div className={styles.brand} onClick={() => onScrollToSection('hero')}>
          <div className={styles.logoIcon}>
            <HeartPulse size={26} className="animate-heartbeat" />
          </div>
          <div className={styles.brandTexts}>
            <span className={styles.brandName}>
              MediCare San Lucas
              <span className={styles.brandBadge}>NIVEL IV</span>
            </span>
            <span className={styles.brandTagline}>Centro Quirúrgico de Alta Especialidad</span>
          </div>
        </div>

        <nav>
          <ul className={styles.navMenu}>
            <li>
              <a className={styles.navLink} onClick={() => onScrollToSection('hero')}>
                Inicio
              </a>
            </li>
            <li>
              <a className={styles.navLink} onClick={() => onScrollToSection('dashboard')}>
                Operaciones Clínicas
              </a>
            </li>
            <li>
              <a className={styles.navLink} onClick={() => onScrollToSection('services')}>
                Especialidades
              </a>
            </li>
            <li>
              <a className={styles.navLink} onClick={() => onScrollToSection('doctors')}>
                Staff Médico
              </a>
            </li>
            <li>
              <a className={styles.navLink} onClick={() => onScrollToSection('appointments')}>
                Citas y Triaje
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.navActions}>
          {/* Botón para ver la verificación técnica de los 5 pasos requeridos */}
          <button 
            onClick={onOpenTechnicalModal}
            className={styles.btnTechnical}
            title="Verificar los 5 Pasos Técnicos de la Guía"
          >
            <Code2 size={15} color="#0284c7" />
            <span>Ficha Técnica (5 Pasos)</span>
          </button>

          <button 
            className={styles.btnEmergency}
            onClick={() => onScrollToSection('appointments')}
          >
            <PhoneCall size={14} />
            <span>SOS Urgencias</span>
          </button>

          <button 
            className={styles.btnAppointment}
            onClick={() => onScrollToSection('appointments')}
          >
            <Calendar size={15} />
            <span>Agendar Cita</span>
          </button>
        </div>
      </div>
    </header>
  );
}
