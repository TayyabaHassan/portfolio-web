/* ============================================================
   Tayyaba Hassan — Portfolio interactions
   ============================================================ */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var footerYear = document.getElementById("year");
  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
    highlightActiveNav();
  }

  function highlightActiveNav() {
    var links = document.querySelectorAll(".nav-link");
    var scrollPos = window.scrollY + 120;
    var currentId = "hero";

    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
        currentId = section.id;
      }
    });

    links.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("active", isActive);
    });
  }

  function closeMenu() {
    if (navToggle && navLinks) {
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    }
  }

  function initNav() {
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  function initReveal() {
    var revealEls = document.querySelectorAll(".section > .container > .section-heading, .section > .container > .projects-grid, .section > .container > .skills-grid, .about-grid, .timeline, .contact-grid");
    if (revealEls.length === 0) return;

    revealEls.forEach(function (el) {
      el.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("visible");
      });
    }
  }

  function initFooterYear() {
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }
  }

  function initForm() {
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      var data = new FormData(contactForm);
      var payload = {};
      data.forEach(function (value, key) {
        payload[key] = value;
      });

      var mailtoUrl =
        "mailto:tayyaba2863@gmail.com" +
        "?subject=" + encodeURIComponent(payload.subject || "Portfolio Contact: " + payload.name) +
        "&body=" + encodeURIComponent("Name: " + payload.name + "\nEmail: " + payload.email + "\n\n" + payload.message);

      window.location.href = mailtoUrl;

      setFormStatus("Opening your email client to send the message. Thank you!", "success");

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      contactForm.reset();
    });
  }

  function setFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = "form-status " + (type || "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveal();
    initFooterYear();
    initForm();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });
})();
