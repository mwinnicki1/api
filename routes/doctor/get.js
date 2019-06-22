var express = require('express');
var router = express.Router();
const { Doctor } = require("../../models");
router.get('/:id', function (req, res, next) {
    Doctor.findOne({
        where:{
            id: req.params.id
        }
    }).then(item => {
        res.json(item);
    })
});

module.exports = router;