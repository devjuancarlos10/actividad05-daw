# UNIVERSIDAD NACIONAL DEL CENTRO DEL PERÚ
## FACULTAD DE INGENIERÍA DE SISTEMAS
### DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS
**PROGRAMA DE INGENIERÍA DE SISTEMAS**

---

# INFORME DE PRÁCTICA DE LABORATORIO N° 05
**Asignatura:** Desarrollo de Aplicaciones Web (IS093A)  
**Unidad I:** Desarrollo Web Frontend  
**Tema:** Framework JS (React), Client-Side Rendering (CSR), JSX, Props & Children, Estrategias de Estilado  
**Estudiante:** JUAN CARLOS CHAHUAYO MARTINEZ  
**Semestre:** 9no Semestre - FIS-UNCP  
**Aplicación Desarrollada:** Portal Quirúrgico y Hospitalario "MediCare San Lucas"  
**Repositorio GitHub:** `https://github.com/tu-usuario/clinica-san-lucas-react` *(Reemplazar con tu URL)*

---

## 1. OBJETIVO DE LA PRÁCTICA
Desarrollar una aplicación web de página única (SPA) con arquitectura basada en componentes en React y empaquetada con Vite, aplicando el flujo unidireccional de datos con props, composición con children, aislamiento de estilos mediante CSS Modules, y validando el ciclo de vida del DOM bajo Client-Side Rendering (CSR).

---

## 2. MAPA DE ARCHIVOS DEL PROYECTO (DÓNDE ESTÁ CADA PASO)

A continuación se detalla la localización exacta en el código de cada uno de los 5 pasos requeridos:

| Paso | Concepto Clave | Archivo(s) en el Proyecto | Ubicación / Líneas Clave |
| :--- | :--- | :--- | :--- |
| **Paso 1** | Scaffold del Proyecto con Vite | [package.json](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/package.json)<br>[vite.config.js](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/vite.config.js) | Configuración de scripts (`dev`, `build`), plugin `@vitejs/plugin-react` y servidor HMR. |
| **Paso 2** | Arquitectura de Componentes (SRP) | [src/App.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/App.jsx)<br>[src/components/Header.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/components/Header.jsx) | `App.jsx` funciona como único orquestador raíz (sin lógica de cálculo pesada), delegando en componentes hijos ordenados en `src/components/`. |
| **Paso 3** | Props & Children (Flujo de Datos) | [src/components/Dashboard.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/components/Dashboard.jsx)<br>[src/components/MetricCard.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/components/MetricCard.jsx) | Mapeo de `metrics` (props inmutables con JSDoc) e inyección de la Tabla de Triaje y Camas UCI como slots `{children}`. |
| **Paso 4** | Estrategias de Estilado | [src/styles/MetricCard.module.css](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/styles/MetricCard.module.css)<br>[src/styles/Dashboard.module.css](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/styles/Dashboard.module.css) | Estilos encapsulados con hashing automático (`*.module.css`) y estilos inline para severidad dinámica (badges de triaje y disponibilidad). |
| **Paso 5** | Validación de CSR & Ciclo de Render | [index.html](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/index.html)<br>[src/main.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/main.jsx) | `<div id="root"></div>` vacío antes de la inyección de React, meta viewport y SEO tags en el `<head>` de `index.html`. |

---

## 3. DESARROLLO PASO A PASO Y GUÍA DE CAPTURAS

### PASO 1: Scaffold del Proyecto con Vite
- **Descripción:** Se inicializó la aplicación utilizando el empaquetador moderno Vite con la plantilla de React y JavaScript, prescindiendo del obsoleto Create-React-App.
- **Comandos ejecutados:**
  ```bash
  npm create vite@latest clinica-san-lucas -- --template react
  cd clinica-san-lucas
  npm install lucide-react
  npm run dev
  ```
- **📸 DÓNDE PEGAR LA FOTO 1:**
  > **[PEGAR AQUÍ CAPTURA 1.1]**: Captura de la terminal de Visual Studio Code ejecutando `npm run dev`, donde se observe la salida:  
  > `VITE v8.3.x ready in ... ms` y la URL local `http://localhost:5174/`.
  >
  > **[PEGAR AQUÍ CAPTURA 1.2]**: Captura del archivo [package.json](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/package.json) abierto en VS Code mostrando las dependencias `react`, `react-dom`, `lucide-react` y `@vitejs/plugin-react`.

---

