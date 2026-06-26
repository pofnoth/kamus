import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function run() {
  // 1. Build client bundle
  console.log('Building client bundle...')
  await build({
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    }
  })

  // 2. Build server (SSR) bundle
  console.log('Building server (SSR) bundle...')
  await build({
    build: {
      ssr: 'src/main.ts',
      outDir: 'dist-server',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'esm',
        }
      }
    }
  })

  // 3. Import server entry
  const serverEntryPath = path.resolve(__dirname, './dist-server/main.js')
  const { createApp } = await import(serverEntryPath)
  const { renderSSRHead } = await import('@unhead/vue/server')
  const { renderToString } = await import('@vue/server-renderer')

  // 4. Read client template index.html
  const templatePath = path.resolve(__dirname, './dist/index.html')
  const template = fs.readFileSync(templatePath, 'utf-8')

  // 5. Gather all routes
  const postsDir = path.resolve(__dirname, './src/posts')
  const postFiles = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : []
  const slugs = postFiles
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))

  const routes = [
    '/',
    '/blog',
    ...slugs.map(slug => `/blog/${slug}`)
  ]

  console.log(`Prerendering ${routes.length} routes...`)

  for (const url of routes) {
    console.log(`Rendering route: ${url}`)
    const { app, router, head } = await createApp()

    // Push the route and wait until it is ready
    await router.push(url)
    await router.isReady()

    // Render the App component to HTML string
    const appHtml = await renderToString(app)

    // Render head tags
    const headPayload = renderSSRHead(head)

    let html = template
      .replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`)

    if (headPayload) {
      const headTags = headPayload.headTags || ''
      const htmlAttrs = headPayload.htmlAttrs || ''
      const bodyAttrs = headPayload.bodyAttrs || ''
      const bodyTags = headPayload.bodyTags || ''

      // Inject HTML attributes into <html lang="id">
      if (htmlAttrs) {
        // Strip any duplicate lang attribute from htmlAttrs since we already have lang="id"
        const cleanHtmlAttrs = htmlAttrs.replace(/lang="[^"]*"/g, '').trim()
        if (cleanHtmlAttrs) {
          html = html.replace('<html lang="id">', `<html lang="id" ${cleanHtmlAttrs}>`)
        }
      }
      
      // Inject body attributes
      if (bodyAttrs) {
        html = html.replace('<body>', `<body ${bodyAttrs}>`)
      }

      // Inject head tags (title, meta, styles, scripts)
      if (headTags) {
        html = html.replace('</head>', `${headTags}\n</head>`)
      }

      // Inject body tags if any
      if (bodyTags) {
        html = html.replace('</body>', `${bodyTags}\n</body>`)
      }
    }

    // Write the output file
    const relativeFolder = url === '/' ? '' : url.substring(1)
    const destFolder = path.join(__dirname, './dist', relativeFolder)
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder, { recursive: true })
    }
    fs.writeFileSync(path.join(destFolder, 'index.html'), html, 'utf-8')
  }

  // Copy dist/index.html to dist/404.html for fallback client-side routing on missing pages
  fs.copyFileSync(
    path.join(__dirname, './dist/index.html'),
    path.join(__dirname, './dist/404.html')
  )

  // 7. Cleanup the temporary SSR directory
  console.log('Cleaning up temporary SSR build...')
  fs.rmSync(path.resolve(__dirname, './dist-server'), { recursive: true, force: true })
  console.log('Pre-rendering successfully complete!')
}

run().catch(err => {
  console.error('Error during prerender:', err)
  process.exit(1)
})
