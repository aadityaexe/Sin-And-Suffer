/* eslint-disable no-unused-vars */
import axios from "axios";

async function run(prompt, confessionText) {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    if (!token) {
        throw new Error("You must be logged in to confess.");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post("http://localhost:5000/api/ai/gemini", {
      prompt,
      confessionText // Pass the raw confession text for saving
    }, config);
    return response.data.result;
  } catch (error) {
    console.error("Gemini Error:", error?.response || error);
    throw new Error(error.message || "Abyss failed to answer.");
  }
}

export default run;
