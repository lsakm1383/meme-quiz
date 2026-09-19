// 백설공주 전용 손그림 초상 일러스트 (웹툰풍 굵은 외곽선 + 플랫 채색 스타일).
// 디즈니의 트레이드마크 배색(파랑 보디스+빨강 땡땡이 소매+노랑 치마+빨강 리본)은
// 피하고, 색 조합·소품 디테일을 새로 구성했다.
const INK = "#241d18";

export function SnowWhiteIllustration() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full">
      <ellipse cx="100" cy="150" rx="30" ry="14" fill="#241d18" />

      <path
        d="M42 240 Q42 190 58 168 Q78 152 100 152 Q122 152 142 168 Q158 190 158 240 Z"
        fill="#7a3b45"
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

      {/* 뒷머리 — 얼굴 타원보다 크게, 옆으로 단발 볼륨까지 (구멍 없는 단일 도형) */}
      <ellipse cx="100" cy="94" rx="46" ry="50" fill="#241f1c" stroke={INK} strokeWidth="3" />
      <path
        d="M56 100 Q52 132 60 150 Q64 168 74 178 L84 172 Q76 158 73 142 Q69 120 70 98 Z"
        fill="#241f1c"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M144 100 Q148 132 140 150 Q136 168 126 178 L116 172 Q124 158 127 142 Q131 120 130 98 Z"
        fill="#241f1c"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 얼굴 — 뒷머리보다 작고 낮게, 위쪽에 헤어라인 여백이 남도록 */}
      <ellipse cx="100" cy="116" rx="34" ry="37" fill="#ffe3c5" stroke={INK} strokeWidth="3" />

      <path
        d="M62 74 Q58 94 62 118"
        stroke="#4a423d"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* 앞머리 — 이마 위쪽에 자연스러운 헤어라인 */}
      <path
        d="M64 94 Q100 62 136 94 Q117 79 100 79 Q83 79 64 94 Z"
        fill="#241f1c"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <ellipse cx="78" cy="130" rx="7" ry="4.5" fill="#f4a3a3" opacity="0.6" />
      <ellipse cx="122" cy="130" rx="7" ry="4.5" fill="#f4a3a3" opacity="0.6" />

      {/* 놀란 듯 동그랗게 뜬 큰 눈 — 흰자를 넉넉히 남겨 순진한 인상 */}
      <ellipse cx="79" cy="118" rx="11" ry="13" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="121" cy="118" rx="11" ry="13" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx="80" cy="123" r="6.2" fill="#3b2a1e" />
      <circle cx="120" cy="123" r="6.2" fill="#3b2a1e" />
      <circle cx="82.5" cy="120" r="2.3" fill="#fff" />
      <circle cx="122.5" cy="120" r="2.3" fill="#fff" />
      <path
        d="M68 104 Q79 96 90 103"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M110 103 Q121 96 132 104"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M98 134 Q100 138 103 134"
        stroke="#c98a5c"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M83 142 Q100 155 117 142"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M89 147 Q100 151 111 147"
        stroke="#c65b5b"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* 사과 + 손 — 뺨 옆에서 들고 있는 포즈 */}
      <g transform="translate(140,154)">
        <path
          d="M0 6 Q-3 -4 6 -6 Q16 -4 14 6 Q12 14 6 14 Q0 14 0 6 Z"
          fill="#ffe3c5"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M2 4 Q5 8 9 4" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="7" cy="-12" r="10.5" fill="#e0392f" stroke={INK} strokeWidth="2.5" />
        <path
          d="M7 -23 Q4 -27 7 -30"
          stroke="#6b4226"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M8 -28 Q15 -30 17 -25 Q11 -23 8 -28 Z"
          fill="#5b8c4a"
          stroke={INK}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <ellipse cx="3" cy="-16" rx="2.6" ry="3.6" fill="#fff" opacity="0.8" />
      </g>

      {/* 헤어 리본 — 옆머리 장식, 디즈니식 정중앙 헤어밴드 대신 사이드 리본 */}
      <g transform="translate(124,66) rotate(-15)">
        <path
          d="M-1 0 Q-17 -10 -18 0 Q-17 10 -1 0 Z"
          fill="#e6a0b8"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M1 0 Q17 -10 18 0 Q17 10 1 0 Z"
          fill="#e6a0b8"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="0" r="3.8" fill="#c97a94" stroke={INK} strokeWidth="1.5" />
      </g>
    </svg>
  );
}
