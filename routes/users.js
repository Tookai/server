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
    const user = await User.findAll({ where: { email } });
    if (!user[0]) {
      res.status(404).json("Cet utilisateur n'existe pas");
    }
    if (user[0]) {
      const validPw = await bcrypt.compare(password, user[0].password);
      if (!validPw) {
        res.status(405).json("Mauvaise combinaison utilisateur / mot de passe.");
      }
      if (validPw) {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// Select all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// Select one user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findAll({ where: { id: req.params.id } });
    if (!user[0]) {
      res.status(404).json("Cet utilisateur n'existe pas.");
    }
    if (user[0]) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// Update one user INFOS
router.put("/update/infos/:id", async (req, res) => {
  const user = req.body;
  try {
    const updatedUser = await User.update(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        city: user.city,
        fromCity: user.fromCity,
        relationship: user.relationship,
        scholarship: user.scholarship,
        job: user.job,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedUser[0]) {
      res.status(404).json("Cet utilisateur n'existe pas.");
    }
    if (updatedUser[0]) {
      res.status(200).json(`L'utilisateur a été mis à jour.`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// Update one user PICTURES
//
// Update one user INFOS
router.put("/update/pictures/:id", async (req, res) => {
    const user = req.body;
    try {
      const updatedUser = await User.update(
        {
          avatar: user.avatar,
          cover: user.cover,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedUser[0]) {
        res.status(404).json("Cet utilisateur n'existe pas.");
      }
      if (updatedUser[0]) {
        res.status(200).json(`L'utilisateur a été mis à jour.`);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });



//
//
//
module.exports = router;
