const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection')


class Order extends Model { }

Order.init(
    {
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reference_number: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        address: {
            type: DataTypes.STRING
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