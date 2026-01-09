# F1 Tracks 2025

Una aplicación web que muestra los circuitos de la temporada 2025 de Fórmula 1 y, al hacer clic en un circuito, muestra un mapa interactivo con hoteles y restaurantes cercanos.

---

## Tabla de contenidos

- [Objetivo](#objetivo)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Datos utilizados](#datos-utilizados)
- [Cómo ejecutar la aplicación](#cómo-ejecutar-la-aplicación)
- [Uso de la aplicación](#uso-de-la-aplicación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Capturas y videos](#capturas-y-videos)
- [Notas y bugs](#notas-y-bugs)

---

## Objetivo

El objetivo de este proyecto es ofrecer una manera visual e interactiva de explorar los circuitos de la Fórmula 1 2025, permitiendo a los usuarios:

- Consultar información básica de cada circuito (nombre, ubicación, récord de vuelta, vueltas, longitud, primera carrera, Gran Premio).
- Visualizar la ubicación del circuito en un mapa.
- Explorar hoteles y restaurantes cercanos a cada circuito.
- Filtrar visualmente los elementos en el mapa mediante capas: circuitos, hoteles y restaurantes.
- Mostrar citas divertidas de Kimi Räikkönen mientras se navega.

---

## Tecnologías utilizadas

- **HTML5** y **CSS3** para la estructura y diseño.
- **JavaScript (ES6 Modules)** para la lógica de la aplicación.
- **GSAP** para animaciones suaves al cargar los circuitos y citas.
- **Leaflet.js** para mapas interactivos.
- **OpenStreetMap** para los tiles del mapa y geocodificación de ciudades.
- **APIs externas**:
  - [API de Fórmula 1](https://www.api-football.com/) para obtener datos de circuitos.
  - [API de Kimi Quotes](https://kimiquotes.pages.dev/api/quote) para mostrar frases.
- **JSON local** para hoteles y restaurantes por circuito.

---

## Datos utilizados

- **Circuitos de F1 2025**: obtenidos de la API de F1, filtrados con la lista `circuitsList.js`.
- **Hoteles y restaurantes**: JSON locales (`hotels.json` y `restaurants.json`) organizados por circuito.
- **Geocodificación**: API de Nominatim de OpenStreetMap para convertir ciudad y país en coordenadas.

---

## Cómo ejecutar la aplicación

1. Clona o descarga este repositorio.
2. Asegúrate de tener tu clave de API de F1 en `config.js` como `API_KEY` (Ej: API_KEY="TuCodigoDeApi").
3. Abre `index.html` en un navegador.
4. Haz clic en cualquier circuito para navegar al mapa interactivo.

> ⚠️ Nota: Por limitaciones de CORS y APIs externas, se recomienda usar un servidor local como `Live Server` en VSCode.

---

## Uso de la aplicación

1. **Página principal (`index.html`)**:
   - Se muestran todos los circuitos de la temporada 2025.
   - Cada bloque muestra:
     - Imagen del circuito
     - Nombre del circuito
     - Gran Premio
     - Ubicación (ciudad y país)
     - Primera carrera
     - Número de vueltas y longitud
     - Récord de vuelta
   - Al hacer clic en un circuito, se redirige a `map.html` con el circuito seleccionado.

2. **Mapa interactivo (`map.html`)**:
   - Si se selecciona la pagina de mapa sin seleccionar un circuito se muestra el mapa con todos los ciruitos, restaurantes y hoteles
   - Si se selecciona el circuito desde la pagina principal se muestra un mapa centrado en el circuito seleccionado.
   - Capas y filtros:
     - Circuitos
     - Hoteles
     - Restaurantes
   - Cada marcador es clicable y muestra un popup con información detallada.
   - Puedes activar o desactivar cada capa desde el panel lateral.

---

## Estructura del proyecto

```text
F1-Tracks-2025/
│
├─ index.html
├─ map.html
├─ css/
│   └─ styles.css
├─ js/
│   ├─ config.js <- Este archivo no está incluido, se debe añadir utilizando una API key propia de [ApiSports](https://www.api-sports.io/)
│   ├─ circuits.js
│   ├─ circuitsList.js
│   ├─ map.js
│   └─ quote.js
├─ data/
│   ├─ hotels.json
│   └─ restaurants.json
├─ img/
│   ├─ favicon.png
│   ├─ f1.png
│   ├─ hotel-icon.png
│   └─ restaurant-icon.png
└─ README.md
```


---

## Capturas

### Página principal – Listado de circuitos F1 2025
![Página principal](img/captura-index.png)

En esta vista se muestran todos los circuitos de la temporada 2025 de Fórmula 1 con información detallada y animaciones.

---

### Mapa interactivo – Circuitos, hoteles y restaurantes
![Mapa interactivo](img/captura-mapa.png)
![Mapa interactivo](img/captura-mapa-completo.png)

Mapa interactivo basado en Leaflet donde se puede visualizar el circuito seleccionado junto a hoteles y restaurantes cercanos, con filtros por capas.
Si no se selecciona ningun mapa se mostrara el mapa completo.

---

## Notas y bugs

- Algunas APIs externas pueden limitar la cantidad de peticiones por día.
- Nombres de circuitos pueden variar y no coincidir con la lista interna, por lo que algunos circuitos pueden no mostrarse.
- Algunos circuitos pueden no estar correctamente colocados en el mapa.

---

Creado por Mikel Corrales
