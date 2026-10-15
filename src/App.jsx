import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const soundEffects = [
  { id: "bruh", name: "Ringtone", emoji: "💀", file: "/uthaiye-na.mp3", tags: ["Any", "Gaming", "Coding"] },
  { id: "victory", name: "MAIN CHARACTER WIN", emoji: "🏆", file: "/gandhiji.mp3", tags: ["Any", "Gaming", "Cricket"] },
  { id: "gaming", name: "GAMER RAGE", emoji: "🎮", file: "/CID.mp3", tags: ["Gaming", "Coding"] },
  { id: "cricket", name: "LAST-OVER PANIC", emoji: "🏏", file: "/arebapre.mp3", tags: ["Cricket", "Any"] },
  { id: "music", name: "VIBE CHECK", emoji: "🎵", file: "/ghop.mp3", tags: ["Music", "Any"] },
  { id: "modi", name: "DESI SPEECH ENERGY", emoji: "🇮🇳", file: "/modi-speech.mp3", tags: ["Coding", "Any"] },
];

const categories = ["Any", "Gaming", "Cricket", "Music", "Coding"];

const jokes = [
  { setup: "Me: I'll sleep early tonight.", punchline: "Also me at 2:47 AM: what if penguins have knees? 💀" },
  { setup: "My motivation is like a government website.", punchline: "It exists, but nothing loads when I need it. 😭" },
  { setup: "I opened my laptop to be productive.", punchline: "Three hours later, I know a stranger's entire family tree. 🕵️" },
  { setup: "My bank balance and I are in a toxic relationship.", punchline: "I check on it daily. It keeps disappointing me. 💸" },
  { setup: "My brain has 47 tabs open.", punchline: "One is playing music and nobody knows which one. 🧠" },
  { setup: "I don't procrastinate.", punchline: "I give deadlines a chance to experience character development. 🗿" },
  { setup: "The Wi-Fi stopped working during my online meeting.", punchline: "Finally, a meeting where I had a valid excuse to disappear. 🫡" },
  { setup: "My code worked on the first try.", punchline: "I immediately saved it, took a screenshot, and prepared for the apocalypse. 🚨" },
  { setup: "I tried touching grass today.", punchline: "The outside world needs a better user interface. 🌱" },
  { setup: "My sleep schedule is a social experiment.", punchline: "The results are concerning. The researcher is also tired. 😭" },
  { setup: "I asked my brain to focus for five minutes.", punchline: "It sent me a 2016 memory and logged off. 🫠" },
  { setup: "Adulting is basically doing side quests.", punchline: "Except the reward is another bill. 🎮" },
  { setup: "My phone battery lasts longer than my attention span.", punchline: "And both are currently at 3%. 🔋" },
  { setup: "I have a six-pack.", punchline: "It's six browser tabs of snacks. 🍟" },
  { setup: "Me after watching one tutorial:", punchline: "I am now accepting senior developer positions. 🧑‍💻" },
];

const roasts = [
  "Your brain is on airplane mode, but the thoughts are still delayed. ✈️",
  "Bro has premium confidence with the free-trial skill set. 💀",
  "That idea came with a terms-and-conditions warning. 📜",
  "Your last brain cell just submitted its resignation letter. 🧠",
  "The plan was 10/10. The execution has left the group chat. 🫡",
  "You're not lagging. Reality is waiting for your next move. 🗿",
  "Main character energy. Background character Wi-Fi. 📶",
  "The confidence is loud. The evidence is buffering. ⏳",
  "Your brain said 'skip intro' and skipped the instructions too. 🤡",
  "Absolutely iconic. Legally, we cannot explain why. ✨",
  "You cooked. The fire alarm disagrees. 🚒",
  "Your aura is loading… please do not close this tab. 🔄",
];

const modes = [
  { id: "chill", label: "Chill", emoji: "😌", className: "mode-chill", line: "Low chaos. Medium snacks. Zero responsibilities." },
  { id: "npc", label: "NPC Mode", emoji: "🗿", className: "mode-npc", line: "Greetings, traveler. I have one dialogue option." },
  { id: "sigma", label: "Sigma", emoji: "🕶️", className: "mode-sigma", line: "Aura farming in progress. Please remain mysterious." },
  { id: "goblin", label: "Goblin", emoji: "👹", className: "mode-goblin", line: "We do not think. We click buttons and face consequences." },
];

function randomItem(items, exclude) {
  const options = items.filter((item) => item !== exclude);
  const pool = options.length ? options : items;
  return pool[Math.floor(Math.random() * pool.length)];
}

