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
admin.html        → Panel de administración (protegido con contraseña)
assets/
  ├── data.js     → Catálogo de tours y categorías (editable desde el admin)
  ├── i18n.js     → Traducciones español / inglés
  ├── app.js      → Render, búsqueda, filtros, favoritos, reservas
  ├── admin.js    → Lógica del panel de administración
  ├── styles.css  → Diseño / identidad de marca + animaciones
  ├── hero.mp4    → Video del hero
  └── waoo.jpeg   → Logo
```

## ✨ Funcionalidades

- 🌎 **Bilingüe ES/EN** — detección automática del idioma del visitante + selector en el header
- 🎥 Hero con video de fondo y animaciones en todo el sitio
- 🔍 Búsqueda y filtros por 16 categorías
- ↕️ Ordenar por precio / nombre
- ❤️ Favoritos (guardados en el navegador)
- 📱 Reserva por WhatsApp con mensaje automático en el idioma del visitante
- 📲 Diseño responsive (móvil, tablet, escritorio)

## 🔐 Panel de administración

En `admin.html` el dueño puede: agregar/editar/eliminar tours, cambiar precios,
poner fotos, y actualizar teléfono/WhatsApp/email/Facebook.

Los cambios se guardan al instante en el navegador (vista previa) y se publican
descargando el `data.js` actualizado desde la pestaña **Publicar** y
reemplazando `assets/data.js` en este repositorio.

## 📝 Pendiente

- Fotos reales de cada tour (se agregan desde el panel admin o con `image:` en data.js)
- Instagram (aún no creado) y dominio definitivo

---

📞 **Llamadas:** +1 829-431-2369 · 💬 **WhatsApp:** +1 829-631-8364
📧 waoooinfotours1727@gmail.com · 📘 [Facebook](https://www.facebook.com/profile.php?id=100054507609021)
📍 Punta Cana, República Dominicana
