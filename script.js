// =======================================================
// DATOS DEL JUEGO (PARA REPLICAR MCtiers)
// =======================================================

function getAvatarUrl(playerName) {
    // URL simulada de avatar. Puedes cambiarla por un servicio real si tienes uno.
    // Ejemplo: `https://cravatar.eu/helmavatar/${playerName}/32.png` para Minecraft
    return `https://avatar.vercel.sh/${playerName}.png?size=40`; 
}

const leaderboardData = [
    // Datos de ejemplo con un solo campo 'tier' para cada jugador
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
    leaderboardBody.innerHTML = ''; // Limpiar cualquier contenido existente

    data.forEach((player) => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // 1. Columna # (Placa de Ranking)
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank-placa');
        
        // Aplica la clase 'top-player' para el brillo si está en el top 3
        if (player.rank <= 3) {
            rankCol.classList.add('top-player'); 
        }
        
        rankCol.innerHTML = `
            <div class="rank-placa rank-${player.rank}">
                <span class="rank-number">${player.rank}.</span>
            </div>
        `;
        row.appendChild(rankCol);

        // 2. Columna JUGADOR (Avatar, Nombre, Título)
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
        // Usamos un span dentro para aplicar el estilo de píldora
        regionCol.innerHTML = `<span class="region-pill region-${player.region}">${player.region}</span>`;
        row.appendChild(regionCol);

        // 4. Columna TIERS (Un Solo Tier por Jugador)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');
        const tierPill = document.createElement('span');
        tierPill.classList.add('tier-pill');
        tierPill.textContent = player.tier; // Mostrar el único tier
        tiersCol.appendChild(tierPill);
        row.appendChild(tiersCol);

        leaderboardBody.appendChild(row);
    });
}

// =======================================================
// LÓGICA DE BÚSQUEDA Y FILTROS
// =======================================================

// Lógica de Búsqueda
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

// Lógica para los botones de filtro (ej: Overall, Eliminaciones, etc.)
// Esto es un placeholder. Si tienes datos para cada filtro, se implementaría aquí.
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover 'active' de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir 'active' al botón clickeado
        button.classList.add('active');

        const filterType = button.dataset.filter;
        // Aquí iría la lógica para cargar datos diferentes según el filtro
        // Por ahora, solo volvemos a renderizar con los datos originales si es 'overall'
        if (filterType === 'overall') {
            renderLeaderboard(leaderboardData);
        } else {
            // Implementar lógica para otros filtros si tienes datos específicos
            console.log(`Filtro seleccionado: ${filterType}. (No hay datos específicos para este filtro en este ejemplo)`);
            renderLeaderboard([]); // Mostrar tabla vacía para otros filtros por ahora
        }
    });
});


// =======================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard(); // Renderizar la tabla inicial
});