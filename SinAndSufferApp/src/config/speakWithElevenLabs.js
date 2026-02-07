import axios from "axios";

export const speakWithElevenLabs = async (text) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    if (!token) {
        console.warn("TTS skipped: User not logged in");
        return;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
    };

    const response = await axios.post(
      "http://localhost:5000/api/ai/tts",
      { text },
      config
    );

    const audioUrl = URL.createObjectURL(response.data);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("Error speaking with ElevenLabs:", err.message);
  }
};
