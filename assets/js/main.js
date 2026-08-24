import { initLanguageSwitcher, t } from "./translations.js";
import { renderReleases, updateFeaturedRelease } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
    initLanguageSwitcher();
    renderReleases();
    updateFeaturedRelease();

    // =========================================
    // BACK TO TOP
    // =========================================

    const backToTopButton = document.querySelector("#backToTop");

    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add("is-visible");
            } else {
                backToTopButton.classList.remove("is-visible");
            }
        });

        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // =========================================
    // MOBILE / TABLET NAVBAR
    // =========================================

    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navbarNavLinks = document.querySelectorAll(
        ".navbar-collapse .nav-link"
    );

    // Close menu when clicking a navigation link
    navbarNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992 && navbarCollapse) {
                bootstrap.Collapse
                    .getOrCreateInstance(navbarCollapse)
                    .hide();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!navbarCollapse) return;

        const isMenuOpen = navbarCollapse.classList.contains("show");
        if (!isMenuOpen) return;

        const navbar = document.querySelector(".navbar");

        if (navbar && !navbar.contains(event.target)) {
            bootstrap.Collapse
                .getOrCreateInstance(navbarCollapse)
                .hide();
        }
    });

    // =========================================
    // CONTACT FORM
    // =========================================

    const contactForm = document.querySelector("#contactForm");
    const contactSubmit = document.querySelector("#contactSubmit");
    const contactStatus = document.querySelector("#contactStatus");

    if (contactForm && contactSubmit && contactStatus) {
        const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY";
        const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";
        const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            contactSubmit.disabled = true;
            contactSubmit.textContent = t("contactSending");
            contactStatus.textContent = "";

            try {
                await emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    contactForm
                );

                contactForm.reset();

                contactStatus.textContent = t("contactSuccess");
            } catch (error) {
                console.error("EmailJS error:", error);

                contactStatus.textContent = t("contactError");
            } finally {
                contactSubmit.disabled = false;
                contactSubmit.textContent = t("contactSend");
            }
        });
    }

    // =========================================
    // LANGUAGE CHANGE
    // =========================================

    document.addEventListener("languageChanged", () => {
        renderReleases();
        updateFeaturedRelease();

        if (contactSubmit) {
            contactSubmit.textContent = t("contactSend");
        }

        if (contactStatus) {
            contactStatus.textContent = "";
        }
    });
});