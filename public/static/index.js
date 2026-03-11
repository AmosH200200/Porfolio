// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Skill bars animation
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-bar");
      skillBars.forEach((bar) => {
        bar.style.width = bar.getAttribute("data-width");
      });
    }
  });
}, observerOptions);

const skillsSection = document.querySelector("#skills");
if (skillsSection) observer.observe(skillsSection);

// Animated border effect following cursor with smooth movement
document.querySelectorAll(".card-hover").forEach((card) => {
  card.classList.add("cursor-border");

  let currentAngle = 0;
  let targetAngle = 0;
  let animationFrame = null;

  function animateAngle() {
    const diff = targetAngle - currentAngle;
    currentAngle += diff * 0.02;

    card.style.setProperty("--angle", `${currentAngle}deg`);

    if (Math.abs(diff) > 0.5) {
      animationFrame = requestAnimationFrame(animateAngle);
    }
  }

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 270;

    const angleDiff = targetAngle - currentAngle;
    if (angleDiff > 180) {
      currentAngle += 360;
    } else if (angleDiff < -180) {
      currentAngle -= 360;
    }

    if (!animationFrame) {
      animateAngle();
    }
  });

  card.addEventListener("mouseleave", () => {
    targetAngle = 0;
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    card.style.setProperty("--angle", "0deg");
    currentAngle = 0;
  });
});

// Message icon
const messageIcon = document.getElementById("messageIcon");
const closeIcon = document.getElementById("closeIcon");
const formOverlay = document.getElementById("formOverlay");

// Ouvrir le formulaire
messageIcon.addEventListener("click", () => {
  formOverlay.classList.add("active");
  messageIcon.classList.add("hidden-icon");
  closeIcon.classList.remove("hidden-icon");
});

// Fermer le formulaire via l'icône
closeIcon.addEventListener("click", () => {
  formOverlay.classList.remove("active");
  closeIcon.classList.add("hidden-icon");
  messageIcon.classList.remove("hidden-icon");
});

// Fermer le formulaire en cliquant sur l'overlay
formOverlay.addEventListener("click", (e) => {
  if (e.target === formOverlay) {
    formOverlay.classList.remove("active");
    closeIcon.classList.add("hidden-icon");
    messageIcon.classList.remove("hidden-icon");
  }
});

// Effet machine à écrire
const phrases = [
  "full-stack.",
  "d'applications web.",
  "de solutions numériques.",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const typewriterElement = document.getElementById("typewriter");

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(type, typingSpeed);
}

type();

// Mobile menu toggle
const menuBtnMobile = document.getElementById("menuBtnMobile");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuIconMobile = document.getElementById("menuIconMobile");
const closeIconMobile = document.getElementById("closeIconMobile");
const sidebarLinks = sidebar.querySelectorAll("a");

function openSidebar() {
  sidebar.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
  menuIconMobile.classList.add("hidden");
  closeIconMobile.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.add("translate-x-full");
  overlay.classList.add("hidden");
  menuIconMobile.classList.remove("hidden");
  closeIconMobile.classList.add("hidden");
  document.body.style.overflow = "";
}

menuBtnMobile.addEventListener("click", () => {
  if (sidebar.classList.contains("translate-x-full")) {
    openSidebar();
  } else {
    closeSidebar();
  }
});

overlay.addEventListener("click", closeSidebar);

sidebarLinks.forEach((link) => {
  link.addEventListener("click", closeSidebar);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !sidebar.classList.contains("translate-x-full")) {
    closeSidebar();
  }
});

// Animation Fade In Up au scroll
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}

function handleScrollAnimation() {
  const elements = document.querySelectorAll(".fade-in-up");
  elements.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

handleScrollAnimation();


// Formulaire de contact avec EmailJS

  const form = document.getElementById('contact-form');
  const btnText = document.getElementById('btn-text');
  const formMessage = document.getElementById('form-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // État chargement
    btnText.textContent = 'Envoi en cours...';
    form.querySelector('button').disabled = true;

    emailjs.sendForm('service_ituwhuk', 'template_oljkgow', form)
      .then(() => {
        formMessage.textContent = '✅ Message envoyé avec succès !';
        formMessage.className = 'mt-4 text-center text-sm text-green-400';
        formMessage.classList.remove('hidden');
        form.reset();
      })
      .catch((err) => {
        formMessage.textContent = '❌ Une erreur est survenue. Réessayez.';
        formMessage.className = 'mt-4 text-center text-sm text-red-400';
        formMessage.classList.remove('hidden');
        console.error(err);
      })
      .finally(() => {
        btnText.textContent = 'Prendre rendez-vous';
        form.querySelector('button').disabled = false;
      });
  });