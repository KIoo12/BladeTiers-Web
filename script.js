// =======================================================
// DATOS Y LOGICA
// =======================================================

// --- DATOS DE LA CLASIFICACIÓN (CON ICONOS) ---
const leaderboardData = [
    { rank: 1, name: 'KillerPro', title: 'Combat Grandmaster (405 points)', region: 'NA', stats: ['<i class="fas fa-gem"></i> HT1', '<i class="fas fa-heart"></i> LT1', '<i class="fas fa-sword"></i> LT1', '<i class="fas fa-trophy"></i> LT1'] },
    { rank: 2, name: 'ItzRealMe', title: 'Combat Master (330 points)', region: 'NA', stats: ['<i class="fas fa-gem"></i> HT1', '<i class="fas fa-flask"></i> HT1', '<i class="fas fa-sword"></i> HT1', '<i class="fas fa-trophy"></i> HT1'] },
    { rank: 3, name: 'Swight', title: 'Combat Master (270 points)', region: 'NA', stats: ['<i class="fas fa-gem"></i> HT1', '<i class="fas fa-heart"></i> LT2', '<i class="fas fa-flask"></i> LT3', '<i class="fas fa-sword"></i> HT1'] },
    { rank: 4, name: 'coldified', title: 'Combat Ace (246 points)', region: 'EU', stats: ['<i class="fas fa-gem"></i> HT2', '<i class="fas fa-heart"></i> LT2', '<i class="fas fa-flask"></i> LT2', '<i class="fas fa-sword"></i> LT2'] },
    { rank: 5, name: 'Kylaz', title: 'Combat Ace (222 points)', region: 'NA', stats: ['<i class="fas fa-gem"></i> HT1', '<i class="fas fa-heart"></i> LT3', '<i class="fas fa-flask"></i> LT3', '<i class="fas fa-sword"></i> HT1'] },
    { rank: 6, name: 'BlvckWlf', title: 'Combat Ace (206 points)', region: 'EU', stats: ['<i class="fas fa-gem"></i> HT3', '<i class="fas fa-heart"></i> LT3', '<i class="fas fa-flask"></i> HT1', '<i class="fas fa-sword"></i> HT2'] },
    { rank: 7, name: 'Mystic', title: 'Combat Ace (13 points)', region: 'BR', stats: ['<i class="fas fa-gem"></i> HT3', '<i class="fas fa-heart"></i> LT3', '<i class="fas fa-flask"></i> HT1', '<i class="fas fa-sword"></i> HT2'] }
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

        // Añadir clase 'top-player' para la animación de brillo
        if (player.rank <= 3) {
            row.classList.add('top-player');
        }

        // 1. CREACIÓN: Columna del Ranking (La Placa)
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank-placa');
        
        // Contenido interno de la placa (con el punto al final)
        rankCol.innerHTML = `
            <div class="rank-placa rank-${player.rank}">
                <span class="rank-number">${player.rank}.</span>
            </div>
        `;

        // 2. CREACIÓN: Columna del Jugador y Título
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
        
        // 3. CREACIÓN: Columna de la Región
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region');
        regionCol.classList.add(`region-${player.region}`); 
        regionCol.textContent = player.region;

        // 4. CREACIÓN: Columna de las Estadísticas (Tiers/Píldoras)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');

        player.stats.forEach(stat => {
            const statPill = document.createElement('span');
            statPill.classList.add('tier-icon', 'stat-box');
            statPill.textContent = stat;
            tiersCol.appendChild(statPill);
        });
        
        // =======================================================
        // AÑADIR LAS COLUMNAS EN EL ORDEN FINAL: #, JUGADOR, REGIÓN, TIERS
        // =======================================================

        // 1. Ranking Placa
        row.appendChild(rankCol);

        // 2. Jugador
        row.appendChild(playerCol);

        // 3. Región
        row.appendChild(regionCol); // <-- REGIÓN VA AHORA ANTES DE TIERS

        // 4. Tiers/Estadísticas
        row.appendChild(tiersCol); 

        leaderboardBody.appendChild(row);
    }); // Cierra el bucle forEach de los jugadores
} // Cierra la función renderLeaderboard

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