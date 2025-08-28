"use client";

import { useEffect, useMemo, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

type Fortune = { text_en: string; category: string };

export default function Home() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareOk, setShareOk] = useState(false);
  const origin = useMemo(() => (typeof window !== "undefined" ? window.location.origin : ""), []);

  useEffect(() => {
    (async () => {
      try { await sdk.actions.ready(); } catch {}
      try {
        const res = await fetch("/api/fortune");
        const data = await res.json();
        setFortune(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleShare = async () => {
    if (!fortune) return;
    const url = `${origin}/og?t=${encodeURIComponent(fortune.text_en)}&g=${encodeURIComponent(fortune.category)}`;
    try {
      await sdk.actions.share({ url, text: `🎴 ${fortune.text_en} #FortuneCast` });
      setShareOk(true);
      try { sdk.actions.haptics.impact(); } catch {}
    } catch {
      window.open(url, "_blank");
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h1>🎴 Fortune Cast</h1>
        {loading && <p>Loading…</p>}
        {!loading && fortune && (
          <>
            <p style={{fontSize:16, lineHeight:1.4}}><b>Today’s fortune:</b> {fortune.text_en}</p>
            <p className="meta">Category: {fortune.category}{shareOk ? " · Shared 🎉" : ""}</p>
            <div className="btn-row">
              <button onClick={handleShare}>Share this fortune</button>
              <button onClick={async () => {
                setLoading(true);
                const res = await fetch("/api/fortune?reroll=1", { method: "POST" });
                const data = await res.json();
                setFortune(data);
                setLoading(false);
                try { sdk.actions.haptics.selection(); } catch {}
              }}>Reroll (try another)</button>
            </div>
          </>
        )}
      </div>
      <div className="badge">Tip: share to your feed so others can launch the app from your card.</div>
    </main>
  );
}
