const express = require("express");
const route = express.Router();

const User = require("../database/userModel");

const bcrypt = require("bcrypt");
const { createJSONToken } = require("../util/token");
const { passwordCheck } = require("../util/detailsCheck");
const { emailCheck } = require("../util/detailsCheck");

// Register for site
route.post("/register", (req, res, next) => {
  const { email, password, password2 } = req.body;
  console.log(email, password);
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(422).json({ error: "Email already exists" });
    }

    if (password !== password2) {
      return res.status(401).json({ error: "Passwords do not match" });
    }
    const passwordPassed = passwordCheck(password);
    if (!passwordPassed) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const emailPassed = emailCheck(email);
    if (emailPassed) {
      return res.status(401).json({ error: "Invalid Email" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      const user = new User({
        email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          req.session.user = user;
          const token = createJSONToken(email);
          res.status(200).json({ message: "Login successful", token });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
          console.log(err);
        });
    });
  });
});

// Login for site
route.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Email not registered" });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = createJSONToken(email);
        req.session.user = user;
        res.status(200).json({ message: "Login successful", token });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      console.log(err);
      return;
    });
});

// Logout of site
route.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({ message: "Logout successful" });
  });
});

module.exports = route;
