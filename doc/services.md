# Services

You can catch events from services like git hosting services. So you need to define
webhooks in these services.

> Notice that you need to generate a token and give it the webhook catcher in order to secure the webhook

# Github

On your github repository, go to Settings > Webhooks > Add webhook and use the following configuration :

* Payload URL: `<host>/webhook/github/<appName>`
* Content type: `application/json`
* Secret: `<your token>`

# Bitbucket

On your bitbucket repository, go to Settings > Webhooks > Add webhook and use the following configuration:

* Title: whatever you want
* URL: `<host>/webhook/bitbucket/<appName>/<token>`
* Status: checked
* SSL/TLS: checked if your express server is accessible with https
* trigger: Choose what you want
