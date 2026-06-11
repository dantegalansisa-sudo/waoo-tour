/* ============================================================
   WAOOO Tours — Panel de administración
   Los cambios se guardan en localStorage (vista previa inmediata
   en este navegador) y se publican descargando assets/data.js.
   ============================================================ */

const ADMIN_PASS = 'waooo2026';            // ⚠️ cámbiala antes de entregar
const LS_KEY = 'waooo_admin_data';
const SS_KEY = 'waooo_admin_ok';

/* ---------- estado ---------- */
/* data.js ya aplicó el override de localStorage, así que TOURS y WAOOO
   reflejan los últimos cambios guardados. */
let DB = {
  tours: JSON.parse(JSON.stringify(TOURS)),
  settings: {
    phone: WAOOO.phone, phoneDisplay: WAOOO.phoneDisplay,
    wa: WAOOO.wa, waDisplay: WAOOO.waDisplay,
    email: WAOOO.email, facebook: WAOOO.facebook,
  },
};
let editingId = null;

/* ---------- helpers ---------- */
const $ = id => document.getElementById(id);
const money = n => '$' + (+n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

function fmtDisplay(digits){
  const d = String(digits).replace(/\D/g,'');
  if(d.length===11 && d[0]==='1') return `+1 ${d.slice(1,4)}-${d.slice(4,7)}-${d.slice(7)}`;
  if(d.length===10) return `+1 ${d.slice(0,3)}-${d.slice(3,6)}-${d.slice(6)}`;
  return '+'+d;
}

function slugify(s){
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40) || 'tour';
}
function uniqueId(base){
  let id = base, n = 2;
  while(DB.tours.some(t=>t.id===id)) id = base+'-'+(n++);
  return id;
}

function persist(){
  localStorage.setItem(LS_KEY, JSON.stringify({tours: DB.tours, settings: DB.settings, updated: Date.now()}));
  renderStats(); renderPubStat();
}

