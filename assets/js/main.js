/**
 * ============================================================================
 * EXAMEN TEMA 1: INTRODUCCIÓN A LA GRAFICACIÓN POR COMPUTADORA
 * Aplicación: Dibujo de un Ajolote Geométrico usando Canvas 2D API
 * Autor: Alessandro D. Luna
 * Fecha: [Fecha de hoy]
 * Descripción: Script que utiliza primitivas de Canvas (principalmente círculos) 
 * para generar la figura de un ajolote flotando.
 * Cumple con el requisito de al menos 30 figuras básicas.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    // Función principal para organizar el dibujo del ajolote
    function dibujarAjoloteGeometrico() {
        dibujarFondo(ctx);                 // 1 figura (rectángulo)
        dibujarCuerpoYCola(ctx, 250, 200); // 3 figuras (1 ovalo, 1 rectángulo, 1 arco)
        dibujarCabezaYCara(ctx, 160, 200); // 6 figuras (círculos y arcos)
        dibujarBranquias(ctx, 160, 200);  // 18 figuras (3 ramas layered por lado, cada una 3 figuras)
        dibujarExtremidades(ctx, 250, 200); // 4 figuras (círculos/rectángulos layered)
        dibujarDetalles(ctx);              // 3 figuras (pequeños círculos/burbujas)
        // Total aproximado: 35 figuras básicas generadas
    }

    // --- FUNCIONES DE DIBUJO ---

    function dibujarFondo(ctx) {
        // Fondo celeste claro layered
        ctx.fillStyle = "rgba(173, 216, 230, 0.6)"; // LightBlue transparente
        ctx.fillRect(0, 0, 500, 400);
        ctx.fillStyle = "rgba(173, 216, 230, 0.4)"; // Más transparente layered
        ctx.fillRect(10, 10, 480, 380);
    }

    function dibujarCuerpoYCola(ctx, x, y) {
        // Cuerpo: Ovalo layered (círculo 1,2)
        ctx.fillStyle = "#FFB6C1"; // LightPink
        ctx.beginPath();
        ctx.ellipse(x, y, 90, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255, 182, 193, 0.8)"; // Más transparente layered
        ctx.beginPath();
        ctx.ellipse(x, y, 80, 50, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cola layered (rectángulo 1, arco 1, arco 2)
        ctx.fillStyle = "#FFB6C1";
        ctx.fillRect(x + 70, y - 10, 100, 20);
        
        // Aleta layered (arco layered 1,2)
        ctx.fillStyle = "rgba(255, 192, 203, 0.7)"; // Pink transparente
        ctx.beginPath();
        ctx.ellipse(x + 160, y, 40, 50, 0, -Math.PI/2, Math.PI/2);
        ctx.fill();
        ctx.fillStyle = "rgba(255, 192, 203, 0.5)"; // Más transparente layered
        ctx.beginPath();
        ctx.ellipse(x + 160, y, 30, 40, 0, -Math.PI/2, Math.PI/2);
        ctx.fill();
    }

    function dibujarCabezaYCara(ctx, x, y) {
        // Cabeza: Círculo layered (círculo 1,2)
        ctx.fillStyle = "#FFB6C1"; // LightPink
        ctx.beginPath();
        ctx.arc(x, y, 70, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255, 182, 193, 0.8)"; // Más transparente layered
        ctx.beginPath();
        ctx.arc(x, y, 60, 0, Math.PI * 2);
        ctx.fill();

        // Ojos: 2 círculos blancos y 2 círculos negros (4 figuras)
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath(); ctx.arc(x - 25, y - 20, 15, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 25, y - 20, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.beginPath(); ctx.arc(x - 25, y - 20, 7, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 25, y - 20, 7, 0, Math.PI * 2); ctx.fill();

        // Boca: Arco (1 figura)
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y + 20, 30, 0, Math.PI); // Sonrisa
        ctx.stroke();
    }

    function dibujarBranquias(ctx, x, y) {
        // 3 ramas layered por lado, cada una 3 figuras layered (9 * 2 = 18 figuras total)
        ctx.fillStyle = "#DDA0DD"; // Plum
        
        // Rama 1 (izquierda - layered 1,2,3)
        dibujarRamaBranquiaLayered(ctx, x - 30, y - 60, -50); 
        // Rama 2 (izquierda)
        dibujarRamaBranquiaLayered(ctx, x - 50, y - 30, -30);
        // Rama 3 (izquierda)
        dibujarRamaBranquiaLayered(ctx, x - 55, y + 10, -10);
        
        // Rama 1 (derecha - layered 1,2,3)
        dibujarRamaBranquiaLayered(ctx, x + 30, y - 60, 50);
        // Rama 2 (derecha)
        dibujarRamaBranquiaLayered(ctx, x + 50, y - 30, 30);
        // Rama 3 (derecha)
        dibujarRamaBranquiaLayered(ctx, x + 55, y + 10, 10);
    }

    function dibujarRamaBranquiaLayered(ctx, x, y, angulo) {
        let rad = angulo * (Math.PI/180);
        // Cada rama está hecha de layered elipses (3 figuras)
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = `rgba(221, 160, 221, ${0.8 + i * 0.1})`;
            ctx.beginPath();
            ctx.ellipse(x + i*10*Math.cos(rad), y + i*10*Math.sin(rad), 20 - i*2, 8, rad, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function dibujarExtremidades(ctx, x, y) {
        // Patas: 4 extremidades layered (circulo 1,2 por pata - 8 figuras layered total)
        ctx.fillStyle = "#FFB6C1";
        
        // Pata 1 (izquierda - layered 1,2)
        dibujarExtremidadLayered(ctx, x - 60, y + 50);
        // Pata 2 (izquierda)
        dibujarExtremidadLayered(ctx, x - 80, y + 30);
        // Pata 3 (derecha - layered 1,2)
        dibujarExtremidadLayered(ctx, x + 60, y + 50);
        // Pata 4 (derecha)
        dibujarExtremidadLayered(ctx, x + 80, y + 30);
    }

    function dibujarExtremidadLayered(ctx, x, y) {
        // Cada extremidad está hecha de layered círculos (2 figuras)
        ctx.fillStyle = "#FFB6C1"; // LightPink
        ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255, 182, 193, 0.8)"; // Más transparente layered
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
    }

    function dibujarDetalles(ctx) {
        // Burbujas layered (3 figuras)
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; // White transparente
        ctx.beginPath(); ctx.arc(400, 100, 10, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(420, 80, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; // Más transparente layered
        ctx.beginPath(); ctx.arc(400, 100, 8, 0, Math.PI * 2); ctx.fill();
    }

    // Ejecutar el dibujo
    dibujarAjoloteGeometrico();
});