var express = require('express');
var router = express.Router();
const { Pantient } = require("../../models");
router.post('/', function (req, res, next) {
    Pantient.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        postcode: req.body.postcode,
        street: req.body.street,
        city: req.body.city,
        phone: req.body.phone,
        pesel: req.body.pesel
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;