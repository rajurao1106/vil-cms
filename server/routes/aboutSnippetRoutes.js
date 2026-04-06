import express from "express";
import AboutSnippet from "../models/AboutSnippet.js";

const router = express.Router();

// @route   GET /api/about
// @desc    Get About Snippet
router.get("/", async (req, res) => {
  try {
    const snippet = await AboutSnippet.findOne();
    if (snippet) {
      res.status(200).json(snippet);
    } else {
      res.status(404).json({ message: "About snippet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/about/save
// @desc    Save or Update About Snippet
router.post("/save", async (req, res) => {
  try {
    const snippet = await AboutSnippet.findOneAndUpdate(
      {}, // Pehla document dhoondega ya naya banayega (upsert)
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json(snippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;