const express = require("express");
const router = express.Router();
const Resume = require("../model/resumeModel");

router.post("/create", async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    console.log(resume);
    res.status(201).json({ msg: "Resume created", resume });
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
});
// DELETE route - /api/resume/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Resume.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Resume deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});
// PUT route - /api/resume/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Update Failed" });
  }
});


module.exports = router;
