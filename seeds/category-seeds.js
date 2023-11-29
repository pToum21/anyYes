//seeds category table
const { Category } = require('../models')

const categoryData = [
    {
        id: 1,
        category_name: 'console'
    },
    {
        id: 2,
        category_name: 'game'
    }
];

const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;

//*Ryan: lowercased names so when searched less chance of mismatching or errors because of capitalization difference.
//If needed, we can .toLowercase() client entries in order to match