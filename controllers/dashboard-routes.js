const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require("../utils/auth");

// get all posts for a dashboard
router.get("/", withAuth, (req, res) => {
  // find all posts for one user
  Post.findAll({
      where: {
          user_id: req.session.user_id,
      },
      attributes: [
          "id", 
          "title", 
          "body", 
          "created_at"
      ],
      include: [
          {
              model: Comment, 
              attributes: [
                  "id", 
                  "comment_text", 
                  "user_id", 
                  "post_id", 
                  "created_at",
              ],
              include: {
                  model: User, 
                  attributes: ["username"],
              },
          },
          {
              model: User,
              attributes: ["username"],
          },
      ]
  })
  .then(postData => {
      const posts = postData.map(post => post.get({ plain: true }));
      res.render("dashboard", {
          posts, 
          loggedIn: true,
      });
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// edit one post by id
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
      attributes: [
          "id", 
          "title", 
          "body", 
          "created_at",
      ],
      include: [
          {
              model: Comment,
              attributes: [
                  "id", 
                  "comment_text", 
                  "user_id", 
                  "post_id", 
                  "created_at"
              ], 
              include: {
                  model: User,
                  attributes: ["username"]
              }
          }, 
          {
              model: User, 
              attributes: ["username"],
          },
      ]
  })
  .then(postData => {
      if(postData) {
          const post = postData.get({ plain: true });
          res.render("edit-post", { 
              post, 
              loggedIn: true 
          })
      } else {
          res.status(404).end();
      };
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// exports 
module.exports = router;