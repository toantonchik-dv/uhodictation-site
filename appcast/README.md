# App Updates

This folder hosts Sparkle update feeds for the macOS apps.

## Feeds

- `uho/uho.xml` - update feed for the free app
- `uho-dictation/uho-dictation.xml` - update feed for the commercial app

## Expected public URLs

- `https://uhodictation.com/appcast/uho/uho.xml`
- `https://uhodictation.com/appcast/uho-dictation/uho-dictation.xml`

## Release flow

1. Build and sign the app release in the main `uho` app repository.
2. Keep the generated ZIP archive for Sparkle updates.
3. Upload the heavy DMG/ZIP archives to the `uhodictation-site` GitHub Release for this version tag.
4. From the main app repository, run `scripts/generate-site-appcasts.sh <release-tag> dist/uho-<version>-arm64.zip dist/uho-dictation-<version>-arm64.zip`.
5. Commit and push this site repository so GitHub Pages deploys the new feed XML files.

## Notes

- Only the generated appcast XML files should live in this git repository.
- Heavy ZIP update archives should stay in GitHub Releases and be referenced by URL from the appcast.
- Update archives and appcast files must be served over HTTPS.
- User models and settings are not stored in this website repository; updates only replace the shipped app bundle.
