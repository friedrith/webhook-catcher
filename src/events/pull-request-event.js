import RepositoryEvent from './repository-event'

export default class PullRequestEvent extends RepositoryEvent {
  constructor (appName, repository, branchSource, branchDestination, title, description = '') {
    super(appName, repository)
    this.branchSource = branchSource
    this.branchDestination = branchDestination
    this.description = description
  }

  toJson () {
    return {
      ...super.toJson(),
      title: this.title,
      branchSource: this.branchSource,
      branchDestination: this.branchDestination,
      description: this.description
    }
  }
}
