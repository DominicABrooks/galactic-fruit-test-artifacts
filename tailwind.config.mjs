/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Custom colors for Galactic Fruit theme
                'eoe-dark': '#0a0a0c',
                'eoe-panel': '#131316',
                'eoe-accent': '#3b82f6', // Blue for now, can adjust
                'eoe-text': '#e2e8f0',
                'eoe-muted': '#94a3b8',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
