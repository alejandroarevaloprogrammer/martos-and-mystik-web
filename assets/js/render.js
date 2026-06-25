import { releases } from "./releases.js";
import { getCurrentLanguage, t } from "./translations.js";

function formatDate(dateString) {
    if (!dateString) return "";

    const languageMap = {
        en: "en-GB",
        es: "es-ES",
        ca: "ca-ES"
    };

    const date = new Date(`${dateString}T00:00:00`);
    const locale = languageMap[getCurrentLanguage()] || "en-GB";

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(date);
}

function getDescription(release) {
    const lang = getCurrentLanguage();
    return release.description?.[lang] || release.description?.en || "";
}

function releaseButton(url) {
    if (!url) return "";
    return `<a href="${url}" target="_blank" rel="noopener" class="btn btn-mm mt-3">${t("viewOnYoutube")}</a>`;
}

function renderTrack(track) {
    return `
        <div class="col-12 col-md-6">
            <article class="track-card">
                <a href="${track.youtube}" target="_blank" rel="noopener">
                    <img src="${track.cover}" alt="${track.title} cover">
                </a>
                <div class="track-card-body">
                    <p class="track-number">${String(track.number).padStart(2, "0")}</p>
                    <h4>${track.title}</h4>
                    <p>${formatDate(track.releaseDate)}</p>
                </div>
            </article>
        </div>
    `;
}

function renderAlbum(album) {
    const tracks = album.tracks?.map(renderTrack).join("") || "";

    return `
        <div class="col-12">
            <article class="release-card release-card-featured">
                <div class="row g-0 align-items-stretch">
                    <div class="col-lg-5">
                        <img class="release-cover" src="${album.cover}" alt="${album.title} album cover">
                    </div>

                    <div class="col-lg-7">
                        <div class="release-body">
                            <p class="eyebrow">${t("albumsTitle")}</p>
                            <h3>${album.title}</h3>
                            <p class="album-meta">${album.artist} · ${formatDate(album.releaseDate)}</p>
                            <p>${getDescription(album)}</p>
                            ${releaseButton(album.youtube)}
                        </div>
                    </div>
                </div>
            </article>

            <h3 class="subsection-title">${t("tracksTitle")}</h3>
            <div class="row g-4">${tracks}</div>
        </div>
    `;
}

function renderSingle(single) {
    return `
        <div class="col-12 col-md-6">
            <article class="track-card h-100">
                <a href="${single.youtube}" target="_blank" rel="noopener">
                    <img src="${single.cover}" alt="${single.title} cover">
                </a>
                <div class="track-card-body">
                    <p class="eyebrow">${single.type}</p>
                    <h4>${single.title}</h4>
                    <p>${single.artist} · ${formatDate(single.releaseDate)}</p>
                    ${releaseButton(single.youtube)}
                </div>
            </article>
        </div>
    `;
}

export function renderReleases() {
    const container = document.querySelector("#albums");
    if (!container) return;

    const albums = releases
        .filter(release => release.type === "album")
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

    const singles = releases
        .filter(release => release.type === "single")
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

    const albumMarkup = albums.map(renderAlbum).join("");
    const singleMarkup = singles.map(renderSingle).join("");

    container.innerHTML = `
        <div class="discography-block mt-5">
            <h3 class="subsection-title">${t("singlesTitle")}</h3>
            <div class="row g-4">${singleMarkup}</div>
        </div>

        <div class="discography-block">
            <h3 class="subsection-title">${t("albumsTitle")}</h3>
            <div class="row g-4">${albumMarkup}</div>
        </div>
    `;
}

export function updateFeaturedRelease() {
    const featured = releases.find(release => release.featured) || releases[0];
    if (!featured) return;

    const title = document.querySelector("[data-featured-title]");
    const date = document.querySelector("[data-featured-date]");
    const image = document.querySelector("[data-featured-cover]");
    const button = document.querySelector("[data-featured-link]");

    if (title) title.textContent = featured.title;
    if (date) date.textContent = formatDate(featured.releaseDate);
    if (image) {
        image.src = featured.cover;
        image.alt = `${featured.title} cover`;
    }

    if (button && featured.youtube) {
        button.href = featured.youtube;
        button.target = "_blank";
        button.rel = "noopener";
    }
}
