/* eslint-disable no-unused-vars */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Use a valid model directly
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // must be a valid model
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 4096, // safe limit
  responseMimeType: "text/plain",
};

const chatSessionOptions = {
  generationConfig,
  history: [], // optional for multi-turn
};

async function run(prompt) {
  try {
    const chatSession = await model.startChat(chatSessionOptions);
    const result = await chatSession.sendMessage(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini Error:", error?.response || error);
    throw new Error("Gemini API call failed");
  }
}

export default run;
