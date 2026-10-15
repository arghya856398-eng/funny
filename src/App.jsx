
import { useRef, useState } from "react";
import "./App.css";

const jokes = [
  "Breaking news: Chai break is now compulsory! ☕",
  "Alert! Your deshbhakti level is increasing! 🇮🇳",
  "Mummy says: First finish your homework! 😂",
  "System update: Nonsense mode activated! 🚀",
  "Please remain calm. Meme levels are critical! 🤣",
];

export default function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState(
    "Press the button. Let's see what happens!"
  );

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      setMessage("Speech stopped. Mission paused! 🫡");
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setMessage("Modi Ji mode activated! 😂");
    } catch {
      setMessage(
        "Audio not found! Check public/modi-speech.mp3 🎤"
      );
    }
  }

  function randomJoke() {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    setMessage(joke);
  }

  return (
    <main className="page">
      <div className="tricolor" />

      <section className="card">
        <div className="top-label">🇮🇳 THE MEME ZONE 🇮🇳</div>

        <div className="hero-emoji">🎤 😂</div>

        <p className="subtitle">
          Serious website? No way. Welcome to full comedy mode!
        </p>

        <div className="avatar">😎</div>

        <div className="speech-bubble">{message}</div>

        <audio
          ref={audioRef}
          src="/modi-speech.mp3"
          preload="auto"
          onEnded={() => {
            setPlaying(false);
            setMessage("Speech complete. Jai Hind! 🇮🇳");
          }}
          onError={() => setPlaying(false)}
        />

        <button
          className="main-button"
          onClick={toggleAudio}
        >
          {playing ? "⏹ STOP SPEECH" : "🔊 PLAY SPEECH"}
        </button>

        <button className="joke-button" onClick={randomJoke}>
          🎲 Generate Funny Message
        </button>

        <div className="status">
          {playing ? "🔴 NOW PLAYING" : "🟢 READY TO LAUGH"}
        </div>

        <footer>
          Just for fun • A meme project made with React ❤️
        </footer>
      </section>
    </main>
  );
}