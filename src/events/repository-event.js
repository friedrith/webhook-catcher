import WebhookEvent from '../webhook-event'

export default class RepositoryEvent extends WebhookEvent {
  constructor (type = '', appName = '', repositoryUrl = '') {
    super(type, appName)
    this.repositoryUrl = repositoryUrl
    this.service = ''
  }

  toJson () {
    return {
      ...super.toJson(),
      repositoryUrl: this.repositoryUrl,
      service: this.service,
    }
  }
}
