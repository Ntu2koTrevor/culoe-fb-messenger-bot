'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

const port = process.env.PORT || 5000

// Process data

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes

app.get('/', function(req, res){
    res.send("Hello world from De Song Music!")
})

const token = process.env.FB_PAGE_ACCESS_TOKEN
const verification_token = process.env.VERIFICATION_TOKEN

// Facebook

app.get('/webhook/', function(req, res){
    if (req.query['hub.verify_token'] === verification_token){
        res.send(req.query['hub.challenge'])
    }else{
    res.send("Wrong token");
    }
})

app.post('/webhook/', function(req, res){
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++){
        let event = messaging_events[i]
        let sender = event.sender.id
        if (event.message && event.message.text){
            let text = event.message.text
            decideMessage(sender, text)
        }
        if (event.postback) {
           let text = event.postback.payload
            decideMessage(sender, text)
        }
    }
    res.sendStatus(200)
})

var decideMessage = function (sender, text1){
    let text = text1.toLowerCase()
    if (text === "yes"){
        sendText(sender, "As long as it's good music, that's what's important")

    }else if (text === "no"){
        sendText(sender, "Life is too short to listen to bad music")

    }else{
        sendButtonMessage(sender, "What do you want to do? Search for good music?")
        userProfile(sender)
    }
}

function sendText(sender, text) {
    let messageData = {text: text}
    sendRequest(sender, messageData)
}

function sendButtonMessage(sender, text) {
    let messageData = {
        "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": text,
        "buttons":[
          {
            "type":"postback",
            "title":"yes",
            "payload":"yes"
          },
          {
            "type":"postback",
            "title":"no",
            "payload":"no"
          }
        ]
      }
    }
    }
    sendRequest(sender, messageData)
}

function userProfile(userid){
    request({
        url: "https://graph.facebook.com/v2.6/" + userid,
        method: "GET",
        qs: {fields: "first_name", access_token: token}
    },(err, response, body) => {
        let bodyObj = JSON.parse(body)
        let name = bodyObj.first_name

        sendText(userid, "Hey! " + name + " welcome to De Song Music.")
    })
}

function sendRequest(sender, messageData){
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token: token},
        method: "POST",
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function(error, response, body){
        if (error){
            console.log("sending error")
        } else if (response.body.error){
            console.log("response body error")
        }
    })
}

app.listen(port, function(){
    console.log("running: " + port)
})
