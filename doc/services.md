# Services

You can catch events from services like git hosting services. So you need to define
webhooks in these services.

> Notice that you need to generate a token and give it the webhook catcher in order to secure the webhook. This token will ensure you
that requests really come from your repositories.

## Github

On your github repository, go to Settings > Webhooks > Add webhook and use the following configuration :

* Payload URL: `<host>/<route defined in your express server>/github/<appName>`
* Content type: `application/json`
* Secret: `<token>`

> For example, if your code is `app.use('/webhook', catcher.router)` then your payload URL will be `<host>/webhook/github/<appName>`

## Bitbucket

On your bitbucket repository, go to Settings > Webhooks > Add webhook and use the following configuration:

* Title: whatever you want
* URL: `<host>/<route define in your express server>/bitbucket/<appName>/<token>`
* Status: checked
* SSL/TLS: checked if your express server is accessible with https
* trigger: Choose what you want
