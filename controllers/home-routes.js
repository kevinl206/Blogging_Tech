const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await postMessage.findall({
        include: [{ model: User }],
      order: [["date_created", "DESC"]],
    });

       // Send over the 'loggedIn' session variable to the 'homepage' template
       res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    })
      .then((dbPostData) => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
  
          res.render("single-post", { post });
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  module.exports = router;