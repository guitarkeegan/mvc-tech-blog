const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.post('/', (req, res)=>{
    console.log(req.body, req.session.user_id);
    // Comment.create({req.body})
    // pass userID from the front end in the window.location url string.
    res.json(req.body);
});

module.exports = router;