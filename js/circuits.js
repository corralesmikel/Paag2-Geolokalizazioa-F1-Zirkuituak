const url = "https://v1.formula-1.api-sports.io/circuits";

import { circuitos2025 } from './circuitsList.js';

fetch(url, {
    method: "GET",
    headers: {
        "x-apisports-key": API_KEY
    }
})
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("circuits");
        container.innerHTML = "";

        // Comprobar si la API devolvió datos
        if (!data.response || data.response.length === 0) {
            const placeholder = document.createElement("div");
            placeholder.classList.add("circuit-placeholder");
            placeholder.innerHTML = `
            <p>No se pudieron cargar los circuitos.</p>
            <p>Intenta más tarde o verifica tu límite de API.</p>
        `;
            container.appendChild(placeholder);
            return; // Salimos de la función
        }

        const filtrados = data.response.filter(circuit =>
            circuitos2025.includes(circuit.name)
        );

        filtrados.forEach((circuit, index) => {
            const div = document.createElement("div");
            div.classList.add("circuit");

            div.innerHTML = `
            <img src="${circuit.image}" alt="${circuit.name}">
            <div class="info">
                <h2>${circuit.name}</h2>
                <p><strong>Gran Premio:</strong> ${circuit.competition.name}</p>
                <p><strong>Ubicación:</strong> ${circuit.competition.location.city}, ${circuit.competition.location.country}</p>
                <p><strong>Primera carrera:</strong> ${circuit.first_grand_prix}</p>
                <p><strong>Vueltas:</strong> ${circuit.laps}</p>
                <p><strong>Longitud:</strong> ${circuit.length}</p>
                <p><strong>Récord:</strong> ${circuit.lap_record.time} – ${circuit.lap_record.driver} (${circuit.lap_record.year})</p>
            </div>
        `;

            container.appendChild(div);

            // Animación GSAP
            const fromX = index % 2 === 0 ? -300 : 300;
            gsap.fromTo(div,
                { x: fromX, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, delay: index * 0.2, ease: "power3.out" }
            );

            // Hacer el bloque clicable
            div.style.cursor = "pointer";

            div.addEventListener("click", () => {
                const circuitName = encodeURIComponent(circuit.name);
                window.location.href = `map.html?circuit=${circuitName}`;
            });
        });
    })
    .catch(error => {
        console.error("Error al obtener los circuitos:", error);
        const container = document.getElementById("circuits");
        container.innerHTML = "";

        const placeholder = document.createElement("div");
        placeholder.classList.add("circuit-placeholder");
        placeholder.innerHTML = `
        <p>No se pudieron cargar los circuitos.</p>
        <p>Intenta más tarde o verifica tu límite de API.</p>
    `;
        container.appendChild(placeholder);
    });
