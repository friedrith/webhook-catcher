import RepositoryEvent from './repository-event'

export default class PushEvent extends RepositoryEvent {
  constructor (appName, repository, branch) {
    super(appName, repository)
    this.branch = branch
  }

  toJson () {
    return {
      ...super.toJson(),
      branch: this.branch
    }
  }
}
