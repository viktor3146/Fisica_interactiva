// Initialize Lucide icons
lucide.createIcons();

// ---- Mobile menu toggle ----
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;

menuToggle.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  // Swap icon
  const icon = menuToggle.querySelector("i");
  icon.setAttribute("data-lucide", menuOpen ? "x" : "menu");
  lucide.createIcons();
});

// Close mobile menu on link click
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    const icon = menuToggle.querySelector("i");
    icon.setAttribute("data-lucide", "menu");
    lucide.createIcons();
  });
});

// ---- Scroll fade-in ----
const fadeEls = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

fadeEls.forEach((el) => observer.observe(el));

// ---- Active nav on scroll ----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (
      href === "#" + current ||
      (current === "inicio" && href === "#inicio")
    ) {
      link.classList.add("active");
    }
  });
});

// ---- Toast ----
function showToast(msg) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  toastMsg.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ---- Contact form ----
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showToast("Por favor completa todos los campos requeridos");
    return;
  }

  // Simple email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("Ingresa un correo electrónico válido");
    return;
  }

  showToast("¡Mensaje enviado! Gracias, " + name);
  e.target.reset();
});
