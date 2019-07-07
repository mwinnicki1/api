var express = require('express');
var router = express.Router();
const { Visit } = require("../../models");
router.get('/:id', function (req, res, next) {
    Visit.findOne({
        where: {
            id: req.params.id
        }
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;