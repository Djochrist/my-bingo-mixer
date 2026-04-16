let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}


function makeFilter(ac: AudioContext, type: BiquadFilterType, freq: number, q = 1) {
  const f = ac.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
}

export function playTick() {
  try {
    const ac = getCtx();
    const t = ac.currentTime;

    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const filter = makeFilter(ac, 'highpass', 1200, 0.8);

    osc.type = 'square';
    osc.frequency.setValueAtTime(1100, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.025);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);
    osc.start(t);
    osc.stop(t + 0.06);

    const bufSize = Math.floor(ac.sampleRate * 0.018);
    const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const noise = ac.createBufferSource();
    const noiseGain = ac.createGain();
    noise.buffer = buf;
    noiseGain.gain.setValueAtTime(0.08, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
    noise.connect(noiseGain);
    noiseGain.connect(ac.destination);
    noise.start(t);
  } catch {}
}

export function playUnmark() {
  try {
    const ac = getCtx();
    const t = ac.currentTime;

    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.08);
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.09);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  } catch {}
}

export function playMark() {
  try {
    const ac = getCtx();
    const t = ac.currentTime;

    const freqs = [880, 1760];
    freqs.forEach((freq, i) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.75, t + 0.12);
      gain.gain.setValueAtTime(i === 0 ? 0.20 : 0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    });

    const bufSize = Math.floor(ac.sampleRate * 0.012);
    const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2);
    const noise = ac.createBufferSource();
    const noiseGain = ac.createGain();
    const noiseFilter = makeFilter(ac, 'bandpass', 2400, 1.5);
    noise.buffer = buf;
    noiseGain.gain.setValueAtTime(0.12, t);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ac.destination);
    noise.start(t);
  } catch {}
}

export function playSuccess() {
  try {
    const ac = getCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const delays = [0, 0.09, 0.18, 0.27];
    notes.forEach((freq, i) => {
      const t = ac.currentTime + delays[i];
      const osc = ac.createOscillator();
      const osc2 = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'sine';
      osc2.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq * 2, t);
      gain.gain.setValueAtTime(0.16, t);
      gain.gain.linearRampToValueAtTime(0.10, t + 0.15);
      gain.gain.linearRampToValueAtTime(0, t + 0.32);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ac.destination);
      osc.start(t); osc.stop(t + 0.33);
      osc2.start(t); osc2.stop(t + 0.33);
    });
  } catch {}
}

export function playBingo() {
  try {
    const ac = getCtx();
    const melody = [523.25, 659.25, 783.99, 1046.5, 987.77, 1174.66, 1567.98];
    const times  = [0,      0.10,   0.20,   0.32,   0.50,   0.62,    0.76];
    const vols   = [0.20,   0.20,   0.20,   0.22,   0.20,   0.22,    0.26];

    melody.forEach((freq, i) => {
      const t = ac.currentTime + times[i];
      const dur = i === melody.length - 1 ? 0.55 : 0.22;

      ['sine', 'triangle'].forEach((type, j) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = type as OscillatorType;
        osc.frequency.setValueAtTime(j === 0 ? freq : freq * 2, t);
        gain.gain.setValueAtTime(vols[i] * (j === 0 ? 1 : 0.28), t);
        gain.gain.linearRampToValueAtTime(0, t + dur);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(t); osc.stop(t + dur + 0.01);
      });
    });
  } catch {}
}

export function playCardFlip() {
  try {
    const ac = getCtx();
    const t = ac.currentTime;
    const duration = 0.065;
    const bufSize = Math.floor(ac.sampleRate * duration);
    const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      const env = Math.pow(1 - i / bufSize, 2.5);
      data[i] = (Math.random() * 2 - 1) * env;
    }

    const source = ac.createBufferSource();
    const filter = makeFilter(ac, 'bandpass', 4500, 0.6);
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.30, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    source.buffer = buf;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);
    source.start(t);

    const osc = ac.createOscillator();
    const oscGain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(3200, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.04);
    oscGain.gain.setValueAtTime(0.07, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(oscGain);
    oscGain.connect(ac.destination);
    osc.start(t); osc.stop(t + 0.05);
  } catch {}
}
