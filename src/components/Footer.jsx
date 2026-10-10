import React from 'react';
import styles from '../styles/Footer.module.css';
import { HeartPulse, PhoneCall, Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';

/**
 * Componente Footer de la Clínica Quirúrgica.
 * Contiene la información institucional del centro médico y la firma requerida.
 */
export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <div className={styles.gridContent}>
          {/* Columna 1: Identidad Institucional */}
          <div className={styles.brandCol}>
            <div className={styles.brandLogo}>
              <HeartPulse size={28} color="#38bdf8" />
              <span className={styles.brandName}>MediCare San Lucas</span>
            </div>
            <p className={styles.tagline}>
              Complejo Quirúrgico de Alta Especialidad y Cuidados Críticos. Brindando atención médica de excelencia con tecnología de vanguardia y calidez humana.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>
              <ShieldCheck size={16} />
              <span>Acreditación Médica Nivel IV - MINSA / SUSALUD</span>
            </div>
          </div>

          {/* Columna 2: Especialidades */}
          <div>
            <h4 className={styles.footerTitle}>Especialidades</h4>
            <ul className={styles.footerList}>
              <li><a href="#services">Cirugía Laparoscópica</a></li>
              <li><a href="#services">Cardiología Intervencionista</a></li>
              <li><a href="#services">Traumatología &amp; Artroscopía</a></li>
              <li><a href="#services">Neurocirugía de Precisión</a></li>
              <li><a href="#services">Cuidados Intensivos UCI</a></li>
              <li><a href="#services">Emergencias Pediátricas</a></li>
            </ul>
          </div>

          {/* Columna 3: Servicios Hospitalarios */}
          <div>
            <h4 className={styles.footerTitle}>Servicios 24/7</h4>
            <ul className={styles.footerList}>
              <li><a href="#dashboard">Telemetría Quirúrgica</a></li>
              <li><a href="#appointments">Triaje y Admisión Rápida</a></li>
              <li><a href="#doctors">Directorio de Médicos</a></li>
              <li><a href="#services">Laboratorio de Urgencia</a></li>
              <li><a href="#services">Banco de Sangre Certificado</a></li>
              <li><a href="#services">Diagnóstico por Imágenes 3T</a></li>
            </ul>
          </div>

          {/* Columna 4: Contacto & Emergencias */}
          <div>
            <h4 className={styles.footerTitle}>Contacto Clínico</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} color="#38bdf8" />
                <span>Av. Huancavelica 1420, Huancayo</span>
              </div>
              <div className={styles.contactItem}>
                <PhoneCall size={16} color="#22c55e" />
                <span>Central: (064) 482-900 / SOS: 106</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} color="#38bdf8" />
                <span>urgencias@clinicasanlucas.pe</span>
              </div>
              <div className={styles.contactItem}>
                <Clock size={16} color="#f59e0b" />
                <span>Emergencias: Abierto las 24 horas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior de Copyright y Firma del Alumno */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} MediCare San Lucas S.A.C. Todos los derechos reservados.
          </div>

          {/* Firma requerida por el usuario */}
          <div className={styles.developerCredit}>
            JUAN CARLOS CHAHUAYO MARTINEZ 9NO FIS-UNCP
          </div>
        </div>
      </div>
    </footer>
  );
}
