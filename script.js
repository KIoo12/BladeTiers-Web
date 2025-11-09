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
// DATOS DEL JUEGO (PARA REPLICAR MCtiers)
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
        
        // 3. Columna REGIÓN (Píldora Centrada)
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region');
        // CORRECCIÓN: Añadimos la clase region-X a la píldora
        regionCol.innerHTML = `<span class="region-pill region-${player.region}">${player.region}</span>`;
        row.appendChild(regionCol);

        // 4. Columna TIERS (Con nombre completo)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');
        const tierPill = document.createElement('span');
        tierPill.classList.add('tier-pill');
        // CAMBIO: Usamos el mapa de tierNames para obtener el nombre completo
        tierPill.textContent = tierNames[player.tier] || player.tier; 
        tiersCol.appendChild(tierPill);
        row.appendChild(tiersCol);

        leaderboardBody.appendChild(row);
    });
}

// =======================================================
// LÓGICA DE BÚSQUEDA Y FILTROS
// =======================================================
const searchInput = document.getElementById('player-search');
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredData = leaderboardData.filter(player => 
        player.name.toLowerCase().includes(searchTerm) ||
        player.title.toLowerCase().includes(searchTerm) ||
        player.region.toLowerCase().includes(searchTerm) ||
        player.tier.toLowerCase().includes(searchTerm)
    );
    renderLeaderboard(filteredData);
});

const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterType = button.dataset.filter;
        
        if (filterType === 'ranks') {
            // Lógica para el botón "Ranks"
            // Dejamos esto listo para tu próxima petición
            console.log("Botón Ranks presionado. Mostrando todos los rangos.");
            renderLeaderboard(leaderboardData); // Por ahora, solo muestra la tabla normal
        } else if (filterType === 'overall') {
            renderLeaderboard(leaderboardData);
        } else {
            console.log(`Filtro seleccionado: ${filterType}.`);
            renderLeaderboard([]); // Vacía la tabla si no es Overall o Ranks
        }
    });
});

// =======================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard(); // Renderizar la tabla inicial
});