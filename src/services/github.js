import crypto from 'crypto'

import Router from './router'

import { PullRequestEvent, PushEvent, PingEvent } from '../events'

export default class Github extends Router {
  constructor ({ token = '' }) {
    super(token, 'github')

    this.router.use('/:appName', (req, res, next) => {
      if (token) {
        const signature = req.headers['x-hub-signature']
        let hmac = crypto.createHmac('sha1', token)
        hmac.update(JSON.stringify(req.body))

        if (`sha1=${hmac.digest('hex')}` === signature) {
          next()
        } else {
          res.sendStatus(401)
        }
      } else {
        next()
      }
    })

    this.router.post('/:appName', (req, res) => {
      const event = req.headers['x-github-event']
      console.log(req.body.repository)
      if (event) {
        if (event === 'push' && req.body.ref && req.body.ref.split('/').length >= 2) {
          const branch = req.body.ref.split('/')[2]
          res.sendStatus(204)
          this.emit('push', new PushEvent(req.params.appName, req.body.repository.html_url, branch))
        } else if (event === 'ping') {
          res.sendStatus(204)
          this.emit('push', new PingEvent(req.params.appName, req.body.repository.html_url))
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
