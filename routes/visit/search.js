var express = require('express');
var router = express.Router();
const { Visit } = require("../../models");
const { LocalDateTime, DateTimeFormatter } = require('js-joda');
const { Op } = require('sequelize');
router.post('/', function (req, res, next) {
    const dt = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm');
    const now = LocalDateTime.now().format(dt);
    const next10 = LocalDateTime.now().plusDays(100).format(dt);
    Visit.findAll({
        where: {
            doctorId: req.body.id,
            date: { [Op.between]: [now, next10] },
        }
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;