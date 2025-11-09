// =======================================================
// MAPA DE TIERS (Para nombres completos)
// =======================================================
const tierNames = {
    'HT1': 'High Tier 1', 'LT1': 'Low Tier 1',
    'HT2': 'High Tier 2', 'LT2': 'Low Tier 2',
    'HT3': 'High Tier 3', 'LT3': 'Low Tier 3',
    'HT4': 'High Tier 4', 'LT4': 'Low Tier 4',
    'HT5': 'High Tier 5', 'LT5': 'Low Tier 5'
};

// =======================================================
// DATOS DEL JUEGO
// =======================================================
function getAvatarUrl(playerName) {
    return `https://avatar.vercel.sh/${playerName}.png?size=40`; 
}

const leaderboardData = [
    { rank: 1, name: 'KillerPro', title: 'Combat Grandmaster (405 points)', region: 'NA', tier: 'HT1' },
    { rank: 2, name: 'ItzRealMe', title: 'Combat Master (330 points)', region: 'NA', tier: 'LT1' },
    { rank: 3, name: 'Swight', title: 'Combat Master (270 points)', region: 'NA', tier: 'HT2' },
    { rank: 4, name: 'coldified', title: 'Combat Ace (246 points)', region: 'EU', tier: 'LT2' },
    { rank: 5, name: 'Kylaz', title: 'Combat Ace (222 points)', region: 'NA', tier: 'HT3' },
    { rank: 6, name: 'BlvckWlf', title: 'Combat Ace (206 points)', region: 'EU', tier: 'LT3' },
    { rank: 7, name: 'Mystic', title: 'Combat Ace (13 points)', region: 'BR', tier: 'HT5' },
    { rank: 8, name: 'BladeLord', title: 'Combat Veteran (90 points)', region: 'EU', tier: 'LT4' },
    { rank: 9, name: 'ShadowPVP', title: 'Warrior (50 points)', region: 'AS', tier: 'HT5' },
    { rank: 10, name: 'ProGamerX', title: 'Newbie (10 points)', region: 'NA', tier: 'LT5' }
];

// =======================================================
// FUNCIÓN PRINCIPAL DE RENDERIZADO DE LA TABLA
// =======================================================
function renderLeaderboard(data = leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; 

    data.forEach((player) => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // 1. Columna # (Placa de Ranking)
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank-placa');
        
        // Aplica la clase 'top-player' para el brillo si está en el top 3
        if (player.rank <= 3) {
            rankCol.classList.add('top-player'); 
        }
        
        rankCol.innerHTML = `
            <div class="rank-placa rank-${player.rank}">
                <span class="rank-number">${player.rank}.</span>
            </div>
        `;
        row.appendChild(rankCol);

        // 2. Columna JUGADOR
        const playerCol = document.createElement('div');
        playerCol.classList.add('col-player');
        playerCol.innerHTML = `
            <div class="player-details">
                <img src="${getAvatarUrl(player.name)}" alt="${player.name} avatar">
                <div class="player-info">
                    <span class="player-name">${player.name}</span>
                    <span class="player-title">${player.title}</span>
                </div>
            </div>
        `;
        row.appendChild(playerCol);
        
        // 3. Columna REGIÓN (Píldora Centrada y al Final)
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region');
        regionCol.innerHTML = `<span class="region-pill region-${player.region}">${player.region}</span>`;
        row.appendChild(regionCol);

        // 4. Columna TIERS (Con nombre completo y al Final)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');
        const tierPill = document.createElement('span');
        tierPill.classList.add('tier-pill');
        tierPill.textContent = tierNames[player.tier] || player.tier; 
        tiersCol.appendChild(tierPill);
        row.appendChild(tiersCol);

        leaderboardBody.appendChild(row);
    });
}

// =======================================================
// FUNCIÓN PARA RENDERIZAR LA LISTA DE TIERS (NUEVA)
// =======================================================
function renderTiersDisplay() {
    const ranksDisplay = document.getElementById('ranks-display');
    ranksDisplay.innerHTML = ''; // Limpiar contenido anterior

    // Obtener todos los tiers únicos y ordenarlos
    const uniqueTiers = Array.from(new Set(Object.values(tierNames))).sort((a, b) => {
        // Ordenar High Tier 1, Low Tier 1, High Tier 2, etc.
        const numA = parseInt(a.match(/\d+/)[0]);
        const typeA = a.includes('High') ? 0 : 1; // High antes que Low
        const numB = parseInt(b.match(/\d+/)[0]);
        const typeB = b.includes('High') ? 0 : 1;

        if (numA !== numB) return numA - numB;
        return typeA - typeB;
    });

    uniqueTiers.forEach(tier => {
        const tierElement = document.createElement('div');
        tierElement.classList.add('tier-full-name');
        tierElement.textContent = tier;
        ranksDisplay.appendChild(tierElement);
    });
}

// =======================================================
// LÓGICA DE BÚSQUEDA Y FILTROS
// =======================================================
const searchInput = document.getElementById('player-search');
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const leaderboardDisplay = document.getElementById('leaderboard-display');
    const ranksDisplay = document.getElementById('ranks-display');

    // Solo filtrar si la tabla está visible
    if (!leaderboardDisplay.classList.contains('hidden')) {
        const filteredData = leaderboardData.filter(player => 
            player.name.toLowerCase().includes(searchTerm) ||
            player.title.toLowerCase().includes(searchTerm) ||
            player.region.toLowerCase().includes(searchTerm) ||
            (tierNames[player.tier] && tierNames[player.tier].toLowerCase().includes(searchTerm))
        );
        renderLeaderboard(filteredData);
    }
});


const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const leaderboardDisplay = document.getElementById('leaderboard-display');
        const ranksDisplay = document.getElementById('ranks-display');
        
        // Remover 'active' de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir 'active' al botón clickeado
        button.classList.add('active');

        const filterType = button.dataset.filter;
        
        if (filterType === 'ranks') {
            // OCULTAR TABLA, MOSTRAR CUADRADO DE TIERS
            leaderboardDisplay.classList.add('hidden');
            ranksDisplay.classList.remove('hidden');
            renderTiersDisplay(); // Generar los tiers en el nuevo contenedor
        } else {
            // MOSTRAR TABLA, OCULTAR CUADRADO DE TIERS
            leaderboardDisplay.classList.remove('hidden');
            ranksDisplay.classList.add('hidden');

            if (filterType === 'overall') {
                renderLeaderboard(leaderboardData);
            } else {
                console.log(`Filtro seleccionado: ${filterType}. (No hay datos específicos para este filtro en este ejemplo)`);
                renderLeaderboard([]); // Vacía la tabla si no es Overall
            }
        }
    });
});

// =======================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard(); // Renderizar la tabla inicial
});