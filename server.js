// server.js
// where your node app starts

// init project
var moment = require('moment');
var express = require('express');
var parser = require('./scripts');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//time API endpoint
app.get("/api/timestamp", function(req, res){
  var date = moment();
  return res.json({unix: date.unix(), natural: moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")});  
});

app.get("/api/timestamp/:date", function(req, res){
  var date = new Date(parser.parseDate(req.params.date));
  return res.json({unix: date.getTime(), natural: date.toUTCString()});  
});

app.get('api/shorten/new/:url',function(req,res){
  var url=req.params.url;
  //var isUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  //if(isUrl.test(url)){
    res.json({"original url":url})
 // } else {
  //  res.json("Please enter a valid url")}
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
