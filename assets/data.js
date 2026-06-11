/* ============================================================
   WAOOO Tours and Adventures — Punta Cana
   Catálogo de excursiones
   ============================================================ */

const WAOOO = {
  phone: "18294312369",            // llamadas
  phoneDisplay: "+1 829-431-2369",
  wa: "18296318364",               // WhatsApp oficial
  waDisplay: "+1 829-631-8364",
  email: "waoooinfotours1727@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=100054507609021",
  brand: "WAOOO Tours and Adventures",
  location: "Punta Cana, República Dominicana",
};

/* Categorías con icono (SVG paths, stroke style) */
const CATEGORIES = [
  { key: "buggies",    label: "Buggies & ATV",        icon: "buggy" },
  { key: "catamaran",  label: "Catamaranes & Vela",   icon: "boat" },
  { key: "islas",      label: "Islas",                icon: "island" },
  { key: "delfines",   label: "Delfines & Mar",       icon: "dolphin" },
  { key: "snorkel",    label: "Snorkel & Buceo",      icon: "diving" },
  { key: "acuaticos",  label: "Deportes Acuáticos",   icon: "wave" },
  { key: "naturaleza", label: "Naturaleza & Animales",icon: "leaf" },
  { key: "cultura",    label: "Cultura & City Tours", icon: "landmark" },
  { key: "samana",     label: "Samaná",               icon: "mountain" },
  { key: "caballos",   label: "Caballos",             icon: "horse" },
  { key: "nocturna",   label: "Vida Nocturna",        icon: "party" },
  { key: "gastronomia",label: "Gastronomía & Clases", icon: "chef" },
  { key: "pesca",      label: "Pesca",                icon: "fish" },
  { key: "parques",    label: "Parques & Tickets",    icon: "ticket" },
  { key: "combos",     label: "Combos",               icon: "combo" },
  { key: "privados",   label: "Privados & VIP",       icon: "crown" },
];

const CAT_LABEL = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]));

/* Badges */
const BADGE = {
  popular: "No te lo pierdas",
  unica:   "Experiencias Únicas",
};

