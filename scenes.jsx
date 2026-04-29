// scenes.jsx — sprite-based scenes for the apology site

const { useState, useEffect, useRef } = React;

// ─── Animated SVG Sprite Helpers ──────────────────────────────────────────

// Bouncing puppy-eyes "noob" character
function NoobMe({ x = 0, y = 0, scale = 1, sad = true }) {
  const t = useTime();
  const blink = Math.sin(t * 3) > 0.95 ? 0.1 : 1;
  const tearY = (t * 80) % 200;
  const tearOpacity = sad ? Math.max(0, 1 - tearY / 120) : 0;
  const wobble = Math.sin(t * 2) * 3;

  return (
    <g transform={`translate(${x},${y}) scale(${scale}) rotate(${wobble})`}>
      {/* body */}
      <ellipse cx="0" cy="60" rx="55" ry="45" fill="#FFD8B1" />
      {/* head */}
      <circle cx="0" cy="0" r="60" fill="#FFE0BD" stroke="#000" strokeWidth="3" />
      {/* hair */}
      <path d="M -55 -20 Q -50 -65 0 -60 Q 50 -65 55 -20 Q 40 -45 20 -40 Q 0 -50 -20 -40 Q -40 -45 -55 -20 Z" fill="#2a1810" />
      {/* eyes - puppy big */}
      <ellipse cx="-20" cy="0" rx="14" ry={14 * blink} fill="white" stroke="#000" strokeWidth="2" />
      <ellipse cx="20" cy="0" rx="14" ry={14 * blink} fill="white" stroke="#000" strokeWidth="2" />
      <circle cx="-18" cy="2" r={7 * blink} fill="#2a1810" />
      <circle cx="22" cy="2" r={7 * blink} fill="#2a1810" />
      <circle cx="-15" cy="-2" r={3 * blink} fill="white" />
      <circle cx="25" cy="-2" r={3 * blink} fill="white" />
      {/* eyebrows worried */}
      <path d="M -35 -20 Q -25 -25 -10 -18" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 35 -20 Q 25 -25 10 -18" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* sad mouth */}
      {sad ? (
        <path d="M -15 30 Q 0 18 15 30" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M -18 22 Q 0 38 18 22" stroke="#000" strokeWidth="3" fill="#ff6b8a" strokeLinecap="round" />
      )}
      {/* tear */}
      {sad && (
        <ellipse cx="-22" cy={15 + tearY * 0.4} rx="4" ry="7" fill="#5dc1f0" opacity={tearOpacity} />
      )}
      {/* nameplate */}
      <rect x="-50" y="105" width="100" height="22" rx="4" fill="#fff" stroke="#000" strokeWidth="2" />
      <text x="0" y="121" textAnchor="middle" fontFamily="monospace" fontSize="13" fontWeight="700">noob_me.exe</text>
    </g>
  );
}

