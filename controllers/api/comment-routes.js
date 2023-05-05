// imports 
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");


router.get("/", (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            res.status(500).json(err);
        });
});

// POST /api/comments (create a new comment)
router.post("/", withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text, 
        user_id: req.session.user_id,
        post_id: req.body.post_id,
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        res.status(500).json(err);
    });
});

// POST /api/comments/:id (delete a comment by id)
router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({
                message: "No comment found with this id!"
            });
            return;
        };
        res.json(dbCommentData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// exports
module.exports = router;