import "./global.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Fortune Cast",
  description: "Your daily, shareable fortune.",
  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: "/og",
      button: { title: "Reveal my fortune", action: { type: "launch_miniapp", url: "/" } }
    })
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
