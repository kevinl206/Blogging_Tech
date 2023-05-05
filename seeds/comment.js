const { Comment } = require("../models");

const commentData = [
  {
    content: "mvc comment1...",
    user_id: 2,
    post_id: 1,
  },
  {
    content: "mvc comment2...",
    user_id: 3,
    post_id: 1,
  },
  {
    content: "angular comment1...",
    user_id: 1,
    post_id: 2,
  },
  {
    content: "angular comment2...",
    user_id: 3,
    post_id: 2,
  },
  // {
  //   content: "Node.js was written initially by Ryan Dahl in 2009...",
  //   user_id: 1,
  //   post_id: 4,
  // },
];

const seedComment = () => Comment.bulkCreate(commentData);
