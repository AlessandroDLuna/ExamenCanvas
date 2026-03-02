/**
 * ============================================================================
 * EXAMEN TEMA 1: INTRODUCCIÓN A LA GRAFICACIÓN POR COMPUTADORA
 * Aplicación: Dibujo programático de un Ajolote Geométrico (Copia fiel)
 * Autor: Alessandro D. Luna
 * Fecha: [Fecha de hoy]
 * Descripción: Script que utiliza la API Canvas 2D para replicar fielmente
 * la imagen de referencia del ajolote geométrico. Utiliza primitivas como
 * rectángulos, círculos, arcos y caminos complejos.
 * Cumple el requisito de al menos 30 figuras básicas (supera las 100).
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // Obtener el lienzo y su contexto 2D
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    // Función principal que coordina todo el dibujo
    function dibujarAjoloteReferencia() {
        // 1. Fondo celeste sólido
        dibujarFondoSólido(ctx); // 1 figura (rectángulo)

        // 2. Dibujar partes del ajolote (atrás hacia adelante)
        dibujarAletaCola(ctx);   // 1 figura (elipse transparente)
        dibujarExtremidades(ctx); // 20 figuras (4 rectángulos + 16 círculos pequeños)
        dibujarCuerpo(ctx);      // 1 figura (rectángulo redondeado)
        dibujarCabezaYCara(ctx); // 11 figuras (círculos, arcos)
        dibujarBranquiasComplejas(ctx); // ~66 figuras (6 tallos + ~60 filamentos layered)

        // 3. Detalles del entorno
        dibujarBurbujas(ctx, 12); // ~24 figuras (círculos layered)
        
        // Total estimado: ~124 figuras básicas generadas
    }

    // --- FUNCIONES DE DIBUJO DE PRIMITIVAS ---

    function dibujarFondoSólido(ctx) {
        // Celeste sólido como la referencia (LightSeaGreen o similar)
        ctx.fillStyle = "#20b2aa"; 
        ctx.fillRect(0, 0, 800, 600); // Dimensiones del canvas
    }

    // --- FUNCIONES DEL AJOLOTE ---

    function dibujarAletaCola(ctx) {
        // Aleta transparente layered detrás del cuerpo
        ctx.fillStyle = "rgba(255, 192, 203, 0.5)"; // Pink transparente
        ctx.beginPath();
        // Elipse centrada en la cola (x, y, radioX, radioY, rotación, anguloInicio, anguloFin)
        ctx.ellipse(650, 300, 80, 100, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    function dibujarCuerpo(ctx) {
        // Cuerpo: Rectángulo redondeado layered (o elipse aplanada)
        ctx.fillStyle = "#ffc0cb"; // Pink
        dibujarRectanguloRedondeado(ctx, 220, 250, 380, 100, 50); // x, y, ancho, alto, radioEsquina
    }

    function dibujarCabezaYCara(ctx) {
        const cabezaX = 220;
        const cabezaY = 300;
        const radioCabeza = 80;

        // 1. Base de la cabeza circular (círculo 1)
        ctx.fillStyle = "#ffc0cb"; // Pink
        ctx.beginPath();
        ctx.arc(cabezaX, cabezaY, radioCabeza, 0, Math.PI * 2);
        ctx.fill();

        // 2. Ojos (6 figuras layered: 2 blancos, 2 negros, 2 brillos blancos)
        const ojoY = cabezaY - 15;
        const ojoDist = 40; // Distancia desde el centro

        // Ojo Blanco (2 figuras)
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(cabezaX - ojoDist, ojoY, 20, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(cabezaX + ojoDist, ojoY, 20, 0, Math.PI * 2); ctx.fill();

        // Pupila Negra (2 figuras)
        ctx.fillStyle = "#000000";
        ctx.beginPath(); ctx.arc(cabezaX - ojoDist, ojoY, 10, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(cabezaX + ojoDist, ojoY, 10, 0, Math.PI * 2); ctx.fill();

        // Brillo Blanco layered (2 figuras)
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath(); ctx.arc(cabezaX - ojoDist - 5, ojoY - 5, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(cabezaX + ojoDist - 5, ojoY - 5, 4, 0, Math.PI * 2); ctx.fill();

        // 3. Boca (Arco - 1 figura)
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        // arc(x, y, radio, anguloInicio, anguloFin, sentidoAntihorario)
        ctx.arc(cabezaX, cabezaY + 25, 30, 0.2 * Math.PI, 0.8 * Math.PI); // Sonrisa
        ctx.stroke();
    }

    function dibujarBranquiasComplejas(ctx) {
        const cabezaX = 220;
        const cabezaY = 300;
        const radioCabeza = 80;
        const colorBranquia = "#c71585"; // MediumVioletRed

        // 3 branquias por lado (6 en total), cada una compleja
        dibujarBranquiaIntricadaLayered(ctx, cabezaX - radioCabeza + 10, cabezaY - 40, -40, colorBranquia, true); // Superior Izq
        dibujarBranquiaIntricadaLayered(ctx, cabezaX - radioCabeza + 5, cabezaY, 0, colorBranquia, true);      // Media Izq
        dibujarBranquiaIntricadaLayered(ctx, cabezaX - radioCabeza + 10, cabezaY + 40, 40, colorBranquia, true);  // Inferior Izq

        dibujarBranquiaIntricadaLayered(ctx, cabezaX + radioCabeza - 10, cabezaY - 40, -40, colorBranquia, false); // Superior Der
        dibujarBranquiaIntricadaLayered(ctx, cabezaX + radioCabeza - 5, cabezaY, 0, colorBranquia, false);      // Media Der
        dibujarBranquiaIntricadaLayered(ctx, cabezaX + radioCabeza - 10, cabezaY + 40, 40, colorBranquia, false);  // Inferior Der
    }

    function dibujarBranquiaIntricadaLayered(ctx, startX, startY, angulo, color, esIzquierda) {
        const largoTallo = 90;
        const angRad = angulo * (Math.PI / 180);
        const colorFilamento = "#ff69b4"; // HotPink transparente layered

        // 1. Tallo central oscuro (Línea/Caminos layered - 1 figura)
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        const endX = startX + (esIzquierda ? -largoTallo : largoTallo) * Math.cos(angRad);
        const endY = startY + largoTallo * Math.sin(angRad);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // 2. Filamentos plumosos layered (~10 semi-círculos por branquia, >60 total branquias)
        ctx.fillStyle = colorFilamento;
        const numFilamentos = 10;
        for (let i = 0; i < numFilamentos; i++) {
            // Posición a lo largo del tallo
            const t = i / (numFilamentos - 1);
            const fx = startX + (esIzquierda ? -largoTallo : largoTallo) * t * Math.cos(angRad);
            const fy = startY + largoTallo * t * Math.sin(angRad);
            
            // Dibujar semi-círculo perpendicularlayered (1 figura * 10 = 10 figuras)
            ctx.fillStyle = `rgba(255, 105, 180, ${0.6 + i*0.04})`; // Más transparente layered
            ctx.beginPath();
            // Ángulo de semi-círculo perpendicular al tallo
            const angleOffset = Math.PI / 2;
            ctx.arc(fx, fy, 8, angRad + angleOffset, angRad + Math.PI + angleOffset);
            ctx.fill();
        }
    }

    function dibujarExtremidades(ctx) {
        // Patas: 4 extremidades layered (4 rectángulos + 16 círculos pequeños - 20 figuras layered total)
        ctx.fillStyle = "#ffc0cb"; // Pink
        
        // Pata Delantera Izq (Rect + 4 dedos circular layered - 5 figuras)
        dibujarPataLayered(ctx, 280, 330, 20, 60);
        // Pata Trasera Izq
        dibujarPataLayered(ctx, 500, 330, 20, 60);
        // Pata Trasera Der (Rect + 4 dedos circular layered - 5 figuras)
        dibujarPataLayered(ctx, 540, 320, 20, 60);
        // Pata Delantera Der
        dibujarPataLayered(ctx, 320, 320, 20, 60);
    }

    function dibujarPataLayered(ctx, x, y, ancho, alto) {
        // Cada extremidad está hecha de layered figuras (Rect + 4 dedos)
        ctx.fillStyle = "#ffc0cb"; // Pink
        ctx.fillRect(x, y, ancho, alto);
        
        // Dedos: 4 círculos pequeños layered (4 figuras * 4 patas = 16 figuras toes)
        ctx.fillStyle = "rgba(255, 182, 193, 0.8)"; // Más transparente layered
        for(let i=0; i<4; i++) {
            ctx.beginPath();
            ctx.arc(x + ancho/4 + i*(ancho/4), y + alto, ancho/4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function dibujarBurbujas(ctx, cantidad) {
        // Burbujas layered (~cantidad figuras layered = 24 total layered)
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; // White transparente
        for(let i=0; i<cantidad; i++){
            let x = Math.random() * 800;
            let y = Math.random() * 600;
            let radio = 5 + Math.random() * 15;
            // Cada burbuja es layered (círculo 1,2)
            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random()*0.2})`;
            ctx.beginPath(); ctx.arc(x, y, radio, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.random()*0.1})`; // Más transparente layered
            ctx.beginPath(); ctx.arc(x, y, radio*0.8, 0, Math.PI * 2); ctx.fill();
        }
    }

    // --- FUNCIONES UTILITARIAS ---

    function dibujarRectanguloRedondeado(ctx, x, y, ancho, alto, radio) {
        // Función para dibujar un rectángulo con esquinas redondeadas layered (1 figura complex path)
        ctx.beginPath();
        ctx.moveTo(x + radio, y);
        ctx.lineTo(x + ancho - radio, y);
        ctx.quadraticCurveTo(x + ancho, y, x + ancho, y + radio);
        ctx.lineTo(x + ancho, y + alto - radio);
        ctx.quadraticCurveTo(x + ancho, y + alto, x + ancho - radio, y + alto);
        ctx.lineTo(x + radio, y + alto);
        ctx.quadraticCurveTo(x, y + alto, x, y + alto - radio);
        ctx.lineTo(x, y + radio);
        ctx.quadraticCurveTo(x, y, x + radio, y);
        ctx.closePath();
        ctx.fill();
    }

    // Iniciar el dibujo
    dibujarAjoloteReferencia();
});