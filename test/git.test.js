import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import test from 'ava'
import execa from 'execa'
import { git } from '..'

const cwd = 'tmp'
const gitPath = join(cwd, '.git')

test.beforeEach(() => mkdirSync(cwd, { recursive: true }))
test.afterEach(async () => {
  try {
    await execa('rm', ['-rf', cwd])
  } catch (error) {
    console.error(error)
  }
})

test('git can run git commands as a string', async t => {
  await git('init', { cwd })
  t.true(existsSync(gitPath))
})

test('git can run git commands as an array', async t => {
  let commitSubject = 'Test commit'
  await git('init', { cwd })
  await execa('touch', ['index.js'], { cwd })
  await git('add .', { cwd })
  await git(['commit', '-m', commitSubject], { cwd })
  t.is(await git('log -1 --pretty=%s', { cwd }), commitSubject)
})
