import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 다른 사이트가 iframe으로 이 사이트를 감싸 클릭재킹하는 것을 막는다.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // 브라우저가 응답을 선언된 것과 다른 타입으로 추측해서 실행하는 것을 막는다.
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
