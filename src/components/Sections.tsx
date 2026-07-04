import React, { useEffect, useRef, useState } from 'react';
import heroBgImg from '../assets/images/hero-bg.png?url';
import branchImg from '../assets/images/branch.png?url';
import treeWorldImg from '../assets/images/tree-world.png?url';
import lastTreeImg from '../assets/images/last-tree.png?url';
import lastTreeDayImg from '../assets/images/last-tree-day.png?url';
import { Tree, type LeafData } from './Tree';
import { Bird, FarBird } from './Bird';
import { SceneBackwater, SceneMistyHills, SceneTeaCountry, SceneWaterfall, SceneAlpine } from './Scenes';

// ────────────────────────────────────────────────
// Reveal on scroll
// ────────────────────────────────────────────────
function Reveal({
  children, delay = 0, as: Tag = 'div', className = '',
  style, ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}

// ────────────────────────────────────────────────
// Hero
// ────────────────────────────────────────────────
export function Hero({ leavesOnTree, onLeafClick }: { leavesOnTree: LeafData[]; onLeafClick: (l: LeafData) => void }) {
  return (
    <section id="wish" className="hero">
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          padding-top: 10vh;
          padding-bottom: 4vh;
          display: flex;
          align-items: center;
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url(${heroBgImg});
          background-size: cover;
          background-position: center 68%;
          background-repeat: no-repeat;
          z-index: 1;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%);
          pointer-events: none;
        }
        @media (min-width: 1024px) {
          .hero {
            min-height: calc(100vw * 0.75);
          }
        }
        .hero .br-desktop { display: inline; }
        .hero .br-mobile { display: none; }
        @media (max-width: 768px) {
          .hero {
            padding-top: 96px;
            padding-bottom: 24px;
            align-items: flex-start;
          }
          .hero::before {
            background-position: 68% 80%;
          }
          .hero .br-desktop { display: none; }
          .hero .br-mobile { display: inline; }
        }
        .hero .hero-inner {
          max-width: var(--maxw);
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 768px) {
          .hero .hero-inner {
            justify-content: flex-start;
          }
        }
        .hero .hero-headline {
          position: relative;
          z-index: 6;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero .hero-headline h1.huge {
          font-size: clamp(40px, 5.5vw, 72px);
          line-height: 0.95;
        }
        .hero .hero-headline em {
          font-style: italic;
        }
        .hero .hero-separator {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .hero .hero-separator .sep-line-long {
          width: 56px;
          height: 1px;
          background: var(--rule);
        }
        .hero .hero-separator .sep-line-short {
          width: 16px;
          height: 1px;
          background: var(--rule);
        }
        .hero .hero-separator .sep-leaf {
          opacity: 0.75;
        }
        .hero .hero-desc {
          font-family: var(--sans);
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.6;
          color: var(--ink-soft);
          max-width: 38ch;
          text-wrap: pretty;
        }
        .hero .drifting-leaves {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          overflow: hidden;
        }
        .hero .drifting-leaves .dl {
          position: absolute;
          width: 14px;
          height: 14px;
          animation: drift 16s linear infinite;
          opacity: 0.7;
        }
        @keyframes drift {
          0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.7; }
          100% { transform: translate(-160px, 80vh) rotate(420deg); opacity: 0; }
        }
      `}</style>

      <div className="drifting-leaves">
        {[
          { left: '20%', top: '22%', dur: '14s', delay: '0s', fill: '#9eb47e' },
          { left: '38%', top: '12%', dur: '18s', delay: '4s', fill: '#d99a4b' },
          { left: '65%', top: '32%', dur: '20s', delay: '7s', fill: '#9eb47e' },
          { left: '78%', top: '18%', dur: '16s', delay: '2s', fill: '#d99a4b' },
          { left: '12%', top: '45%', dur: '22s', delay: '9s', fill: '#9eb47e' },
        ].map((s, i) => (
          <div key={i} className="dl" style={{ left: s.left, top: s.top, animationDuration: s.dur, animationDelay: s.delay }}>
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 13 C 6 4, 18 4, 21 13 C 18 21, 6 21, 3 13 Z" fill={s.fill} />
            </svg>
          </div>
        ))}
      </div>

      <div className="hero-inner">
        <div className="hero-headline">
          <div className="eyebrow" style={{ marginBottom: 16 }}>TRATREE — A TRAVEL BRAND</div>
          <h1 className="huge display">
            A tree <br className="br-desktop" />once<br />
            <em>dreamed</em><br />
            of <br className="br-desktop" />travelling.
          </h1>

          <div className="hero-separator">
            <span className="sep-line-long"></span>
            <svg className="sep-leaf" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 22C2 22 7.5 17 12 17M12 17C15 17 19.5 13.5 21.5 9.5C18.5 10.5 14 13.5 12 17ZM12 17C10.5 13.5 6 10.5 3 9.5C6 13.5 10.5 17 12 17ZM21.5 9.5C22.5 7.5 22 4.5 20 3C18.5 4.5 15.5 5 13.5 6.5C15.5 8 19.5 9.5 21.5 9.5Z" fill="#859a73" stroke="#4e6b46" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sep-line-short"></span>
          </div>

          <p className="hero-desc" style={{ marginBottom: 12 }}>
            You are the tree — rooted in the everyday, longing to see the world.
          </p>
          <p className="hero-desc" style={{ marginBottom: 20 }}>
            You are the bird that brings the stories home.
          </p>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// Arrival
// ────────────────────────────────────────────────
export function Arrival() {
  return (
    <section id="arrival" className="arrival">
      <style>{`
        .arrival { padding-top: 18vh; padding-bottom: 16vh; min-height: 120vh; }
        .arrival-grid { max-width: var(--maxw); margin: 0 auto; display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(28px, 5vw, 80px); align-items: center; }
        @media (max-width: 880px) { .arrival-grid { grid-template-columns: 1fr; } }
        .arrival .branch-stage { position: relative; aspect-ratio: 4/5; width: 100%; }
        .arrival .dialogue-stack > * + * { margin-top: 32px; }
      `}</style>

      <div className="arrival-grid">
        <div className="branch-stage">
          {/*
          <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid meet"
               style={{ width: '100%', height: '100%', display: 'block', filter: 'url(#wc-global)' }}>
            <defs>
              <linearGradient id="arr-bark" x1="0" x2="1">
                <stop offset="0" stopColor="#3d2615" /><stop offset="0.5" stopColor="#7c5734" /><stop offset="1" stopColor="#3d2615" />
              </linearGradient>
              <radialGradient id="arr-halo" cx="0.5" cy="0.5" r="0.6">
                <stop offset="0" stopColor="#f5d99b" stopOpacity="0.5" /><stop offset="1" stopColor="#f5d99b" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="arr-fol" cx="0.5" cy="0.5" r="0.7">
                <stop offset="0" stopColor="#9eb47e" /><stop offset="0.6" stopColor="#5d7a52" /><stop offset="1" stopColor="#2c4b2e" />
              </radialGradient>
            </defs>
            <ellipse cx="380" cy="380" rx="320" ry="280" fill="url(#arr-halo)" />
            <path d="M -20 600 C 120 540, 280 480, 420 400 S 580 300, 640 260"
                  stroke="url(#arr-bark)" strokeWidth="40" strokeLinecap="round" fill="none" />
            <path d="M -20 590 C 120 530, 280 470, 420 390 S 580 290, 640 250"
                  stroke="#7c5734" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
            <g>
              <ellipse cx="220" cy="200" rx="120" ry="80" fill="url(#arr-fol)" opacity="0.95" />
              <ellipse cx="380" cy="160" rx="140" ry="80" fill="url(#arr-fol)" opacity="0.95" />
              <ellipse cx="500" cy="240" rx="100" ry="70" fill="url(#arr-fol)" opacity="0.9" />
            </g>
            <g className="nest-twigs">
              <ellipse cx="320" cy="430" rx="48" ry="14" fill="#3d2615" opacity="0.9" />
              <g stroke="#5a3a23" strokeWidth="2" fill="none" strokeLinecap="round">
                <path d="M 275 426 C 290 412, 350 410, 365 426" />
                <path d="M 278 420 C 295 405, 345 404, 362 420" />
                <path d="M 270 432 C 290 420, 350 418, 370 432" />
              </g>
            </g>
            <g transform="translate(380, 380) scale(1.4)">
              <Bird mode="perch" size={56} />
            </g>
          </svg>
          */}
          <img
            src={branchImg}
            alt="A bird on a branch"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>

        <div className="dialogue-stack">
          <Reveal delay={0}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>ii — the arrival</div>
            <h2 className="big display">A bird landed on its branch.</h2>
          </Reveal>
          <Reveal delay={350}>
            <div className="dialogue">
              <span className="who">— the tree, confiding</span>
              "I have one great wish: to <em>travel</em>. But a tree can never travel, can it?"
            </div>
          </Reveal>
          <Reveal delay={700}>
            <div className="dialogue">
              <span className="who">— the bird, moved</span>
              "Give me space to build a nest on your branch, and I will tell you everything I see when I travel each day."
            </div>
          </Reveal>
          <Reveal delay={1050}>
            <div className="hand" style={{ fontSize: 22, color: 'var(--bark-deep)', marginTop: 12 }}>
              — and so the pact was struck.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// Departure
// ────────────────────────────────────────────────
export function Departure() {
  return (
    <section id="departure" className="departure">
      <style>{`
        .departure { padding-top: 20vh; padding-bottom: 14vh; min-height: 100vh; position: relative; }
        .departure-inner { max-width: var(--maxw); margin: 0 auto; text-align: center; }
        .clouds { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .clouds .cloud { position: absolute; background: rgba(255,255,255,0.55); border-radius: 50%; filter: blur(6px); }
        .departure .frame { font-family: var(--display); font-style: italic; font-size: clamp(20px, 2.2vw, 28px); color: var(--ink-soft); max-width: 32ch; margin: 28px auto 0; }
      `}</style>

      <div className="clouds">
        <div className="cloud" style={{ left: '8%', top: '12%', width: 200, height: 80, opacity: 0.6 }} />
        <div className="cloud" style={{ left: '70%', top: '20%', width: 280, height: 100, opacity: 0.5 }} />
        <div className="cloud" style={{ left: '30%', top: '60%', width: 360, height: 110, opacity: 0.4 }} />
      </div>

      <div className="departure-inner">
        <Reveal>
          <div className="eyebrow">iii — the departure</div>
          <h2 className="big display" style={{ marginTop: 24, maxWidth: '20ch', marginInline: 'auto' }}>
            The bird lifted off.
          </h2>
          <p className="frame">
            And the tree, for the first time, felt the air thin above the canopy — a flight path drawn, day by day, across a sky it would never see.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// Destination Panel
// ────────────────────────────────────────────────
const SCENES: Record<string, React.FC> = {
  SceneBackwater, SceneMistyHills, SceneTeaCountry, SceneWaterfall, SceneAlpine,
};

interface DestinationPanelProps {
  num: number;
  place: string;
  country: string;
  coords: string;
  day: number;
  diary: string;
  palette: { bg: string; accent: string; leaf: string };
  offer: { tagline: string };
  sceneName: string;
  position?: 'left' | 'right';
}

function romanize(n: number): string {
  return ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'][n] ?? String(n);
}

export function DestinationPanel({ num, place, country, coords, day, diary, palette, offer, sceneName, position = 'left' }: DestinationPanelProps) {
  const SceneComp = SCENES[sceneName];
  return (
    <section className="dest" id={`d-${num}`}>
      <div className={`dest-grid ${position}`}>
        <div className="dest-meta">
          <Reveal>
            <div className="stamp">
              <span style={{ display: 'inline-flex', alignItems: 'center', opacity: 0.8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 22C2 22 7.5 17 12 17M12 17C15 17 19.5 13.5 21.5 9.5C18.5 10.5 14 13.5 12 17ZM12 17C10.5 13.5 6 10.5 3 9.5C6 13.5 10.5 17 12 17ZM21.5 9.5C22.5 7.5 22 4.5 20 3C18.5 4.5 15.5 5 13.5 6.5C15.5 8 19.5 9.5 21.5 9.5Z" />
                </svg>
              </span>
              <span>{country} · day {String(day).padStart(2, '0')}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="dest-num">
              {place.split(' ').map((w, i, arr) => (
                <React.Fragment key={i}>
                  {w === '&' ? <span style={{ fontStyle: 'italic' }}>&</span> : w}
                  {i < arr.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}.
            </h3>
            <div className="dest-coord">{coords}</div>
          </Reveal>
          <Reveal delay={260}>
            <p className="diary-line" style={{ marginTop: 36 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)', display: 'block', marginBottom: 6 }}>
                from the bird's diary
              </span>
              "{diary}"
            </p>
            <div className="dest-separator">
              <span className="sep-line"></span>
              <svg className="sep-leaf" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 22C2 22 7.5 17 12 17M12 17C15 17 19.5 13.5 21.5 9.5C18.5 10.5 14 13.5 12 17ZM12 17C10.5 13.5 6 10.5 3 9.5C6 13.5 10.5 17 12 17ZM21.5 9.5C22.5 7.5 22 4.5 20 3C18.5 4.5 15.5 5 13.5 6.5C15.5 8 19.5 9.5 21.5 9.5Z" />
              </svg>
              <span className="sep-line"></span>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <div className="offer-card">
              <div className="tagline-text">{offer.tagline}</div>
              <a href="#begin" className="btn">Talk to us <span>→</span></a>
            </div>
          </Reveal>
          <Reveal delay={450}>
            <div className="dest-day-footer">day {String(day).padStart(2, '0')}</div>
          </Reveal>
        </div>
        <div className="dest-art-container">
          <Reveal>
            <div className="dest-art">
              {SceneComp && <SceneComp />}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// Return
// ────────────────────────────────────────────────
export function Return({ onLeafClick }: { onLeafClick: (l: LeafData) => void }) {
  return (
    <section id="return" className="return-sec">
      <style>{`
        .return-sec { 
          margin-top: 30vh;
          padding-top: 18vh; 
          padding-bottom: 12vh; 
          min-height: 120vh; 
          position: relative; 
          display: flex;
          align-items: center;
          z-index: 1;
        }
        .return-sec::before, .return-sec::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background-size: cover;
          background-position: center bottom;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 35%, black 85%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 35%, black 85%, transparent 100%);
        }
        .return-sec::before {
          background-image: url(${lastTreeImg});
        }
        .return-sec::after {
          background-image: url(${lastTreeDayImg});
          opacity: var(--day-opacity, 1);
        }
        .return-content { 
          max-width: var(--maxw); 
          margin: 0 auto; 
          width: 100%;
          position: relative;
          z-index: 2;
        }
        .return-text-col {
          max-width: 520px;
          color: #dce4d8;
        }
        .return-text-col .eyebrow {
          color: #dce4d8;
          opacity: 0.8;
          display: flex;
          align-items: center;
          gap: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 11px;
        }
        @media (max-width: 900px) {
          .return-sec {
            align-items: flex-end;
            padding-bottom: 8vh;
            min-height: auto;
            padding-top: 90vw;
            background: linear-gradient(to bottom, transparent 0%, transparent 30%, #000000 55%, #000000 100%);
          }
          .return-sec::before, .return-sec::after {
            background-position: 58% 0%;
            background-size: 180% auto;
            background-repeat: no-repeat;
            height: 100vw;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
            mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
          }
          .return-content {
            text-align: left;
          }
          .return-text-col {
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .return-text-col .sep {
            margin-left: 0;
            margin-right: auto;
          }
        }
        .return-text-col .eyebrow svg {
          opacity: 0.7;
        }
        .return-text-col h2 {
          font-family: var(--display);
          font-weight: 400;
          font-size: clamp(48px, 7.5vw, 88px);
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: #f1e8d2;
          margin: 24px 0 32px;
        }
        .return-text-col h2 em {
          font-style: italic;
        }
        .return-text-col .sep {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          opacity: 0.4;
          width: 280px;
        }
        .return-text-col .sep-line {
          flex: 1;
          height: 1px;
          background: currentColor;
        }
        .return-text-col .lede {
          font-family: var(--sans);
          font-size: 15px;
          line-height: 1.6;
          color: #f1e8d2;
          opacity: 0.9;
          margin-bottom: 24px;
        }
        .return-text-col .hand-text {
          font-family: var(--hand);
          font-size: 26px;
          line-height: 1.3;
          color: #d99a4b;
          margin-bottom: 40px;
        }
        .return-text-col .btn-outline {
          font-family: var(--sans);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f1e8d2;
          border: 1px solid rgba(241, 232, 210, 0.4);
          background: transparent;
          padding: 14px 28px;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: background 240ms ease, border-color 240ms ease;
        }
        .return-text-col .btn-outline:hover {
          background: rgba(241, 232, 210, 0.1);
          border-color: rgba(241, 232, 210, 0.8);
        }
      `}</style>

      <div className="return-content">
        <div className="return-text-col">
          <Reveal>
            <div className="eyebrow">
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, border: '1px solid rgba(220,228,216,0.3)', borderRadius: '50%' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 13C6 13 8 11 10 11C12 11 14 13 16 13C18 13 20 11 21 10" />
                  <path d="M12 7V11" />
                </svg>
              </span>
              vii — the return
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2>
              The tree was<br />
              <em>full</em> of the world.
            </h2>
            <div className="sep">
              <span className="sep-line"></span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 22C2 22 7.5 17 12 17M12 17C15 17 19.5 13.5 21.5 9.5C18.5 10.5 14 13.5 12 17ZM12 17C10.5 13.5 6 10.5 3 9.5C6 13.5 10.5 17 12 17ZM21.5 9.5C22.5 7.5 22 4.5 20 3C18.5 4.5 15.5 5 13.5 6.5C15.5 8 19.5 9.5 21.5 9.5Z" />
              </svg>
              <span className="sep-line"></span>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <p className="lede">
              Every branch now carried a leaf from a place it now knew. The bird came home at dusk; the nest held eggs, glowing.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="hand-text">
              the rooted tree has travelled the whole world through the bird's eyes — and so can you.
            </div>
            <a href="#begin" className="btn-outline">
              Read the story <span>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// CTA
// ────────────────────────────────────────────────
export function CTA() {
  return (
    <section id="begin" className="cta-sec">
      <style>{`
        .cta-sec { padding-top: 10vh; padding-bottom: 12vh; min-height: 40vh; display: flex; align-items: center; justify-content: center; }
        .cta-inner { max-width: var(--maxw); width: 100%; margin: 0 auto; text-align: center; }
      `}</style>
      <div className="cta-inner">
        <Reveal><div className="eyebrow">viii — your turn</div></Reveal>
        <Reveal delay={120}>
          <h2 className="big display" style={{ marginTop: 24, maxWidth: '20ch', marginInline: 'auto' }}>
            Let tratree be your bird.
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <div style={{ marginTop: 40 }}>
            <button className="cta-pill" onClick={() => window.location.href = 'mailto:hello@tratree.travel?subject=Let\'s talk about travel'}>
              Contact us
              <svg viewBox="0 0 24 24"><path d="M5 12 L 19 12 M 13 6 L 19 12 L 13 18" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// Footer
// ────────────────────────────────────────────────
export function Foot() {
  return (
    <footer className="foot">
      <style>{`
        .foot { background: transparent; }
        .foot .bottom-row { max-width: var(--maxw); margin: 80px auto 0; padding-top: 24px; border-top: 1px solid rgba(241,232,210,0.15); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 12px; color: rgba(241,232,210,0.7); position: relative; z-index: 2; }
        .foot .foot-col a { color: rgba(241,232,210,0.9); }
        .foot .foot-col h6 { color: rgba(241,232,210,0.55); }
      `}</style>

      <div className="foot-grid">
        <div className="foot-col">
          <h6>Tratree</h6>
          <p style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22, color: 'rgba(241,232,210,0.92)', lineHeight: 1.3, maxWidth: '32ch' }}>
            "If you give me space to build a nest on this branch, I will tell you everything I see."
          </p>
          <div className="hand" style={{ marginTop: 14, color: 'rgba(241,232,210,0.6)', fontSize: 18 }}>— from the story</div>
        </div>
        <div className="foot-col">
          <h6>connect us</h6>
          <a href="tel:+919526936172" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91 9526936172
          </a>
          <a href="https://wa.me/919526936172?text=Hi%20Tratree%2C%20I%27d%20like%20to%20plan%20a%20journey%21" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#25D366' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle' }}>
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.024-5.124-2.888-6.991C16.582 1.884 14.1 .859 11.463.859 6.026.859 1.602 5.273 1.6 10.724c-.001 1.705.452 3.369 1.31 4.8l-.993 3.626 3.73-.976zM17.47 14.397c-.3-.149-1.777-.877-2.043-.974-.267-.098-.462-.149-.655.15-.192.298-.745.937-.912 1.13-.166.195-.333.22-.633.071-.3-.15-1.27-.468-2.42-1.493-.895-.799-1.5-1.786-1.677-2.084-.176-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.3.3-.498.1-.199.05-.374-.025-.524-.075-.15-.655-1.579-.897-2.164-.236-.569-.475-.491-.655-.5-.17-.008-.364-.01-.559-.01-.195 0-.514.074-.783.374-.269.299-1.024 1.002-1.024 2.444 0 1.44 1.049 2.839 1.196 3.038.146.199 2.062 3.149 4.995 4.413.697.301 1.242.482 1.668.618.7.223 1.338.192 1.843.118.563-.081 1.777-.726 2.028-1.393.25-.667.25-1.238.176-1.393-.075-.15-.269-.249-.57-.398z" />
            </svg>
            WhatsApp Chat
          </a>
          <a href="https://www.instagram.com/tratreeofficial/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Instagram
          </a>
        </div>
      </div>

      <div className="bottom-row">
        <div>© tratree, mmxxv — every branch a little further from home.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>imprint</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>privacy</a>
        </div>
      </div>
    </footer>
  );
}
