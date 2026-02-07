import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Confession from "../models/Confession.js";

const router = express.Router();

// @desc    Get all confessions for the logged-in user
// @route   GET /api/confessions
// @access  Private
router.get("/", protect, async (req, res) => {
    try {
        const confessions = await Confession.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(confessions);
    } catch (error) {
        console.error("Error fetching confessions:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
