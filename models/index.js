const User = require('./User');
const Listing = require('./Listing');
const Category = require('./Category');
const Order = require('./Order');

//establish associations
//User has no relation to Category

User.hasMany(Listing,
    { foreignKey: 'user_id' });
Listing.belongsTo(User,
    { foreignKey: 'user_id' });

Listing.hasOne(Category,
    { foreignKey: 'category_id' });
Category.belongsToMany(Listing,
    { foreignKey: 'category_id' });

Order.hasOne(User,
    { foreignKey: 'user_id' });
User.hasMany(Order,
    { foreignKey: 'user_id' });

Order.hasMany(Listing,
    { foreignKey: 'listing_id' });
Listing.belongsTo(Order,
    { foreignKey: 'listing_id' });

module.exports = { User, Listing, Category, Order };



