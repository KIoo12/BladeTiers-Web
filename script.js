// =======================================================
// DATOS DEL JUEGO (CORREGIDO: UN SOLO TIER POR JUGADOR)
// =======================================================

function getAvatarUrl(playerName) {
    // URL simulada de avatar. Se puede cambiar o modificar.
    return `https://avatar.vercel.sh/${playerName}.png`; 
}

// --- DATOS DE LA CLASIFICACIÓN (CON UN SOLO TIER) ---
const leaderboardData = [
    // El campo 'stats' ahora solo contiene un string (el Tier principal)
    { rank: 1, name: 'KillerPro', title: 'Combat Grandmaster (405 points)', region: 'NA', tier: 'HT1' },
    { rank: 2, name: 'ItzRealMe', title: 'Combat Master (330 points)', region: 'NA', tier: 'LT1' },
    { rank: 3, name: 'Swight', title: 'Combat Master (270 points)', region: 'NA', tier: 'HT2' },
    { rank: 4, name: 'coldified', title: 'Combat Ace (246 points)', region: 'EU', tier: 'LT2' },
    { rank: 5, name: 'Kylaz', title: 'Combat Ace (222 points)', region: 'NA', tier: 'HT3' },
    { rank: 6, name: 'BlvckWlf', title: 'Combat Ace (206 points)', region: 'EU', tier: 'LT3' },
    { rank: 7, name: 'Mystic', title: 'Combat Ace (13 points)', region: 'BR', tier: 'HT5' }
];

// =======================================================
// FUNCIÓN PRINCIPAL DE RENDERIZADO (CORREGIDA)
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

        // 4. CREACIÓN: Columna del Tier (UN SOLO TIER)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');

        // Crear solo una píldora con el Tier
        const statPill = document.createElement('span');
        statPill.classList.add('tier-icon', 'stat-box');
        statPill.textContent = player.tier; // Usamos el nuevo campo 'tier'
        tiersCol.appendChild(statPill);
        
        // =======================================================
        // AÑADIR LAS COLUMNAS EN EL ORDEN FINAL: #, JUGADOR, REGIÓN, TIERS
        // =======================================================

        row.appendChild(rankCol);
        row.appendChild(playerCol);
        row.appendChild(regionCol); 
        row.appendChild(tiersCol); 

        leaderboardBody.appendChild(row);
    }); 
} 


// =======================================================
// LÓGICA DE BUSQUEDA E INICIALIZACIÓN
// =======================================================

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

// Inicialización: Asegúrate de que la función se llama al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
});