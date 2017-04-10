import EventEmitter from 'events'
import { router } from 'express'

class Router extends EventEmitter {

    constructor (id = 'default') {
        super()
        this.id = id
        this.router = router()
    }

}

export default Router
