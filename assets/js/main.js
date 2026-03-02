/**
 * EXAMEN TEMA 1: GRAFICACIÓN POR COMPUTADORA
 * Proyecto: Ajolote Geométrico Avanzado
 * Autor: Alessandro D. Luna
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    function dibujarAjolotePro() {
        // 1. Fondo Limpio (Color Agua Profunda)
        ctx.fillStyle = "#1a5e5e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Partes traseras (Cola y Aletas)
        dibujarAletaCola(550, 300);

        // 3. Patas (Dibujadas antes del cuerpo para que queden "atrás")
        dibujarPata(280, 340); // Delantera Izq
        dibujarPata(480, 340); // Trasera Izq

        // 4. Cuerpo (Rectángulo redondeado con degradado sutil)
        dibujarCuerpo(250, 260, 350, 100);

        // 5. Branquias (El secreto está en los filamentos)
        // Lado Izquierdo
        dibujarBranquiaCompleja(210, 270, Math.PI * 1.1);
        dibujarBranquiaCompleja(200, 300, Math.PI * 1);
        dibujarBranquiaCompleja(210, 330, Math.PI * 0.9);
        // Lado Derecho
        dibujarBranquiaCompleja(310, 270, Math.PI * 1.9);
        dibujarBranquiaCompleja(320, 300, Math.PI * 0);
        dibujarBranquiaCompleja(310, 330, Math.PI * 0.1);

        // 6. Cabeza
        dibujarCabeza(260, 300);

        // 7. Cara (Ojos con brillo y sonrisa)
        dibujarOjos(260, 290);
        dibujarSonrisa(260, 315);
        
        // 8. Detalles de burbujas
        crearBurbujas(15);
    }

    // --- FUNCIONES DE ALTO DETALLE ---

    function dibujarCuerpo(x, y, w, h) {
        ctx.fillStyle = "#ffb2d1";
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 50); // Usamos roundRect para suavidad
        ctx.fill();
        
        // Sombra interna del cuerpo para dar volumen 2D
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.beginPath();
        ctx.roundRect(x, y + h/2, w, h/2, [0, 0, 50, 50]);
        ctx.fill();
    }

    function dibujarCabeza(x, y) {
        ctx.fillStyle = "#ffcce0";
        ctx.beginPath();
        ctx.arc(x, y, 75, 0, Math.PI * 2);
        ctx.fill();
    }

    function dibujarBranquiaCompleja(x, y, angulo) {
        const largo = 80;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angulo);

        // Tallo principal
        ctx.strokeStyle = "#a3005c";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(largo, 0);
        ctx.stroke();

        // Filamentos plumosos (Bucle para generar 15 por branquia)
        ctx.strokeStyle = "#ff69b4";
        ctx.lineWidth = 3;
        for (let i = 10; i < largo; i += 6) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + 5, -15); // Filamento superior
            ctx.moveTo(i, 0);
            ctx.lineTo(i + 5, 15);  // Filamento inferior
            ctx.stroke();
        }
        ctx.restore();
    }

    function dibujarOjos(x, y) {
        // Ojo Izquierdo
        dibujarOjoIndividual(x - 35, y);
        // Ojo Derecho
        dibujarOjoIndividual(x + 35, y);
    }

    function dibujarOjoIndividual(x, y) {
        // Blanco
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();
        // Pupila
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
        // Brillo (El detalle que lo hace "bonito")
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x - 4, y - 4, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    function dibujarSonrisa(x, y) {
        ctx.strokeStyle = "#5c0034";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
    }

    function dibujarPata(x, y) {
        ctx.fillStyle = "#ffb2d1";
        // Pata principal
        ctx.beginPath();
        ctx.roundRect(x, y, 20, 50, 10);
        ctx.fill();
        // Dedos (3 circulitos)
        for(let i=0; i<3; i++) {
            ctx.beginPath();
            ctx.arc(x + (i*8), y + 50, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function dibujarAletaCola(x, y) {
        ctx.fillStyle = "rgba(255, 182, 193, 0.6)";
        ctx.beginPath();
        ctx.ellipse(x, y, 100, 60, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    function crearBurbujas(n) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        for(let i=0; i<n; i++) {
            const bx = Math.random() * canvas.width;
            const by = Math.random() * canvas.height;
            const br = Math.random() * 15;
            ctx.beginPath();
            ctx.arc(bx, by, br, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    dibujarAjolotePro();
});