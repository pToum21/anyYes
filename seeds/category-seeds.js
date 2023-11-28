const { Category } = require('../models')

const categoryData = [{
    id: 1,
    category_name: 'Console'
}, 
{
    id: 2,
    category_name: 'Game'
}]

const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;