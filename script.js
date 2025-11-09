// =======================================================
// DATOS DEL JUEGO
// =======================================================

function getAvatarUrl(playerName) {
    // URL simulada de avatar. Debes reemplazarla con tu propio servicio.
    return `https://avatar.vercel.sh/${playerName}.png`; 
}

// --- DATOS DE LA CLASIFICACIÓN (CON NUEVOS TIERS) ---
const leaderboardData = [
    { rank: 1, name: 'KillerPro', title: 'Combat Grandmaster (405 points)', region: 'NA', stats: ['HT1', 'LT1', 'HT2', 'LT2'] },
    { rank: 2, name: 'ItzRealMe', title: 'Combat Master (330 points)', region: 'NA', stats: ['HT1', 'HT1', 'HT3', 'LT3'] },
    { rank: 3, name: 'Swight', title: 'Combat Master (270 points)', region: 'NA', stats: ['HT2', 'LT2', 'LT3', 'HT1'] },
    { rank: 4, name: 'coldified', title: 'Combat Ace (246 points)', region: 'EU', stats: ['LT2', 'LT3', 'HT4', 'LT4'] },
    { rank: 5, name: 'Kylaz', title: 'Combat Ace (222 points)', region: 'NA', stats: ['HT3', 'LT3', 'HT5', 'LT5'] },
    { rank: 6, name: 'BlvckWlf', title: 'Combat Ace (206 points)', region: 'EU', stats: ['LT3', 'HT4', 'LT4', 'HT5'] },
    { rank: 7, name: 'Mystic', title: 'Combat Ace (13 points)', region: 'BR', stats: ['HT5', 'LT5', 'HT5', 'LT5'] }
];

// Lista de todos los Tiers para el sidebar
const allTiers = [
    'HT1', 'LT1', 
    'HT2', 'LT2', 
    'HT3', 'LT3', 
    'HT4', 'LT4', 
    'HT5', 'LT5'
];


// =======================================================
// FUNCIÓN PRINCIPAL DE RENDERIZADO
// =======================================================

function renderLeaderboard(data = leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Limpiar la tabla

    data.forEach((player, index) => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // 1. CREACIÓN: Columna del Ranking (La Placa)
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank-placa');
        
        // Aplicar la clase 'top-player' SOLO al contenedor de la placa para el brillo
        if (player.rank <= 3) {
            rankCol.classList.add('top-player'); 
        }
        
        // Contenido interno de la placa (con el punto al final)
        rankCol.innerHTML = `
            <div class="rank-placa rank-${player.rank}">
                <span class="rank-number">${player.rank}.</span>
            </div>
        `;

        // 2. CREACIÓN: Columna del Jugador y Título
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
        
        // 3. CREACIÓN: Columna de la Región
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region');
        regionCol.classList.add(`region-${player.region}`); 
        regionCol.textContent = player.region;

        // 4. CREACIÓN: Columna de las Estadísticas (Tiers/Píldoras)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');

        player.stats.forEach(stat => {
            const statPill = document.createElement('span');
            statPill.classList.add('tier-icon', 'stat-box');
            statPill.textContent = stat; // Texto HT/LT
            tiersCol.appendChild(statPill);
        });
        
        // =======================================================
        // AÑADIR LAS COLUMNAS EN EL ORDEN FINAL: #, JUGADOR, REGIÓN, TIERS
        // =======================================================

        row.appendChild(rankCol);
        row.appendChild(playerCol);
        row.appendChild(regionCol); // Región va antes de Tiers
        row.appendChild(tiersCol); 

        leaderboardBody.appendChild(row);
    }); // Cierra el bucle forEach
} // Cierra la función renderLeaderboard


// =======================================================
// LÓGICA DE RANKINGS Y BUSQUEDA
// =======================================================

function renderTierList() {
    const container = document.getElementById('tier-list-container');
    container.innerHTML = ''; // Limpiar

    allTiers.forEach(tier => {
        const tierItem = document.createElement('div');
        tierItem.classList.add('tier-item');
        
        const tierLabel = document.createElement('span');
        tierLabel.classList.add('tier-label');
        
        // Separar High/Low del número (ej: HT1 -> T1)
        const tierNumber = tier.substring(tier.length - 1); // 1, 2, 3, etc.
        const tierPrefix = tier.substring(0, tier.length - 1); // HT o LT
        
        tierLabel.textContent = `Tier ${tierNumber}`;
        
        const tierValue = document.createElement('span');
        tierValue.textContent = tierPrefix;

        tierItem.appendChild(tierLabel);
        tierItem.appendChild(tierValue);
        container.appendChild(tierItem);
    });
}


// Lógica de Búsqueda
const searchInput = document.getElementById('player-search');
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filtrar los datos
    const filteredData = leaderboardData.filter(player => 
        player.name.toLowerCase().includes(searchTerm)
    );

    // Renderizar con los datos filtrados
    renderLeaderboard(filteredData);
});

// Inicialización: Asegúrate de que las funciones se llamen al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    renderTierList(); // Llama a la función para dibujar el cuadro de Tiers
});