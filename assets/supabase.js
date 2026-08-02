/* ============================================================
   WAOOO Tours — Conexión a Supabase
   Carga después de data.js. Si la nube tiene datos, reemplaza
   el catálogo local; si no responde, la web sigue funcionando
   con los datos de data.js (respaldo).
   ============================================================ */

const SB_URL = 'https://bldrqwcgcoqyqutgjtef.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsZHJxd2NnY29xeXF1dGdqdGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNDU2MzgsImV4cCI6MjA5NjcyMTYzOH0.6Wqr6vnaRHQLCrXF5VvTtVcdkcT9xSaXAhZiNITLwKw';

function sbHeaders(token){
  return {
    'apikey': SB_KEY,
    'Authorization': 'Bearer ' + (token || SB_KEY),
    'Content-Type': 'application/json',
  };
}
function sbTimeout(ms){
  try{ return AbortSignal.timeout(ms); }catch(e){ return undefined; }
}

/* Lee tours + configuración de la nube. Devuelve null si falla. */
async function sbLoadAll(){
  try{
    const [tr, st] = await Promise.all([
      fetch(`${SB_URL}/rest/v1/tours?select=id,data,pos&order=pos.asc.nullslast`,
        {headers: sbHeaders(), signal: sbTimeout(6000)}),
      fetch(`${SB_URL}/rest/v1/settings?select=data&id=eq.1`,
        {headers: sbHeaders(), signal: sbTimeout(6000)}),
    ]);
    if(!tr.ok) return null;
    const tours = await tr.json();
    let settings = null;
    if(st.ok){ const rows = await st.json(); if(rows.length) settings = rows[0].data; }
    return {tours, settings};
  }catch(e){ return null; }
}

/* Aplica los datos de la nube al catálogo en memoria (TOURS / WAOOO). */
let SB_LIVE = false;
async function sbBoot(){
  const res = await sbLoadAll();
  if(res){
    if(res.tours.length){
      TOURS.length = 0;
      res.tours.forEach(r => TOURS.push(r.data));
      SB_LIVE = true;
    }
    if(res.settings) Object.assign(WAOOO, res.settings);
  }
  /* fotos por defecto para los tours que aún no tienen una propia */
  if(typeof applyTourPhotos === 'function') applyTourPhotos();
  return SB_LIVE;
}
