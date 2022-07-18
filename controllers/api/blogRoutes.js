const router = require('express').Router();
const {Blog} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res)=>{
    try {
        const newPost = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err){
        res.status(400).json(err);
    }
});

router.put("/:id", withAuth, async (req, res)=>{
    const blog_id = req.params.id;
    const updatedBlog = await Blog.update({
        title: req.body.title,
        subtitle: req.body.subtitle,
        img: req.body.img,
        content: req.body.content,
    }, 
    {where: {id: blog_id}}
    );
    res.status(200).json(updatedBlog)
});

router.delete("/:id", withAuth, async (req, res)=>{
    
    const blog_id = parseInt(req.params.id);
    console.log(blog_id);
    try {
        const deleteBlog = await Blog.destroy({
            where: {id: blog_id}
        });
        res.status(200).json(deleteBlog);
    } catch (err){
        res.status(400).json(err);
    }
})

module.exports = router;