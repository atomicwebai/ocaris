import { cp, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { oracoes } from '../src/data/oracoes.js'

const routes = [
  '/rito-comunhao',
  '/ritos-finais',
  '/liturgia-do-dia',
  ...oracoes.map(({ id }) => `/oracao/${encodeURIComponent(id)}`),
]

for (const route of routes) {
  const destination = resolve('dist', `.${route}`)
  await mkdir(destination, { recursive: true })
  await cp('dist/index.html', resolve(destination, 'index.html'))
}
