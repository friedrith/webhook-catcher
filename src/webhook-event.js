
/**
 * class WebhookEvent stores information about event triggered by webhook
 */
export default class WebhookEvent {
  constructor (type = '', appName = '') {
    this.type = type
    this.appName = appName
  }

  toJson () {
    return {
      type: this.type,
      name: this.appName,
    }
  }
}
