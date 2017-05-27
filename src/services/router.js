import EventEmitter from 'events'
import { Router as RouterExpress } from 'express'
import bodyParser from 'body-parser'

export default class Router extends EventEmitter {

    constructor (token, id = 'default') {
        super()
        this.id = id
        this.token = token
        this.router = RouterExpress()

        this.router.use(bodyParser.json())
        this.router.use(bodyParser.urlencoded({ extended: true }))
    }

}
