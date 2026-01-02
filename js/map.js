const url = "https://v1.formula-1.api-sports.io/circuits";

import { circuitos2025 } from './circuitsList.js';

// Leer parámetro de la URL
const params = new URLSearchParams(window.location.search);
const selectedCircuit = params.get("circuit");

// Inicializar mapa
const map = L.map('map').setView([20, 0], 2);

// Capa base OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Función para geocodificar ciudad + país
async function geocode(city, country) {
    const query = `${city}, ${country}`;
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (data.length > 0) {
        return {
            lat: data[0].lat,
            lon: data[0].lon
        };
    }
    return null;
}

// Obtener circuitos
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
                    iconUrl: 'img/f1.png', // icono personalizado
                    iconSize: [30, 30],
                    iconAnchor: [15, 30]
                })
            })
                .addTo(map)
                .bindPopup(`
        <strong>${circuit.name}</strong><br>
        ${city}, ${country}<br>
        ${circuit.competition.name}
    `);

            // Si este es el circuito seleccionado, hacer zoom
            if (selectedCircuit && circuit.name === selectedCircuit) {
                map.setView([coords.lat, coords.lon], 13, { animate: true });
                marker.openPopup();
            }

        }
    })
    .catch(err => console.error("Error cargando mapa:", err));

// Cargar hoteles
fetch('../data/hotels.json')
    .then(res => res.json())
    .then(data => {
        data.hotels.forEach(circuitHotels => {
            circuitHotels.hotels.forEach(hotel => {
                L.marker([hotel.lat, hotel.lon], {
                    icon: L.icon({
                        iconUrl: 'img/hotel-icon.png', // icono personalizado
                        iconSize: [30, 30],
                        iconAnchor: [15, 30]
                    })
                })
                    .addTo(map)
                    .bindPopup(`
                    <strong>${hotel.name}</strong><br>
                    ${hotel.stars} estrellas<br>
                    $${hotel.price_per_night} por noche<br>
                    ${hotel.description}
                `);
            });
        });
    })
    .catch(err => console.error("Error cargando hoteles:", err));
