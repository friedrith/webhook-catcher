import EventEmitter from 'events'
import { Router } from 'express'
import bodyParser from 'body-parser'

import { Bitbucket } from './services'

class WebhookCatcher extends EventEmitter {
    constructor (options) {
        super()

        this.id = '/'
        if (options && options.id) {
          this.id += options.id + '/'
        }

        this.token = ''
        if (options && options.token) {
          this.token = options.token
        }

        this.services = []

        this.router = Router()

        this.router.use(bodyParser.json())
        this.router.use(bodyParser.urlencoded({ extended: true }))

        if (options && options.services) {
          for (const service of options.services) {
            let catcher = null
            if (service === 'github') {
              catcher = new Bitbucket(this.token)
            } else if (service === 'bitbucket') {
              catcher = new Bitbucket(this.token)
            }
            this.router.use('/' + catcher.id, catcher.router)

            catcher.on('all', (event) => {
              event.service = service
              this.emit('all', event)
            })

            catcher.on('pull-request', (event) => {
              event.service = service
              this.emit('push', event)
            })

            catcher.on('push', (event) => {
              event.service = service
              this.emit('push', event)
            })
          }
        }
    }
}

export default WebhookCatcher
