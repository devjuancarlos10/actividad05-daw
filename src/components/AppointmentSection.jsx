import React, { useState, useEffect } from 'react';
import styles from '../styles/AppointmentSection.module.css';
import { 
  Calendar, Clock, CheckCircle2, ShieldCheck, HeartPulse, 
  Sparkles, AlertCircle, Trash2, PlusCircle, User, Phone, FileText, ClipboardList 
} from 'lucide-react';

const STORAGE_KEY = 'medicare_appointments_db';

// Datos de ejemplo iniciales (almacenados silenciosamente en el navegador)
const DEFAULT_APPOINTMENTS = [
  {
    id: 'MED-7821',
    patientName: 'Rosa Melgar Torres',
    dni: '45892110',
    phone: '964112233',
    specialty: 'Cardiología & Hemodinámica',
    date: '2026-10-12',
    triageLevel: 'prioritaria',
    createdAt: '10/10/2026, 08:30 AM'
  },
  {
    id: 'MED-6542',
    patientName: 'Jorge Páucar Rivera',
    dni: '72334419',
    phone: '988554411',
    specialty: 'Cirugía General y Laparoscópica',
    date: '2026-10-14',
    triageLevel: 'estable',
    createdAt: '10/10/2026, 09:15 AM'
  }
];

/**
 * Componente AppointmentSection con validaciones estrictas y persistencia continua.
 * 
 * @param {Object} props
 * @param {string} [props.selectedSpecialty] - Especialidad preseleccionada.
 * @param {Function} [props.onAppointmentCreated] - Notificación hacia el orquestador.
 */
