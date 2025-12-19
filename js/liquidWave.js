const canvas = document.getElementById('liquidCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const noise = new SimplexNoise();

// Ajustes de onda
const waveHeight = 150;
const speed = 0.005;
let time = 0;

// Redimensionar canvas al cambiar el tamaño de ventana
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Dibujar ondas
function draw() {
    ctx.clearRect(0, 0, width, height);

    // Fondo negro
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let x = 0; x <= width; x += 10) {
        // Y varía con el tiempo usando Simplex noise para efecto orgánico
        const y = height / 2 + noise.noise(x * 0.006 + time, time) * waveHeight;
        ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    ctx.fillStyle = 'rgba(20, 220, 220, 0.2)'; // color de la onda
    ctx.fill();

    time += speed;
    requestAnimationFrame(draw);
}

draw();
