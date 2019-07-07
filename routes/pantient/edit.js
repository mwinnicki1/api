var express = require('express');
var router = express.Router();
const { Pantient } = require("../../models");
router.post('/', function (req, res, next) {
    Pantient.update(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            postcode: req.body.postcode,
            street: req.body.street,
            city: req.body.city,
            phone: req.body.phone,
            pesel: req.body.pesel
        },
        { where: { id: req.body.id } }
    ).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;