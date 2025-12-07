/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Custom colors for Galactic Fruit theme
                'Galactic Fruit-dark': '#0a0a0c',
                'Galactic Fruit-panel': '#131316',
                'Galactic Fruit-accent': '#3b82f6', // Blue for now, can adjust
                'Galactic Fruit-text': '#e2e8f0',
                'Galactic Fruit-muted': '#94a3b8',
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
