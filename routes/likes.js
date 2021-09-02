const router = require("express").Router();
// ---------------------------------------
const { Like } = require("../models");
const { Post } = require("../models");
const { User } = require("../models");
const likeCtrl = require("../controllers/like");
// ---------------------------------------

//
// Add one like
router.post("/like", async (req, res) => {
  const b = req.body;
  const postId = b.postId;
  const userId = b.userId;
  try {
    await Like.create({ postId, userId });
    await Post.increment({ likes: +1 }, { where: { id: postId } });
    res.status(200).json(`User ${userId} liked post ${postId}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// Remove one like
router.delete("/dislike", async (req, res) => {
  const b = req.body;
  const postId = b.postId;
  const userId = b.userId;
  try {
    await Like.destroy({ where: { postId, userId } });
    await Post.increment({ likes: -1 }, { where: { id: postId } });
    res.status(200).json(`User ${userId} disliked post ${postId}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// Select like by post and return who liked
router.get("/who", async (req, res) => {
  try {
    const likes = await Like.findAll({ where: { postId: req.body.postId } });
    if (likes.length > 0) {
      const userId = likes.map((u) => u.userId);
      const user = await User.findAll({ where: { id: userId } });
      res.status(200).json(user);
    } else {
      res.status(200).json("Aucun like pour le moment.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//
//
//
module.exports = router;
