// =====================================
// 🗺️ map.js (地圖與怪物 AI 系統)
// =====================================
import { sfx } from './audio.js';
import { state, calculateDamage } from './player.js';

export const MAP_MONSTER_TYPES = [ 
    { name: "殭屍", icon: "🧟", dmg: 10 }, 
    { name: "骷髏", icon: "💀", dmg: 15 }, 
    { name: "蜘蛛", icon: "🕷️", dmg: 10 } 
];

export let mapState = {
    pX: 3, pY: 3,
    TILE_SIZE: 40,
    questBlocks: [],
    activeMapMonsters: [],
    monsterInterval: null,
    isShieldActive: false,
    isQuestionActive: false,
    rpgQuestType: "",
    rpgCorrectAnswer: ""
};

export function getTilePosition(x, y) {
    return { left: (x * mapState.TILE_SIZE) + 'px', top: (y * mapState.TILE_SIZE) + 'px' };
}

export function spawnMonsters(islandElement) {
    mapState.activeMapMonsters.forEach(m => m.element.remove());
    mapState.activeMapMonsters = [];
    let baseMonsters = 2; 
    let maxMonstersLimit = Math.max(3, Math.floor((state.gridSize * state.gridSize) / 12)); 
    let numMonsters = Math.min(baseMonsters + state.bossesDefeated, maxMonstersLimit); 
    
    for(let i=0; i<numMonsters; i++) {
        let type = MAP_MONSTER_TYPES[Math.floor(Math.random() * MAP_MONSTER_TYPES.length)];
        let randX, randY, attempts = 0;
        do {
            randX = Math.floor(Math.random() * state.gridSize); 
            randY = Math.floor(Math.random() * state.gridSize); 
            attempts++;
        } while (attempts < 50 && (
            (Math.abs(randX - mapState.pX) <= 1 && Math.abs(randY - mapState.pY) <= 1) || 
            mapState.questBlocks.some(b => b.x === randX && b.y === randY) || 
            mapState.activeMapMonsters.some(m => m.x === randX && m.y === randY)
        ));
        
        let el = document.createElement('div'); 
        el.className = 'decoration-item'; 
        el.innerText = type.icon;
        let pos = getTilePosition(randX, randY);
        el.style.left = pos.left; 
        el.style.top = pos.top; 
        el.style.zIndex = 6; 
        el.style.transition = "top 0.3s, left 0.3s";
        
        islandElement.appendChild(el);
        mapState.activeMapMonsters.push({ x: randX, y: randY, type: type, element: el });
    }
}

export function checkCollision(m, onHitCallback) {
    if(m.x === mapState.pX && m.y === mapState.pY && !mapState.isShieldActive) {
        let dmg = calculateDamage(m.type.dmg);
        onHitCallback(dmg, m.type.name);
        m.element.remove();
        return true;
    }
    return false;
}