/*
  Tours. Campos:
  id, name, price (USD), cat, badge, zone, duration, minAge, image (null => placeholder)
*/
const TOURS = [
  { id: "seaquarium", name: "Seaquarium Punta Cana", price: 58.65, cat: "parques", zone: "Bávaro", duration: "Medio día", minAge: 0 },
  { id: "catalina-pared", name: "Isla Catalina Experience con Snorkel en La Pared, Playa y Almuerzo Caribeño", price: 108.29, cat: "islas", badge: "unica", zone: "La Romana", duration: "Día completo", minAge: 5 },
  { id: "city-sd", name: "City Tour en Santo Domingo: Una Visita Histórica y Cultural con Comida y Transportación", price: 72.96, cat: "cultura", badge: "unica", zone: "Santo Domingo", duration: "Día completo", minAge: 0 },
  { id: "saona-vela", name: "Saona Island: Experiencia a Vela con Almuerzo y Barra Libre – Transportación", price: 64.48, cat: "islas", badge: "popular", zone: "Bayahibe", duration: "Día completo", minAge: 5 },
  { id: "marinarium", name: "Marinarium Punta Cana: Catamarán, Snorkel con Tiburones, Mantarrayas y Barra Libre", price: 98.80, cat: "snorkel", badge: "popular", zone: "Bávaro", duration: "Medio día", minAge: 5 },
  { id: "buggies-vip", name: "Buggies VIP en Punta Cana con Transportación", price: 90.00, cat: "buggies", badge: "popular", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "monkeyland", name: "Monkeyland: Encuentro con Monos y Plantación de Cacao con Transportación", price: 65.55, cat: "naturaleza", badge: "popular", zone: "Anamuya", duration: "Medio día", minAge: 0 },
  { id: "dolphin-exp", name: "Dolphin Island Experience: Interacción con Delfines - con Transportación", price: 82.80, cat: "delfines", zone: "Bávaro", duration: "Medio día", minAge: 0 },
  { id: "evolution-full", name: "Evolution Adventure Park: Buggies, Cenote, Santuario de Monos y Experiencia Cultural con Transportación", price: 110.25, cat: "combos", badge: "unica", zone: "Punta Cana", duration: "Día completo", minAge: 8 },
  { id: "royalton-cruise", name: "Royalton Vibes Cruise: Aventura en Catamarán y Playa Bávaro con Snorkel y Transportación", price: 46.62, cat: "catamaran", badge: "unica", zone: "Bávaro", duration: "Medio día", minAge: 5 },
  { id: "buggies-familiar", name: "Buggies Familiar 3 o 4 Personas", price: 109.62, cat: "buggies", zone: "Punta Cana", duration: "Medio día", minAge: 0 },
  { id: "aventura-acua-terra", name: "Aventura Acuática y Terrestre: Buggy, Jet Ski o Aqua Kart con Transportación", price: 89.01, cat: "acuaticos", badge: "popular", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "combo-buggy-monkey", name: "Combo Buggies + Monkeyland con Snacks y Transportación", price: 123.51, cat: "combos", badge: "popular", zone: "Punta Cana", duration: "Día completo", minAge: 8 },
  { id: "saona-unique", name: "Tour Catamarán Saona Unique con Transportación", price: 114.08, cat: "islas", badge: "unica", zone: "Bayahibe", duration: "Día completo", minAge: 5 },
  { id: "supreme-safari", name: "Supreme Safari Truck", price: 58.90, cat: "cultura", zone: "Punta Cana", duration: "Día completo", minAge: 0 },
  { id: "eldorado", name: "El Dorado Water Park - Comida Incluida", price: 96.75, cat: "parques", zone: "Punta Cana", duration: "Día completo", minAge: 0 },
  { id: "wildon-marcaribe", name: "Wild On Mar Caribe Catamarán", price: 55.20, cat: "catamaran", zone: "Bávaro", duration: "Medio día", minAge: 5 },
  { id: "buggy-doble-cata", name: "Buggies Doble & Catamarán - Combo Tierra y Mar", price: 66.12, cat: "combos", zone: "Punta Cana", duration: "Día completo", minAge: 8 },
  { id: "evolution-unica", name: "Experiencia Única en Evolution Adventure Park: Buggies, Cenote, Santuario de Monos y Experiencia Cultural", price: 296.10, cat: "combos", badge: "unica", zone: "Punta Cana", duration: "Día completo", minAge: 8 },
  { id: "cata-privado-15", name: "Catamarán Privado para 15 Pax en Punta Cana con Snacks y Transportación", price: 522.00, cat: "privados", zone: "Bávaro", duration: "Medio día", minAge: 0 },
  { id: "charter-cata", name: "Charter Catamarán Privado", price: 557.55, cat: "privados", zone: "Bávaro", duration: "Medio día", minAge: 0 },
  { id: "wildon-cenote", name: "Wild On Caribbean Sea Catamaran y Cenote", price: 89.01, cat: "catamaran", zone: "Bávaro", duration: "Día completo", minAge: 5 },
  { id: "sunshine-cruise", name: "Sunshine Cruise By Scape Park", price: 614.14, cat: "privados", zone: "Cap Cana", duration: "Día completo", minAge: 0 },
  { id: "dolphin-royal", name: "Dolphin Island Royal: Nado con 2 Delfines - con Transportación", price: 134.55, cat: "delfines", zone: "Bávaro", duration: "Medio día", minAge: 0 },
  { id: "cocobongo-premium", name: "Coco Bongo Barra Libre Premium", price: 90.00, cat: "nocturna", zone: "Bávaro", duration: "Noche", minAge: 18 },
  { id: "cascada-limon", name: "Cascada El Limón + Cayo Levantado en Samaná con Almuerzo Buffet y Transportación", price: 114.92, cat: "samana", zone: "Samaná", duration: "Día completo", minAge: 5 },
  { id: "aqua-adrenaline", name: "Aqua Adrenaline", price: 116.61, cat: "acuaticos", zone: "Punta Cana", duration: "Medio día", minAge: 12 },
  { id: "catalina-adventure", name: "Catalina Island Adventure", price: 71.40, cat: "islas", zone: "La Romana", duration: "Día completo", minAge: 5 },
  { id: "caballos-2h", name: "Caballos 2 Horas", price: 44.20, cat: "caballos", zone: "Punta Cana", duration: "2 horas", minAge: 6 },
  { id: "cata-bavaro-exp", name: "Catamarán Bávaro Experience: Snorkel en Arrecife y Fiesta Caribeña con Transporte", price: 43.47, cat: "catamaran", zone: "Bávaro", duration: "Medio día", minAge: 5 },
  { id: "atv-clasico-doble", name: "Punta Cana ATV Tour Clásico Doble", price: 71.50, cat: "buggies", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "atv-clasico-ind", name: "Punta Cana ATV Tour Clásico Individual", price: 62.37, cat: "buggies", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "power-cruise", name: "Power Cruise Premium", price: 37.70, cat: "catamaran", badge: "popular", zone: "Bávaro", duration: "Medio día", minAge: 5 },
  { id: "sosua-tiptop", name: "Sosúa Tip Top Catamarán con Barra Libre y Transportación", price: 66.00, cat: "catamaran", zone: "Sosúa", duration: "Día completo", minAge: 5 },
  { id: "unique-paradise", name: "Unique Paradise", price: 74.97, cat: "islas", badge: "unica", zone: "Punta Cana", duration: "Día completo", minAge: 5 },
  { id: "triple-aventura", name: "Triple Aventura: Buggies + Monkeyland + Tirolesas con Almuerzo y Transportación", price: 144.21, cat: "combos", badge: "popular", zone: "Punta Cana", duration: "Día completo", minAge: 8 },
  { id: "happy-hour-sail", name: "Happy Hour Sailing Cruise", price: 58.65, cat: "catamaran", badge: "popular", zone: "Bávaro", duration: "Atardecer", minAge: 5 },
  { id: "reef-explorer", name: "Reef Explorer", price: 121.36, cat: "snorkel", zone: "Bávaro", duration: "Medio día", minAge: 8 },
  { id: "combo-buggy-zip", name: "Combo Buggies + Tirolesas con Snacks y Transportación", price: 123.51, cat: "combos", badge: "popular", zone: "Punta Cana", duration: "Día completo", minAge: 8 },
  { id: "aqua-splash", name: "Aqua Splash", price: 56.43, cat: "acuaticos", zone: "Punta Cana", duration: "Medio día", minAge: 8 },
  { id: "buggies-ind-regular", name: "Buggies Individual Regular", price: 62.37, cat: "buggies", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "caballos-1h", name: "Caballos 1 Hora", price: 29.25, cat: "caballos", zone: "Punta Cana", duration: "1 hora", minAge: 6 },
  { id: "caballo-1h-transp", name: "Explora Punta Cana a Caballo en un Paseo de 1 Hora – Transportación", price: 27.45, cat: "caballos", badge: "popular", zone: "Punta Cana", duration: "Medio día", minAge: 6 },
  { id: "combo-buggy-zip-jd", name: "Combo Buggies + Tirolesas con Transportación desde Juan Dolio y Boca Chica", price: 123.51, cat: "combos", badge: "popular", zone: "Juan Dolio", duration: "Día completo", minAge: 8 },
  { id: "caballos-regular-2h", name: "Caballos Regular - 2 Horas", price: 35.10, cat: "caballos", zone: "Punta Cana", duration: "2 horas", minAge: 6 },
  { id: "power-fly", name: "Power Fly Premium", price: 72.50, cat: "acuaticos", zone: "Bávaro", duration: "Medio día", minAge: 6 },
  { id: "higuey-autentico", name: "Higüey Auténtico: Basílica, Mercado y Sabores Locales con Transportación (Medio Día)", price: 37.17, cat: "cultura", zone: "Higüey", duration: "Medio día", minAge: 0 },
  { id: "tirolesas-point", name: "Tirolesas Tours Point", price: 40.02, cat: "naturaleza", zone: "Punta Cana", duration: "Medio día", minAge: 8 },
  { id: "evolution-degustacion", name: "Evolution Adventure Park: Buggies, Cenote, Cueva, Experiencia Cultural y Degustación con Transportación", price: 74.97, cat: "combos", zone: "Punta Cana", duration: "Día completo", minAge: 8 },
  { id: "safari-rd", name: "Paseo Safari en República Dominicana con Transportación", price: 53.55, cat: "cultura", zone: "Punta Cana", duration: "Día completo", minAge: 0 },
  { id: "atv-vip-ind", name: "Punta Cana ATV Tour VIP Individual", price: 68.67, cat: "buggies", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "atv-vip-doble", name: "Punta Cana ATV Tour VIP Doble", price: 77.00, cat: "buggies", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "wildon-eco", name: "Wild On Eco Tour: Experiencia de Naturaleza y Conservación con Transportación", price: 62.10, cat: "naturaleza", zone: "Punta Cana", duration: "Día completo", minAge: 0 },
  { id: "funpark-ind", name: "Fun Park Tour - Individual", price: 75.64, cat: "parques", badge: "popular", zone: "Punta Cana", duration: "Medio día", minAge: 8 },
  { id: "parasailing-mama", name: "Parasailing Mamajuana Shot", price: 40.60, cat: "acuaticos", zone: "Bávaro", duration: "Medio día", minAge: 6 },
  { id: "saona-privado-deluxe", name: "Tour Privado a Isla Saona en Catamarán Deluxe", price: 3239.00, cat: "privados", zone: "Bayahibe", duration: "Día completo", minAge: 0 },
  { id: "juanillo-vip", name: "Juanillo VIP By Scape Park", price: 130.41, cat: "privados", zone: "Cap Cana", duration: "Día completo", minAge: 0 },
  { id: "power-adventure", name: "Power Adventure Premium", price: 84.10, cat: "acuaticos", zone: "Bávaro", duration: "Medio día", minAge: 8 },
  { id: "catalina-privado-deluxe", name: "Tour Privado a la Isla Catalina en Catamarán Deluxe", price: 2911.00, cat: "privados", zone: "La Romana", duration: "Día completo", minAge: 0 },
  { id: "saona-007-20", name: "Saona Super 007 Grupo Privado - Máximo 20 Pax", price: 2153.50, cat: "privados", zone: "Bayahibe", duration: "Día completo", minAge: 0 },
  { id: "funpark-doble", name: "VIP Fun Park - Doble y Familiar", price: 87.57, cat: "parques", zone: "Punta Cana", duration: "Medio día", minAge: 8 },
  { id: "combo-monkey-zip", name: "Combo Monkeyland y Zip Line con Transportación", price: 89.70, cat: "combos", badge: "popular", zone: "Anamuya", duration: "Día completo", minAge: 8 },
  { id: "dolphin-uvero", name: "Dolphin Island Experience: Interacción con Delfines - con Transportación desde Uvero Alto", price: 82.80, cat: "delfines", zone: "Uvero Alto", duration: "Medio día", minAge: 0 },
  { id: "pesca-4h", name: "Charter Privado de Pesca Aficionado de 4 Horas - Máximo 6 Pax", price: 621.00, cat: "pesca", zone: "Cap Cana", duration: "4 horas", minAge: 0 },
  { id: "nisibon-safari", name: "Aventura Nisibón: Safari Panorámico, Cultura Viva y Playa Esmeralda con Transportación", price: 43.47, cat: "cultura", badge: "unica", zone: "Nisibón", duration: "Día completo", minAge: 0 },
  { id: "buggies-selva-bayahibe", name: "Buggies por la Selva desde Bayahibe con Transportación", price: 95.91, cat: "buggies", badge: "popular", zone: "Bayahibe", duration: "Día completo", minAge: 16 },
  { id: "cata-brunch", name: "Catamarán con Brunch y Snorkel por Punta Cana con Transportación", price: 75.60, cat: "catamaran", zone: "Bávaro", duration: "Medio día", minAge: 5 },
  { id: "yate-picaflor", name: "Paseo VIP Privado en el Yate Picaflor con Bebidas Incluidas", price: 1107.00, cat: "privados", zone: "Cap Cana", duration: "Medio día", minAge: 0 },
  { id: "saona-007-10", name: "Saona Super 007 Grupo Privado - Máximo 10 Pax", price: 1305.00, cat: "privados", zone: "Bayahibe", duration: "Día completo", minAge: 0 },
  { id: "haitises-redonda", name: "Tour por Los Haitises y Montaña Redonda", price: 103.85, cat: "samana", zone: "Samaná", duration: "Día completo", minAge: 5 },
  { id: "pesca-8h", name: "Charter Privado de Pesca Aficionado de 8 Horas - Máximo 6 Pax", price: 1242.00, cat: "pesca", zone: "Cap Cana", duration: "8 horas", minAge: 0 },
  { id: "pesca-compartido", name: "Pescador Compartido Aficionado", price: 150.00, cat: "pesca", zone: "Cap Cana", duration: "Medio día", minAge: 0 },
  { id: "funpark-vip-ind", name: "VIP Fun Park - Individual", price: 100.17, cat: "parques", zone: "Punta Cana", duration: "Medio día", minAge: 8 },
  { id: "samana-rincon", name: "Samaná Playa Rincón y Cayo Levantado", price: 114.92, cat: "samana", zone: "Samaná", duration: "Día completo", minAge: 5 },
  { id: "panaca-show", name: "Show Ecuestre Travesía en Panaca + Fiesta Dominicana - Con Transportación", price: 74.25, cat: "cultura", badge: "popular", zone: "Punta Cana", duration: "Día completo", minAge: 0 },
  { id: "samana-doble-buggy", name: "Tour Doble por la Ciudad de Samaná + Aventura en Buggy con Almuerzo y Transportación", price: 138.00, cat: "samana", zone: "Samaná", duration: "Día completo", minAge: 8 },
  { id: "caribbean-lake", name: "Entrada a Caribbean Lake Park", price: 27.60, cat: "parques", zone: "Punta Cana", duration: "Medio día", minAge: 0 },
  { id: "daypass-marytierra", name: "Day Pass Mar y Tierra con Transportación", price: 65.52, cat: "combos", zone: "Punta Cana", duration: "Día completo", minAge: 0 },
  { id: "buggies-selva-pc", name: "Buggies por la Selva en Punta Cana con Transportación", price: 95.91, cat: "buggies", badge: "popular", zone: "Punta Cana", duration: "Día completo", minAge: 16 },
  { id: "samana-doble-atv", name: "Tour Doble por la Ciudad de Samaná + Aventura en ATV con Almuerzo y Transportación", price: 113.85, cat: "samana", zone: "Samaná", duration: "Día completo", minAge: 16 },
  { id: "higuey-chavon", name: "Higüey y Altos de Chavón con Transportación", price: 43.47, cat: "cultura", zone: "La Romana", duration: "Día completo", minAge: 0 },
  { id: "buggies-selva-jd", name: "Buggies por la Selva desde Juan Dolio y Boca Chica con Transportación", price: 95.91, cat: "buggies", badge: "popular", zone: "Juan Dolio", duration: "Día completo", minAge: 16 },
  { id: "wild-district-doble", name: "Tour Wild District de Medio Día - Doble", price: 71.94, cat: "buggies", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "maroca-disco", name: "Maroca Disco Club con Barra Libre", price: 65.00, cat: "nocturna", zone: "Bávaro", duration: "Noche", minAge: 18 },
  { id: "maridaje-cigarros", name: "Experiencia de Maridaje de Cigarros Oliver con Ron Premium", price: 54.00, cat: "gastronomia", zone: "Punta Cana", duration: "2 horas", minAge: 18 },
  { id: "parasailing-triple", name: "Aventura de Parasailing Triple en Punta Cana", price: 126.00, cat: "acuaticos", zone: "Bávaro", duration: "Medio día", minAge: 6 },
  { id: "anamuya-walk", name: "Recorrido a Pie por Anamuya con Transportación", price: 37.17, cat: "cultura", zone: "Anamuya", duration: "Medio día", minAge: 0 },
  { id: "buggy-doble-scape", name: "Buggy Doble en Scape Park Cap Cana", price: 136.62, cat: "buggies", zone: "Cap Cana", duration: "Medio día", minAge: 16 },
  { id: "samana-ind-buggy", name: "Tour Individual por la Ciudad de Samaná y Aventura en Buggy con Almuerzo y Transportación", price: 120.75, cat: "samana", zone: "Samaná", duration: "Día completo", minAge: 16 },
  { id: "panaca-premium", name: "Show Ecuestre Travesía Premium en Panaca + Fiesta Dominicana - Con Transportación", price: 74.25, cat: "cultura", badge: "popular", zone: "Punta Cana", duration: "Día completo", minAge: 0 },
  { id: "buggy-ind-cata", name: "Buggies Individual y Catamarán - Combo Tierra y Mar", price: 75.64, cat: "combos", zone: "Punta Cana", duration: "Día completo", minAge: 16 },
  { id: "haitises-cayo", name: "Parque Nacional Los Haitises + Cayo Levantado - Con Transporte y Almuerzo", price: 106.26, cat: "samana", zone: "Samaná", duration: "Día completo", minAge: 5 },
  { id: "wild-district-ind", name: "Tour Wild District de Medio Día - Individual", price: 93.13, cat: "buggies", zone: "Punta Cana", duration: "Medio día", minAge: 16 },
  { id: "buggy-ind-scape", name: "Buggy Individual en Scape Park Cap Cana", price: 102.81, cat: "buggies", zone: "Cap Cana", duration: "Medio día", minAge: 18 },
  { id: "samana-ind-atv", name: "Tour Individual por la Ciudad de Samaná y Aventura en ATV con Almuerzo y Transportación", price: 93.15, cat: "samana", zone: "Samaná", duration: "Día completo", minAge: 16 },
  { id: "samana-ind-atv-pp", name: "Tour Individual por Samaná y Aventura en ATV con Almuerzo y Transportación desde Puerto Plata", price: 113.85, cat: "samana", zone: "Puerto Plata", duration: "Día completo", minAge: 16 },
  { id: "safari-vip", name: "Tours-Safari Exclusivo VIP", price: 68.67, cat: "cultura", zone: "Punta Cana", duration: "Día completo", minAge: 0 },
  { id: "banana-boat", name: "Banana Boat en Punta Cana", price: 18.75, cat: "acuaticos", zone: "Bávaro", duration: "1 hora", minAge: 6 },
  { id: "ringo", name: "Ringo en Punta Cana", price: 18.75, cat: "acuaticos", zone: "Bávaro", duration: "1 hora", minAge: 6 },
  { id: "parasailing-doble", name: "Aventura de Parasailing Doble en Punta Cana", price: 94.60, cat: "acuaticos", zone: "Bávaro", duration: "Medio día", minAge: 6 },
  { id: "oliver-chocolate", name: "Oliver Chocolate Master Class: Taller de Cacao y Elaboración de Chocolate con Transportación", price: 52.00, cat: "gastronomia", zone: "Punta Cana", duration: "Medio día", minAge: 0 },
  { id: "parasailing-ind", name: "Aventura de Parasailing Individual en Punta Cana", price: 63.00, cat: "acuaticos", zone: "Bávaro", duration: "Medio día", minAge: 6 },
  { id: "snorkeling-pc", name: "Snorkeling Tour en Punta Cana", price: 50.00, cat: "snorkel", zone: "Bávaro", duration: "Medio día", minAge: 8 },
  { id: "taller-coco", name: "Experiencia Única - Taller de Pintura en Coco con Cócteles", price: 48.00, cat: "gastronomia", badge: "unica", zone: "Punta Cana", duration: "2 horas", minAge: 0 },
  { id: "padi-doble", name: "Curso de Doble Inmersión PADI", price: 103.40, cat: "snorkel", zone: "Bávaro", duration: "Día completo", minAge: 12 },
  { id: "cooking-master", name: "Cooking Master Class - Sabores de la Cocina Dominicana", price: 95.00, cat: "gastronomia", zone: "Punta Cana", duration: "Medio día", minAge: 0 },
  { id: "buceo-discover", name: "Curso de Buceo Discover en Punta Cana", price: 112.80, cat: "snorkel", zone: "Bávaro", duration: "Medio día", minAge: 12 },
  { id: "mamajuana-casabe", name: "Experiencia Única - Prepara tu Mamajuana y el Pan Taíno Casabe", price: 55.00, cat: "gastronomia", badge: "unica", zone: "Punta Cana", duration: "2 horas", minAge: 0 },
  { id: "cata-cafe", name: "Experiencia de Cata de Café Oliver", price: 48.00, cat: "gastronomia", zone: "Punta Cana", duration: "2 horas", minAge: 0 },
  { id: "openwater", name: "Open Water Diver Course", price: 446.50, cat: "snorkel", zone: "Bávaro", duration: "Varios días", minAge: 15 },
  { id: "padi-individual", name: "Certificación PADI Individual Dive Course", price: 65.10, cat: "snorkel", zone: "Bávaro", duration: "Medio día", minAge: 12 },
];

