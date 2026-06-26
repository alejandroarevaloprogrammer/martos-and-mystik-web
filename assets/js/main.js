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
});