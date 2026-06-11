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
  try{
    localStorage.setItem(LS_KEY, JSON.stringify({tours: DB.tours, settings: DB.settings, updated: Date.now()}));
  }catch(e){
    alert('⚠️ La memoria del navegador está llena de fotos.\n\nVe a la pestaña PUBLICAR, descarga la publicación (ZIP) y envíala a tu desarrollador. Cuando la web esté actualizada, pulsa "Descartar cambios locales" para liberar espacio y seguir agregando fotos.');
  }
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

/* ---------- fotos: compresión automática ---------- */
function fileToCompressed(file, maxW = 1000, quality = 0.72){
  return new Promise(resolve=>{
    const r = new FileReader();
    r.onload = ()=>{
      const img = new Image();
      img.onload = ()=>{
        const sc = Math.min(1, maxW / img.width);
        const w = Math.round(img.width*sc), h = Math.round(img.height*sc);
        const cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(cv.toDataURL('image/jpeg', quality));
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  });
}

/* estado de fotos del formulario */
let fImageData = null;     // foto principal (dataURL o ruta existente)
let fGalleryData = [];     // fotos extra

function renderFormPhotos(){
  const box = $('imgPrev');
  if(fImageData){ $('imgPrevImg').src = fImageData; box.style.display='block'; }
  else box.style.display='none';
  $('galStrip').innerHTML = fGalleryData.map((g,i)=>`
    <div class="gal-thumb"><img src="${g}" alt="">
      <button type="button" class="img-x" onclick="removeGal(${i})" title="Quitar">✕</button>
    </div>`).join('');
}
async function onMainFile(input){
  if(!input.files[0]) return;
  toast('⏳ Procesando foto...');
  fImageData = await fileToCompressed(input.files[0]);
  input.value=''; renderFormPhotos(); toast('✅ Foto lista');
}
async function onGalFiles(input){
  if(!input.files.length) return;
  toast('⏳ Procesando fotos...');
  for(const f of Array.from(input.files).slice(0, 6 - fGalleryData.length)){
    fGalleryData.push(await fileToCompressed(f));
  }
  input.value=''; renderFormPhotos(); toast('✅ Fotos agregadas');
}
function clearMain(){ fImageData=null; renderFormPhotos(); }
function removeGal(i){ fGalleryData.splice(i,1); renderFormPhotos(); }

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
  fImageData = t?(t.image||null):null;
  fGalleryData = t&&Array.isArray(t.gallery) ? t.gallery.slice() : [];
  renderFormPhotos();
  $('formModal').classList.add('open');
  setTimeout(()=>$('fName').focus(), 50);
}
function closeForm(){ $('formModal').classList.remove('open'); editingId=null; }

function saveForm(){
  const name = $('fName').value.trim();
  const price = parseFloat(String($('fPrice').value).replace(',','.'));
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
  if(fImageData) data.image = fImageData;
  if(fGalleryData.length) data.gallery = fGalleryData.slice();

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
  const raw = localStorage.getItem(LS_KEY);
  const ov = JSON.parse(raw||'null');
  const kb = raw ? Math.round(raw.length/1024) : 0;
  $('pubStat').innerHTML = ov
    ? `📝 Tienes <b>cambios locales</b> guardados (${new Date(ov.updated).toLocaleString('es-DO')} · ${kb>1024?(kb/1024).toFixed(1)+' MB':kb+' KB'}). Este navegador ya los muestra; el resto del mundo los verá cuando publiques.`
    : `✅ No hay cambios locales pendientes. La web pública está sincronizada con lo que ves.`;
}

/* --- mini generador de ZIP (sin compresión; las fotos ya son JPEG) --- */
const CRC_TABLE = (()=>{ const t=new Uint32Array(256);
  for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c = c&1 ? 0xEDB88320^(c>>>1) : c>>>1; t[n]=c>>>0; }
  return t; })();
function crc32(u8){ let c=0xFFFFFFFF;
  for(let i=0;i<u8.length;i++) c = CRC_TABLE[(c^u8[i])&0xFF] ^ (c>>>8);
  return (c^0xFFFFFFFF)>>>0; }

