
import { useState, useRef, useEffect } from "react";
import "./App.css";

const options = {
  Male: [
    {
      id: "beautiful",
      label: "Beauty Queen 👑",
      emoji: "💃",
      sound: "/bete.mp3",
    },
    {
      id: "rich",
      label: "Rich Princess 💎",
      emoji: "💰",
      sound: "/khopdi.mp3",
    },
    {
      id: "drama",
      label: "Drama Queen 🎭",
      emoji: "🎬",
      sound: "/ghop.mp3",
    },
  ],

  Female: [
    {
      id: "handsome",
      label: "Handsome Hunk 😎",
      emoji: "🕺",
      sound: "/wow-kaya-ladka.mp3",
    },
    {
      id: "rich",
      label: "Rich Billionaire 💸",
      emoji: "💰",
      sound: "/paisa.mp3",
    },
    {
      id: "mama",
      label: "Mumma's Boy 🍼",
      emoji: "👶",
      sound: "/arebapre.mp3",
    },
  ],
};

// One sound for every possible combination.
const combinationSounds = {
  Male: {
    "beautiful+rich": "/teri-gand-mari.mp3",
    "beautiful+drama": "/ghachar-ghachar.mp3",
    "drama+rich": "/ek-din-mar-jayega-kutte-ki-maut.mp3",
  },

  Female: {
    "handsome+mama": "/crorer.mp3",
    "handsome+rich": "/are.mp3",
    "mama+rich": "/gandhiji.mp3",
  },
};

const combinationMessages = {
  "beautiful+rich":
    "Beauty AND money? Bro is searching for the premium package! 💸😂",

  "beautiful+drama":
    "Beauty with drama! This relationship needs a Netflix subscription! 🎬🤣",

  "drama+rich":
    "Money and drama? Welcome to the billionaire's daily soap! 💰🎭",

  "handsome+mama":
    "Handsome plus Mumma's Boy? Better impress his mom first! 🍼😂",

  "handsome+rich":
    "Handsome and rich? Your relatives are already planning the wedding! 💍🤣",

  "mama+rich":
    "Rich Mumma's Boy! The real question: who controls the remote? 😂📺",
};

const defaultSearchMessage =
  "Cupid is investigating your selection... 🔍💘";

