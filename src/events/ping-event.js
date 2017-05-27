import RepositoryEvent from './repository-event'

export default class PingEvent extends RepositoryEvent {
  constructor (appName, repository) {
    super(appName, repository)
  }

  toJson () {
    return {
      ...super.toJson(),
    }
  }
}
