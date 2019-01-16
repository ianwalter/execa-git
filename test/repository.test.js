import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import test from 'ava'
import execa from 'execa'
import { Repository } from '..'

const cwd = 'tmp'
const gitPath = join(cwd, '.git')
const repo = new Repository(cwd)

test.beforeEach(() => mkdirSync(cwd, { recursive: true }))
test.afterEach(async () => {
  try {
    await execa('rm', ['-rf', cwd])
  } catch (error) {
    console.error(error)
  }
})

test('Repository can run git commands without specifying cwd', async t => {
  await repo.do('init')
  t.true(existsSync(gitPath))
})

test('Repository can return the current branch', async t => {
  await repo.do('init')
  t.is(await repo.currentBranch(), 'master')
})
