var express = require('express');
var router = express.Router();
const { Doctor } = require("../../models");
router.delete('/', function (req, res, next) {
    console.log(req.body);
    Doctor.destroy({
        where: {
            id: req.body.id
        }
    }).then(item => {
        res.json(item);
    })
});

module.exports = router;