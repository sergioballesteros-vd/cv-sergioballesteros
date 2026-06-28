const noteLang = new URLSearchParams(location.search).get("lang") || localStorage.getItem("lang") || "en";
const noteCopy = {
  en: {
    home: "Back to notebook",
    notes: "Engineering Notes",
    titleSuffix: "Engineering Notes",
  },
  es: {
    home: "Volver al cuaderno",
    notes: "Notas de ingeniería",
    titleSuffix: "Notas de ingeniería",
  },
};
const noteText = noteCopy[noteLang] || noteCopy.en;
localStorage.setItem("lang", noteLang);
document.documentElement.lang = noteLang;
const noteSlug = location.pathname.split("/").pop().replace(/\.html$/, "");
const topHome = document.querySelector(".entry-home");
if (topHome) {
  topHome.textContent = noteText.home;
  topHome.href = `../index.html?lang=${noteLang}`;
}
const topLabel = document.querySelector(".entry-topbar .meta-label");
if (topLabel) {
  const caseLabels = {
    "ocm-brain": { en: "Case 001", es: "Caso 001" },
    "energy-simulator": { en: "Case 002", es: "Caso 002" },
    "smart-ocr": { en: "Case 003", es: "Caso 003" },
    "data-processing": { en: "Case 004", es: "Caso 004" },
  };
  topLabel.textContent = caseLabels[noteSlug]?.[noteLang] || topLabel.textContent;
}
const kicker = document.querySelector(".sheet-kicker");
if (kicker) kicker.textContent = noteText.notes;
document.title = document.title.replace(/\s\|\s.*$/, ` | ${noteText.titleSuffix}`);

