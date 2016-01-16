"use strict";
var express = require('express');
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

MongoClient.connect('mongodb://localhost:27017/server', function(error, db) {

  //http://localhost:9987/img/
  router.post('/shop', function (req, res) {
    req.body.image = 'http://localhost:9987/img/' + req.body.image;
    req.body.latitude = parseFloat(req.body.latitude);
    req.body.longitude = parseFloat(req.body.longitude);
    db.collection('shop').insert(req.body);
    res.sendStatus(200);
  });

  router.get('/shoplist', function (req, res) {
    db.collection('shop').find({}, { name : 1 }).toArray(function (error, shops) {
      res.json(shops);
    });
  });

  router.post('/food', function (req, res) {
    let ObjectID = require('mongodb').ObjectID;
    req.body.shop = new ObjectID(req.body.shop._id);
    req.body.price = parseFloat(req.body.price);
    db.collection('food').insert(req.body);
    res.sendStatus(200);
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(router);
  app.use(express.static('mock'));
  app.listen(9990);

});
