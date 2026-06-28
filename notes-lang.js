const noteLang = new URLSearchParams(location.search).get("lang") || localStorage.getItem("lang") || "en";
const isEs = noteLang === "es";
const pageSlug = location.pathname.split("/").pop().replace(/\.html$/, "");
const isJournal = location.pathname.includes("/journal/");
const shellCopy = {
  en: { home: "Back to notebook", notes: "Engineering Notes", titleSuffix: "Engineering Notes" },
  es: { home: "Volver al cuaderno", notes: "Notas de ingeniería", titleSuffix: "Notas de ingeniería" },
}[isEs ? "es" : "en"];

const setText = (selector, value, root = document) => {
  const el = root.querySelector(selector);
  if (el) el.textContent = value;
};

const setAll = (selector, values, root = document) => {
  root.querySelectorAll(selector).forEach((el, index) => {
    if (values[index] !== undefined) el.textContent = values[index];
  });
};

const relinkLocal = () => {
  document.querySelectorAll('a[href^="./"], a[href^="../"]').forEach((anchor) => {
    const raw = anchor.getAttribute("href");
    if (!raw) return;
    const external = raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("mailto:");
    if (external) return;
    const url = new URL(raw, location.href);
    url.searchParams.set("lang", noteLang);
    anchor.href = url.toString();
  });
};

localStorage.setItem("lang", noteLang);
document.documentElement.lang = noteLang;

const home = document.querySelector(".entry-home");
if (home) {
  home.textContent = shellCopy.home;
  home.href = isJournal ? `../index.html?lang=${noteLang}` : `../index.html?lang=${noteLang}`;
}

const topLabel = document.querySelector(".entry-topbar .meta-label");
if (topLabel) {
  const caseLabels = {
    "ocm-brain": { en: "Case 001", es: "Caso 001" },
    "energy-simulator": { en: "Case 002", es: "Caso 002" },
    "smart-ocr": { en: "Case 003", es: "Caso 003" },
    "data-processing": { en: "Case 004", es: "Caso 004" },
    journal: { en: "Engineering Journal", es: "Diario de Ingeniería" },
  };
  topLabel.textContent = caseLabels[isJournal ? "journal" : pageSlug]?.[noteLang] || topLabel.textContent;
}

const kicker = document.querySelector(".sheet-kicker");
if (kicker) kicker.textContent = shellCopy.notes;
document.title = isJournal
  ? noteLang === "es"
    ? "Diario de Ingeniería | Sergio Ballesteros"
    : "Engineering Journal | Sergio Ballesteros"
  : document.title.replace(/\s\|\s.*$/, ` | ${shellCopy.titleSuffix}`);

