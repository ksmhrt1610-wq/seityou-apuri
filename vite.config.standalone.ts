import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Produces a single, fully self-contained index.html (JS/CSS/fonts/icons
 * all inlined as data URIs) so the app can be downloaded and opened
 * directly in a browser — no server, no build step, no network access.
 * Run with: npm run build:standalone
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: 'dist-standalone',
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 20_000,
  },
})
