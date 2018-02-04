const { git, Repository } = require('../lib')
const { join } = require('path')
const { existsSync, mkdirSync } = require('fs')
const del = require('del')

const cwd = '/tmp/execa-git-test'
const gitPath = join(cwd, '.git')

beforeEach(() => mkdirSync(cwd))

afterEach(async () => del(cwd, { force: true }))

describe('git()', () => {
  test('can successfully run git commands', async () => {
    try {
      await git('init', { cwd })
    } catch (error) {
      console.error(error)
    } finally {
      expect(existsSync(gitPath)).toBe(true)
    }
  })
})

describe('Repository', () => {
  const repo = new Repository(cwd)

  describe('.do()', () => {
    test('can run git commands without specifying cwd', async () => {
      try {
        await repo.do('init')
      } catch (error) {
        console.error(error)
      } finally {
        expect(existsSync(gitPath)).toBe(true)
      }
    })
  })

  describe('.currentBranch()', () => {
    test('returns the correct current branch', async () => {
      let branch
      try {
        await repo.do('init')
        branch = await repo.currentBranch()
      } catch (error) {
        console.error(error)
      } finally {
        expect(branch).toEqual('master')
      }
    })
  })
})
