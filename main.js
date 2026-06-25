const projects = {
  ocm: {
    caseId: "Case 001",
    title: "OCM Brain",
    status: "In production",
    version: "Version 1.8",
    url: "./notes/ocm-brain.html",
    description: "AI platform for commercial intelligence, lead scoring and automated insights.",
    mission: "Commercial intelligence and AI-assisted decision support.",
    stack: ["Spring Boot", "Python", "OpenAI", "Anthropic", "PostgreSQL", "Kubernetes", "AWS"],
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
    url: "./notes/energy-simulator.html",
    description: "Simulation engine for energy offer scenarios and pricing optimization.",
    mission: "Automate commercial simulation and reduce manual analysis time.",
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
    url: "./notes/smart-ocr.html",
    description: "OCR + LLM pipeline for document extraction with high accuracy.",
    mission: "Extract structured information from unstructured documents reliably.",
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
    url: "./notes/data-processing.html",
    description: "Mass data pipelines, cleansing and ETL automation for critical datasets.",
    mission: "Process large operational datasets without fragile manual imports.",
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
  link: document.getElementById("project-link"),
};

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
  els.link.href = project.url;
}

document.querySelectorAll('[data-action="print"]').forEach((button) => {
  button.addEventListener("click", () => window.print());
});

document.querySelectorAll(".casefile").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.project;
    const project = projects[key];
    if (!project) return;

    document.querySelectorAll(".casefile").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    renderProject(project);
  });
});

document.querySelectorAll("main section, .notebook-rail").forEach((section, index) => {
  section.setAttribute("data-reveal", "");
  section.style.animationDelay = `${index * 60}ms`;
});

renderProject(projects.ocm);
