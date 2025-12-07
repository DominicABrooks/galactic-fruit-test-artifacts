/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'galactic-fruit-dark': '#0a0a0c',
                'galactic-fruit-panel': '#131316',
                'galactic-fruit-accent': '#3b82f6', // Blue for now, can adjust
                'galactic-fruit-text': '#e2e8f0',
                'galactic-fruit-muted': '#94a3b8',
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