function evaluateMath(input) {
  const source = input.replace(/\s+/g, "");
  if (!source) throw new Error("Type a calculation first, professor. 🧮");
  if (source.length > 100) throw new Error("That's a whole thesis. Keep it under 100 characters. 📚");
  if (!/^[\d.+\-*/%()]+$/.test(source)) throw new Error("Only numbers and + − × ÷ % ( ) allowed. Nice try, hacker. 🕵️");

  const tokens = source.match(/(?:\d+(?:\.\d*)?|\.\d+)|[()+\-*/%]/g);
  if (!tokens || tokens.join("") !== source) throw new Error("The math is giving suspicious behaviour. 🤨");
  let index = 0;

  function expression() {
    let value = term();
    while (tokens[index] === "+" || tokens[index] === "-") {
      const op = tokens[index++];
      const right = term();
      value = op === "+" ? value + right : value - right;
    }
    return value;
  }
  function term() {
    let value = factor();
    while (["*", "/", "%"].includes(tokens[index])) {
      const op = tokens[index++];
      const right = factor();
      if ((op === "/" || op === "%") && right === 0) throw new Error("DIVISION BY ZERO?! The universe has filed a complaint. 🌌");
      if (op === "*") value *= right;
      if (op === "/") value /= right;
      if (op === "%") value %= right;
    }
    return value;
  }
  function factor() {
    if (tokens[index] === "+" || tokens[index] === "-") {
      const sign = tokens[index++] === "-" ? -1 : 1;
      return sign * factor();
    }
    if (tokens[index] === "(") {
      index++;
      const value = expression();
      if (tokens[index] !== ")") throw new Error("You opened a bracket and abandoned it. Classic. 😭");
      index++;
      return value;
    }
    const token = tokens[index++];
    if (!token || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) throw new Error("This equation has trust issues. Check it again. 🤡");
    return Number(token);
  }

  const result = expression();
  if (index !== tokens.length || !Number.isFinite(result)) throw new Error("Math.exe has left the server. Try again. 💀");
  return Number(result.toPrecision(12));
}

