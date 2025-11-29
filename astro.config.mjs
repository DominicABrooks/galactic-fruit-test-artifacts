import { defineConfig } from 'astro/config';

// https://astro.build/config
// Only set `site` when running inside GitHub Actions (or when overridden via SITE_URL).
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const siteUrl = isGitHubActions ? (process.env.SITE_URL || 'https://github.com/DominicABrooks/DominicABrooks.github.io/galactic-fruit-test-artifacts') : undefined;

export default defineConfig({
  ...(siteUrl ? { site: siteUrl } : {}),
  base: '/',
  integrations: [],
});
