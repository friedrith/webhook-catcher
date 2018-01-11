# webhook-catcher

This is an express router to catch webhooks. So you add this router to your express server and this router will emit signal when webhooks are triggered by services.

## Getting started

```bash
$ npm install webhook-catcher
```

```javascript
import WebhookCatcher from 'webhook-catcher'
import express from 'express'

const app = express()

const catcher = new WebhookCatcher({
  services: [ 'bitbucket', 'github' ],
  token: '...',
})

app
.use('/webhook', catcher.router)
.get('/', (req, res) => {
    res.send('ok')
})

catcher.on('pull-request', (pullRequest) => {
  // pull request
  // {
  //   appName: ...,
  //   repositoy: ...,
  //   service: 'github' | 'bitbucket',
  //   branchSource: ...,
  //   branchDestination: ...,
  //   description: ...,
  //   title: ...,
  //   reviewers: ...,
  //   url: ...,
  //   see all fields in the following documentation
  // }
})

catcher.on('push', (push) => {
  // push
  // {
  //   appName: ...,
  //   repositoy: ...,
  //   service: 'github' | 'bitbucket',
  //   branch: '...', // which branch is concerned
  // }
})

```


## Available services

For now, it manages services:

* github
* bitbucket

See how to define webhook in services in [services documentation](doc/services.md)


## Available events

For now, it manages events:

* push
* pull request

See all events fields in [events documentation](doc/events.md)

## Links

* [Bitbucket api](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Repositoryevents)
* [Github api](https://developer.github.com/webhooks/)
