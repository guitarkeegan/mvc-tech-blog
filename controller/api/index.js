const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes.js');
const commentRoutes = require('./commentRoutes.js');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
