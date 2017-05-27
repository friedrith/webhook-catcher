import EventEmitter from 'events'
import { Router as RouterExpress } from 'express'

export default class Router extends EventEmitter {

    constructor (token, id = 'default') {
        super()
        this.id = id
        this.token = token
        this.router = RouterExpress()
    }

}
