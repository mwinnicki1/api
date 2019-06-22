var express = require('express');
var router = express.Router();
const { Doctor } = require("../models");
const faker = require('faker');
router.get('/', function (req, res, next) {
    faker.locale = "pl";
    for (let i = 0; i < 100; i++) {
        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        let numberPwz = Number(Math.random() * 10000000).toFixed(0);
        while (numberPwz.length < 7) {
            numberPwz = '0' + numberPwz;
        }
        const specialists = ['chirurg ogólny', 'okulista', 'dermatolog', 'laryngolog', 'ginekolog', 'kardiolog', 'urolog', 'ortopeda', 'pulmonolog', 'neurolog', 'alergolog', 'gastrolog', 'diabetolog', 'endokrynolog', 'ginek.- endokr.', 'reumatolog', 'nefrolog', 'hematolog', 'onkolog']
        const index = Number(Math.random() * (specialists.length-1)).toFixed(0);
         Doctor.create({ firstname, lastname, numberPwz, specialization: specialists[index] }).then(doctor => {
           console.log(doctor);
         })
    }
});

module.exports = router;