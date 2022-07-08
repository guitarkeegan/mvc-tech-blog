const router = require('express').Router();
const {Blog} = require('../models')

router.get('/', async (req, res) => {
  try {
    const b = await Blog.findAll();
    const blogs = b.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {blogs});
  } catch (err){
    res.json(err);
  }
  
});

// router.get('/signin', (req, res)=>{

// })

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;