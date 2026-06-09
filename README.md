# uho Dictation Website

This repository is the production static landing site for `uho Dictation`.

## Structure

The site lives in the repository root:

- `index.html` - main landing page
- `styles.css` - shared visual system
- `app.js` - checkout and email form logic
- `site.js` - EN/UA translations and legal-page content
- `terms.html`
- `privacy.html`
- `refund-policy.html`
- `assets/`
- `CNAME`

## What is already connected

- `Buy lifetime license` calls the live Supabase `create-checkout` function
- Paddle checkout opens from the returned `checkoutURL`
- support email is set to `support@mail.uhodictation.com`

## Current release download

Current public DMG URL:

```text
https://github.com/toantonchik-dv/uhodictation-site/releases/download/v1.1.0/uho-dictation-1.1.0-arm64.dmg
```

## Deploy model

- GitHub Pages deploys from this repository
- the workflow is `.github/workflows/deploy-pages.yml`
- `uhodictation.com` is defined in `CNAME`

## App update hosting

This site also hosts the Sparkle appcast feeds used by the macOS app updater.

- `appcast/uho.xml` - free app feed
- `appcast/uho-dictation.xml` - commercial app feed
- `appcast/` - also stores generated Sparkle ZIP archives, delta files, and release notes before deploy

The app repository generates release ZIPs and appcasts. This site repository serves them publicly over HTTPS.

## Local preview

From the repo root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```
