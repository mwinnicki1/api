var express = require('express');
var router = express.Router();
const { Schedule } = require("../../models");
router.get('/:id', function (req, res, next) {
    Schedule.findOne({
        where: {
            id: req.params.id
        }
    }).then(item => {
        res.json(item);
    })
});

module.exports = router;