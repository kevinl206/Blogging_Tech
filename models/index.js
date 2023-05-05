// import models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// define model associations
// User
User.hasMany(Post, {
    foreignKey: "userId",
});

User.hasMany(Comment, {
    foreignKey: "userId",
});

// Post
Post.belongsTo(User, {
    foreignKey: "userId", 
    onDelete: "CASCADE",
});

Post.hasMany(Comment, {
    foreignKey: "postId",
});

// Comment
Comment.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
    foreignKey: "postId", 
    onDelete: "CASCADE",
});

module.exports = { User, Post, Comment };