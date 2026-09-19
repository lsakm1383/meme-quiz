// 백조 공주 오데트 전용 손그림 초상 (백설공주와 같은 굵은 외곽선 + 플랫 컬러 톤).
const INK = "#241d18";

export function OdetteIllustration() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full">
      <ellipse cx="100" cy="150" rx="30" ry="14" fill="#c7dbe6" />

      <path
        d="M42 240 Q42 190 58 168 Q78 152 100 152 Q122 152 142 168 Q158 190 158 240 Z"
        fill="#bfe3f5"
        stroke={INK}
        strokeWidth="3"
      />
      <path
        d="M42 240 Q40 205 52 182 Q58 176 66 176 Q60 200 64 240 Z"
        fill="#ffffff"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M158 240 Q160 205 148 182 Q142 176 134 176 Q140 200 136 240 Z"
        fill="#ffffff"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M74 174 Q100 190 126 174 L129 192 Q100 204 71 192 Z"
        fill="#ffffff"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="86" y="130" width="28" height="34" rx="10" fill="#ffe3c5" />

      {/* 뒷머리 — 길고 차분한 은발, 어깨 아래까지 */}
      <path
        d="M54 92 Q50 130 54 165 Q56 195 66 214 L80 206 Q71 190 69 165 Q66 130 68 96 Q70 66 100 62 Q130 66 132 96 Q134 130 131 165 Q129 190 120 206 L134 214 Q144 195 146 165 Q150 130 146 92 Q140 54 100 50 Q60 54 54 92 Z"
        fill="#f1f5f9"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <ellipse cx="100" cy="116" rx="34" ry="37" fill="#ffe3c5" stroke={INK} strokeWidth="3" />

      <path
        d="M64 90 Q100 60 136 90 Q117 77 100 77 Q83 77 64 90 Z"
        fill="#f1f5f9"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M67 88 Q100 64 133 88 Q116 78 100 78 Q84 78 67 88 Z"
        fill="#d8e2ea"
        opacity="0.7"
      />

      <ellipse cx="78" cy="130" rx="7" ry="4.5" fill="#f4c9c9" opacity="0.55" />
      <ellipse cx="122" cy="130" rx="7" ry="4.5" fill="#f4c9c9" opacity="0.55" />

      <ellipse cx="79" cy="118" rx="11" ry="13" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="121" cy="118" rx="11" ry="13" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx="80" cy="123" r="6" fill="#6b93a8" />
      <circle cx="120" cy="123" r="6" fill="#6b93a8" />
      <circle cx="82.5" cy="120" r="2.3" fill="#fff" />
      <circle cx="122.5" cy="120" r="2.3" fill="#fff" />
      <path
        d="M68 104 Q79 97 90 102"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M110 102 Q121 97 132 104"
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
        d="M87 144 Q100 152 113 144"
        stroke={INK}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* 깃털 장식 — 백조를 상징하지만 왕관 대신 은은한 소품으로 */}
      <g transform="translate(130,64) rotate(20)">
        <path
          d="M0 0 Q-4 -16 2 -26 Q8 -16 4 0 Z"
          fill="#ffffff"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M0 -4 Q2 -14 2 -22" stroke="#c7d2d8" strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  );
}
