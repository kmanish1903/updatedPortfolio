// Web Audio API Synthesizer for High-Tech Cyberpunk sound effects
// Pure synthesized audio - no external mp3 loads required, instant loading!

let isMuted = true; // Start muted by default to follow browser autoplay policies

export const getMutedState = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('sound_muted');
    if (saved !== null) {
      isMuted = saved === 'true';
    }
  }
  return isMuted;
};

export const setMutedState = (mute: boolean) => {
  isMuted = mute;
  if (typeof window !== 'undefined') {
    localStorage.setItem('sound_muted', String(mute));
  }
};

// Create web audio context helper
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Play a futuristic light hover tick
export const playHover = () => {
  if (getMutedState()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.05);
  
  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
};

// Play a digital click confirmation tone
export const playClick = () => {
  if (getMutedState()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(800, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
  
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(1000, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
  
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
  
  osc1.start(ctx.currentTime);
  osc2.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.08);
  osc2.stop(ctx.currentTime + 0.08);
};

// Play ascending digital pipeline success chime
export const playSuccess = () => {
  if (getMutedState()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major chord
  
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + index * 0.08);
    
    gain.gain.setValueAtTime(0.04, now + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.25);
    
    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 0.25);
  });
};

// Play dynamic low processing pulse hum
export const playProcessPulse = (duration: number = 0.5) => {
  if (getMutedState()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(60, ctx.currentTime); // 60Hz power hum
  osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + duration);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(150, ctx.currentTime);
  filter.Q.setValueAtTime(5, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + duration);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
};
