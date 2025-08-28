import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

async function loadFortunes() {
  const filePath = path.join(process.cwd(), "public", "fortunes-en.json");
  const buf = await fs.readFile(filePath, "utf-8");
  return JSON.parse(buf);
}

function todaySeed() {
  const d = new Date();
  const day = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  return day.toISOString().slice(0,10);
}

function hash(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export async function GET(req: NextRequest) {
  const fortunes = await loadFortunes();
  const url = new URL(req.url);
  const fid = url.searchParams.get("fid") || "guest";
  const day = todaySeed();
  const idx = hash(`${fid}-${day}`) % fortunes.length;
  return NextResponse.json(fortunes[idx]);
}

export async function POST(req: NextRequest) {
  const fortunes = await loadFortunes();
  const url = new URL(req.url);
  const reroll = url.searchParams.get("reroll") === "1";
  if (!reroll) return NextResponse.json({ ok: true });
  const idx = Math.floor(Math.random() * fortunes.length);
  return NextResponse.json(fortunes[idx]);
}
