const Sequelize = require('sequelize');
const sequelize = require('../db/index');
class User extends Sequelize.Model { }
User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        }
    }, { timestamps: false, sequelize, modelName: 'user' });

module.exports = User;