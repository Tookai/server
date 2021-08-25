const router = require("express").Router();
const { Post } = require("../models");

router.post("/post", async (req, res) => {
  const post = req.body;
  const userId = post.userId;
  const desc = post.desc;
  const image = post.image;
  const topic = post.topic;
  try {
    const newPost = await Post.create({ userId, desc, image, topic });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const post = await Post.findAll({ where: { id: req.params.id } });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const post = await Post.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/:id", async (req, res) => {
  const p = req.body;
  const desc = p.desc;
  const image = p.image;
  const topic = p.topic;
  try {
    await Post.update(
      {
        desc,
        image,
        topic,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json("Le post a été mis à jour.");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.status(200).json("Le post a été supprimé.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
