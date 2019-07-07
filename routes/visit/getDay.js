var express = require('express');
var router = express.Router();
const { Visit, Schedule } = require("../../models");
const moment = require('moment');
const { Op } = require('sequelize');
router.get('/:doctorId', async (req, res, next) => {
    try {
        let schedules = [];
        const doctorId = req.params.doctorId;
        await Schedule.findAll({
            where: {
                doctorId
            }
        }).then(items => {
            schedules = items;
        });
        let now = moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0 });
        let freeDay = [];
        for (let index = 0; index < 14; index++) {
            const schedule = schedules.find((schedule) => (schedule.dayOfWeek + 1) === now.weekday());
            let morning = now;
            if (schedule) {
                const hourOpen = Number(schedule.hourOpen.replace(":00:00", ""));
                const hourClose = Number(schedule.hourClose.replace(":00:00", ""));
                for (let index = hourOpen; index < hourClose; index++) {
                    morning = now.set({ 'hour': index });
                    await Visit.findOne({
                        where: {
                            doctorId,
                            date: morning.toISOString()
                        }
                    }).then(visit => {
                        if (!visit) {
                            freeDay.push(morning.toISOString());
                        }
                    })
                }
            }
            morning = morning.add(1, 'day');
        }
        res.json(freeDay)

    } catch (error) {
        res.json({ error });
    }


});

module.exports = router;