const noteEs = {
  "ocm-brain": () => {
    setText(".entry-deck", "Plataforma interna de IA para inteligencia comercial, scoring de leads e insights automatizados. Diseñada como un sistema en producción, no como un flujo de demo.");
    setAll(".entry-hero-grid .entry-card .meta-label", ["Misión", "Stack actual"]);
    setAll(".entry-hero-grid .entry-card p", ["Llevar inteligencia comercial asistida por IA a procesos de negocio reales con límites de sistema explícitos."]);
    const sections = document.querySelectorAll(".entry-page > section");
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
    setText("p", "Los límites orientados a servicios separan orquestación, scoring, gestión documental y persistencia de datos. La plataforma está estructurada para mantener las interacciones con LLM aisladas de las responsabilidades del sistema.", sections[3].querySelectorAll(".entry-card")[0]);
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
  },
  "energy-simulator": () => {
    const sections = document.querySelectorAll(".entry-page > section");
    setText(".entry-deck", "Plataforma interna para simular ofertas energéticas, escenarios de pricing y workflows comerciales con menos trabajo manual.");
    setAll(".entry-hero-grid .entry-card .meta-label", ["Misión", "Stack actual"]);
    setAll(".entry-hero-grid .entry-card p", ["Convertir simulaciones complejas de precios y ofertas en un sistema que el equipo comercial pueda usar repetidamente."]);
    setAll("h2", ["Resumen del caso", "Problema"], sections[1]);
    setText("h2", "Problema", sections[2]);
    setText("h2", "Problema", sections[2]);
    setText("h2", "Problema", sections[2]);
    setAll(".entry-card .meta-label", ["Rol del sistema", "Usuarios principales", "Restricción operativa", "Por qué existe"], sections[1]);
    setAll(".entry-card p", [
      "Capa interna de simulación para escenarios de pricing, comparativas de tarifas y análisis comercial reutilizable.",
      "Equipos comerciales que necesitan comparar escenarios sin rehacer la lógica cada vez.",
      "La lógica de simulación tenía que mantenerse consistente entre ejecuciones repetidas, sin desviarse entre hojas de cálculo y cálculos puntuales.",
      "Convertir el análisis de precios lento y manual en un workflow productizado con lógica backend clara e inputs reutilizables.",
    ], sections[1]);
    setText("p", "El análisis comercial era demasiado lento y demasiado manual. Los escenarios complejos tenían que recalcularse una y otra vez, lo que creaba cuellos de botella.", sections[2]);
    setAll("h2", ["Arquitectura", "Decisiones clave"], sections[3]);
    setText("p", "La plataforma mantiene inputs de simulación, lógica de pricing y surfaces de reporting dentro de un mismo sistema para que el workflow sea repetible y testeable.", sections[3].querySelectorAll(".entry-card")[0]);
    setAll("ul li", [
      "Construir una plataforma en vez de juntar scripts y hojas de cálculo.",
      "Mantener la lógica de pricing centralizada para que las salidas sean consistentes.",
      "Diseñar para uso interno repetido, no para una sola persona esquivando el sistema.",
    ], sections[3].querySelectorAll(".entry-card")[1]);
    setText("h2", "Diagrama del sistema", sections[4]);
    setText("h2", "Flujo operativo", sections[5]);
    setAll(".dossier-step .meta-label", ["01 Entradas", "02 Simulación", "03 Comparación", "04 Reutilización"], sections[5]);
    setAll(".dossier-step h3", ["Se capturan los parámetros del escenario", "La lógica de pricing se ejecuta de forma central", "Las salidas se ordenan y revisan", "El workflow permanece operativo"], sections[5]);
    setAll(".dossier-step p", [
      "El perfil de consumo, el contexto de tarifa y las variables comerciales entran al sistema mediante inputs controlados.",
      "El backend aplica el mismo ruleset a través de escenarios en vez de depender de hojas de cálculo personales.",
      "Los usuarios comerciales comparan casos mediante un flujo de producto reutilizable en vez de reconstruir el análisis cada vez.",
      "La misma plataforma puede volver a ejecutarse, ampliarse y mejorarse sin reescribir la lógica.",
    ], sections[5]);
    setAll("h2", ["Fragmento del repositorio", "Registro de decisión"], sections[6]);
    setText("p", "Basado en un router API privado real, anonimizado hasta dejar solo el patrón operativo útil.", sections[6].querySelectorAll(".entry-card")[0]);
    setAll(".decision-line .meta-label", ["Contexto", "Decisión", "Tradeoff", "Resultado"], sections[6].querySelectorAll(".entry-card")[1]);
    setAll(".decision-line p", [
      "El análisis de precios era valioso, pero demasiado lento porque cada ejecución dependía de trabajo manual repetido.",
      "Construir una plataforma interna donde inputs, lógica de negocio y salidas vivan en un flujo repetible.",
      "Más trabajo de producto al principio que un script, pero mucha mejor consistencia cuando varios usuarios dependen del proceso.",
      "La simulación pasó a ser una capacidad interna compartida en lugar de un apaño de analista.",
    ], sections[6].querySelectorAll(".entry-card")[1]);
    setAll("h2", ["Resultado", "Señales de producción"], sections[7]);
    setText("p", "El tiempo de análisis cayó en torno a un 80 por ciento mientras el proceso se volvió más reutilizable y fácil de evolucionar entre equipos.", sections[7].querySelectorAll(".entry-card")[0]);
    setAll(".entry-bullets li", [
      "Plataforma interna usada en toda la empresa.",
      "El proceso comercial dejó de depender de recálculos manuales lentos.",
      "La lógica de escenario pasó a ser reutilizable en lugar de depender de una persona.",
      "El sistema fue diseñado para evolucionar workflows, no solo calcular un caso.",
    ], sections[7].querySelectorAll(".entry-card")[1]);
    setAll("h2", ["Evidencia de la base de código", "Lectura operativa"], sections[8]);
    setText("p", "Comprobado contra el repositorio privado actual. El sistema no es una carpeta de app simple; es un producto con límites de ejecución explícitos.", sections[8].querySelectorAll(".entry-card")[0]);
    setAll(".entry-bullets li", [
      "Se verifican superficies de producto en `backend/`, `frontend/`, `infra/` y `ops/`.",
      "El README separa procesamiento asíncrono, sincronización de tarifas y flujos de simulación como responsabilidades distintas.",
      "El stack verificado incluye FastAPI, Next.js, PostgreSQL, Redis y paths de extracción asistida por OCR/LLM.",
    ], sections[8].querySelectorAll(".entry-card")[0]);
    setText("p", "Esto importa porque el repositorio actúa como una superficie de producto: frontend, backend, infraestructura y operaciones se tratan como partes distintas de la misma plataforma.", sections[8].querySelectorAll(".entry-card")[1]);
    setText("h2", "Capturas", sections[9]);
  },
  "smart-ocr": () => {
    const sections = document.querySelectorAll(".entry-page > section");
    setText(".entry-deck", "Pipeline OCR + LLM para extraer información estructurada de documentos no estructurados con validación integrada.");
    setAll(".entry-hero-grid .entry-card .meta-label", ["Misión", "Stack actual"]);
    setAll(".entry-hero-grid .entry-card p", ["Automatizar la extracción documental sin dejar el control de calidad solo en revisión manual."]);
    setAll("h2", ["Resumen del caso", "Problema"], sections[1]);
    setText("h2", "Problema", sections[2]);
    setText("h2", "Problema", sections[2]);
    setText("h2", "Problema", sections[2]);
    setAll(".entry-card .meta-label", ["Rol del sistema", "Usuarios principales", "Restricción operativa", "Por qué existe"], sections[1]);
    setAll(".entry-card p", [
      "Pipeline de extracción documental que convierte entradas no estructuradas en datos estructurados validados.",
      "Operaciones internas que necesitan datos documentales sin repetir trabajo manual de extracción y revisión.",
      "Que la precisión reportada fuera alta no bastaba si la automatización posterior no podía confiar en el esquema extraído.",
      "Convertir el tratamiento de documentos en un workflow backend repetible en vez de una tarea parcialmente manual.",
    ], sections[1]);
    setText("p", "Los documentos llegaban en formatos inconsistentes y aún necesitaban datos estructurados al otro lado. El OCR bruto no hacía que el workflow fuese seguro para automatizar.", sections[2]);
    setAll("h2", ["Arquitectura", "Decisiones clave"], sections[3]);
    setText("p", "El workflow separa OCR, extracción con lenguaje y validación de esquema para que los fallos sigan siendo visibles y recuperables.", sections[3].querySelectorAll(".entry-card")[0]);
    setAll("ul li", [
      "Separar el fallo de OCR del fallo del modelo.",
      "Validar los payloads extraídos con un esquema tipado antes de que continúe la automatización.",
      "Tratar la precisión como útil solo cuando el siguiente sistema puede confiar en el resultado.",
    ], sections[3].querySelectorAll(".entry-card")[1]);
    setText("h2", "Diagrama del sistema", sections[4]);
    setText("h2", "Flujo operativo", sections[5]);
    setAll(".dossier-step .meta-label", ["01 Entrada", "02 Extracción", "03 Validación", "04 Automatización"], sections[5]);
    setAll(".dossier-step h3", ["Los documentos entran en la tubería", "OCR y modelo corren por separado", "Las comprobaciones de esquema bloquean el flujo", "Los payloads confiables pasan downstream"], sections[5]);
    setAll(".dossier-step p", [
      "Los ficheros fuente llegan con estructura, formato y calidad de texto inconsistentes.",
      "El OCR genera texto y después el modelo lo convierte en una salida candidata estructurada.",
      "La validación tipada detecta resultados malformados o incompletos antes de que se conviertan en datos de negocio.",
      "Solo las extracciones validadas continúan hacia los sistemas que consumen los datos documentales.",
    ], sections[5]);
    setAll("h2", ["Fragmento del repositorio", "Registro de decisión"], sections[6]);
    setText("p", "Desde el router público de la API. Esta es la forma real de la superficie de extracción.", sections[6].querySelectorAll(".entry-card")[0]);
    setAll(".decision-line .meta-label", ["Contexto", "Decisión", "Tradeoff", "Resultado"], sections[6].querySelectorAll(".entry-card")[1]);
    setAll(".decision-line p", [
      "La revisión manual reducía el riesgo, pero también bloqueaba la escala y hacía caro el throughput.",
      "Combinar OCR y extracción con LLM con validación de esquema en vez de confiar solo en la extracción de texto bruta.",
      "Más lógica de validación que mantener, pero mucha menos probabilidad de que datos malos se cuelen silenciosamente en los workflows downstream.",
      "El pipeline siguió siendo automation-first y, a la vez, mantuvo visibles los fallos para corregirlos.",
    ], sections[6].querySelectorAll(".entry-card")[1]);
    setAll("h2", ["Resultado", "Señales de producción"], sections[7]);
    setText("p", "El sistema alcanzó más del 98 por ciento de precisión en el flujo objetivo manteniendo el proceso orientado a automatización.", sections[7].querySelectorAll(".entry-card")[0]);
    setAll(".entry-bullets li", [
      "La validación estructurada redujo fallos silenciosos de extracción.",
      "OCR y salida del modelo se trataron como superficies de fallo separadas.",
      "La precisión solo importaba si la automatización posterior podía confiar en el resultado.",
      "El tratamiento documental se acercó más a un workflow backend real que a un paso manual de revisión.",
    ], sections[7].querySelectorAll(".entry-card")[1]);
    setAll("h2", ["Evidencia del repositorio público", "Lectura operativa"], sections[8]);
    setText("p", "Este workflow también existe como artefacto técnico público: <a href=\"https://github.com/sergioballesteros-vd/smart-document-extractor\" target=\"_blank\" rel=\"noreferrer\">smart-document-extractor</a>.", sections[8].querySelectorAll(".entry-card")[0]);
    setAll(".entry-bullets li", [
      "Stack público verificado: Python, FastAPI, Pydantic, Docker.",
      "Los endpoints públicos verificados incluyen `GET /api/health` y `POST /api/extract`.",
      "El README público documenta el mismo pipeline OCR -> LLM -> validación descrito aquí.",
    ], sections[8].querySelectorAll(".entry-card")[0]);
    setText("p", "El repositorio público es una buena evidencia porque muestra el flujo de extracción como una superficie API real, no como copy de portfolio.", sections[8].querySelectorAll(".entry-card")[1]);
    setText("h2", "Superficie capturada", sections[9]);
  },
  "data-processing": () => {
    const sections = document.querySelectorAll(".entry-page > section");
    setText(".entry-deck", "Pipelines de datos masivos, limpieza y automatización ETL para datasets críticos en workflows de producción.");
    setAll(".entry-hero-grid .entry-card .meta-label", ["Misión", "Stack actual"]);
    setAll(".entry-hero-grid .entry-card p", ["Sustituir importaciones manuales frágiles por workflows de procesamiento de datos repetibles y más seguros a escala de producción."]);
    setAll("h2", ["Resumen del caso", "Problema"], sections[1]);
    setText("h2", "Problema", sections[2]);
    setText("h2", "Problema", sections[2]);
    setText("h2", "Problema", sections[2]);
    setAll(".entry-card .meta-label", ["Rol del sistema", "Usuarios principales", "Restricción operativa", "Por qué existe"], sections[1]);
    setAll(".entry-card p", [
      "Capa ETL y de limpieza para importaciones de alto volumen que necesitan procesamiento repetible y reruns más seguros.",
      "Operaciones internas y sistemas que dependen de que grandes datasets lleguen lo bastante limpios para su uso downstream.",
      "La codificación, las filas malformadas y los fallos parciales tenían que tratarse como comportamiento normal del workflow, no como excepciones puntuales.",
      "Sustituir scripts de importación frágiles y limpieza manual por un workflow operativo que pueda procesar lotes grandes de forma segura.",
    ], sections[1]);
    setText("p", "Las importaciones grandes eran propensas a errores, repetitivas y sensibles a problemas de codificación que no aparecían en pruebas pequeñas.", sections[2]);
    setAll("h2", ["Arquitectura", "Decisiones clave"], sections[3]);
    setText("p", "El workflow separa staging, limpieza y persistencia final para que los malos datos puedan corregirse sin corromper el estado destino.", sections[3].querySelectorAll(".entry-card")[0]);
    setAll("ul li", [
      "Usar capas de staging antes de tocar tablas visibles en producción.",
      "Tratar la codificación y los datos malformados como parte del pipeline.",
      "Preferir reruns repetibles antes que heroicidades de limpieza manual.",
    ], sections[3].querySelectorAll(".entry-card")[1]);
    setText("h2", "Diagrama del sistema", sections[4]);
    setText("h2", "Flujo operativo", sections[5]);
    setAll(".dossier-step .meta-label", ["01 Entrada", "02 Staging", "03 Limpieza", "04 Persistencia"], sections[5]);
    setAll(".dossier-step h3", ["Los lotes se reciben", "Las filas crudas se aíslan primero", "Las reglas normalizan el lote", "Los datos validados avanzan"], sections[5]);
    setAll(".dossier-step p", [
      "Los datasets fuente llegan con contenido, formato y trabajo de limpieza oculto inconsistentes.",
      "Los datos aterrizan en staging para que limpieza y validación puedan ocurrir antes de tocar tablas de producción.",
      "Los fixes de codificación, recortes, transformaciones y rejects se manejan como lógica de pipeline en vez de ediciones manuales.",
      "Solo las filas limpias y confiables continúan hacia el dataset operativo.",
    ], sections[5]);
    setAll("h2", ["Fragmento del repositorio", "Registro de decisión"], sections[6]);
    setText("p", "Basado en el script privado de automatización de importaciones, anonimizado hasta quedarse con el patrón de normalización.", sections[6].querySelectorAll(".entry-card")[0]);
    setAll(".decision-line .meta-label", ["Contexto", "Decisión", "Tradeoff", "Resultado"], sections[6].querySelectorAll(".entry-card")[1]);
    setAll(".decision-line p", [
      "Las importaciones parecían simples en muestras pequeñas, pero a escala creaban fixes manuales repetidos y fallos difíciles de reproducir.",
      "Construir lógica ETL por etapas con limpieza y validación explícitas en vez de empujar importaciones crudas directamente downstream.",
      "Más estructura de pipeline y más SQL, pero muchísima mejor repetibilidad cuando el tamaño del lote y la tasa de fallos importan.",
      "Las importaciones se convirtieron en workflows operativos en lugar de scripts frágiles que solo funcionan en días buenos.",
    ], sections[6].querySelectorAll(".entry-card")[1]);
    setAll("h2", ["Resultado", "Señales de producción"], sections[7]);
    setText("p", "Más de 900.000 registros fueron procesados mediante lógica ETL controlada, con problemas de codificación y limpieza tratados como asuntos del sistema en vez de parches ad hoc.", sections[7].querySelectorAll(".entry-card")[0]);
    setAll(".entry-bullets li", [
      "La codificación y la calidad del dato se volvieron preocupaciones arquitectónicas a volumen.",
      "Los ETL se construyeron para repetibilidad y visibilidad, no solo para throughput.",
      "Las importaciones dejaron de ser scripts cuando la gestión de errores pasó a ser trabajo operativo.",
      "Los reruns grandes se volvieron más seguros porque staging y cleanup eran explícitos.",
    ], sections[7].querySelectorAll(".entry-card")[1]);
    setAll("h2", ["Evidencia del flujo verificado", "Lectura operativa"], sections[8]);
    setText("p", "Comprobado contra los repositorios privados actuales detrás de estos workflows. La implementación no es solo limpieza SQL; también incluye aplanado de ficheros y lógica de entrega por destino.", sections[8].querySelectorAll(".entry-card")[0]);
    setAll(".entry-bullets li", [
      "Automatización en Python verificada para aplanar JSON anidado en estructuras tabulares.",
      "Uploads chunked a Google Sheets verificados para evitar fallos por tamaño de payload.",
      "Lógica de overwrite y rerun verificada para que el estado destino se mantenga controlado y no reparado a mano.",
    ], sections[8].querySelectorAll(".entry-card")[0]);
    setText("p", "Lo importante es que ingesta, normalización y entrega se tratan como un solo workflow. La importación no termina cuando parsear funciona; termina cuando el sistema destino está consistente.", sections[8].querySelectorAll(".entry-card")[1]);
  },
};

