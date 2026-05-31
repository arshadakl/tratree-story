import React, { useEffect, useRef, useMemo } from 'react';

const LEAF_SLOTS = [
  { x: 175, y: 285, rot: -22 },
  { x: 145, y: 350, rot: -34 },
  { x: 200, y: 220, rot: -10 },
  { x: 250, y: 175, rot: 6 },
  { x: 305, y: 145, rot: 0 },
  { x: 380, y: 175, rot: 12 },
  { x: 430, y: 220, rot: 22 },
  { x: 460, y: 290, rot: 30 },
  { x: 425, y: 360, rot: 26 },
  { x: 365, y: 410, rot: 18 },
  { x: 230, y: 410, rot: -16 },
  { x: 310, y: 430, rot: 0 },
];

export { LEAF_SLOTS };

export interface LeafData {
  slotIndex: number;
  color: string;
  label: string;
  tip?: string;
  key: string;
}

function LeafShape({ fill = '#9eb47e', stroke = '#2c4b2e', size = 28 }: { fill?: string; stroke?: string; size?: number }) {
  const id = `lg-${fill.replace('#', '')}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={fill} stopOpacity="1" />
          <stop offset="1" stopColor={fill} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path d="M3 13 C 6 4, 18 4, 21 13 C 18 21, 6 21, 3 13 Z"
            fill={`url(#${id})`} stroke={stroke} strokeWidth="0.7" />
      <path d="M3 13 C 9 11, 15 11, 21 13" stroke={stroke} strokeWidth="0.6" fill="none" />
      <path d="M12 5 L 12 21" stroke={stroke} strokeWidth="0.5" fill="none" opacity="0.5" />
    </svg>
  );
}

function PostcardLeaf({ color, label, onClick }: { color: string; label: string; onClick?: () => void }) {
  const gradId = `pl-${label.replace(/\s/g, '')}`;
  return (
    <button
      style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}
      onClick={onClick}
      aria-label={label}
    >
      <svg viewBox="0 0 32 32" width="100%" height="100%">
        <defs>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={color} />
            <stop offset="1" stopColor={color} stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <path d="M4 17 C 7 5, 25 5, 28 17 C 25 28, 7 28, 4 17 Z"
              fill={`url(#${gradId})`} stroke="#2c4b2e" strokeWidth="0.8" />
        <path d="M4 17 C 11 14, 21 14, 28 17" stroke="#2c4b2e" strokeWidth="0.6" fill="none" />
        <path d="M16 7 L 16 27" stroke="#2c4b2e" strokeWidth="0.5" fill="none" opacity="0.4" />
        <circle cx="22" cy="13" r="1.8" fill="#fff" opacity="0.7" />
      </svg>
    </button>
  );
}

interface TreeProps {
  variant?: 'bare' | 'full' | 'progressive';
  leaves?: LeafData[];
  showEggs?: boolean;
  showNest?: boolean;
  onLeafClick?: (leaf: LeafData) => void;
}

