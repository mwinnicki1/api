const Sequelize = require('sequelize');
const sequelize = require('../db/index');
const Doctor = require('./doctor');
class Schedule extends Sequelize.Model { }
Schedule.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doctorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: { notEmpty: true },
            references: {
                model: Doctor,
                key: 'id',
            }
        },
        dayOfWeek: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: { min: 0, max: 6 }
        },
        hourOpen: {
            type: Sequelize.TIME,
            allowNull: false,
            validate: { notEmpty: true },
        },
        hourClose: {
            type: Sequelize.TIME,
            allowNull: false,
            validate: { notEmpty: true },
        }
    }, { timestamps: false, sequelize, modelName: 'schedule' });

Doctor.hasMany(Schedule);
Schedule.belongsTo(Doctor, {foreignKey: 'doctorId'});
module.exports = Schedule;