/**
 * ============================================================================
 * EXAMEN TEMA 1: INTRODUCCIÓN A LA GRAFICACIÓN POR COMPUTADORA
 * Aplicación: Dibujo de escena nocturna extrema y detallada con Canvas 2D API
 * Autor: Alessandro D. Luna
 * Fecha: [Fecha de hoy]
 * Descripción: Script que utiliza primitivas de Canvas (layered círculos, elipses,
 * polígonos irregulares, arcos y degradados complejos) para generar una escena 2D
 * altamente detallada con una luna detallada (>30 cráteres), cientos de estrellas,
 * constelaciones, galaxias y paisaje nocturno detallado.
 * Cumple con el requisito de más de 30 figuras básicas (supera las 500).
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    // Función principal para organizar el dibujo extremo
    function dibujarEscenaNocturnaExtrema() {
        dibujarCieloProfundo(ctx);            // 1 figura (rectángulo)
        dibujarEstrellasProfundas(ctx, 300);  // 300 figuras (círculos)
        dibujarConstelaciones(ctx);          // ~50 figuras (puntos/líneas)
        dibujarGalaxiaEspiral(ctx, 400, 80); // ~20 figuras (arcos/círculos)
        dibujarLunaDetallada(ctx, 250, 200, 150); // >150 figuras (>30 cráteres layered)
        dibujarNubesLayered(ctx);            // ~30 figuras (círculos layered)
        dibujarPaisajeDetallado(ctx);        // >100 figuras (casa, árbol, flores, búho)
        dibujarEstrellaFugaz(ctx);           // 5 figuras (líneas/círculo)
        // Total estimado: >650 figuras básicas generadas
    }

    // --- FUNCIONES DEL CIELO ---

    function dibujarCieloProfundo(ctx) {
        let degradado = ctx.createRadialGradient(250, 200, 10, 250, 200, 400);
        degradado.addColorStop(0, "#10104F"); // MidnightBlue oscuro
        degradado.addColorStop(1, "#000010"); // Negro-azul

        ctx.fillStyle = degradado;
        ctx.fillRect(0, 0, 500, 400);
    }

    function dibujarEstrellasProfundas(ctx, cantidad) {
        ctx.fillStyle = "#FFFFFF";
        for (let i = 0; i < cantidad; i++) {
            let x = Math.random() * 500;
            let y = Math.random() * 400;
            let radio = Math.random() * 1.5;
            ctx.beginPath();
            ctx.arc(x, y, radio, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function dibujarConstelaciones(ctx) {
        ctx.strokeStyle = "rgba(200, 200, 255, 0.3)";
        ctx.lineWidth = 1;
        // Definición de puntos de constelación
        const constelacion1 = [[50,50],[80,70],[110,60],[140,80],[170,70]];
        constelacion1.forEach((p, i) => {
            if (i > 0) {
                ctx.beginPath();
                ctx.moveTo(constelacion1[i-1][0],constelacion1[i-1][1]);
                ctx.lineTo(p[0],p[1]);
                ctx.stroke();
            }
            ctx.fillStyle = "rgba(200, 200, 255, 0.8)";
            ctx.beginPath();
            ctx.arc(p[0],p[1], 2, 0, Math.PI * 2);
            ctx.fill();
        });
        // Repetimos para una segunda constelación (más puntos)
        const constelacion2 = [[350,300],[380,310],[410,300],[440,310],[470,300],[360,280],[460,280]];
        constelacion2.forEach((p, i) => {
            if (i > 0 && i < 5) {
                ctx.beginPath();
                ctx.moveTo(constelacion2[i-1][0],constelacion2[i-1][1]);
                ctx.lineTo(p[0],p[1]); ctx.stroke();
            }
            if(i==5) {
                ctx.beginPath(); ctx.moveTo(constelacion2[0][0],constelacion2[0][1]);
                ctx.lineTo(constelacion2[5][0],constelacion2[5][1]); ctx.stroke();
            }
            if(i==6) {
                ctx.beginPath(); ctx.moveTo(constelacion2[4][0],constelacion2[4][1]);
                ctx.lineTo(constelacion2[6][0],constelacion2[6][1]); ctx.stroke();
            }
            ctx.fillStyle = "rgba(200, 200, 255, 0.8)";
            ctx.beginPath(); ctx.arc(p[0],p[1], 2, 0, Math.PI * 2); ctx.fill();
        });
    }

    function dibujarGalaxiaEspiral(ctx, x, y) {
        ctx.strokeStyle = "rgba(180, 180, 255, 0.3)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
            let radioInner = 5 + i * 5;
            let radioOuter = 10 + i * 8;
            ctx.beginPath();
            ctx.arc(x, y, radioInner, Math.PI, Math.PI * 2 + Math.PI / 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x + i*2, y - i*2, radioOuter, 0, Math.PI * 2 + Math.PI / 4);
            ctx.stroke();
        }
        ctx.fillStyle = "rgba(180, 180, 255, 0.6)";
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
    }

    // --- FUNCIONES DE LA LUNA DETALLADA ---

    function dibujarLunaDetallada(ctx, x, y, radio) {
        // Base de la luna
        ctx.fillStyle = "#E0E0E0"; // Gris claro
        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2);
        ctx.fill();

        // 2. Generar cráteres (cada cráter es complejo)
        // Definimos la posición y tamaño de los 35 cráteres
        const cratereData = [
            {cx: x - 60, cy: y - 50, cr: 30}, {cx: x + 70, cy: y - 40, cr: 25},
            {cx: x - 20, cy: y + 20, cr: 40}, {cx: x + 80, cy: y + 80, cr: 15},
            {cx: x - 90, cy: y + 90, cr: 20}, {cx: x + 120, cy: y - 100, cr: 10},
            {cx: x - 130, cy: y - 120, cr: 12}, {cx: x + 10, cy: y + 130, cr: 18},
            {cx: x - 200, cy: y - 50, cr: 8}, {cx: x + 200, cy: y - 50, cr: 8},
            // Añadimos 25 cráteres más pequeños de forma aleatoria dentro de la luna
            ...Array.from({length: 25}, () => {
                let angulo = Math.random() * Math.PI * 2;
                let dist = Math.random() * (radio * 0.9);
                return {
                    cx: x + Math.cos(angulo) * dist,
                    cy: y + Math.sin(angulo) * dist,
                    cr: 3 + Math.random() * 6
                }
            })
        ];

        // Función auxiliar para dibujar UN cráter complejo (usa 3 figuras layered)
        function dibujarCraterComplejo(ctx, cx, cy, cr) {
            // Sombra del cráter (elipse exterior oscura - figura 1)
            ctx.fillStyle = "rgba(100, 100, 100, 0.6)"; // Gris oscuro transparente
            ctx.beginPath();
            ctx.arc(cx, cy, cr, 0, Math.PI * 2);
            ctx.fill();

            // Fondo del cráter (elipse central más oscura - figura 2)
            ctx.fillStyle = "rgba(60, 60, 60, 0.7)";
            ctx.beginPath();
            ctx.arc(cx, cy, cr * 0.8, 0, Math.PI * 2);
            ctx.fill();

            // Borde de luz (elipse interior para dar relieve - figura 3)
            ctx.strokeStyle = "rgba(200, 200, 200, 0.4)"; // Gris claro transparente
            ctx.lineWidth = 2;
            ctx.beginPath();
            // Desplazamos un poco el borde de luz para dar efecto 3D
            ctx.arc(cx - 3, cy - 3, cr * 0.7, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Iterar sobre los datos para dibujar los 35 cráteres complejos (105 figuras en total)
        cratereData.forEach(c => {
            dibujarCraterComplejo(ctx, c.cx, c.cy, c.cr);
        });

        // Mares lunares (irregular polygons)
        ctx.fillStyle = "rgba(50, 50, 70, 0.6)"; // Gris oscuro azulado
        const maria = [
            [[180,100],[240,120],[260,160],[230,190],[190,180],[170,140]],
            [[300,110],[350,130],[360,170],[330,190],[290,180]],
            [[150,180],[190,190],[210,240],[190,280],[160,290],[140,250]],
            [[340,190],[380,200],[390,240],[370,260],[330,250]],
            [[180,140],[200,150],[190,170],[170,160]],
            [[310,140],[330,150],[320,170],[300,160]],
            [[160,220],[180,230],[170,250],[150,240]],
            [[360,220],[380,230],[370,250],[350,240]]
        ];
        maria.forEach(pts => {
            ctx.beginPath();
            ctx.moveTo(pts[0][0], pts[0][1]);
            pts.slice(1).forEach(p => ctx.lineTo(p[0],p[1]));
            ctx.closePath(); ctx.fill();
        });
    }

    // --- FUNCIONES DEL PAISAJE DETALLADO ---

    function dibujarNubesLayered(ctx) {
        ctx.fillStyle = "rgba(220, 220, 220, 0.6)"; // Gris claro transparente
        dibujarNubeLayeredIndividual(ctx, 100, 80);
        dibujarNubeLayeredIndividual(ctx, 350, 120);
        dibujarNubeLayeredIndividual(ctx, 420, 160);
    }

    function dibujarNubeLayeredIndividual(ctx, x, y) {
        // Cada nube se formará por layered círculos (9 figuras por nube)
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = `rgba(220, 220, 220, ${0.6 + i * 0.15})`;
            ctx.beginPath();
            ctx.arc(x + i*15, y, 20, 0, Math.PI * 2);
            ctx.arc(x + 20 + i*15, y - 10, 25, 0, Math.PI * 2);
            ctx.arc(x + 40 + i*15, y, 20, 0, Math.PI * 2);
            ctx.arc(x + 20 + i*15, y + 10, 20, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function dibujarPaisajeDetallado(ctx) {
        // Hierba nocturna
        ctx.fillStyle = "#103010"; // Verde noche muy oscuro
        ctx.fillRect(0, 300, 500, 100);
        // Pequeñas flores nocturnas geométricas (>50 figuras)
        for(let i=0; i<60; i++) {
            let x = Math.random()*500;
            let y = 310 + Math.random()*90;
            ctx.fillStyle = "#C0C0FF"; // Azul claro transparente
            ctx.beginPath(); ctx.ellipse(x,y,2,1,0,0,Math.PI); ctx.fill(); // Crescent
            ctx.strokeStyle = "#C0C0FF"; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+3); ctx.stroke(); // Stem
        }

        // Casa nocturna
        ctx.fillStyle = "#404040"; // Gris oscuro
        ctx.fillRect(50, 180, 140, 120);
        ctx.fillStyle = "#A03010"; // Rojo-marrón nocturno
        ctx.beginPath(); ctx.moveTo(30, 180); ctx.lineTo(120, 100); ctx.lineTo(210, 180); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#101030"; // Azul noche muy oscuro (ventanas)
        ctx.fillRect(60, 200, 30, 30); ctx.fillRect(150, 200, 30, 30);
        ctx.strokeStyle = "#000"; ctx.lineWidth = 2;
        ctx.strokeRect(60, 200, 30, 30); ctx.strokeRect(150, 200, 30, 30);
        ctx.fillStyle = "#603010"; // Marrón nocturno (puerta)
        ctx.fillRect(100, 240, 40, 60);
        ctx.fillStyle = "#D0D000"; // Perilla
        ctx.beginPath(); ctx.arc(132, 275, 4, 0, Math.PI * 2); ctx.fill();

        // Búho geométrico en el techo (>8 figuras)
        dibujarBuhoGeometrico(ctx, 120, 95);

        // Árbol nocturno
        ctx.fillStyle = "#301010"; // Marrón noche muy oscuro
        ctx.fillRect(350, 200, 30, 100);
        ctx.fillStyle = "#104010"; // Verde noche oscuro
        for (let i = 0; i < 15; i++) {
            let cx = 330 + Math.random() * 70;
            let cy = 150 + Math.random() * 80;
            ctx.beginPath(); ctx.arc(cx, cy, 25, 0, Math.PI * 2); ctx.fill();
        }

        // Valla detailed nocturna
        ctx.fillStyle = "#502010"; // Marrón noche oscuro
        for(let i = 0; i < 20; i++) {
            ctx.fillRect(200 + (i * 15), 260, 6, 50);
        }
        ctx.fillRect(195, 270, 310, 5); ctx.fillRect(195, 290, 310, 5);
    }

    function dibujarBuhoGeometrico(ctx, x, y) {
        // 8 figuras layered
        ctx.fillStyle = "#606060"; // Gris
        ctx.beginPath(); ctx.ellipse(x, y, 15, 20, 0, 0, Math.PI * 2); ctx.fill(); // Body
        ctx.fillStyle = "#D0D0FF"; // Azul claro (ojos)
        ctx.beginPath(); ctx.arc(x - 6, y - 5, 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 6, y - 5, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#000"; // Pupilas
        ctx.beginPath(); ctx.arc(x - 6, y - 5, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 6, y - 5, 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#FFA000"; // Pico
        ctx.beginPath(); ctx.moveTo(x,y+3); ctx.lineTo(x-3,y+7); ctx.lineTo(x+3,y+7); ctx.closePath(); ctx.fill();
        // Cejas (triángulos layered)
        ctx.fillStyle = "#303030";
        ctx.beginPath(); ctx.moveTo(x-12,y-10); ctx.lineTo(x-3,y-7); ctx.lineTo(x-8,y-15); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(x+12,y-10); ctx.lineTo(x+3,y-7); ctx.lineTo(x+8,y-15); ctx.closePath(); ctx.fill();
    }

    function dibujarEstrellaFugaz(ctx) {
        ctx.fillStyle = "#FFFFE0";
        ctx.beginPath(); ctx.arc(50, 50, 4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#FFFFE0"; ctx.lineWidth = 1.5;
        // 4 líneas layered
        ctx.beginPath(); ctx.moveTo(50,50); ctx.lineTo(100,40); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(50,50); ctx.lineTo(95,55); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(50,50); ctx.lineTo(90,45); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(50,50); ctx.lineTo(105,50); ctx.stroke();
    }

    // Ejecutar el dibujo extremo
    dibujarEscenaNocturnaExtrema();
});