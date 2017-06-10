import crypto from 'crypto'

import Service from '../service'

import { PullRequestEvent, PushEvent, PingEvent } from '../events'

export default class Github extends Service {
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
      const body = JSON.parse(req.body.payload)
      if (event) {
        if (event === 'push' && body.ref && body.ref.split('/').length >= 3) {
          const branch = body.ref.split('/')[2]
          res.sendStatus(204)
          this.publish(new PushEvent({
            appName: req.params.appName,
            repositoryUrl: body.repository.html_url,
            branch,
          }))
        } else if (event === 'pull_request') {
          res.sendStatus(204)
          const pullRequest = body.pull_request
          const reviewers = []
          pullRequest.requested_reviewers.forEach((reviewer) => {
            reviewers.push({
              username: reviewer.login,
              url: reviewer.url,
            })
          })
          this.publish(new PullRequestEvent({
            appName: req.params.appName,
            repositoryUrl: body.repository.html_url,
            branchSource: pullRequest.head.ref,
            branchDestination: pullRequest.base.ref,
            title: pullRequest.title,
            description: pullRequest.body,
            reviewers,
            url: pullRequest.html_url,
          }))
        } else if (event === 'ping') {
          res.sendStatus(204)
          this.publish(new PingEvent({
            appName: req.params.appName,
            repositoryUrl: body.repository.html_url,
          }))
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
