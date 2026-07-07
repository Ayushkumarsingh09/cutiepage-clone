# Cutiepage Clone

A fully functional, self-hostable clone of [cutiepage.in](https://www.cutiepage.in/) — customisable gift pages for birthdays, anniversaries, apologies, and more.

**No login, signup, payment, or pricing.** All templates are free to create, customise, publish, and share.

## Live links

- **Live site:** https://cutiepage-clone.vercel.app
- **GitHub:** https://github.com/Ayushkumarsingh09/cutiepage-clone
- **Vercel dashboard:** https://vercel.com/ayushs-projects-e5782a01/cutiepage-clone

## Features

- 20 interactive templates (birthday, anniversary, wedding, apology, love notes, and more)
- Section-based editor — customise text, photos, music, and messages
- Live preview while editing
- One-click publish with shareable link
- QR code generation and download
- Optional password protection on published pages
- Mobile-first, animated template experiences

## Quick start

```bash
cd cutiepage-clone
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## How it works

1. Browse templates at `/products`
2. Click **Make it yours** on any template
3. Fill in each section (names, messages, photo URLs, music links)
4. Click **Publish** — get a shareable link and QR code
5. Share `/p/[your-page-id]` with the recipient

## Deploy to Vercel

1. Push this folder to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Deploy — no environment variables required

Published pages are stored in `data/pages/` as JSON files. On Vercel, use a persistent store for production:

- **Option A:** Vercel Blob or KV (recommended for production)
- **Option B:** Supabase free tier
- **Option C:** Keep file storage for local/self-hosted Node.js

For **Hostinger shared hosting**, build statically won't work for the API routes. Use either:

- Host the Next.js app on Vercel (free) and point your domain there
- Or use Hostinger's Node.js hosting if available

## Project structure

```
src/
  app/              # Pages and API routes
  components/
    editor/         # Template editor and share modal
    marketing/      # Homepage sections
    templates/      # Template renderers (20 templates)
  data/             # Template registry (extracted from cutiepage)
  lib/              # Storage, snapshots, utilities
data/pages/         # Published pages (JSON)
```

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pages` | GET | List all published pages |
| `/api/pages` | POST | Create/publish a page |
| `/api/pages/[id]` | GET | Get page data |
| `/api/pages/[id]` | PUT | Update page |
| `/api/pages/[id]` | DELETE | Delete page |
| `/api/pages/[id]/verify` | POST | Verify password |

## Templates included

Birthday Wish 01–04, Birthday Wish 02, Cute Birthday, Sweet Birthday, Love Note, Flower Note, Anniversary Special, Wedding Special, Cute Apology, Apology Site, Special Apology, Sorry Petals, Cute Website v2, Father's Day, Mother's Day, Mother's Day v2, Brother's Day, Best Friend's Day

## Notes

- Template media (images, GIFs, music) loads from `cdn.cutiepage.in` public CDN
- For custom photos, paste any public image URL in the editor
- Drafts are also saved to browser `localStorage` for recovery

## License

For personal/educational use. Cutiepage is a commercial product by Pinak Kundu; this is an independent recreation without login or payment flows.
