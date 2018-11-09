const { git, Repository } = require('../')
const { join } = require('path')
const { existsSync, mkdirSync } = require('fs')
const execa = require('execa')

const cwd = '/tmp/execa-git-test'
const gitPath = join(cwd, '.git')

beforeEach(() => mkdirSync(cwd))

afterEach(async () => {
  try {
    await execa('rm', ['-rf', cwd])
  } catch (error) {
    console.error(error)
  }
})

describe('git()', () => {
  test('can successfully run git commands as a string', async () => {
    try {
      await git('init', { cwd })
    } catch (error) {
      console.error(error)
    } finally {
      expect(existsSync(gitPath)).toBe(true)
    }
  })

  test('can successfully run git commands as an array', async () => {
    let commitSubject = 'Test commit'
    let headCommitSubject
    try {
      await git('init', { cwd })
      await execa('touch', ['index.js'], { cwd })
      await git('add .', { cwd })
      await git(['commit', '-m', commitSubject], { cwd })
      headCommitSubject = await git('log -1 --pretty=%s', { cwd })
    } catch (error) {
      console.error(error)
    } finally {
      expect(headCommitSubject).toEqual(commitSubject)
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
