var express = require('express');
var router = express.Router();
const { Schedule } = require("../../models");
router.get('/:id', function (req, res, next) {
    Schedule.findAll({
        where: {
            doctorId: req.params.id
        },
        order: ['dayOfWeek']
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;