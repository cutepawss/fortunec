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
    // Farcaster Mini App embed card
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: "/og",
      button: { title: "Reveal my fortune", action: { type: "launch_miniapp", url: "/" } },
    }),
  },
  themeColor: "#0f172a",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Fortune Cast" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
