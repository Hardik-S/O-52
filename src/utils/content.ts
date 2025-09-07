export interface AppMeta {
  slug: string
  title: string
  week: number
  emoji?: string
  date?: string
  screenshot?: string
  codeUrl?: string
  blogUrl?: string
  post?: string
}

const metaModules = import.meta.glob('../../apps/**/meta.json', { eager: true, as: 'raw' })
const postModules = import.meta.glob('../../apps/**/post.md', { eager: true, as: 'raw' })

const APPS: AppMeta[] = []

for (const path in metaModules) {
  try {
    const raw = metaModules[path] as unknown as string
    const meta = JSON.parse(raw)
    const folder = path.split('/').slice(0, -1).join('/')
    const postPath = folder + '/post.md'
    const post = postModules[postPath] as unknown as string | undefined
    APPS.push({
      slug: meta.slug,
      title: meta.title,
      week: meta.week,
      emoji: meta.emoji,
      date: meta.date,
      screenshot: meta.screenshot,
      codeUrl: meta.codeUrl,
      blogUrl: meta.blogUrl,
      post: post || ''
    })
  } catch (e) {
    console.error('Invalid meta.json at', path, e)
  }
}

export function getAllApps(): AppMeta[] {
  const list = [...APPS]
  const existingWeeks = new Set(list.map(a => a.week))
  for (let w=1; w<=52; w++) {
    if (!existingWeeks.has(w)) {
      list.push({ slug: `week-${String(w).padStart(2,'0')}`, title: `Week ${w}`, week: w, emoji: '🧩', post: '' })
    }
  }
  return list
}

export function getAppBySlug(slug: string): AppMeta | undefined {
  return getAllApps().find(a => a.slug === slug)
}