// Tanisha (angry → forgiving)
function Tanisha({ x = 0, y = 0, scale = 1, angry = true }) {
  const t = useTime();
  const steam = (t * 200) % 300;
  const tap = Math.sin(t * 8) * (angry ? 4 : 0);

  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {/* steam puffs when angry */}
      {angry && [0, 1, 2].map(i => (
        <circle key={i}
          cx={-30 + i * 30}
          cy={-90 - ((steam + i * 80) % 200) * 0.6}
          r={6 + (i % 2) * 3}
          fill="#bbb"
          opacity={Math.max(0, 1 - ((steam + i * 80) % 200) / 200)}
        />
      ))}
      <g transform={`rotate(${tap})`}>
        {/* body */}
        <ellipse cx="0" cy="65" rx="58" ry="48" fill={angry ? "#d94a6e" : "#f4a3c2"} />
        {/* head */}
        <circle cx="0" cy="0" r="62" fill="#FFD2A8" stroke="#000" strokeWidth="3" />
        {/* hair - long */}
        <path d="M -62 -10 Q -75 60 -50 100 Q -55 50 -55 0 Q -60 -55 0 -65 Q 60 -55 55 0 Q 55 50 50 100 Q 75 60 62 -10 Q 50 -65 0 -70 Q -50 -65 -62 -10 Z" fill="#1a0d05" />
        {/* bindi */}
        <circle cx="0" cy="-35" r="4" fill="#c4002b" />
        {/* eyes - angry */}
        {angry ? (
          <>
            <path d="M -32 -8 L -8 -2" stroke="#000" strokeWidth="4" strokeLinecap="round" />
            <path d="M 32 -8 L 8 -2" stroke="#000" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="-20" cy="6" rx="8" ry="6" fill="white" stroke="#000" strokeWidth="2" />
            <ellipse cx="20" cy="6" rx="8" ry="6" fill="white" stroke="#000" strokeWidth="2" />
            <circle cx="-20" cy="6" r="5" fill="#000" />
            <circle cx="20" cy="6" r="5" fill="#000" />
          </>
        ) : (
          <>
            <path d="M -30 0 Q -20 -8 -10 0" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 30 0 Q 20 -8 10 0" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        )}
        {/* mouth */}
        {angry ? (
          <path d="M -18 32 Q 0 22 18 32" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M -22 25 Q 0 45 22 25" stroke="#000" strokeWidth="3" fill="#ff6b8a" strokeLinecap="round" />
        )}
        {/* cheeks */}
        <circle cx="-35" cy="20" r="8" fill="#ff9aae" opacity="0.6" />
        <circle cx="35" cy="20" r="8" fill="#ff9aae" opacity="0.6" />
        {/* nameplate */}
        <rect x="-65" y="108" width="130" height="22" rx="4" fill="#fff" stroke="#000" strokeWidth="2" />
        <text x="0" y="124" textAnchor="middle" fontFamily="monospace" fontSize="13" fontWeight="700">tanisha.queen</text>
      </g>
    </g>
  );
}

// Floating heart
function Heart({ x, y, delay = 0, color = "#e94560" }) {
  const t = useTime();
  const local = Math.max(0, t - delay);
  const yOff = -local * 60;
  const xOff = Math.sin(local * 2) * 20;
  const opacity = Math.max(0, 1 - local / 4);
  const scale = 0.5 + Math.min(local, 0.5);
  return (
    <g transform={`translate(${x + xOff},${y + yOff}) scale(${scale})`} opacity={opacity}>
      <path d="M0,-8 C-12,-20 -25,-12 -25,0 C-25,15 0,25 0,25 C0,25 25,15 25,0 C25,-12 12,-20 0,-8 Z"
        fill={color} stroke="#000" strokeWidth="2" />
    </g>
  );
}

// "GROUP" chat sprite
function WhatsAppGroup({ x = 0, y = 0, leaving = false }) {
  const t = useTime();
  const shake = leaving ? Math.sin(t * 30) * 4 : 0;
  return (
    <g transform={`translate(${x + shake},${y})`}>
      <rect x="-90" y="-60" width="180" height="120" rx="12" fill="#fff" stroke="#000" strokeWidth="3" />
      <rect x="-90" y="-60" width="180" height="22" rx="12" fill="#25D366" />
      <rect x="-90" y="-50" width="180" height="12" fill="#25D366" />
      <text x="0" y="-44" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#fff">FRIENDS 4 EVER 💚</text>
      {/* messages */}
      <rect x="-78" y="-28" width="90" height="14" rx="4" fill="#f0f0f0" />
      <rect x="12" y="-10" width="70" height="14" rx="4" fill="#dcf8c6" />
      <rect x="-78" y="8" width="100" height="14" rx="4" fill="#f0f0f0" />
      <rect x="-78" y="26" width="60" height="14" rx="4" fill="#f0f0f0" />
      {leaving && (
        <text x="0" y="50" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#c4002b">
          ⚠ noob_me LEFT ⚠
        </text>
      )}
    </g>
  );
}

// ─── SCENES ────────────────────────────────────────────────────────────────

function Scene1_TheCrime() {
  const t = useSprite()?.localTime ?? 0;
  const exitX = t > 2 ? Math.min((t - 2) * 400, 800) : 0;
  const arrowProgress = Math.min(Math.max((t - 1) / 1, 0), 1);

  return (
    <g>
      {/* big background label */}
      <text x="640" y="80" textAnchor="middle" fontFamily="'Bungee', system-ui" fontSize="42" fill="#1a0d05">
        THE INCIDENT 🚨
      </text>
      <text x="640" y="115" textAnchor="middle" fontFamily="monospace" fontSize="18" fill="#c4002b">
        evidence #001 — april 2026
      </text>

      <WhatsAppGroup x={420} y={380} leaving={t > 1.5} />

      {/* arrow showing exit */}
      {t > 0.8 && (
        <g opacity={arrowProgress}>
          <path d={`M 540 380 Q ${600 + arrowProgress * 50} 320 ${700 + arrowProgress * 100} 380`}
            stroke="#c4002b" strokeWidth="4" fill="none" strokeDasharray="8 6" />
          <text x="650" y="320" textAnchor="middle" fontFamily="monospace" fontSize="16" fontWeight="700" fill="#c4002b">
            *poof* gone
          </text>
        </g>
      )}

      {/* noob me running away */}
      <g transform={`translate(${860 + exitX}, 380)`}>
        <NoobMe scale={0.9} sad={false} />
        {t > 2 && (
          <text x="0" y="-100" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="700" fill="#c4002b">
            "click" 🤡
          </text>
        )}
      </g>
    </g>
  );
}

function Scene2_Realization() {
  const sp = useSprite();
  const t = sp?.localTime ?? 0;
  const shake = t < 1 ? Math.sin(t * 40) * 6 : 0;

  return (
    <g>
      <text x="640" y="80" textAnchor="middle" fontFamily="'Bungee', system-ui" fontSize="42" fill="#1a0d05">
        REALIZATION HITS 💥
      </text>
      <text x="640" y="115" textAnchor="middle" fontFamily="monospace" fontSize="18" fill="#1a0d05">
        ohhh nooo what have i done
      </text>

      <g transform={`translate(${640 + shake}, 380)`}>
        <NoobMe scale={1.4} sad={true} />
      </g>

      {/* thought bubble */}
      {t > 1 && (
        <g opacity={Math.min((t - 1), 1)}>
          <ellipse cx="900" cy="280" rx="160" ry="80" fill="#fff" stroke="#000" strokeWidth="3" />
          <circle cx="800" cy="340" r="14" fill="#fff" stroke="#000" strokeWidth="3" />
          <circle cx="780" cy="370" r="8" fill="#fff" stroke="#000" strokeWidth="3" />
          <text x="900" y="270" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700">
            wait... was that
          </text>
          <text x="900" y="290" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700">
            tanisha's group???
          </text>
          <text x="900" y="312" textAnchor="middle" fontFamily="monospace" fontSize="22">😱</text>
        </g>
      )}
    </g>
  );
}

function Scene3_Angry() {
  const sp = useSprite();
  const t = sp?.localTime ?? 0;
  const lightning = Math.floor(t * 4) % 2 === 0;

  return (
    <g>
      {lightning && t < 2 && (
        <rect x="0" y="0" width="1280" height="720" fill="#fff" opacity="0.3" />
      )}
      <text x="640" y="80" textAnchor="middle" fontFamily="'Bungee', system-ui" fontSize="42" fill="#c4002b">
        TANISHA = FURIOUS 🔥
      </text>
      <text x="640" y="115" textAnchor="middle" fontFamily="monospace" fontSize="18" fill="#1a0d05">
        threat level: maximum biryani-withholding
      </text>

      <Tanisha x={640} y={380} scale={1.5} angry={true} />

      {/* speech bubble */}
      {t > 0.5 && (
        <g opacity={Math.min(t - 0.5, 1)}>
          <rect x="850" y="280" width="340" height="120" rx="12" fill="#fff" stroke="#000" strokeWidth="3" />
          <path d="M 850 340 L 800 360 L 870 370 Z" fill="#fff" stroke="#000" strokeWidth="3" />
          <text x="1020" y="315" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#c4002b">
            ऐ बेबिया गुस्सा हो क्या?
          </text>
          <text x="1020" y="345" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#1a0d05">
            "leave the group again"
          </text>
          <text x="1020" y="365" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#1a0d05">
            "and you're DEAD bestie 🔪"
          </text>
        </g>
      )}
    </g>
  );
}

function Scene4_Apology() {
  const sp = useSprite();
  const t = sp?.localTime ?? 0;

  // hearts emit
  const hearts = [];
  for (let i = 0; i < 12; i++) {
    if (t > i * 0.3) {
      hearts.push(
        <Heart key={i}
          x={500 + (i * 67) % 280}
          y={500 + (i * 43) % 80}
          delay={i * 0.3}
          color={["#e94560", "#ff9aae", "#c4002b", "#ff6b8a"][i % 4]}
        />
      );
    }
  }

  return (
    <g>
      <text x="640" y="80" textAnchor="middle" fontFamily="'Bungee', system-ui" fontSize="42" fill="#c4002b">
        I AM SO SORRY 🙏
      </text>
      <text x="640" y="115" textAnchor="middle" fontFamily="monospace" fontSize="18" fill="#1a0d05">
        offering: 1 (one) entire kneeling friend
      </text>

      <g transform="translate(640, 420) rotate(0)">
        {/* kneeling pose body */}
        <ellipse cx="0" cy="80" rx="80" ry="30" fill="#1a0d05" opacity="0.2" />
        <NoobMe scale={1.2} sad={true} />
      </g>

      {hearts}

      {/* "i am noob" sign */}
      {t > 1 && (
        <g transform={`translate(640, 230) rotate(${Math.sin(t * 2) * 4})`} opacity={Math.min(t - 1, 1)}>
          <rect x="-180" y="-30" width="360" height="50" rx="6" fill="#fff8d6" stroke="#000" strokeWidth="3" />
          <text x="0" y="3" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="#1a0d05">
            i am noob & innocent 🥺
          </text>
        </g>
      )}
    </g>
  );
}

function Scene5_Forgive() {
  const sp = useSprite();
  const t = sp?.localTime ?? 0;
  const hugProgress = Math.min(t / 2, 1);
  const dx = 200 - 200 * hugProgress;

  // confetti
  const confetti = [];
  if (t > 1.8) {
    for (let i = 0; i < 30; i++) {
      const ct = t - 1.8;
      const cx = 640 + Math.cos(i) * 300 + Math.sin(i * 7) * 100;
      const cy = 200 + (ct * 200 + i * 30) % 600;
      confetti.push(
        <rect key={i} x={cx} y={cy} width="10" height="14"
          fill={["#e94560", "#ffd54f", "#5dc1f0", "#7ed957", "#c4002b"][i % 5]}
          transform={`rotate(${ct * 200 + i * 40} ${cx + 5} ${cy + 7})`} />
      );
    }
  }

  return (
    <g>
      <text x="640" y="80" textAnchor="middle" fontFamily="'Bungee', system-ui" fontSize="42" fill="#1a0d05">
        FORGIVENESS ARC ✨
      </text>
      <text x="640" y="115" textAnchor="middle" fontFamily="monospace" fontSize="18" fill="#1a0d05">
        golgappe + ice cream loading...
      </text>

      <NoobMe x={500 + dx * 0.5} y={400} scale={1} sad={t < 2} />
      <Tanisha x={780 - dx * 0.5} y={400} scale={1} angry={t < 1.5} />

      {confetti}

      {t > 2 && (
        <g opacity={Math.min(t - 2, 1)}>
          <text x="640" y="600" textAnchor="middle" fontFamily="'Bungee', system-ui" fontSize="38" fill="#c4002b">
            ❤ BESTIES RESTORED ❤
          </text>
        </g>
      )}
    </g>
  );
}

window.Scene1_TheCrime = Scene1_TheCrime;
window.Scene2_Realization = Scene2_Realization;
window.Scene3_Angry = Scene3_Angry;
window.Scene4_Apology = Scene4_Apology;
window.Scene5_Forgive = Scene5_Forgive;
window.NoobMe = NoobMe;
window.Tanisha = Tanisha;
window.Heart = Heart;
