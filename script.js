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
// FUNCIÓN PARA OBTENER AVATAR POR NOMBRE DE USUARIO (USANDO MINOTAR)
// Es la solución más estable sin IDs de Roblox.
// =======================================================
function getAvatarUrl(avatarName) {
    // Si no pones nombre, usa un skin por defecto de MC
    const name = avatarName || 'Steve'; 
    return `https://minotar.net/avatar/${name}/40.png`;
}

// =======================================================
// DATOS DEL JUEGO (AHORA CON avatarName)
// ⚠️ Usa el nombre de usuario del avatar que quieras mostrar.
// =======================================================
const leaderboardData = [
    { rank: 1, name: 'Kioo', avatarName: 'Aitor92960O', title: 'Combat Grandmaster (405 points)', region: 'NA', tier: 'HT1' },
    { rank: 2, name: 'ItzRealMe', avatarName: 'ItzRealMe', title: 'Combat Master (330 points)', region: 'NA', tier: 'LT1' },
    { rank: 3, name: 'Swight', avatarName: 'Swight', title: 'Combat Master (270 points)', region: 'NA', tier: 'HT2' },
    { rank: 4, name: 'coldified', avatarName: 'coldified', title: 'Combat Ace (246 points)', region: 'EU', tier: 'LT2' },
    { rank: 5, name: 'Kylaz', avatarName: 'Kylaz', title: 'Combat Ace (222 points)', region: 'NA', tier: 'HT3' },
    { rank: 6, name: 'BlvckWlf', avatarName: 'BlvckWlf', title: 'Combat Ace (206 points)', region: 'EU', tier: 'LT3' },
    // Si 'Kioo' tiene un nombre de usuario de MC/Roblox que funciona en Minotar, ponlo aquí
    { rank: 7, name: 'Kioo', avatarName: 'Kioo12', title: 'Admin (Creator)', region: 'BR', tier: 'HT5' },
    { rank: 8, name: 'Mystic', avatarName: 'Mystic', title: 'Combat Ace (13 points)', region: 'BR', tier: 'LT5' },
];

// =======================================================
// FUNCIÓN PRINCIPAL DE RENDERIZADO
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
        
        rankCol.innerHTML = `
            <div class="rank-placa rank-${player.rank}">
                <span class="rank-number">${player.rank}.</span>
            </div>
        `;
        row.appendChild(rankCol);

        // 2. Columna JUGADOR (CON AVATAR POR NOMBRE)
        const playerCol = document.createElement('div');
        playerCol.classList.add('col-player');
        
        const avatarUrl = getAvatarUrl(player.avatarName);
        
        playerCol.innerHTML = `
            <div class="player-details">
                <img class="player-avatar-image" src="${avatarUrl}" alt="${player.name} avatar">
                <div class="player-info">
                    <span class="player-name">${player.name}</span>
                    <span class="player-title">${player.title}</span>
                </div>
            </div>
        `;
        row.appendChild(playerCol);
        
        // 3. Columna REGIÓN
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region');
        regionCol.innerHTML = `<span class="region-pill region-${player.region}">${player.region}</span>`;
        row.appendChild(regionCol);
        
        // 4. Columna TIER (Nombre Completo)
        const tierCol = document.createElement('div');
        tierCol.classList.add('col-tier'); 
        const tierFullName = tierNames[player.tier] || player.tier;
        tierCol.textContent = tierFullName;
       
        row.appendChild(tierCol);
        leaderboardBody.appendChild(row);
    });
}

// ... (El resto de funciones de tiers y filtros se mantienen) ...

function renderTiersDisplay() {
    const ranksDisplay = document.getElementById('ranks-display');
    ranksDisplay.innerHTML = ''; 

    Object.values(tierNames).forEach(tier => {
        const tierElement = document.createElement('div');
        tierElement.classList.add('tier-full-name');
        tierElement.textContent = tier;
        ranksDisplay.appendChild(tierElement);
    });
}

const searchInput = document.getElementById('player-search');
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const leaderboardDisplay = document.getElementById('leaderboard-display');
    const ranksDisplay = document.getElementById('ranks-display');

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
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterType = button.dataset.filter;
        
        if (filterType === 'ranks') {
            leaderboardDisplay.classList.add('hidden');
            ranksDisplay.classList.remove('hidden');
            renderTiersDisplay(); 
        } else {
            leaderboardDisplay.classList.remove('hidden');
            ranksDisplay.classList.add('hidden');

            if (filterType === 'overall') {
                renderLeaderboard(leaderboardData);
            } else {
                console.log(`Filtro seleccionado: ${filterType}.`);
                renderLeaderboard([]); 
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard(); 
});