function App() {
  const [gender, setGender] = useState("");
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState("");
  const [meme, setMeme] = useState("");
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function stopMeme() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setPlaying(false);
  }

  function playMeme(soundPath, message) {
    stopMeme();

    setMeme(message);

    if (!soundPath) {
      setPlaying(false);
      return;
    }

    const audio = new Audio(soundPath);
    audioRef.current = audio;
    setPlaying(true);

    audio.onended = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlaying(false);
      }
    };

    audio.onerror = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlaying(false);
      }

      console.error("Unable to load meme audio:", soundPath);
    };

    audio.play().catch((error) => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlaying(false);
      }

      console.error("Audio playback failed:", error);
    });
  }

  function changeGender(value) {
    stopMeme();
    setGender(value);
    setSelected([]);
    setResult("");
    setMeme("");
  }

  function handleOption(option) {
    if (
      selected.includes(option.id) ||
      selected.length >= 2
    ) {
      return;
    }

    const next = [...selected, option.id];

    setSelected(next);
    setResult("");

    playMeme(
      option.sound,
      `${option.label} selected! Let's see what Cupid thinks! 😂`
    );
  }

  function handleSearch() {
    if (!gender) {
      setResult("");

      playMeme(
        "/arebapre.mp3",
        "First select Male or Female, single pringle! 😂"
      );

      return;
    }

    if (selected.length !== 2) {
      setResult("");

      playMeme(
        "/gandhiji.mp3",
        "Select TWO qualities first. Cupid needs requirements! 💘"
      );

      return;
    }

    const combinationKey = [...selected].sort().join("+");

    const chosen = options[gender]
      .filter((option) => selected.includes(option.id))
      .map((option) => option.label);

    const soundPath =
      combinationSounds[gender][combinationKey];

    const message =
      combinationMessages[combinationKey] ||
      defaultSearchMessage;

    const compatibility =
      Math.floor(Math.random() * 21) + 80;

    setResult(
      `Your ${gender} matchmaking profile is ready! ` +
      `You selected ${chosen.join(" + ")}. ` +
      `Compatibility: ${compatibility}% 😂`
    );

    playMeme(soundPath, message);
  }

  function resetAll() {
    stopMeme();
    setGender("");
    setSelected([]);
    setResult("");
    setMeme("");
  }

  return (
    <main className="page" id="home">
      <nav className="navbar">
        <a className="brand" href="#home">
          <span>💘</span> Rishta.exe
        </a>

        <span className="nav-tag">100% Serious-ish</span>
      </nav>

      <section className="hero">
        <div className="hero-badge">
          💍 India's Most Un-serious Matrimony
        </div>

        <h1>
          Find Your <span>Forever</span>
          <br />
          (Or At Least a Dinner Date)
        </h1>

        <p>
          Because your relatives won't stop asking,
          "Beta, shaadi kab karoge?"
        </p>

        <div className="floating-icons" aria-hidden="true">
          <span>💌</span>
          <span>😂</span>
          <span>💍</span>
        </div>
      </section>

      <section className="match-card">
        <div className="card-heading">
          <span className="step">01</span>

          <div>
            <h2>Please Select Your Gender</h2>
            <h3 className="headphone-warning">
If You Choose Male, Please Use Headphones!   🎧  😂
</h3>
            <p>Choose your matchmaking adventure.</p>
          </div>
        </div>

        <div className="gender-options">
          {["Female", "Male"].map((item) => (
            <button
              key={item}
              type="button"
              className={`gender-card ${
                gender === item ? "active" : ""
              }`}
              onClick={() => changeGender(item)}
              aria-pressed={gender === item}
            >
              <span className="gender-emoji">
                {item === "Male" ? "🤵" : "👰"}
              </span>

              <span className="gender-name">{item}</span>

              <span className="gender-caption">
                {item === "Male" ? "Team Groom" : "Team Bride"}
              </span>
            </button>
          ))}
        </div>

        {gender && (
          <div className="preferences">
            <div className="card-heading">
              <span className="step">02</span>

              <div>
                <h2>Choose Your Top TWO Qualities</h2>
                <p>
                  Every option has its own meme. Choose wisely! 👀
                </p>
              </div>
            </div>

            <div className="option-list">
              {options[gender].map((option) => {
                const isSelected =
                  selected.includes(option.id);

                const isDisabled =
                  selected.length >= 2 && !isSelected;

                return (
                  <label
                    key={option.id}
                    className={`option-row ${
                      isSelected ? "option-selected" : ""
                    } ${
                      isDisabled ? "option-disabled" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={`${gender}-qualities`}
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => handleOption(option)}
                    />

                    <span className="option-emoji">
                      {option.emoji}
                    </span>

                    <span className="option-label">
                      {option.label}
                    </span>

                    <span className="option-status">
                      {isSelected
                        ? "Selected ✓"
                        : isDisabled
                        ? "Locked 🔒"
                        : "Choose me"}
                    </span>
                  </label>
                );
              })}
            </div>

            <p className="selection-count">
              {selected.length} / 2 qualities selected
            </p>

            <div className="actions">
              <button
                className="search-btn"
                onClick={handleSearch}
                type="button"
              >
                🔍 Find My Soulmate
              </button>

              <button
                className="reset-btn"
                onClick={resetAll}
                type="button"
              >
                Start Over ↻
              </button>
            </div>
          </div>
        )}

        {meme && (
          <div
            className="meme-box"
            role="status"
            aria-live="polite"
          >
            <span className="meme-face">
              {playing ? "🤣" : "😂"}
            </span>

            <div className="meme-content">
              <strong>RISHTA.exe SAYS:</strong>
              <p>{meme}</p>
            </div>

            {playing && (
              <button
                className="stop-audio-btn"
                type="button"
                onClick={stopMeme}
                aria-label="Stop audio"
              >
                <span>⏹</span> Stop
              </button>
            )}
          </div>
        )}

        {result && (
          <div className="result-box" aria-live="polite">
            <span className="result-emoji">🎉</span>

            <h2>Matchmaking Report</h2>

            <p>{result}</p>

            <p className="result-footnote">
              *Compatibility is randomly generated for
              entertainment only. Cupid has no actual data. 😂
            </p>
          </div>
        )}
      </section>

      <footer>
        <p>
          Made with ❤️, parental pressure & questionable decisions.
        </p>

        <span>
          © 2026 Rishta.exe — Dil se funny, shaadi se pehle.
        </span>
      </footer>
    </main>
  );
}

export default App;
