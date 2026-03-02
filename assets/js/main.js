/**
 * ============================================================================
 * EXAMEN TEMA 1: INTRODUCCIÓN A LA GRAFICACIÓN POR COMPUTADORA
 * Aplicación: Dibujo de escena nocturna detallada usando Canvas 2D API
 * Autor: Alessandro D. Luna
 * Fecha: [Fecha de hoy]
 * Descripción: Script que utiliza primitivas de Canvas (principalmente círculos) 
 * para generar una escena de luna detallada con cráteres y estrellas, 
 * cumpliendo el requisito de al menos 30 figuras básicas.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    // Función principal para organizar el dibujo
    function dibujarEscenaNocturna() {
        dibujarCielo(ctx);                 // 1 figura (rectángulo)
        dibujarEstrellas(ctx, 20);         // 20 figuras (círculos pequeños)
        dibujarLunaYCrateres(ctx, 250, 200, 150); // 1 luna base + 24 figuras de cráteres (8 cráteres * 3 figuras cada uno)
        // Total aproximado: 46 figuras básicas generadas
    }

    function dibujarCielo(ctx) {
        // Cielo nocturno - Degradado (Opcional, pero se ve mejor)
        let degradado = ctx.createRadialGradient(250, 200, 10, 250, 200, 400);
        degradado.addColorStop(0, "#191970"); // MidnightBlue
        degradado.addColorStop(1, "#000033"); // Muy oscuro
        
        ctx.fillStyle = degradado; 
        ctx.fillRect(0, 0, 500, 400);
    }

    function dibujarEstrellas(ctx, cantidad) {
        ctx.fillStyle = "#FFFFFF"; // Blanco puro
        for(let i = 0; i < cantidad; i++) {
            let x = Math.random() * 500;
            let y = Math.random() * 400;
            let radio = Math.random() * 2; // Estrellas de diferentes tamaños

            ctx.beginPath();
            ctx.arc(x, y, radio, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Función compleja para la luna con cráteres
    function dibujarLunaYCrateres(ctx, x, y, radio) {
        
        // 1. Base de la luna (círculo 1)
        ctx.fillStyle = "#D3D3D3"; // LightGray
        ctx.strokeStyle = "#C0C0C0"; // Silver para el borde
        ctx.lineWidth = 4;
        
        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 2. Generar cráteres (cada cráter es complejo)
        // Definimos la posición y tamaño de los cráteres (son 8 cráteres)
        const cratereData = [
            {cx: x - 60, cy: y - 50, cr: 30},
            {cx: x + 70, cy: y - 40, cr: 25},
            {cx: x - 20, cy: y + 20, cr: 40},
            {cx: x + 80, cy: y + 80, cr: 15},
            {cx: x - 90, cy: y + 90, cr: 20},
            {cx: x + 120, cy: y - 100, cr: 10},
            {cx: x - 130, cy: y - 120, cr: 12},
            {cx: x + 10, cy: y + 130, cr: 18}
        ];

        // Función auxiliar para dibujar UN cráter completo (usa 3 figuras)
        function dibujarCraterIndividual(ctx, cx, cy, cr) {
            // Sombra del cráter (elipse exterior oscura - figura 1)
            ctx.fillStyle = "rgba(100, 100, 100, 0.7)"; // Gris oscuro con transparencia
            ctx.beginPath();
            ctx.arc(cx, cy, cr, 0, Math.PI * 2);
            ctx.fill();

            // Fondo del cráter (elipse central más oscura - figura 2)
            ctx.fillStyle = "rgba(70, 70, 70, 0.8)";
            ctx.beginPath();
            ctx.arc(cx, cy, cr * 0.8, 0, Math.PI * 2);
            ctx.fill();

            // Borde de luz (elipse interior para dar relieve - figura 3)
            ctx.strokeStyle = "rgba(200, 200, 200, 0.5)"; // Gris claro transparente
            ctx.lineWidth = 2;
            ctx.beginPath();
            // Desplazamos un poco el borde de luz para dar efecto 3D
            ctx.arc(cx - 2, cy - 2, cr * 0.7, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Iterar sobre los datos para dibujar los 8 cráteres (24 figuras en total)
        cratereData.forEach(c => {
            dibujarCraterIndividual(ctx, c.cx, c.cy, c.cr);
        });
    }

    // Ejecutar el dibujo
    dibujarEscenaNocturna();
});