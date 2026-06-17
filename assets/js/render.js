import { releases } from "./releases.js";

export function renderReleases(){
const container=document.querySelector("#releases");
container.innerHTML=releases.map(item=>`
<div class="col-md-6 col-lg-4">
<div class="card h-100">
<img src="${item.cover}" class="card-img-top">
<div class="card-body">
<h3 class="h5">${item.title}</h3>
<p>${item.year}</p>
</div>
</div>
</div>`).join("");
}
