import{a as $,S as P,i as f}from"./assets/vendor-BDaiwwc1.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const M="47415384-99a3119bdb6a092e7cf8e4330",B="https://pixabay.com/api/",H=15;async function g(t){const n=`${B}?key=${M}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${H}&page=${page}`;try{const{data:r}=await $.get(n);return r}catch(r){throw console.error("Fetch Images Error:",r.message),r}}const d=document.createElement("div");d.classList.add("gallery");document.body.appendChild(d);const a=document.createElement("div");a.classList.add("loader");a.style.display="none";a.innerHTML='<div class="css-loader"></div>';document.body.appendChild(a);const h=document.createElement("form");h.id="search-form";h.innerHTML=`
  <input type="text" id="search-input" placeholder="Search images...">
  <button type="submit">Search</button>
`;document.body.prepend(h);const I=new P(".gallery a");function q(){d.innerHTML=""}function b(){a.style.display="block"}function l(){a.style.display="none"}function L(t){const n=t.map(({webformatURL:r,largeImageURL:c,tags:e,likes:o,views:i,comments:S,downloads:v})=>`
        <a href="${c}">
          <img src="${r}" alt="${e}">
          <div>
            <p>Likes: ${o}</p>
            <p>Views: ${i}</p>
            <p>Comments: ${S}</p>
            <p>Downloads: ${v}</p>
          </div>
        </a>
      `).join("");d.insertAdjacentHTML("beforeend",n),I.refresh()}function u(t){f.error({title:"Error",message:t})}function w(t){f.warning({title:"No Results",message:t})}const C=document.getElementById("search-form"),O=document.getElementById("search-input"),y=document.querySelector(".load-more");let s=1,m="",p=0;C.addEventListener("submit",async t=>{t.preventDefault();const n=O.value.trim();if(!n){u("Search field cannot be empty!");return}m=n,s=1,q(),E(),b();try{const r=await g(s,m);if(p=r.totalHits,l(),!r.hits.length){w("Sorry, there are no images matching your search query. Please try again!");return}L(r.hits),r.hits.length<p&&x()}catch{l(),u("Something went wrong. Please try again later!")}});y.addEventListener("click",async()=>{s++,b();try{const t=await g(s,m);l(),L(t.hits),s*15>=p&&(E(),w("We're sorry, but you've reached the end of search results.")),A()}catch{l(),u("Something went wrong. Please try again later!")}});function x(){y.computedStyleMap.display="block"}function E(){y.computedStyleMap.display="none"}function A(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behaior:"smooth"})}
//# sourceMappingURL=index.js.map
