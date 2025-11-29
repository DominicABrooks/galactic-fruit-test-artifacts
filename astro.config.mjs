import { defineConfig } from 'astro/config';

// https://astro.build/config
// Only set `site` and `base` when running in GitHub Actions (or when overridden via env vars).
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const defaultGitHubPagesSite = 'https://dominicabrooks.github.io';
const defaultBasePath = '/galactic-fruit-test-artifacts';

// Set `site` only when in GH Actions or when `SITE_URL` is explicitly provided.
const siteUrl = (isGitHubActions || process.env.SITE_URL)
  ? (process.env.SITE_URL || defaultGitHubPagesSite)
  : undefined;

// Set `base` only when in GH Actions or when `BASE_PATH` is explicitly provided.
const basePath = (isGitHubActions || process.env.BASE_PATH)
  ? (process.env.BASE_PATH || defaultBasePath)
  : undefined;

export default defineConfig({
  ...(siteUrl ? { site: siteUrl } : {}),
  ...(basePath ? { base: basePath } : {}),
  integrations: [],
});
