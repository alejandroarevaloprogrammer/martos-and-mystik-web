import { initLanguageSwitcher } from "./translations.js";
import { renderReleases, updateFeaturedRelease } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
    initLanguageSwitcher();
    renderReleases();
    updateFeaturedRelease();

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

    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navbarNavLinks = document.querySelectorAll(".navbar-collapse .nav-link");

    navbarNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992 && navbarCollapse) {
                bootstrap.Collapse
                    .getOrCreateInstance(navbarCollapse)
                    .hide();
            }
        });
    });

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

    document.addEventListener("languageChanged", () => {
        renderReleases();
        updateFeaturedRelease();
    });

    const contactForm = document.querySelector("#contactForm");
const contactStatus = document.querySelector("#contactStatus");

if (contactForm && contactStatus) {
    emailjs.init("TU_PUBLIC_KEY");

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        contactStatus.textContent = "Sending...";

        try {
            await emailjs.sendForm(
                "TU_SERVICE_ID",
                "TU_TEMPLATE_ID",
                contactForm
            );

            contactStatus.textContent = "Message sent successfully.";
            contactForm.reset();
        } catch (error) {
            contactStatus.textContent = "There was an error sending the message.";
        }
    });
}
});