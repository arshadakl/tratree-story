import React from 'react';
import backwaterImg from '../assets/images/backwater.png?url';
import mistyHillImg from '../assets/images/misty-hill.png?url';
import teaCountryImg from '../assets/images/tea-country.png?url';
import waterfallImg from '../assets/images/waterfall.png?url';
import alpineMeadowsImg from '../assets/images/alpine-meadows.png?url';

export function SceneBackwater() {
  return (
    <>
      {/*
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bw-sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c8d8d2" /><stop offset="0.45" stopColor="#ddd8c2" /><stop offset="1" stopColor="#c8b48a" />
          </linearGradient>
          <linearGradient id="bw-water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#a8bcb8" /><stop offset="0.5" stopColor="#7a9898" /><stop offset="1" stopColor="#4a6868" />
          </linearGradient>
          <radialGradient id="bw-sun" cx="0.5" cy="0.35" r="0.25">
            <stop offset="0" stopColor="#f9eac0" stopOpacity="0.9" /><stop offset="0.6" stopColor="#f5d99b" stopOpacity="0.4" /><stop offset="1" stopColor="#f5d99b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bw-mist" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f0ece4" stopOpacity="0" /><stop offset="0.5" stopColor="#e8e0d4" stopOpacity="0.55" /><stop offset="1" stopColor="#e0d8cc" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#bw-sky)" />
        <rect width="400" height="500" fill="url(#bw-sun)" />
        <path d="M 0 220 Q 60 200, 120 215 Q 180 200, 240 212 Q 300 198, 360 210 Q 380 205, 400 212 L 400 260 L 0 260 Z" fill="#3b5a3a" opacity="0.5" />
        <rect x="0" y="210" width="400" height="60" fill="url(#bw-mist)" />
        <rect x="0" y="260" width="400" height="240" fill="url(#bw-water)" />
        <g stroke="#b8ccca" strokeWidth="0.5" opacity="0.6">
          <path d="M 20 310 Q 80 307, 140 310 Q 200 313, 260 310" /><path d="M 40 340 Q 120 337, 200 340 Q 280 343, 360 340" />
          <path d="M 10 370 Q 100 367, 190 370 Q 280 373, 370 370" /><path d="M 30 400 Q 130 397, 230 400 Q 330 403, 390 400" />
        </g>
        <path d="M 180 280 L 220 280 L 230 500 L 170 500 Z" fill="#f5d99b" opacity="0.18" />
        <g>
          <path d="M 30 500 C 35 400, 45 330, 55 270" stroke="#3d2615" strokeWidth="5" fill="none" strokeLinecap="round" />
          <g fill="#2c4b2e" opacity="0.9">
            <path d="M 55 270 Q 30 250, 10 240 Q 35 260, 55 270" /><path d="M 55 270 Q 40 245, 30 228 Q 48 252, 55 270" />
            <path d="M 55 270 Q 65 248, 60 228 Q 62 252, 55 270" /><path d="M 55 270 Q 78 252, 90 240 Q 72 260, 55 270" />
          </g>
          <circle cx="52" cy="272" r="3" fill="#7c5734" /><circle cx="58" cy="275" r="2.5" fill="#7c5734" />
        </g>
        <g>
          <path d="M 380 500 C 370 400, 355 330, 345 265" stroke="#3d2615" strokeWidth="5" fill="none" strokeLinecap="round" />
          <g fill="#2c4b2e" opacity="0.9">
            <path d="M 345 265 Q 320 245, 300 235 Q 325 255, 345 265" /><path d="M 345 265 Q 332 240, 325 222 Q 340 248, 345 265" />
            <path d="M 345 265 Q 358 243, 356 223 Q 358 248, 345 265" /><path d="M 345 265 Q 370 248, 382 236 Q 364 256, 345 265" />
          </g>
          <circle cx="342" cy="267" r="3" fill="#7c5734" />
        </g>
        <g>
          <path d="M 100 318 L 300 318 L 310 332 L 90 332 Z" fill="#3a2618" />
          <path d="M 95 318 C 120 295, 190 285, 210 284 C 230 285, 300 295, 310 318 Z" fill="#5a3a23" />
          <rect x="130" y="308" width="12" height="8" fill="#f5d99b" opacity="0.55" rx="1" />
          <rect x="175" y="308" width="12" height="8" fill="#f5d99b" opacity="0.45" rx="1" />
          <rect x="218" y="308" width="12" height="8" fill="#f5d99b" opacity="0.5" rx="1" />
        </g>
      </svg>
      */}
      <img
        src={backwaterImg}
        alt="Backwater Serenity"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </>
  );
}

