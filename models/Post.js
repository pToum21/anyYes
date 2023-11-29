const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection')

class Post extends Model { }

Post.init(
    {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT(5000)
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.STRING,
            references: {
                model: 'product',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;