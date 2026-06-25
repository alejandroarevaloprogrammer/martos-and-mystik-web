import { translations } from "./translations-data.js";

let currentLanguage = "en";

export function getCurrentLanguage() {
    return currentLanguage;
}

export function t(key) {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
}

export function setLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });

    document.querySelectorAll("[data-lang]").forEach(button => {
        button.classList.toggle("active", button.dataset.lang === language);
    });

    localStorage.setItem("martosMystikLanguage", language);
    document.dispatchEvent(new CustomEvent("languageChanged"));
}

export function initLanguageSwitcher() {
    const savedLanguage = localStorage.getItem("martosMystikLanguage") || "en";

    document.querySelectorAll("[data-lang]").forEach(button => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.lang);
        });
    });

    setLanguage(savedLanguage);
}
