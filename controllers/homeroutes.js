const router = require('express').Router();
const {Blog, Comment} = require('../models')

router.get('/', async (req, res) => {
  try {
    const b = await Blog.findAll();
    const blogs = b.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {blogs, logged_in: req.session.logged_in});
  } catch (err){
    res.json(err);
  }
  
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{model: Comment, attributes: ['date', 'content']}],
    });

    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.render('blogfocus', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
