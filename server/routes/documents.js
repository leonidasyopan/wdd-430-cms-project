const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

var express = require('express');
var router = express.Router();
module.exports = router;


router.get('/', (req, res, next) => {
  Document.find().then(documents => {
    res.status(200).json(documents);
  }).catch(error => {
    res.status(500).json({
      message: "Error trying to fetch Documents"
    });
  })
});
