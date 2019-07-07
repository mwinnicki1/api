var express = require('express');
var router = express.Router();
const { Doctor } = require("../../models");
router.post('/', function (req, res, next) {
    Doctor.create({
        numberPwz: req.body.numberPwz,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        specialization: req.body.specialization
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;