// 백설공주 전용 손그림 초상 일러스트 (동화 삽화 스타일).
// 디즈니의 트레이드마크 배색(파랑 보디스+빨강 퍼프소매+빨강 리본 헤어밴드)은
// 피하고, 색 조합·소품 디테일을 새로 구성했다.
export function SnowWhiteIllustration() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full">
      <ellipse cx="100" cy="150" rx="30" ry="14" fill="#2b2118" />
      <path
        d="M42 240 Q42 190 58 168 Q78 152 100 152 Q122 152 142 168 Q158 190 158 240 Z"
        fill="#2f6f5e"
      />
      <path
        d="M42 240 Q40 205 52 182 Q58 176 66 176 Q60 200 64 240 Z"
        fill="#f3b8a3"
      />
      <path
        d="M158 240 Q160 205 148 182 Q142 176 134 176 Q140 200 136 240 Z"
        fill="#f3b8a3"
      />
      <path
        d="M76 172 Q100 186 124 172 L128 190 Q100 202 72 190 Z"
        fill="#fdf6ec"
      />
      <rect x="86" y="130" width="28" height="34" rx="10" fill="#ffe0c2" />

      {/* 뒷머리 — 얼굴 타원보다 크게, 옆으로 단발 볼륨까지 (구멍 없는 단일 도형) */}
      <ellipse cx="100" cy="94" rx="46" ry="50" fill="#2b2118" />
      <path
        d="M56 100 Q52 132 60 150 Q64 168 74 178 L84 172 Q76 158 73 142 Q69 120 70 98 Z"
        fill="#2b2118"
      />
      <path
        d="M144 100 Q148 132 140 150 Q136 168 126 178 L116 172 Q124 158 127 142 Q131 120 130 98 Z"
        fill="#2b2118"
      />

      {/* 얼굴 — 뒷머리보다 작고 낮게, 위쪽에 헤어라인 여백이 남도록 */}
      <ellipse cx="100" cy="114" rx="34" ry="38" fill="#ffe0c2" />

      <path
        d="M62 72 Q58 92 62 116"
        stroke="#5c473a"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* 앞머리 — 이마 위쪽에 자연스러운 헤어라인 */}
      <path
        d="M66 92 Q100 64 134 92 Q116 78 100 78 Q84 78 66 92 Z"
        fill="#2b2118"
      />
      <path
        d="M69 90 Q100 68 131 90 Q115 80 100 80 Q85 80 69 90 Z"
        fill="#4a3728"
      />

      <ellipse cx="79" cy="128" rx="7" ry="5" fill="#f5a6a6" opacity="0.55" />
      <ellipse cx="121" cy="128" rx="7" ry="5" fill="#f5a6a6" opacity="0.55" />

      <path d="M69 106 Q78 99 89 105 Q78 103 69 106 Z" fill="#2b2118" />
      <path d="M111 105 Q122 99 131 106 Q122 103 111 105 Z" fill="#2b2118" />

      <ellipse cx="80" cy="116" rx="9" ry="10.5" fill="#fff" />
      <ellipse cx="120" cy="116" rx="9" ry="10.5" fill="#fff" />
      <circle cx="81" cy="118" r="6.4" fill="#3b2a1e" />
      <circle cx="119" cy="118" r="6.4" fill="#3b2a1e" />
      <circle cx="83.5" cy="115" r="2.2" fill="#fff" />
      <circle cx="121.5" cy="115" r="2.2" fill="#fff" />
      <path
        d="M70 110 Q80 103 90 110"
        stroke="#2b2118"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M110 110 Q120 103 130 110"
        stroke="#2b2118"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M98 132 Q100 137 103 132"
        stroke="#e0a978"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M86 144 Q100 154 114 144 Q100 151 86 144 Z" fill="#c65b5b" />

      {/* 사과 + 손 — 뺨 옆에서 들고 있는 포즈 */}
      <g transform="translate(140,152)">
        <path
          d="M0 6 Q-3 -3 6 -5 Q15 -3 13 6 Q11 13 6 13 Q1 13 0 6 Z"
          fill="#ffe0c2"
        />
        <circle cx="7" cy="-11" r="10" fill="#d1352b" />
        <path
          d="M7 -21 Q4 -25 7 -28"
          stroke="#6b4226"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M8 -26 Q14 -28 16 -23 Q11 -21 8 -26 Z" fill="#4c7a3d" />
        <ellipse cx="4" cy="-15" rx="2.4" ry="3.4" fill="#fff" opacity="0.7" />
      </g>

      {/* 헤어 리본 — 옆머리 장식, 디즈니식 정중앙 헤어밴드 대신 사이드 리본 */}
      <g transform="translate(128,66)">
        <path d="M0 0 L13 -6 L10 4 Z" fill="#c98a9e" />
        <path d="M0 0 L12 7 L7 -3 Z" fill="#c98a9e" />
        <circle cx="0" cy="0" r="3.4" fill="#a9647c" />
      </g>
    </svg>
  );
}
