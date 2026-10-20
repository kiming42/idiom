// =====================================
// 🐉 boss.js (巨龍與怪物 Boss 系統)
// =====================================
import { sfx } from './audio.js';
import { state, calculateDamage } from './player.js';

export const BOSS_LIST = [
  {
    name: '終界龍 (Ender Dragon)',
    icon: "data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='8' fill='%231a1a1a'/%3E%3Crect x='1' y='3' width='2' height='1' fill='%23d800d8'/%3E%3Crect x='5' y='3' width='2' height='1' fill='%23d800d8'/%3E%3Crect x='2' y='5' width='4' height='3' fill='%230a0a0a'/%3E%3C/svg%3E",
    dmg: 60,
  },
  {
    name: '苦力怕 (Creeper)',
    icon: "data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='8' fill='%2355FF55'/%3E%3Crect x='1' y='2' width='2' height='2' fill='%23000'/%3E%3Crect x='5' y='2' width='2' height='2' fill='%23000'/%3E%3Crect x='3' y='4' width='2' height='3' fill='%23000'/%3E%3Crect x='2' y='5' width='1' height='2' fill='%23000'/%3E%3Crect x='5' y='5' width='1' height='2' fill='%23000'/%3E%3C/svg%3E",
    dmg: 40,
  },
  {
    name: '末影人 (Enderman)',
    icon: "data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='8' fill='%23111'/%3E%3Crect x='0' y='4' width='3' height='1' fill='%23FF55FF'/%3E%3Crect x='5' y='4' width='3' height='1' fill='%23FF55FF'/%3E%3C/svg%3E",
    dmg: 35,
  },
  {
    name: '地獄幽靈 (Ghast)',
    icon: "data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='8' fill='%23eee'/%3E%3Crect x='1' y='3' width='2' height='1' fill='%23000'/%3E%3Crect x='5' y='3' width='2' height='1' fill='%23000'/%3E%3Crect x='3' y='5' width='2' height='1' fill='%23000'/%3E%3Crect x='1' y='7' width='1' height='1' fill='%23aaa'/%3E%3Crect x='3' y='7' width='1' height='1' fill='%23aaa'/%3E%3Crect x='5' y='7' width='1' height='1' fill='%23aaa'/%3E%3C/svg%3E",
    dmg: 45,
  },
  {
    name: '監守者 (Warden)',
    icon: "data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='8' fill='%23004c4c'/%3E%3Crect x='2' y='2' width='4' height='4' fill='%23002222'/%3E%3Crect x='3' y='4' width='2' height='2' fill='%23118888'/%3E%3Crect x='0' y='1' width='1' height='3' fill='%23008888'/%3E%3Crect x='7' y='1' width='1' height='3' fill='%23008888'/%3E%3C/svg%3E",
    dmg: 80,
  },
  {
    name: '凋靈 (Wither)',
    icon: "data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='0' width='4' height='4' fill='%23333'/%3E%3Crect x='5' y='1' width='1' height='1' fill='%23000'/%3E%3Crect x='7' y='1' width='1' height='1' fill='%23000'/%3E%3Crect x='1' y='1' width='3' height='3' fill='%23333'/%3E%3Crect x='1.5' y='1.5' width='0.5' height='0.5' fill='%23000'/%3E%3Crect x='3' y='1.5' width='0.5' height='0.5' fill='%23000'/%3E%3Crect x='8' y='1' width='3' height='3' fill='%23333'/%3E%3Crect x='8.5' y='1.5' width='0.5' height='0.5' fill='%23000'/%3E%3Crect x='10' y='1.5' width='0.5' height='0.5' fill='%23000'/%3E%3Crect x='3' y='4' width='6' height='1' fill='%23222'/%3E%3Crect x='5' y='5' width='2' height='3' fill='%23222'/%3E%3C/svg%3E",
    dmg: 50,
  },
];

export let bossState = {
  hp: 3,
  MAX_HP: 3,
  currentBoss: null,
  targetData: null,
  correctAnswer: '',
  questType: '',
};

export function setupBossEncounter() {
  sfx.boss();
  bossState.hp = bossState.MAX_HP;
  bossState.currentBoss =
    BOSS_LIST[Math.floor(Math.random() * BOSS_LIST.length)];
  return bossState.currentBoss;
}

export function processBossAnswer(isCorrect) {
  if (isCorrect) {
    sfx.mine();
    setTimeout(sfx.correct, 100);
    bossState.hp--;
    return { defeated: bossState.hp <= 0, dmg: 0 };
  } else {
    let dmg = calculateDamage(bossState.currentBoss.dmg);
    return { defeated: false, dmg: dmg };
  }
}