export function SceneMistyHills() {
  return (
    <>
      {/*
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mh-sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c0c8b8" /><stop offset="0.4" stopColor="#d0d4c0" /><stop offset="1" stopColor="#9eb49a" />
          </linearGradient>
          <linearGradient id="mh-hill1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8aa880" /><stop offset="1" stopColor="#5a7a56" />
          </linearGradient>
          <linearGradient id="mh-hill2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#6a8a60" /><stop offset="1" stopColor="#3b5a3a" />
          </linearGradient>
          <linearGradient id="mh-hill3" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3b5a3a" /><stop offset="1" stopColor="#1f3a1f" />
          </linearGradient>
          <linearGradient id="mh-mist" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#e8ece4" stopOpacity="0.75" /><stop offset="0.5" stopColor="#e8ece4" stopOpacity="0.3" /><stop offset="1" stopColor="#e8ece4" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#mh-sky)" />
        <path d="M 0 220 Q 60 195, 130 210 Q 200 190, 270 205 Q 340 192, 400 210 L 400 280 L 0 280 Z" fill="#a8b8a0" opacity="0.65" />
        <rect x="0" y="205" width="400" height="45" fill="url(#mh-mist)" />
        <path d="M 0 260 Q 50 235, 110 252 Q 170 238, 240 255 Q 300 240, 360 252 Q 385 244, 400 255 L 400 330 L 0 330 Z" fill="url(#mh-hill1)" />
        <path d="M 320 248 L 322 262 L 324 275 L 323 290" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M 0 310 Q 40 285, 100 300 Q 160 280, 230 298 Q 290 280, 360 296 Q 388 285, 400 295 L 400 400 L 0 400 Z" fill="url(#mh-hill2)" />
        <g stroke="#4a6a45" strokeWidth="0.7" fill="none" opacity="0.65">
          <path d="M 20 295 Q 80 290, 150 294 Q 220 290, 290 294" /><path d="M 10 304 Q 80 299, 160 303 Q 240 299, 310 303" />
          <path d="M 5 313 Q 80 308, 170 312 Q 255 308, 330 312" />
        </g>
        <path d="M 0 400 Q 30 365, 70 380 Q 110 355, 150 375 Q 190 352, 230 370 Q 265 348, 310 368 Q 348 350, 390 368 L 400 375 L 400 500 L 0 500 Z" fill="url(#mh-hill3)" />
      </svg>
      */}
      <img
        src={mistyHillImg}
        alt="Misty Hill Escapes"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </>
  );
}

