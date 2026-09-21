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
" 
