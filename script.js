// =======================================================
// DATOS DEL JUEGO (UN SOLO TIER POR JUGADOR)
// =======================================================

function getAvatarUrl(playerName) {
    // URL simulada de avatar. Debes reemplazarla con tu propio servicio.
    return `https://avatar.vercel.sh/${playerName}.png`; 
}

const leaderboardData = [
    // El campo 'tier' contiene un único valor (ej: 'HT1', 'LT3')
    { rank: 1, name: 'KillerPro', title: 'Combat Grandmaster (405 points)', region: 'NA', tier: 'HT1' },
    { rank: 2, name: 'ItzRealMe', title: 'Combat Master (330 points)', region: 'NA', tier: 'LT1' },
    { rank: 3, name: 'Swight', title: 'Combat Master (270 points)', region: 'NA', tier: 'HT2' },
    { rank: 4, name: 'coldified', title: 'Combat Ace (246 points)', region: 'EU', tier: 'LT2' },
    { rank: 5, name: 'Kylaz', title: 'Combat Ace (222 points)', region: 'NA', tier: 'HT3' },
    { rank: 6, name: 'BlvckWlf', title: 'Combat Ace (206 points)', region: 'EU', tier: 'LT3' },
    { rank: 7, name: 'Mystic', title: 'Combat Ace (13 points)', region: 'BR', tier: 'HT5' }
];

// =======================================================
// FUNCIÓN PRINCIPAL DE RENDERIZADO
// =======================================================

function renderLeaderboard(data = leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Limpiar la tabla

    data.forEach((player) => { 
        const row = document.createElement('div');
        row.classList.add('player-row');

        // 1. Columna del Ranking (La Placa)
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank-placa');
        
        // Aplica la clase para el brillo y color
        if (player.rank <= 3) {
            rankCol.classList.add('top-player'); 
        }
        
        rankCol.innerHTML = `
            <div class="rank-placa rank-${player.rank}">
                <span class="rank-number">${player.rank}.</span>
            </div>
        `;

        // 2. Columna del Jugador y Título
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
        
        // 3. Columna de la Región (Centrada)
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region'); // Solo col-region aquí, el centrado está en el CSS
        regionCol.innerHTML = `<span class="region-${player.region}">${player.region}</span>`;
        
        // 4. Columna del Tier (UN SOLO TIER)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');

        const statPill = document.createElement('span');
        statPill.classList.add('tier-icon', 'stat-box');
        statPill.textContent = player.tier; // USANDO EL CAMPO 'tier'
        tiersCol.appendChild(statPill);
        
        // ORDEN FINAL DE LAS COLUMNAS
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

const searchInput = document.getElementById('player-search');
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredData = leaderboardData.filter(player => 
        player.name.toLowerCase().includes(searchTerm)
    );

    renderLeaderboard(filteredData);
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
});