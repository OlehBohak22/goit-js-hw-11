import{i as a,S as m}from"./assets/vendor-CMdlDMgr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();const p="46156366-74388488ea9228d7ab1fb8713",g="https://pixabay.com/api/";function h(n,t=1){const i=`${g}?key=${p}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=12`;return fetch(i).then(e=>{if(!e.ok)throw new Error("Error fetching images");return e.json()}).catch(e=>{console.error("Error:",e)})}function y(n){const t=document.querySelector(".gallery"),i=n.map(e=>`
    <a href="${e.largeImageURL}" class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes</b> ${e.likes}</p>
        <p><b>Views</b> ${e.views}</p>
        <p><b>Comments</b> ${e.comments}</p>
        <p><b>Downloads</b> ${e.downloads}</p>
      </div>
    </a>
  `).join("");t.innerHTML=i}const b=document.querySelector("#search-form"),L=document.querySelector(".gallery"),d=document.querySelector("#loader");let u=1,l="",c;b.addEventListener("submit",S);function w(){c=new m(".gallery a")}function $(){d.classList.remove("hidden")}function f(){d.classList.add("hidden")}function S(n){if(n.preventDefault(),l=n.target.elements.searchQuery.value.trim(),!l){a.warning({title:"Warning",message:"Please enter a search query."});return}u=1,L.innerHTML="",$(),h(l,u).then(t=>{if(f(),!t||t.hits.length===0){a.error({title:"Error",message:"No images found. Please try again."});return}y(t.hits),c?c.refresh():w()}).catch(t=>{f(),a.error({title:"Error",message:"Something went wrong. Please try again."})})}
//# sourceMappingURL=index.js.map
