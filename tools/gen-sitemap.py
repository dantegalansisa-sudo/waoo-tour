# -*- coding: utf-8 -*-
"""
Regenera sitemap.xml con todas las excursiones.

Cuándo usarlo: cuando se agreguen o eliminen tours.
Cómo:  python tools/gen-sitemap.py
       (desde la carpeta del proyecto)

Lee los ids de assets/data.js. Si el catálogo vive en Supabase y tiene
tours nuevos, primero descarga el respaldo desde el panel admin
(pestaña Respaldo) y reemplaza assets/data.js.
"""
import io, os, re, datetime

DOMINIO = "https://www.waoootoursrd.com"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def main():
    data = io.open(os.path.join(RAIZ, "assets", "data.js"), encoding="utf-8").read()
    ids = re.findall(r'[{,]\s*(?:"id"|id)\s*:\s*"([^"]+)"', data)
    # deduplicar conservando el orden
    vistos, tours = set(), []
    for i in ids:
        if i not in vistos:
            vistos.add(i); tours.append(i)

    hoy = datetime.date.today().isoformat()
    paginas = [("/", "1.0", "weekly"), ("/tours.html", "0.9", "weekly"), ("/guia.html", "0.8", "monthly")]

    filas = []
    for ruta, prio, freq in paginas:
        filas.append(f"""  <url>
    <loc>{DOMINIO}{ruta}</loc>
    <lastmod>{hoy}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio}</priority>
  </url>""")
    for t in tours:
        filas.append(f"""  <url>
    <loc>{DOMINIO}/tour.html?id={t}</loc>
    <lastmod>{hoy}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>""")

    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + "\n".join(filas) + "\n</urlset>\n")

    destino = os.path.join(RAIZ, "sitemap.xml")
    io.open(destino, "w", encoding="utf-8").write(xml)
    print(f"sitemap.xml generado: {len(paginas)} páginas + {len(tours)} excursiones")

if __name__ == "__main__":
    main()
