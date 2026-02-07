import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const History = () => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;

        if (!token) {
          setError("You must be logged in to see your sins.");
          setLoading(false);
          return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(
          "http://localhost:5000/api/confessions",
          config
        );
        setConfessions(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch history of sins."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-600">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-red-100 p-6 pt-24 font-serif">
      <h1 className="text-5xl font-black text-red-600 text-center mb-12 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
        📜 The Scroll of Sins
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {confessions.length === 0 ? (
          <p className="text-center text-xl text-gray-500 italic">
            You are clean... for now. Go confess.
          </p>
        ) : (
          confessions.map((item) => (
            <div
              key={item._id}
              className="bg-red-950/20 border border-red-900/50 p-6 rounded-xl hover:bg-red-950/40 transition duration-300"
            >
              <div className="mb-4">
                <span className="text-xs text-red-400 uppercase tracking-widest">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
                <p className="text-xl italic mt-2 text-gray-300">
                  "{item.confession}"
                </p>
              </div>

              <div className="mt-4 border-t border-red-900/40 pt-4">
                <span className="text-sm font-bold text-red-500 uppercase">
                  The Abyss Responded:
                </span>
                <div className="mt-2 text-red-200 leading-relaxed">
                  <ReactMarkdown>{item.response}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
