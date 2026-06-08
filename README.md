# uho Dictation Website

This folder contains the static landing site for `uho Dictation`.

## Files

- `index.html` - main landing page
- `styles.css` - shared visual system
- `app.js` - checkout and email form logic
- `terms.html`
- `privacy.html`
- `refund-policy.html`

## What is already connected

- `Buy lifetime license` calls the live Supabase `create-checkout` function
- Paddle checkout opens from the returned `checkoutURL`
- support email is set to `support@mail.uhodictation.com`

## What still needs final release setup

Before going live, update `downloadUrl` in `app.js` to the final public DMG URL.

Recommended final file URL:

```text
https://uhodictation.com/downloads/uho-dictation-latest.dmg
```

## Local preview

From the repo root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/website/
```
