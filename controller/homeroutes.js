const router = require('express').Router();
const {Blog} = require('../models')

router.get('/', async (req, res) => {
  const b = await Blog.findAll();
  const blogs = u.map((blog) => blog.get({ plain: true }));
  res.render('homepage', {blogs});
});

module.exports = router;
