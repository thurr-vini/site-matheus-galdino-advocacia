import { defineConfig } from 'vite'

// Configuração independente do MonkeyCode.
export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 5173
  }
})
