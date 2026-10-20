// =====================================
// 💎 shop.js (合成與裝備配方模組)
// =====================================

export const craftRecipes = [
  {
    id: 'hp_boost',
    name: '生命果實',
    icon: '💖',
    cost: { emerald: 20, gold: 1 },
    desc: '提升血量上限 +20',
    type: 'upgrade',
  },
  {
    id: 'armor',
    name: '防護裝甲',
    icon: '🛡️',
    cost: { iron: 3, log: 2, fiber: 2 },
    desc: '減少 15% 怪物傷害',
    type: 'upgrade',
  },
  {
    id: 'wood_plank',
    name: '木板',
    icon: '🧱',
    cost: { log: 1 },
    desc: '建造地基 (🪵x1)',
  },
  {
    id: 'stone_brick',
    name: '石磚',
    icon: '🪨',
    cost: { stone: 1 },
    desc: '堅固外牆 (🪨x1)',
  },
  {
    id: 'brick',
    name: '紅磚',
    icon: '🧱',
    cost: { clay: 2 },
    desc: '經典建材 (🧱x2)',
  },
  {
    id: 'glass',
    name: '玻璃窗',
    icon: '🪟',
    cost: { sand: 2 },
    desc: '透光明亮 (🏜️x2)',
  },
  {
    id: 'door',
    name: '木門',
    icon: '🚪',
    cost: { log: 2 },
    desc: '房屋入口 (🪵x2)',
  },
  {
    id: 'bed',
    name: '床舖',
    icon: '🛏️',
    cost: { log: 2, fiber: 2 },
    desc: '溫馨家具 (🪵x2 🌾x2)',
  },
  {
    id: 'torch',
    name: '火把',
    icon: '🏮',
    cost: { log: 1, stone: 1 },
    desc: '照明工具 (🪵x1 🪨x1)',
  },
  {
    id: 'plant',
    name: '小盆栽',
    icon: '🌷',
    cost: { clay: 1, fiber: 1 },
    desc: '綠化環境 (🧱x1 🌾x1)',
  },
  {
    id: 'iron_block',
    name: '鐵塊',
    icon: '🧊',
    cost: { iron: 2 },
    desc: '堅不可摧 (🪙x2)',
  },
  {
    id: 'gold_block',
    name: '黃金磚',
    icon: '👑',
    cost: { gold: 2 },
    desc: '閃閃發光 (🌟x2)',
  },
  {
    id: 'chest',
    name: '寶箱',
    icon: '🧰',
    cost: { log: 2, iron: 1 },
    desc: '收藏寶物 (🪵x2 🪙x1)',
  },
  {
    id: 'water',
    name: '水源',
    icon: '💧',
    cost: { emerald: 5 },
    desc: '建造池塘 (❇️x5)',
  },
  {
    id: 'expand',
    name: '擴大領土',
    icon: '🗺️',
    cost: { emerald: 30 },
    desc: '增加邊界 (❇️x30)',
    type: 'upgrade',
  },
];

// 檢查玩家素材同綠寶石係咪足夠
export function canAffordCraft(cost, materials, emeralds) {
  if (cost.log && materials.log < cost.log) return false;
  if (cost.stone && materials.stone < cost.stone) return false;
  if (cost.fiber && materials.fiber < cost.fiber) return false;
  if (cost.sand && materials.sand < cost.sand) return false;
  if (cost.clay && materials.clay < cost.clay) return false;
  if (cost.iron && materials.iron < cost.iron) return false;
  if (cost.gold && materials.gold < cost.gold) return false;
  if (cost.emerald && emeralds < cost.emerald) return false;
  return true;
}
