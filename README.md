# TermiCrack — Sitio Web Comercial

Sitio web estático para **TermiCrack**, cemento expansivo demoledor sin explosiones, distribuido por **ECOBISEC JYH SAC** en Arequipa.

## Descripción

TermiCrack es un cemento expansivo no explosivo capaz de generar hasta **10 000 t/m²** de presión expansiva (superior a los 6 000-7 000 t/m² de productos convencionales). El sitio web presenta información técnica, guías de aplicación, calculadora de consumo y cobertura de envíos desde Arequipa a todo el sur del Perú, Bolivia y Norte de Chile.

## Tecnologías

- **HTML5** — Estructura semántica con Schema.org JSON-LD (Product, Organization, BreadcrumbList, FAQPage)
- **CSS3** — Variables CSS personalizadas, Grid Layout, Flexbox, animaciones, `clamp()`, `backdrop-filter`
- **JavaScript (Vanilla ES6+)** — Sin frameworks ni librerías externas
- **Google Fonts** — Fuente Inter (400, 500, 600, 700, 800, 900)
- **SVG Inline** — Gráficos de fractura y galería modal

No requiere build tools, dependencias npm ni frameworks. Es un sitio 100% estático listo para desplegar.

## Estructura del Proyecto

```
termicrack_web/
├── index.html              # Página principal (~1212 líneas, incluye JS embebido)
├── styles.css              # Estilos completos (~2059 líneas, responsive, animaciones)
├── README.md               # Este archivo
└── docs/
    ├── extracto_manual.txt     # Extracto del manual técnico
    └── MANUAL.txt     # Manual completo del producto (texto plano)
```

## Secciones del Sitio

| Sección | Descripción |
|---------|-------------|
| Hero | Presentación principal con estadísticas y CTAs |
| ¿Qué es TermiCrack? | Especificaciones técnicas y beneficios clave |
| Beneficios | Ventajas vs. explosivos tradicionales |
| Aplicaciones | 12 casos de uso: minería, obras hidráulicas, demolición urbana |
| Parámetros de Perforación | Tabla técnica de diámetros y espaciamientos |
| Procedimiento de Mezcla | 6 pasos detallados con consejos prácticos |
| Precauciones | Seguridad y equipo de protección personal |
| Presentaciones y Precios | Bolsa 5 kg (S/. 160) y caja 20 kg (S/. 550) |
| Cobertura de Envíos | Arequipa, Puno, Cusco, Tacna, Moquegua, Ica, Ayacucho, Madre de Dios, Bolivia y Chile |
| Galería | Imágenes de resultados reales con modal interactivo (SVG) |
| Calculadora de Consumo | Estimación de kg según longitud y diámetro de broca |
| FAQ | 7 preguntas frecuentes con Schema.org FAQPage |
| Contacto | Datos de ECOBISEC JYH SAC e integración WhatsApp |

## Funcionalidades JavaScript

| Función | Descripción |
|---------|-------------|
| `calcular()` | Calculadora de consumo: fórmula `2 × (D/40)² × L` |
| `actualizarWhatsApp()` | Genera mensaje prellenado para cotización directa |
| `openGallery()` / `closeGallery()` / `navGallery()` | Galería modal con navegación |
| `toggleNav()` / `closeNav()` | Menú de navegación móvil responsive |
| `seleccionarOpcion()` | Selector de presentaciones de compra |

## Características Técnicas

- **SEO Optimizado**: Meta tags, Open Graph, Twitter Cards, Schema.org estructurado
- **Responsive Design**: Mobile-first, breakpoints en 480px, 640px, 768px y 860px
- **Accesibilidad**: ARIA labels, roles semánticos, navegación por teclado
- **Performance**: CSS crítico, imágenes con `loading="lazy"`, fuentes con `preconnect`
- **WhatsApp Integration**: Cotización directa con mensaje automático personalizado

## Cómo Usar

1. Clona o descarga el repositorio
2. Abre `index.html` en cualquier navegador moderno
3. No requiere servidor local ni instalación de dependencias

Para desarrollo local, puedes usar cualquier servidor HTTP estático:

```bash
# Con Python
python -m http.server 8001

# Con Node.js (npx http-server)
npx http-server
```

Luego visita `http://localhost:8001` en tu navegador.

## Información del Producto

- **Presión expansiva**: 10 000 t/m²
- **Rango térmico**: -5 °C a 40 °C
- **Tiempo de fisuración**: 10-20 horas
- **Presentación**: Caja 20 kg (4 × 5 kg), bolsa individual 5 kg
- **Diámetro de broca recomendado**: Ø 32-51 mm (óptimo 40-51 mm)
- **Vida útil**: 12 meses (bolsa sin abrir)
- **Vendedor**: ECOBISEC JYH SAC — Arequipa (10 años de experiencia)

## Contacto

- **Distribuidor**: ECOBISEC JYH SAC — Arequipa, Perú
- **Teléfono / WhatsApp**: +51 930 646 411
- **Email**: infomes@termicrack.com
- **Web**: [https://termicrack.com](https://termicrack.com) / [https://cemento.net.pe](https://cemento.net.pe)

## Licencia

Todos los derechos reservados © 2025 — ECOBISEC JYH SAC. Uso comercial exclusivo para distribución de TermiCrack. Prohibida la reproducción total o parcial sin autorización expresa. RUC: 20558318318
