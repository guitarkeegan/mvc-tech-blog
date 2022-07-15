const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      // create new comment with the information passed in the body. pass the current user_id when creating a new Comment object. 
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;