export default function AppointmentSection({ selectedSpecialty = '', onAppointmentCreated }) {
  // Pestaña activa: 'form' o 'list'
  const [activeTab, setActiveTab] = useState('form');

  // Estado del formulario
  const [formData, setFormData] = useState({
    patientName: '',
    dni: '',
    phone: '',
    specialty: selectedSpecialty || 'Cirugía General y Laparoscópica',
    date: '',
    triageLevel: 'prioritaria'
  });

  // Estado de errores de validación
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Citas almacenadas
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Obtener fecha mínima (hoy) para el selector de fecha
  const todayStr = new Date().toISOString().split('T')[0];

  // Cargar datos silenciosamente al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAppointmentsList(JSON.parse(stored));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_APPOINTMENTS));
        setAppointmentsList(DEFAULT_APPOINTMENTS);
      }
    } catch (e) {
      setAppointmentsList(DEFAULT_APPOINTMENTS);
    }
  }, []);

  // Actualizar especialidad si cambia desde el exterior
  useEffect(() => {
    if (selectedSpecialty) {
      setFormData((prev) => ({ ...prev, specialty: selectedSpecialty }));
    }
  }, [selectedSpecialty]);

  // Función de validación de campos
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'patientName':
        if (!value.trim()) {
          error = 'Nombres y apellidos son obligatorios.';
        } else if (value.trim().length < 3) {
          error = 'Mínimo 3 caracteres requeridos.';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = 'Solo se permiten letras y espacios (sin números ni símbolos).';
        }
        break;

      case 'dni':
        if (!value) {
          error = 'El DNI es obligatorio.';
        } else if (!/^\d{8}$/.test(value)) {
          error = 'El DNI debe tener exactamente 8 dígitos numéricos.';
        }
        break;

      case 'phone':
        if (!value) {
          error = 'El número celular es obligatorio.';
        } else if (!/^9\d{8}$/.test(value)) {
          error = 'Debe empezar con 9 y tener 9 dígitos (ej. 987654321).';
        }
        break;

      case 'date':
        if (!value) {
          error = 'Debes seleccionar una fecha para la cita.';
        } else if (value < todayStr) {
          error = 'La fecha de la cita no puede ser anterior a hoy.';
        }
        break;

      case 'specialty':
        if (!value) {
          error = 'Selecciona una especialidad médica.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Manejar cambios en campos con validación en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Restricciones de entrada para números en DNI y Teléfono
    if (name === 'dni') {
      sanitizedValue = value.replace(/\D/g, '').slice(0, 8);
    } else if (name === 'phone') {
      sanitizedValue = value.replace(/\D/g, '').slice(0, 9);
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    // Validar si el campo ya fue tocado
    if (touched[name]) {
      const err = validateField(name, sanitizedValue);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // Envío del formulario con validación integral
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      patientName: validateField('patientName', formData.patientName),
      dni: validateField('dni', formData.dni),
      phone: validateField('phone', formData.phone),
      date: validateField('date', formData.date),
      specialty: validateField('specialty', formData.specialty)
    };

    setErrors(newErrors);
    setTouched({
      patientName: true,
      dni: true,
      phone: true,
      date: true,
      specialty: true,
      triageLevel: true
    });

    const hasErrors = Object.values(newErrors).some((err) => Boolean(err));
    if (hasErrors) return;

    // Generar nuevo registro de cita
    const ticketCode = `MED-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newAppointment = {
      id: ticketCode,
      patientName: formData.patientName.trim(),
      dni: formData.dni,
      phone: formData.phone,
      specialty: formData.specialty,
      date: formData.date,
      triageLevel: formData.triageLevel,
      createdAt: formattedDate
    };

    // Guardar silenciosamente
    const updated = [newAppointment, ...appointmentsList];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setAppointmentsList(updated);
    } catch (err) {
      console.error(err);
    }

    if (onAppointmentCreated) {
      onAppointmentCreated(newAppointment);
    }

    setSubmittedTicket(newAppointment);

    setFormData({
      patientName: '',
      dni: '',
      phone: '',
      specialty: selectedSpecialty || 'Cirugía General y Laparoscópica',
      date: '',
      triageLevel: 'prioritaria'
    });
    setTouched({});
    setErrors({});
  };

  // Eliminar cita de la lista
  const handleDeleteAppointment = (idToDelete) => {
    const updated = appointmentsList.filter((item) => item.id !== idToDelete);
    setAppointmentsList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
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
              Accede a atención especializada con verificación médica en tiempo real. Nuestro sistema asigna de inmediato el turno y médico de guardia según la prioridad clínica.
            </p>

            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <strong>Validación Automática de Identidad</strong>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Control estricto de DNI (8 dígitos) y teléfono celular activo
                  </div>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <Clock size={16} />
                </div>
                <div>
                  <strong>Confirmación Inmediata con Código de Atención</strong>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Turno asignado automáticamente para admisión en consultorio
                  </div>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Triaje Digital Prioritario</strong>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Clasificación de nivel de urgencia para atención oportuna
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta con Formulario y Visualizador de Citas */}
        <div className={styles.formCard}>
          {/* Tabs para alternar entre Registrar Cita y Ver Citas */}
          <div className={styles.tabGroup}>
            <button
              type="button"
              onClick={() => {
                setActiveTab('form');
                setSubmittedTicket(null);
              }}
              className={`${styles.tabButton} ${activeTab === 'form' ? styles.tabButtonActive : ''}`}
            >
              <PlusCircle size={15} />
              <span>Registrar Cita</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`${styles.tabButton} ${activeTab === 'list' ? styles.tabButtonActive : ''}`}
            >
              <ClipboardList size={15} />
              <span>Citas Registradas ({appointmentsList.length})</span>
            </button>
          </div>

          {activeTab === 'form' ? (
            submittedTicket ? (
              <div className={styles.successBox}>
                <CheckCircle2 size={44} color="#059669" style={{ margin: '0 auto 0.75rem' }} />
                <h3 className={styles.successTitle}>¡Cita Médica Registrada con Éxito!</h3>
                <p style={{ fontSize: '0.84rem', color: '#475569', margin: '0 0 0.5rem 0' }}>
                  Estimado(a) <strong>{submittedTicket.patientName}</strong>, tu ticket de atención clínica es:
                </p>
                
                <div className={styles.ticketNumber}>
                  {submittedTicket.id}
                </div>

                <div style={{
                  fontSize: '0.8rem',
                  color: '#64748b',
                  textAlign: 'left',
                  background: '#ffffff',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #d1fae5',
                  margin: '0.75rem 0',
                  lineHeight: '1.6'
                }}>
                  <div><strong>Paciente:</strong> {submittedTicket.patientName} (DNI: {submittedTicket.dni})</div>
                  <div><strong>Especialidad:</strong> {submittedTicket.specialty}</div>
                  <div><strong>Fecha Programada:</strong> {submittedTicket.date}</div>
                  <div><strong>Teléfono:</strong> {submittedTicket.phone}</div>
                  <div style={{ color: '#059669', fontWeight: 700, marginTop: '0.3rem' }}>
                    ✓ Ingresado al Monitor de Pacientes en Tiempo Real
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setSubmittedTicket(null)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Nueva Cita
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#f1f5f9',
                      color: '#334155',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ver Citas Activas
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formHeader}>
                  <div>
                    <h3 className={styles.formTitle}>Formulario de Reserva Clínica</h3>
                    <p className={styles.formSubtitle}>
                      Validación de datos en tiempo real
                    </p>
                  </div>
                  <div className={styles.storageBadge}>
                    <ShieldCheck size={13} />
                    <span>Admisión Central</span>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  {/* Nombres y Apellidos */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      <span>Nombres y Apellidos <span className={styles.requiredAsterisk}>*</span></span>
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      placeholder="Ej. Juan Carlos Quispe"
                      className={`${styles.input} ${errors.patientName ? styles.inputError : ''}`}
                      value={formData.patientName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.patientName && (
                      <span className={styles.errorText}>
                        <AlertCircle size={12} /> {errors.patientName}
                      </span>
                    )}
                  </div>

                  {/* DNI */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      <span>DNI (8 dígitos) <span className={styles.requiredAsterisk}>*</span></span>
                    </label>
                    <input
                      type="text"
                      name="dni"
                      placeholder="8 dígitos numéricos"
                      maxLength={8}
                      className={`${styles.input} ${errors.dni ? styles.inputError : ''}`}
                      value={formData.dni}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.dni && (
                      <span className={styles.errorText}>
                        <AlertCircle size={12} /> {errors.dni}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formGrid}>
                  {/* Teléfono Móvil */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      <span>Teléfono Celular <span className={styles.requiredAsterisk}>*</span></span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="9XX-XXX-XXX (9 dígitos)"
                      maxLength={9}
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phone && (
                      <span className={styles.errorText}>
                        <AlertCircle size={12} /> {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Especialidad Médica */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      <span>Especialidad Médica <span className={styles.requiredAsterisk}>*</span></span>
                    </label>
                    <select
                      name="specialty"
                      className={`${styles.select} ${errors.specialty ? styles.inputError : ''}`}
                      value={formData.specialty}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="Cirugía General y Laparoscópica">Cirugía General & Laparoscópica</option>
                      <option value="Cardiología & Hemodinámica">Cardiología & Hemodinámica</option>
                      <option value="Traumatología & Ortopedia">Traumatología & Ortopedia</option>
                      <option value="Neurología & Neurocirugía">Neurología & Neurocirugía</option>
                      <option value="Pediatría & Cirugía Infantil">Pediatría & Cirugía Infantil</option>
                      <option value="Servicio de Emergencias 24/7">Servicio de Emergencias 24/7</option>
                    </select>
                    {errors.specialty && (
                      <span className={styles.errorText}>
                        <AlertCircle size={12} /> {errors.specialty}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formGrid}>
                  {/* Fecha Preferida */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      <span>Fecha de la Cita <span className={styles.requiredAsterisk}>*</span></span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      min={todayStr}
                      className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.date && (
                      <span className={styles.errorText}>
                        <AlertCircle size={12} /> {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Nivel de Prioridad / Triaje */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      <span>Nivel de Triaje</span>
                    </label>
                    <select
                      name="triageLevel"
                      className={styles.select}
                      value={formData.triageLevel}
                      onChange={handleChange}
                    >
                      <option value="estable">Nivel III: Consulta Regular (Sin Urgencia)</option>
                      <option value="prioritaria">Nivel II: Prioritaria (Dolor Moderado)</option>
                      <option value="urgente">Nivel I: Urgencia Quirúrgica</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className={styles.btnSubmit}>
                  <Calendar size={18} />
                  <span>Confirmar Reserva de Cita</span>
                </button>
              </form>
            )
          ) : (
            /* Vista de Citas Registradas */
            <div className={styles.localContainer}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                    Citas Registradas en el Sistema ({appointmentsList.length})
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                    Historial de admisiones y pacientes programados
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <PlusCircle size={13} />
                  <span>Nueva Cita</span>
                </button>
              </div>

              {appointmentsList.length === 0 ? (
                <div className={styles.emptyState}>
                  <FileText size={38} color="#cbd5e1" />
                  <span style={{ fontWeight: 700, color: '#64748b' }}>No hay citas pendientes</span>
                  <span style={{ fontSize: '0.78rem' }}>Completa el formulario para registrar un paciente.</span>
                </div>
              ) : (
                <div className={styles.localTableWrapper}>
                  <table className={styles.localTable}>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Paciente</th>
                        <th>DNI</th>
                        <th>Especialidad</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentsList.map((app) => (
                        <tr key={app.id}>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0284c7' }}>
                            {app.id}
                          </td>
                          <td>
                            <strong>{app.patientName}</strong>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{app.phone}</div>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)' }}>{app.dni}</td>
                          <td>{app.specialty}</td>
                          <td>
                            <span style={{ fontWeight: 600 }}>{app.date}</span>
                            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{app.triageLevel}</div>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleDeleteAppointment(app.id)}
                              className={styles.btnDeleteLocal}
                              title="Cancelar Cita"
                            >
                              <Trash2 size={12} />
                              <span>Cancelar</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
