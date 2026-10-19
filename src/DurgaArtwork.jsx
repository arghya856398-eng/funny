
import React from "react";

const GOLD = "#ffd783";

export default function DurgaArtwork({ progress = 1, time = 0 }) {
  const draw = Math.max(0, Math.min(1, progress));
  const colour = Math.max(0, Math.min(1, (progress - 0.3) / 0.7));

  const weapons = [
    { x: 276, y: 164, type: "trident" },
    { x: 300, y: 226, type: "sword" },
    { x: 299, y: 293, type: "bow" },
    { x: 320, y: 362, type: "lotus" },
    { x: 355, y: 415, type: "disc" },
    { x: 624, y: 164, type: "trident" },
    { x: 600, y: 226, type: "sword" },
    { x: 601, y: 293, type: "bow" },
    { x: 580, y: 362, type: "lotus" },
    { x: 545, y: 415, type: "disc" },
  ];

  const petals = Array.from({ length: 24 }, (_, i) => ({
    x: (i * 127 + 37) % 900,
    y: (i * 91 + time * (14 + (i % 5) * 3)) % 600,
    r: 3 + (i % 4),
  }));

  return (
    <svg
      id="durga-artwork"
      viewBox="0 0 900 650"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustrated Maa Durga with ten arms, golden crown, lion and lotus"
    >
      <defs>
        <radialGradient id="sky">
          <stop offset="0%" stopColor="#71317b" />
          <stop offset="65%" stopColor="#29133f" />
          <stop offset="100%" stopColor="#10091e" />
        </radialGradient>

        <radialGradient id="aura">
          <stop offset="0%" stopColor="#fff2bd" stopOpacity=".85" />
          <stop offset="55%" stopColor="#ff9d42" stopOpacity=".28" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff4bb" />
          <stop offset="48%" stopColor="#f5c55d" />
          <stop offset="100%" stopColor="#a95a20" />
        </linearGradient>

        <linearGradient id="sari" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb93e" />
          <stop offset="45%" stopColor="#ed3948" />
          <stop offset="100%" stopColor="#741a61" />
        </linearGradient>

        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd0a1" />
          <stop offset="100%" stopColor="#d87f70" />
        </linearGradient>

        <linearGradient id="lionGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe69b" />
          <stop offset="100%" stopColor="#d16b24" />
        </linearGradient>
      </defs>

      {/* Night sky */}
      <rect width="900" height="650" fill="url(#sky)" />

      {Array.from({ length: 75 }, (_, i) => (
        <circle
          key={i}
          cx={(i * 127 + 17) % 900}
          cy={(i * 79 + 12) % 500}
          r={i % 5 === 0 ? 2 : 1}
          fill="#fff2c5"
          opacity={0.2 + (i % 5) * 0.13}
        />
      ))}

      {/* Glowing divine aura */}
      <circle
        cx="450"
        cy="250"
        r={195 + Math.sin(time * 2) * 5}
        fill="url(#aura)"
      />

      {/* Halo */}
      <g opacity={draw}>
        <circle
          cx="450"
          cy="235"
          r="156"
          fill="none"
          stroke={GOLD}
          strokeWidth="3"
          strokeDasharray="8 9"
        />
        <circle
          cx="450"
          cy="235"
          r="140"
          fill="none"
          stroke="#ffb955"
          strokeWidth="2"
        />
        {Array.from({ length: 24 }, (_, i) => (
          <path
            key={i}
            d="M450 82 Q464 104 450 120 Q436 104 450 82"
            fill="url(#gold)"
            stroke={GOLD}
            transform={`rotate(${i * 15} 450 235)`}
          />
        ))}
      </g>

      {/* Lotus platform */}
      <g opacity={draw}>
        {Array.from({ length: 13 }, (_, i) => (
          <ellipse
            key={i}
            cx="450"
            cy="538"
            rx="24"
            ry="66"
            transform={`rotate(${(i - 6) * 13} 450 538)`}
            fill="#d94181"
            stroke="#ffc0df"
            strokeWidth="1.5"
          />
        ))}
        <ellipse cx="450" cy="554" rx="158" ry="23" fill="#ffb6da" />
        <ellipse cx="450" cy="547" rx="133" ry="14" fill="#ffe0ef" />
      </g>

      {/* Ten arms and divine weapons */}
      <g opacity={draw}>
        {weapons.map((weapon, i) => {
          const left = i < 5;
          const startX = left ? 410 : 490;
          const startY = 300 + (i % 5) * 15;
          const armX = weapon.x;
          const armY = weapon.y + 25;
          const middleX = (startX + armX) / 2;

          return (
            <g
              key={i}
              style={{
                transformOrigin: "450px 330px",
                transform: `rotate(${Math.sin(time * 1.4 + i) * 1.7}deg)`,
              }}
            >
              <path
                d={`M${startX} ${startY} Q${middleX} ${startY - 15} ${armX} ${armY}`}
                fill="none"
                stroke="#7d2946"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d={`M${startX} ${startY} Q${middleX} ${startY - 15} ${armX} ${armY}`}
                fill="none"
                stroke="url(#skin)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              <circle
                cx={armX}
                cy={armY}
                r="10"
                fill="url(#skin)"
                stroke={GOLD}
                strokeWidth="2"
              />

              {weapon.type === "trident" && (
                <g
                  stroke={GOLD}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                >
                  <path d={`M${armX} ${armY + 4} v-70`} />
                  <path d={`M${armX} ${armY - 52} l-16 -19`} />
                  <path d={`M${armX} ${armY - 52} l16 -19`} />
                  <path d={`M${armX} ${armY - 52} v-24`} />
                </g>
              )}

              {weapon.type === "sword" && (
                <g stroke={GOLD} strokeWidth="4" strokeLinecap="round">
                  <path
                    d={`M${armX} ${armY} l23 -51 l-4 40 Z`}
                    fill="#dceaf5"
                  />
                  <path d={`M${armX - 10} ${armY - 4} l20 9`} />
                </g>
              )}

              {weapon.type === "bow" && (
                <g fill="none" stroke={GOLD} strokeWidth="4">
                  <path
                    d={`M${armX} ${armY - 27} Q${armX + 30} ${armY} ${armX} ${armY + 27}`}
                  />
                  <path
                    d={`M${armX} ${armY - 27} L${armX} ${armY + 27}`}
                />
                </g>
              )}

              {weapon.type === "lotus" && (
                <g fill="#ff8dc5" stroke="#ffd5e8" strokeWidth="1.5">
                  <circle cx={armX} cy={armY - 16} r="10" />
                  <circle cx={armX - 9} cy={armY - 8} r="8" />
                  <circle cx={armX + 9} cy={armY - 8} r="8" />
                </g>
              )}

              {weapon.type === "disc" && (
                <circle
                  cx={armX + (left ? 9 : -9)}
                  cy={armY - 12}
                  r="17"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="5"
                />
              )}

              <circle
                cx={middleX}
                cy={(startY + armY) / 2}
                r="5"
                fill="url(#gold)"
              />
            </g>
          );
        })}
      </g>

      {/* Body */}
      <g opacity={draw}>
        <path
          d="M397 285 Q450 261 503 285 L530 430 Q493 468 450 465 Q407 468 370 430 Z"
          fill="url(#skin)"
          stroke={GOLD}
          strokeWidth="3"
        />

        {/* Sari colours gradually appear */}
        <path
          d="M397 290 Q450 319 503 290 L530 430 Q490 470 450 463 Q410 470 370 430 Z"
          fill="url(#sari)"
          fillOpacity={colour}
          stroke={GOLD}
          strokeWidth="3"
        />

        <path
          d="M407 310 Q450 350 493 310 L510 426 Q450 455 390 426 Z"
          fill="none"
          stroke={GOLD}
          strokeWidth="4"
          opacity={colour}
        />

        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M${405 + i * 12} 350 l${-15 + i * 3} 75`}
            stroke="#ffda78"
            strokeWidth="2"
            opacity={colour}
          />
        ))}

        <path
          d="M407 286 Q450 305 493 286 L482 321 Q450 340 418 321 Z"
          fill="url(#gold)"
          stroke="#fff0b1"
          strokeWidth="2"
        />
      </g>

      {/* Neck and necklaces */}
      <g opacity={draw}>
        <path
          d="M430 256 L430 292 Q450 310 470 292 L470 256"
          fill="url(#skin)"
        />
        <path
          d="M419 284 Q450 323 481 284 L470 312 Q450 335 430 312 Z"
          fill="url(#gold)"
          stroke="#fff0b1"
          strokeWidth="3"
        />
        <circle cx="450" cy="310" r="8" fill="#e23d54" stroke="#fff0b1" strokeWidth="2" />
        <path d="M407 320 Q450 357 493 320" fill="none" stroke={GOLD} strokeWidth="4" />
      </g>

      {/* Face */}
      <g opacity={draw}>
        <path
          d="M410 188 Q450 163 490 188 L484 245 Q474 278 450 283 Q426 278 416 245 Z"
          fill="url(#skin)"
          stroke="#ffdc9a"
          strokeWidth="3"
        />

        {/* Eyebrows */}
        <path d="M418 209 Q430 198 443 210" fill="none" stroke="#54223a" strokeWidth="4" />
        <path d="M457 210 Q470 198 482 209" fill="none" stroke="#54223a" strokeWidth="4" />

        {/* Eyes */}
        <path d="M419 218 Q431 229 443 218 Q431 212 419 218" fill="#fff7e7" />
        <path d="M457 218 Q469 229 481 218 Q469 212 457 218" fill="#fff7e7" />
        <circle cx="431" cy="220" r="3.5" fill="#29152a" />
        <circle cx="469" cy="220" r="3.5" fill="#29152a" />

        {/* Nose and smile */}
        <path d="M450 221 l-5 20 l10 0" fill="none" stroke="#c77b62" strokeWidth="2.5" />
        <path d="M436 249 Q450 261 464 249 Q450 254 436 249" fill="#a82b46" />
        <path d="M441 246 Q450 251 459 246" fill="none" stroke="#fff0ce" strokeWidth="2" />

        {/* Bindi and earrings */}
        <circle cx="450" cy="201" r="5" fill="#c71940" />
        <circle cx="407" cy="250" r="5" fill="url(#gold)" />
        <circle cx="493" cy="250" r="5" fill="url(#gold)" />
        <path d="M418 237 Q405 230 410 248" fill="none" stroke="#e99080" strokeWidth="3" />
        <path d="M482 237 Q495 230 490 248" fill="none" stroke="#e99080" strokeWidth="3" />
      </g>

      {/* Crown */}
      <g opacity={draw}>
        <path
          d="M405 194 L395 145 L420 159 L435 112 L450 151 L467 112 L481 159 L506 145 L495 194 Z"
          fill="url(#gold)"
          stroke="#fff0b1"
          strokeWidth="3"
        />
        <path
          d="M414 180 L423 163 L435 178 L450 157 L466 178 L478 163 L487 180 Z"
          fill="#b92f50"
          stroke="#ffe39b"
          strokeWidth="2"
        />
        <circle cx="450" cy="142" r="7" fill="#e73858" stroke="#fff2b6" strokeWidth="2" />
        <circle cx="430" cy="169" r="5" fill="#55d7d1" />
        <circle cx="470" cy="169" r="5" fill="#55d7d1" />
        <path d="M405 194 Q450 208 495 194" fill="none" stroke="#fff0b1" strokeWidth="5" />
      </g>

      {/* Lion */}
      <g
        opacity={draw}
        style={{ transform: `translateY(${Math.sin(time * 2) * 2}px)` }}
      >
        <path
          d="M532 434 Q550 383 600 394 Q653 384 681 423 Q707 452 675 491 L620 508 L558 482 Z"
          fill="#a94a26"
          stroke="#ffd27c"
          strokeWidth="3"
        />
        <path
          d="M555 431 Q558 397 599 404 Q640 394 661 426 Q683 453 650 476 Q612 495 574 470 Z"
          fill="url(#lionGold)"
          stroke="#ffe5a2"
          strokeWidth="3"
        />
        <path
          d="M584 428 Q598 408 621 422 L644 439 L633 460 L603 464 L584 448 Z"
          fill="#ffe3a0"
          stroke="#a94a26"
          strokeWidth="3"
        />
        <path d="M593 437 l12 2 M620 437 l12 -2" stroke="#44202a" strokeWidth="5" />
        <path d="M607 450 l7 5 l7 -5" fill="#54202a" />
        <path
          d="M614 455 Q608 465 603 457 M614 455 Q621 465 626 457"
          fill="none"
          stroke="#8d2431"
          strokeWidth="2"
        />
        <path d="M583 423 L573 409 L596 414" fill="#f8bf67" stroke="#a94a26" strokeWidth="3" />
        <path d="M642 421 L654 408 L656 433" fill="#f8bf67" stroke="#a94a26" strokeWidth="3" />
        <path d="M569 477 L563 503 L590 500 L603 483 M640 481 L649 503 L672 497 L666 469" fill="#e99a45" stroke="#ffd27c" strokeWidth="3" />
        <path d="M552 422 Q530 407 538 390 Q551 401 560 414" fill="#f4b74f" stroke="#ffd27c" strokeWidth="3" />
        <path d="M551 430 l-16 -6 M555 438 l-17 1 M561 446 l-15 7" stroke="#ffe4a5" strokeWidth="2" />
      </g>

      {/* Foreground garden */}
      <g opacity={draw}>
        <path d="M0 590 Q200 560 350 595 T900 586 V650 H0 Z" fill="#24112f" />
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i} transform={`translate(${45 + i * 100} 592)`}>
            <path d="M0 0 Q-25 -20 -17 -39 Q0 -30 0 0 Q25 -20 18 -39 Q0 -30 0 0" fill="#34885d" />
            <circle cy="-15" r="8" fill="#f15d9a" />
            <circle cx="-7" cy="-20" r="7" fill="#ffb7da" />
            <circle cx="7" cy="-20" r="7" fill="#ffb7da" />
            <circle cy="-25" r="6" fill="#ffd86f" />
          </g>
        ))}
      </g>

      {/* Floating petals */}
      {petals.map((petal, i) => (
        <ellipse
          key={i}
          cx={petal.x + Math.sin(time + i) * 22}
          cy={petal.y}
          rx={petal.r}
          ry={petal.r * 0.6}
          fill={i % 2 ? "#ff8fbd" : "#ffd56f"}
          opacity=".8"
          transform={`rotate(${time * 35 + i * 17} ${petal.x} ${petal.y})`}
        />
      ))}

      <text
        x="450"
        y="625"
        textAnchor="middle"
        fill="#ffe5a0"
        fontSize="27"
        fontWeight="bold"
        letterSpacing="3"
        opacity={draw}
      >
        শুভ দুর্গাপূজা
      </text>
    </svg>
  );
}
