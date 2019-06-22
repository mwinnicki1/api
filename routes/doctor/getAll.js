var express = require('express');
var router = express.Router();
const { Doctor } = require("../../models");
router.get('/:id', function (req, res, next) {
    Doctor.findAndCountAll({
        limit: 100,
        offset: req.params.id * 100
    }).then(items => {
        res.json(items);
    })
});
router.get('/', function (req, res, next) {
    Doctor.findAndCountAll({
        limit: 100
    }).then(items => {
        res.json(items);
    })
});

module.exports = router;