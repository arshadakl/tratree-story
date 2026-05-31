import React from 'react';

type BirdMode = 'glide' | 'flap' | 'perch';

interface BirdProps {
  mode?: BirdMode;
  size?: number;
  accent?: string;
}

export function Bird({ mode = 'glide', size = 48, accent = '#d99a4b' }: BirdProps) {
  return (
    <div className={`bird ${mode}`} style={{ width: size, height: size, position: 'relative' }}>
      <style>{`
        .bird { display: block; }
        .bird svg { display: block; width: 100%; height: 100%; overflow: visible; }
        .bird .wing-upper { transform-origin: 50% 60%; }
        .bird .wing-lower { transform-origin: 50% 60%; }
        .bird.glide .wing-upper { animation: glideUp 2.2s ease-in-out infinite; }
        .bird.glide .wing-lower { animation: glideLow 2.2s ease-in-out infinite; }
        .bird.flap .wing-upper  { animation: flapUp 240ms ease-in-out infinite; }
        .bird.flap .wing-lower  { animation: flapLow 240ms ease-in-out infinite; }
        .bird.perch .wing-upper { transform: rotate(-6deg) translateY(2px); }
        .bird.perch .wing-lower { transform: rotate(-2deg) translateY(2px); }
        .bird .body-bob { transform-origin: center; }
        .bird.glide .body-bob, .bird.flap .body-bob { animation: bodyBob 2.2s ease-in-out infinite; }
        @keyframes glideUp { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(14deg); } }
        @keyframes glideLow { 0%, 100% { transform: rotate(8deg); } 50% { transform: rotate(-12deg); } }
        @keyframes flapUp { 0%, 100% { transform: rotate(-30deg); } 50% { transform: rotate(40deg); } }
        @keyframes flapLow { 0%, 100% { transform: rotate(30deg); } 50% { transform: rotate(-30deg); } }
        @keyframes bodyBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @media (prefers-reduced-motion: reduce) {
          .bird .wing-upper, .bird .wing-lower, .bird .body-bob { animation: none !important; }
        }
      `}</style>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="bird-body" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#3d2615" />
            <stop offset="1" stopColor="#1f1106" />
          </linearGradient>
          <linearGradient id="bird-wing" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#5a3a23" />
            <stop offset="1" stopColor="#1f1106" />
          </linearGradient>
        </defs>
        <g className={`bird ${mode}`}>
          <g className="wing-lower">
            <path d="M 30 34 C 22 40, 12 40, 4 36 C 10 44, 22 46, 32 42 Z"
                  fill="url(#bird-wing)" stroke="#1f1106" strokeWidth="0.5" />
          </g>
          <g className="body-bob">
            <path d="M 14 30 L 4 26 L 4 32 L 14 32 Z" fill="#3d2615" />
            <ellipse cx="32" cy="32" rx="18" ry="9" fill="url(#bird-body)" />
            <circle cx="48" cy="28" r="7" fill="#3d2615" />
            <path d="M 54 28 L 60 27 L 54 30 Z" fill={accent} />
            <circle cx="50" cy="26.5" r="1.1" fill="#f5e7c3" />
            <circle cx="50.2" cy="26.7" r="0.4" fill="#1f1106" />
            <path d="M 36 40 L 36 46 M 34 46 L 38 46 M 40 40 L 40 46 M 38 46 L 42 46"
                  stroke="#3d2615" strokeWidth="0.8" fill="none" />
          </g>
          <g className="wing-upper">
            <path d="M 30 30 C 24 22, 14 20, 6 22 C 12 30, 24 34, 32 32 Z"
                  fill="url(#bird-wing)" stroke="#1f1106" strokeWidth="0.5" />
            <path d="M 16 25 L 24 28" stroke="#1f1106" strokeWidth="0.4" opacity="0.6" fill="none" />
            <path d="M 12 27 L 22 30" stroke="#1f1106" strokeWidth="0.4" opacity="0.6" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function FarBird({ size = 14, color = '#3d2615', flip = false }: { size?: number; color?: string; flip?: boolean }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 20 10"
         style={{ display: 'block', transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M 1 8 Q 5 1, 10 6 Q 15 1, 19 8"
            stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