function zipStore(files){
  const enc = new TextEncoder();
  const parts=[], central=[]; let offset=0;
  const now=new Date();
  const dTime=((now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1))&0xFFFF;
  const dDate=(((now.getFullYear()-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate())&0xFFFF;
  for(const f of files){
    const name=enc.encode(f.name), data=f.data, crc=crc32(data);
    const lh=new DataView(new ArrayBuffer(30));
    lh.setUint32(0,0x04034b50,true); lh.setUint16(4,20,true);
    lh.setUint16(10,dTime,true); lh.setUint16(12,dDate,true);
    lh.setUint32(14,crc,true); lh.setUint32(18,data.length,true); lh.setUint32(22,data.length,true);
    lh.setUint16(26,name.length,true);
    parts.push(new Uint8Array(lh.buffer), name, data);
    const ch=new DataView(new ArrayBuffer(46));
    ch.setUint32(0,0x02014b50,true); ch.setUint16(4,20,true); ch.setUint16(6,20,true);
    ch.setUint16(12,dTime,true); ch.setUint16(14,dDate,true);
    ch.setUint32(16,crc,true); ch.setUint32(20,data.length,true); ch.setUint32(24,data.length,true);
    ch.setUint16(28,name.length,true); ch.setUint32(42,offset,true);
    central.push(new Uint8Array(ch.buffer), name);
    offset += 30 + name.length + data.length;
  }
  const centralSize = central.reduce((s,a)=>s+a.length,0);
  const end=new DataView(new ArrayBuffer(22));
  end.setUint32(0,0x06054b50,true);
  end.setUint16(8,files.length,true); end.setUint16(10,files.length,true);
  end.setUint32(12,centralSize,true); end.setUint32(16,offset,true);
  return new Blob([...parts, ...central, new Uint8Array(end.buffer)], {type:'application/zip'});
}

function dataUrlToBytes(durl){
  const bin = atob(durl.split(',')[1]);
  const u8 = new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) u8[i]=bin.charCodeAt(i);
  return u8;
}

/* convierte las fotos subidas (base64) en archivos assets/fotos/... */
function buildPublication(){
  const photos = [];
  const tours = DB.tours.map(t=>{
    const c = Object.assign({}, t);
    if(c.image && c.image.startsWith('data:')){
      const p = `assets/fotos/${c.id}.jpg`;
      photos.push({name:p, data:dataUrlToBytes(c.image)});
      c.image = p;
    }
    if(Array.isArray(c.gallery)){
      c.gallery = c.gallery.map((g,i)=>{
        if(g && g.startsWith('data:')){
          const p = `assets/fotos/${c.id}-${i+2}.jpg`;
          photos.push({name:p, data:dataUrlToBytes(g)});
          return p;
        }
        return g;
      }).filter(Boolean);
      if(!c.gallery.length) delete c.gallery;
    }
    return c;
  });
  return {tours, photos};
}

function genDataJS(tours){
  const w = Object.assign({}, WAOOO, DB.settings);
  const tourLines = tours.map(t=>'  '+JSON.stringify(t)).join(',\n');
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

function downloadPublication(){
  const {tours, photos} = buildPublication();
  const enc = new TextEncoder();
  const leeme = `WAOOO Tours — Publicación generada desde el panel admin
========================================================
Fecha: ${new Date().toLocaleString('es-DO')}
Tours: ${tours.length} · Fotos nuevas: ${photos.length}

Este paquete contiene:
  assets/data.js     -> catálogo actualizado (precios, tours, contactos)
  assets/fotos/...   -> fotos nuevas subidas desde el panel

CÓMO PUBLICAR:
1) Copia TODO el contenido de este ZIP dentro del proyecto,
   reemplazando assets/data.js y agregando las fotos nuevas.
2) Sube los cambios a GitHub (commit + push).
3) Vercel actualiza la web automáticamente en 1-2 minutos.
`;
  const files = [
    {name:'LEEME.txt', data: enc.encode(leeme)},
    {name:'assets/data.js', data: enc.encode(genDataJS(tours))},
    ...photos,
  ];
  const blob = zipStore(files);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'waooo-publicacion.zip';
  a.click();
  URL.revokeObjectURL(a.href);
  toast(`⬇️ ZIP descargado (${tours.length} tours, ${photos.length} fotos)`);
}

function discardLocal(){
  if(!confirm('¿Descartar TODOS los cambios locales y volver a los datos publicados?')) return;
  localStorage.removeItem(LS_KEY);
  location.reload();
}

/* ---------- boot ---------- */
if(sessionStorage.getItem(SS_KEY)==='1') showPanel();
else $('passInput') && setTimeout(()=>$('passInput').focus(), 100);
