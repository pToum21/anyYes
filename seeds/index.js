const seedCategories = require('./category-seeds');
const seedListing = require('./listing-seeds');
const seedUsers = require('./user-seeds');
const seedOrder = require('./order-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedListing();
  console.log('\n----- LISTINGS SEEDED -----\n');

  await seedOrder();
  console.log('\n----- ORDERS SEEDED -----\n');

  // process.exit(0) ensures the Node.js process will terminate immediately and return the exit code to the operating system gracefully.
  process.exit(0);
};

seedAll();
