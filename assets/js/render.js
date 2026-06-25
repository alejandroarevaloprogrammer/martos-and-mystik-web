import { discography } from "./discography.js";
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

function bandcampPlayer(embedUrl, title = "", bandcampUrl = "") {
    if (!embedUrl) return "";

    const fallbackUrl = bandcampUrl || "https://martosandmystik.bandcamp.com";

    return `
        <div class="bandcamp-player mt-3">
            <iframe
                src="${embedUrl}"
                title="Bandcamp player ${title}"
                loading="lazy"
                seamless>
                <a href="${fallbackUrl}">${title} de Martos and Mystik</a>
            </iframe>
        </div>
    `;
}

function renderTrack(track) {
    const bandcamp = track.platforms?.bandcamp;

    return `
        <div class="col-12 col-md-6">
            <article class="track-card h-100">
                <img src="${track.cover}" alt="${track.title} cover">

                <div class="track-card-body">
                    <p class="track-number">${String(track.number).padStart(2, "0")}</p>
                    <h4>${track.title}</h4>
                    <p>${formatDate(track.releaseDate)}</p>

                    ${bandcampPlayer(bandcamp?.embed, track.title, bandcamp?.url)}
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
    const bandcamp = single.platforms?.bandcamp;

    return `
        <div class="col-12 col-md-6">
            <article class="track-card h-100">
                <img src="${single.cover}" alt="${single.title} cover">

                <div class="track-card-body">
                    <p class="eyebrow">${single.type}</p>
                    <h4>${single.title}</h4>
                    <p>${single.artist} · ${formatDate(single.releaseDate)}</p>

                    ${bandcampPlayer(bandcamp?.embed, single.title, bandcamp?.url)}
                </div>
            </article>
        </div>
    `;
}

export function renderReleases() {
    const container = document.querySelector("#albums");
    if (!container) return;

    const albums = discography
        .filter(release => release.type === "album")
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

    const singles = discography
        .filter(release => release.type === "single")
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

    const albumMarkup = albums.map(renderAlbum).join("");
    const singleMarkup = singles.map(renderSingle).join("");

    container.innerHTML = `
        <div class="discography-block">
            <h3 class="subsection-title">${t("singlesTitle")}</h3>
            <div class="row g-4">${singleMarkup}</div>
        </div>

        <div class="discography-block mt-5">
            <h3 class="subsection-title">${t("albumsTitle")}</h3>
            <div class="row g-4">${albumMarkup}</div>
        </div>
    `;
}

export function updateFeaturedRelease() {
    const featured = discography.find(release => release.featured) || discography[0];

    if (!featured) return;

    const title = document.querySelector("[data-featured-title]");
    const date = document.querySelector("[data-featured-date]");
    const image = document.querySelector("[data-featured-cover]");
    const featuredBandcamp = document.querySelector("[data-featured-bandcamp]");
    const bandcamp = featured.platforms?.bandcamp;

    if (title) title.textContent = featured.title;
    if (date) date.textContent = formatDate(featured.releaseDate);

    if (image) {
        image.src = featured.cover;
        image.alt = `${featured.title} cover`;
    }

    if (featuredBandcamp) {
        featuredBandcamp.innerHTML = bandcampPlayer(bandcamp?.embed, featured.title, bandcamp?.url);
    }
}
