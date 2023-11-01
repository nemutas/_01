import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig(() => {
  return {
    root: './src',
    publicDir: '../public',
    base: '/_01/',
    build: {
      outDir: '../dist',
    },
    plugins: [glsl()],
    server: {
      host: true,
    },
  }
})
