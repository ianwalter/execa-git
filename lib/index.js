const execa = require('execa')

const currentBranchRe = /On branch (.*)\n/
const git = async (cmd, opts) => {
  const cmdList = Array.isArray(cmd) ? cmd : cmd.split(' ')
  const { stdout } = await execa('git', cmdList, opts)
  return stdout
}

class Repository {
  constructor (cwd) {
    this.cwd = cwd
  }

  do (cmd) {
    return git(cmd, { cwd: this.cwd })
  }

  async currentBranch () {
    const status = await this.do('status -b')
    const results = currentBranchRe.exec(status)
    return results[1]
  }
}

module.exports = { git, Repository }