/* Texto descriptivo por categoría (para página de detalle) */
const CAT_BLURB = {
  buggies: "Acelera por senderos de tierra, charcos de agua y caminos embarrados rodeado de la auténtica selva dominicana. Adrenalina garantizada con equipo de seguridad completo.",
  catamaran: "Navega las aguas turquesa del Caribe en un catamarán con barra libre, música y paradas para nadar y hacer snorkel en arrecifes y piscinas naturales.",
  islas: "Descubre las playas de postal más famosas del Caribe: arena blanca, palmeras y aguas cristalinas, con almuerzo caribeño y barra libre incluidos.",
  delfines: "Vive un encuentro inolvidable nadando e interactuando con delfines en un entorno seguro, ideal para toda la familia.",
  snorkel: "Sumérgete en arrecifes llenos de vida marina con instructores certificados y todo el equipo incluido. Para principiantes y expertos.",
  acuaticos: "Pura adrenalina sobre el mar: parasailing, jet ski, banana boat y mucha diversión frente a las playas de Bávaro.",
  naturaleza: "Conecta con la naturaleza dominicana: santuarios de animales, plantaciones de cacao, tirolesas y paisajes verdes inolvidables.",
  cultura: "Conoce la historia, la gente y los sabores de la República Dominicana en recorridos culturales auténticos con guías locales.",
  samana: "Explora la península más bella del país: cascadas, cayos paradisíacos, manglares y ballenas en temporada.",
  caballos: "Cabalga por senderos tropicales y playas vírgenes en un paseo a caballo tranquilo y guiado.",
  nocturna: "La mejor vida nocturna de Punta Cana: shows espectaculares, barra libre y fiesta hasta el amanecer.",
  gastronomia: "Talleres y catas para descubrir el cacao, el café, el ron y los sabores típicos dominicanos de la mano de expertos.",
  pesca: "Sal a mar abierto en busca de dorado, marlín y atún en un charter de pesca con todo el equipo profesional incluido.",
  parques: "Diversión para toda la familia en los mejores parques acuáticos y de aventura de la zona.",
  combos: "Más aventura por tu dinero: combina las mejores experiencias de tierra y mar en un solo día inolvidable.",
  privados: "Una experiencia exclusiva solo para tu grupo: atención personalizada, lujo y total privacidad.",
};

