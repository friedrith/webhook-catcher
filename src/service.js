import EventEmitter from 'events'
import { Router as RouterExpress } from 'express'
import bodyParser from 'body-parser'


/**
 * Service is a class managing a cloud service.
 * It includes a express router to catch request and is enabled to publish event
 * when it catches valid requests
 */
export default class Service extends EventEmitter {


    constructor (token, id = 'default') {
        super()
        this.id = id
        this.token = token
        this.router = RouterExpress()

        this.router.use(bodyParser.json())
        this.router.use(bodyParser.urlencoded({ extended: true }))
    }

    publish (event) {
      this.emit('all', event)
      // this.emit(event.type, event)
    }

}
