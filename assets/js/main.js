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

    document.addEventListener("languageChanged", () => {
        renderReleases();
        updateFeaturedRelease();
    });
});
