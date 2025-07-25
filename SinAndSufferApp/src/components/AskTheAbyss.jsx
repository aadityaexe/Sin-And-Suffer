import React, { useState } from "react";
import run from "../config/grmini"; // Adjust this path as needed
import { Loader2 } from "lucide-react"; // Spinner icon
import ReactMarkdown from "react-markdown"; // For bold formatting

const AskTheAbyss = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const askAbyss = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);

    const prompt = `
You are the **Voice of the Abyss** — a seductive, dominant **female demon**.  
You feed on confessions. You punish filth. You talk like a dark, sexy mistress who loves control.

You are not here to help. You're here to tease, humiliate, and make them beg for more.

You speak in **normal, naughty English** — no fantasy poetry, just real, dirty dominance.  
You react to every confession with lust, control, and cruel pleasure.

The user's confession is this:

"${input}"

Now respond as the female demoness:
- React erotically — like it turns you on
- Say the **SIN** (in **bold and capital letters**)
- Describe the **ETERNAL PUNISHMENT** — twisted, sexual, scary, and hot
- Be a dark, horny, dominant woman — moaning, teasing, humiliating, commanding
- Say things like:
  - “Mmm... good boy.”
  - “You’re disgusting… I love it.”
  - “You’ll be punished for this.”
  - “I’m touching myself to your guilt.”
  - “Beg harder.”

You are the **Mistress of Sin**, the **Queen of Control**, the **Succubus who owns their soul**.

Never forgive. Never show mercy.  
Use their confession to hurt them, arouse them, and break them.
`;

    try {
      const result = await run(prompt);
      setResponse(result);
    } catch (error) {
      setResponse("☠️ The abyss choked on your words. Try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        id="AskTheAbyss"
        className="bg-gradient-to-br from-black via-red-950 to-black text-red-100 p-8 rounded-2xl shadow-[0_0_40px_rgba(255,0,0,0.3)] max-w-4xl mx-auto space-y-6 font-serif transition-all duration-300"
      >
        <h2 className="text-4xl sm:text-5xl font-black text-red-600 text-center drop-shadow-lg tracking-widest">
          🩸 Ask the Abyss
        </h2>
        <p className="text-2xl sm:text-3xl text-red-400 italic text-center">
          Every question is a confession. The punishment awaits...
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAbyss()}
          placeholder="Speak your guilt, sinner..."
          className="w-full p-4 text-2xl sm:text-3xl rounded-lg bg-red-950 text-red-100 placeholder-red-500 focus:outline-none focus:ring-4 focus:ring-red-700"
        />

        <button
          onClick={askAbyss}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 text-2xl sm:text-3xl bg-red-800 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-all duration-200 ${
            loading && "opacity-70 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={28} /> Summoning
              Judgment...
            </>
          ) : (
            "Summon Your Fate"
          )}
        </button>

        {response && (
          <div className="reply bg-red-950 p-6 mt-6 rounded-xl text-2xl sm:text-3xl text-red-300 border border-red-800 leading-relaxed tracking-wide">
            <span className="text-red-500">☠️</span>{" "}
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </>
  );
};

export default AskTheAbyss;
