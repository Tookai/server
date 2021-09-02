const router = require("express").Router();
// ---------------------------------------
const { Comment } = require("../models");
const { Post } = require("../models");
const { User } = require("../models");
const commentCtrl = require("../controllers/comment");
// ---------------------------------------

//
//
router.post("/:postId/post/:userId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  const content = req.body.content;
  try {
    const comment = await Comment.create({ postId, userId, content });
    await Post.increment({ comments: +1 }, { where: { id: postId } });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
//
router.delete("/:postId/delete/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const postId = req.params.postId;
  try {
    await Comment.destroy({ where: { id: commentId } });
    await Post.increment({ comments: -1 }, { where: { id: postId } });
    res.status(200).json(`Commentaire ${commentId} supprimé.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
//
router.get("/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { postId: req.params.postId } });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
//
//
module.exports = router;