export default function App() {
  const audioRef = useRef(null);
  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState(null);
  const [mathMessage, setMathMessage] = useState("Enter math. Leave with questionable confidence.");
  const [category, setCategory] = useState("Any");
  const [selectedSound, setSelectedSound] = useState("bruh");
  const [playing, setPlaying] = useState(false);
  const [soundMessage, setSoundMessage] = useState("Soundboard ready. Neighbours not informed. 🔊");
  const [jokeIndex, setJokeIndex] = useState(0);
  const [roast, setRoast] = useState("Tap the button. Your ego has been warned.");
  const [mode, setMode] = useState(modes[0]);
  const [chaos, setChaos] = useState(false);
  const [aura, setAura] = useState(0);
  const [copied, setCopied] = useState(false);

  const availableSounds = useMemo(
    () => soundEffects.filter((sound) => category === "Any" || sound.tags.includes(category)),
    [category]
  );
  const currentJoke = jokes[jokeIndex];

  useEffect(() => {
    document.body.classList.toggle("chaos-body", chaos);
    return () => document.body.classList.remove("chaos-body");
  }, [chaos]);

  useEffect(() => () => audioRef.current?.pause(), []);

  function calculate(event) {
    event?.preventDefault();
    try {
      const result = evaluateMath(expression);
      setAnswer(String(result));
      setMathMessage(randomItem([
        "BRO COOKED. THE CALCULATOR IS ASKING FOR AUTOGRAPHS. 🧑‍🍳",
        "One brain cell entered. A certified result came out. 🧠✨",
        "NASA has your location. They want their maths back. 🚀",
        "Big brain moment. Do not let this go to your head. 👑",
        "Correct answer unlocked. Academic comeback cinematic universe. 🎬",
      ]));
      setAura((value) => value + 10);
    } catch (error) {
      setAnswer(null);
      setMathMessage(error.message || "Math.exe has stopped responding. 💀");
    }
  }

  async function playSound(id = selectedSound) {
    const audio = audioRef.current;
    const sound = soundEffects.find((item) => item.id === id);
    if (!audio || !sound) return;
    audio.pause();
    audio.currentTime = 0;
    audio.src = sound.file;
    audio.load();
    setSelectedSound(id);
    try {
      await audio.play();
      setPlaying(true);
      setSoundMessage(`${sound.emoji} ${sound.name} ACTIVATED. USE YOUR POWER WISELY.`);
      setAura((value) => value + 5);
    } catch {
      setPlaying(false);
      setSoundMessage(`Audio file missing: ${sound.file}. Put that MP3 inside your public/ folder. 🎧`);
    }
  }

  function stopSound() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
    setSoundMessage("Silence restored. The vibes are under investigation. 🤫");
  }

  function nextJoke() {
    setJokeIndex((current) => {
      if (jokes.length < 2) return current;
      let next = current;
      while (next === current) next = Math.floor(Math.random() * jokes.length);
      return next;
    });
    setAura((value) => value + 2);
  }

  function giveRoast() {
    setRoast(randomItem(roasts, roast));
    setAura((value) => value + 1);
  }

  async function copyJoke() {
    const text = `${currentJoke.setup}\n${currentJoke.punchline}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setSoundMessage("Clipboard blocked by the browser. Select the joke and copy it manually. 📋");
    }
  }

  function changeCategory(nextCategory) {
    setCategory(nextCategory);
    const nextSounds = soundEffects.filter((sound) => nextCategory === "Any" || sound.tags.includes(nextCategory));
    if (!nextSounds.some((sound) => sound.id === selectedSound)) setSelectedSound(nextSounds[0]?.id ?? "bruh");
  }

  return (
    <main className={`app ${chaos ? "chaos" : ""} ${mode.className}`}>
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <div className="floating float-one" aria-hidden="true">💀</div>
      <div className="floating float-two" aria-hidden="true">🗿</div>
      <div className="floating float-three" aria-hidden="true">✨</div>

      <header className="hero">
        <div className="eyebrow"><span className="live-dot" /> INTERNET NONSENSE DEPARTMENT <span className="eyebrow-stamp">EST. NEVER</span></div>
        <h1>Brainrot <span className="title-symbol">&</span><br className="mobile-break" /> Brilliance<span className="title-dot">.</span></h1>
        <p className="hero-subtitle">A highly unserious website for people with <strong>37 tabs open</strong> in their brain.</p>
        <div className="hero-actions">
          <button className={`button button-chaos ${chaos ? "is-active" : ""}`} onClick={() => setChaos((value) => !value)}>
            {chaos ? "🌪️ CHAOS: UNREASONABLE" : "🧪 ACTIVATE BRAINROT"}
          </button>
          <div className="aura-counter" title="Earn aura by using the site"><span>✨</span><div><small>YOUR AURA</small><strong>{aura}</strong></div></div>
        </div>
        <div className="hero-note"><span>⚠️</span> Side effects may include giggling at your own screen.</div>
      </header>

      <section className="mode-strip" aria-label="Choose a personality mode">
        <div className="mode-strip-copy"><span className="tiny-label">CHOOSE YOUR LORE</span><strong>What is the vibe today?</strong></div>
        <div className="mode-options">
          {modes.map((item) => (
            <button key={item.id} className={`mode-button ${mode.id === item.id ? "selected" : ""}`} onClick={() => { setMode(item); setAura((value) => value + 1); }}>
              <span>{item.emoji}</span>{item.label}
            </button>
          ))}
        </div>
        <p className="mode-line">{mode.line}</p>
      </section>

      <div className="section-heading"><div><span className="tiny-label">THE BRAINROT ARCADE</span><h2>Pick your poison <span>™</span></h2></div><p>Four tabs of questionable decisions.</p></div>

      <div className="dashboard-grid">
        <section className="panel math-panel">
          <div className="panel-head"><div className="panel-icon icon-lime">🧮</div><span className="status-pill">IQ TEST (UNVERIFIED)</span></div>
          <h3>Math Mayhem</h3>
          <p className="panel-description">Solve an equation. Feel superior for approximately 4 seconds.</p>
          <div className="math-demo"><span>TRY THIS</span><code>25 * 4 + (10 / 2)</code></div>
          <form onSubmit={calculate} className="math-form">
            <label className="sr-only" htmlFor="math-expression">Math expression</label>
            <input id="math-expression" value={expression} onChange={(event) => setExpression(event.target.value)} placeholder="2 + 2 (be so for real)" autoComplete="off" />
            <button className="button button-primary" type="submit">CALCULATE & FLEX <span>↗</span></button>
          </form>
          {answer !== null && <div className="answer-card"><span>THE ORACLE HAS SPOKEN</span><strong>{answer}</strong><small>+10 aura. Humility not included. 👑</small></div>}
          <div className={`feedback-card ${answer === null ? "feedback-neutral" : "feedback-success"}`}><span>{answer === null ? "🫠" : "🧠"}</span><p>{mathMessage}</p></div>
          <div className="panel-foot"><span>🔒 No calculus. We have standards.</span><span>vibes.js</span></div>
        </section>

        <section className="panel sound-panel">
          <div className="panel-head"><div className="panel-icon icon-pink">🎧</div><span className="status-pill status-hot"><span className="live-dot" /> SOUND ON</span></div>
          <h3>Meme Soundboard</h3>
          <p className="panel-description">Choose a sound effect for your next extremely dramatic moment.</p>
          <div className="category-tabs" aria-label="Sound categories">
            {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => changeCategory(item)}>{item}</button>)}
          </div>
          <div className="sound-list">
            {availableSounds.map((sound) => (
              <button key={sound.id} className={`sound-item ${selectedSound === sound.id ? "selected" : ""}`} onClick={() => setSelectedSound(sound.id)}>
                <span className="sound-emoji">{sound.emoji}</span><span className="sound-name">{sound.name}<small>{sound.id === "bruh" ? "For every life decision" : sound.id === "victory" ? "Rare personal achievement" : sound.id === "gaming" ? "When the Wi-Fi betrays you" : sound.id === "cricket" ? "Match-day emotional damage" : sound.id === "music" ? "Vibe check approved" : "Maximum desi energy"}</small></span><span className="sound-select">{selectedSound === sound.id ? "✓" : "+"}</span>
              </button>
            ))}
          </div>
          <audio ref={audioRef} preload="none" onEnded={() => { setPlaying(false); setSoundMessage("Sound effect complete. Emotional damage delivered. 😂"); }} onError={() => setPlaying(false)} />
          <button className="button button-primary sound-play" onClick={() => playSound()}>{playing ? "🔊 PLAY IT AGAIN" : "🔊 DEPLOY THE SOUND"}</button>
          <div className="sound-bottom"><p>{soundMessage}</p>{playing && <button className="button button-stop" onClick={stopSound}>STOP ■</button>}</div>
        </section>

        <section className="panel joke-panel">
          <div className="panel-head"><div className="panel-icon icon-blue">🎤</div><span className="status-pill">COMEDY.EXE</span></div>
          <h3>Unhinged Joke Lab</h3>
          <p className="panel-description">Fresh nonsense, absolutely zero nutritional value.</p>
          <div className="joke-card"><div className="joke-topline"><span>INCOMING TRANSMISSION</span><span>#{String(jokeIndex + 1).padStart(2, "0")}</span></div><span className="quote-mark">“</span><p className="joke-setup">{currentJoke.setup}</p><p className="joke-punchline">{currentJoke.punchline}</p><div className="joke-sticker">100% UNPEER-REVIEWED</div></div>
          <div className="joke-actions"><button className="button button-primary" onClick={nextJoke}>I NEED WORSE JOKES <span>↻</span></button><button className="button button-outline" onClick={copyJoke}>{copied ? "COPIED ✓" : "COPY JOKE ↗"}</button></div>
          <div className="panel-foot"><span>😂 Laughing is optional.</span><span>Cringe is forever.</span></div>
        </section>

        <section className="panel roast-panel">
          <div className="panel-head"><div className="panel-icon icon-orange">🔥</div><span className="status-pill status-roast">FRIENDLY FIRE</span></div>
          <h3>Roast Generator</h3>
          <p className="panel-description">A tiny roast. No actual emotional damage warranty included.</p>
          <div className="roast-stage"><div className="roast-avatar">🤡<span>!</span></div><span className="roast-label">THE INTERNET HAS AN OPINION</span><p>{roast}</p><div className="roast-stars">✦ ✦ ✦</div></div>
          <button className="button button-dark" onClick={giveRoast}>ROAST ME AGAIN <span>🔥</span></button>
          <div className="roast-disclaimer">Friendly fire only. Your confidence may respawn.</div>
        </section>
      </div>

      <section className="survival-section">
        <div className="survival-title"><span className="tiny-label">ANCIENT INTERNET WISDOM</span><h2>Rules of the terminally online</h2><p>Follow at your own risk. Or don't. We are not your manager.</p></div>
        <div className="survival-grid">
          <article><span>01 / THE DEVELOPER</span><p>If it works, don't touch it. If you touched it, blame the cache.</p><b>💻</b></article>
          <article><span>02 / THE GAMER</span><p>“One last game” is a legally non-binding statement.</p><b>🎮</b></article>
          <article><span>03 / THE SLEEPER</span><p>Going to bed early starts tomorrow. Tomorrow is a flexible concept.</p><b>🌙</b></article>
          <article><span>04 / THE MAIN CHARACTER</span><p>If nobody saw it, it was just a private beta test.</p><b>🗿</b></article>
        </div>
      </section>

      <footer className="footer"><div className="footer-logo">B<span>&</span>B<span className="footer-dot">.</span></div><p>Made with questionable decisions, caffeine, and React.</p><span>PLEASE TOUCH GRASS BETWEEN PATCH NOTES 🌱</span><div className="footer-version">BUILD 0.0.∞ · NO THOUGHTS, JUST VIBES</div></footer>
    </main>
  );
}
