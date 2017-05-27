export default class RepositoryEvent {
  constructor (appName = '', repository = '') {
    this.appName = appName
    this.repository = repository
    this.service = ''
  }

  toJson () {
    return {
      name: this.appName,
      repository: this.repository,
      service: this.service
    }
  }
}
