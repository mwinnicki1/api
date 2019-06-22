var express = require('express');
var router = express.Router();
const { Doctor, Pantient, Schedule, Visit } = require("../models");
const faker = require('faker');
const { LocalDateTime } = require('js-joda');
router.get('/', async (req, res, next) => {
    let doctors = [];
    await Doctor.findAll({ include: Schedule }).then(docs => {
        doctors = docs;
    });
    Pantient.findAll().then(async (pantients) => {
        pantients.forEach(async (pantient) => {
            for (let i = 0; i < 5; i++) {
                let created = true;
                while (created) {
                    const docIndex = (Math.random() * Number(doctors.length - 1)).toFixed(0);
                    const doctorId = doctors[docIndex].id;
                    const scheduleIndex = (Math.random() * (doctors[docIndex].schedules.length - 1)).toFixed(0);
                    const schedule = doctors[docIndex].schedules[scheduleIndex];
                    const hourOpen = Number(schedule.hourOpen.replace(':00:00', ''));
                    const hourClose = Number(schedule.hourClose.replace(':00:00', ''));
                    const hourVisit = Number((Math.random() * Number(hourClose - hourOpen - 1) + hourOpen).toFixed());
                    let date = faker.date.future().toISOString();
                    date = LocalDateTime.parse(date.substring(0, date.length - 2)).withNano(0).withSecond(0).withMinute(0).withHour(hourVisit);
                    if (date.dayOfWeek().value() != schedule.dayOfWeek) {
                        date = date.plusDays(schedule.dayOfWeek + 1 - date.dayOfWeek().value())
                    }
                    date = date.toString() + 'Z';
                    // console.log(date.dayOfWeek(), schedule.dayOfWeek);
                    await Visit.findOrCreate({ where: { doctorId: doctorId, pantientId: pantient.id, date } }).then(([visit, create]) => {
                        console.log(visit);
                        created = !create;
                    }).catch(error => {
                        console.log({ error });
                    })
                }
            }
        });
    })
});

module.exports = router;