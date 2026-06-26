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
  },
};

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

function renderProject(project) {
  els.caseId.textContent = project.caseId;
  els.title.textContent = project.title;
  els.description.textContent = project.description;
  els.status.textContent = project.status;
  els.version.textContent = project.version;
  els.mission.textContent = project.mission;
  els.stack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join("");
  els.evidence.innerHTML = project.evidence.map((item) => `<span>${item}</span>`).join("");
  els.notes.innerHTML = project.notes.map((item) => `<li>${item}</li>`).join("");
  els.callout.textContent = project.callout || "System dossier";
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

    renderProject(project);
  });
});

renderProject(projects.ocm);
