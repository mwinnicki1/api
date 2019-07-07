var express = require('express');
var router = express.Router();
const { Doctor } = require("../../models");
router.get('/', function (req, res, next) {
    Doctor.findAll({
    }).then(items => {
        res.json({ items });
    }).catch(error => {
        res.json({ error });
    })
});
module.exports = router;