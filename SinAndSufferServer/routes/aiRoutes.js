import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import { protect } from "../middleware/authMiddleware.js";
import Confession from "../models/Confession.js";

const router = express.Router();

// Gemini Proxy
router.post("/gemini", protect, async (req, res) => {
    try {
        const { prompt, confessionText } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        await Confession.create({
            user: req.user._id,
            confession: confessionText || "Unknown Confession",
            response: text,
        });

        res.json({ result: text });
    } catch (error) {
        console.error("Gemini API Error Detail:", error);
        res.status(500).json({ error: "Failed to fetch from Gemini", details: error.message });
    }
});

// ElevenLabs Proxy - Protected to prevent abuse
router.post("/tts", protect, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required" });

        const VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Rachel voice
        const API_KEY = process.env.ELEVEN_API_KEY;

        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
                method: "POST",
                headers: {
                    Accept: "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": API_KEY,
                },
                body: JSON.stringify({
                    text,
                    model_id: "eleven_monolingual_v1",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`ElevenLabs API error: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Length": buffer.length,
        });

        res.send(buffer);
    } catch (error) {
        console.error("ElevenLabs API Error:", error);
        res.status(500).json({ error: "Failed to fetch from ElevenLabs" });
    }
});

export default router;
