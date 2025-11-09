// Función simulada para obtener el avatar (solo un placeholder visual)
function getAvatarUrl(player) {
    return `https://www.roblox.com/headshot-thumbnail/image?userId=1234567&width=420&height=420&format=png`;
}

// Datos de ejemplo imitando estadísticas de Blade Ball
const leaderboardData = [
    { rank: 1, name: "KillerPro", title: "🏆 Creador Supremo (1300 KOs)", region: "NA", stats: ["450 Wins", "1300 KOs", "DMG: 55k"], tiers: ["Legend", "Diamond"] },
    { rank: 2, name: "RobloxChamp", title: "Pro Player (1150 KOs)", region: "EU", stats: ["350 Wins", "1150 KOs", "DMG: 45k"], tiers: ["Diamond", "Gold"] },
    { rank: 3, name: "BlockBlade", title: "Ace Defender (980 KOs)", region: "AS", stats: ["300 Wins", "980 KOs", "DMG: 40k"], tiers: ["Gold", "Silver"] },
    { rank: 4, name: "TheBaller", title: "Rising Star (850 KOs)", region: "NA", stats: ["250 Wins", "850 KOs", "DMG: 35k"], tiers: ["Silver"] },
    { rank: 5, name: "NoScopePro", title: "Newbie (500 KOs)", region: "EU", stats: ["100 Wins", "500 KOs", "DMG: 20k"], tiers: ["Bronze"] },
    { rank: 6, name: "BladeWiz", title: "El Magico (480 KOs)", region: "EU", stats: ["80 Wins", "480 KOs", "DMG: 18k"], tiers: ["Bronze"] },
     { rank: 7, name: "Mystic", title: "noob (13 KOs)", region: "br", stats: ["46 Wins", "13 KOs", "DMG: 5k"], tiers: ["silver"] }, // ¡Jugador añadido!
];

const tableBody = document.getElementById('leaderboard-table');
const searchInput = document.getElementById('player-search');

// Función principal para renderizar la tabla
function renderTable(data) {
    tableBody.innerHTML = '';

    if (data.length === 0) {
        tableBody.innerHTML = '<div style="padding: 20px; text-align: center; color: #a1a1a1;">No se encontraron jugadores que coincidan con la búsqueda.</div>';
        return;
    }

    data.forEach(player => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // 1. Columna del Ranking
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank');
        if (player.rank <= 3) {
            rankCol.classList.add(`rank-${player.rank}`);
        }
        rankCol.textContent = player.rank + '.';

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

        // 3. Columna de la Región
        const regionCol = document.createElement('div');
        regionCol.classList.add('col-region');
        regionCol.textContent = player.region;

        // 4. Columna de las Estadísticas
        const statsCol = document.createElement('div');
        statsCol.classList.add('col-tiers');

        player.stats.forEach(stat => {
            const statBox = document.createElement('span');
            statBox.classList.add('tier-icon', 'stat-box');
            statBox.textContent = stat;
            statsCol.appendChild(statBox);
        });

        row.appendChild(rankCol);
        row.appendChild(playerCol);
        row.appendChild(regionCol);
        row.appendChild(statsCol);
        tableBody.appendChild(row);
    });
}

// ------------------------------------
// Búsqueda (Filtra la tabla)
// ------------------------------------
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredData = leaderboardData.filter(player => 
        player.name.toLowerCase().includes(searchTerm)
    );

    renderTable(filteredData);
});

// Inicializar la tabla al cargar la página
renderTable(leaderboardData);