if (noteSlug === "ocm-brain" && noteLang === "es") {
  const sections = Array.from(document.querySelectorAll(".entry-page > section"));
  const setText = (selector, value, root = document) => {
    const el = root.querySelector(selector);
    if (el) el.textContent = value;
  };
  const setAll = (selector, values, root = document) => {
    const els = root.querySelectorAll(selector);
    els.forEach((el, index) => {
      if (values[index] !== undefined) el.textContent = values[index];
    });
  };

  setText(".entry-deck", "Plataforma interna de IA para inteligencia comercial, scoring de leads e insights automatizados. Diseñada como un sistema en producción, no como un flujo de demo.", sections[0]);
  setAll(".entry-hero-grid .entry-card .meta-label", ["Misión", "Stack actual"], sections[0]);
  setAll(".entry-hero-grid .entry-card p", [
    "Llevar inteligencia comercial asistida por IA a procesos de negocio reales con límites de sistema explícitos.",
  ], sections[0]);

  setText("h2", "Resumen del caso", sections[1]);
  setAll(".entry-card .meta-label", ["Rol del sistema", "Usuarios principales", "Restricción operativa", "Por qué existe"], sections[1]);
  setAll(".entry-card p", [
    "Capa de inteligencia comercial para scoring, priorización y recomendaciones asistidas por IA.",
    "Equipos comerciales internos que necesitan leads priorizados, contexto más fresco y decisiones más rápidas.",
    "Las salidas útiles tenían que ser lo bastante explicables como para entrar en workflows de negocio, no quedarse en un entorno de IA aislado.",
    "Sustituir análisis manual fragmentado por un sistema respaldado por servicios que pueda puntuar, generar y persistir decisiones.",
  ], sections[1]);

  setText("h2", "Problema", sections[2]);
  setText("p", "Los equipos comerciales necesitaban acceso más rápido a insights útiles sin convertir cada workflow en investigación manual o coordinación con hojas de cálculo.", sections[2]);

  setAll("h2", ["Arquitectura", "Decisiones clave"], sections[3]);
  setText("p", "Los límites orientados a servicios separan orquestación, scoring, gestión documental y persistencia de datos. La plataforma está estructurada para mantener las interacciones con LLM aisladas de las responsabilidades del sistema.", sections[3].querySelector(".entry-card"));
  setAll("ul li", [
    "Usar Spring Boot para servicios de producción de larga vida.",
    "Mantener los flujos de IA como responsabilidades explícitas de servicios.",
    "Priorizar la fiabilidad operativa sobre el pulido experimental de UI.",
  ], sections[3].querySelectorAll(".entry-card")[1]);

  setText("h2", "Diagrama del sistema", sections[4]);

  setText("h2", "Flujo operativo", sections[5]);
  setAll(".dossier-step .meta-label", ["01 Entrada", "02 Enriquecimiento", "03 Scoring", "04 Persistencia"], sections[5]);
  setAll(".dossier-step h3", [
    "Llegan leads y datos de consentimiento",
    "Se ensamblan los contextos",
    "Los modelos generan salidas ordenadas",
    "Los resultados se convierten en estado operativo",
  ], sections[5]);
  setAll(".dossier-step p", [
    "Los datos operativos entran por endpoints controlados en lugar de manipulación manual con hojas de cálculo.",
    "Los servicios del sistema construyen el contexto del prompt a partir de datos internos y reglas de workflow.",
    "El scoring y la generación de insights funcionan como responsabilidades explícitas del backend con salidas tipadas.",
    "Los scores, comprobaciones de frescura e insights generados se almacenan para trazabilidad y uso posterior.",
  ], sections[5]);

  setAll("h2", ["Fragmento del repositorio", "Surface de consulta representativa"], sections[6]);
  setAll("p", [
    "Basado en una consulta real de un repositorio privado, anonimizada para eliminar credenciales e identificadores de operador.",
    "La persistencia soporta scoring, comprobaciones de frescura y trazabilidad operativa.",
  ], sections[6]);

  setAll("h2", ["Registro de decisión", "Señales de producción"], sections[7]);
  setAll(".decision-line .meta-label", ["Contexto", "Decisión", "Tradeoff", "Resultado"], sections[7]);
  setAll(".decision-line p", [
    "Los equipos comerciales necesitaban soporte de IA dentro de un workflow que pudieran confiar y reutilizar.",
    "Construir una plataforma respaldada por servicios donde scoring, prompting y persistencia sean responsabilidades separadas.",
    "Más disciplina backend al principio, pero mucha menos ambigüedad una vez que las salidas de IA afectan acciones de negocio.",
    "La plataforma se comporta como una superficie de producto interna en lugar de un wrapper de prompts.",
  ], sections[7]);
  setAll(".entry-bullets li", [
    "Lead Quality Scoring expuesto a través de endpoints de servicio, no de pasos manuales de operador.",
    "Consent Freshness Scoring persistido junto al contexto de negocio para decisiones posteriores.",
    "La integración con IA queda detrás de límites de servicio para que los cambios en prompts no redibujen todo el sistema.",
    "Las superficies de almacenamiento y consulta soportan tanto el uso de negocio como la trazabilidad operativa.",
  ], sections[7].querySelectorAll(".entry-card")[1]);

  setAll("h2", ["Tradeoffs", "Resultado"], sections[8]);
  setText("p", "Las integraciones con modelos alojados aceleran la entrega y la calidad, pero requieren un control cuidadoso de dependencias, prompts y límites del workflow de negocio.", sections[8].querySelectorAll(".entry-card")[0]);
  setText("p", "Lead Quality Scoring y Consent Freshness Scoring pasaron de idea a workflow de producción, con generación de insights automatizada como una capacidad operativa real.", sections[8].querySelectorAll(".entry-card")[1]);

  setText("h2", "Evidencia operativa", sections[9]);
  setAll(".entry-list li", [
    "LLMs integrados en producción, no aislados en herramientas de demo.",
    "Modelos de scoring orientados al negocio expuestos mediante endpoints de servicio.",
    "Límites de servicio lo bastante explícitos como para evolucionar scoring e insights de forma independiente.",
  ], sections[9]);
}
