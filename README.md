# WAOOO Tours and Adventures · Punta Cana

Sitio web de reservas de excursiones para **WAOOO Tours and Adventures - Punta Cana**.

Una web funcional y responsive donde los turistas pueden explorar, filtrar y reservar excursiones (buggies, catamaranes, Isla Saona, delfines, snorkel, pesca y más) directamente por WhatsApp.

## 🚀 Cómo verlo

No requiere instalación ni build. Opciones:

- Abre `index.html` directamente en el navegador, **o**
- Levanta un servidor local:
  ```bash
  python -m http.server 5511
  ```
  y entra a `http://localhost:5511`

## 📁 Estructura

```
index.html        → Página principal (hero en video, categorías, destacados)
tours.html        → Catálogo con filtros, búsqueda y orden (111 excursiones)
tour.html?id=     → Detalle de cada excursión + reserva por WhatsApp
assets/
  ├── data.js     → Catálogo de tours y categorías
  ├── app.js      → Render, búsqueda, filtros, favoritos, reservas
  ├── styles.css  → Diseño / identidad de marca
  ├── hero.mp4    → Video del hero
  └── waoo.jpeg   → Logo
```

## ✨ Funcionalidades

- 🎥 Hero con video de fondo
- 🔍 Búsqueda y filtros por 16 categorías
- ↕️ Ordenar por precio / nombre
- ❤️ Favoritos (guardados en el navegador)
- 📱 Reserva por WhatsApp con mensaje automático (tour, fecha, viajeros y total)
- 📲 Diseño responsive (móvil, tablet, escritorio)

## 📝 Pendiente

- Reemplazar los placeholders de marca por fotos reales de cada tour
  (basta con añadir `image: "ruta/foto.jpg"` a cada objeto en `assets/data.js`)
- Instagram (aún no creado) y dominio definitivo
- Panel de administración para gestionar tours, precios y fotos

---

📞 **Llamadas:** +1 829-431-2369 · 💬 **WhatsApp:** +1 829-631-8364
📧 waoooinfotours1727@gmail.com · 📘 [Facebook](https://www.facebook.com/profile.php?id=100054507609021)
📍 Punta Cana, República Dominicana
