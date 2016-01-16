module.exports = function (db) {
    'use strict';
    var router = require('express').Router();

    router.post('/shop', function(req, res) {
      let lat = parseFloat(req.body.latitude);
      let long = parseFloat(req.body.longitude);
      let km = 10;
      let kmtolat = km / (111.2 * Math.cos(long * (Math.PI / 180)));
      let kmtolong = km / 111.320;
      // res.json({ latitude: { $gt: lat - kmtolat, $lt: lat + kmtolat }, longitude: { $gt: long - kmtolong, $lt: long + kmtolong } });
      db.collection('shop').find({ latitude: { $gt: lat - kmtolat, $lt: lat + kmtolat }, longitude: { $gt: long - kmtolong, $lt: long + kmtolong } }).toArray(function(err, shops) {
        res.json(shops);
      });
    });

    router.post('/menu', function (req, res) {
      let ObjectID = require('mongodb').ObjectID;
        db.collection('food').find({ shop : new ObjectID(req.body.shop) }).toArray(function(err, foods) {
          res.json(foods);
        });
    });

    return router;
};
