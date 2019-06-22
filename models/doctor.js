const Sequelize = require('sequelize');
const sequelize = require('../db/index');
class Doctor extends Sequelize.Model { }
Doctor.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numberPwz: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [7]
            }
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        },
        specialization: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        }
    }, { timestamps: false, sequelize, modelName: 'doctor' });

module.exports = Doctor;