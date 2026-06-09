# App Updates

This folder hosts Sparkle update feeds for the macOS apps.

## Feeds

- `uho.xml` - update feed for the free app
- `uho-dictation.xml` - update feed for the commercial app

## Expected public URLs

- `https://uhodictation.com/appcast/uho.xml`
- `https://uhodictation.com/appcast/uho-dictation.xml`

## Release flow

1. Build and sign the app release in the main `uho` app repository.
2. Keep the generated ZIP archive for Sparkle updates.
3. From the main app repository, run `scripts/stage-site-appcast.sh dist/<archive>.zip`.
4. That script copies the archive here and regenerates the appcast XML and any delta files in place.
5. Commit and push this site repository so GitHub Pages deploys the new feed.

## Notes

- The generated appcast, ZIP archives, delta files, and release notes files should live directly in this `appcast/` folder.
- Update archives and appcast files must be served over HTTPS.
- User models and settings are not stored in this website repository; updates only replace the shipped app bundle.
