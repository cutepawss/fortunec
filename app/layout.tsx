import type { Metadata, Viewport } from "next";
import "./global.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Fortune Cast",
  description: "Your daily, shareable fortune.",
  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: "/og",
      button: { title: "Reveal my fortune", action: { type: "launch_miniapp", url: "/" } },
    }),
  },
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {/* --- ARKA PLAN SAHNESİ (z-index:0) --- */}
        <div className="stage">
          <svg viewBox="0 0 1440 2560" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f3b3a" />
                <stop offset="35%" stopColor="#1a6b5a" />
                <stop offset="65%" stopColor="#104761" />
                <stop offset="100%" stopColor="#0b1424" />
              </linearGradient>
              <radialGradient id="orb" cx="42%" cy="38%" r="70%">
                <stop offset="0%" stopColor="#fbfeff" />
                <stop offset="45%" stopColor="#eaf5ff" />
                <stop offset="100%" stopColor="#c6dcff" />
              </radialGradient>
            </defs>

            {/* Gökyüzü */}
            <rect width="1440" height="2560" fill="url(#sky)" />

            {/* Stand */}
            <g transform="translate(720,1710)">
              <rect x="-170" y="16" width="340" height="96" rx="28" fill="#b07a25" />
              <rect x="-150" y="10" width="300" height="26" rx="12" fill="#ffde8e" opacity="0.45" />
            </g>

            {/* Kristal küre */}
            <g transform="translate(720,1580)">
              <circle cx="0" cy="0" r="230" fill="url(#orb)" />
              <circle cx="0" cy="0" r="230" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="4" fill="none" />
            </g>

            {/* Falcı silüeti */}
            <g transform="translate(720,1200)" fill="#0a1224">
              <path d="M-140,-290 C-210,-260 -210,-180 -140,-150 C-100,-60 -20,-40 0,-40 C20,-40 100,-60 140,-150 C210,-180 210,-260 140,-290 C100,-330 40,-350 0,-350 C-40,-350 -100,-330 -140,-290 Z" />
              <circle cx="-95" cy="-360" r="42" />
              <circle cx="95" cy="-360" r="42" />
            </g>

            {/* Tarot kartları */}
            <g transform="translate(720,1900)">
              <rect x="-76" y="-120" width="152" height="216" rx="16" fill="#16325a" stroke="#3e6aa8" strokeWidth="3" />
              <rect x="-260" y="-100" width="152" height="216" rx="16" fill="#16325a" stroke="#3e6aa8" strokeWidth="3" />
              <rect x="108" y="-100" width="152" height="216" rx="16" fill="#16325a" stroke="#3e6aa8" strokeWidth="3" />
            </g>
          </svg>
        </div>

        {/* --- UYGULAMA İÇERİĞİ (z-index:1) --- */}
        <div className="app-content">{children}</div>
      </body>
    </html>
  );
}


