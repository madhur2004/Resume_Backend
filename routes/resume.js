const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Resume = require("../model/resumeModel");

// ✅ Create resume (POST)
router.post("/create", async (req, res) => {
  try {
    // ✅ Convert userId to ObjectId if it's a string
    if (req.body.userId) {
      req.body.userId = new mongoose.Types.ObjectId(req.body.userId);
    }

    const resume = new Resume(req.body);
    await resume.save();

    // console..log("✅ Resume created:", resume);
    res.status(201).json({ msg: "Resume created", resume });
  } catch (err) {
    // console..error("❌ Error saving resume:", err.message);
    res.status(500).json({ msg: "Error", error: err.message });
  }
});

// ✅ Get all resumes for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
});

// ✅ Delete a resume
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Resume.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Resume deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Update a resume
router.put("/:id", async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Update Failed" });
  }
});

module.exports = router;
