const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
// a user can post many blogs
User.hasMany(Blog, {
    foreignKey: 'user_id'
});
// a user can post many commentw
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
// a blog belongs to one user
Blog.belongsTo(User, {
  foreignKey: 'user_id',
});
// a comment is attatched to one blog
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});
// a comment belongs to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Blog, Comment  };
