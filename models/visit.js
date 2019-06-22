const Sequelize = require('sequelize');
const sequelize = require('../db/index');
class Visit extends Sequelize.Model { }
Visit.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doctorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        pantientId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'pantients',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: { isDate: true },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        },

    }, { timestamps: false, sequelize, modelName: 'visit' });
module.exports = Visit;