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
// DATOS DEL JUEGO (AHORA CON ROBLOX USER ID)
// =======================================================

/*
    NOTA IMPORTANTE SOBRE EL AVATAR DE ROBLOX:
    La API de Roblox necesita el 'UserID', no el 'username'.
    He puesto UserIDs de ejemplo. 
    Para encontrar el UserID de un jugador, puedes usar sitios como "roblox.id"
    o buscar en su perfil de Roblox.
*/
function getRobloxAvatarUrl(userId) {
    // Esta es la API oficial de Roblox para avatares
    // Usamos 48x48 (tamaño pequeño) y circular (IsCircular)
    return `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=48x48&format=Png&isCircular=true`;
}

const leaderboardData = [
    // CAMBIO: Añadido 'robloxId' y actualizado el nombre
    { rank: 1, name: 'Shedletsky', title: 'Admin (Creator)', robloxId: 261, region: 'NA', tier: 'HT1' },
    { rank: 2, name: 'KreekCraft', title: 'Star Creator (YouTuber)', robloxId: 14025239, region: 'NA', tier: 'LT1' },
    { rank: 3, name: 'Linkmon99', title: 'Collector (Rich)', robloxId: 4423489, region: 'NA', tier: 'HT2' },
    { rank: 4, name: 'coldified', title: 'Combat Ace (246 points)', robloxId: 1234567, region: 'EU', tier: 'LT2' }, // ID de ejemplo
    { rank: 5, name: 'Kylaz', title: 'Combat Ace (222 points)', robloxId: 7654321, region: 'NA', tier: 'HT3' }, // ID de ejemplo
    { rank: 6, name: 'BlvckWlf', title: 'Combat Ace (206 points)', robloxId: 1111111, region: 'EU', tier: 'LT3' }, // ID de ejemplo
    { rank: 7, name: 'Mystic', title: 'Combat Ace (13 points)', robloxId: 2222222, region: 'BR', tier: 'HT5' } // ID de ejemplo
];

// =======================================================
// FUNCIÓN PRINCIPAL DE RENDERIZADO DE LA TABLA
// =======================================================
async function renderLeaderboard(data = leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; 

    // 1. Obtener todos los UserIDs para una sola llamada a la API
    const userIds = data.map(player => player.robloxId);
    
    // 2. Llamar a la API de Roblox
    let avatarMap = {};
    try {
        const response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds.join(',')}&size=48x48&format=Png&isCircular=true`);
        const json = await response.json();
        
        // Crear un mapa (diccionario) de Id -> UrlDeImagen
        json.data.forEach(avatar => {
            avatarMap[avatar.targetId] = avatar.imageUrl;
        });
    } catch (error) {
        console.error("Error al cargar avatares de Roblox:", error);
    }

    // 3. Renderizar la tabla
    data.forEach((player) => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // 1. Columna # (Placa de Ranking)
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank-placa');
        
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
        
        // Obtener la URL del avatar del mapa, o usar una imagen por defecto
        const avatarUrl = avatarMap[player.robloxId] || 'default_avatar.png'; // Asegúrate de tener una imagen por defecto si falla
        
        playerCol.innerHTML = `
            <div class="player-details">
                <img src="${avatarUrl}" alt="${player.name} avatar">
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
// FUNCIÓN PARA RENDERIZAR LA LISTA DE TIERS
// =======================================================
function renderTiersDisplay() {
    const ranksDisplay = document.getElementById('ranks-display');
    ranksDisplay.innerHTML = ''; 

    const uniqueTiers = Array.from(new Set(Object.values(tierNames))).sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const typeA = a.includes('High') ? 0 : 1; 
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
                console.log(`Filtro seleccionado: ${filterType}. (No hay datos específicos para este filtro en este ejemplo)`);
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