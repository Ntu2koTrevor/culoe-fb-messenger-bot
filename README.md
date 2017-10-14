Culoe-Facebook-Messenger-Bot 
============================

Facebook messenger bot example.


Requirements:
-------------

You will need the following things properly installed on your computer.

- [nodejs](https://nodejs.org/en/>)
- [npm](https://docs.npmjs.com/>)
- [heroku cli](https://devcenter.heroku.com/articles/heroku-cli>)

Getting Started
---------------

1. Clone the repo:

```
$ git clone https://github.com/Ntu2koTrevor/culoe-fb-messenger-bot.git
$ cd culoe-fb-messenger-bot
```

2. Install requirements:

```
$ npm install
```

3. Deploying to Heroku:

You will need a heroku account to deploy our Facebook-Messenger-Bot app. If you don’t already have a Heroku account, it’ll prompt you to create one.

```
$ heroku login
$ heroku create
$ git push heroku develop
$ heroku open
```

> If everything went well, you will connect to the demo site and get a page with the text **Hello world from De Song Music!** on it.


Creating Environment Variables
------------------------------

1. FB Page Access Token:

```
$ heroku config:set FB_PAGE_ACCESS_TOKEN=fb-page-access-token-goes-here
```

View:

```
$ heroku config
```

2. Verification Token:

```
$ heroku config:set VERIFICATION_TOKEN=verification-token-token-goes-here
```

View:

```
$ heroku config
```

3. Create env variable for current shell session:

```
$ export FB_PAGE_ACCESS_TOKEN=fb-page-access-token-goes-here
$ echo $FB_PAGE_ACCESS_TOKEN
```

Setup the Facebook App
----------------------

To create a Facebook App and Page, Login to your Facebook account and follow this [steps](https://developers.facebook.com/docs/messenger-platform/guides/quick-start).
