// =======================================================
// DATOS Y LOGICA
// =======================================================

// --- DATOS DE LA CLASIFICACIÓN ---
const leaderboardData = [
    { rank: 1, name: 'KillerPro', title: 'Creador Supremo (1300 KOs)', region: 'NA', stats: ['450 Wins', '1300 KDs', 'DMG:55k'] },
    { rank: 2, name: 'RobloxChamp', title: 'Pro Player (1150 KOs)', region: 'EU', stats: ['350 Wins', '1150 KDs', 'DMG:45k'] },
    { rank: 3, name: 'BlockBlade', title: 'Ace Defender (980 KOs)', region: 'AS', stats: ['300 Wins', '980 KDs', 'DMG:40k'] },
    { rank: 4, name: 'TheBaller', title: 'Rising Star (850 KOs)', region: 'NA', stats: ['250 Wins', '850 KDs', 'DMG:39k'] },
    { rank: 5, name: 'NoScopePro', title: 'Newbie (500 KOs)', region: 'EU', stats: ['100 Wins', '500 KDs', 'DMG:20k'] },
    { rank: 6, name: 'BladeWiz', title: 'El Magico (480 KOs)', region: 'EU', stats: ['80 Wins', '480 KDs', 'DMG:18k'] },
    { rank: 7, name: 'Mystic', title: 'noob (13 KOs)', region: 'BR', stats: ['46 Wins', '13 KDs', 'DMG:5k'] }
];

// --- FUNCIÓN PARA OBTENER AVATAR ---
function getAvatarUrl(playerName) {
    return `https://avatar.vercel.sh/${playerName}.png`; 
}

// =======================================================
// RENDERIZADO DE LA TABLA
// =======================================================

function renderLeaderboard(data = leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Limpiar la tabla

    data.forEach((player, index) => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // ----------------------------------------------------
        // Añadir clase 'top-player' para la animación de brillo
        // ----------------------------------------------------
        if (player.rank <= 3) {
            row.classList.add('top-player');
        }

        // 1. Columna del Ranking (¡Ahora con Placa!)
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank-placa'); // Nueva clase para el diseño de placa
        
        // Contenido interno de la placa
        rankCol.innerHTML = `
            <div class="rank-placa rank-${player.rank}">
                <span class="rank-number">${player.rank}.</span>
            </div>
        `;
        row.appendChild(rankCol);

        // 2. Columna del Jugador y Título (se mantiene igual)
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

        // ----------------------------------------------------
        // 3. Columna de las Estadísticas (TIERS) - ¡Movida a la posición 3!
        // ----------------------------------------------------
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers'); // Se mantiene la clase de diseño
        
        player.stats.forEach(stat => {
            const statPill = document.createElement('span');
            statPill.classList.add('tier-icon', 'stat-box');
            statPill.textContent = stat;
            tiersCol.appendChild(statPill);
        });
        row.appendChild(tiersCol);


        // 4. Columna de la Región - ¡Movida a la última posición!
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region');
        regionCol.classList.add(`region-${player.region}`); 
        regionCol.textContent = player.region;
        row.appendChild(regionCol);


        leaderboardBody.appendChild(row);
    });
}

        // 1. Columna del Ranking
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank');
        rankCol.textContent = player.rank;
        if (player.rank === 1) rankCol.classList.add('rank-1');
        if (player.rank === 2) rankCol.classList.add('rank-2');
        if (player.rank === 3) rankCol.classList.add('rank-3');
        row.appendChild(rankCol);

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
        row.appendChild(playerCol);

        // 3. Columna de la Región
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region');
        regionCol.classList.add(`region-${player.region}`); 
        regionCol.textContent = player.region;
        row.appendChild(regionCol);

        // 4. Columna de las Estadísticas (Píldoras)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');

        player.stats.forEach(stat => {
            const statPill = document.createElement('span');
            statPill.classList.add('tier-icon', 'stat-box');
            statPill.textContent = stat;
            tiersCol.appendChild(statPill);
        });
        row.appendChild(tiersCol);

        leaderboardBody.appendChild(row);


// =======================================================
// BUSQUEDA Y FILTROS
// =======================================================

// Lógica de Búsqueda
const searchInput = document.getElementById('player-search');

if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        const filteredData = leaderboardData.filter(player => 
            player.name.toLowerCase().includes(searchTerm) || 
            player.title.toLowerCase().includes(searchTerm) ||
            player.region.toLowerCase().includes(searchTerm)
        );
        renderLeaderboard(filteredData);
    });
}

// Lógica de Filtros (Categorías)
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover 'active' de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Añadir 'active' al botón clickeado
        button.classList.add('active');
        
        // Nota: Si quieres que el filtro haga algo, deberías implementar la lógica aquí,
        // por ahora solo cambia la apariencia del botón.
        
        // Para fines de prueba, siempre renderizamos la lista completa al cambiar de filtro
        renderLeaderboard(leaderboardData);
    });
});