export function Tree({ variant = 'progressive', leaves = [], showEggs = false, showNest = false, onLeafClick }: TreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    let raf: number;
    let target = 0;
    let current = 0;

    function onMove(e: PointerEvent) {
      target = ((e.clientX / window.innerWidth) - 0.5) * 2;
    }
    function loop(t: number) {
      current += (target - current) * 0.04;
      const breath = Math.sin(t / 1200) * 0.25;
      el.style.setProperty('--tilt', (current + breath).toFixed(3));
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const allLeaves = useMemo(() => {
    if (variant === 'full') {
      const palette = ['#9eb47e', '#c66a3c', '#d99a4b', '#88a6b3', '#859a73', '#b07026',
                       '#9eb47e', '#c66a3c', '#d99a4b', '#88a6b3', '#859a73', '#b07026'];
      return LEAF_SLOTS.map((_, i) => ({ slotIndex: i, color: palette[i % palette.length], label: `leaf-${i}`, key: `l-${i}` }));
    }
    return leaves;
  }, [variant, leaves]);

  return (
    <div className="tree-wrap" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <style>{`
        .tree-wrap svg.tree { display: block; width: 100%; height: 100%; }
        .tree-wrap .sway {
          transform-origin: var(--ox, 300px) var(--oy, 500px);
          transform: rotate(calc(var(--tilt, 0) * var(--amp, 1.4deg)));
          transition: transform 240ms ease;
        }
        .tree-wrap .leaves-layer { position: absolute; inset: 0; pointer-events: none; }
        .tree-wrap .leaves-layer .leaf-marker { pointer-events: auto; }
        .tree-wrap .nest-twig { stroke: #5a3a23; stroke-width: 1.2; stroke-linecap: round; fill: none; }
        .tree-wrap .egg { fill: #f5e7c3; stroke: #b07026; stroke-width: 0.6; filter: drop-shadow(0 0 6px rgba(245,231,195,0.7)); }
      `}</style>

      <svg ref={svgRef} className="tree" viewBox="0 0 600 800"
           preserveAspectRatio="xMidYMax meet" aria-label="An old, gently stylized tree">
        <defs>
          <filter id="watercolor" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="bigNoise"/>
            <feDisplacementMap in="SourceGraphic" in2="bigNoise" scale="14" result="displaced"/>
            <feMorphology in="displaced" operator="dilate" radius="1.4" result="thick"/>
            <feComposite in="thick" in2="displaced" operator="out" result="ring"/>
            <feGaussianBlur in="ring" stdDeviation="1.4" result="ringSoft"/>
            <feColorMatrix in="ringSoft" values="0.45 0 0 0 0  0 0.45 0 0 0  0 0 0.45 0 0  0 0 0 0.85 0" result="darkRing"/>
            <feMerge><feMergeNode in="displaced"/><feMergeNode in="darkRing"/></feMerge>
          </filter>
          <filter id="paperBleed" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="6" result="big"/>
            <feDisplacementMap in="SourceGraphic" in2="big" scale="10" result="disp"/>
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="9" result="grain"/>
            <feColorMatrix in="grain" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0" result="grainA"/>
            <feComposite in="grainA" in2="disp" operator="in" result="grainIn"/>
            <feMerge><feMergeNode in="disp"/><feMergeNode in="grainIn"/></feMerge>
          </filter>
          <filter id="wetEdge" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed="2" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="18" result="d"/>
            <feMorphology in="d" operator="dilate" radius="2" result="thick"/>
            <feComposite in="thick" in2="d" operator="out" result="ring"/>
            <feGaussianBlur in="ring" stdDeviation="2.2" result="ringSoft"/>
            <feColorMatrix in="ringSoft" values="0.25 0 0 0 0  0 0.30 0 0 0  0 0 0.20 0 0  0 0 0 0.95 0" result="darkRing"/>
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="11" result="gr"/>
            <feColorMatrix in="gr" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.30 0" result="grA"/>
            <feComposite in="grA" in2="d" operator="in" result="grIn"/>
            <feMerge><feMergeNode in="d"/><feMergeNode in="grIn"/><feMergeNode in="darkRing"/></feMerge>
          </filter>
          <radialGradient id="mound" cx="0.5" cy="0.4" r="0.8">
            <stop offset="0" stopColor="#7c5734" />
            <stop offset="0.6" stopColor="#5a3a23" />
            <stop offset="1" stopColor="#38220f" />
          </radialGradient>
          <linearGradient id="bark" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#3d2615" />
            <stop offset="0.4" stopColor="#5a3a23" />
            <stop offset="0.7" stopColor="#7c5734" />
            <stop offset="1" stopColor="#3d2615" />
          </linearGradient>
          <radialGradient id="foliage1" cx="0.4" cy="0.45" r="0.65">
            <stop offset="0" stopColor="#bccb95" stopOpacity="0.95" />
            <stop offset="0.7" stopColor="#7e9764" stopOpacity="0.85" />
            <stop offset="1" stopColor="#3b5a3a" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id="foliage2" cx="0.5" cy="0.5" r="0.65">
            <stop offset="0" stopColor="#a8c089" stopOpacity="0.9" />
            <stop offset="0.7" stopColor="#5d7a52" stopOpacity="0.85" />
            <stop offset="1" stopColor="#2c4b2e" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id="foliage3" cx="0.55" cy="0.4" r="0.65">
            <stop offset="0" stopColor="#c8d6a4" stopOpacity="0.92" />
            <stop offset="0.7" stopColor="#7a9265" stopOpacity="0.85" />
            <stop offset="1" stopColor="#3b5a3a" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id="halo" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0" stopColor="#f5d99b" stopOpacity="0.55" />
            <stop offset="1" stopColor="#f5d99b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="300" cy="240" rx="280" ry="200" fill="url(#halo)" opacity="0.7" />

        {/* ground mound */}
        <g>
          <ellipse cx="300" cy="700" rx="280" ry="42" fill="url(#mound)" filter="url(#paperBleed)" />
          <path d="M 60 700 Q 200 680 300 690 T 540 705" stroke="#3d2615" strokeWidth="0.8" fill="none" opacity="0.5" />
          <g stroke="#5d7a52" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.85">
            <path d="M 110 692 q 2 -8 4 0" /><path d="M 140 690 q 2 -10 4 0" />
            <path d="M 175 690 q 2 -9 4 0" /><path d="M 410 690 q 2 -10 4 0" />
            <path d="M 450 691 q 2 -8 4 0" /><path d="M 482 690 q 2 -10 4 0" />
            <path d="M 230 705 q 2 -8 4 0" /><path d="M 360 705 q 2 -8 4 0" />
          </g>
        </g>

        <g stroke="#3d2615" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85">
          <path d="M 280 700 C 240 695, 200 700, 165 698" />
          <path d="M 320 700 C 360 695, 400 700, 435 698" />
          <path d="M 300 700 C 305 695, 310 696, 315 700" />
        </g>

        {/* trunk */}
        <g className="trunk">
          <path d="M 285 700 C 282 640, 288 580, 290 520 C 292 460, 298 410, 296 360"
                stroke="url(#bark)" strokeWidth="36" strokeLinecap="round" fill="none" filter="url(#paperBleed)" />
          <path d="M 280 690 C 280 580, 285 470, 286 360"
                stroke="#7c5734" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M 295 660 q -3 -40 -1 -70" stroke="#1f1106" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 290 540 q 2 -40 -1 -80" stroke="#1f1106" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M 297 460 q -1 -30 1 -50" stroke="#1f1106" strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        {/* branches */}
        <g className="sway" style={{ ['--ox' as string]: '300px', ['--oy' as string]: '500px', ['--amp' as string]: '0.6deg' }}>
          <path d="M 290 480 C 240 470, 180 460, 140 420"
                stroke="url(#bark)" strokeWidth="14" strokeLinecap="round" fill="none" filter="url(#paperBleed)" />
          <path d="M 296 460 C 350 450, 410 440, 460 400"
                stroke="url(#bark)" strokeWidth="14" strokeLinecap="round" fill="none" filter="url(#paperBleed)" id="landing-branch" />
          <path d="M 290 410 C 250 390, 210 360, 175 320"
                stroke="url(#bark)" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 295 400 C 330 380, 380 350, 415 310"
                stroke="url(#bark)" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 296 380 C 300 320, 305 260, 308 210"
                stroke="url(#bark)" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 305 280 C 270 250, 240 220, 225 195" stroke="url(#bark)" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 308 270 C 345 240, 370 215, 385 195" stroke="url(#bark)" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 307 220 C 290 195, 275 175, 270 160" stroke="url(#bark)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 308 220 C 325 195, 340 175, 345 160" stroke="url(#bark)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <g stroke="#5a3a23" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85">
            <path d="M 140 420 q -10 -8 -20 -6" /><path d="M 460 400 q 10 -8 20 -6" />
            <path d="M 175 320 q -6 -10 -16 -10" /><path d="M 415 310 q 6 -10 16 -10" />
            <path d="M 308 210 q -3 -16 -2 -28" /><path d="M 225 195 q -8 -4 -16 -10" />
            <path d="M 385 195 q 8 -4 16 -10" />
          </g>
        </g>

        {/* foliage */}
        {variant !== 'bare' && (
          <>
            <g className="sway" style={{ ['--ox' as string]: '305px', ['--oy' as string]: '220px', ['--amp' as string]: '1.6deg' }}>
              <g opacity={variant === 'bare' ? 0.15 : 1} style={{ transition: 'opacity 1.2s ease' }}>
                <ellipse cx="305" cy="180" rx="170" ry="110" fill="#9eb47e" opacity="0.22" style={{ filter: 'blur(18px)' }} />
                <ellipse cx="305" cy="170" rx="105" ry="65" fill="url(#foliage2)" filter="url(#wetEdge)" />
                <ellipse cx="260" cy="180" rx="60" ry="42" fill="url(#foliage1)" opacity="0.9" filter="url(#wetEdge)" />
                <ellipse cx="355" cy="180" rx="60" ry="42" fill="url(#foliage3)" opacity="0.92" filter="url(#wetEdge)" />
                <ellipse cx="305" cy="145" rx="55" ry="32" fill="url(#foliage3)" opacity="0.92" filter="url(#wetEdge)" />
                <ellipse cx="305" cy="200" rx="80" ry="30" fill="#2c4b2e" opacity="0.35" filter="url(#paperBleed)" />
              </g>
            </g>
            <g className="sway" style={{ ['--ox' as string]: '170px', ['--oy' as string]: '300px', ['--amp' as string]: '2.2deg' }}>
              <g style={{ transition: 'opacity 1.4s ease' }}>
                <ellipse cx="170" cy="305" rx="82" ry="58" fill="#7e9764" opacity="0.2" style={{ filter: 'blur(14px)' }} />
                <ellipse cx="175" cy="295" rx="58" ry="42" fill="url(#foliage1)" filter="url(#wetEdge)" />
                <ellipse cx="155" cy="320" rx="40" ry="30" fill="url(#foliage2)" opacity="0.88" filter="url(#paperBleed)" />
              </g>
            </g>
            <g className="sway" style={{ ['--ox' as string]: '430px', ['--oy' as string]: '300px', ['--amp' as string]: '2deg' }}>
              <g style={{ transition: 'opacity 1.4s ease' }}>
                <ellipse cx="435" cy="305" rx="82" ry="58" fill="#7e9764" opacity="0.2" style={{ filter: 'blur(14px)' }} />
                <ellipse cx="430" cy="290" rx="60" ry="42" fill="url(#foliage3)" filter="url(#wetEdge)" />
                <ellipse cx="450" cy="320" rx="38" ry="28" fill="url(#foliage2)" opacity="0.88" filter="url(#paperBleed)" />
              </g>
            </g>
            <g className="sway" style={{ ['--ox' as string]: '140px', ['--oy' as string]: '420px', ['--amp' as string]: '2.6deg' }}>
              <g style={{ opacity: 0.92, transition: 'opacity 1.6s ease' }}>
                <ellipse cx="135" cy="415" rx="54" ry="38" fill="#7e9764" opacity="0.22" style={{ filter: 'blur(12px)' }} />
                <ellipse cx="135" cy="415" rx="40" ry="28" fill="url(#foliage1)" filter="url(#wetEdge)" />
              </g>
            </g>
            <g className="sway" style={{ ['--ox' as string]: '460px', ['--oy' as string]: '395px', ['--amp' as string]: '2.4deg' }}>
              <g style={{ opacity: 0.92, transition: 'opacity 1.6s ease' }}>
                <ellipse cx="465" cy="395" rx="54" ry="38" fill="#7e9764" opacity="0.22" style={{ filter: 'blur(12px)' }} />
                <ellipse cx="465" cy="395" rx="40" ry="28" fill="url(#foliage3)" filter="url(#wetEdge)" />
              </g>
            </g>
          </>
        )}

        {showNest && (
          <g className="nest" style={{ transition: 'opacity 1s ease' }}>
            <ellipse cx="380" cy="430" rx="28" ry="10" fill="#3d2615" opacity="0.9" />
            <g className="nest-twig">
              <path d="M 355 432 C 365 425, 395 425, 405 432" />
              <path d="M 358 430 C 370 423, 390 422, 402 430" />
              <path d="M 352 434 C 366 428, 398 428, 408 434" />
              <path d="M 360 436 C 372 432, 388 432, 400 436" />
            </g>
            {showEggs && (
              <g className="eggs">
                <ellipse className="egg" cx="372" cy="425" rx="5" ry="6.5" />
                <ellipse className="egg" cx="382" cy="423" rx="5" ry="6.5" />
                <ellipse className="egg" cx="392" cy="425" rx="5" ry="6.5" />
              </g>
            )}
          </g>
        )}

        <g opacity="0.7">
          <path d="M 88 540 q 4 -3 8 0 q -3 6 -8 0 Z" fill="#c66a3c" opacity="0.6" />
          <path d="M 520 580 q 4 -3 8 0 q -3 6 -8 0 Z" fill="#d99a4b" opacity="0.5" />
          <path d="M 60 620 q 4 -3 8 0 q -3 6 -8 0 Z" fill="#9eb47e" opacity="0.55" />
        </g>
      </svg>

      <div className="leaves-layer" aria-hidden={variant === 'bare'}>
        {allLeaves.map((leaf) => {
          const slot = LEAF_SLOTS[leaf.slotIndex % LEAF_SLOTS.length];
          const left = (slot.x / 600) * 100;
          const top = (slot.y / 800) * 100;
          return (
            <div
              key={leaf.key}
              className="leaf-marker in"
              style={{ left: `${left}%`, top: `${top}%`, ['--rot' as string]: `${slot.rot}deg` }}
              onClick={() => onLeafClick?.(leaf)}
            >
              <PostcardLeaf color={leaf.color} label={leaf.label} />
              {leaf.tip && <div className="tip">{leaf.tip}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
