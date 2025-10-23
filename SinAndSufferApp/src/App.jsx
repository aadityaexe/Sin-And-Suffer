import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages & Components
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Mouse from "./components/mouse";
import AskTheAbyss from "./components/AskTheAbyss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LineSve from "./components/LineSve";
import TransitionLayout from "./components/TransitionLayout";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Other routes without TransitionLayout */}
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/ask-the-abyss"
        element={
          <>
            <LineSve />
            <AskTheAbyss />
          </>
        }
      />
      <Route
        path="*"
        element={
          <div className="text-red-600 text-center text-4xl mt-20">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
};

const App = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.2;
      audio.muted = true;

      audio.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });

      const unmute = () => {
        audio.muted = false;
        audio.volume = 0.2;
        audio.play();
        window.removeEventListener("click", unmute);
      };

      window.addEventListener("click", unmute);
    }
  }, []);

  return (
    <Router>
      <Mouse />
      {/* <audio
        ref={audioRef}
        src="/WhispersOfTheAbyss.mp3"
        loop
        autoPlay
        preload="auto"
        style={{ display: "none" }}
      /> */}
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
};

export default App;
