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

app.listen(port, function(){
    console.log("running: " + port)
})
