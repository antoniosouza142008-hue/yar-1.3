// Mapa SVG do Maranhão com divisão regional interativa.
// Estrutura: um contorno do estado + polígonos regionais recortados (clipPath)
// para manter as regiões dentro do perímetro estadual.

const maranhaoMap = {
    viewBox: '0 0 520 720',

    // Contorno vetorial simplificado inspirado na silhueta real do Maranhão.
    statePath: `
        M120,40
        L210,28 L285,38 L345,60 L395,110 L430,175 L446,242 L440,318 L420,378
        L430,450 L408,510 L382,558 L372,612 L330,656 L280,684 L225,678 L188,640
        L168,596 L148,548 L132,500 L102,458 L86,408 L66,360 L56,314 L62,268
        L76,224 L90,180 L102,146 L106,108 Z
    `,

    regions: [
        {
            id: 'norte',
            name: 'Norte / Litoral',
            polygon: '106,108 120,40 210,28 285,38 345,60 395,110 430,175 364,200 286,186 210,170 142,155',
            labelPos: { x: 255, y: 120 }
        },
        {
            id: 'oeste',
            name: 'Oeste',
            polygon: '62,268 76,224 90,180 102,146 142,155 210,170 202,240 185,315 165,390 132,500 102,458 86,408 66,360 56,314',
            labelPos: { x: 132, y: 300 }
        },
        {
            id: 'centro',
            name: 'Centro',
            polygon: '202,240 286,186 364,200 380,260 366,330 330,386 288,432 230,448 180,430 165,390 185,315',
            labelPos: { x: 274, y: 320 }
        },
        {
            id: 'leste',
            name: 'Leste',
            polygon: '364,200 430,175 446,242 440,318 420,378 430,450 374,456 330,386 366,330 380,260',
            labelPos: { x: 404, y: 312 }
        },
        {
            id: 'sul',
            name: 'Sul',
            polygon: '180,430 230,448 288,432 374,456 408,510 382,558 372,612 330,656 280,684 225,678 188,640 168,596 148,548 132,500 165,390',
            labelPos: { x: 262, y: 560 }
        }
    ]
};

function injectMap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const regionLayers = maranhaoMap.regions.map(reg => `
        <g class="region-group" data-region="${reg.id}">
            <polygon
                points="${reg.polygon}"
                class="region-path"
                data-region="${reg.id}"
                clip-path="url(#ma-clip)"
            ></polygon>
            <text
                x="${reg.labelPos.x}"
                y="${reg.labelPos.y}"
                class="region-label"
            >${reg.name.split(' ')[0]}</text>
        </g>
    `).join('');

    container.innerHTML = `
        <svg viewBox="${maranhaoMap.viewBox}" class="map-ma-svg" id="mapaMA" aria-label="Mapa do Maranhão por regiões">
            <defs>
                <clipPath id="ma-clip">
                    <path d="${maranhaoMap.statePath}"></path>
                </clipPath>
            </defs>

            <rect x="0" y="0" width="520" height="720" fill="rgba(147, 197, 253, 0.18)"></rect>

            <path
                d="${maranhaoMap.statePath}"
                class="state-base"
                fill="rgba(15, 118, 110, 0.16)"
                stroke="rgba(255,255,255,0.35)"
                stroke-width="1.6"
            ></path>

            ${regionLayers}

            <path
                d="${maranhaoMap.statePath}"
                class="state-border"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                stroke-width="2.2"
            ></path>
        </svg>
    `;
}

/**
 * Destaca uma região específica no mapa
 * @param {string} regionId - ID da região (norte, oeste, centro, leste, sul)
 */
function highlightRegion(regionId) {
    const paths = document.querySelectorAll('.region-path');
    paths.forEach((p) => {
        if (p.getAttribute('data-region') === regionId) {
            p.classList.add('active');
            p.style.filter = 'drop-shadow(0 0 20px var(--accent-glow))';
            p.style.opacity = '1';
        } else {
            p.classList.remove('active');
            p.style.opacity = '0.32';
            p.style.filter = 'none';
        }
    });
}
