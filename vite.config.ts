import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dynamic base for GitHub Pages
const repoSlug = process.env.GITHUB_REPOSITORY || ""
const repo = repoSlug.split('/')[1] || ""
const isUserSite = repo.endsWith("github.io")
const base = isUserSite || !repo ? "/" : `/${repo}/`

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 5173 },
})
