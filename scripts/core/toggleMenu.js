document.addEventListener("DOMContentLoaded", function () {
        const hamburger = document.getElementById("hamburger");
        const mobileMenu = document.getElementById("mobileMenu");
        const overlay = document.getElementById("mobileMenuOverlay");
        const closeBtn = document.getElementById("closeMenuBtn");
        const body = document.body;

        function openMenu() {
          hamburger.classList.add("active");
          mobileMenu.classList.add("active");
          overlay.classList.add("active");
          body.classList.add("menu-open");
          hamburger.setAttribute("aria-expanded", "true");
        }

        function closeMenu() {
          hamburger.classList.remove("active");
          mobileMenu.classList.remove("active");
          overlay.classList.remove("active");
          body.classList.remove("menu-open");
          hamburger.setAttribute("aria-expanded", "false");
        }

        function toggleMenu(e) {
          e.stopPropagation();
          mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
        }

        // Hamburger toggle
        hamburger.addEventListener("click", toggleMenu);

        // Close button
        closeBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          closeMenu();
        });

        // Overlay click closes menu
        overlay.addEventListener("click", closeMenu);

        // Close on link click
        mobileMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", closeMenu);
        });

        // Escape key support
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") closeMenu();
        });

        // Prevent clicks inside menu from bubbling
        mobileMenu.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      });