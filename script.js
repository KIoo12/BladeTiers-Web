// =======================================================
// MAPA DE TIERS 
// =======================================================
const tierNames = {
    'HT1': 'High Tier 1', 'LT1': 'Low Tier 1',
    'HT2': 'High Tier 2', 'LT2': 'Low Tier 2',
    'HT3': 'High Tier 3', 'LT3': 'Low Tier 3',
    'HT4': 'High Tier 4', 'LT4': 'Low Tier 4',
    'HT5': 'High Tier 5', 'LT5': 'Low Tier 5'
};

// =======================================================
// FUNCIÓN DE CONVERSIÓN: Username a UserID
// =======================================================
async function getUserIdsFromUsernames(usernames) {
    const url = 'https://users.roblox.com/v1/usernames/users';
    const body = {
        usernames: usernames,
        excludeBannedUsers: true
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        
        let idMap = {};
        if (json.data) {
            json.data.forEach(user => {
                idMap[user.requestedUsername.toLowerCase()] = user.id;
            });
        }
        return idMap;
    } catch (error) {
        console.error("Error al obtener UserIDs de Roblox:", error);
        return {};
    }
}


// =======================================================
// DATOS DEL JUEGO (USANDO USERNAME)
// =======================================================
const leaderboardData = [
    { rank: 1, name: 'Shedletsky', robloxName: 'Shedletsky', title: 'Admin (Creator)', region: 'NA', tier: 'HT1' },
    { rank: 2, name: 'KreekCraft', robloxName: 'KreekCraft', title: 'Star Creator (YouTuber)', region: 'NA', tier: 'LT1' },
    { rank: 3, name: 'Linkmon99', robloxName: 'Linkmon99', title: 'Collector (Rich)', region: 'NA', tier: 'HT2' },
    { rank: 4, name: 'Coldified', robloxName: 'Coldified', title: 'Combat Ace (246 points)', region: 'EU', tier: 'LT2' }, 
    { rank: 5, name: 'Kylaz', robloxName: 'Kylaz', title: 'Combat Ace (222 points)', region: 'NA', tier: 'HT3' }, 
    { rank: 6, name: 'BlvckWlf', robloxName: 'BlvckWlf', title: 'Combat Ace (206 points)', region: 'EU', tier: 'LT3' }, 
    { rank: 7, name: 'Mystic', robloxName: 'Mystic', title: 'Combat Ace (13 points)', region: 'BR', tier: 'HT5' },
    { rank: 8, name: 'BladeLord', robloxName: 'Roblox', title: 'Combat Veteran (90 points)', region: 'EU', tier: 'LT4' },
    { rank: 9, name: 'ShadowPVP', robloxName: 'JohnDoe', title: 'Warrior (50 points)', region: 'AS', tier: 'HT5' },
    { rank: 10, name: 'ProGamerX', robloxName: 'JaneDoe', title: 'Newbie (10 points)', region: 'NA', tier: 'LT5' }
];


// =======================================================
// FUNCIÓN PRINCIPAL DE RENDERIZADO DE LA TABLA
// =======================================================
async function renderLeaderboard(data = leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; 

    // PASO 1: Obtener todos los Usernames y convertirlos a UserIDs
    const usernamesToFetch = data.map(player => player.robloxName);
    const idMap = await getUserIdsFromUsernames(usernamesToFetch);

    // PASO 2: Obtener todos los UserIDs resultantes para la llamada de avatares
    const userIdsToFetchAvatars = Object.values(idMap);
    
    let avatarMap = {};
    if (userIdsToFetchAvatars.length > 0) {
        try {
            // Tamaño 60x60, formato PNG, NO circular (isCircular=false)
            const response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIdsToFetchAvatars.join(',')}&size=60x60&format=Png&isCircular=false`);
            const json = await response.json();
            
            json.data.forEach(avatar => {
                avatarMap[avatar.targetId] = avatar.imageUrl;
            });
        } catch (error) {
            console.error("Error al cargar avatares de Roblox:", error);
        }
    }


    // PASO 3: Renderizar la tabla
    data.forEach((player) => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // Buscar el UserID usando el nombre de usuario
        const userId = idMap[player.robloxName.toLowerCase()];
        
        // Obtener la URL del avatar del mapa. Si no hay, usar una imagen por defecto.
        // Asegúrate de que 'default_avatar.png' exista en la raíz de tu proyecto
        const avatarUrl = userId && avatarMap[userId] ? avatarMap[userId] : 'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=48&height=48&format=png'; // Default de Roblox si falla
        
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
            <img class="player-avatar-in-placa" src="${avatarUrl}" alt="${player.name} avatar">
        `;
        row.appendChild(rankCol);

        // 2. Columna JUGADOR (Ya no necesita la imagen del avatar)
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