const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection')

class Listing extends Model { }

Listing.init(
    {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        game_name: {
            type: DataTypes.STRING,
        },
        console_name: {
            type: DataTypes.STRING,
        },
        console_brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [4]
            }
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        color: {
            type: DataTypes.STRING,
        },
        is_special_edition: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB('medium') //gives up to 16mb
        },
        sold: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
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
        modelName: 'listing',
    }
);

module.exports = Listing;