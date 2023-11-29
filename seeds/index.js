const seedCategories = require('./category-seeds');
const seedPost = require('./post-seeds');
const seedProduct = require('./product-seeds');
const seedUser = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProduct();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedPost();
  console.log('\n----- POSTS SEEDED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  // process.exit(0) ensures the Node.js process will terminate immediately and return the exit code to the operating system gracefully.
  process.exit(0);
};

seedAll();
