var express = require('express');
var router = express.Router();
const { Visit } = require("../../models");
router.delete('/:id', function (req, res, next) {
    Visit.destroy({
        where: {
            id: req.params.id
        }
    }).then(item => {
        res.json(item);
    })
});

module.exports = router;