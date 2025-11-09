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
function renderLeaderboard(data = leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Limpiar la tabla

    data.forEach((player, index) => {
        const row = document.createElement('div');
        row.classList.add('player-row');

        // 1. Columna del Ranking
        const rankCol = document.createElement('div');
        rankCol.classList.add('col-rank');
        rankCol.textContent = player.rank;
        if (player.rank === 1) rankCol.classList.add('rank-1');
        if (player.rank === 2) rankCol.classList.add('rank-2');
        if (player.rank === 3) rankCol.classList.add('rank-3');
        row.appendChild(rankCol);

        // 2. Columna del Jugador y Título (Estructura MCtiers)
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
        regionCol.textContent = player.region;
        row.appendChild(regionCol);

        // 4. Columna de las Estadísticas (Tiers/Píldoras)
        const tiersCol = document.createElement('div');
        tiersCol.classList.add('col-tiers');

        // Crea las píldoras de estadísticas
        player.stats.forEach(stat => {
            const statPill = document.createElement('span');
            statPill.classList.add('tier-icon', 'stat-box');
            statPill.textContent = stat;
            tiersCol.appendChild(statPill);
        });
        row.appendChild(tiersCol);

        leaderboardBody.appendChild(row);
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