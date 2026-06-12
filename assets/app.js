/* ============================================================
   WAOOO Tours — app.js  (render, search, filter, favorites, booking)
   ============================================================ */

/* ---------- SVG icon library ---------- */
const IC = {
  search:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-3.5-3.5"/></svg>',
  heart:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.7-10-9.3C.4 8.4 2 5 5.3 5c2 0 3.3 1.1 4.2 2.4C10.4 6.1 11.7 5 13.7 5 17 5 18.6 8.4 17 11.7 14.5 16.3 12 21 12 21z"/></svg>',
  user:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  globe:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>',
  clock:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  arrow:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  shield:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  tag:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z"/><circle cx="8" cy="8" r="1.4"/></svg>',
  van:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l2-6h11l4 4h3v5h-2M2 12v5h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
  star:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.5 7 .7-5.2 4.7 1.5 6.9L12 17.8 5.2 20.8l1.5-6.9L1.5 9.2l7-.7L12 2z"/></svg>',
  phone:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 23 1 14 1 5a2 2 0 0 1 2-2Z"/></svg>',
  mail:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  wa:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M.1 24l1.7-6.2A11.9 11.9 0 1 1 12 24h0a11.9 11.9 0 0 1-5.7-1.5L.1 24zM6.6 20l.4.2a9.9 9.9 0 0 0 5 1.4h0a9.9 9.9 0 1 0-8.4-4.6l.3.4-1 3.7 3.7-1.1zM17.5 14.3c-.1-.2-.5-.4-1-.6s-1.5-.7-1.7-.8-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a8.1 8.1 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.4.1-.6l.4-.5.3-.5.1-.4-.1-.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1c.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2z"/></svg>',
  menu:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  fb:'<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7c0-1 .3-1.5 1.6-1.5H17V2.2C16.5 2.1 15.5 2 14.3 2 11.8 2 10 3.5 10 6.3V9H7.5v3.4H10V22h3.5v-9.6h2.6l.4-3.4H14z"/></svg>',
  ig:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  tt:'<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2c.3 2.3 1.8 4 4 4.3v3c-1.5 0-2.9-.4-4-1.1V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V2h3z"/></svg>',
  // category icons
  buggy:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6.5" cy="17" r="2.5"/><circle cx="17.5" cy="17" r="2.5"/><path d="M4 14V9h6l3 3h5l1 5M9 9V6h3"/></svg>',
  boat:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18c1.5 1.5 3 1.5 4.5 0 1.5 1.5 3.5 1.5 5 0 1.5 1.5 3 1.5 4.5 0"/><path d="M5 16l1.5-5h11L19 16M12 3v8M12 3l5 4"/></svg>',
  island:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 19c1.5 1.4 3 1.4 4.5 0s3-1.4 4.5 0 3 1.4 4.5 0 3-1.4 4.5 0"/><path d="M12 16V8M12 8c-2-2-1-4 0-5 1 1 2 3 0 5zM12 9c2 0 3 1.5 4 3M12 9c-2 0-3 1.5-4 3"/></svg>',
  dolphin:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8c4-3 9-2 11 1 1-2 4-3 7-2-2 1-2 3-2 4 0 4-4 7-9 7-3 0-5-1-6-3 2 0 4-1 4-3-3 1-6 0-7-2 2 0 3-1 2-2z"/></svg>',
  diving:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="11" r="5"/><path d="M12 6V3M9 11H4M20 11h-5M8 19l3-3M16 19l-3-3"/></svg>',
  wave:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M6 12c-1-3 1-6 4-6 1.5 0 3 1 3.5 2.5"/></svg>',
  leaf:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16M4 20c4-6 8-8 12-9"/></svg>',
  landmark:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 21V10M20 21V10M8 21v-7M16 21v-7M12 21v-7M12 3 4 8h16z"/></svg>',
  mountain:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 20 6-11 4 6 2-3 6 8z"/><circle cx="17" cy="6" r="2"/></svg>',
  horse:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21c0-5 2-8 6-9l-1-3 3 1 2-3 1 4c2 1 3 3 3 6M5 21h13M8 12 5 11"/></svg>',
  party:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 6-14 8 8zM14 7l1-3M18 9l3-1M16 4l2-1"/></svg>',
  chef:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10M7 17h10M7 9a5 5 0 0 1 10 0c2 0 3 1.5 3 3s-1 3-3 3H7c-2 0-3-1.5-3-3s1-3 3-3z"/></svg>',
  fish:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c4-6 12-6 16 0-4 6-12 6-16 0zM19 12l3-3v6zM8 11h.01"/></svg>',
  ticket:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a2 2 0 0 0 0 6v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M14 5v14" stroke-dasharray="2 2"/></svg>',
  combo:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
  crown:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M4 18 3 7l5 4 4-6 4 6 5-4-1 11z"/></svg>',
};

/* placeholder gradient index per category */
const CAT_PH = {buggies:0,catamaran:3,islas:4,delfines:3,snorkel:1,acuaticos:4,naturaleza:1,cultura:5,
  samana:1,caballos:2,nocturna:5,gastronomia:2,pesca:3,parques:0,combos:0,privados:5};

