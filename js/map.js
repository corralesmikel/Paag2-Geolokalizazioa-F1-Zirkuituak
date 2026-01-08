import { circuitos2025 } from './circuitsList.js';

const url = "https://v1.formula-1.api-sports.io/circuits";

// Leer parámetro de la URL (?circuit=...)
const params = new URLSearchParams(window.location.search);
const selectedCircuit = params.get("circuit");

// ==============================
// Inicializar mapa
// ==============================
const map = L.map('map').setView([20, 0], 2);

// Forzar recalculo del mapa en móviles
setTimeout(() => {
    map.invalidateSize();
}, 300);


// Capa base OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ==============================
// Capas (para filtros)
// ==============================
const circuitsLayer = L.layerGroup().addTo(map);
const hotelsLayer = L.layerGroup().addTo(map);
const restaurantsLayer = L.layerGroup().addTo(map);

// ==============================
// Geocodificación (ciudad + país)
// ==============================
async function geocode(city, country) {
    const query = `${city}, ${country}`;
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (data.length > 0) {
        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
        };
    }
    return null;
}

// ==============================
// Cargar circuitos
// ==============================
fetch(url, {
    headers: {
        "x-apisports-key": API_KEY
    }
})
    .then(res => res.json())
    .then(async data => {

        const filtrados = data.response.filter(c =>
            circuitos2025.includes(c.name)
        );

        for (const circuit of filtrados) {
            const city = circuit.competition.location.city;
            const country = circuit.competition.location.country;

            const coords = await geocode(city, country);
            if (!coords) continue;

            const marker = L.marker([coords.lat, coords.lon], {
                icon: L.icon({
                    iconUrl: 'img/f1.png',
                    iconSize: [30, 30],
                    iconAnchor: [15, 30]
                })
            })
                .addTo(circuitsLayer)
                .bindPopup(`
                    <strong>${circuit.name}</strong><br>
                    ${city}, ${country}<br>
                    ${circuit.competition.name}
                `);

            // Zoom si viene desde index.html
            if (selectedCircuit && circuit.name === selectedCircuit) {
                map.setView([coords.lat, coords.lon], 13);
                marker.openPopup();
            }
        }
    })
    .catch(err => console.error("Error cargando circuitos:", err));

// ==============================
// Cargar hoteles
// ==============================
fetch('../data/hotels.json')
    .then(res => res.json())
    .then(data => {
        data.hotels.forEach(circuitHotels => {

            // Mostrar solo los del circuito seleccionado (si existe)
            if (!selectedCircuit || circuitHotels.circuit === selectedCircuit) {
                circuitHotels.hotels.forEach(hotel => {
                    L.marker([hotel.lat, hotel.lon], {
                        icon: L.icon({
                            iconUrl: 'img/hotel-icon.png',
                            iconSize: [30, 30],
                            iconAnchor: [15, 30]
                        })
                    })
                        .addTo(hotelsLayer)
                        .bindPopup(`
                            <strong>${hotel.name}</strong><br>
                            ${hotel.stars} estrellas<br>
                            $${hotel.price_per_night} / noche<br>
                            ${hotel.description}
                        `);
                });
            }
        });
    })
    .catch(err => console.error("Error cargando hoteles:", err));

// ==============================
// Cargar restaurantes
// ==============================
fetch('../data/restaurants.json')
    .then(res => res.json())
    .then(data => {
        data.restaurants.forEach(circuitRestaurants => {

            // Mostrar solo los del circuito seleccionado (si existe)
            if (!selectedCircuit || circuitRestaurants.circuit === selectedCircuit) {
                circuitRestaurants.restaurants.forEach(restaurant => {
                    L.marker([restaurant.lat, restaurant.lon], {
                        icon: L.icon({
                            iconUrl: 'img/restaurant-icon.png',
                            iconSize: [28, 28],
                            iconAnchor: [14, 28]
                        })
                    })
                        .addTo(restaurantsLayer)
                        .bindPopup(`
                            <strong>${restaurant.name}</strong><br>
                            Tipo: ${restaurant.type}<br>
                            Precio: ${restaurant.price_range}<br>
                            ${restaurant.description}
                        `);
                });
            }
        });
    })
    .catch(err => console.error("Error cargando restaurantes:", err));

// ==============================
// Filtros laterales
// ==============================
document.getElementById("toggleCircuits")?.addEventListener("change", e => {
    e.target.checked ? circuitsLayer.addTo(map) : circuitsLayer.remove();
});

document.getElementById("toggleHotels")?.addEventListener("change", e => {
    e.target.checked ? hotelsLayer.addTo(map) : hotelsLayer.remove();
});

document.getElementById("toggleRestaurants")?.addEventListener("change", e => {
    e.target.checked ? restaurantsLayer.addTo(map) : restaurantsLayer.remove();
});
