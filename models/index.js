const User = require('./User');
const Post = require('./Product');
const Product = require('./Product');
const Category = require('./Category');

//establish associations

User.hasMany(Post,
    { foreignKey: 'user_id' });
Post.belongsTo(User,
    { foreignKey: 'user_id' });

User.hasMany(Product,
    { foreignKey: 'user_id' });
Product.belongsTo(User,
    { foreignKey: 'user_id' });


Post.hasOne(Product,
    { foreignKey: 'product_id' });
Product.belongsTo(Post,
    { foreignKey: 'product_id' });

Product.hasMany(Category,
    { foreignKey: 'category_id' });
Category.belongsToMany(Product,
    { foreignKey: 'category_id' });

module.exports = { User, Post, Product, Category };



