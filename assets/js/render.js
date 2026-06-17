
import { releases } from "./releases.js";

export function renderReleases() {
    const container = document.querySelector("#albums");
    if (!container) return;

    const ordered = [...releases].sort((a,b) => b.year - a.year);

    container.innerHTML = ordered.map(item => `
        <div class="col-lg-6 mx-auto">
            <article class="album-card">
                <img src="${item.cover}" alt="${item.title}">
                <div class="card-body">
                    <p class="eyebrow">${item.type}</p>
                    <h3>${item.title}</h3>
                    <p>${item.year}</p>
                </div>
            </article>
        </div>
    `).join("");
}
