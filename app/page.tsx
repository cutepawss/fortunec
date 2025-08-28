"use client";

import { useEffect, useMemo, useState } from "react";
// SDK yoksa da çalışsın diye try-catch kullanacağız
let mini;
try { mini = require("@farcaster/miniapp-sdk").sdk; } catch { mini = null; }

type Fortune = { text_en: string; category: string };

export default function Home() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState(true);
  const [shared, setShared] = useState(false);
  const origin = useMemo(() => (typeof window !== "undefined" ? window.location.origin : ""), []);

  useEffect(() => {
    (async () => {
      try { if (mini) await mini.actions.ready(); } catch {}
      try {
        const res = await fetch("/api/fortune");
        const data = await res.json();
        setFortune(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const share = async () => {
    if (!fortune) return;
    const url = `${origin}/og?t=${encodeURIComponent(fortune.text_en)}&g=${encodeURIComponent(fortune.category)}`;
    try {
      if (mini) {
        await mini.actions.share({ url, text: `🎴 ${fortune.text_en} #FortuneCast` });
        try { mini.actions.haptics.impact(); } catch {}
      } else {
        window.open(url, "_blank");
      }
      setShared(true);
    } catch {}
  };

  const reroll = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/fortune?reroll=1", { method: "POST" });
      const data = await res.json();
      setFortune(data);
      setShared(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      try { if (mini) mini.actions.haptics.selection(); } catch {}
    }
  };

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="card">
        <h1>🎴 Fortune Cast</h1>
        <p className="meta">{shared ? "Shared to your feed." : "Share to your feed to let others launch the mini app."}</p>

        <div style={{ marginTop: 12, minHeight: 44 }}>
          {loading ? (
            <p>Loading…</p>
          ) : fortune ? (
            <>
              <p style={{ fontSize: 18, lineHeight: 1.35 }}><b>Today’s fortune:</b> {fortune.text_en}</p>
              <span className="badge">#{fortune.category}</span>
            </>
          ) : (
            <p>Couldn’t fetch a fortune. Try reroll.</p>
          )}
        </div>

        <div className="btn-row" style={{ marginTop: 14 }}>
          <button onClick={share} disabled={!fortune || loading}>Share</button>
          <button onClick={reroll} disabled={loading}>Reroll</button>
        </div>
      </div>
    </main>
  );
}