const journalEs = () => {
  setText(".entry-deck", "Cuaderno de decisiones técnicas, migraciones, fixes y lecciones aprendidas. No es un blog.");
  setText(".sheet-kicker", "Diario");
  setText(".entry-topbar .meta-label", "Diario de Ingeniería");
  setText(".entry-home", "Volver al cuaderno");
  setText("h1", "Diario de Ingeniería");
  document.title = "Diario de Ingeniería | Sergio Ballesteros";
  const entries = {
    "entry-01": {
      meta: ["Diseño de sistemas", "Migración", "Propiedad"],
      title: "Por qué migré este repositorio",
      body: "La estructura del repositorio se convierte en una decisión de sistema cuando la base de código tiene que soportar varios servicios y límites reales de ownership. La migración importa menos por limpieza y más por evitar fricción operativa.",
      related: ["OCM Brain", "Energy Simulator"],
      details: [
        ["Contexto", "A medida que las herramientas internas crecieron hacia servicios separados, una sola forma de repositorio estaba dificultando el razonamiento sobre ownership backend, reviews y despliegues."],
        ["Decisión", "Separar el trabajo de UI y utilidades de los servicios de producción estables para que el repositorio refleje mejor las responsabilidades de runtime."],
        ["Tradeoff", "La migración añade fricción a corto plazo, pero elimina la ambigüedad a largo plazo sobre dónde viven la lógica de negocio, los contratos de servicio y la responsabilidad de despliegue."],
        ["Resultado", "El repositorio dejó de comportarse como un volcado genérico de código y empezó a actuar como un mapa de ownership de sistemas."],
      ],
    },
    "entry-02": {
      meta: ["Importaciones", "Codificación", "Calidad de datos"],
      title: "Arreglar la codificación mientras importaba 900.000 registros",
      body: "A esa escala, los bugs de codificación dejan de ser edge cases. Pasan a formar parte del diseño del sistema de importación. La lección fue tratar limpieza, validación y gestión de fallos como requisitos de producción.",
      related: ["Data Processing"],
      details: [
        ["Problema", "Los datos parecían correctos en muestras controladas y luego se rompían cuando entraban en el mismo lote ficheros reales, codificaciones mixtas y filas malformadas."],
        ["Enfoque", "Normalizar la entrada pronto, validar la forma de cada fila antes de persistir y registrar los fallos por lote para que los reruns sean controlados y no improvisados."],
        ["Regla operativa", "Si una importación solo puede funcionar con babysitting manual, la importación sigue sin terminar."],
        ["Resultado", "El workflow pasó a ser repetible, más seguro de reejecutar y mucho menos dependiente de scripts de limpieza ad hoc."],
      ],
    },
    "entry-03": {
      meta: ["Operación LLM", "Validación", "Anthropic"],
      title: "Lo que aprendí integrando Anthropic",
      body: "La integración de modelos solo importa si el workflow alrededor es explícito. La parte difícil no es solo la calidad del prompt, sino hacer que el comportamiento de IA sea operativamente seguro dentro de un proceso de negocio.",
      related: ["OCM Brain", "Smart OCR"],
      details: [
        ["Contexto", "El objetivo no era hacer una demo de un modelo. El objetivo era colocar generación de lenguaje dentro de workflows de los que ventas y operaciones pudieran depender de verdad."],
        ["Decisión", "Tratar los prompts como un componente más y rodearlos de validación, salidas tipadas y rutas de fallback explícitas antes de tomar cualquier acción de negocio."],
        ["Tradeoff", "Añadir guardrails ralentiza el happy path, pero es la única forma de hacer tolerable el comportamiento de IA en producción."],
        ["Lección", "La seguridad operativa importa más que la novedad del modelo una vez que un proceso de negocio está en juego."],
      ],
    },
    "entry-04": {
      meta: ["Frameworks", "Servicios", "Operaciones"],
      title: "Por qué elegí Spring Boot",
      body: "En sistemas de producción, la convención y la claridad operativa suelen ganar a la novedad. La elección del framework vino por ownership de servicios, disciplina de runtime y mantenibilidad, no por tendencia.",
      related: ["OCM Brain"],
      details: [
        ["Necesidad", "Los servicios tenían que seguir siendo legibles, testeables y predecibles después de la fase de entrega inicial."],
        ["Decisión", "Usar Spring Boot como superficie backend por defecto para servicios de larga vida con convenciones explícitas y tooling fuerte de producción."],
        ["Tradeoff", "Es más pesado que frameworks mínimos, pero ese peso compra consistencia donde el ownership operativo dura más que el sprint."],
        ["Resultado", "El framework soporta madurez de servicio en lugar de pelearse con ella cuando el sistema se vuelve una dependencia real."],
      ],
    },
    "entry-05": {
      meta: ["Sistemas de producto", "Simulación", "Reutilización"],
      title: "Por qué convertí la lógica de pricing en una plataforma",
      body: "Cuando un cálculo lo usa más de una persona, el cuello de botella deja de ser la matemática. Es la inconsistencia. La decisión real fue dejar de tratar el análisis de pricing como lógica propiedad de un analista.",
      related: ["Energy Simulator"],
      details: [
        ["Contexto", "Los escenarios comerciales se recalculaban una y otra vez, lo que generaba retrasos, inconsistencia y demasiado conocimiento dependiente de una sola persona."],
        ["Decisión", "Mover la lógica de pricing a una plataforma de simulación compartida con inputs controlados, outputs estables y un flujo backend reutilizable."],
        ["Tradeoff", "Construir la plataforma requirió más esfuerzo que escribir otro script, pero eliminó trabajo manual repetido de cada ejecución futura."],
        ["Resultado", "La simulación pasó a ser una capacidad de producto en lugar de un ejercicio manual recurrente."],
      ],
    },
    "entry-06": {
      meta: ["Validación", "OCR", "Automatización"],
      title: "Por qué la precisión OCR no bastaba",
      body: "Un pipeline de extracción solo es útil cuando otro sistema puede confiar en el payload. La precisión alta está bien. La salida estructurada y confiable es el requisito real.",
      related: ["Smart OCR"],
      details: [
        ["Contexto", "Los outputs brutos de OCR y LLM parecían prometedores, pero los sistemas downstream seguían necesitando campos tipados y validados antes de poder continuar la automatización."],
        ["Decisión", "Insertar validación de esquema entre extracción y automatización downstream para que las salidas malformadas fallen pronto en vez de hacerlo en silencio."],
        ["Tradeoff", "La validación añade rutas de rechazo y más manejo, pero evita que payloads malos parezcan engañosamente útiles."],
        ["Resultado", "El pipeline pasó a ser más seguro operativamente y mucho más compatible con workflows backend."],
      ],
    },
  };

  Object.entries(entries).forEach(([id, entry]) => {
    const root = document.getElementById(id);
    if (!root) return;
    setText(".meta-label", `Entrada ${id.slice(-2)}`, root);
    setAll(".journal-meta span", entry.meta, root);
    setText("h3", entry.title, root);
    setText("p:not(.journal-related)", entry.body, root);
    const related = root.querySelector(".journal-related");
    if (related) {
      const urls = Array.from(related.querySelectorAll("a")).map((a) => a.getAttribute("href") || "");
      related.innerHTML = `Relacionados: ${entry.related
        .map((name, index) => `<a href="${urls[index] || '#'}">${name}</a>`)
        .join(", ")}`;
    }
    const details = root.querySelectorAll(".journal-detail");
    details.forEach((detail, index) => {
      if (!entry.details[index]) return;
      const [head, body] = entry.details[index];
      setText("h4", head, detail);
      setText("p", body, detail);
    });
  });
};

if (isEs) {
  const pageHandlers = {
    "ocm-brain": noteEs["ocm-brain"],
    "energy-simulator": noteEs["energy-simulator"],
    "smart-ocr": noteEs["smart-ocr"],
    "data-processing": noteEs["data-processing"],
  };
  if (pageHandlers[pageSlug]) pageHandlers[pageSlug]();
  if (isJournal) journalEs();
}

relinkLocal();
