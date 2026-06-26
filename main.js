const LAST_UPDATED = "25 Jun 2026";

const projects = {
  ocm: {
    caseId: "Case 001",
    title: "OCM Brain",
    status: "In production",
    version: "Version 1.8",
    callout: "Featured system dossier",
    url: "./notes/ocm-brain.html",
    description: "Service-backed AI layer for lead scoring, consent checks and sales-facing insight generation.",
    mission: "Run commercial scoring and decision support inside stable backend workflows.",
    stack: ["Spring Boot", "Python", "OpenAI", "Anthropic", "PostgreSQL", "Redis", "Kubernetes", "AWS"],
    evidence: ["Evidence 12", "MRs 4", "Diagrams 3", "Deploys 6"],
    notes: [
      "Lead Quality Scoring and Consent Freshness Scoring moved into production workflows.",
      "Architecture organized around services and explicit system boundaries.",
      "LLM integrations optimized for business process automation instead of demo UX.",
    ],
    i18n: {
      caseId: "Caso 001",
      status: "En producción",
      version: "Versión 1.8",
      description: "Capa de IA con servicios propios para lead scoring, verificación de consentimiento y generación de insights comerciales.",
      mission: "Ejecutar scoring comercial y soporte de decisiones estables.",
      callout: "Expediente principal",
      evidence: ["Evidencia 12", "MRs 4", "Diagramas 3", "Despliegues 6"],
      notes: [
        "Lead Quality Scoring y Consent Freshness Scoring integrados en workflows de producción.",
        "Arquitectura organizada en torno a servicios y límites de sistema explícitos.",
        "Integraciones con LLM optimizadas para automatización de procesos de negocio en lugar de UX de demo.",
      ],
    },
  },
  energy: {
    caseId: "Case 002",
    title: "Energy Simulator",
    status: "Healthy",
    version: "Version 2.3",
    callout: "System dossier",
    url: "./notes/energy-simulator.html",
    description: "Shared simulation backend for tariff scenarios, pricing logic and repeatable commercial analysis.",
    mission: "Turn repeated pricing analysis into one reusable product workflow.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Docker"],
    evidence: ["Evidence 9", "MRs 2", "Flows 3", "Deploys 4"],
    notes: [
      "Used internally across the company to simulate offers and pricing scenarios.",
      "Reduced analysis time by roughly 80 percent through workflow automation.",
      "Designed as a product system, not a one-off calculator.",
    ],
    i18n: {
      caseId: "Caso 002",
      status: "Saludable",
      version: "Versión 2.3",
      description: "Backend de simulación compartido para escenarios tarifarios, lógica de precios y análisis comercial repetible.",
      mission: "Convertir el análisis de precios repetido en un flujo de producto reutilizable.",
      callout: "Plataforma central",
      evidence: ["Evidencia 9", "MRs 2", "Flujos 3", "Despliegues 4"],
      notes: [
        "Usado internamente en toda la empresa para simular ofertas y escenarios de precios.",
        "Redujo el tiempo de análisis en torno a un 80 por ciento mediante automatización de workflows.",
        "Diseñado como sistema de producto, no como calculadora puntual.",
      ],
    },
  },
  ocr: {
    caseId: "Case 003",
    title: "Smart OCR",
    status: "Automated",
    version: "Version 1.2",
    callout: "System dossier",
    url: "./notes/smart-ocr.html",
    description: "Document extraction pipeline that turns OCR output into validated structured payloads.",
    mission: "Move document data into backend workflows without trusting raw extraction alone.",
    stack: ["Python", "OpenAI", "OCR", "Pydantic"],
    evidence: ["Evidence 8", "MRs 2", "Checks 5", "Runs 20+"],
    notes: [
      "Validation steps added to keep extraction quality production-safe.",
      "More than 98 percent accuracy on the target workflow.",
      "Built around automation, not manual operator review.",
    ],
    i18n: {
      caseId: "Caso 003",
      status: "Automatizado",
      version: "Versión 1.2",
      description: "Pipeline de extracción de documentos que convierte la salida OCR en payloads estructurados y validados.",
      mission: "Mover datos de documentos a flujos backend sin confiar en la extracción bruta.",
      callout: "Flujo de IA",
      evidence: ["Evidencia 8", "MRs 2", "Controles 5", "Ejecuciones 20+"],
      notes: [
        "Pasos de validación añadidos para mantener la calidad de extracción en producción.",
        "Más del 98 por ciento de precisión en el flujo objetivo.",
        "Construido en torno a la automatización, no a la revisión manual por operador.",
      ],
    },
  },
  data: {
    caseId: "Case 004",
    title: "Data Processing",
    status: "Active",
    version: "Version 3.1",
    callout: "System dossier",
    url: "./notes/data-processing.html",
    description: "Import and cleanup workflows built to survive large batches, bad encoding and reruns.",
    mission: "Run high-volume imports without turning failure handling into manual work.",
    stack: ["Python", "MySQL", "PostgreSQL", "SQL"],
    evidence: ["Evidence 11", "MRs 3", "Queries 7", "Records 900K+"],
    notes: [
      "Resolved encoding and import issues while processing 900,000 plus records.",
      "Turned repetitive imports into repeatable automated ETL workflows.",
      "Focused on reliability and operational safety over scripting speed alone.",
    ],
    i18n: {
      caseId: "Caso 004",
      status: "Activo",
      version: "Versión 3.1",
      description: "Flujos de importación y limpieza diseñados para soportar lotes grandes, codificaciones malas y reruns.",
      mission: "Ejecutar importaciones de alto volumen sin convertir la gestión de fallos en trabajo manual.",
      callout: "Operaciones de datos",
      evidence: ["Evidencia 11", "MRs 3", "Consultas 7", "Registros 900K+"],
      notes: [
        "Resueltos problemas de codificación e importación procesando más de 900.000 registros.",
        "Importaciones repetitivas convertidas en flujos ETL automatizados y repetibles.",
        "Enfoque en fiabilidad y seguridad operativa por encima de la velocidad de scripting.",
      ],
    },
  },
};

