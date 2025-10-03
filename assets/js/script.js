
"use strict";

// --------------------------
// Utility
// --------------------------
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// --------------------------
// Sidebar
// --------------------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn?.addEventListener("click", () => elementToggleFunc(sidebar));

// --------------------------
// Modals (Testimonials & Portfolio)
// --------------------------
const modalContainer = document.querySelector("[data-modal-container]");
const overlay = document.querySelector("[data-overlay]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalLanguages = document.querySelector("[data-modal-languages]");
const modalLink = document.querySelector("[data-modal-link]");
const modalDate = document.querySelector("[data-modal-date]");

const toggleModal = () => {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

// Testimonials
document.querySelectorAll("[data-testimonials-item]").forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]")?.src || "";
    modalImg.alt = item.querySelector("[data-testimonials-avatar]")?.alt || "";
    modalTitle.textContent = item.querySelector("[data-testimonials-title]")?.textContent || "";
    modalText.textContent = item.querySelector("[data-testimonials-text]")?.textContent || "";
    toggleModal();
  });
});

// Portfolio
const portfolioProjects = {
  mapliance: {
    img: './assets/images/Mapliance.jpg',
    title: 'Mapliance',
    category: 'Web Development',
    description: 'A smart compliance and audit web app that streamlines regulatory checks and reporting.',
    languages: 'React, Django',
    link: '#' // private source
  },
  tidjaria: {
    img: './assets/images/Tidjaria.png',
    title: 'Tidjaria',
    category: 'Web Development',
    description: 'Multi-shop e-commerce platform designed to handle complex online store networks effortlessly.',
    languages: 'PrestaShop, PHP',
    link: '#' // private source
  },
  gym: {
    img: './assets/images/Gym.png',
    title: 'Gym Management App',
    category: 'Mobile Applications',
    description: 'All-in-one app for managing gyms, tracking members, schedules, and performance metrics.',
    languages: 'Flutter, Dart, JS',
    link: 'https://github.com/k2arim98/Gym_Management'
  },
  irecommend: {
    img: './assets/images/Ireccomend.png',
    title: 'iReccomend',
    category: 'Mobile Applications',
    description: 'A personalized recommendation engine that suggests places based on user preferences, sentiment, hashtags, likes, and views.',
    languages: '100% Dart',
    link: 'https://github.com/k2arim98/iReccomend'
  },
  h24care: {
    img: './assets/images/H24care.png',
    title: 'H24care',
    category: 'Web Development',
    description: 'AI-driven health platform that transforms patient triage, reducing waiting times through the automated FRENCH protocol.',
    languages: 'React, Laravel',
    link: '#' // private source
  },
  frenchTri: {
    img: './assets/images/frenchTri.jpg',
    title: 'AI French Tri System',
    category: 'AI Systems',
    description: 'An AI system leveraging the French Tri 5 protocol and GPT-4 to optimize healthcare triage processes.',
    languages: 'Laravel, Azure Ai Foundry, OpenAI',
    link: '#' // private source
  },
  chatbot: {
    img: './assets/images/chatbot.jpg',
    title: 'AI Pre-consultation Chatbot',
    category: 'AI Systems',
    description: 'Sophisticated pre-consultation chatbot that gathers patient info via SMS link to generate structured summaries for doctors.',
    languages: 'Laravel, Azure Ai Foundry, OpenAI',
    link: '#' // private source
  },
  analysis: {
    img: './assets/images/analysis.webp',
    title: 'Analysis Tool',
    category: 'Applications',
    description: 'Transforms SAP PP data into actionable insights for production efficiency, resource allocation, and operational planning.',
    languages: 'Python',
    link: 'https://github.com/k2arim98/AnalysisTool'
  }
};

document.querySelectorAll("[data-modal-target]").forEach(link => {
  link.addEventListener("click", () => {
    const projectKey = link.dataset.modalTarget;
    const project = portfolioProjects[projectKey];
    if (!project) return;

    modalImg.src = project.img;
    modalImg.alt = project.title;
    modalTitle.textContent = project.title;
    if (modalText) modalText.querySelector("p").textContent = project.description || "";
    if (modalLanguages) modalLanguages.textContent = project.languages || "";
    if (modalLink) {
      if (project.link && project.link !== "#") {
        modalLink.href = project.link;
        modalLink.style.display = "inline-block"; // show button
      } else {
        modalLink.style.display = "none"; // hide button
      }
    }

    if (modalDate) modalDate.textContent = project.date || "";

    toggleModal();
  });
});

// Close modal
modalCloseBtn?.addEventListener("click", toggleModal);
overlay?.addEventListener("click", toggleModal);

// --------------------------
// Custom select & filtering
// --------------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select?.addEventListener("click", () => elementToggleFunc(select));
selectItems.forEach(item => item.addEventListener("click", () => {
  const selectedValue = item.innerText.toLowerCase();
  if (selectValue) selectValue.textContent = item.innerText;
  elementToggleFunc(select);
  filterItems.forEach(fi => fi.classList.toggle("active", selectedValue === "all" || fi.dataset.category?.toLowerCase() === selectedValue));
}));

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => btn.addEventListener("click", () => {
  const selectedValue = btn.textContent.toLowerCase();
  if (selectValue) selectValue.textContent = btn.textContent;
  filterItems.forEach(fi => fi.classList.toggle("active", selectedValue === "all" || fi.dataset.category?.toLowerCase() === selectedValue));
  lastClickedBtn?.classList.remove("active");
  btn.classList.add("active");
  lastClickedBtn = btn;
}));

// --------------------------
// Contact form validation
// --------------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => input.addEventListener("input", () => {
  formBtn?.toggleAttribute("disabled", !form.checkValidity());
}));

// --------------------------
// Page navigation
// --------------------------
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("article[data-page]");

navLinks.forEach(link => link.addEventListener("click", () => {
  const targetPage = link.textContent.trim().toLowerCase();
  pages.forEach(page => page.classList.toggle("active", page.dataset.page.toLowerCase() === targetPage));
  navLinks.forEach(l => l.classList.remove("active"));
  link.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}));
