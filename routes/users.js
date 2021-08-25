const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

//
// Create a new user
router.post("/register", async (req, res) => {
  const user = req.body;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const hashedPw = await bcrypt.hash(user.password, 10);
  try {
    const newUser = await User.create({ firstName, lastName, email, password: hashedPw });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// Login a user
router.post("/login", async (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  try {
    const user = await User.findAll({
      where: {
        email: email,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
//
//
module.exports = router;
