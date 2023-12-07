const User = require('./apple');
const Listing = require('./Listing');
const Category = require('./Category');
const Order = require('./Order');

//establish associations
//User has no relation to Category

User.hasMany(Listing,
    { foreignKey: 'user_id' });
Listing.belongsTo(User,
    { foreignKey: 'user_id' });

Listing.belongsTo(Category,
    { foreignKey: 'category_id' });
Category.hasMany(Listing,
    { foreignKey: 'category_id' });

Order.belongsTo(User,
    { foreignKey: 'user_id' });
User.hasMany(Order,
    { foreignKey: 'user_id' });

Order.belongsTo(Listing,
    { foreignKey: 'listing_id' });
Listing.hasOne(Order,
    { foreignKey: 'listing_id' });


module.exports = { User, Listing, Category, Order };