export function SceneTeaCountry() {
  return (
    <>
      {/*
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="tc-sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e8c484" /><stop offset="0.4" stopColor="#d8b870" /><stop offset="0.7" stopColor="#b8a060" /><stop offset="1" stopColor="#8a9060" />
          </linearGradient>
          <radialGradient id="tc-sun" cx="0.72" cy="0.28" r="0.22">
            <stop offset="0" stopColor="#faeec0" stopOpacity="0.95" /><stop offset="0.5" stopColor="#f5d99b" stopOpacity="0.55" /><stop offset="1" stopColor="#f5d99b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tc-valley" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#a8b878" /><stop offset="1" stopColor="#5a7a40" />
          </linearGradient>
          <linearGradient id="tc-hill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#7a9a50" /><stop offset="1" stopColor="#3a5a28" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#tc-sky)" />
        <rect width="400" height="500" fill="url(#tc-sun)" />
        <path d="M 0 275 Q 80 248, 160 262 Q 240 245, 320 260 Q 370 248, 400 256 L 400 380 L 0 380 Z" fill="url(#tc-valley)" />
        <g stroke="#5a7a40" strokeWidth="1" fill="none" opacity="0.7">
          {Array.from({length: 12}).map((_, i) => {
            const y = 278 + i * 8;
            const indent = i * 1.5;
            return <path key={i} d={`M ${indent} ${y} Q 200 ${y-4} ${400 - indent} ${y}`} />;
          })}
        </g>
        <g fill="#4a6a30" opacity="0.55">
          {Array.from({length: 20}).map((_, i) => (
            <ellipse key={i} cx={10 + i * 19} cy={290 + (i % 3) * 9} rx="7" ry="4" />
          ))}
        </g>
        <path d="M 0 360 Q 50 330, 120 348 Q 200 322, 280 344 Q 350 326, 400 340 L 400 500 L 0 500 Z" fill="url(#tc-hill)" />
        <g transform="translate(290, 338)" opacity="0.75">
          <circle cx="0" cy="0" r="4.5" fill="#2a1a10" />
          <rect x="-3" y="4" width="6" height="12" fill="#2a1a10" />
          <path d="M -3 8 L -10 14 M 3 8 L 10 14" stroke="#2a1a10" strokeWidth="1.2" fill="none" />
          <path d="M -5 -2 L 5 -2 L 4 -7 L -4 -7 Z" fill="#7c5734" />
        </g>
        <g opacity="0.14">
          <path d="M 288 140 L 260 500" stroke="#f5d99b" strokeWidth="40" />
          <path d="M 308 140 L 360 500" stroke="#f5d99b" strokeWidth="24" />
        </g>
      </svg>
      */}
      <img
        src={teaCountryImg}
        alt="Tea Country Dreams"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </>
  );
}

export function SceneWaterfall() {
  return (
    <>
      {/*
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wf-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1f3a28" /><stop offset="0.5" stopColor="#2a4a32" /><stop offset="1" stopColor="#1a2e1e" />
          </linearGradient>
          <linearGradient id="wf-water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e8f0f0" /><stop offset="0.4" stopColor="#c0d4d8" /><stop offset="0.7" stopColor="#a0bcc0" /><stop offset="1" stopColor="#7aa0a8" />
          </linearGradient>
          <linearGradient id="wf-rock" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#5a6855" /><stop offset="1" stopColor="#2a3028" />
          </linearGradient>
          <radialGradient id="wf-mist" cx="0.5" cy="0.8" r="0.4">
            <stop offset="0" stopColor="#dce8e8" stopOpacity="0.7" /><stop offset="1" stopColor="#dce8e8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="url(#wf-bg)" />
        <path d="M 0 0 L 0 320 C 40 280, 80 240, 110 200 C 80 180, 40 160, 0 120 Z" fill="#1f3a28" />
        <path d="M 400 0 L 400 320 C 360 280, 320 240, 290 200 C 320 180, 360 160, 400 120 Z" fill="#1f3a28" />
        <path d="M 185 30 C 182 80, 183 120, 182 160" stroke="url(#wf-water)" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M 215 30 C 218 80, 217 120, 218 160" stroke="url(#wf-water)" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M 155 160 Q 200 152, 245 160 L 248 175 Q 200 168, 152 175 Z" fill="url(#wf-rock)" />
        <path d="M 165 175 C 160 240, 158 300, 155 350" stroke="url(#wf-water)" strokeWidth="20" fill="none" strokeLinecap="round" />
        <path d="M 200 175 C 200 240, 200 300, 200 350" stroke="url(#wf-water)" strokeWidth="24" fill="none" strokeLinecap="round" opacity="0.9" />
        <path d="M 235 175 C 240 240, 242 300, 244 350" stroke="url(#wf-water)" strokeWidth="16" fill="none" strokeLinecap="round" opacity="0.75" />
        <path d="M 130 350 Q 200 338, 268 350 L 272 368 Q 200 358, 126 368 Z" fill="url(#wf-rock)" />
        <path d="M 200 368 C 200 420, 200 460, 200 500" stroke="url(#wf-water)" strokeWidth="30" fill="none" strokeLinecap="round" />
        <ellipse cx="200" cy="420" rx="90" ry="28" fill="url(#wf-mist)" />
        <g>
          <ellipse cx="110" cy="390" rx="28" ry="16" fill="#3a4a38" />
          <ellipse cx="110" cy="386" rx="28" ry="10" fill="#4a6045" />
          <ellipse cx="295" cy="395" rx="24" ry="14" fill="#3a4a38" />
          <ellipse cx="295" cy="391" rx="24" ry="9" fill="#4a6045" />
        </g>
      </svg>
      */}
      <img
        src={waterfallImg}
        alt="Waterfall & Jungle"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </>
  );
}

