var express = require('express');
var router = express.Router();
const { Doctor, Schedule } = require("../models");
router.get('/', (req, res, next) => {
    let schedules = [];
    Doctor.findAll({
        include: [
            { model: Schedule }
        ]
    }).then(doctors => {
        doctors.forEach(doc => {
            const countWorkDay = Math.random() * 5 + 1;
            const daysOfWeek = [];
            for (let i = 0; i < countWorkDay; i++) {

                let dayOfWeek = -1;
                while (dayOfWeek == -1 || daysOfWeek.includes(dayOfWeek)) {
                    dayOfWeek = Number((Math.random() * 5).toFixed(0));
                }
                daysOfWeek.push(dayOfWeek);

                let hourOpen = Number((Math.random() * 10 + 8).toFixed(0));
                const duration = Number(Math.random() * 6 + 2).toFixed(0);
                let hourClose = Number(hourOpen) + Number(duration);
                if (hourClose >= 23) {
                    hourClose = 22;
                }
                hourOpen += ':00:00';
                hourClose += ':00:00';

                schedules.push({ doctorId: doc.id, dayOfWeek, hourOpen, hourClose });
            }
        });

        Schedule.bulkCreate(schedules).then(schedules => {
            res.json(schedules);
        })
    });
});

module.exports = router;