import{i,S as u}from"./assets/vendor-CMdlDMgr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const f="46156366-74388488ea9228d7ab1fb8713",p="https://pixabay.com/api/";async function d(n,t=1){const s=`${p}?key=${f}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=12`;try{const e=await fetch(s);if(!e.ok)throw new Error("Error fetching images");return e.json()}catch(e){console.error("Error:",e)}}function m(n){const t=document.querySelector(".gallery"),s=n.map(e=>`
    <a href="${e.largeImageURL}" class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes</b>: ${e.likes}</p>
        <p><b>Views</b>: ${e.views}</p>
        <p><b>Comments</b>: ${e.comments}</p>
        <p><b>Downloads</b>: ${e.downloads}</p>
      </div>
    </a>
  `).join("");t.innerHTML=s}const g=document.querySelector("#search-form"),y=document.querySelector(".gallery");let l=1,c="";g.addEventListener("submit",h);async function h(n){if(n.preventDefault(),c=n.target.elements.searchQuery.value.trim(),!c){i.warning({title:"Warning",message:"Please enter a search query."});return}l=1,y.innerHTML="";try{const t=await d(c,l);if(t.hits.length===0){i.error({title:"Error",message:"No images found. Please try again."});return}m(t.hits),new u(".gallery a").refresh()}catch{i.error({title:"Error",message:"Something went wrong. Please try again."})}}
//# sourceMappingURL=index.js.map
