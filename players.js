// =====================================
// 💾 player.js (存檔與玩家數據模組)
// =====================================

// 集中管理玩家所有狀態 (State)
export const state = {
  emeralds: 0,
  hp: 100,
  MAX_HP: 100,
  foodCount: 0,
  questionsAnswered: 0,
  armorLevel: 0,
  bossesDefeated: 0,
  gridSize: 8,
  materials: { log: 0, stone: 0, fiber: 0, sand: 0, clay: 0, iron: 0, gold: 0 },
  inventory: {},
  placedDecorations: [],
};

// 載入遊戲進度
export function loadGameState(onLoadCallback) {
  let savedState = null;
  try {
    savedState = localStorage.getItem('rpgGameState');
  } catch (e) {}
  if (savedState) {
    try {
      let s = JSON.parse(savedState);
      state.emeralds = parseInt(s.emeralds) || 0;
      state.MAX_HP = parseInt(s.MAX_HP);
      if (isNaN(state.MAX_HP)) state.MAX_HP = 100;
      state.hp = parseInt(s.hp);
      if (isNaN(state.hp)) state.hp = state.MAX_HP;
      state.foodCount = parseInt(s.foodCount) || 0;
      state.questionsAnswered = parseInt(s.questionsAnswered) || 0;
      state.armorLevel = parseInt(s.armorLevel) || 0;
      state.bossesDefeated = parseInt(s.bossesDefeated) || 0;
      state.gridSize = parseInt(s.gridSize);
      if (isNaN(state.gridSize) || state.gridSize < 6) state.gridSize = 8;
      state.materials = s.materials || {
        log: 0,
        stone: 0,
        fiber: 0,
        sand: 0,
        clay: 0,
        iron: 0,
        gold: 0,
      };
      state.inventory = s.inventory || {};
      state.placedDecorations = Array.isArray(s.placedDecorations)
        ? s.placedDecorations
        : [];
    } catch (e) {
      console.error('Load Game State Error', e);
      state.gridSize = 8;
    }
  }
  if (onLoadCallback) onLoadCallback(); // 讀取完通知主程式更新畫面
}

// 儲存遊戲進度
export function saveGameState() {
  try {
    localStorage.setItem('rpgGameState', JSON.stringify(state));
  } catch (e) {
    console.error('Save Error', e);
  }
}

// 重置遊戲進度 (死亡或重新開始時呼叫)
export function resetGameState(onResetCallback) {
  state.emeralds = 0;
  state.MAX_HP = 100;
  state.hp = 100;
  state.foodCount = 0;
  state.questionsAnswered = 0;
  state.armorLevel = 0;
  state.bossesDefeated = 0;
  state.materials = {
    log: 0,
    stone: 0,
    fiber: 0,
    sand: 0,
    clay: 0,
    iron: 0,
    gold: 0,
  };
  state.inventory = {};
  state.placedDecorations = [];
  state.gridSize = 8;
  saveGameState();
  if (onResetCallback) onResetCallback();
}

// 智能計算傷害 (裝甲減傷)
export function calculateDamage(amount) {
  let reduction = state.armorLevel * 0.15;
  if (reduction > 0.75) reduction = 0.75;
  return Math.max(1, Math.floor(amount * (1 - reduction)));
}
