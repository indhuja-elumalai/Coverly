import express from "express";
import { generateCaption } from "../controllers/captionController.js";

const router = express.Router();

// ✅ Correct
router.post("/generate", generateCaption);

export default router;
