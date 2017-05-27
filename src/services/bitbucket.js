import Router from './router'

import { PullRequestEvent, PushEvent } from '../events'

export default class Bitbucket extends Router {
  constructor ({ token = '' }) {
    super(token, 'bitbucket')

    this.router.use('/:token/:appName', (req, res, next) => {
      if (token) {
        if (req.params.token && req.params.token === token) {
          next()
        } else {
          res.send(401)
        }
      } else {
        next()
      }
    })

    this.router.post('/:token/:appName', (req, res) => {
      // console.log(JSON.stringify(req.body, null, 4))
      if (req.body.repository) {
        if (req.body.push && req.body.push.changes && req.body.push.changes.length > 0 && req.body.push.changes[0].new.type === 'branch') {
          res.sendStatus(204)
          this.emit('push', new PushEvent(req.params.appName, req.body.repository.links.html.href, req.body.push.changes[0].new.name))
        } else if (req.body.pullrequest && req.body.pullrequest.title && req.body.pullrequest.description && req.body.pullrequest.source && req.body.pullrequest.destination) {
          res.sendStatus(204)
          this.emit('pull-request', new PullRequestEvent(req.params.appName, req.body.repository.links.html.href, req.body.pullrequest.source, req.body.pullrequest.destination, req.body.pullrequest.title, req.body.pullrequest.description))
        } else {
          res.sendStatus(400)
        }
      } else {
        res.sendStatus(400)
      }
    })

    this.router.post('*', (req, res) => {
      res.status(404).send('ko')
    })
  }
}