export function SceneAlpine() {
  return (
    <>
      {/*
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="alp-sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#88aac8" /><stop offset="0.5" stopColor="#a8c0d0" /><stop offset="0.8" stopColor="#c8d8d8" /><stop offset="1" stopColor="#a8b890" />
          </linearGradient>
          <linearGradient id="alp-peak" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e8eef4" /><stop offset="0.4" stopColor="#c0ccd8" /><stop offset="0.7" stopColor="#8898aa" /><stop offset="1" stopColor="#4a5a68" />
          </linearGradient>
          <linearGradient id="alp-meadow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8aaa6a" /><stop offset="1" stopColor="#4a7a3a" />
          </linearGradient>
          <linearGradient id="alp-near" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#6a9a50" /><stop offset="1" stopColor="#3a6028" />
          </linearGradient>
          <radialGradient id="alp-snow" cx="0.5" cy="0.3" r="0.5">
            <stop offset="0" stopColor="#f0f4f8" /><stop offset="1" stopColor="#c4ccd8" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="url(#alp-sky)" />
        <g fill="white" opacity="0.45">
          <ellipse cx="80" cy="90" rx="50" ry="12" style={{ filter: 'blur(4px)' }} />
          <ellipse cx="320" cy="110" rx="60" ry="14" style={{ filter: 'blur(4px)' }} />
        </g>
        <path d="M 100 380 L 200 140 L 300 380 Z" fill="url(#alp-peak)" />
        <path d="M 0 380 L 90 200 L 190 350 Z" fill="#8898aa" opacity="0.75" />
        <path d="M 210 350 L 310 195 L 400 380 Z" fill="#8898aa" opacity="0.75" />
        <path d="M 175 200 L 200 140 L 225 200 L 215 210 L 200 205 L 185 210 Z" fill="url(#alp-snow)" />
        <path d="M 0 370 Q 100 345, 200 355 Q 300 342, 400 358 L 400 440 L 0 440 Z" fill="url(#alp-meadow)" />
        <g>
          <g fill="#f5d060" opacity="0.85">
            {[40,85,120,165,200,250,295,340,380].map((x, i) => (
              <circle key={i} cx={x} cy={372 + (i % 3) * 4} r="2.2" />
            ))}
          </g>
          <g fill="#9080c0" opacity="0.7">
            {[30,78,130,178,225,275,330,365].map((x, i) => (
              <circle key={i} cx={x} cy={378 + (i % 3) * 5} r="1.8" />
            ))}
          </g>
        </g>
        <path d="M 0 425 Q 100 408, 200 415 Q 300 402, 400 414 L 400 500 L 0 500 Z" fill="url(#alp-near)" />
        <path d="M 130 440 Q 160 435, 200 440 Q 230 445, 260 440" stroke="#a8c0d0" strokeWidth="1.6" fill="none" opacity="0.55" />
      </svg>
      */}
      <img
        src={alpineMeadowsImg}
        alt="Alpine Meadows"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </>
  );
}
