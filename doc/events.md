# Events

This folder contains all documentation about events emitted by the catcher

For now, the events managed are :

* ping
* pull request
* push

A event has at least the core :

```javascript
{
  type: 'ping' | 'pull-request' | 'push',
  name: '...', // the name of the application which triggered the webhook
               // see how to define webhook to change this name
  repositoryUrl: '...', // https url of the repository which triggered the webhook
  service: 'github' | 'bitbucket',
  ...
}

```

## Ping

> Only managed on github

The ping event has no more information than what described above.


## Pull Request

```javascript
{
  // core information +
  title: '...', // pull request title
  description: '...', // pull request description
  branchSource: '...', // source  branch of the pull request
  branchDestination: '...', // target branch of the pull request
  reviewers: [
    {
      username: '...', // username of the first reviewer
      url: '...', // url to the profile of the first reviewer
    },
    // ...
  ],
  url: '...', // https url of the pull request to see it online
}
```

## Push

```javascript
{
  // core information +
  branch: '...', // which branch is concerned
}
```
