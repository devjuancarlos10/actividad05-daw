import React from 'react';
import styles from '../styles/ServicesSection.module.css';
import { 
  Heart, Scissors, Bone, Brain, Baby, 
  ShieldAlert, Check, ArrowRight 
} from 'lucide-react';

const ICON_COMPONENTS = {
  heart: <Heart size={26} color="#0284c7" />,
  surgery: <Scissors size={26} color="#0d9488" />,
  bone: <Bone size={26} color="#f59e0b" />,
  brain: <Brain size={26} color="#6366f1" />,
  pediatrics: <Baby size={26} color="#ec4899" />,
  emergency: <ShieldAlert size={26} color="#ef4444" />
};

/**
 * Componente ServicesSection para catálogo de especialidades clínicas.
 * Recibe lista de servicios por props de forma inmutable.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.services - Especialidades médicas provistas por el orquestador.
 * @param {Function} [props.onSelectService] - Callback para seleccionar una especialidad al agendar cita.
 */
export default function ServicesSection({ services = [], onSelectService }) {
  return (
    <section className={styles.sectionWrapper} id="services">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <span>Especialidades Médicas</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Servicios de Alta Complejidad Quirúrgica
        </h2>
        <p className={styles.sectionDescription}>
          Contamos con tecnología diagnóstica de última generación y pabellones quirúrgicos inteligentes certificados para procedimientos de mínima invasión.
        </p>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <article key={service.id} className={styles.serviceCard}>
            <div>
              <div 
                className={styles.iconContainer} 
                style={{ backgroundColor: service.bgColor || '#f0f9ff' }}
              >
                {ICON_COMPONENTS[service.iconKey] || <Heart size={26} />}
              </div>

              <h3 className={styles.serviceTitle}>{service.name}</h3>
              <p className={styles.serviceDesc}>{service.description}</p>

              <ul className={styles.serviceFeatures}>
                {service.features.map((feat, index) => (
                  <li key={index} className={styles.featureItem}>
                    <Check size={14} color="#10b981" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.cardFooter}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                {service.doctorsCount} Especialistas activos
              </span>

              <button 
                onClick={() => onSelectService && onSelectService(service.name)}
                className={styles.btnDetails}
              >
                <span>Agendar Consulta</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
