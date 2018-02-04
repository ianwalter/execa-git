const execa = require('execa')

const git = (cmd, opts) => execa('git', cmd, opts)

class Repository {
  constructor (path) {
    this.path = path
  }
  
  do (cmd) {
    return git(cmd, { cwd: this.path })
  }
  
  currentBranch () {
    return this.do('rev-parse --abbrev-ref HEAD')
  }
}

module.exports = { Repository, git }