let currentLang = localStorage.getItem("lang") || "en";

const els = {
  caseId: document.getElementById("project-case"),
  title: document.getElementById("project-title"),
  description: document.getElementById("project-description"),
  status: document.getElementById("project-status"),
  version: document.getElementById("project-version"),
  mission: document.getElementById("project-mission"),
  stack: document.getElementById("project-stack"),
  evidence: document.getElementById("project-evidence"),
  notes: document.getElementById("project-notes"),
  callout: document.getElementById("project-callout"),
  link: document.getElementById("project-link"),
};

const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const navTargets = navLinks.map((link) => link.getAttribute("href")).filter(Boolean);

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.title = lang === "es"
    ? "Sergio Ballesteros | Cuaderno de Ingeniería"
    : "Sergio Ballesteros | Engineering Notebook";
  const T = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (T[key] !== undefined) {
      el.textContent = T[key];
    }
  });

  const activeBtn = document.querySelector(".casefile.is-active");
  if (activeBtn) {
    const project = projects[activeBtn.dataset.project];
    if (project) {
      renderProject(project, lang);
    }
  }

  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.textContent = lang === "en" ? "ES" : "EN";
    btn.dataset.lang = lang;
  });
}

function renderProject(project, lang = currentLang) {
  const t = lang === "es" && project.i18n ? project.i18n : null;
  els.caseId.textContent = t ? t.caseId : project.caseId;
  els.title.textContent = project.title;
  els.description.textContent = t ? t.description : project.description;
  els.status.textContent = t ? t.status : project.status;
  els.version.textContent = t ? t.version : project.version;
  els.mission.textContent = t ? t.mission : project.mission;
  els.stack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join("");
  els.evidence.innerHTML = (t ? t.evidence : project.evidence).map((item) => `<span>${item}</span>`).join("");
  els.notes.innerHTML = (t ? t.notes : project.notes).map((item) => `<li>${item}</li>`).join("");
  els.callout.textContent = t ? t.callout : project.callout || "System dossier";
  els.link.href = project.url;
}

document.querySelectorAll("[data-last-updated]").forEach((node) => {
  node.textContent = LAST_UPDATED;
});

function setActiveNavLink(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

setActiveNavLink("overview");

if ("IntersectionObserver" in window) {
  const sections = navTargets
    .map((href) => document.querySelector(href))
    .filter((section) => section instanceof HTMLElement);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.target.offsetTop - b.target.offsetTop);

      if (visible.length > 0) {
        setActiveNavLink(visible[0].target.id);
      }
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

const revealSections = Array.from(document.querySelectorAll("main section"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.setAttribute("data-reveal", "");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" }
  );

  revealSections.forEach((section) => revealObserver.observe(section));
}

document.querySelectorAll(".casefile").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.project;
    const project = projects[key];
    if (!project) return;

    document.querySelectorAll(".casefile").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    renderProject(project, currentLang);
  });
});

document.querySelectorAll(".lang-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "es" : "en");
  });
});

renderProject(projects.ocm, currentLang);
applyLanguage(currentLang);
