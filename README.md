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
  services: [ 'bitbucket', 'github' ]
})

app
.use('/webhook', catcher.router)
.get('/', (req, res) => {
    res.send('ok')
})

catcher.on('pull-request', (pullRequest) => {
  // pull request
})

catcher.on('push', (push) => {
  // push
})

```


## Available services

For now, it manages services:

* github
* bitbucket

## Available events

For now, it manages events:

* push
* pull request


## Links

* [Bitbucket api](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Repositoryevents)
* [Github api](https://developer.github.com/webhooks/)
