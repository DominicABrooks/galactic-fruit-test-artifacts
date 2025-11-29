import { defineConfig } from 'astro/config';

// Official, simple Astro config for GitHub Pages (follow docs):
// - `site` must be the GitHub Pages domain: https://<username>.github.io
// - `base` should be your repository name prefixed with a slash
// No conditional logic here — keep it simple and explicit.
export default defineConfig({
  site: 'https://dominicabrooks.github.io',
  base: '/galactic-fruit-test-artifacts',
});
