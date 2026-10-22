# PWA icons

Place the generated PNG files in this directory using these exact names:

- `apple-touch-icon.png` — 180 × 180 px, for iPhone/iPad bookmarks and Home Screen shortcuts
- `icon-192.png` — 192 × 192 px, for the web app manifest
- `icon-512.png` — 512 × 512 px, for the web app manifest

Use square PNGs with an opaque background. Keep the mark centered with safe
padding; iOS and some launchers apply their own masks. Do not bake rounded
corners into the image.

The files are referenced by `src/components/SiteIcons.astro` and
`site.webmanifest`. The browser favicon remains `public/favicon.svg`.
