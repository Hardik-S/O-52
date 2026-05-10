import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('./unlock.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
})
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString('base64')}`
const { computeUnlocked } = await import(moduleUrl)

function withSearch(search, fn) {
  const previousLocation = globalThis.location
  globalThis.location = { search }
  try {
    return fn()
  } finally {
    if (previousLocation === undefined) {
      delete globalThis.location
    } else {
      globalThis.location = previousLocation
    }
  }
}

assert.equal(withSearch('?unlock=10', computeUnlocked), 10)
assert.equal(withSearch('?unlock=0', computeUnlocked), 1)
assert.equal(withSearch('?unlock=99', computeUnlocked), 52)

for (const value of ['abc', '8abc', '3.5', '']) {
  const unlocked = withSearch(`?unlock=${encodeURIComponent(value)}`, computeUnlocked)
  assert.equal(Number.isInteger(unlocked), true, `${value} should resolve to an integer`)
  assert.equal(unlocked >= 1 && unlocked <= 52, true, `${value} should stay within the unlock range`)
}
