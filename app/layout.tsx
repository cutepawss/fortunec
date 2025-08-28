import "./global.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Fortune Cast",
  description: "Your daily, shareable fortune.",
  other: {
    // Farcaster Mini App embed card
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: "/og",
      button: { title: "Reveal my fortune", action: { type: "launch_miniapp", url: "/" } }
    })
  },
  viewport: { width: "device-width", initialScale: 1, viewportFit: "cover" },
  themeColor: "#0f172a",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Fortune Cast" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={outfit.className}>
        {/* === INLINE FULL-SCREEN SVG BACKGROUND (no file needed) === */}
        <svg
          className="app-bg"
          viewBox="0 0 1440 2560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* night sky gradient */}
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f3b3a" />
              <stop offset="35%" stopColor="#1a6b5a" />
              <stop offset="65%" stopColor="#104761" />
              <stop offset="100%" stopColor="#0b1424" />
            </linearGradient>

            {/* crystal ball material */}
            <radialGradient id="orb" cx="42%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#fbfeff" />
              <stop offset="45%" stopColor="#eaf5ff" />
              <stop offset="100%" stopColor="#c6dcff" />
            </radialGradient>

            {/* soft glow */}
            <radialGradient id="glow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* background */}
          <rect width="1440" height="2560" fill="url(#sky)" />

          {/* a handful of stars (kept light so the SVG stays small) */}
          <g fill="#e9f3ff" opacity="0.7">
            <circle cx="220" cy="220" r="1.6" />
            <circle cx="1180" cy="380" r="1.2" />
            <circle cx="360" cy="760" r="1.4" />
            <circle cx="980" cy="980" r="1.2" />
            <circle cx="720" cy="320" r="1.8" />
            <circle cx="180" cy="640" r="1.1" />
            <circle cx="1260" cy="720" r="1.3" />
            <circle cx="240" cy="1040" r="1.2" />
            <circle cx="1140" cy="1120" r="1.4" />
            <circle cx="720" cy="140" r="1.4" />
          </g>

          {/* table shadow */}
          <ellipse cx="720" cy="1800" rx="620" ry="140" fill="#06101e" opacity="0.55" />

          {/* crystal ball stand (simple) */}
          <g transform="translate(720,1710)">
            <rect x="-170" y="16" width="340" height="96" rx="28" fill="#b07a25" />
            <rect x="-150" y="10" width="300" heig
