const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {Comment} = require('../../models')

router.post('/', withAuth, async (req, res) => {
  console.log('\n--hit comment post route--\n');
    try {
      // create new comment with the information passed in the body. pass the current user_id when creating a new Comment object. 
      console.log(req.body);

      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      
      console.log(newComment);
      
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;