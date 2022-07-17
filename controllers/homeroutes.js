const router = require("express").Router();
const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const b = await Blog.findAll();
    const blogs = b.map((blog) => blog.get({ plain: true }));
    res.render("homepage", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const personalPosts = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const allBlogs = personalPosts.map((post) => post.get({ plain: true }));
    res.render("dashboard", { allBlogs, loggedIn });
  } catch (err) {
    res.status(400).json("No posts were found.");
  }
});

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

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (!req.session.loggedIn) {
    res.render("signup");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