### PASO 2: Arquitectura de Componentes
- **Descripción:** Se limpió el código de ejemplo (*boilerplate*), se crearon los directorios modulares `src/components/` y `src/styles/`, y se estructuró [src/App.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/App.jsx) como el único orquestador raíz.
- **Principio de Responsabilidad Única (SRP):** Cada componente atiende una sola necesidad:
  - `Navbar.jsx`: Barra superior y navegación institucional.
  - `HeroSection.jsx`: Portada con telemetría quirúrgica y llamadas a la acción.
  - `Dashboard.jsx`: Contenedor principal de indicadores y telemetría.
  - `MetricCard.jsx`: Átomo reutilizable para métricas clínicas.
  - `ServicesSection.jsx`: Catálogo de especialidades quirúrgicas.
  - `DoctorsSection.jsx`: Directorio de especialistas médicos.
  - `AppointmentSection.jsx`: Módulo de triaje digital y admisión.
  - `TechnicalArchitectureModal.jsx`: Ficha técnica de validación de los 5 pasos.
  - `Footer.jsx`: Información legal, acreditación y firma del alumno.
- **📸 DÓNDE PEGAR LA FOTO 2:**
  > **[PEGAR AQUÍ CAPTURA 2.1]**: Captura del explorador de archivos de Visual Studio Code con el árbol desplegado mostrando las carpetas `src/components/` y `src/styles/`.
  >
  > **[PEGAR AQUÍ CAPTURA 2.2]**: Captura del archivo [src/App.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/App.jsx) en el editor mostrando cómo orquesta los componentes sin lógica pesada de cálculo.

---

### PASO 3: Implementar Patrón Props y Composición con Children
- **Descripción:** Los datos clínicos maestros (`clinicMetrics`, `triagePatients`, `servicesCatalog`, `doctorsDirectory`) residen en `App.jsx` y fluyen hacia abajo a través de props de sólo lectura.
- **Inmutabilidad y Documentación JSDoc:** En [src/components/MetricCard.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/components/MetricCard.jsx) y [src/components/Dashboard.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/components/Dashboard.jsx), las props están debidamente tipadas con bloques JSDoc:
  ```javascript
  /**
   * @param {Object} props
   * @param {string} props.title - Nombre del indicador clínico.
   * @param {string|number} props.value - Cifra numérica o estadística médica.
   * @param {string} props.change - Variación comparativa.
   * @param {'up' | 'down' | 'neutral'} props.trend - Dirección de la tendencia.
   * @param {React.ReactNode} [props.children] - Contenido anidado compuesto.
   */
  ```
- **Patrón Children:** El componente `Dashboard` recibe como `{children}` dos bloques interactivos independientes: la *Tabla de Triaje de Emergencias* y el *Monitor de Ocupación de Camas UCI*, permitiendo extender el dashboard sin acoplar su código interno.
- **📸 DÓNDE PEGAR LA FOTO 3:**
  > **[PEGAR AQUÍ CAPTURA 3.1]**: Captura del código de [src/components/Dashboard.jsx](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/components/Dashboard.jsx) en VS Code resaltando el bloque `{children}` y el mapeo `metrics.map(...)`.
  >
  > **[PEGAR AQUÍ CAPTURA 3.2]**: Captura de la página web en el navegador mostrando el **Panel de Operaciones Clínicas** con las 4 tarjetas de métricas (Pacientes Atendidos, Cirugías, Espera, Recuperación) y la tabla de triaje anidada debajo.

---

### PASO 4: Aplicar Estrategias de Estilado
- **Descripción:** Se contrastaron las diferentes técnicas de diseño recomendadas para SPAs en React:
  1. **CSS Modules (`*.module.css`):** Utilizado en [src/styles/MetricCard.module.css](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/styles/MetricCard.module.css) y [src/styles/Dashboard.module.css](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/styles/Dashboard.module.css). Vite genera nombres hasheados únicos (ej. `_card_1a8f9_12`) que garantizan que los estilos de una tarjeta médica no colisionen con otros módulos hospitalarios.
  2. **Inline Styles Dinámicos:** Reservados exclusivamente para valores computados en tiempo de ejecución, tales como el color de severidad de triaje (`#ef4444` para crítico, `#10b981` para estable) y el porcentaje de las barras de ocupación de camas UCI (`width: '88%'`).
  3. **Prohibición Cumplida:** No se usaron etiquetas `<style>` globales en componentes.
- **📸 DÓNDE PEGAR LA FOTO 4:**
  > **[PEGAR AQUÍ CAPTURA 4.1]**: Captura de [src/styles/MetricCard.module.css](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/src/styles/MetricCard.module.css) abierto en VS Code con sus clases modulares.
  >
  > **[PEGAR AQUÍ CAPTURA 4.2]**: Captura del navegador con las **Herramientas de Desarrollador (F12)** inspeccionando una de las tarjetas de métricas, donde se observe la clase con hash único generada por CSS Modules (ej. `class="_card_..."`).

