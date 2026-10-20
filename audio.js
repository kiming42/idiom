// =====================================
// 🔊 audio.js (音效與語音獨立模組)
// =====================================

let audioCtx;
export function initAudio() {
  try {
    if (!audioCtx)
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) {
    console.error('Audio init error', e);
  }
}

function playTone(freq, type, duration, vol = 0.1) {
  try {
    if (!audioCtx) return;
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioCtx.currentTime + duration
    );
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

export const sfx = {
  correct: () => {
    playTone(523.25, 'sine', 0.1);
    setTimeout(() => playTone(659.25, 'sine', 0.1), 100);
    setTimeout(() => playTone(783.99, 'sine', 0.2), 200);
  },
  wrong: () => {
    playTone(150, 'sawtooth', 0.3, 0.15);
  },
  move: () => {
    playTone(300, 'sine', 0.05, 0.03);
  },
  mine: () => {
    playTone(200, 'square', 0.1, 0.05);
  },
  craft: () => {
    playTone(400, 'triangle', 0.1);
    setTimeout(() => playTone(800, 'triangle', 0.2), 100);
  },
  eat: () => {
    playTone(600, 'sine', 0.1);
    setTimeout(() => playTone(800, 'sine', 0.1), 150);
  },
  boss: () => {
    playTone(100, 'square', 0.5);
    setTimeout(() => playTone(80, 'square', 0.8), 500);
  },
  hit: () => {
    playTone(150, 'sawtooth', 0.2);
    setTimeout(() => playTone(100, 'sawtooth', 0.2), 150);
  },
};

export function stopTTS() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

export function speakText(text, onEndCallback) {
  try {
    initAudio();
    stopTTS();
    let u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-HK';
    u.onend = onEndCallback;
    u.onerror = onEndCallback;
    speechSynthesis.speak(u);
  } catch (e) {
    console.error('TTS Error', e);
    if (onEndCallback) onEndCallback();
  }
}
