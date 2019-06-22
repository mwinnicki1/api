var express = require('express');
var router = express.Router();
const _ = require('lodash');
const { Visit, Doctor, Pantient } = require("../../models");
router.get('/:id', async (req, res, next) => {
    let doctors = [];
    let pantients = [];
    await Doctor.findAll().then(async (docs) => {
        doctors = docs;
    });
    await Pantient.findAll().then(async (pans) => {
        pantients = pans;
    });
    Visit.findAndCountAll({
        limit: 100,
        offset: req.params.id * 100,
        order: [['date', 'ASC']]
    }).then(items => {
        res.json({
            count: items.count, rows: items.rows.map(item => {
                let doctor = _.find(doctors, { 'id': item.doctorId });
                let pantient = _.find(pantients, { 'id': item.pantientId });
                doctor = `${doctor.lastname} ${doctor.firstname}`;
                pantient = `${pantient.lastname} ${pantient.firstname}`;
                const { id, doctorId, pantientId, date, description } = item;
                return { id, doctorId, pantientId, date, description, doctor, pantient };
            })
        });
    })
});
router.get('/', async (req, res, next) => {
    let doctors = [];
    let pantients = [];
    await Doctor.findAll().then(async (docs) => {
        doctors = docs;
    });
    await Pantient.findAll().then(async (pans) => {
        pantients = pans;
    });
    Visit.findAndCountAll({
        limit: 100,
        order:[['date','ASC']]
    }).then(items => {
        res.json({count: items.count, rows: items.rows.map(item => {
            let doctor = _.find(doctors, { 'id': item.doctorId });
            let pantient = _.find(pantients, { 'id': item.pantientId });
            doctor = `${doctor.lastname} ${doctor.firstname}`;
            pantient = `${pantient.lastname} ${pantient.firstname}`;
            const { id, doctorId, pantientId, date, description } = item;
            return { id, doctorId, pantientId, date, description, doctor, pantient };
        })});
    })
});

module.exports = router;