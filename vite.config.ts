import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: '成長の書 -Growth Quest-',
        short_name: '成長の書',
        description: 'クエストをこなして成長する、あなただけの冒険者ステータス管理アプリ',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#05060f',
        theme_color: '#05060f',
        lang: 'ja',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          {
            src: '/icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Fonts and app-shell assets are content-hashed, so cache them
        // forever and let a fresh deploy simply ship new hashed filenames.
        runtimeCaching: [],
      },
    }),
  ],
})
