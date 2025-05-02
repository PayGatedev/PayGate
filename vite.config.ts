import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [tailwindcss(), react(),
    nodePolyfills({
      include: ['stream'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  
  
})
