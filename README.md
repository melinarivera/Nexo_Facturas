# Nexo · Demo de automatización de facturas

Prototipo comercial en español para un despacho contable. Incluye tres empresas y 24 facturas ficticias, bandejas de recibidas y emitidas, validación, aprobación, simulador de SAP, conciliación, incidencias, métricas y exportación CSV.

## Abrir la demo

La opción más sencilla es abrir `dist/index.html` con Chrome, Edge, Firefox o Safari. No requiere instalación ni compilación. Las fuentes web son opcionales: sin conexión se utilizan fuentes del sistema.

Para ejecutarla mediante un servidor local, abre una terminal en esta carpeta y ejecuta:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Después abre http://127.0.0.1:4173. Para detener el servidor pulsa Control+C. Se necesita Python 3 únicamente para esta opción. También puedes servir `dist/` con cualquier servidor estático.

## Recorrido comercial de cinco minutos

1. Muestra el resumen y selecciona una empresa. Las cifras, bandejas y acciones se limitan a esa empresa.
2. Pulsa **Nueva factura**. Elige recibida o emitida y crea un ejemplo. No se carga ningún archivo real.
3. Abre **Simular OCR / IA**. Se rellenan datos prefijados y se muestra una confianza ficticia.
4. Pulsa **Validar datos** y **Aprobar factura**. Si has marcado la opción de incidencia, corrige el identificador a `DEMO-123` y vuelve a validar.
5. Pulsa **Exportar a SAP · demo**. Se genera una referencia SIM y un movimiento bancario ficticio, sin conexiones externas.
6. Abre **Conciliación** y confirma la coincidencia. La factura termina conciliada y los indicadores se actualizan.
7. En **Integración SAP**, activa el fallo de la próxima exportación. Una factura aprobada conservará su estado tras el fallo; el reintento no duplica exportaciones completadas.
8. Descarga un CSV ilustrativo. Respeta la empresa y los filtros activos de la bandeja. No es un formato de importación SAP listo para producción.

La **Guía de la demo** permite restablecer el escenario inicial, con confirmación.

## Alcance

- Los datos se guardan en el almacenamiento local del navegador. La demo no sincroniza entre equipos ni ofrece autenticación, permisos o separación de empresas con seguridad de servidor.
- No hay OCR ni IA real, ni conexión a SAP, bancos, correo o AEAT. No se realizan asientos, pagos ni envíos reales.
- Los identificadores `DEMO-*`, nombres y documentos son ficticios. La validación comprueba exclusivamente reglas de ejemplo, no la validez legal de NIF o facturas.
- IVA y cálculos son ilustrativos. No se afirma cumplimiento fiscal certificado, compatibilidad con SII, Veri*Factu u otros sistemas.
- Las métricas reflejan el conjunto ficticio: no son promesas de ahorro o precisión. El periodo de demostración es octubre de 2026.
- El documento mostrado es una representación visual de los datos, no un PDF subido. No introduzcas datos personales o de clientes reales.
- Para una implantación habría que identificar la versión de SAP, definir interfaces y mapeos, autenticación, trazabilidad de servidor, almacenamiento, OCR, conciliación bancaria y requisitos aplicables con el equipo del cliente.

## Archivos

- `dist/index.html`: entrada de la aplicación.
- `dist/styles.css`: diseño adaptable a escritorio y móvil.
- `dist/app.js`: datos, interacciones y simulaciones locales.
- `tests/flow.test.cjs`: comprobación de reglas del circuito, aislamiento del filtro de empresa, exportación y conciliación.

Para ejecutar las comprobaciones, con Node.js instalado:

```sh
node --check dist/app.js
node --test tests/flow.test.cjs
```
