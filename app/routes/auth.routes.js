const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jsend = require("jsend");
const { User } = require("../models");

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, img_url, description } = req.body;
    // Check if the user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json(jsend.error("User already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      img_url: img_url,
      description: description,
    });
    // Generate JWT token for the newly registered user
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json(jsend.error("Internal server error"));
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json(jsend.error("Invalid credentials"));
    }
    // Check if the password is correct
    const dehashedPassword = await bcrypt.compare(password, user.password);
    if (!dehashedPassword) {
      return res.status(401).json(jsend.error("Invalid credentials"));
    }
    // Generate JWT token for the authenticated user
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
