/* ============================================================
   WAOOO Tours — Panel de administración (modo nube / Supabase)
   Los cambios se guardan directo en la base de datos y se ven
   AL INSTANTE en la web pública. Las fotos van a Supabase Storage.
   ============================================================ */

const TK_KEY = 'waooo_sb_token';

/* ---------- estado ---------- */
let DB = { tours: [], settings: {} };
let TOKEN = null;
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
let toastT;
function toast(msg){
  let el = document.querySelector('.toast');
  if(!el){ el = document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
  el.innerHTML = '<span>'+msg+'</span>';
  el.classList.add('show'); clearTimeout(toastT);
  toastT = setTimeout(()=>el.classList.remove('show'), 2600);
}

/* ============================================================
   NUBE: autenticación y operaciones
   ============================================================ */
async function sbAuth(email, password){
  const r = await fetch(`${SB_URL}/auth/v1/token?grant_type=password`, {
    method:'POST',
    headers:{apikey:SB_KEY, 'Content-Type':'application/json'},
    body: JSON.stringify({email, password}),
  });
  if(!r.ok) return null;
  const j = await r.json();
  return j.access_token || null;
}

function authHeaders(extra){
  return Object.assign({apikey:SB_KEY, Authorization:'Bearer '+TOKEN, 'Content-Type':'application/json'}, extra||{});
}

function handleAuthFail(r){
  if(r.status===401 || r.status===403){
    toast('⚠️ Tu sesión expiró. Vuelve a entrar.');
    setTimeout(logout, 1800);
    return true;
  }
  return false;
}

/* sube/actualiza TODOS los tours con su posición (1 sola petición) */
async function sbSyncTours(){
  const body = DB.tours.map((t,i)=>({id:t.id, data:t, pos:i}));
  const r = await fetch(`${SB_URL}/rest/v1/tours`, {
    method:'POST',
    headers: authHeaders({Prefer:'resolution=merge-duplicates'}),
    body: JSON.stringify(body),
  });
  if(!r.ok && !handleAuthFail(r)) throw new Error('sync '+r.status);
  return r.ok;
}
async function sbDeleteTour(id){
  const r = await fetch(`${SB_URL}/rest/v1/tours?id=eq.${encodeURIComponent(id)}`, {
    method:'DELETE', headers: authHeaders(),
  });
  if(!r.ok && !handleAuthFail(r)) throw new Error('delete '+r.status);
  return r.ok;
}
async function sbSaveSettings(){
  const r = await fetch(`${SB_URL}/rest/v1/settings`, {
    method:'POST',
    headers: authHeaders({Prefer:'resolution=merge-duplicates'}),
    body: JSON.stringify([{id:1, data: DB.settings}]),
  });
  if(!r.ok && !handleAuthFail(r)) throw new Error('settings '+r.status);
  return r.ok;
}
async function sbUploadPhoto(name, dataUrl){
  const blob = await (await fetch(dataUrl)).blob();
  const r = await fetch(`${SB_URL}/storage/v1/object/fotos/${name}`, {
    method:'POST',
    headers:{apikey:SB_KEY, Authorization:'Bearer '+TOKEN, 'x-upsert':'true', 'Content-Type':'image/jpeg'},
    body: blob,
  });
  if(!r.ok && !handleAuthFail(r)) throw new Error('upload '+r.status);
  return `${SB_URL}/storage/v1/object/public/fotos/${name}`;
}

/* ---------- login ---------- */
async function doLogin(e){
  e.preventDefault();
  const btn = $('loginBtn');
  btn.textContent = 'Entrando...'; btn.disabled = true;
  const token = await sbAuth($('emailInput').value.trim(), $('passInput').value).catch(()=>null);
  btn.textContent = 'Entrar'; btn.disabled = false;
  if(token){
    TOKEN = token;
    sessionStorage.setItem(TK_KEY, token);
    showPanel();
  } else {
    const box = document.querySelector('.login-box');
    $('loginErr').style.display = 'block';
    box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
  }
  return false;
}
function logout(){ sessionStorage.removeItem(TK_KEY); location.reload(); }

async function showPanel(){
  $('loginView').classList.add('hidden');
  $('panelView').classList.remove('hidden');
  await initPanel();
}

/* ---------- tabs ---------- */
function showTab(name){
  ['tours','contact','publish'].forEach(k=>{
    $('tab-'+k).classList.toggle('hidden', k!==name);
    document.querySelector(`[data-tab="${k}"]`).classList.toggle('active', k===name);
  });
}

/* ---------- arranque del panel ---------- */
async function initPanel(){
  const opts = CATEGORIES.map(c=>`<option value="${c.key}">${c.label}</option>`).join('');
  $('admCat').innerHTML = '<option value="">Todas las categorías</option>'+opts;
  $('fCat').innerHTML = opts;

  /* carga desde la nube */
  const res = await sbLoadAll();
  if(res && res.tours.length){
    DB.tours = res.tours.map(r=>r.data);
    $('seedBanner').innerHTML = '';
  } else {
    /* nube vacía: usar el catálogo local y ofrecer subirlo */
    DB.tours = JSON.parse(JSON.stringify(TOURS));
    $('seedBanner').innerHTML = `<div class="adm-card" style="border-color:var(--orange);background:#fff8f2">
      <h2>☁️ Primer paso: subir el catálogo a la nube</h2>
      <p class="hint">La base de datos está vacía. Sube los ${DB.tours.length} tours actuales para activar la publicación automática.</p>
      <button class="btn btn-primary btn-lg" onclick="seedCloud()">⬆️ Subir catálogo inicial</button>
    </div>`;
  }
  DB.settings = (res && res.settings) ? res.settings : {
    phone: WAOOO.phone, phoneDisplay: WAOOO.phoneDisplay,
    wa: WAOOO.wa, waDisplay: WAOOO.waDisplay,
    email: WAOOO.email, facebook: WAOOO.facebook,
  };

  $('sWa').value = DB.settings.wa;
  $('sEmail').value = DB.settings.email;
  $('sFb').value = DB.settings.facebook;

  renderList(); renderStats(); renderPubStat();
}

async function seedCloud(){
  toast('⏳ Subiendo catálogo...');
  try{
    await sbSyncTours();
    await sbSaveSettings();
    localStorage.removeItem('waooo_admin_data');   // ya no se usa el modo local
    $('seedBanner').innerHTML = '';
    toast('✅ ¡Catálogo en la nube! Publicación automática activada');
    renderPubStat();
  }catch(e){ toast('❌ No se pudo subir. Revisa tu conexión.'); }
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

let fImageData = null;
let fGalleryData = [];

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

async function saveForm(){
  const name = $('fName').value.trim();
  const price = parseFloat(String($('fPrice').value).replace(',','.'));
  if(!name){ toast('⚠️ Escribe el nombre del tour'); return; }
  if(!(price>0)){ toast('⚠️ Pon un precio válido'); return; }

  const id = editingId || uniqueId(slugify(name));
  toast('⏳ Guardando...');

  /* sube las fotos nuevas (base64) a Supabase Storage */
  try{
    if(fImageData && fImageData.startsWith('data:')){
      fImageData = await sbUploadPhoto(`${id}-${Date.now()}.jpg`, fImageData);
    }
    for(let i=0;i<fGalleryData.length;i++){
      if(fGalleryData[i] && fGalleryData[i].startsWith('data:')){
        fGalleryData[i] = await sbUploadPhoto(`${id}-${Date.now()}-${i+2}.jpg`, fGalleryData[i]);
      }
    }
  }catch(e){ toast('❌ No se pudieron subir las fotos. Intenta de nuevo.'); return; }

  const data = {
    id, name,
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
    DB.tours[i] = data;
  } else {
    DB.tours.unshift(data);
  }

  try{
    await sbSyncTours();
    toast(editingId ? '✅ Tour actualizado — ya está en vivo' : '✅ Tour creado — ya está en vivo');
  }catch(e){ toast('❌ No se pudo guardar en la nube. Revisa tu conexión.'); }
  renderList(); renderStats(); closeForm();
}

async function delTour(id){
  const t = DB.tours.find(x=>x.id===id);
  if(!confirm(`¿Eliminar "${t.name}" de la web?`)) return;
  DB.tours = DB.tours.filter(x=>x.id!==id);
  try{
    await sbDeleteTour(id);
    await sbSyncTours();
    toast('🗑️ Tour eliminado de la web');
  }catch(e){ toast('❌ No se pudo eliminar. Revisa tu conexión.'); }
  renderList(); renderStats();
}

/* ---------- settings ---------- */
async function saveSettings(){
  /* un solo número de contacto: se guarda en los dos campos por compatibilidad */
  const wa = $('sWa').value.replace(/\D/g,'');
  const email = $('sEmail').value.trim();
  const fb = $('sFb').value.trim();
  if(!wa){ toast('⚠️ El número de contacto es obligatorio'); return; }
  DB.settings = {
    phone: wa, phoneDisplay: fmtDisplay(wa),
    wa, waDisplay: fmtDisplay(wa),
    email: email || DB.settings.email,
    facebook: fb || DB.settings.facebook,
  };
  try{
    await sbSaveSettings();
    toast('✅ Datos guardados — ya están en vivo');
  }catch(e){ toast('❌ No se pudo guardar. Revisa tu conexión.'); }
}

/* ---------- respaldo (ZIP) ---------- */
function renderPubStat(){
  $('pubStat').innerHTML = `☁️ Conectado a la nube. Cada cambio que guardas se publica <b>al instante</b> en la web.`;
}

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

function genDataJS(tours){
  const w = Object.assign({}, WAOOO, DB.settings);
  const tourLines = tours.map(t=>'  '+JSON.stringify(t)).join(',\n');
  return `/* ============================================================
   WAOOO Tours and Adventures — Punta Cana
   Catálogo de excursiones (respaldo generado desde el panel admin)
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

/* Cambios locales del panel admin (modo sin nube) */
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
  const enc = new TextEncoder();
  const leeme = `WAOOO Tours — Respaldo del catálogo
====================================
Fecha: ${new Date().toLocaleString('es-DO')}
Tours: ${DB.tours.length}

Este respaldo contiene assets/data.js con el catálogo completo.
Las fotos están seguras en la nube (Supabase Storage).

Si algún día hiciera falta restaurar: reemplazar assets/data.js
en el proyecto con el archivo de este ZIP.
`;
  const files = [
    {name:'LEEME.txt', data: enc.encode(leeme)},
    {name:'assets/data.js', data: enc.encode(genDataJS(DB.tours))},
  ];
  const blob = zipStore(files);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'waooo-respaldo.zip';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('⬇️ Respaldo descargado');
}

/* ---------- boot ---------- */
TOKEN = sessionStorage.getItem(TK_KEY);
if(TOKEN) showPanel();
else $('passInput') && setTimeout(()=>$('emailInput').focus(), 100);
