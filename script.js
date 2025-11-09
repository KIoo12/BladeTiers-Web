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
// FUNCIÓN PARA OBTENER AVATAR DE ROBLOX POR NOMBRE DE USUARIO
// =======================================================
function getAvatarUrl(robloxName) {
    if (!robloxName) {
        // Fallback: avatar genérico de Roblox si el nombre no existe
        return 'https://tr.rbxcdn.com/f02e1c3144a0b27b4946777651a24d27/150/150/AvatarHeadshot/Png'; 
    }
    // URL que intenta cargar el avatar de la cabeza por nombre.
    return `https://www.roblox.com/headshot-thumbnail/image?username=${robloxName}&width=150&height=150&format=png`;
}

// =======================================================
// DATOS DEL JUEGO (Kioo en Top 1, resto reordenado)
// =======================================================
const leaderboardData = [
    // CAMBIO SOLICITADO: Kioo en Top 1 con usuario de Roblox Aitor92960O
    { rank: 1, name: 'Kioo', robloxName: 'Aitor92960O', title: 'Admin (Creator)', region: 'BR', tier: 'HT1' },

    // Datos restantes, ajustando el rank. 'KillerPro' ahora es rank 2.
    { rank: 2, name: 'KillerPro', robloxName: 'NOMBRE_DE_USUARIO_AQUI', title: 'Combat Grandmaster (405 points)', region: 'NA', tier: 'LT1' },
    { rank: 3, name: 'ItzRealMe', robloxName: 'NOMBRE_DE_USUARIO_AQUI', title: 'Combat Master (330 points)', region: 'NA', tier: 'HT2' },
    { rank: 4, name: 'Swight', robloxName: 'NOMBRE_DE_USUARIO_AQUI', title: 'Combat Master (270 points)', region: 'NA', tier: 'LT2' },
    { rank: 5, name: 'coldified', robloxName: 'NOMBRE_DE_USUARIO_AQUI', title: 'Combat Ace (246 points)', region: 'EU', tier: 'HT3' },
    { rank: 6, name: 'Kylaz', robloxName: 'NOMBRE_DE_USUARIO_AQUI', title: 'Combat Ace (222 points)', region: 'NA', tier: 'LT3' },
    { rank: 7, name: 'BlvckWlf', robloxName: 'NOMBRE_DE_USUARIO_AQUI', title: 'Combat Ace (206 points)', region: 'EU', tier: 'HT5' },
    { rank: 8, name: 'Mystic', robloxName: 'NOMBRE_DE_USUARIO_AQUI', title: 'Combat Ace (13 points)', region: 'BR', tier: 'LT5' },
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

        // 2. Columna JUGADOR (CON AVATAR DE ROBLOX)
        const playerCol = document.createElement('div');
        playerCol.classList.add('col-player');
        
        const avatarUrl = getAvatarUrl(player.robloxName); 
        
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

// =======================================================
// RESTO DE FUNCIONES (Mantenidas)
// =======================================================

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