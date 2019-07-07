var express = require('express');
var router = express.Router();
const { User } = require("../../models");
router.post('/', function (req, res, next) {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;