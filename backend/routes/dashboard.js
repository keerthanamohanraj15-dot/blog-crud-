const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Blog = require("../models/Blog");

const router = express.Router();

// Get only the logged-in user's blogs
router.get("/my-blogs", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user.id
    }).sort({ createdAt: -1 });

    res.json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Could not load your blogs."
    });
  }
});

module.exports = router;