var express = require('express');
var router = express.Router();
const { Schedule } = require("../../models");
router.post('/', function (req, res, next) {
    Schedule.update({
        dayOfWeek: req.body.dayOfWeek,
        hourOpen: req.body.hourOpen,
        hourClose: req.body.hourClose
    },
        { where: { id: req.body.id } }
    ).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;