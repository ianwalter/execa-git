import { join } from 'path'
import { access, mkdir } from '@ianwalter/fs'
import test from 'ava'
import execa from 'execa'
import { Repository } from '..'

const cwd = 'tmp'
const gitPath = join(cwd, '.git')
const repo = new Repository(cwd)

test.beforeEach(async () => mkdir(cwd, { recursive: true }))
test.afterEach(async () => {
  try {
    await execa('rm', ['-rf', cwd])
  } catch (error) {
    console.error(error)
  }
})

test('can run git commands without specifying cwd', async t => {
  await repo.do('init')
  await t.notThrowsAsync(async () => access(gitPath))
})

test('can return the current branch', async t => {
  await repo.do('init')
  t.is(await repo.currentBranch(), 'master')
})