/* ---------- Favorites (localStorage) ---------- */
const FAV_KEY = 'waooo_favs';
const getFavs = () => { try{return JSON.parse(localStorage.getItem(FAV_KEY))||[]}catch{return[]} };
const setFavs = a => localStorage.setItem(FAV_KEY, JSON.stringify(a));
function toggleFav(id){
  const f = getFavs(); const i = f.indexOf(id);
  if(i>-1){ f.splice(i,1); toast(T.toast_fav_rm); }
  else { f.push(id); toast(T.toast_fav_add); }
  setFavs(f); updateFavCount();
  document.querySelectorAll('[data-fav="'+id+'"]').forEach(b=>b.classList.toggle('on', f.includes(id)));
}
function updateFavCount(){
  const n = getFavs().length;
  document.querySelectorAll('.fav-count').forEach(el=>{el.textContent=n;el.classList.toggle('show',n>0)});
}

/* ---------- helpers ---------- */
const money = n => '$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const tourUrl = id => 'tour.html?id='+id;
function waLink(text){ return 'https://wa.me/'+WAOOO.wa+'?text='+encodeURIComponent(text); }

function placeholder(t){
  const g = CAT_PH[t.cat] ?? 0;
  const ic = IC[ (CATEGORIES.find(c=>c.key===t.cat)||{}).icon ] || IC.island;
  return `<div class="ph" data-g="${g}">
      <div class="ph-inner">${ic}<b>WAOOO</b><small>${T.ph_soon}</small></div>
      <img class="ph-logo" src="assets/waoo.jpeg" alt="WAOOO">
    </div>`;
}

/* ---------- card ---------- */
function cardHTML(t, i = 0){
  const fav = getFavs().includes(t.id) ? ' on':'';
  const badge = t.badge ? `<span class="badge ${t.badge}">${badgeLabel(t.badge)}</span>`:'';
  const name = tourName(t);
  const media = t.image
    ? `<img src="${t.image}" alt="${name}" loading="lazy">`
    : placeholder(t);
  return `<article class="card" style="--i:${Math.min(i,11)}">
    <div class="card-media">
      ${media}
      ${badge}
      <button class="fav-btn${fav}" data-fav="${t.id}" aria-label="Fav" onclick="event.preventDefault();toggleFav('${t.id}')">${IC.heart}</button>
      <a href="${tourUrl(t.id)}" style="position:absolute;inset:0;z-index:1" aria-label="${name}"></a>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span>${IC.pin}${t.zone}</span>
        <span>${IC.clock}${durLabel(t.duration)}</span>
      </div>
      <a href="${tourUrl(t.id)}"><h3>${name}</h3></a>
      <div class="card-foot">
        <div class="price"><small>${T.card_from}</small><b>${money(t.price)} <span>USD</span></b><em>${T.card_pp}</em></div>
        <a href="${tourUrl(t.id)}" class="card-cta">${T.card_view} ${IC.arrow}</a>
      </div>
    </div>
  </article>`;
}
function renderGrid(el, list){ el.innerHTML = list.map((t,i)=>cardHTML(t,i)).join(''); }

