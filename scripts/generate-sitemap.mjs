import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(process.cwd())
const curriculumPath = resolve(root, 'src', 'data', 'curriculum.ts')
const publicDir = resolve(root, 'public')

const siteUrl = process.env.VITE_SITE_URL?.trim() || 'https://singularitylab.example.com'
const origin = new URL(siteUrl).origin
const now = new Date().toISOString().slice(0, 10)

const content = readFileSync(curriculumPath, 'utf8')

const sectionRegex = /id:\s*'([^']+)',\s*\n\s*discipline:/g
const entryRegex = /sectionId:\s*'([^']+)',\s*\n\s*slug:\s*'([^']+)'/g

const routes = new Set(['/'])

for (const match of content.matchAll(sectionRegex)) {
  routes.add(`/section/${match[1]}`)
}

for (const match of content.matchAll(entryRegex)) {
  routes.add(`/section/${match[1]}/${match[2]}`)
}

const urls = Array.from(routes).sort((a, b) => a.localeCompare(b))

const body = urls
  .map(pathname => {
    const priority = pathname === '/' ? '1.0' : pathname.split('/').length > 3 ? '0.7' : '0.8'
    return `  <url>\n    <loc>${new URL(pathname, origin).toString()}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(resolve(publicDir, 'sitemap.xml'), xml, 'utf8')

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', origin).toString()}\n`
writeFileSync(resolve(publicDir, 'robots.txt'), robots, 'utf8')
