import EventEmitter from 'events'
import { Router } from 'express'
import bodyParser from 'body-parser'

import { Bitbucket, Github } from './services'

class WebhookCatcher extends EventEmitter {
    constructor ({ id = '/', token = '', services = [] }) {
        super()

        this.id = id
        this.token = token
        this.services = services

        this.router = Router()

        this.router.use(bodyParser.json())
        this.router.use(bodyParser.urlencoded({ extended: true }))

        for (const service of this.services) {
          let catcher = null
          if (service === 'github') {
            catcher = new Github(this.token)
          } else if (service === 'bitbucket') {
            catcher = new Bitbucket(this.token)
          }
          this.router.use('/' + catcher.id, catcher.router)

          catcher.on('all', (event) => {
            event.service = service
            this.emit('all', event)
            this.emit(event.type, event)
          })
        }
    }
}

export default WebhookCatcher
