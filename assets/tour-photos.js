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
};

/* Aplica las fotos por defecto a los tours que no tengan una propia. */
function applyTourPhotos(){
  if(typeof TOURS === 'undefined') return;
  TOURS.forEach(t => {
    if(!t.image && TOUR_PHOTOS[t.id]){
      t.image = 'assets/fotos/hero/' + TOUR_PHOTOS[t.id] + '.jpg';
    }
  });
}
