# ReceiptCircle Simple Showcase

Minimal React landing page with:
- App icon branding
- Interactive app screen walkthrough
- Privacy Policy page
- Terms & Conditions page

## Local run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output:
- `dist/`

## GitHub Pages publish

1. Create a public GitHub repo (for example `myapplication-showcase`).
2. Push this project to that repo.
3. Keep `public/CNAME` set to your custom domain (`receiptcircle.com`).
4. Rebuild (`npm run build`).
5. Publish the contents of `dist/` to GitHub Pages.

Note: this project uses relative asset paths (`base: "./"`) so it works on GitHub Pages project URLs and with a custom domain.

## Pages

- `/` home landing page
- `/privacy.html` privacy policy
- `/terms.html` terms and conditions

## Assets

Screenshots:
- `public/screens/screen-01-receipt-details.webp`
- `public/screens/screen-02-home.webp`
- `public/screens/screen-03-connections.webp`
- `public/screens/opening.png`
- `public/screens/opening.webp`

Branding:
- `public/favicon.svg`
- `public/receiptcircle-icon.svg`

## SEO

Generated in `dist/`:
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
