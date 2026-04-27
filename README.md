# Pre-Flight Checklist

A mobile-first, single-page checklist for packing and preparing for a flight. No build step, no dependencies, no accounts. State is saved per-device in `localStorage`.

## Deploy to Cloudflare Pages

1. `git init && git add . && git commit -m "init"`
2. Push to a GitHub repository.
3. In the [Cloudflare Pages dashboard](https://pages.cloudflare.com), click **Create a project** → **Connect to Git** → select your repo.
4. In the build settings:
   - **Build command**: *(leave blank)*
   - **Build output directory**: `/`
5. Click **Save and Deploy**.

Done. Cloudflare Pages serves `index.html` from the repo root with no build step required.

## Local preview

Open `index.html` directly in a browser, or use any static file server:

```sh
npx serve .
```
