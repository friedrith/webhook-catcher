import RepositoryEvent from './repository-event'

export default class PingEvent extends RepositoryEvent {
  constructor ({ appName = '', repositoryUrl = '' }) {
    super('ping', appName, repositoryUrl)
  }

  toJson () {
    return {
      ...super.toJson(),
    }
  }
}
