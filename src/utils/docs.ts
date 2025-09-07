export interface Doc { id: string; content: string; createdAt: number }
const KEY = 'deep-research-docs'

export function saveDoc(content: string): string {
  const list = listDocs()
  const id = Math.random().toString(36).slice(2)
  list.unshift({ id, content, createdAt: Date.now() })
  localStorage.setItem(KEY, JSON.stringify(list))
  return id
}

export function listDocs(): Doc[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
