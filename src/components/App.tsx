import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Bird } from './Bird';
import { type LeafData } from './Tree';
import { Hero, Arrival, Departure, DestinationPanel, Return, CTA, Foot } from './Sections';

// ────────────────────────────────────────────────
// Destinations data
// ────────────────────────────────────────────────
const DESTINATIONS = [
  {
    num: 1, place: 'Backwater Serenity', country: 'South India', day: 4,
    coords: 'N 9.30° · E 76.40°',
    diary: 'Day 04 — the bird found a mirror made of water, and saw the sky resting.',
    palette: { bg: '#7a9898', accent: '#c8b48a', leaf: '#88a6b3' },
    offer: { tagline: 'Calm waters, coconut palms, and a houseboat that moves like a slow thought.' },
    sceneName: 'SceneBackwater',
  },
  {
    num: 2, place: 'Misty Hill Escapes', country: 'Western Ghats', day: 12,
    coords: 'N 11.70° · E 76.00°',
    diary: 'Day 12 — the bird flew between hills so wrapped in mist it forgot which was cloud.',
    palette: { bg: '#6a8a60', accent: '#dce4d8', leaf: '#859a73' },
    offer: { tagline: 'Layered ridges that breathe. Tea, spice, silence, and hidden water falling somewhere below.' },
    sceneName: 'SceneMistyHills',
  },
  {
    num: 3, place: 'Tea Country Dreams', country: 'The High Plantations', day: 22,
    coords: 'N 10.08° · E 77.06°',
    diary: 'Day 22 — every leaf was a careful poem. The bird stayed a long time.',
    palette: { bg: '#8aaa6a', accent: '#d99a4b', leaf: '#9eb47e' },
    offer: { tagline: 'Rolling hills stitched with tea rows, golden-hour light, and the meditative smell of things growing slowly.' },
    sceneName: 'SceneTeaCountry',
  },
  {
    num: 4, place: 'Waterfall & Jungle', country: 'The Living Forest', day: 35,
    coords: 'N 25.20° · E 91.70°',
    diary: 'Day 35 — the water fell from somewhere the bird could not see. It fell forever.',
    palette: { bg: '#2a4a32', accent: '#a8c0d0', leaf: '#5d7a52' },
    offer: { tagline: 'Moss-soaked rocks, cascades that never stop, and a jungle so dense the light arrives in pieces.' },
    sceneName: 'SceneWaterfall',
  },
  {
    num: 5, place: 'Alpine Meadows', country: 'The High Mountains', day: 48,
    coords: 'N 32.22° · E 77.18°',
    diary: 'Day 48 — the bird touched snow and the world grew very quiet and very large.',
    palette: { bg: '#88aac8', accent: '#e8eef4', leaf: '#c0cc99' },
    offer: { tagline: 'High valleys, wildflowers at altitude, snow-peak glimpses, and a sky with no edges.' },
    sceneName: 'SceneAlpine',
  },
];

// ────────────────────────────────────────────────
// Time-of-day palette interpolation
// ────────────────────────────────────────────────
const TOD_KEYS = {
  golden: { top: '#e8c184', mid: '#eadcb6', bot: '#f1e8d2', ink: '#1b2317', veil: 'rgba(217,154,75,0.10)' },
  day: { top: '#c8d8e0', mid: '#e2dcc6', bot: '#f1e8d2', ink: '#1b2317', veil: 'rgba(0,0,0,0)' },
  dusk: { top: '#6a6a92', mid: '#c08a6a', bot: '#d99a4b', ink: '#231b2a', veil: 'rgba(106,106,146,0.16)' },
  night: { top: '#1c172a', mid: '#362338', bot: '#61343a', ink: '#e8e0c4', veil: 'rgba(0,0,0,0.40)' },
  pitchBlack: { top: '#000000', mid: '#000000', bot: '#000000', ink: '#e8e0c4', veil: 'rgba(0,0,0,0)' },
};

