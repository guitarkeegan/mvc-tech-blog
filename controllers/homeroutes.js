const router = require("express").Router();
const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");
// homepage will render all posts
router.get("/", async (req, res) => {
  try {
    const b = await Blog.findAll({order: [
      ['id', 'DESC'],
  ],});
    const blogs = b.map((blog) => blog.get({ plain: true }));
    res.render("homepage", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.json(err);
  }
});
// dashboard is where users can create, edit and delete posts that they have written. Only logged in users can access this route.
router.get("/dashboard", withAuth, async (req, res) => {
// find all posts where the current user matches the author of a post in the database.
    const personalPosts = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
//Get only the simplified objects from the database.
    const allBlogs = personalPosts.map((post) => post.get({ plain: true }));
    res.render("dashboard", { allBlogs, loggedIn: req.session.loggedIn });
  } 
);
// Only authenticated users can access the create-post page. On this page, users can upload a post image, and fill in the title, subtitle, and content of their blog post.
router.get("/create-post", withAuth, async (req, res)=>{
  res.render('createpost', {loggedIn: req.session.loggedIn});
});
//Here we allow authenticated users to edit a post that they have written.
router.get("/edit-post/:id", withAuth, async (req, res)=>{

  try {
    const postData = await Blog.findByPk(req.params.id);
    const post = postData.get({plain: true});
    res.render('editpost', {loggedIn: req.session.loggedIn, post})
  } catch (err){
    res.status(400).json(err);
  }
})
// Here, users can access a single blog post by id. If they are logged in, they can also leave a comment.
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          attributes: ["date", "content"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    res.render("blogfocus", { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// users with accounts can login here, or else they are redirected back to the homepage.
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
// Users whose emails are not in the database, can sign up with a username, email, and password.
router.get("/signup", (req, res) => {
  if (!req.session.loggedIn) {
    res.render("signup");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
