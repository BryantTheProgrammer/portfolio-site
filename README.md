"# Portfolio Site

A lightweight static portfolio site for Bryant Hayden, highlighting experience in SCADA, MES, IIoT, and manufacturing automation.

## Run locally

Install dependencies and start the Astro development server:

```bash
npm install
npm run dev
```

Then open the URL printed by Astro, usually:

```text
http://localhost:4321
```

To create a production build:

```bash
npm run build
```

## Files

- `src/pages/` — Astro page routes
- `src/components/` — shared site components, including navigation
- `public/` — static assets served directly by Astro
- `public/certifications/` — certificate images and PDFs used by the credential popups
- `README.md` — quick usage notes

## Add a certificate asset

Place a certificate file in `public/certifications/`, then update its record in `src/components/CertificationGrid.astro`:

```js
assetPath: "/certifications/ignition-core.pdf",
assetType: "pdf",
```

Use `assetType: "image"` for a JPG, PNG, or WebP certificate image. The tile popup will automatically show the matching preview and an open-link button.

## Add PWA and iPhone icons

Put these generated PNG files in `public/icons/`:

- `apple-touch-icon.png` — 180 × 180 px (iPhone/iPad bookmark and Home Screen icon)
- `icon-192.png` — 192 × 192 px (web app manifest)
- `icon-512.png` — 512 × 512 px (web app manifest)

The site already links the iPhone touch icon and `public/site.webmanifest` on
its pages. Keep the artwork square, opaque, and centered with some padding; do
not add rounded corners, since the platform applies its own mask. The existing
browser favicon remains `public/favicon.svg`.

Prompt for an image-generation model:

> Create a polished, minimal app icon for a personal portfolio belonging to
> Bryant Hayden, a controls engineer working in SCADA, MES, IIoT, and
> manufacturing automation. Use a single bold capital “B” as the primary
> recognizable mark, with a subtle industrial/technical feel rather than
> literal machinery or tiny interface details. Use a deep navy background
> (#0b1020) and a bright light-blue “B” (#73c2fb), matching a clean,
> contemporary developer portfolio. Compose it as a square, flat, high-contrast
> icon that remains legible at small sizes. Center the mark and leave generous
> safe padding on all sides. Use an opaque background. No text other than the
> single “B”, no mockup, no border, no baked-in rounded corners, no shadow, no
> gradients, and no transparency. Deliver as a crisp 1024 × 1024 PNG master;
> export square PNGs from it at 180 × 180, 192 × 192, and 512 × 512, named
> `apple-touch-icon.png`, `icon-192.png`, and `icon-512.png` respectively.
" 