function lerpColor(a: string, b: string, t: number): string {
  const A = a.match(/\w\w/g)?.map((c) => parseInt(c, 16)) || [0,0,0];
  const B = b.match(/\w\w/g)?.map((c) => parseInt(c, 16)) || [0,0,0];
  const r = Math.round(A[0] + (B[0] - A[0]) * t);
  const g = Math.round(A[1] + (B[1] - A[1]) * t);
  const bl = Math.round(A[2] + (B[2] - A[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function lerpRgba(a: string, b: string, t: number): string {
  const parse = (s: string) => {
    const m = s.match(/rgba?\((\d+),(\d+),(\d+),?([\d.]+)?\)/);
    if (!m) return [0,0,0,1];
    return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), parseFloat(m[4] || '1')];
  };
  const A = parse(a);
  const B = parse(b);
  const r = Math.round(A[0] + (B[0] - A[0]) * t);
  const g = Math.round(A[1] + (B[1] - A[1]) * t);
  const bl = Math.round(A[2] + (B[2] - A[2]) * t);
  const al = (A[3] + (B[3] - A[3]) * t).toFixed(3);
  return `rgba(${r},${g},${bl},${al})`;
}

function todAtProgress(p: number, nightProgress: number, blackProgress: number) {
  let a: (typeof TOD_KEYS)[keyof typeof TOD_KEYS], b: (typeof TOD_KEYS)[keyof typeof TOD_KEYS], t: number;
  
  if (blackProgress > 0) {
    a = TOD_KEYS.night; b = TOD_KEYS.pitchBlack; t = blackProgress;
  } else if (nightProgress > 0) {
    if (nightProgress < 0.5) {
      a = TOD_KEYS.day; b = TOD_KEYS.dusk; t = nightProgress / 0.5;
    } else {
      a = TOD_KEYS.dusk; b = TOD_KEYS.night; t = (nightProgress - 0.5) / 0.5;
    }
  } else {
    if (p < 0.15) { 
      a = TOD_KEYS.golden; b = TOD_KEYS.day; t = p / 0.15; 
    } else { 
      a = TOD_KEYS.day; b = TOD_KEYS.day; t = 0; 
    }
  }
  t = Math.max(0, Math.min(1, t));
  return {
    top: lerpColor(a.top, b.top, t),
    mid: lerpColor(a.mid, b.mid, t),
    bot: lerpColor(a.bot, b.bot, t),
    ink: lerpColor(a.ink, b.ink, t),
    veil: lerpRgba(a.veil, b.veil, t),
  };
}

function applyTOD(tod: ReturnType<typeof todAtProgress>) {
  const root = document.documentElement;
  root.style.setProperty('--tod-sky-top', tod.top);
  root.style.setProperty('--tod-sky-mid', tod.mid);
  root.style.setProperty('--tod-sky-bot', tod.bot);
  root.style.setProperty('--tod-ink', tod.ink);
  root.style.setProperty('--tod-veil', tod.veil);
}

// ────────────────────────────────────────────────
// BirdMount — renders into the fixed bird div
// ────────────────────────────────────────────────
function BirdMount() {
  const [mode, setMode] = useState<'glide' | 'flap' | 'perch'>('glide');
  useEffect(() => {
    const el = document.getElementById('birdFixed');
    if (!el) return;
    let raf: number;
    const tick = () => {
      const m = (el.dataset.mode || 'glide') as 'glide' | 'flap' | 'perch';
      setMode(prev => prev !== m ? m : prev);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <Bird mode={mode} size={56} />;
}

// ────────────────────────────────────────────────
// Main App
// ────────────────────────────────────────────────
export default function App() {
  const [leavesOnTree, setLeavesOnTree] = useState<LeafData[]>([]);
  const [day, setDay] = useState(1);
  const [soundOn, setSoundOn] = useState(false);
  const [preloadOff, setPreloadOff] = useState(false);

  const flightSvgRef = useRef<SVGSVGElement | null>(null);
  const flightPathRef = useRef<SVGPathElement | null>(null);
  const flightPathDrawnRef = useRef<SVGPathElement | null>(null);
  const flightLayerRef = useRef<HTMLDivElement | null>(null);
  const birdRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<{ ctx: AudioContext; master: GainNode } | null>(null);
  const seenDestRef = useRef(new Set<number>());
  const birdMountRef = useRef<ReturnType<typeof import('react-dom/client').createRoot> | null>(null);

  // Bird position state — target updated on every scroll event, lerped in rAF
  const birdTarget = useRef({ x: -100, y: -100, ang: 0, flip: false });
  const birdCurrent = useRef({ x: -100, y: -100 });

  // Wire DOM refs
  useEffect(() => {
    flightSvgRef.current = document.getElementById('flightSvg') as SVGSVGElement;
    flightPathRef.current = document.getElementById('flightPath') as SVGPathElement;
    flightPathDrawnRef.current = document.getElementById('flightPathDrawn') as SVGPathElement;
    flightLayerRef.current = document.getElementById('flightLayer') as HTMLDivElement;
    birdRef.current = document.getElementById('birdFixed') as HTMLDivElement;

    // Mount bird react root into the fixed bird element
    const birdEl = document.getElementById('birdFixed');
    if (birdEl && !birdMountRef.current) {
      import('react-dom/client').then(({ createRoot }) => {
        birdMountRef.current = createRoot(birdEl);
        birdMountRef.current.render(<BirdMount />);
      });
    }
  }, []);

  // Preloader
  useEffect(() => {
    const root = document.getElementById('preloader');
    const seed = document.getElementById('seedPath') as SVGPathElement | null;
    if (!seed || !root) return;
    const len = seed.getTotalLength();
    seed.style.strokeDasharray = `${len}`;
    seed.style.strokeDashoffset = `${len}`;
    seed.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.55,.05,.2,1)';
    requestAnimationFrame(() => { seed.style.strokeDashoffset = '0'; });
    setTimeout(() => root.classList.add('ready'), 1400);
    setTimeout(() => { root.classList.add('hide'); setPreloadOff(true); }, 2400);
  }, []);

  // Build flight path
  const rebuildPath = useCallback(() => {
    const layer = flightLayerRef.current;
    const svg = flightSvgRef.current;
    const path = flightPathRef.current;
    const drawn = flightPathDrawnRef.current;
    if (!layer || !svg || !path || !drawn) { setTimeout(rebuildPath, 300); return; }

    const missingDest = DESTINATIONS.some(d => !document.getElementById(`d-${d.num}`));
    if (missingDest || !document.getElementById('return') || !document.getElementById('begin') || !document.querySelector('footer.foot')) {
      setTimeout(rebuildPath, 300); return;
    }

    layer.style.display = 'none';
    const docH = document.documentElement.scrollHeight;
    layer.style.display = 'block';
    layer.style.height = `${docH}px`;
    svg.setAttribute('viewBox', `0 0 1000 ${docH}`);

    const vw = window.innerWidth;
    function pageY(el: Element | null, offsetY = 0) {
      if (!el) return 0;
      return el.getBoundingClientRect().top + window.scrollY + offsetY;
    }
    function vbX(screenX: number) { return (screenX / vw) * 1000; }

    const heroSky = { x: vbX(vw * 0.78), y: pageY(document.getElementById('wish'), 240) };
    const heroDown = { x: vbX(vw * 0.55), y: pageY(document.getElementById('arrival'), -60) };
    const branchLand = { x: vbX(vw * 0.52), y: pageY(document.querySelector('#arrival .branch-stage'), 360) };
    const lift = { x: vbX(vw * 0.50), y: pageY(document.getElementById('departure'), 80) };
    const skyHigh = { x: vbX(vw * 0.32), y: pageY(document.getElementById('departure'), 380) };

    const destPts = DESTINATIONS.map((d, i) => {
      const sec = document.getElementById(`d-${d.num}`);
      // Revert to alternating side to follow the alternating layout
      const side = i % 2 === 0 ? 0.80 : 0.20;
      return { x: vbX(vw * side), y: pageY(sec, 280) };
    });

    const isMobile = vw <= 880;
    const returnSky  = { x: vbX(vw * 0.50), y: pageY(document.getElementById('return'), 80) };
    // The tree is painted into the right side of the return background image.
    const returnTree = { x: vbX(isMobile ? vw * 0.5 : vw * 0.75), y: pageY(document.getElementById('return'), isMobile ? 400 : 600) };

    const pts = [heroSky, heroDown, branchLand, lift, skyHigh, ...destPts, returnSky, returnTree];

    function smoothPath(P: { x: number; y: number }[]) {
      if (P.length < 2) return '';
      let lastY = -Infinity;
      const safe = P.map(p => {
        const y = Math.max(p.y, lastY + 30);
        lastY = y;
        return { x: p.x, y };
      });
      let d = `M ${safe[0].x.toFixed(1)} ${safe[0].y.toFixed(1)}`;
      for (let i = 0; i < safe.length - 1; i++) {
        const p0 = safe[i], p1 = safe[i + 1];
        const dy = p1.y - p0.y;
        d += ` C ${p0.x.toFixed(1)} ${(p0.y + dy * 0.52).toFixed(1)}, ${p1.x.toFixed(1)} ${(p1.y - dy * 0.52).toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      }
      return d;
    }

    const pathD = smoothPath(pts);
    path.setAttribute('d', pathD);
    drawn.setAttribute('d', pathD);

    const total = drawn.getTotalLength();
    drawn.dataset.total = String(total);
    drawn.style.strokeDasharray = `${total}`;
    drawn.style.strokeDashoffset = `${total}`;
    drawn.classList.remove('drawn');
    drawn.classList.add('drawn-solid');

    const maxSy = Math.max(100, returnTree.y - window.innerHeight * 0.5);
    path.dataset.maxSy = String(maxSy);
    drawn.dataset.maxSy = String(maxSy);
  }, []);

  useEffect(() => {
    if (!preloadOff) return;
    const t1 = setTimeout(rebuildPath, 80);
    const t2 = setTimeout(rebuildPath, 700);
    const t3 = setTimeout(rebuildPath, 1800);
    const t4 = setTimeout(rebuildPath, 3500);
    window.addEventListener('load', rebuildPath);
    let scrolledOnce = false;
    const onFirstScroll = () => { if (!scrolledOnce) { scrolledOnce = true; setTimeout(rebuildPath, 80); } };
    window.addEventListener('scroll', onFirstScroll, { passive: true });
    const onResize = () => setTimeout(rebuildPath, 80);
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      window.removeEventListener('load', rebuildPath);
      window.removeEventListener('scroll', onFirstScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [preloadOff, rebuildPath]);

  // Scroll loop — TOD, diary, leaves, path drawing.
  // Bird position is handled separately via scroll event (below) for zero-lag tracking.
  useEffect(() => {
    if (!preloadOff) return;
    let raf: number;

    const loop = () => {
      const sy = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.max(0, Math.min(1, sy / docH)) : 0;
      document.documentElement.style.setProperty('--t', p.toFixed(4));
      
      let opacity = 1;
      let blackProgress = 0;
      const returnEl = document.getElementById('return');
      if (returnEl && docH > 0) {
        // Start fading the day image out when the user scrolls into the section gap
        const fadeStart = returnEl.offsetTop - window.innerHeight * 0.7;
        const fadeEnd = returnEl.offsetTop + window.innerHeight * 0.1;
        
        if (sy > fadeStart) {
          opacity = 1 - (sy - fadeStart) / (fadeEnd - fadeStart);
        }
        opacity = Math.max(0, Math.min(1, opacity));
      }
      
      const ctaEl = document.getElementById('begin');
      if (ctaEl && docH > 0) {
        // Start fading page background to solid pitch black when entering CTA section
        const blackFadeStart = ctaEl.offsetTop - window.innerHeight;
        const blackFadeEnd = ctaEl.offsetTop - window.innerHeight * 0.5;
        
        if (sy > blackFadeStart) {
          blackProgress = (sy - blackFadeStart) / (blackFadeEnd - blackFadeStart);
        }
        blackProgress = Math.max(0, Math.min(1, blackProgress));
      }
      
      document.documentElement.style.setProperty('--day-opacity', String(opacity));
      const nightProgress = 1 - opacity;
      
      applyTOD(todAtProgress(p, nightProgress, blackProgress));

      const drawn = flightPathDrawnRef.current;
      if (drawn) {
        const total = parseFloat(drawn.dataset.total ?? '0') || drawn.getTotalLength();
        const maxSy = parseFloat(drawn.dataset.maxSy || String(docH));
        const pathP = maxSy > 0 ? Math.max(0, Math.min(1, sy / maxSy)) : 0;
        drawn.style.strokeDashoffset = `${total * (1 - pathP)}`;
      }

      // Lerp bird toward scroll-updated target — smooth catch-up, no jitter
      const bird = birdRef.current;
      const tgt = birdTarget.current;
      const cur = birdCurrent.current;
      if (bird && tgt.x > -99) {
        const ease = 0.18;
        cur.x += (tgt.x - cur.x) * ease;
        cur.y += (tgt.y - cur.y) * ease;
        const hw = bird.offsetWidth / 2;
        bird.style.transform = `translate3d(${(cur.x - hw).toFixed(1)}px, ${(cur.y - hw).toFixed(1)}px, 0) ${tgt.flip ? 'scaleX(-1)' : ''} rotate(${tgt.ang.toFixed(2)}deg)`;
        if (!bird.classList.contains('ready')) bird.classList.add('ready');
      }

      // Day counter
      const sy2 = window.scrollY;
      const docH2 = document.documentElement.scrollHeight - window.innerHeight;
      const p2 = docH2 > 0 ? Math.max(0, Math.min(1, sy2 / docH2)) : 0;
      const dayVal = Math.round(1 + 74 * Math.max(0, Math.min(1, (p2 - 0.04) / 0.86)));
      setDay(prev => prev !== dayVal ? dayVal : prev);

      // Show diary chip
      const chip = document.getElementById('cornerBl');
      if (chip) chip.classList.toggle('in', p2 > 0.04);

      // Drop leaves
      DESTINATIONS.forEach((d, i) => {
        const sec = document.getElementById(`d-${d.num}`);
        if (!sec) return;
        if (sec.getBoundingClientRect().top < window.innerHeight * 0.55 && !seenDestRef.current.has(d.num)) {
          seenDestRef.current.add(d.num);
          const slotMap = [4, 6, 0, 9, 2];
          setLeavesOnTree(prev => [...prev, {
            slotIndex: slotMap[i] ?? prev.length * 2,
            color: d.palette.leaf,
            label: d.place,
            tip: d.place,
            key: `d-leaf-${d.num}`,
          }]);
        }
      });

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [preloadOff]);

  // Bird position — fires on every scroll event for zero-lag path tracking.
  // Updates birdTarget ref; rAF lerps toward it.
  useEffect(() => {
    if (!preloadOff) return;

    const syncBird = () => {
      const path = flightPathRef.current;
      const bird = birdRef.current;
      if (!path || !bird) return;
      try {
        const total = path.getTotalLength();
        if (total <= 0) return;
        const sy = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const maxSy = parseFloat(path.dataset.maxSy || String(docH));
        const p = maxSy > 0 ? Math.max(0, Math.min(1, sy / maxSy)) : 0;
        const len = total * p;
        const pt = path.getPointAtLength(len);
        const pt2 = path.getPointAtLength(Math.min(total, len + 8));
        const hw = window.innerWidth;
        const screenX = Math.max(-56, Math.min(hw + 56, (pt.x / 1000) * hw));
        const screenY = Math.max(-56, Math.min(window.innerHeight + 56, pt.y - sy));
        const dx = pt2.x - pt.x, dy = pt2.y - pt.y;
        const ang = Math.atan2(dy, dx) * 180 / Math.PI;
        const flip = dx < -0.01;

        birdTarget.current = { x: screenX, y: screenY, ang: flip ? -ang + 180 : ang, flip };

        // Mode for wing animation
        const Hero = 0.04, Arrive = 0.12, Lift = 0.22, FlyEnd = 0.78, ReturnPerch = 0.86;
        let mode = 'glide';
        if (p < Hero) mode = 'glide';
        else if (p < Arrive + 0.02) mode = 'flap';
        else if (p < Lift) mode = 'perch';
        else if (p < Lift + 0.04) mode = 'flap';
        else if (p < FlyEnd) mode = 'glide';
        else if (p < ReturnPerch) mode = 'flap';
        else mode = 'perch';
        bird.dataset.mode = mode;
      } catch (_) { /* ignore */ }
    };

    // Sync once immediately, then on every scroll
    syncBird();
    window.addEventListener('scroll', syncBird, { passive: true });
    return () => window.removeEventListener('scroll', syncBird);
  }, [preloadOff]);

  // Sound
  const toggleSound = useCallback(() => {
    if (!soundOn) {
      try {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AC();
        const master = ctx.createGain();
        master.gain.value = 0.0;
        master.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.2);
        master.connect(ctx.destination);
        const noise = ctx.createBufferSource();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
        noise.buffer = buf;
        noise.loop = true;
        const nf = ctx.createBiquadFilter();
        nf.type = 'lowpass'; nf.frequency.value = 380;
        const ng = ctx.createGain(); ng.gain.value = 0.35;
        noise.connect(nf).connect(ng).connect(master);
        noise.start();
        const notes = [880, 988, 1175, 1318, 1568];
        const chirp = () => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          const f = notes[Math.floor(Math.random() * notes.length)] * (Math.random() > 0.5 ? 1 : 1.5);
          osc.type = 'sine'; osc.frequency.value = f;
          g.gain.value = 0;
          g.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
          osc.connect(g).connect(master);
          osc.start(); osc.stop(ctx.currentTime + 0.3);
          setTimeout(chirp, 1200 + Math.random() * 3000);
        };
        chirp();
        audioRef.current = { ctx, master };
        setSoundOn(true);
      } catch (_) { }
    } else {
      if (audioRef.current) {
        try { audioRef.current.master.gain.exponentialRampToValueAtTime(0.0001, audioRef.current.ctx.currentTime + 0.4); } catch (_) { }
        setTimeout(() => { try { audioRef.current?.ctx.close(); } catch (_) { } }, 500);
      }
      audioRef.current = null;
      setSoundOn(false);
    }
  }, [soundOn]);

  // Wire sound button
  useEffect(() => {
    const btn = document.getElementById('soundToggle');
    const lbl = document.getElementById('soundLabel');
    if (!btn || !lbl) return;
    btn.classList.toggle('active', soundOn);
    btn.setAttribute('aria-pressed', String(soundOn));
    lbl.textContent = soundOn ? 'ambient on' : 'silent';
    btn.addEventListener('click', toggleSound);
    return () => btn.removeEventListener('click', toggleSound);
  }, [soundOn, toggleSound]);

  // Day counter display
  useEffect(() => {
    const dn = document.getElementById('dayNum');
    if (dn) dn.textContent = String(day).padStart(2, '0');
  }, [day]);

  const onLeafClick = useCallback((leaf: LeafData) => {
    const dest = DESTINATIONS.find(d => d.place === leaf.label);
    if (dest) {
      const target = document.getElementById(`d-${dest.num}`);
      if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <Hero leavesOnTree={leavesOnTree} onLeafClick={onLeafClick} />
      <Arrival />
      <Departure />

      <section id="stories" style={{ minHeight: 'auto', padding: '8vh var(--pad) 0' }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', display: 'flex', gap: 'clamp(16px, 3vw, 40px)', alignItems: 'end', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow">iv — the stories the bird brings back</div>
            <h2 className="big display" style={{ marginTop: 18, maxWidth: '22ch' }}>
              Five letters from a sky<br />the tree will never see.
            </h2>
          </div>
          <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink-soft)', maxWidth: '28ch' }}>
            misty hills that breathe, waters that mirror the sky, places where tea grows like prayers, jungles alive with falling water, and mountains that touch the clouds.
          </div>
        </div>
        <div className="hr-thin" style={{ marginTop: 56, maxWidth: 'var(--maxw)', marginInline: 'auto' }} />
      </section>

      {DESTINATIONS.map((d, i) => (
        <DestinationPanel
          key={d.num}
          {...d}
          position={i % 2 === 0 ? 'left' : 'right'}
        />
      ))}

      <Return onLeafClick={onLeafClick} />
      <CTA />
      <Foot />
    </>
  );
}
