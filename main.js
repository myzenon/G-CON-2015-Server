'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

// Define
var app = express();
let port = 9987;

// MongoDB Pool
MongoClient.connect('mongodb://localhost:27017/server', function(error, database) {

  if(error) {
    console.error(error.name + ': ' + error.message);
    return;
  }

  // Use Router
  // parse application/x-www-form-urlencoded
  // parse application/json
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  var router = require('./router.js')(database);
  app.use(router);
  app.use('/img', express.static('img'));

  app.listen(port, function () {
    console.log("Server Start At Port " + port);
  });

});
