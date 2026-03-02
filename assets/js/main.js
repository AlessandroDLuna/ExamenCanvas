/**
 * ============================================================================
 * EXAMEN TEMA 1: INTRODUCCIÓN A LA GRAFICACIÓN POR COMPUTADORA
 * Aplicación: Dibujo de paisaje usando Canvas 2D API
 * Autor: [Tu Nombre Completo]
 * Fecha: [Fecha de hoy]
 * Descripción: Script que utiliza primitivas de Canvas (rectángulos, círculos, 
 * líneas y polígonos) para generar un paisaje con al menos 30 figuras básicas.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    // Función principal para organizar el dibujo
    function dibujarPaisaje() {
        dibujarFondoCieloY Tierra(ctx); // 2 figuras (rectángulos)
        dibujarSol(ctx);                // 9 figuras (1 círculo, 8 líneas)
        dibujarNube(ctx, 100, 80);      // 4 figuras (círculos)
        dibujarNube(ctx, 350, 120);     // 4 figuras (círculos)
        dibujarCasa(ctx);               // 8 figuras (rectángulos, triángulo, círculo)
        dibujarArbol(ctx);              // 6 figuras (1 rectángulo, 5 círculos)
        dibujarCerca(ctx);              // 12 figuras (10 rectángulos verticales, 2 horizontales)
        // Total aproximado: 45 figuras básicas generadas
    }

    function dibujarFondoCieloY Tierra(ctx) {
        // Cielo (Figura 1)
        ctx.fillStyle = "#87CEEB"; 
        ctx.fillRect(0, 0, 500, 400);

        // Tierra / Pasto (Figura 2)
        ctx.fillStyle = "#228B22";
        ctx.fillRect(0, 300, 500, 100);
    }

    function dibujarSol(ctx) {
        // Círculo central (Figura 3)
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(420, 60, 30, 0, Math.PI * 2);
        ctx.fill();

        // Rayos del sol (Figuras 4 a 11)
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
            let angle = (i * Math.PI) / 4;
            let x1 = 420 + Math.cos(angle) * 35;
            let y1 = 60 + Math.sin(angle) * 35;
            let x2 = 420 + Math.cos(angle) * 55;
            let y2 = 60 + Math.sin(angle) * 55;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    function dibujarNube(ctx, x, y) {
        ctx.fillStyle = "#FFFFFF";
        // 4 círculos por nube (Figuras 12-19 en total)
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.arc(x + 20, y - 10, 25, 0, Math.PI * 2);
        ctx.arc(x + 40, y, 20, 0, Math.PI * 2);
        ctx.arc(x + 20, y + 10, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    function dibujarCasa(ctx) {
        // Base de la casa (Figura 20)
        ctx.fillStyle = "#F5F5DC";
        ctx.fillRect(50, 180, 140, 120);

        // Techo - Triángulo (Figura 21)
        ctx.fillStyle = "#A52A2A";
        ctx.beginPath();
        ctx.moveTo(30, 180);
        ctx.lineTo(120, 100);
        ctx.lineTo(210, 180);
        ctx.fill();

        // Puerta (Figura 22)
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(100, 240, 40, 60);

        // Perilla (Figura 23)
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(132, 275, 4, 0, Math.PI * 2);
        ctx.fill();

        // Ventana 1 (Figura 24 y 25 - fondo y marco)
        ctx.fillStyle = "#87CEFA";
        ctx.fillRect(60, 200, 30, 30);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeRect(60, 200, 30, 30);

        // Ventana 2 (Figura 26 y 27 - fondo y marco)
        ctx.fillRect(150, 200, 30, 30);
        ctx.strokeRect(150, 200, 30, 30);
    }

    function dibujarArbol(ctx) {
        // Tronco (Figura 28)
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(350, 200, 30, 100);

        // Hojas (Figuras 29 a 33)
        ctx.fillStyle = "#006400";
        let hojas = [
            {x: 365, y: 150}, {x: 340, y: 170}, 
            {x: 390, y: 170}, {x: 350, y: 200}, 
            {x: 380, y: 200}
        ];

        hojas.forEach(h => {
            ctx.beginPath();
            ctx.arc(h.x, h.y, 30, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function dibujarCerca(ctx) {
        ctx.fillStyle = "#D2B48C";
        // 10 postes verticales (Figuras 34 a 43)
        for(let i = 0; i < 10; i++) {
            ctx.fillRect(220 + (i * 28), 260, 10, 50);
        }
        // 2 tablas horizontales (Figuras 44 y 45)
        ctx.fillRect(215, 270, 280, 8);
        ctx.fillRect(215, 290, 280, 8);
    }

    // Ejecutar el dibujo
    dibujarPaisaje();
});