let toastT;
function toast(msg){
  let el = document.querySelector('.toast');
  if(!el){ el = document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
  el.innerHTML = '<span>'+msg+'</span>';
  el.classList.add('show'); clearTimeout(toastT);
  toastT = setTimeout(()=>el.classList.remove('show'), 2400);
}

/* ---------- login ---------- */
function doLogin(e){
  e.preventDefault();
  const v = $('passInput').value;
  if(v === ADMIN_PASS){
    sessionStorage.setItem(SS_KEY,'1');
    showPanel();
  } else {
    const box = document.querySelector('.login-box');
    $('loginErr').style.display = 'block';
    box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
  }
  return false;
}
function logout(){ sessionStorage.removeItem(SS_KEY); location.reload(); }

function showPanel(){
  $('loginView').classList.add('hidden');
  $('panelView').classList.remove('hidden');
  initPanel();
}

/* ---------- tabs ---------- */
function showTab(name){
  ['tours','contact','publish'].forEach(k=>{
    $('tab-'+k).classList.toggle('hidden', k!==name);
    document.querySelector(`[data-tab="${k}"]`).classList.toggle('active', k===name);
  });
}

/* ---------- panel ---------- */
function initPanel(){
  /* selects de categoría */
  const opts = CATEGORIES.map(c=>`<option value="${c.key}">${c.label}</option>`).join('');
  $('admCat').innerHTML = '<option value="">Todas las categorías</option>'+opts;
  $('fCat').innerHTML = opts;

  /* settings */
  $('sPhone').value = DB.settings.phone;
  $('sWa').value = DB.settings.wa;
  $('sEmail').value = DB.settings.email;
  $('sFb').value = DB.settings.facebook;

  renderList(); renderStats(); renderPubStat();
}

function renderStats(){
  $('statTotal').textContent = DB.tours.length;
  const avg = DB.tours.reduce((s,t)=>s+(+t.price||0),0) / (DB.tours.length||1);
  $('statAvg').textContent = money(avg);
  $('statPhotos').textContent = DB.tours.filter(t=>t.image).length;
}

function renderList(){
  const q = ($('admSearch').value||'').toLowerCase();
  const cat = $('admCat').value;
  let list = DB.tours.filter(t=>{
    if(cat && t.cat!==cat) return false;
    if(q && !(t.name+' '+(t.en||'')+' '+t.zone).toLowerCase().includes(q)) return false;
    return true;
  });
  $('tList').innerHTML = list.map(t=>`
    <div class="t-row">
      <div class="t-thumb">${t.image?`<img src="${t.image}" alt="">`:'WAOOO'}</div>
      <div class="t-info">
        <b>${t.name}${t.badge?`<span class="badge-mini ${t.badge}">${BADGE[t.badge]||''}</span>`:''}</b>
        <span>${CAT_LABEL[t.cat]||t.cat} · ${t.zone} · ${t.duration}</span>
      </div>
      <div class="t-price">${money(t.price)}</div>
      <div class="t-actions">
        <button title="Editar" onclick="openForm('${t.id}')">✏️</button>
        <button title="Eliminar" class="del" onclick="delTour('${t.id}')">🗑️</button>
      </div>
    </div>`).join('') || '<p style="color:var(--muted);text-align:center;padding:30px">No hay tours que coincidan.</p>';
}

/* ---------- form ---------- */
function openForm(id){
  editingId = id || null;
  $('formTitle').textContent = id ? 'Editar tour' : 'Nuevo tour';
  const t = id ? DB.tours.find(x=>x.id===id) : null;
  $('fName').value = t?t.name:'';
  $('fEn').value = t?(t.en||''):'';
  $('fPrice').value = t?t.price:'';
  $('fCat').value = t?t.cat:'buggies';
  $('fZone').value = t?t.zone:'Punta Cana';
  $('fDur').value = t?t.duration:'Medio día';
  $('fBadge').value = t?(t.badge||''):'';
  $('fAge').value = t?(t.minAge||0):0;
  $('fImg').value = t?(t.image||''):'';
  previewImg();
  $('formModal').classList.add('open');
  setTimeout(()=>$('fName').focus(), 50);
}
function closeForm(){ $('formModal').classList.remove('open'); editingId=null; }

function previewImg(){
  const url = $('fImg').value.trim();
  const box = $('imgPrev');
  if(url){ $('imgPrevImg').src = url; box.style.display='block'; }
  else box.style.display='none';
}

function saveForm(){
  const name = $('fName').value.trim();
  const price = parseFloat($('fPrice').value);
  if(!name){ toast('⚠️ Escribe el nombre del tour'); return; }
  if(!(price>0)){ toast('⚠️ Pon un precio válido'); return; }

  const data = {
    name,
    price: Math.round(price*100)/100,
    cat: $('fCat').value,
    zone: $('fZone').value.trim() || 'Punta Cana',
    duration: $('fDur').value,
    minAge: parseInt($('fAge').value)||0,
  };
  const en = $('fEn').value.trim(); if(en) data.en = en;
  const badge = $('fBadge').value; if(badge) data.badge = badge;
  const img = $('fImg').value.trim(); if(img) data.image = img;

  if(editingId){
    const i = DB.tours.findIndex(t=>t.id===editingId);
    DB.tours[i] = Object.assign({id: editingId}, data);
    toast('✅ Tour actualizado');
  } else {
    DB.tours.unshift(Object.assign({id: uniqueId(slugify(name))}, data));
    toast('✅ Tour creado');
  }
  persist(); renderList(); closeForm();
}

function delTour(id){
  const t = DB.tours.find(x=>x.id===id);
  if(!confirm(`¿Eliminar "${t.name}"?\n\nPodrás recuperarlo descartando los cambios locales antes de publicar.`)) return;
  DB.tours = DB.tours.filter(x=>x.id!==id);
  persist(); renderList();
  toast('🗑️ Tour eliminado');
}

/* ---------- settings ---------- */
function saveSettings(){
  const phone = $('sPhone').value.replace(/\D/g,'');
  const wa = $('sWa').value.replace(/\D/g,'');
  const email = $('sEmail').value.trim();
  const fb = $('sFb').value.trim();
  if(!phone || !wa){ toast('⚠️ Teléfono y WhatsApp son obligatorios'); return; }
  DB.settings = {
    phone, phoneDisplay: fmtDisplay(phone),
    wa, waDisplay: fmtDisplay(wa),
    email: email || DB.settings.email,
    facebook: fb || DB.settings.facebook,
  };
  persist();
  toast('✅ Datos de contacto guardados');
}

/* ---------- publicar ---------- */
function renderPubStat(){
  const ov = JSON.parse(localStorage.getItem(LS_KEY)||'null');
  $('pubStat').innerHTML = ov
    ? `📝 Tienes <b>cambios locales</b> guardados (${new Date(ov.updated).toLocaleString('es-DO')}). Este navegador ya los muestra; el resto del mundo los verá cuando publiques.`
    : `✅ No hay cambios locales pendientes. La web pública está sincronizada con lo que ves.`;
}

function genDataJS(){
  const w = Object.assign({}, WAOOO, DB.settings);
  const tourLines = DB.tours.map(t=>'  '+JSON.stringify(t)).join(',\n');
  return `/* ============================================================
   WAOOO Tours and Adventures — Punta Cana
   Catálogo de excursiones (generado desde el panel admin)
   ============================================================ */

const WAOOO = ${JSON.stringify(w, null, 2)};

const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

const CAT_LABEL = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]));

const BADGE = ${JSON.stringify(BADGE, null, 2)};

const TOURS = [
${tourLines}
];

const CAT_BLURB = ${JSON.stringify(CAT_BLURB, null, 2)};

const INCLUDES = ${JSON.stringify(INCLUDES, null, 2)};

/* ============================================================
   Cambios locales del panel admin (vista previa en este navegador).
   Para publicarlos a todo el mundo: panel admin → Publicar → descargar
   data.js y reemplazar este archivo en el repositorio.
   ============================================================ */
(function(){
  try{
    const ov = JSON.parse(localStorage.getItem('waooo_admin_data') || 'null');
    if(ov){
      if(ov.settings) Object.assign(WAOOO, ov.settings);
      if(Array.isArray(ov.tours) && ov.tours.length){
        TOURS.length = 0;
        ov.tours.forEach(function(t){ TOURS.push(t); });
      }
    }
  }catch(e){}
})();
`;
}

function downloadData(){
  const blob = new Blob([genDataJS()], {type:'text/javascript;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.js';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('⬇️ data.js descargado — reemplázalo en assets/');
}

function copyData(){
  navigator.clipboard.writeText(genDataJS())
    .then(()=>toast('📋 Código copiado al portapapeles'))
    .catch(()=>toast('No se pudo copiar — usa Descargar'));
}

function discardLocal(){
  if(!confirm('¿Descartar TODOS los cambios locales y volver a los datos publicados?')) return;
  localStorage.removeItem(LS_KEY);
  location.reload();
}

/* ---------- boot ---------- */
if(sessionStorage.getItem(SS_KEY)==='1') showPanel();
else $('passInput') && setTimeout(()=>$('passInput').focus(), 100);
