const { Repository, git } = require('../lib')

describe('git()', () => {
  test('', async () => {
    
  })
})

describe('Repository', () => {
  const repo = new Repository()

  describe('.do()', () => {
    test('', async () => {
      await repo.do()
    })
  })
  
  describe('.currentBranch()', () => {
    test('', async () => {
      const branch = await repo.currentBranch()
    })
  })
})
