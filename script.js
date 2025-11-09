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
// FUNCIÓN PARA OBTENER AVATAR (Usando el viejo método de ID que es más estable si el ID existe)
// Nota: La forma más estable es usar UserID, pero mantendremos la función para el nombre
// para facilidad de uso, sabiendo que el error puede seguir existiendo si no se despliega.
function getAvatarUrl(userId) {
    // Usaremos el ID directo para mayor estabilidad
    // NOTA: EL TAMAÑO 420x420 es más grande, y la URL es más robusta.
    return `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`;
}

// =======================================================
// MAPA DE ICONOS para cada Tier (Necesitas FontAwesome en el HTML para que funcionen)
// =======================================================
const tierIcons = {
    'HT1': 'fas fa-gem',        // Gema (Diamante)
    'LT1': 'fas fa-heart',      // Corazón
    'HT2': 'fas fa-shield-alt', // Escudo
    'LT2': 'fas fa-flask',      // Frasco
    'HT3': 'fas fa-trophy',     // Trofeo
    'LT3': 'fas fa-magic',      // Varita Mágica
    'HT4': 'fas fa-bolt',       // Rayo
    'LT4': 'fas fa-star',       // Estrella
    'HT5': 'fas fa-skull',      // Calavera
    'LT5': 'fas fa-dice-d6'     // Dado
};

// =======================================================
// DATOS DEL JUEGO (REESTRUCTURADOS)
// Ahora se usa 'robloxId' y 'tiers' es una lista
// =======================================================
const leaderboardData = [
    // Nota: He puesto IDs de Roblox reales para KillerPro y BlockBlade para la prueba del avatar
    { rank: 1, name: 'KillerPro', robloxId: 100000000, title: 'Creador Supremo (1300 KOs)', region: 'NA', tiers: ['HT1', 'LT1', 'LT2', 'HT1'] },
    { rank: 2, name: 'ItzRealMe', robloxId: 100000001, title: 'Combat Master (330 points)', region: 'NA', tiers: ['LT2', 'HT1', 'HT3'] },
    { rank: 3, name: 'Swight', robloxId: 100000002, title: 'Combat Master (270 points)', region: 'NA', tiers: ['HT2', 'LT2', 'LT3', 'HT1'] },
    { rank: 4, name: 'coldified', robloxId: 100000003, title: 'Combat Ace (246 points)', region: 'EU', tiers: ['LT2', 'HT3', 'HT4', 'LT4'] },
    { rank: 5, name: 'Kylaz', robloxId: 100000004, title: 'Combat Ace (222 points)', region: 'NA', tiers: ['HT3', 'LT3', 'HT5'] },
    { rank: 6, name: 'BlvckWlf', robloxId: 100000005, title: 'Combat Ace (206 points)', region: 'EU', tiers: ['LT3', 'HT4', 'HT5'] },
    { rank: 7, name: 'Mystic', robloxId: 100000006, title: 'noob (13 KOs)', region: 'BR', tiers: ['HT5', 'LT5'] },
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
        
        // Se usa el robloxId (aunque sea ficticio para el ejemplo)
        const avatarUrl = getAvatarUrl(player.robloxId); 
        
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

        // 4. Columna TIERS (Con Iconos y Tiers)
        const tiersCol = document.createElement('div');
        // Usaremos 'col-tiers' y no 'col-stats'
        tiersCol.classList.add('col-tiers'); 
        
        if (player.tiers && player.tiers.length > 0) {
             player.tiers.forEach(tierKey => {
                const tierPill = document.createElement('span');
                tierPill.classList.add('tier-pill-icon', `tier-${tierKey}`);
                
                // Genera el HTML para el icono y el texto
                const iconClass = tierIcons[tierKey] || 'fas fa-circle'; // Icono por defecto si no se encuentra
                
                tierPill.innerHTML = `
                    <i class="${iconClass}"></i>
                    <span class="tier-text">${tierKey}</span>
                `;
                tiersCol.appendChild(tierPill);
            });
        }
       
        row.appendChild(tiersCol);
        leaderboardBody.appendChild(row);
    });
}


// =======================================================
// FUNCIÓN PARA RENDERIZAR LA LISTA DE TIERS (Mantenida)
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

// =======================================================
// LÓGICA DE BÚSQUEDA Y FILTROS (Mantenida)
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
            player.tiers.some(tier => tier.toLowerCase().includes(searchTerm))
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

// =======================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard(); 
});