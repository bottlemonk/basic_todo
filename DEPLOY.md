# Deployment to Cloudflare Pages

This project is configured for deployment to **Cloudflare Pages**.

## Prerequisites

- A Cloudflare account
- `npm` installed
- `wrangler` CLI optional but recommended (`npm i -g wrangler`)

## Option 1: Git Integration (Recommended)

1. Push your code to a GitHub/GitLab repository.
2. Log in to the Cloudflare Dashboard and go to **Pages**.
3. Click **Connect to Git** and select your repository.
4. Configure the build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npx @cloudflare/next-on-pages` (or `npm run pages:build`)
   - **Build Output Directory**: `.vercel/output/static`
   - **Compatibility Flags**: Add `nodejs_compat` in Settings > Functions > Compatibility Flags.

## Option 2: Direct Upload (CLI)

You can deploy directly from your terminal using Wrangler.

1. Build the project for Cloudflare Pages:
   ```bash
   npm run pages:build
   ```

2. Deploy using Wrangler:
   ```bash
   npx wrangler pages deploy .vercel/output/static --project-name=priority-todo
   ```
   (You will be asked to log in if you haven't already)

## Tech Details

- This project uses `@cloudflare/next-on-pages` to adapt the Next.js build output for Cloudflare's Edge Runtime.
- We added a `pages:build` script to `package.json` that runs this adapter.
