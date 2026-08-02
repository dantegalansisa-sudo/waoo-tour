/* ============================================================
   WAOOO Tours — Fotos por defecto de cada excursión
   ------------------------------------------------------------
   Estas fotos salen del material de la Guía de Punta Cana y se
   aplican SOLO a los tours que aún no tienen foto propia.
   Si el dueño sube una foto desde el panel de administración,
   esa foto SIEMPRE tiene prioridad sobre estas.

   Para agregar una foto nueva:
     1) pon el archivo en  assets/fotos/hero/mi-foto.jpg
     2) escribe aquí:      "id-del-tour": "mi-foto",

   Para varias fotos (la primera es la de la tarjeta y las demás
   forman la galería de la página del tour):
        "id-del-tour": ["tours/mi-foto-1", "tours/mi-foto-2"],
   ============================================================ */

const TOUR_PHOTOS = {
  /* --- Isla Saona --- */
  "saona-vela":              "saona-blue-paradise",
  "saona-unique":            "saona-snorkel",
  "saona-007-10":            "saona-blue-paradise",
  "saona-007-20":            "saona-island-deluxe",
  "saona-privado-deluxe":    "saona-island-deluxe",

  /* --- Isla Catalina --- */
  "catalina-pared":          "catalina-island",
  "catalina-adventure":      "catalina-island",
  "catalina-privado-deluxe": "catalina-island",

  /* --- Samaná --- */
  "cascada-limon":           "samana-adventure",
  "samana-rincon":           "samana-spectacular",
  "haitises-cayo":           "samana-spectacular",
  "samana-doble-buggy":      "samana-adventure",
  "samana-doble-atv":        "samana-adventure",
  "samana-ind-buggy":        "samana-adventure",
  "samana-ind-atv":          "samana-adventure",
  "samana-ind-atv-pp":       "samana-adventure",

  /* --- Buggies & ATV --- */
  "buggies-vip":             "buggy-adventure",
  "buggies-familiar":        "buggy-adventure",
  "buggies-ind-regular":     "buggy-adventure",
  "buggies-selva-pc":        "buggy-adventure",
  "buggies-selva-bayahibe":  "buggy-adventure",
  "buggies-selva-jd":        "buggy-adventure",
  "aventura-acua-terra":     "buggy-adventure",
  "buggy-doble-cata":        "buggy-adventure",
  "buggy-ind-cata":          "buggy-adventure",
  "buggy-doble-scape":       "buggy-adventure",
  "buggy-ind-scape":         "buggy-adventure",
  "atv-clasico-doble":       "buggy-adventure",
  "atv-clasico-ind":         "buggy-adventure",
  "atv-vip-ind":             "buggy-adventure",
  "atv-vip-doble":           "buggy-adventure",
  "wild-district-doble":     "buggy-adventure",
  "wild-district-ind":       "buggy-adventure",

  /* --- Monkeyland & tirolesas --- */
  "monkeyland":              "monkeyland",
  "combo-buggy-monkey":      "monkeyland",
  "combo-monkey-zip":        "monkeyland",
  "triple-aventura":         "monkeyland",
  "combo-buggy-zip":         "la-hacienda-park",
  "combo-buggy-zip-jd":      "la-hacienda-park",
  "tirolesas-point":         "la-hacienda-park",

  /* --- Delfines --- */
  "dolphin-exp":             "dolphin-island",
  "dolphin-royal":           "dolphin-island",
  "dolphin-uvero":           "dolphin-island",

  /* --- Mar / catamaranes --- */
  "seaquarium":              "seaquarium-punta-cana",
  "royalton-cruise":         "party-boat",
  "wildon-marcaribe":        "party-boat",
  "wildon-cenote":           "party-boat",
  "cata-bavaro-exp":         "party-boat",
  "cata-brunch":             "party-boat",
  "cata-privado-15":         "party-boat",
  "charter-cata":            "party-boat",
  "power-cruise":            "party-boat",
  "happy-hour-sail":         "party-boat",
  "sosua-tiptop":            "party-boat",

  /* --- Parques --- */
  "eldorado":                "el-dorado-park",

  /* --- Cultura --- */
  "city-sd":                 "santo-domingo-city-tour",
  "higuey-autentico":        "higuey-city-tour",
  "higuey-chavon":           "higuey-city-tour",

  /* --- Vida nocturna --- */
  "cocobongo-premium":       "coco-bongo",

  /* ===== Fotos nuevas del cliente (3 por servicio) ===== */

  /* --- Parasailing --- */
  "parasailing-ind":    ["tours/parasailing-1","tours/parasailing-2","tours/parasailing-3"],
  "parasailing-doble":  ["tours/parasailing-1","tours/parasailing-2","tours/parasailing-3"],
  "parasailing-triple": ["tours/parasailing-1","tours/parasailing-2","tours/parasailing-3"],
  "parasailing-mama":   ["tours/parasailing-1","tours/parasailing-2","tours/parasailing-3"],

  /* --- Snorkel & buceo --- */
  "marinarium":      ["tours/marinarium-1","tours/marinarium-2","tours/marinarium-3"],
  "reef-explorer":   ["tours/reef-explorer-1","tours/reef-explorer-2","tours/reef-explorer-3"],
  "snorkeling-pc":   ["tours/snorkeling-1","tours/snorkeling-2","tours/snorkeling-3"],
  "padi-doble":      ["tours/padi-doble-1","tours/padi-doble-2","tours/padi-doble-3"],
  "buceo-discover":  ["tours/buceo-1","tours/buceo-2","tours/buceo-3"],
  "openwater":       ["tours/buceo-1","tours/buceo-2","tours/buceo-3"],
  "padi-individual": ["tours/buceo-1","tours/buceo-2","tours/buceo-3"],

  /* --- Evolution Adventure Park --- */
  "evolution-full":         ["tours/evolution-1","tours/evolution-2","tours/evolution-3"],
  "evolution-unica":        ["tours/evolution-1","tours/evolution-2","tours/evolution-3"],
  "evolution-degustacion":  ["tours/evolution-1","tours/evolution-2","tours/evolution-3"],
};

/* Fotos de la sección "Aventuras en cada rincón" (index.html) */
const ZONE_PHOTOS = {
  "punta-cana":     "assets/fotos/zonas/punta-cana.jpg",
  "saona-catalina": "assets/fotos/zonas/saona-catalina.jpg",
  "cap-cana":       "assets/fotos/zonas/cap-cana.jpg",
  "samana":         "assets/fotos/zonas/samana.jpg",
};

/* Aplica las fotos por defecto a los tours que no tengan una propia.
   Acepta un solo nombre ("mi-foto", vive en assets/fotos/hero/) o una
   lista ["tours/foto-1","tours/foto-2"] donde la primera es la de la
   tarjeta y el resto forman la galería. */
function applyTourPhotos(){
  if(typeof TOURS === 'undefined') return;
  TOURS.forEach(t => {
    if(t.image) return;                      // el cliente ya subió la suya
    const p = TOUR_PHOTOS[t.id];
    if(!p) return;
    const files = Array.isArray(p) ? p : [p];
    const url = f => 'assets/fotos/' + (f.includes('/') ? f : 'hero/' + f) + '.jpg';
    t.image = url(files[0]);
    if(files.length > 1 && !(t.gallery || []).length){
      t.gallery = files.slice(1).map(url);
    }
  });
}
