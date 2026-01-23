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

      //       // Animated border effect following cursor
      //       document.querySelectorAll(".card-hover").forEach((card) => {
      //         card.classList.add("cursor-border");

      //   // Ajouter la transition pour ralentir le mouvement
      //   card.style.transition = "--angle 0.3s ease-out";

      //         card.addEventListener("mousemove", (e) => {
      //           const rect = card.getBoundingClientRect();
      //           const x = e.clientX - rect.left;
      //           const y = e.clientY - rect.top;

      //           // Calcul de l'angle en degrés basé sur la position du curseur
      //           const centerX = rect.width / 2;
      //           const centerY = rect.height / 2;

      //           const angle =
      //             Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;

      //           card.style.setProperty("--angle", `${angle}deg`);
      //         });

      //         card.addEventListener("mouseleave", () => {
      //           card.style.setProperty("--angle", "0deg");
      //         });
      //       });

      // Animated border effect following cursor with smooth movement
      document.querySelectorAll(".card-hover").forEach((card) => {
        card.classList.add("cursor-border");

        let currentAngle = 0;
        let targetAngle = 0;
        let animationFrame = null;

        // Fonction pour animer en douceur
        function animateAngle() {
          // Interpolation pour un mouvement fluide
          const diff = targetAngle - currentAngle;
          currentAngle += diff * 0.02; // 0.1 = vitesse (plus petit = plus lent)

          card.style.setProperty("--angle", `${currentAngle}deg`);

          // Continuer l'animation si pas encore arrivé
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

          targetAngle =
            Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 270;

          // Gérer le passage de 360° à 0° pour éviter les sauts
          const angleDiff = targetAngle - currentAngle;
          if (angleDiff > 180) {
            currentAngle += 360;
          } else if (angleDiff < -180) {
            currentAngle -= 360;
          }

          // Démarrer l'animation si pas déjà en cours
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

      //Message icon
      const messageIcon = document.getElementById("messageIcon");
      const closeIcon = document.getElementById("closeIcon");
      const formOverlay = document.getElementById("formOverlay");
      const contactForm = document.getElementById("contactForm");

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

      // Gestion de la soumission du formulaire
   /*   contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

       const formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          message: document.getElementById("message").value,
        }; 

        // Réinitialiser et fermer
        contactForm.reset();
        formOverlay.classList.remove("active");
        closeIcon.classList.add("hidden-icon");
        messageIcon.classList.remove("hidden-icon");
      }); */

      //Effet machine à écrire
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
          typewriterElement.textContent = currentPhrase.substring(
            0,
            charIndex - 1
          );
          charIndex--;
          typingSpeed = 50;
        } else {
          typewriterElement.textContent = currentPhrase.substring(
            0,
            charIndex + 1
          );
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

      //Mobile menu toggle
      const menuBtnMobile = document.getElementById("menuBtnMobile");
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("overlay");
      const menuIconMobile = document.getElementById("menuIconMobile");
      const closeIconMobile = document.getElementById("closeIconMobile");
      const sidebarLinks = sidebar.querySelectorAll("a");

      // Fonction pour ouvrir la sidebar
      function openSidebar() {
        sidebar.classList.remove("translate-x-full");
        overlay.classList.remove("hidden");
        menuIconMobile.classList.add("hidden");
        closeIconMobile.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }

      // Fonction pour fermer la sidebar
      function closeSidebar() {
        sidebar.classList.add("translate-x-full");
        overlay.classList.add("hidden");
        menuIconMobile.classList.remove("hidden");
        closeIconMobile.classList.add("hidden");
        document.body.style.overflow = "";
      }

      // Toggle au clic sur le bouton menu
      menuBtnMobile.addEventListener("click", () => {
        if (sidebar.classList.contains("translate-x-full")) {
          openSidebar();
        } else {
          closeSidebar();
        }
      });

      // Fermer au clic sur l'overlay
      overlay.addEventListener("click", closeSidebar);

      // Fermer au clic sur un lien
      sidebarLinks.forEach((link) => {
        link.addEventListener("click", closeSidebar);
      });

      // Fermer avec la touche Escape
      document.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          !sidebar.classList.contains("translate-x-full")
        ) {
          closeSidebar();
        }
      });

      // Animation Fade In Up au scroll
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}

function handleScrollAnimation() {
  const elements = document.querySelectorAll('.fade-in-up');
  
  elements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

// Écouteurs d'événements
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Vérification initiale
handleScrollAnimation();
