# Testing-EoE

Notes for GitHub Pages deployment (Astro)

- Commit your lockfile: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb` so the Astro Action detects the package manager.

- In `astro.config.mjs`, set the `site` to your GitHub Pages domain and `base` to the repository path. Example:

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://dominicabrooks.github.io',
  base: '/galactic-fruit-test-artifacts',
})
```

- Test locally without the base by running:

```cmd
npm run dev
```

- To simulate Pages build locally (optional):

```cmd
set SITE_URL=https://dominicabrooks.github.io
set BASE_PATH=/galactic-fruit-test-artifacts
npm run build
```

- GitHub Actions: use the official `withastro/action@v3` (already in `.github/workflows/deploy.yaml`). Ensure the Pages source is set to GitHub Actions in repository Settings → Pages.
