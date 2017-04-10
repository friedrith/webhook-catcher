# webhook-router

This is an express router to catch webhooks. So you add this router to your express server and this router will emit signal when webhooks are pushed by some tool.

For now, it manages:
* github webhooks
* bitbucket webhooks
* custom webhooks respecting a specific format  
