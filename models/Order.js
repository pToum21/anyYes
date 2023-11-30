const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection')


class Order extends Model { }

Order.init(
    {
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        reference_number: {
            type: DataTypes.STRING,
            //generate alphanumeric string in js
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        address: {
            type: DataTypes.STRING
            //maybe use maps api
        },

        listing_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'listing',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }


    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'order',
    }
)

module.exports = Order;