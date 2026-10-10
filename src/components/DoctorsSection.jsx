import React from 'react';
import styles from '../styles/DoctorsSection.module.css';
import { Award, Calendar, CheckCircle2, Clock } from 'lucide-react';

/**
 * Componente DoctorsSection para el directorio médico.
 * Demuestra el flujo unidireccional de datos y estilos inline dinámicos condicionales.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.doctors - Lista inmutable de médicos especialistas.
 * @param {Function} [props.onBookDoctor] - Callback al pulsar agendar con un médico.
 */
export default function DoctorsSection({ doctors = [], onBookDoctor }) {
  return (
    <section className={styles.sectionWrapper} id="doctors">
      <div className={styles.innerContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerText}>
            <div className={styles.badge}>
              <Award size={15} />
              <span>Cuerpo Médico Certificado</span>
            </div>
            <h2 className={styles.title}>
              Especialistas Quirúrgicos y Consultores
            </h2>
            <p className={styles.subtitle}>
              Médicos con subespecialidades internacionales, miembros de colegios médicos y sociedades científicas de vanguardia.
            </p>
          </div>
        </div>

        <div className={styles.doctorsGrid}>
          {doctors.map((doc) => {
            // Estilo inline dinámico basado en el estado en tiempo real (Paso 4)
            const statusColor = doc.available ? '#10b981' : '#f59e0b';
            const statusBg = doc.available ? '#ecfdf5' : '#fffbeb';

            return (
              <article key={doc.id} className={styles.doctorCard}>
                <div className={styles.cardTop}>
                  <div className={styles.avatar}>
                    {doc.initials}
                  </div>
                  <div className={styles.docInfo}>
                    <h3 className={styles.docName}>{doc.name}</h3>
                    <span className={styles.docSpecialty}>{doc.specialty}</span>
                    <span className={styles.docCmp}>CMP: {doc.cmp} | RNE: {doc.rne}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.hospitalDept}>
                    <Clock size={14} color="#64748b" />
                    <span>Turno: <strong>{doc.schedule}</strong></span>
                  </div>

                  <div>
                    {/* Badge con Inline Style Dinámico */}
                    <span 
                      className={styles.availabilityBadge}
                      style={{ color: statusColor, backgroundColor: statusBg }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
                      {doc.available ? 'Consultas Disponibles Hoy' : 'En Quirófano / Próximo Turno'}
                    </span>
                  </div>
                </div>

                <div className={styles.cardAction}>
                  <button 
                    onClick={() => onBookDoctor && onBookDoctor(doc.name, doc.specialty)}
                    className={styles.btnSchedule}
                  >
                    <Calendar size={14} />
                    <span>Solicitar Consulta</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
