const seedCategories = require('./category-seeds');
// const seedPost = require('./product-seeds');
// const seedProduct = require('./tag-seeds');
const seedUser = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

//   await seedProducts();
//   console.log('\n----- PRODUCTS SEEDED -----\n');

//   await seedTags();
//   console.log('\n----- TAGS SEEDED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();
