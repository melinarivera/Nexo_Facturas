# Publicación en GitHub Pages

La configuración está preparada para un repositorio dedicado a Nexo. Si se integra en un repositorio con un portafolio o una web existente, hay que adaptar las rutas y el despliegue antes de subir este flujo, para no reemplazar la web actual.

## Archivos que se deben subir

- `dist/`
- `tests/`
- `.github/workflows/pages.yml`
- `.gitignore`
- `README.md`
- `PUBLICAR.md`

No subir `.git/`, `.openai/` ni credenciales. `.openai/` corresponde al intento anterior de publicación en otro servicio y no es necesario en GitHub.

## Activación

1. Dar acceso al repositorio concreto a la conexión de GitHub utilizada para subir los archivos.
2. En el repositorio, abrir **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Subir los archivos a la rama principal del repositorio. El flujo comprueba la demo antes de desplegarla.
4. Consultar **Actions → Publicar demo Nexo en GitHub Pages**. Cuando termine correctamente, el paso de despliegue mostrará la URL publicada.
5. Añadir esa URL como enlace «Ver demo» en el portafolio.

Si el repositorio ya contiene otra web, no activar este flujo sin adaptarlo. La publicación usa exclusivamente `dist/` como contenido de la página.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Descripción sugerida para el portafolio

**Nexo — Automatización de facturas multiempresa**

Prototipo interactivo para despachos contables españoles. Centraliza facturas recibidas y emitidas, revisión, aprobación, incidencias y conciliación en un panel adaptable a móvil y escritorio. Incluye un circuito conceptual de integración con SAP, extracción OCR/IA simulada, métricas y exportación CSV.

Tecnologías: HTML, CSS y JavaScript; persistencia local y pruebas con Node.js. Datos ficticios, sin conexión real a SAP ni certificación de cumplimiento fiscal.

## Estado

Publicada con GitHub Pages (fuente: GitHub Actions) en https://melinarivera.github.io/Nexo_Facturas/

Enlazada desde el portafolio (https://melinarivera.github.io/MR_Portafolio/) y desde la página de servicios.
El repositorio debe seguir siendo público: con una cuenta gratuita, GitHub Pages no publica repositorios privados.
