module.exports = function (db) {
    'use strict';
    var router = require('express').Router();

    router.get('/shop', function(req, res) {
      let lat = parseFloat(req.query.latitude);
      let long = parseFloat(req.query.longitude);
      let km = 10;
      let kmtolat = km / (111.2 * Math.abs(Math.cos(long * (Math.PI / 180))));
      let kmtolong = km / 111.320;
      // res.json({ latitude: { $gt: lat - kmtolat, $lt: lat + kmtolat }, longitude: { $gt: long - kmtolong, $lt: long + kmtolong } });
      db.collection('shop').find({ latitude: { $gt: lat - kmtolat, $lt: lat + kmtolat }, longitude: { $gt: long - kmtolong, $lt: long + kmtolong } }).toArray(function(err, shops) {
        res.json(shops);
      });
    });

    router.get('/menu', function (req, res) {
      let ObjectID = require('mongodb').ObjectID;
      db.collection('food').find({ shop : new ObjectID(req.query.shop) }).toArray(function(err, foods) {
        res.json(foods);
      });
    });

    return router;
};
