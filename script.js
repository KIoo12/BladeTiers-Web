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
// FUNCIÓN PARA OBTENER AVATAR (Simplificada y corregida)
// =======================================================
// Esta función ahora solo devuelve la URL con el nombre de usuario
function getAvatarUrl(playerName) {
    // Usamos la API de Roblox que carga el avatar por nombre de usuario.
    // Esto es un 'workaround' (solución temporal) ya que la API no oficial de
    // búsqueda por nombre puede fallar. Si el nombre no existe, devolverá un avatar de error.
    return `https://www.roblox.com/headshot-thumbnail/image?username=${playerName}&width=420&height=420&format=png`;
}

// =======================================================
// DATOS DEL JUEGO (USANDO USERNAME)
// =======================================================
// He añadido el campo 'stats' para las estadísticas clave.
const leaderboardData = [
    { rank: 1, name: 'Kioo', robloxName: 'Aitor92960O', title: 'Combat Grandmaster (405 points)', region: 'NA', tier: 'HT1', stats: ['450 Wins', '1300 KOs', 'DMG:55K'] },
    { rank: 2, name: 'RobloxChamp', robloxName: 'RobloxChamp', title: 'Pro Player (1150 KOs)', region: 'EU', tier: 'LT1', stats: ['350 Wins', '1150 KOs', 'DMG:45K'] },
    { rank: 3, name: 'BlockBlade', robloxName: 'BlockBlade', title: 'Ace Defender (980 KOs)', region: 'AS', tier: 'HT2', stats: ['300 Wins', '980 KOs', 'DMG:40K'] },
    { rank: 4, name: 'TheBaller', robloxName: 'TheBaller', title: 'Rising Star (850 KOs)', region: 'NA', tier: 'LT2', stats: ['250 Wins', '850 KOs', 'DMG:39K'] },
    { rank: 5, name: 'NoScopePro', robloxName: 'NoScopePro', title: 'Newbie (500 KOs)', region: 'EU', tier: 'HT3', stats: ['100 Wins', '500 KOs', 'DMG:20K'] },
    { rank: 6, name: 'BladeWiz', robloxName: 'BladeWiz', title: 'El Magico (480 KOs)', region: 'EU', tier: 'LT3', stats: ['80 Wins', '480 KOs', 'DMG:18K'] },
    { rank: 7, name: 'Mystic', robloxName: 'Mystic', title: 'noob (13 KOs)', region: 'BR', tier: 'HT5', stats: ['46 Wins', '13 KOs', 'DMG:5K'] },
    { rank: 8, name: 'Shedletsky', robloxName: 'Shedletsky', title: 'Admin (Creator)', region: 'NA', tier: 'LT5', stats: ['0 Wins', '0 KOs', 'DMG:0K'] },
];

// =======================================================
// FUNCIÓN PRINCIPAL DE RENDERIZADO DE LA TABLA
// =======================================================
async function renderLeaderboard(data = leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; 

    data.forEach((player) => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // 1. Columna # (Placa de Ranking con Avatar)
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank-placa');
        
        if (player.rank <= 3) {
            rankCol.classList.add('top-player'); 
        }
        
        // La imagen del avatar se genera usando el nombre de usuario de Roblox
        const avatarUrl = getAvatarUrl(player.robloxName); 
        
        rankCol.innerHTML = `
            <div class="rank-placa rank-${player.rank}">
                <span class="rank-number">${player.rank}.</span>
                <img class="player-avatar-in-placa" src="${avatarUrl}" alt="${player.name} avatar">
            </div>
        `;
        row.appendChild(rankCol);

        // 2. Columna JUGADOR
        const playerCol = document.createElement('div');
        playerCol.classList.add('col-player');
        
        playerCol.innerHTML = `
            <div class="player-details">
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

        // 4. Columna ESTADÍSTICAS CLAVE (Ahora con el campo 'stats' del objeto)
        const statsCol = document.createElement('div');
        statsCol.classList.add('col-stats');
        
        // Iteramos sobre las estadísticas del jugador (si existen)
        if (player.stats && player.stats.length > 0) {
             player.stats.forEach(stat => {
                const statPill = document.createElement('span');
                statPill.classList.add('stat-box');
                statPill.textContent = stat; 
                statsCol.appendChild(statPill);
            });
        }
       
        row.appendChild(statsCol);
        leaderboardBody.appendChild(row);
    });
}

// =======================================================
// FUNCIÓN PARA RENDERIZAR LA LISTA DE TIERS
// (Mantenida sin cambios)
// =======================================================
function renderTiersDisplay() {
    const ranksDisplay = document.getElementById('ranks-display');
    ranksDisplay.innerHTML = ''; 

    // Aquí simplemente listamos los nombres de los tiers
    Object.values(tierNames).forEach(tier => {
        const tierElement = document.createElement('div');
        tierElement.classList.add('tier-full-name');
        tierElement.textContent = tier;
        ranksDisplay.appendChild(tierElement);
    });
}

// =======================================================
// LÓGICA DE BÚSQUEDA Y FILTROS
// (Ajustada para la nueva estructura)
// =======================================================
const searchInput = document.getElementById('player-search');
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const leaderboardDisplay = document.getElementById('leaderboard-display');
    const ranksDisplay = document.getElementById('ranks-display');

    if (!leaderboardDisplay.classList.contains('hidden')) {
        const filteredData = leaderboardData.filter(player => 
            player.name.toLowerCase().includes(searchTerm) ||
            player.title.toLowerCase().includes(searchTerm) ||
            player.region.toLowerCase().includes(searchTerm)
            // Se puede añadir búsqueda por stats si se desea
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
                // Aquí podrías filtrar por Victorias, Eliminaciones, etc.
                console.log(`Filtro seleccionado: ${filterType}.`);
                renderLeaderboard([]); 
            }
        }
    });
});

// =======================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard(); 
});