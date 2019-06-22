var express = require('express');
var router = express.Router();
const { Pantient } = require("../../models");
router.delete('/:id', function (req, res, next) {
    Pantient.destroy({
        where: {
            id: req.params.id
        }
    }).then(item => {
        res.json(item);
    })
});

module.exports = router;