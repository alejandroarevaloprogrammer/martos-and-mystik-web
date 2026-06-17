import { releases } from "./releases.js";
import { getCurrentLanguage, t } from "./translations.js";

function getDescription(release) {
    const lang = getCurrentLanguage();

    if (!release.description) return "";

    return release.description[lang] || release.description.en || "";
}

function renderTracklist(tracks = []) {
    if (!tracks.length) return "";

    const items = tracks.map((track) => {
        const link = track.youtube
            ? `<a href="${track.youtube}" target="_blank" rel="noopener">${track.title}</a>`
            : `${track.title} <span class="small">(${t("comingSoon")})</span>`;

        return `<li>${link}</li>`;
    }).join("");

    return `<ol class="tracklist">${items}</ol>`;
}

function renderReleaseCard(release) {
    const description = getDescription(release);
    const type = release.type === "album" ? "Album" : "Single";

    const listenButton = release.youtube
        ? `<a href="${release.youtube}" target="_blank" rel="noopener" class="btn btn-mm mt-3">${t("viewOnYoutube")}</a>`
        : "";

    return `
        <div class="col-lg-6 mx-auto">
            <article class="album-card">
                <img src="${release.cover}" alt="${release.title} cover">

                <div class="card-body">
                    <p class="eyebrow">${type}</p>
                    <h3>${release.title}</h3>
                    <p class="album-meta">Martos & Mystic · ${release.year}</p>
                    <p>${description}</p>

                    ${renderTracklist(release.tracks)}
                    ${listenButton}
                </div>
            </article>
        </div>
    `;
}

export function renderReleases() {
    const container = document.querySelector("#albums");

    if (!container) return;

    const ordered = [...releases].sort((a, b) => Number(b.year) - Number(a.year));

    container.innerHTML = ordered.map(renderReleaseCard).join("");
}

export function updateFeaturedRelease() {
    const featured = releases.find((release) => release.featured) || releases[0];

    if (!featured) return;

    const heroButton = document.querySelector("[data-featured-link]");

    if (heroButton && featured.youtube) {
        heroButton.href = featured.youtube;
        heroButton.target = "_blank";
        heroButton.rel = "noopener";
    }
}
