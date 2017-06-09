import Service from '../service'

import { PullRequestEvent, PushEvent } from '../events'

export default class Bitbucket extends Service {
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
      console.log(JSON.stringify(req.body, null, 4))
      if (req.body.repository) {
        if (req.body.push && req.body.push.changes && req.body.push.changes.length > 0 && req.body.push.changes[0].new.type === 'branch') {
          res.sendStatus(204)
          this.publish(new PushEvent({
            appName: req.params.appName,
            repositoryUrl: req.body.repository.links.html.href,
            branch: req.body.push.changes[0].new.name,
          }))
        } else if (req.body.pullrequest && req.body.pullrequest.title && req.body.pullrequest.source && req.body.pullrequest.destination) {
          res.sendStatus(204)
          this.publish(new PullRequestEvent({
            appName: req.params.appName,
            repositoryUrl: req.body.repository.links.html.href,
            branchSource: req.body.pullrequest.source.branch.name,
            branchDestination: req.body.pullrequest.destination.branch.name,
            title: req.body.pullrequest.title,
            description: req.body.pullrequest.description,
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