/* ---------- toast ---------- */
let toastT;
function toast(msg){
  let el = document.querySelector('.toast');
  if(!el){ el=document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
  el.innerHTML = IC.star+'<span>'+msg+'</span>';
  el.classList.add('show'); clearTimeout(toastT);
  toastT=setTimeout(()=>el.classList.remove('show'),2400);
}

/* ---------- shared header build ---------- */
function buildChrome(active){
  const topbar = `<div class="topbar"><div class="wrap">
    <div class="tb-left">${IC.star}<span>${T.topbar_tag}</span></div>
    <div class="tb-right">
      <a href="tel:+${WAOOO.phone}">${IC.phone} ${WAOOO.phoneDisplay}</a>
      <a class="hide-sm" href="mailto:${WAOOO.email}">${IC.mail} ${WAOOO.email}</a>
    </div></div></div>`;

  const nav = [
    ['index.html', T.nav_home, 'home'],
    ['tours.html', T.nav_tours, 'tours'],
    ['guia.html', T.nav_guide, 'guide'],
    ['index.html#nosotros', T.nav_about, 'about'],
    ['index.html#contacto', T.nav_contact, 'contact'],
  ];
  const langBtn = `<button class="icon-btn lang-btn" onclick="toggleLang()" title="Español / English">
      ${IC.globe} <b>${LNG.toUpperCase()}</b><span style="opacity:.45">·${LNG==='es'?'EN':'ES'}</span></button>`;

  const header = `<header class="header"><div class="wrap">
    <a class="logo" href="index.html">
      <img src="assets/waoo.jpeg" alt="WAOOO Tours">
      <span><b>WA<span>OOO</span></b><small>Tours · Punta Cana</small></span>
    </a>
    <nav class="nav">${nav.map(n=>`<a href="${n[0]}" ${active===n[2]?'class="active"':''}>${n[1]}</a>`).join('')}</nav>
    <form class="header-search" onsubmit="return goSearch(event)">
      ${IC.search}<input type="text" id="hsearch" placeholder="${T.search_ph}">
    </form>
    <div class="header-actions">
      ${langBtn}
      <a class="icon-btn" href="tours.html#favoritos" id="favLink">${IC.heart}<span class="fav-count"></span></a>
      <a class="btn btn-wa" href="${waLink(T.wa_generic)}" target="_blank">${IC.wa} ${T.btn_book}</a>
      <button class="icon-btn burger" onclick="document.getElementById('drawer').classList.add('open')">${IC.menu}</button>
    </div>
  </div></header>
  <div class="drawer" id="drawer" onclick="if(event.target===this)this.classList.remove('open')">
    <div class="drawer-panel">
      <button class="drawer-close" onclick="document.getElementById('drawer').classList.remove('open')">×</button>
      ${nav.map(n=>`<a href="${n[0]}">${n[1]}</a>`).join('')}
      <a href="javascript:toggleLang()">${IC.globe} ${LNG==='es'?'English version':'Versión en español'}</a>
      <a class="btn btn-wa" style="margin-top:14px" href="${waLink(T.wa_book_generic)}" target="_blank">${IC.wa} ${T.drawer_wa}</a>
    </div>
  </div>`;

  const slot = document.getElementById('chrome');
  if(slot) slot.innerHTML = topbar + header;
}

function goSearch(e){
  e.preventDefault();
  const q = document.getElementById('hsearch').value.trim();
  location.href = 'tours.html'+(q?('?q='+encodeURIComponent(q)):'');
  return false;
}

/* ---------- footer ---------- */
function buildFooter(){
  const slot = document.getElementById('footer-slot'); if(!slot) return;
  const cats = CATEGORIES.slice(0,6);
  slot.innerHTML = `
  <div class="wa-float-wrap"><a class="wa-float" target="_blank" href="${waLink(T.wa_book_generic)}" aria-label="WhatsApp">${IC.wa}</a></div>
  <footer class="footer" id="contacto"><div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="logo" href="index.html"><img src="assets/waoo.jpeg" alt="WAOOO" style="height:50px"><span><b style="color:#fff">WA<span style="color:var(--orange)">OOO</span></b><small>Tours · Punta Cana</small></span></a>
        <p class="about">${T.foot_about}</p>
        <div class="foot-soc">
          <a href="${WAOOO.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${IC.fb}</a>
          <a href="#" aria-label="Instagram">${IC.ig}</a>
          <a href="#" aria-label="TikTok">${IC.tt}</a>
          <a href="${waLink(T.wa_generic)}" target="_blank" aria-label="WhatsApp">${IC.wa}</a>
        </div>
      </div>
      <div class="foot-col"><h5>${T.foot_tours}</h5>
        ${cats.map(c=>`<a href="tours.html?cat=${c.key}">${catLabel(c.key)}</a>`).join('')}
        <a href="tours.html">${T.foot_all}</a>
      </div>
      <div class="foot-col"><h5>${T.foot_company}</h5>
        <a href="index.html#nosotros">${T.foot_aboutl}</a>
        <a href="tours.html">${T.nav_tours}</a>
        <a href="guia.html">${T.nav_guide}</a>
        <a href="tours.html#favoritos">${T.foot_favs}</a>
        <a href="#contacto">${T.nav_contact}</a>
        <a href="#">${T.foot_terms}</a>
      </div>
      <div class="foot-col"><h5>${T.nav_contact}</h5>
        <ul class="foot-contact">
          <li>${IC.pin}<span>Punta Cana, La Altagracia,<br>República Dominicana</span></li>
          <li>${IC.phone}<a href="tel:+${WAOOO.phone}">${WAOOO.phoneDisplay}</a></li>
          <li>${IC.wa}<a href="https://wa.me/${WAOOO.wa}" target="_blank">${T.wa_label}${WAOOO.waDisplay}</a></li>
          <li>${IC.mail}<a href="mailto:${WAOOO.email}">${WAOOO.email}</a></li>
          <li>${IC.fb}<a href="${WAOOO.facebook}" target="_blank" rel="noopener">${T.foot_fb}</a></li>
        </ul>
        <a class="btn btn-wa" style="margin-top:8px" target="_blank" href="${waLink(T.wa_book_generic)}">${IC.wa} ${T.foot_wa}</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${'2026'} WAOOO Tours and Adventures · Punta Cana. ${T.foot_rights}</span>
      <div class="foot-pay"><span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>CASH</span></div>
    </div>
    <div class="foot-credit">${T.foot_credit} <a href="https://nexixstudio.com" target="_blank" rel="noopener">NEXIX Studio</a></div>
  </div></footer>`;
  updateFavCount();
}

/* ---------- scroll reveal ---------- */
function initReveal(){
  const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}

/* ---------- boot common ---------- */
function bootCommon(active){ buildChrome(active); buildFooter(); updateFavCount(); applyI18n(); }
