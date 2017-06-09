import RepositoryEvent from './repository-event'

export default class PullRequestEvent extends RepositoryEvent {
  // constructor (appName, repository, branchSource, branchDestination, title, description = '') {
  constructor ({
    appName = '',
    repositoryUrl = '',
    branchSource = '',
    branchDestination = '',
    title = '',
    description = '',
    reviewers = [],
    url = '',
  }) {
    super('pull-request', appName, repositoryUrl)
    this.branchSource = branchSource
    this.branchDestination = branchDestination
    this.description = description
    this.title = title
    this.reviewers = reviewers
    this.url = url
  }

  toJson () {
    return {
      ...super.toJson(),
      title: this.title,
      branchSource: this.branchSource,
      branchDestination: this.branchDestination,
      description: this.description,
      reviewers: this.reviewers,
      url: this.url,
    }
  }
}