const INCLUDES = {
  buggies: ["Equipo de seguridad completo", "Guía profesional", "Transportación ida y vuelta*", "Parada cultural"],
  catamaran: ["Barra libre", "Snorkel y equipo", "Música a bordo", "Transportación ida y vuelta*"],
  islas: ["Almuerzo caribeño", "Barra libre", "Catamarán y lancha rápida", "Transportación ida y vuelta*"],
  delfines: ["Interacción con delfines", "Chaleco salvavidas", "Acceso al parque", "Transportación ida y vuelta*"],
  snorkel: ["Equipo de snorkel/buceo", "Instructor certificado", "Bebidas a bordo", "Transportación ida y vuelta*"],
  acuaticos: ["Equipo y chaleco salvavidas", "Personal certificado", "Fotos del recuerdo*", "Bebida de cortesía"],
  naturaleza: ["Guía naturalista", "Acceso al santuario", "Degustación local", "Transportación ida y vuelta*"],
  cultura: ["Guía local certificado", "Entradas incluidas", "Almuerzo típico*", "Transportación ida y vuelta*"],
  samana: ["Almuerzo buffet", "Guía profesional", "Entradas y traslados internos", "Transportación ida y vuelta*"],
  caballos: ["Caballo y montura", "Guía ecuestre", "Casco de seguridad", "Bebida de cortesía"],
  nocturna: ["Barra libre", "Show en vivo", "Acceso VIP*", "Transportación ida y vuelta*"],
  gastronomia: ["Materiales del taller", "Degustación", "Bebida o cóctel", "Recuerdo para llevar"],
  pesca: ["Embarcación y capitán", "Equipo de pesca profesional", "Bebidas y snacks", "Combustible incluido"],
  parques: ["Acceso a todas las áreas", "Comida incluida*", "Personal de seguridad", "Estacionamiento"],
  combos: ["Varias actividades en un día", "Almuerzo o snacks", "Guías profesionales", "Transportación ida y vuelta*"],
  privados: ["Embarcación o servicio exclusivo", "Atención personalizada", "Barra libre y almuerzo", "Transportación privada*"],
};

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
