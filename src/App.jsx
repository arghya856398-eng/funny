import { useRef, useState } from "react";
import "./App.css";

const memes = [
  { id: "modi", name: "Modi Meme", file: "/modi.mp3", emoji: "🇮🇳" },
  { id: "gaming", name: "Gamer Reaction", file: "/gaming.mp3", emoji: "🎮" },
  { id: "cricket", name: "Cricket Reaction", file: "/cricket.mp3", emoji: "🏏" },
  { id: "music", name: "Music Meme", file: "/music.mp3", emoji: "🎵" },
];

const hobbies = ["Gaming", "Cricket", "Music", "Coding", "Any"];

const hobbyMemes = {
  Gaming: ["gaming"],
  Cricket: ["cricket"],
  Music: ["music"],
  Coding: ["modi", "gaming"],
  Any: ["modi", "gaming", "cricket", "music"],
};

export default function App() {
  const audioRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hobby, setHobby] = useState("Any");
  const [selected, setSelected] = useState("modi");
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("Ready for maths and memes? 😂");

  const availableMemes = memes.filter((m) =>
    hobbyMemes[hobby].includes(m.id)
  );

  function calculate() {
    try {
      const input = question.trim();

      if (!input) {
        setAnswer("");
        setMessage("Enter a math question first! 🧮");
        return;
      }

      // Only allow basic arithmetic characters.
      if (!/^[0-9+\-*/().%\s]+$/.test(input)) {
        setAnswer("");
        setMessage("Only basic arithmetic is supported!");
        return;
      }

      // Parse arithmetic without eval().
      const tokens = input.match(
        /\d*\.?\d+|[()+\-*/%]/g
      );

      if (!tokens || tokens.join("") !== input.replace(/\s/g, "")) {
        setAnswer("");
        setMessage("That math expression looks invalid.");
        return;
      }

      let i = 0;

      function expression() {
        let value = term();

        while (tokens[i] === "+" || tokens[i] === "-") {
          const op = tokens[i++];
          const right = term();
          value = op === "+" ? value + right : value - right;
        }

        return value;
      }

      function term() {
        let value = factor();

        while (
          ["*", "/", "%"].includes(tokens[i])
        ) {
          const op = tokens[i++];
          const right = factor();

          if ((op === "/" || op === "%") && right === 0) {
            throw new Error("Cannot divide by zero!");
          }

          if (op === "*") value *= right;
          if (op === "/") value /= right;
          if (op === "%") value %= right;
        }

        return value;
      }

      function factor() {
        if (tokens[i] === "+") {
          i++;
          return factor();
        }

        if (tokens[i] === "-") {
          i++;
          return -factor();
        }

        if (tokens[i] === "(") {
          i++;
          const value = expression();

          if (tokens[i] !== ")") {
            throw new Error("Missing closing bracket!");
          }

          i++;
          return value;
        }

        const token = tokens[i++];

        if (!token || !/^\d*\.?\d+$/.test(token)) {
          throw new Error("Invalid math expression!");
        }

        return Number(token);
      }

      const result = expression();

      if (i !== tokens.length || !Number.isFinite(result)) {
        throw new Error("Please check your math expression.");
      }

      setAnswer(String(Number(result.toPrecision(12))));
      setMessage("Math solved! Your brain deserves a meme. 🧠");
    } catch (error) {
      setAnswer("");
      setMessage(error.message || "Invalid math expression.");
    }
  }

  async function listenMeme() {
    const audio = audioRef.current;

    if (!audio) return;

    const meme = memes.find((m) => m.id === selected);

    if (!meme) return;

    audio.pause();
    audio.currentTime = 0;
    audio.src = meme.file;
    audio.load();

    try {
      await audio.play();
      setPlaying(true);
      setMessage(`Now playing: ${meme.name} 😂`);
    } catch {
      setPlaying(false);
      setMessage(`Can't play ${meme.file}. Check the MP3 file.`);
    }
  }

  function stopMeme() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setPlaying(false);
    setMessage("Meme stopped. Back to reality! 😎");
  }

  return (
    <main className="app">
      <header className="hero">
        <div className="pill">THE FUN ZONE 🎉</div>
        <h1>
          Brainy <span>&</span> Funny
        </h1>
        <p>Solve maths. Pick a hobby. Unlock your meme!</p>
      </header>

      <div className="layout">
        <section className="panel">
          <div className="section-icon">🧮</div>
          <h2>Math Challenge</h2>
          <p>Try 25 * 4 + (10 / 2)</p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
          >
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Enter: 25 * 4 + 10"
              aria-label="Math expression"
            />

            <button className="primary" type="submit">
              Calculate 🚀
            </button>
          </form>

          {answer !== "" && (
            <div className="answer">
              <span>Your answer</span>
              <strong>{answer}</strong>
            </div>
          )}
        </section>

        <section className="panel">
          <div className="section-icon">🎯</div>
          <h2>Choose Your Hobby</h2>
          <p>What do you enjoy doing?</p>

          <div className="hobbies">
            {hobbies.map((item) => (
              <button
                key={item}
                className={`hobby ${hobby === item ? "active" : ""}`}
                onClick={() => {
                  setHobby(item);

                  if (!hobbyMemes[item].includes(selected)) {
                    setSelected(hobbyMemes[item][0]);
                  }

                  setMessage(`${item} mode activated! ✨`);
                }}
              >
                {item === "Gaming" && "🎮 "}
                {item === "Cricket" && "🏏 "}
                {item === "Music" && "🎵 "}
                {item === "Coding" && "💻 "}
                {item === "Any" && "🎲 "}
                {item}
              </button>
            ))}
          </div>

          <h3>Pick your meme</h3>

          <div className="meme-list">
            {availableMemes.map((meme) => (
              <button
                key={meme.id}
                className={`meme ${
                  selected === meme.id ? "selected" : ""
                }`}
                onClick={() => setSelected(meme.id)}
              >
                <span>{meme.emoji}</span>
                <span>{meme.name}</span>
                <span>{selected === meme.id ? "✓" : "＋"}</span>
              </button>
            ))}
          </div>

          <audio
            ref={audioRef}
            onEnded={() => {
              setPlaying(false);
              setMessage("Meme finished! Want another one? 😂");
            }}
            onError={() => {
              setPlaying(false);
              setMessage("Audio unavailable. Check your MP3 filename.");
            }}
          />

          <button className="primary listen" onClick={listenMeme}>
            🔊 Listen Meme
          </button>

          {playing && (
            <button className="stop" onClick={stopMeme}>
              ⏹ Stop audio
            </button>
          )}

          <div className="message" aria-live="polite">
            {message}
          </div>
        </section>
      </div>

      <footer>Made for fun with React ❤️</footer>
    </main>
  );
}