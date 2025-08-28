# Fortune Cast — Farcaster Mini App (Zero-Setup Guide)

This is a minimal Next.js app that runs as a Farcaster Mini App.
- Embed card is enabled via `fc:miniapp` meta.
- Shares a dynamic OG image (`/og`) with the current fortune text.
- Fortune data is preloaded at `public/fortunes-en.json` (20,000 items).

## 0) You need a Vercel account
- Go to vercel.com and sign up (free).

## 1) Deploy
- Click “New Project” → “Import” → “Upload” and upload this ZIP.
- Wait for deploy to finish. You’ll get a domain like `https://your-app.vercel.app`.

## 2) Test
- Open the URL in your mobile Farcaster client browser.
- You’ll see a fortune and two buttons: Share, Reroll.

## 3) Share in Feed
- Tap Share. The card uses `/og` to render a clean image.
- Others can launch the Mini App from your embed button.

## 4) Optional
- Edit `app/layout.tsx` to change the button title or image URL.
- Replace `public/fortunes-en.json` with your own (same structure).

### Notes
- If the SDK is not available (outside the Mini App), Share falls back to opening the image URL.
- For production, you can add Quick Auth + streaks + rate limits later.


## Discoverability tips
- Post a cast with your app URL; the card shows a Launch button.
- Pin a cast with the link to your profile.
- Add the URL in your profile bio/links.
- Ask friends to recast; join relevant channels and share politely.
- Use a custom domain for trust (e.g., fortunes.yourname.com).
- Share a QR code screenshot pointing to your domain on X/Farcaster/IG.
