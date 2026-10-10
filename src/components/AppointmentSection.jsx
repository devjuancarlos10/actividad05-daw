import React, { useState } from 'react';
import styles from '../styles/AppointmentSection.module.css';
import { Calendar, Clock, CheckCircle2, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';

/**
 * Componente AppointmentSection para el agendamiento y triaje digital.
 * 
 * @param {Object} props
 * @param {string} [props.selectedSpecialty] - Especialidad preseleccionada desde otra sección.
 * @param {string} [props.selectedDoctor] - Médico preseleccionado.
 */
export default function AppointmentSection({ selectedSpecialty = '', selectedDoctor = '' }) {
  const [formData, setFormData] = useState({
    patientName: '',
    dni: '',
    phone: '',
    specialty: selectedSpecialty || 'Cirugía General y Laparoscópica',
    date: '',
    triageLevel: 'prioritaria'
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone) return;

    const ticketCode = `MED-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket({
      code: ticketCode,
      name: formData.patientName,
      specialty: formData.specialty,
      date: formData.date || 'Atención Inmediata / Hoy'
    });
  };

  return (
    <section className={styles.sectionWrapper} id="appointments">
      <div className={styles.cardContainer}>
        {/* Columna Izquierda: Información de Urgencia & Citas */}
        <div className={styles.leftInfo}>
          <div>
            <div className={styles.badge}>
              <HeartPulse size={14} />
              <span>Admisión Rápida &amp; Triaje Digital</span>
            </div>

            <h2 className={styles.title}>
              Agenda tu Consulta o Procedimiento Quirúrgico
            </h2>

            <p className={styles.desc}>
              Accede a atención especializada con mínima espera. Nuestro sistema digital prioriza pacientes según la gravedad clínica y garantiza citas puntuales con el especialista que necesitas.
            </p>

            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <Clock size={16} />
                </div>
                <div>
                  <strong>Confirmación Inmediata por SMS / WhatsApp</strong>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Recordatorios automáticos 2 horas antes de tu turno
                  </div>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Historia Clínica Digital Unificada</strong>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Tus exámenes de laboratorio y tomografías en tu expediente
                  </div>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <strong>Convenios con Todas las Aseguradoras EPS</strong>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Rímac, Pacífico, Mapfre, Sanitas y La Positiva
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <div className={styles.formCard}>
          {submittedTicket ? (
            <div className={styles.successBox}>
              <CheckCircle2 size={44} color="#059669" style={{ margin: '0 auto 0.75rem' }} />
              <h3 className={styles.successTitle}>¡Cita Médica Registrada con Éxito!</h3>
              <p style={{ fontSize: '0.84rem', color: '#475569', margin: '0 0 0.5rem 0' }}>
                Estimado(a) <strong>{submittedTicket.name}</strong>, tu ticket de atención clínica es:
              </p>
              
              <div className={styles.ticketNumber}>
                {submittedTicket.code}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'left', background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #d1fae5', margin: '0.75rem 0' }}>
                <div><strong>Especialidad:</strong> {submittedTicket.specialty}</div>
                <div><strong>Fecha Programada:</strong> {submittedTicket.date}</div>
                <div><strong>Ubicación:</strong> Consultorios Torre A - Piso 2</div>
              </div>

              <button
                onClick={() => setSubmittedTicket(null)}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem 1.25rem',
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Agendar Otra Cita
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>Formulario de Reserva Clínica</h3>
              <p className={styles.formSubtitle}>
                Completa los datos del paciente para agendar en menos de 1 minuto
              </p>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Nombres y Apellidos</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Carlos Quispe"
                    className={styles.input}
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>DNI / Carnet Extranjería</label>
                  <input
                    type="text"
                    required
                    placeholder="8 dígitos"
                    maxLength={8}
                    className={styles.input}
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Teléfono Móvil</label>
                  <input
                    type="tel"
                    required
                    placeholder="999-000-000"
                    className={styles.input}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Especialidad Médica</label>
                  <select
                    className={styles.select}
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  >
                    <option value="Cirugía General y Laparoscópica">Cirugía General & Laparoscópica</option>
                    <option value="Cardiología & Cirugía Cardiovascular">Cardiología & Hemodinámica</option>
                    <option value="Traumatología & Ortopedia">Traumatología & Ortopedia</option>
                    <option value="Neurología & Neurocirugía">Neurología & Neurocirugía</option>
                    <option value="Pediatría & Neonatología">Pediatría Quirúrgica</option>
                    <option value="Medicina de Emergencias">Medicina de Urgencias 24/7</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Fecha Preferida</label>
                  <input
                    type="date"
                    className={styles.input}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Nivel de Prioridad / Triaje</label>
                  <select
                    className={styles.select}
                    value={formData.triageLevel}
                    onChange={(e) => setFormData({ ...formData, triageLevel: e.target.value })}
                  >
                    <option value="estable">Consulta Regular (Sin Urgencia)</option>
                    <option value="prioritaria">Prioritaria (Dolor Moderado)</option>
                    <option value="urgente">Urgente (Requiere Atención Inmediata)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className={styles.btnSubmit}>
                <Calendar size={18} />
                <span>Confirmar Reserva de Cita</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
