var express = require('express');
var router = express.Router();
const { Visit } = require("../../models");
router.post('/', function (req, res, next) {
    Visit.create({
        doctorId: req.body.doctorId,
        pantientId: req.body.pantientId,
        date: req.body.date,
        description: req.body.description
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;