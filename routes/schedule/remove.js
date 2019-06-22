var express = require('express');
var router = express.Router();
const { Schedule } = require("../../models");
router.delete('/:id', function (req, res, next) {
    Schedule.destroy({
        where: {
            id: req.params.id
        }
    }).then(item => {
        res.json(item);
    })
});

module.exports = router;