import { initLanguageSwitcher } from "./translations.js";
import { renderReleases, updateFeaturedRelease } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
    initLanguageSwitcher();
    renderReleases();
    updateFeaturedRelease();

    document.addEventListener("languageChanged", () => {
        renderReleases();
    });
});
