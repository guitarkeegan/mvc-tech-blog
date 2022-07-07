const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const blogSeedData = require('./blogSeedData.json');
const commentSeedData = require('./commentSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });
  console.log(`\n--users seeded!--\n`);

  const blog = await Blog.bulkCreate(blogSeedData, {
    returning: true
  });
  console.log(`\n--blogs seeded!--\n`);

  const comment = await Comment.bulkCreate(commentSeedData, {
    returning: true
  });
  console.log(`\n--comments seeded!--\n`);

  process.exit(0);
};

seedDatabase();
