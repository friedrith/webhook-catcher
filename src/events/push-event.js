import RepositoryEvent from './repository-event'

export default class PushEvent extends RepositoryEvent {
  constructor ({ appName = '', repositoryUrl = '', branch = '' }) {
    super('push', appName, repositoryUrl)
    this.branch = branch
  }

  toJson () {
    return {
      ...super.toJson(),
      branch: this.branch
    }
  }
}
