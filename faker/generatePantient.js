var express = require('express');
var router = express.Router();
const { Pantient } = require("../models");
const faker = require('faker');
router.get('/', function (req, res, next) {
    faker.locale = "pl";
    for (let i = 0; i < 100; i++) {
        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const postcode = faker.address.zipCode();
        const streetArray = faker.address.streetAddress().split(' ');
        let street = "";
        for (let y = 1; y < streetArray.length; y++) {
            street += streetArray[y] + ' ';
        }
        street += Number(streetArray[0]);
        const city = faker.address.city();
        const phone = faker.phone.phoneNumber('#########');
        const pesel = generatePesel();
        Pantient.create({ firstname, lastname, postcode, street, city, phone, pesel }).then(pantient => {
            console.log(pantient);
        })
    }
});

var rand = function (min, max) {
    return min + Math.floor((max - min) * Math.random());
};
var getMonthOffsetForPesel = function (century) {
    switch (century) {
        case 18: return 80;
        case 19: return 0;
        case 20: return 20;
        case 21: return 40;
        case 22: return 60;
    }
};
var daysInMonth = function (year, month) {
    // JS - month are zero based, but days are 1 based
    // so 1 is first day of month.
    // If we pass 0 day of next month - we get LAST day of month.
    return new Date(year, month + 1, 0).getDate();
};
var last2Digits = function (number) {
    var n = Math.floor(number % 100);
    return ('00' + n.toString(10)).slice(-2);
};
var computePeselControlDigit = function (rawPesel) {
    var peselDigits = rawPesel.split('').map(function (d) { return +d; });
    var weigths = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

    var sum1 = 0, i;
    for (i = 0; i < weigths.length; i += 1) {
        sum1 += weigths[i] * peselDigits[i];
    }
    sum1 = (10 - (sum1 % 10)) % 10;
    return sum1;
};
var generatePesel = function () {
    var birthYear = rand(1800, 2300);
    var century = Math.floor(birthYear / 100);
    var monthOffset = getMonthOffsetForPesel(century);
    var birthMonth = rand(1, 13);
    var birthDay = rand(1, daysInMonth(birthYear, birthMonth) + 1);
    var peselMonth = birthMonth + monthOffset;
    var fourRandomDigits = ('0000' + rand(0, 10000).toString(10)).slice(-4);
    var rawPesel = last2Digits(birthYear) +
        last2Digits(peselMonth) +
        last2Digits(birthDay) +
        fourRandomDigits;
    var controlDigit = computePeselControlDigit(rawPesel);
    return rawPesel + controlDigit;
};

module.exports = router;