---

### PASO 5: Validación de CSR (Client-Side Rendering) y Ciclo de Render
- **Descripción:** Se validó el comportamiento del ciclo de vida del DOM en una Single Page Application:
  1. **HTML Inicial Vacío:** Al hacer clic derecho en la página y seleccionar *Ver código fuente de la página* (`View Page Source`), se observa únicamente `<div id="root"></div>` y la etiqueta de script. El servidor no envía HTML pre-renderizado.
  2. **Hidratación en el Cliente:** El navegador descarga el paquete de JavaScript (`main.jsx`), React 19 ejecuta `createRoot()`, genera el Virtual DOM y lo monta en el DOM real.
  3. **Justificación Técnica de Meta Tags:** Las etiquetas `meta viewport`, `title` y `description` se ubicaron en [index.html](file:///c:/Users/juanc/Documents/UNCP/9no/DESARROLLO%20DE%20APLICACIONES%20WEB/SEMANA%205/ACTIVIDAD%20PRACTICA/index.html) (no dentro de componentes JSX) para que el navegador y los rastreadores SEO lean las dimensiones de pantalla e información institucional antes de que comience la ejecución de JavaScript.
- **📸 DÓNDE PEGAR LA FOTO 5:**
  > **[PEGAR AQUÍ CAPTURA 5.1]**: Captura del navegador en la vista de *Ver código fuente de la página* (`view-source:http://localhost:5174/`) mostrando el contenedor `<div id="root"></div>` vacío y las etiquetas meta en el `<head>`.
  >
  > **[PEGAR AQUÍ CAPTURA 5.2]**: Captura de la pestaña **Network (Red)** o **React DevTools Components** en el navegador confirmando la carga del chunk de JavaScript y el árbol de componentes montado.

---

## 4. CAPTURAS GENERALES DE LA PÁGINA WEB LOCAL

Aquí debes incluir las tomas generales del sitio web en funcionamiento en tu navegador:

- **📸 DÓNDE PEGAR LA FOTO GENERAL 1:**
  > **[PEGAR AQUÍ CAPTURA DE LA PORTADA HERO Y NAVBAR]**: Captura de la parte superior del sitio web mostrando el logo, menú, botón "Ficha Técnica (5 Pasos)", botón de urgencias y la portada principal con la telemetría quirúrgica y signos vitales en vivo.
- **📸 DÓNDE PEGAR LA FOTO GENERAL 2:**
  > **[PEGAR AQUÍ CAPTURA DE SERVICIOS Y MÉDICOS]**: Captura donde se vean las especialidades quirúrgicas y las tarjetas del staff médico con los estados de disponibilidad.
- **📸 DÓNDE PEGAR LA FOTO GENERAL 3:**
  > **[PEGAR AQUÍ CAPTURA DE LA MODAL DE LA FICHA TÉCNICA]**: Captura con la modal abierta al hacer clic en el botón superior **"Ficha Técnica (5 Pasos)"**, demostrando que dentro del sitio web están explicados e integrados los 5 pasos de la práctica.
- **📸 DÓNDE PEGAR LA FOTO GENERAL 4 (CRUCIAL):**
  > **[PEGAR AQUÍ CAPTURA DEL FOOTER CON TU NOMBRE]**: Captura nítida de la parte inferior de la página web donde se aprecie claramente el texto:  
  > **`JUAN CARLOS CHAHUAYO MARTINEZ 9NO FIS-UNCP`**

---

## 5. CONCLUSIONES
1. Se comprobó que **Vite** ofrece tiempos de compilación y recarga en caliente (HMR) significativamente superiores a bundlers tradicionales, reduciendo la fricción en el desarrollo de aplicaciones frontend complejas.
2. El uso de **Props inmutables** y el patrón **Children** en React permite construir interfaces desacopladas y escalables siguiendo el Principio de Responsabilidad Única (SRP), ideal para sistemas de misión crítica como una clínica médica.
3. Los **CSS Modules** resuelven de forma nativa la colisión de nombres de clases mediante hashing automático por componente, reservando los estilos inline exclusivamente para valores reactivos en tiempo de ejecución.
4. Se validó experimentalmente la naturaleza del **Client-Side Rendering (CSR)**, comprendiendo la importancia de configurar los metadatos de viewport y SEO directamente en `index.html` para garantizar la correcta accesibilidad e indexación previa a la hidratación del DOM.
