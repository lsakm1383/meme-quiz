// 개구리 왕자의 공주 전용 손그림 초상 (백설공주와 같은 굵은 외곽선 + 플랫 컬러 톤).
// 원작 그림 동화 속 "황금 공"을 소품으로 사용 — 개구리 자체는 그리지 않는다.
const INK = "#241d18";

export function FrogPrincePrincessIllustration() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full">
      <ellipse cx="100" cy="150" rx="30" ry="14" fill="#5a3420" />

      <path
        d="M42 240 Q42 190 58 168 Q78 152 100 152 Q122 152 142 168 Q158 190 158 240 Z"
        fill="#3f7d4e"
        stroke={INK}
        strokeWidth="3"
      />
      <path
        d="M42 240 Q40 205 52 182 Q58 176 66 176 Q60 200 64 240 Z"
        fill="#f6c9a6"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M158 240 Q160 205 148 182 Q142 176 134 176 Q140 200 136 240 Z"
        fill="#f6c9a6"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M76 172 Q100 186 124 172 L128 190 Q100 202 72 190 Z"
        fill="#fdf3e4"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="86" y="130" width="28" height="34" rx="10" fill="#ffe3c5" />

      {/* 뒷머리 — 활동적인 하이 포니테일 */}
      <ellipse cx="100" cy="96" rx="44" ry="48" fill="#8a4a2f" stroke={INK} strokeWidth="3" />
      <path
        d="M124 62 Q148 58 156 78 Q162 100 148 118 Q140 128 128 130 Q140 108 136 88 Q132 70 118 64 Z"
        fill="#8a4a2f"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="146" cy="74" rx="6" ry="9" fill="#c65b5b" stroke={INK} strokeWidth="2" />

      <ellipse cx="100" cy="118" rx="34" ry="37" fill="#ffe3c5" stroke={INK} strokeWidth="3" />

      <path
        d="M64 96 Q100 64 136 96 Q117 81 100 81 Q83 81 64 96 Z"
        fill="#8a4a2f"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <ellipse cx="78 " cy="132" rx="7" ry="4.5" fill="#f4a3a3" opacity="0.6" />
      <ellipse cx="122" cy="132" rx="7" ry="4.5" fill="#f4a3a3" opacity="0.6" />

      <ellipse cx="79" cy="120" rx="11" ry="12.5" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="121" cy="120" rx="11" ry="12.5" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx="81" cy="124" r="6.2" fill="#3b2a1e" />
      <circle cx="121" cy="124" r="6.2" fill="#3b2a1e" />
      <circle cx="83.5" cy="121" r="2.3" fill="#fff" />
      <circle cx="123.5" cy="121" r="2.3" fill="#fff" />
      <path
        d="M68 106 Q79 97 91 105"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M109 105 Q121 97 132 106"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M98 136 Q100 140 103 136"
        stroke="#c98a5c"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M84 144 Q100 158 116 144"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M90 148 Q100 153 110 148"
        stroke="#c65b5b"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* 황금 공 — 원작 그림 동화 속 소품 */}
      <g transform="translate(140,152)">
        <path
          d="M0 6 Q-3 -3 6 -5 Q15 -3 13 6 Q11 13 6 13 Q1 13 0 6 Z"
          fill="#ffe3c5"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="-11" r="10" fill="#e8b923" stroke={INK} strokeWidth="2.5" />
        <path d="M0 -14 Q7 -18 14 -14" stroke="#c99414" strokeWidth="1.4" fill="none" opacity="0.7" />
        <ellipse cx="4" cy="-15" rx="2.4" ry="3.2" fill="#fff" opacity="0.7" />
      </g>

      {/* 연잎 머리핀 — 연못 테마를 은은하게 */}
      <g transform="translate(128,68)">
        <path
          d="M0 0 Q-9 -6 -8 -13 Q2 -14 8 -6 Q6 2 0 0 Z"
          fill="#4c9a5a"
          stroke={INK}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="-9" r="2" fill="#fdf3e4" stroke={INK} strokeWidth="1.2" />
      </g>
    </svg>
  );
}
