const typedSpan = document.getElementById("typed-span");

if (typedSpan) {
  const spanItems = typedSpan.dataset.typedItems.split(",").map((item) => item.trim());
  let index = 1;

  setInterval(() => {
    typedSpan.textContent = spanItems[index];
    index = (index + 1) % spanItems.length;
  }, 2400);
}

const navbar = document.querySelector(".nav-bar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 8);
});

const hamburger = document.querySelector(".hamburger");
const navbarItems = document.querySelector(".navbar-items");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger && navbarItems) {
  hamburger.addEventListener("click", () => {
    const isOpen = navbarItems.classList.toggle("show");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navbarItems.classList.remove("show");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

const counters = document.querySelectorAll(".counter-num");
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counterElement) => {
    const target = Number.parseInt(counterElement.dataset.value, 10);
    const increment = Math.max(1, Math.ceil(target / 80));
    let current = 0;

    const interval = setInterval(() => {
      current = Math.min(target, current + increment);
      counterElement.textContent = target === 99 ? `${current}.9` : current.toLocaleString();

      if (current >= target) {
        counterElement.textContent = target === 99 ? "99.9" : target.toLocaleString();
        clearInterval(interval);
      }
    }, 18);
  });
}

const metricsSection = document.querySelector(".metrics-section");

if (metricsSection && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateCounters();
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(metricsSection);
} else {
  animateCounters();
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  const projects = window.portfolioProjects || [];

  if (!grid) return;

  grid.innerHTML = projects
    .map((project) => {
      const toolTags = project.tools.map((tool) => `<span>${tool}</span>`).join("");
      const links = Object.entries(project.links || {})
        .map(([label, href]) => `<a href="${href}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`)
        .join("");

      return `
        <article class="project-card${project.featured ? " featured" : ""}">
          <div class="project-topline">
            <span>${project.category}</span>
            <strong>${project.status}</strong>
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="tag-list">${toolTags}</div>
          <p class="project-outcome">${project.outcome}</p>
          <div class="project-links">${links || "<span>Links coming as work is published</span>"}</div>
        </article>`;
    })
    .join("");
}

function renderProductProjects() {
  const grid = document.getElementById("product-grid");
  const products = window.productProjects || [];

  if (!grid) return;

  grid.innerHTML = products
    .map((product) => {
      const skillTags = product.skills.map((skill) => `<span>${skill}</span>`).join("");

      return `
        <article class="product-card">
          <div class="project-topline">
            <span>${product.status}</span>
            <strong>${product.title}</strong>
          </div>
          <h3>${product.title}</h3>
          <p>${product.summary}</p>
          <dl class="product-details">
            <div>
              <dt>Problem</dt>
              <dd>${product.problem}</dd>
            </div>
            <div>
              <dt>Audience</dt>
              <dd>${product.audience}</dd>
            </div>
            <div>
              <dt>Impact area</dt>
              <dd>${product.impact}</dd>
            </div>
            <div>
              <dt>Security relevance</dt>
              <dd>${product.security}</dd>
            </div>
          </dl>
          <div class="tag-list">${skillTags}</div>
          <div class="project-links">
            <a href="${product.url}" target="_blank" rel="noopener">Visit product</a>
          </div>
        </article>`;
    })
    .join("");
}

renderProductProjects();
renderProjects();
