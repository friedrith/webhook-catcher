import crypto from 'crypto'

import Router from './router'

import { PullRequestEvent, PushEvent } from '../events'

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
      const repository = req.params.repository
      const event = req.headers['x-github-event']
      const branch = req.body.ref.split('/')[2]

      if (event && repository) {
        if (event === 'push') {
          res.sendStatus(204)
          this.emit('push', new PushEvent(req.params.appName, repository, branch))
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
