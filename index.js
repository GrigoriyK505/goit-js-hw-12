import{a as $,S as P,i as f}from"./assets/vendor-BDaiwwc1.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const q="47415384-99a3119bdb6a092e7cf8e4330",B="https://pixabay.com/api/";async function g(t,n=1,o=15){const a=`${B}?key=${q}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${o}`;try{return(await $.get(a)).data}catch(e){throw console.error("Fetch Images Error:",e.message),e}}const l=document.createElement("div");l.classList.add("gallery");document.body.appendChild(l);const d=document.createElement("div");d.classList.add("loader");d.style.display="none";d.innerHTML='<div class="css-loader"></div>';document.body.appendChild(d);const y=document.createElement("form");y.id="search-form";y.innerHTML=`
  <input type="text" id="search-input" placeholder="Search images...">
  <button type="submit">Search</button>
`;document.body.prepend(y);const M=new P(".gallery a");function H(){l.innerHTML=""}function b(){const t=document.querySelector(".loader");t.style.display="block"}function c(){const t=document.querySelector(".loader");t.style.display="none"}function L(t){const n=t.map(({webformatURL:o,largeImageURL:a,tags:e,likes:r,views:s,comments:S,downloads:v})=>`
        <a href="${a}">
          <img src="${o}" alt="${e}">
          <div>
            <p>Likes: ${r}</p>
            <p>Views: ${s}</p>
            <p>Comments: ${S}</p>
            <p>Downloads: ${v}</p>
          </div>
        </a>
      `).join("");l.insertAdjacentHTML("beforeend",n),M.refresh()}function u(t){f.error({title:"Error",message:t})}function w(t){f.warning({title:"No Results",message:t})}const I=document.getElementById("search-form"),C=document.getElementById("search-input"),h=document.querySelector(".load-more");let i=1,m="",p=0;I.addEventListener("submit",async t=>{t.preventDefault();const n=C.value.trim();if(!n){u("Search field cannot be empty!");return}m=n,i=1,H(),E(),b();try{const o=await g(i,m);if(p=o.totalHits,c(),!o.hits.length){w("Sorry, there are no images matching your search query. Please try again!");return}L(o.hits),o.hits.length<p&&O()}catch{c(),u("Something went wrong. Please try again later!")}});h.addEventListener("click",async()=>{i++,b();try{const t=await g(i,m);c(),L(t.hits),i*40>=p&&(E(),w("We're sorry, but you've reached the end of search results.")),x()}catch{c(),u("Something went wrong. Please try again later!")}});function O(){h.style.display="block"}function E(){h.style.display="none"}function x(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behaior:"smooth"})}
//# sourceMappingURL=index.js.map
