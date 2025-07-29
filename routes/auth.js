const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; 
// POST /signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
      
    res.json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Signup failed", error: error.message });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ msg: "Login successful",token,userId:user._id, user: { username: user.username, email: user.email, id: user._id } });
  } catch (error) {
    res.status(500).json({ msg: "Login failed", error: error.message });
  }
});

module.exports = router;
